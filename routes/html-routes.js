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

  app.get("/finddog", function(req, res) {

    // res.render("index");
    db.Dog.findAll({}).then(function(result) {
      // console.log(res.json(result));

      var hbsObject = {dogdata:[]};
      //an array referenced by a single JSON property in this case "foods") is expected over in HB
      //so it is constructed in the loop below. The callback result is too rich with meta data so it needed to be pared down.
      for (var i=0; i < result.length; i++) {
        hbsObject.dogdata.push(result[i].dataValues);
      }
      console.log(hbsObject);
      res.render("finddog", hbsObject);
    });
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
}