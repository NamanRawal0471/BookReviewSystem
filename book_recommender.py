import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from flask import Flask, render_template, request

books_df = pd.read_csv('Books.csv')
ratings_df = pd.read_csv('Ratings.csv')
users_df = pd.read_csv('Users.csv')

books_df.dropna(inplace=True)
ratings_df.dropna(inplace=True)
users_df.dropna(inplace=True)

books_df['Year-Of-Publication'] = books_df['Year-Of-Publication'].astype(int)

books_df['Book-Author'] = books_df['Book-Author'].str.replace(',', '')
books_df['Book-Title'] = books_df['Book-Title'].str.replace(',', '')

merged_df = ratings_df.merge(users_df, on='User-ID', how='inner').merge(books_df, on='ISBN', how='inner')

merged_df.dropna(subset=['ISBN', 'User-ID', 'Book-Rating'], inplace=True)

merged_df['User-ID'] = merged_df['User-ID'].astype(int)

book_user_matrix = merged_df.pivot_table(index='ISBN', columns='User-ID', values='Book-Rating')


book_user_matrix = merged_df.pivot_table(index='ISBN', columns='User-ID', values='Book-Rating')

attributes = ['Book-Title', 'Book-Author', 'Publisher']
book_attributes = books_df[attributes].apply(lambda x: ' '.join(x), axis=1)
count_vectorizer = CountVectorizer()
book_attributes_matrix = count_vectorizer.fit_transform(book_attributes)
cosine_sim_matrix = cosine_similarity(book_attributes_matrix, book_attributes_matrix)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    isbn = request.form['isbn']
    recommended_books = recommend_books(isbn)
    return render_template('app.html', isbn=isbn, recommended_books=recommended_books)

def recommend_books(isbn, top_n=5):
    book_index = books_df[books_df['ISBN'] == isbn].index[0]
    similarity_scores = list(enumerate(cosine_sim_matrix[book_index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    top_books_indexes = [i[0] for i in similarity_scores[1:top_n+1]]
    recommended_books = books_df.iloc[top_books_indexes]['Book-Title']
    return recommended_books

if __name__ == '__main__':
    app.run(debug=True)
