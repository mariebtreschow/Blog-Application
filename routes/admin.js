var express = require('express'),
    db = require('../models'),
    router = express.Router();



 router.get('/posts', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/index', { posts: post });
   });
});

 router.get('/posts/new', (req, res) => {
   res.render('posts/new');
});

 router.post('/posts', (req, res) => {
   db.Post.create(req.body).then((post) => {
      res.redirect('/' + post.slug)
   }).catch((error) => {
      res.status(404).end();
   });
});

module.exports = router;
