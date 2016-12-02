var assert = require('assert');
var db = require('../models');

describe('Post Model Testing', () => {
   before((done) => {
      db.sequelize.sync({ force: true }).then(() => {
         done();
      });
   });

   it('create a blog post', (done) => {
      db.Post.create({
         title: 'Maries awesome blog post',
         slug: 'maries-awesome-blog-post',
         content: 'This is too freakin awesome'
      }).then((post) => {
         assert.equal(post.isNewRecord, false);
         assert.equal(post.title, 'Maries awesome blog post');
         assert.equal(post.slug, 'maries-awesome-blog-post');
         assert.equal(post.content, 'This is too freakin awesome');
         done();
      });
   });

   it('cannot create a post if title missing', (done) => {
      db.Post.create({
         slug: 'maries-awesome-blog-post',
         content: 'This is too freakin awesome'
      }).catch((error) => {
         assert.equal(error.errors[0].message, 'title cannot be null');
         done();
      });
   });

   it('cannot create a post when content is missing', (done) => {
      db.Post.create({
         title: 'Maries awesome blog post',
         slug: 'maries-awesome-blog-post'
      }).catch((error) => {
         assert.equal(error.errors[0].message, 'content cannot be null');
         done();
      });
   });

   it('update a blog post', (done) => {
      db.Post.update({
         title: 'Maries new title',
         slug: 'maries-new-title',
         content: 'This is the new content in this update post'
      }, { where: {
         title: 'Maries awesome blog post',
         slug: 'maries-awesome-blog-post',
         content: 'This is too freakin awesome'
      },
      returning: true
   }).then((updateData) => {
      var post = updateData[1][0];

      assert.equal(post.title, 'Maries new title');
      assert.equal(post.slug, 'maries-new-title');
      assert.equal(post.content, 'This is the new content in this update post');
      done();

      });
   });

   it('deleting a blog post', (done) => {
      db.Post.destroy({
         where: {
            title: 'Maries new title'
         }
      }).then((destroyRecordCount) => {
         assert.equal(destroyRecordCount, 1);
         done();
      });
   });
});

describe('Comments Model Testing', () => {
   before((done) => {
      db.sequelize.sync({ force: true }).then(() => {
         done();
      });
   });

   it('comments are creating', (done) => {
      db.Comment.create({
         content: 'Great one!'
      }).then((comment) => {
         assert.equal(comment.content, 'Great one!');
         done();
      });
   });

   it('comments canot be create if no content', (done) => {
      db.Comment.create({

      }).catch((error) => {
         assert.equal(error.errors[0].message, 'content cannot be null');
         done();
      });
   });

   it('comments cannot be too long', (done) => {
      db.Comment.create({
         conent: 'This is a very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long comment'
      }).catch((error) => {
         assert.equal(error.errors[0].message, 'content cannot be null');
         done();
      });
   });
});
