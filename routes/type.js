var express = require('express');
var router = express.Router();

// Détails d'un immo
router.get('/type/ajouter', function(req, res, next) {
    if (req.session.id) {
        res.render('addTypeImmo', { title: 'Ajouter un type immobilier', username: req.session.username.toUpperCase() });
        
    } else {
        res.status(200);
        res.redirect("/");
    }
});


module.exports = router;
