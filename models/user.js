'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Email cannot be empty'
         },
         isEmail: {
            msg: 'Must validate email form'
         },
         lengthValidator: function(value) {
            if (value.length < 2 || value.length > 250) {
               throw new Error('Content must be between 2 and 250 characters')
            }
         }
      }
   },
   password: DataTypes.STRING
 }, {
   classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
