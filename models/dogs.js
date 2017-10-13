module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("DogData", {
    
    owner_name: DataTypes.STRING,

    owner_name: DataTypes.STRING,
    breed: DataTypes.STRING,
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    shedding: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    energy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    trainability : {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    kid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    groom_interval: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    groom_metric: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    hypoallergenic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    bark: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    independence: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    lifespan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    adoptable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  });

  Dog.associate = function(models) {
    Dog.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Dog;
};
