var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("OwnerData", {
      
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Owner.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
     };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
     Owner.hook("beforeCreate", function(user) {
    owner.password = bcrypt.hashSync(owner.password, bcrypt.genSaltSync(10), null);
  });
    Owner.associate = function(models) {
    // Associating Owner with Dogs
    // When an Owner is deleted, also delete any associated Posts
    Owner.hasMany(models.Dog, {
      onDelete: "cascade"
    });
  };
    return Owner;
};