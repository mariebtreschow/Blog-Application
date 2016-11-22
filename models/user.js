'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
             msg: 'Name cannot be empty'
         }
      }
   },
    surname: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Surname cannot be empty'
         }
      }
   },
    email: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Email cannot be empty'
         },
         isEmail: {
            msg: 'Must be in validate email form'
         },
         lengthValidator: function(value) {
            if (value.length < 5) {
               throw new Error('Email must be longer than 5 characters')
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
