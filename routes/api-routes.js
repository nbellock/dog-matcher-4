var db = require("../models");
var passport = require("../config/passport");
var fs = require("fs");

module.exports = function(app) {


app.post("/api/filter", function(req, res) {
  var breed = req.body.breed;
  var stringBreed = breed.join("+");
  res.redirect("/finddog/" + stringBreed);
});


app.get("/listdog", function(req, res) {
  res.render("listdog");
});


var filename;
app.post("/api/new", function(req, res) {

  db.Dog.create({
    owner_name: req.body.name,
    breed: req.body.breed,
    location: req.body.zip,
    shedding: req.body.q4,
    energy: req.body.q5,
    trainability: req.body.q6,
    kid: req.body.q7,
    groom: req.body.q8,
    drool: req.body.q9,
    bark: req.body.q10,
    independence: req.body.q11,
    weight: req.body.q12,
    image: filename
  }).then(function(newDog) {
    res.send(res); 
  });
});


app.post("/api/photo/", function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let currentDogImage = req.files.userPhoto;
  var randomNum = Math.floor(Math.random() * 50000);
  filename = randomNum + req.files.userPhoto.name;
  console.log(filename);
  console.log(currentDogImage);
 
  // Use the mv() method to place the file somewhere on your server
  currentDogImage.mv('./public/uploads/' + filename, function(err) {
 
    res.send(filename);
  });
});


app.put("/api/dogs/:id", function(req, res) {
  db.Dog.update({
      treats: req.body.treats
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });


app.post("/api/newsurvey",function(req,res){
    db.User.create({
      name: req.body.name,
      location: req.body.zip,
      shedding: req.body.q3,
      energy: req.body.q4,
      trainability: req.body.q5,
      kid: req.body.q6,
      groom: req.body.q7,
      drool: req.body.q8,
      bark: req.body.q9,
      independence: req.body.q10,
      weight: req.body.q11
    }).then(function(newSurvey) {
      res.redirect("/api/new"); 
    });
});


app.post('/api/newOwner', function(req, res) {
  db.OwnerData.create({
    username: req.body.uname,
    password: req.body.psw, 
    firstname: req.body.fn,
    lastname: req.body.ln,
    email: req.body.email,
    address: req.body.address
     }).then(function() {
      res.redirect("/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.get("/api/login", passport.authenticate("local"), function(req, res) {
      res.redirect("/listdog");
  });

   app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

   app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


};

