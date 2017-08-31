var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt')

router.get('/:id', function(req, res){
  knex.raw(`SELECT * FROM users where users.id=${req.params.id}`)
  .then(function(data){
    res.render('users/personalDraw', {user:data.rows[0]})
  })
})

router.get('/', function(req, res){
  knex.raw(`SELECT * FROM users where users.id=${req.params.id}`)
  .then(function(data){
    res.render('users/show', {user:data.rows[0]})
  })
})

module.exports = router;
