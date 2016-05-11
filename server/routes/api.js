var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/list', function(req, res, next) {
  knex('musicals').then(function (musicals) {
      res.json(musicals);
    })});

router.post('/create', function(req, res, next) {
    var data = {
      name: req.body.name,
      created_at: new Date(),
      updated_at: new Date(),
    }
    knex('musicals').insert(data).returning('*').then(function (musicals) {
      res.json(musicals[0]);
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
