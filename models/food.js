module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    eaten: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Food;
};
