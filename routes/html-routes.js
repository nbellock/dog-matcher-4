var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){


  app.get("/", function(req, res) {
    res.render("index");
  });


  app.get("/usersurvey", function(req, res) {
    res.render("usersurvey");
  });


  app.get("/listdog", isAuthenticated, function(req, res) {
      res.render("listdog");
  });


  app.get("/signin", function(req, res){
    res.render("signin");
  });


  app.get("/login", function(req, res){
    res.render("login");  
  });


  app.get("/finddog/:breed?", function(req, res) {
    var dogBreed = req.params.breed;
    if(dogBreed == undefined) {
      dogBreed = ["basset hound", "beagle", "boxer", "bull dog", "dalmation", "doberman", "cockapoo", "collie", "foxhound", "german shepherd", "golden retriever", "goldendoodle", "greyhound", "maltese", "mutt", "pit bull", "pomeranian", "poodle", "portuguese water dog", "pug", "saint bernard", "shih tzu", "siberian husky", "welsh terrier", "yorkshire terrier"]
    } else {
      dogBreed = dogBreed.split("+");
    }

    db.Dog.findAll({
      where: {
        breed: dogBreed
      }
    }).then(function(result){
        var hbsObject = {dogdata:[]};
        for (var i=0; i < result.length; i++) {
          hbsObject.dogdata.push(result[i].dataValues);
        }

      res.render("finddog", hbsObject);
    });
  });

  
}




