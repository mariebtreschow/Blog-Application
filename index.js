const express = require('express'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      displayRoutes = require('express-routemap'),
      morgan = require('morgan');

var app = express(),
    db = require('./models');

var adminRouter = require('./routes/admin');

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


app.post('/comments/:id', (req, res) => {
var incomingComent = req.body;
incomingComent.PostId = req.params.id;

   db.Comment.create(incomingComent).then((comment) => {
      return comment.getPost().then((post) => {
         res.redirect('/' + post.slug);
      });
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
   db.User.findOne({
      where: {
         email: req.body.email
      }
   }).then((userInDB) => {
      if (userInDB.passowrd === req.body.password) {
      } else {
         res.redirect('/admin/posts');
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
      post.getComments().then((comments) => {
         res.render('posts/show', {
            post: post,
            comments: comments
         });
      });
   });
});


// cannot getComments of post, post is equal to null__
db.sequelize.sync({force:false}).then(() => {
   app.listen(3000, (req, res) => {
      console.log('App listening on 3000!');
      displayRoutes(app);
   });
});
