
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/newestDB', {
  useNewUrlParser: true
});




// Create a scheme for projects
const userSchema = new mongoose.Schema({
    name: String
  });
  
  // Create a model for projects
const User = mongoose.model('User', userSchema);


// Create a new User
app.post('/api/users', async (req, res) => {
    const user = new User({
      name: req.body.name,
    });
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
      console.log('Not working...');
      res.sendStatus(500);
    }
});

// Get a list of all projects
app.get('/api/users', async (req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });




app.listen(3000, () => console.log('Server listening on port 3000!'));
