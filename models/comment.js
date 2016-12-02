'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
         lengthValidator: function(content) {
            if (content.length > 10000 ) {
               throw new Error('Comment is too long');
            }
         }
      }
   },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Posts',
          key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Post);
      }
    }
  });
  return Comment;
};
