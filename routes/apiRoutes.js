var db = require("../models");
var fs = require("fs");

module.exports = function(app) {
  //select - from the food table interfaced by the Food mode


var currentDogImage;
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
      image: currentDogImage
    }).then(function(newDog) {
      res.redirect("/finddog"); 
    });
  });


var multer = require('multer');
var storage =  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');


app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        currentDogImage = req.file.path;
       return res.redirect("/listdog");
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

app.post('/api/newsurvey',function(req,res){

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
      res.redirect("/finddog"); 
    });

});


  // //dormant api
  // app.get("/api/foods/:id", function(req, res) {
  //   db.Food.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(result) {
  //     res.json(result);
  //   });
  // });

  // //insert - req.body is created as JSON object passed over on the client side
  // app.post("/api/foods", function(req, res) {
  //   db.Food.create(req.body).then(function(result) {
  //     res.json(result);
  //   });
  // });

  //update
  // app.put("/api/foods/:id", function(req,res) {
  //   db.Food.update({
  //     name: req.body.name,
  //     eaten: req.body.eaten
  //   }, {
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(result) {
  //     res.json(result);
  //   });
  // });

  // //delete
  // app.delete("/api/foods/:id", function(req, res) {
  //   db.Food.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(result) {
  //     res.json(result);
  //   });
  // });

};
