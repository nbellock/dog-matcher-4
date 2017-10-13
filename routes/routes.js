var db = require("../models");

module.exports = function(app) {
  //select - from the food table interfaced by the Food model
  app.get("/", function(req, res) {
    db.Food.findAll({}).then(function(result) {
      var hbsObject = {foods:[]};
      //an array referenced by a single JSON property in this case "foods") is expected over in HB
      //so it is constructed in the loop below. The callback result is too rich with meta data so it needed to be pared down.
      for (var i=0; i < result.length; i++) {
        hbsObject.foods.push(result[i].dataValues);
      }

      res.render("index", hbsObject);
    });
  });

  //dormant api
  app.get("/api/foods/:id", function(req, res) {
    db.Food.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  //insert - req.body is created as JSON object passed over on the client side
  app.post("/api/foods", function(req, res) {
    db.Food.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  //update
  app.put("/api/foods/:id", function(req,res) {
    db.Food.update({
      name: req.body.name,
      eaten: req.body.eaten
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  //delete
  app.delete("/api/foods/:id", function(req, res) {
    db.Food.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

};
