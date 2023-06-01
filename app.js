const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb+srv://naman_rawal__:mongoDB098@cluster0.ljwawpx.mongodb.net/login_signup_bookly?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');

    app.post('/login', (req, res) => {
      const email = req.body.email;
      const password = req.body.password;

      const collection = client.db('your_database_name').collection('your_collection_name');
      collection.findOne({ email: email }, (err, user) => {
        if (err) {
          console.error('Error finding user:', err);
          res.status(500).send('Internal Server Error');
        } else if (!user) {
          res.status(404).send('User not found');
        } else if (password !== user.password) {
          res.status(401).send('Incorrect password');
        } else {
          res.status(200).send('Login successful');
        }
      });
    });

    app.listen(3003, () => {
      console.log('App listening on port 3000');
    });
  }
});
