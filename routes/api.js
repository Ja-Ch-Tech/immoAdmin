var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var API = require("../manageURL").URL().API;
var session = require("cookie-session");

var app = express();

app.use(session({
    secret: "fhzyeopuiaziofhihgezo"
}))

//Permet de faire la connexion
router.post('/login', (req, res) => {
    
    if ((req.body.username && req.body.username.trim(" ")) || (req.body.pswd && req.body.pswd.trim(" "))) {
        var data = {
            username: req.body.username,
            pswd: req.body.pswd
        }

        axios.post(`${API}/admin/login`, data)
            .then(datas => {

                if (datas.data.getEtat) {
                    req.session.id = datas.data.getObjet.id_admin;
                    req.session.username = datas.data.getObjet.username;

                    if (req.session.id && req.session.username) {;

                        res.status(200);
                        res.send(datas.data);
                    }

                } else {

                    res.status(200);
                    res.send(datas.data)
                }
            })
            .catch(error => {
                res.send(error)
            })
    } else {
        res.send({ getEtat: false, getMessage: "Champ obligatoire" })
    }
})

//Permet le test de l'existance d'une connexion
router.get('/adminid', (req, res) => {
    let id = req.session.id ? req.session.id : null,
        obj = {
            "id_admin": id
        };

    res.status(200);
    res.send(obj)
})

//Permet de définir les notifications
router.get('/setNotication/:id/:limit', (req, res) => {
    axios.get(`${API}/admin/notification/${req.params.id}/${req.params.limit ? parseInt(req.params.limit, 10) : null}`)
         .then(response => {
             res.status(200);
             res.send(response.data)
         })
         .catch(err => {
             res.status(500);
             res.send(err);
         })
})

//Permet la récupération de détails d'un immobilier
router.get('/details/:id', (req, res) => {
    axios.get(`${API}/immobilier/getDetails/${req.params.id}`)
        .then(response => {
            res.status(200);
            res.send(response.data)
        })
        .catch(err => {
            res.status(500);
            res.send(err)
        })
});

//Permet le changement de décison
router.get('/toggle/:id_immo', (req, res) => {
    axios.get(`${API}/admin/immobilier/toggleValidation/${req.session.id}/${req.params.id_immo}`)
         .then(response => {
             res.status(200);
             res.send(response.data)
         })
         .catch(err => {
             res.status(500);
             res.send(err)
         })
});

//Permet le comptage des immobiliers
router.get('/countImmo', (req, res) => {
    axios.get(`${API}/admin/immobilier/count/${req.session.id}`)
        .then(response => {
            res.status(200);
            res.send(response.data);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
});

//Permet le comptage des utilisateurs
router.get('/countUsers', (req, res) => {
    axios.get(`${API}/admin/users/count/${req.session.id}`)
        .then(response => {
            res.status(200);
            res.send(response.data);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
});

//La route permettant de décliner une demande de publication des immobiliers
router.post('/declineRequest', (req, res) => {
    axios.post(`${API}/admin/immobilier/declineRequest/${req.session.id}/${req.body.id_immo}`, {cause: "Réfus total"})
         .then(response => {
            res.status(200);
            res.send(response.data);
         })
         .catch(err => {
            res.status(500);
            res.send(err);
         })
})

//Route pour la définition de lecture d'une notification par un administrateur
router.post('/setRead', (req, res) => {
    axios.post(`${API}/setRead/${req.session.id}/${req.body.id_notif}`)
         .then(response => {
             res.status(200);
             res.send(response.data);
         })
         .catch(err => {
             res.status(500);
             res.send(err);
         })
})

module.exports = router;