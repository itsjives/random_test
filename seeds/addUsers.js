var bcrypt = require('bcrypt');
const saltRounds = 7;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test', password: `${bcrypt.hashSync('test', saltRounds)}`, isAdmin: false},
        {username: 'reese', password: `${bcrypt.hashSync('reese', saltRounds)}`, isAdmin: false},
        {username: 'kyle', password: `${bcrypt.hashSync('kyle', saltRounds)}`, isAdmin: false},
        {username: 'thomas', password: `${bcrypt.hashSync('thomas', saltRounds)}`, isAdmin: false},
        {username: 'johnny', password: `${bcrypt.hashSync('johnny', saltRounds)}`, isAdmin: false},
        {username: 'ismael', password: `${bcrypt.hashSync('ismael', saltRounds)}`, isAdmin: false},
        {username: 'admin', password: `${bcrypt.hashSync('admin', saltRounds)}`, isAdmin: true},
      ]);
    });
};
