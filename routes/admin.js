var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

var userLoggedIn = (req, res, next) => {
   if (req.session.user) {
      next();
   } else {
      res.redirect('/login');
   }
};

router.use(userLoggedIn);

router.get('/posts', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/index', { posts: post, user: req.session.user });
   });
});

router.get('/posts/edit', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/edit', { post: post, user: req.session.user });
   });
});

router.post('/posts', (req, res) => {
   db.Post.create(req.body).then((post) => {
      res.redirect('/' + post.slug);
   }).catch((error) => {
      res.render('posts/new', { errors: error.errors, user: req.session.user })
   });
});

router.get('/posts/new', (req, res) => {
   res.render('posts/new', { user: req.session.user });
});


router.get('/posts/:id/edit', (req, res) => {
   db.Post.findOne(req.body, {
      where: {
         id: req.params.id
      }
   }).then((post) => {
      res.render('posts/edit', { post : post, user: req.session.user });
   });
});

router.put('/posts/:id', (req, res) => {
   db.Post.update(req.body, {
      where: {
         id: req.params.id
      }
   }).then(() => {
      res.redirect('/admin/posts');
   }).catch((error, post) => {
      res.render('posts/edit', { errors: error.errors, user: req.session.user, post: post });
   });
});

router.delete('/posts/:id', (req, res) => {
   db.Post.destroy({
      where: {
         id: req.params.id
      }
   }).then(() => {
      res.redirect('/admin/posts');
   });
});


module.exports = router;
