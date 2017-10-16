var db = require("../models");
var fs = require("fs");

module.exports = function(app) {
  //select - from the food table interfaced by the Food model
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
      res.redirect("/finddog"); 
    });
  });



app.post("/api/photo/", function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let currentDogImage = req.files.userPhoto;
  filename = req.files.userPhoto.name;
  console.log(filename);
  console.log(currentDogImage);
 
  // Use the mv() method to place the file somewhere on your server
  currentDogImage.mv('./uploads/' + filename, function(err) {
 
    res.redirect("/listdog");
  });
});

// var multer = require('multer');
// var storage =  multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
// var upload = multer({ storage : storage}).single('userPhoto');


// app.post('/api/photo',function(req,res){
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         currentDogImage = req.file.filename;
//         // console.log(req.file);
//         res.redirect("/listdog");
//     });
// });

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
