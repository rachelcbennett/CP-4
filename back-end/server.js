
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

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 100000000
    }
});

// Create a scheme for projects
const userSchema = new mongoose.Schema({
    name: String
});
  
  // Create a model for projects
const User = mongoose.model('User', userSchema);


const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    ingredients: String,
    instructions:String,
    path: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.post('/api/users/:userID/recipes', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userID});
        if (!user) {
            res.send(404);
            return;
        }
        let recipe = new Recipe({
            user: user,
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            path: req.body.path,
        });
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});


app.get('/api/users/:userID/recipes', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userID});
        if (!user) {
            res.send(404);
            return;
        }
        let recipes = await Recipe.find({user:user});
        console.log("HEY")
        res.send(recipes);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});




app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
});



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
