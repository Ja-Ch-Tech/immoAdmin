var express = require('express');
var router = express.Router();

// Détails d'un immo
router.get('/immobilier/:id_immo/details', function(req, res, next) {
  res.render('immoDetails', { title: 'Détails immobilier' });
});


module.exports = router;
