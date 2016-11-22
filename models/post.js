'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Title cannot be empty'
         }
      }
   },
   slug: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Slug cannot be empoty'
         }
      }
   },
   content: {
      type: DataTypes.TEXT,
      validate: {
         notEmpty: {
            msg: 'Content cannot be empty'
         },
         lengthValidator: function(content) {
            if (content.length < 20) {
               throw new Error('Content is too short')
            }
         }
      }
   }
  }, {
    classMethods: {
      associate: function(models) {
         this.hasMany(models.Comment);
        // associations can be defined here
      }
    }
  });
  return Post;
};
