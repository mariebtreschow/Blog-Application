const bcrypt = require('bcrypt');

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
      }
   },
   password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
         console.log('set called on password attribute change, now adding password digest');
         this.setDataValue('passwordDigest', bcrypt.hashSync(val, 10));
      }
   },
   fullName: {
      type: DataTypes.VIRTUAL,
      get: function() {
         return this.getDataValue('name') + " " + this.getDataValue('surname');
      }
   },
   passwordDigest: DataTypes.STRING,
   passwordResetToken: DataTypes.STRING
 }, {
   classMethods: {
      associate: function(models) {
         this.hasMany(models.User);
      }
   },
   hooks: {
      beforeCreat: function(user, options) {

      }
   },
});
     return User;
  };
