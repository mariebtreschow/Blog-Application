var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();


router.get('/posts', (req, res) => {
   if (req.session.user) {
      db.Post.findAll({ order: 'id DESC' }).then((post) => {
         res.render('posts/index', { posts: post, user: req.session.user });
      });
   } else {
      res.render('/login');
   }
});

router.get('/posts/edit', (req, res) => {
   if (req.session.user) {
      db.Post.findAll({ order: 'id DESC' }).then((post) => {
         res.render('posts/edit', { post: post, user: req.session.user });
      });
   } else {
      res.render('/login');
   }
});

router.post('/posts', (req, res) => {
   if (req.session.user) {
      db.Post.create(req.body).then((post) => {
         res.redirect('/' + post.slug);
      }).catch((error) => {
         res.render('posts/new', { errors: error.errors, user: req.session.user })
      });
   } else {
      res.render('/login');
   }
});

router.get('/posts/new', (req, res) => {
   if (req.session.user) {
      res.render('posts/new', { user: req.session.user });
   } else {
      res.render('/login');
   }
});


router.get('/posts/:id/edit', (req, res) => {
   if (req.session.user) {
      db.Post.findOne(req.body, {
         where: {
            id: req.params.id
         }
      }).then((post) => {
         res.render('posts/edit', { post : post, user: req.session.user });
      });
   } else {
      res.render('/login');
   }
});

router.put('/posts/:id', (req, res) => {
   if (req.session.user) {
      db.Post.update(req.body, {
         where: {
            id: req.params.id
         }
      }).then(() => {
         res.redirect('/admin/posts');
      });
   } else {
      res.render('/login');
   }
});

router.delete('/posts/:id', (req, res) => {
   if (req.session.user) {
      db.Post.destroy({
         where: {
            id: req.params.id
         }
      }).then(() => {
         res.redirect('/admin/posts');
      });
   } else {
      res.render('/login');
   }
});


module.exports = router;
