const express = require('express'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      morgan = require('morgan'),
      Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('marietreschow', 'marietreschow', 'asta', { dialect: 'postgres' }),
    db = require('./models')

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));


app.use(methodOverride((req, res) => {
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
         delete req.body._method;
      return method;
   }})
);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('index', { posts: post });
   });
});

app.get('/admin/posts', (req, res) => {
   db.Post.findAll({ order: 'id DESC' }).then((post) => {
      res.render('posts/index', { posts: post });
   });
});

app.get('/admin/posts/new', (req, res) => {
   res.render('posts/new');
});

app.get('/:slug', (req, res) => {
   db.Post.findOne({
       where: {
          slug: req.params.slug
      }
   }).then((post) => {
      res.render('posts/show', { post: post })
   }).catch((error) => {
      throw error;
   });
});

app.post('/posts', (req, res) => {
   db.Post.create(req.body).then((post) => {
      res.redirect('/' + post.slug)
   }).catch((error) => {
      res.status(404).end();
   });
});

db.sequelize.sync().then(() => {
   app.listen(3000, (req, res) => {
      console.log('App listening on 3000!');
   });
});
