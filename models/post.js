'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         len: [4, 500]
      }
   },
   slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         len: [4, 600]
      }
   },
   content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
         lengthValidator: function(content) {
            if (content.length < 20) {
               throw new Error('Content is too short');
            }

            if (content.length > 100000000) {
               throw new Error('Content is too long');
            }
         }
      }
   }
  }, {
    classMethods: {
      associate: function(models) {
         this.belongsTo(models.User);
         this.hasMany(models.Comment);
        // associations can be defined here
      }
    }
  });
  return Post;
};
