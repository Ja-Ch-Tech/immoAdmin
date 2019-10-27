var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.id) {
        res.status(200);
        res.redirect("/dashboard")
    }else{
        res.status(200);
        res.render('login', { title: 'Connexion à l\'administration' });
    }
});

module.exports = router;
