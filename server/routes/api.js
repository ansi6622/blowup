var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

 function Posts(posts) {
  return knex('posts')
};

/* GET home page. */
router.post('/me', function(req, res, next) {
    if(req.headers.authorization === "null"){
      console.log(req.headers);
      res.json({header: req.headers});
    } else if(req.headers.authorization){
      res.json({secret:req.headers.authorization, header: req.headers})
    } else{
      res.json({fucked:"You has no chance"})
    }
  });

router.get('/list', function(req, res, next) {
  console.log('meow');
  Posts().then(function(posts){
    console.log(posts);
    res.json(posts);
  })
  });

router.post('/create', function(req, res, next) {
    var data = {
      title: req.body.title,
      body: req.body.body,
      user_id: req.body.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }
    knex('posts').insert(data).returning('*').then(function (posts) {
      res.json(posts[0]);
    })
  });

router.post('/update', function(req, res, next) {
  res.json({ title: 'upKnexStuffQueries' });
});

router.post('/login', function(req, res, next) {
  res.json({ token: 'supersecret' });
});

router.get('/me', function(req, res, next) {
  if(req.headers.authorization.split("")[1] === null){
    res.json({ header: req.headers});
  } else {
    res.json({luck:"not that lucky", header: req.headers})
  }
});

module.exports = router;
