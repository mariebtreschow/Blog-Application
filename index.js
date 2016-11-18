const express = require('express'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      morgan = require('morgan');

var app = express(),
    db = require('./models');

var adminRouter = require('./routes/admin');

console.log(db.Comment);

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

app.use('/admin', adminRouter);


app.post('/comments', (req, res) => {
   console.log(req.body);
   db.Comment.create(req.body).then((comment) => {
      console.log('comment is created!!!');
      res.redirect('/');
   });
});

app.get('/', (req, res) => {
  db.Post.findAll({ order: 'id DESC' }).then((post) => {
     res.render('index', { posts: post });
  });
});

app.get('/register', (req, res) => {
   res.render('users/new');
});

app.post('/users', (req, res) => {
   db.User.create(req.body).then((user) => {
      res.redirect('/');
   }).catch(() => {
      res.redirect('/register');
   });
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.post('/login', (req, res) => {
   db.findOne({
      where: {
         email: req.body.email
      }
   }).then((userInDB) => {
      if (userInDB.passowrd === req.body.password) {
      } else {
         res.redirect('/login');
      }
   }).catch(() => {
      res.redirect('/register');
   });
});

app.get('/:slug', (req, res) => {
   db.Post.findOne({
       where: {
          slug: req.params.slug
      }
   }).then((post) => {
      res.render('posts/show', { post : post })
   }).catch((error) => {
      throw error;
   });
});

db.sequelize.sync().then(() => {
   app.listen(3000, (req, res) => {
      console.log('App listening on 3000!');
   });
});
