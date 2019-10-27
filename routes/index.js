var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.id) {
        res.status(200);
        res.render('accueil', { title: 'Bienvenue dans l\'administration', username: req.session.username.toUpperCase() });        
    } else {
        res.status(200);
        res.redirect("/")
    }
});

// Notifications
router.get('/notifications', function(req, res, next) {
    if (req.session.id) {
        res.status(200);
        res.render('notifications', { title: 'Notifications', username: req.session.username.toUpperCase() });        
    } else {
        res.status(200);
        res.redirect("/")
    }
});


module.exports = router;
