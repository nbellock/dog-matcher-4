var db = require("../models");
var fs = require("fs");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/usersurvey", function(req, res) {
    res.render("usersurvey");
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
      //an array referenced by a single JSON property in this case "foods") is expected over in HB
      //so it is constructed in the loop below. The callback result is too rich with meta data so it needed to be pared down.
      for (var i=0; i < result.length; i++) {
        hbsObject.dogdata.push(result[i].dataValues);
      }

    res.render("finddog", hbsObject);

  });

});

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


var surveyScoreArray = [];
app.post("/api/newsurvey",function(req,res){

    surveyScoreArray.push(req.body.q3);
    surveyScoreArray.push(req.body.q4);
    surveyScoreArray.push(req.body.q5);
    surveyScoreArray.push(req.body.q6);
    surveyScoreArray.push(req.body.q7);
    surveyScoreArray.push(req.body.q8);
    surveyScoreArray.push(req.body.q9);
    surveyScoreArray.push(req.body.q10);
    surveyScoreArray.push(req.body.q11);

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



var allDogsObjs = [];
var totalDiffArray = [];
// Retrieve all dogs from the database
// store each of their scores in an array
// push all 

if (surveyScoreArray !== []) { 
app.get("/api/new", function(req, res) { 

 db.Dog.findAll({}).then(function(result) {

    var dogObject = {dogdata:[]};
      //an array referenced by a single JSON property in this case "foods") is expected over in HB
      //so it is constructed in the loop below. The callback result is too rich with meta data so it needed to be pared down.
      for (var i=0; i < result.length; i++) {
        dogObject.dogdata.push(result[i].dataValues);
      }
      console.log(dogObject);

      var dogArray = [];
      for (var i = 0; i < dogObject.dogdata.length; i++) {
        var diffArray = [];
        var dogScores = {
          dogName: dogObject.dogdata[i].owner_name,
          score: []
        };
        var shedding = dogObject.dogdata[i].shedding;
        var energy = dogObject.dogdata[i].energy;
        var trainability = dogObject.dogdata[i].trainability;
        var kid = dogObject.dogdata[i].kid;
        var groom = dogObject.dogdata[i].groom;
        var drool = dogObject.dogdata[i].drool;
        var bark = dogObject.dogdata[i].bark;
        var independence = dogObject.dogdata[i].independence;
        var weight = dogObject.dogdata[i].weight;

        dogScores.score.push(shedding);
        dogScores.score.push(energy);
        dogScores.score.push(trainability);
        dogScores.score.push(kid);
        dogScores.score.push(groom);
        dogScores.score.push(drool);
        dogScores.score.push(bark);
        dogScores.score.push(independence);
        dogScores.score.push(weight);

        dogArray.push(dogScores);
      }
      console.log(surveyScoreArray);
      console.log(dogScores);
      console.log(dogArray);

      var count = 0;

      function checkCount() {
        if (count < dogObject.dogdata.length) {
          console.log("Number of Dogs in database: " + dogObject.dogdata.length);
          compareDogs();
        }
      }
      checkCount();

      function compareDogs() { 

        var scoreDiffArray = [];
        var currentDogScore = dogArray[count].score;

        for (var i = 0; i < currentDogScore.length; i++) {
          for (var i = 0; i < surveyScoreArray.length; i++) {
           var diff = parseInt(surveyScoreArray[i]) - parseInt(currentDogScore[i]);
           scoreDiffArray.push(Math.abs(diff));
          }

          function getSum(total, num) {
            return total + num;
          }

          var totalDiff = scoreDiffArray.reduce(getSum);
          totalDiffArray.push(totalDiff);
          count++;
          console.log("Score Diff Array: " + scoreDiffArray);
          console.log("Total Diff: " + totalDiff);
          checkCount();
        }

      }

      minNumber = Math.min( ...totalDiffArray );
      console.log("Lowest Number: " + minNumber);

      for (var i = 0; i < totalDiffArray.length; i++) {
        if(totalDiffArray[i] === minNumber) {
          var index = totalDiffArray.indexOf(totalDiffArray[i]);

          var match = {
            matchScore: minNumber,
            index: index,
            name: dogObject.dogdata[index].owner_name,
            breed: dogObject.dogdata[index].breed,
            pic: dogObject.dogdata[index].image
          }
        }
      }

      matchString = JSON.stringify(match);

      console.log("MATCH: " + matchString);

      res.render("match", match);


      });

  });
}

};

