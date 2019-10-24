var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accueil', { title: 'Bienvenue dans l\'administration' });
});

// Notifications
router.get('/notifications', function(req, res, next) {
  res.render('notifications', { title: 'Notifications' });
});


module.exports = router;
