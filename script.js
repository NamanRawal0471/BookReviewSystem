function fetchBooks() {
  const bookInput = document.getElementById('book-input').value;
  if (!bookInput) return;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookInput)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayBookGrid(data.items);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayBookGrid(books) {
  const bookGrid = document.getElementById('book-grid');
  bookGrid.innerHTML = '';

  if (!books || books.length === 0) {
    bookGrid.innerHTML = 'No books found';
    return;
  }

  books.forEach(book => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';

    const bookElement = document.createElement('div');
    bookElement.classList.add('book-card');

    const html = `
      <img src="${thumbnail}" alt="Book cover">
      <h3>${title}</h3>
      <p><strong>Authors:</strong> ${authors}</p>
    `;

    bookElement.innerHTML = html;

    bookElement.addEventListener('click', () => openModal(book));
    bookGrid.appendChild(bookElement);
  });
}

function openModal(book) {
  const modal = document.getElementById('bookModal');
  const modalBookDetails = document.getElementById('modal-book-details');
  const modalReviewList = document.getElementById('modal-review-list');
  modalBookDetails.innerHTML = '';
  modalReviewList.innerHTML = '';

  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
  const description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';
  const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';

  const html = `
    <h2>${title}</h2>
    <p><strong>Authors:</strong> ${authors}</p>
    <img src="${thumbnail}" alt="Book cover">
    <p><strong>Description:</strong> ${description}</p>
  `;

  modalBookDetails.innerHTML = html;

  // Generate random reviews
  const customReviews = [
    { username: 'John Doe', rating: 5, review: 'This book is fantastic!' },
    { username: 'Jane Smith', rating: 4, review: 'Highly recommended!' },
    { username: 'Sam Thompson', rating: 3, review: 'An enjoyable read.' }
  ];

  customReviews.forEach(review => {
    const reviewItem = document.createElement('li');
    reviewItem.classList.add('review-list-item');

    const ratingStars = '⭐️'.repeat(review.rating);
    const html = `
      <p><strong>User:</strong> ${review.username}</p>
      <p><strong>Rating:</strong> <span class="rating-stars">${ratingStars}</span></p>
      <p><strong>Review:</strong> ${review.review}</p>
    `;

    reviewItem.innerHTML = html;
    modalReviewList.appendChild(reviewItem);
  });

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('bookModal');
  modal.style.display = 'none';
}

function addReview() {
  const reviewInput = document.getElementById('review-input');
  const ratingInput = document.getElementById('rating-input');
  const reviewList = document.getElementById('review-list');

  const review = reviewInput.value;
  const rating = ratingInput.value;

  if (!review || !rating) return;

  const reviewItem = document.createElement('li');
  reviewItem.classList.add('review-list-item');

  const ratingStars = '⭐️'.repeat(rating);
  const html = `
    <p><strong>User:</strong> Anonymous</p>
    <p><strong>Rating:</strong> <span class="rating-stars">${ratingStars}</span></p>
    <p><strong>Review:</strong> ${review}</p>
  `;

  reviewItem.innerHTML = html;
  reviewList.appendChild(reviewItem);

  reviewInput.value = '';
  ratingInput.value = '';
}

function addModalReview() {
  const reviewInput = document.getElementById('modal-review-input');
  const ratingInput = document.getElementById('modal-rating-input');
  const modalReviewList = document.getElementById('modal-review-list');

  const review = reviewInput.value;
  const rating = ratingInput.value;

  if (!review || !rating) return;

  const reviewItem = document.createElement('li');
  reviewItem.classList.add('review-list-item');

  const ratingStars = '⭐️'.repeat(rating);
  const html = `
    <p><strong>User:</strong> Naman Rawal</p>
    <p><strong>Rating:</strong> <span class="rating-stars">${ratingStars}</span></p>
    <p><strong>Review:</strong> ${review}</p>
  `;

  reviewItem.innerHTML = html;
  modalReviewList.appendChild(reviewItem);

  reviewInput.value = '';
  ratingInput.value = '';
}

window.onclick = function (event) {
  const modal = document.getElementById('bookModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

