var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();


router.get('/posts', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/index', { posts: post });
   });
});

router.get('/posts/edit', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/edit', { post: post });
   });
});

router.post('/posts', (req, res) => {
   db.Post.create(req.body).then((post) => {
      res.redirect('/' + post.slug);
   }).catch((error) => {
      res.status(404).end();
   });
});

router.get('/posts/new', (req, res) => {
   res.render('posts/new');
});


router.put('/posts/:id/edit', (req, res) => {
   db.Post.update(req.body, {
      where: {
         id: req.params.id
      }
   }).then(() => {
      res.redirect('/admin/posts/edit');
   }).catch((error) => {
      throw error;
   });
});

router.delete('/posts/:id', (req, res) => {
   db.Post.destroy({
      where: {
         id: req.params.id
      }
   }).then(() => {
      res.redirect('/admin/posts');
   }).catch((error) => {
      throw error;
   });
});


module.exports = router;
