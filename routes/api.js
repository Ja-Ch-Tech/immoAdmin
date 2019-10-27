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

                    if (req.session.id) {;

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

module.exports = router;