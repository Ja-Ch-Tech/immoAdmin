var express = require('express');
var router = express.Router();

// Détails d'un immo
router.get('/immobilier/:id_immo/details', function(req, res, next) {
    if (req.session.id) {
        res.render('immoDetails', { title: 'Détails immobilier', username: req.session.username.toUpperCase() });
        
    } else {
        res.status(200);
        res.redirect("/");
    }
});


module.exports = router;
