$(document).ready(function () {
    initAdminImmo();
})

function initAdminImmo() {

    getAdminId((isMatched, result) => {
        if (isMatched) {
            var path = window.location.pathname.split("/dashboard");
            if (/immobilier/g.test(path) && /details/i.test(path[path.length - 1].split("/")[path[path.length - 1].split("/").length - 1])) {
                getDetails(path[path.length - 1].split("/")[path[path.length - 1].split("/").length - 2])
           }

            if ((path[path.length - 1] == "/") || (path[path.length - 1] == "")) {
               setCountImmo();
            }
        }
    })
    addTypeImmo();
}

function getDetails(id_immo) {
    $.ajax({
        type: 'GET',
        url: "/api/details/" + id_immo,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.getEtat) {
                var {getObjet} = data,
                    viewButton = () => {
                        if (getObjet.validate) {
                            return  `<button class="float-right btn btn-danger" onclick="toggleDecision('${id_immo}', $(this), 'retirer')"><i class="zmdi zmdi-close-circle-o"></i>&nbsp;Rétirer</button>`;
                        } else {
                            return `<button class="float-right btn btn-success" onclick="toggleDecision('${id_immo}', $(this), 'autoriser')"><i class="zmdi zmdi-case-check"></i>&nbsp;Autoriser</button>`;
                        }
                    },
                    content = `<section class="au-breadcrumb m-t-75">
                    <div class="section__content section__content--p30">
                        <div class="container-fluid">
                            
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="au-breadcrumb-content">
                                        <div class="au-breadcrumb-left">
                                            <h3 class="title-3" style="text-transform: uppercase"><i class="zmdi zmdi-hotel"></i>Détails ${getObjet.type} à ${getObjet.adresse.commune}</h3>
                                           
                                        </div>
                                        <div class="au-breadcrumb-right">
                                            <a onclick="launchModalContact('${getObjet._id}')" style="margin-left:10px;" href="#" type="button" class="btn btn-secondary pull-right" data-toggle="modal" data-target="#contactModal">
                                                <i class="zmdi zmdi-accounts"></i>&nbsp;Contact (${getObjet.nbreInterrest})
                                            </a>
                                            <a onclick="launchModalInfos('${getObjet.id_owner}')" href="#" type="button" class="btn btn-success pull-right" data-toggle="modal" data-target="#infosModal">
                                                <i class="zmdi zmdi-account"></i>&nbsp;Infos proprietaire
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="section__content section__content--p0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title text-uppercase">Publié par <b><a href="#">${getObjet.prenomOwner+ " "+ getObjet.nomOwner}</a></b><br>
                                            <small style="margin-top: -15px;" class="text-capitalize">${customDate2(getObjet.created_at)}</small>

                                            ${viewButton()}

                                            <button class="float-right btn btn-info mr-3" onclick="refuser('${id_immo}')"><i class="zmdi zmdi-close-circle-o"></i>&nbsp;Pas d'autorisation</button>
                                           
                                        </strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                        <!-- The grid: four columns -->
                                            <div id="listImagesForImmo" class="row">
                                                
                                            </div>
                                            
                                            <!-- The expanding image container -->
                                            <div class="container">
                                                
                                                <!-- Expanded image -->
                                                <img src="${getObjet.detailsImages.length > 0 ? getObjet.detailsImages[0].srcFormat : "/images/house-default.jpg"}" id="expandedImg" style="width:100%">
                                                
                                                <!-- Image text -->
                                                <div id="imgtext">
                                                    ${getObjet.detailsImages.length > 0 ? getObjet.detailsImages[0].intitule : "default Avatar"}
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="container">
                        <div style="padding-bottom:15px;" class="row">
                            <div class="col-md-3">
                                <p><b>TYPE : </b> ${getObjet.type}</p>
                            </div>
                            <div class="col-md-3">
                                <p><b>MODE : </b> ${getObjet.mode}</p>
                            </div>
                            <div class="col-md-6">
                                <p><b>ADRESSE : </b>commune ${getObjet.adresse.commune}, avenue ${getObjet.adresse.avenue}, numero ${getObjet.adresse.numero}, reference ${getObjet.adresse.reference}</p>
                            </div>
                        </div>
                        <div style="padding-bottom:15px;" class="row">
                            <div class="col-md-2">
                                <p><b>PRIX : </b> ${getObjet.prix}$</p>
                            </div>
                            <div class="col-md-3">
                                <p><b>NBRE CHAMBRE : </b> ${getObjet.nbreChambre}</p>
                            </div>
                            <div class="col-md-3">
                                <p><b>NBRE DOUCHE : </b> ${getObjet.nbreDouche}</p>
                            </div>
                            <div class="col-md-2">
                                <p><b>NBRE PIECE : </b> ${getObjet.nbrePiece}</p>
                            </div>
                            <div class="col-md-2">
                                <p><b>SURFACE : </b> ${getObjet.surface}</p>
                            </div>
                        </div>
                        <div style="padding-bottom:15px;" class="row">
                            <div class="col-md-12">
                                <p><b>DESCRIPTION : </b> ${getObjet.description}</p>
                                
                            </div>
                        </div>
                    </div>
                </section>`;

                $("#containsDetails").html(content);
                getObjet.detailsImages.map(image => {
                    var image = `<div class="column">
                                    <img title="${image.intitule}" src="${image.srcFormat}" alt="${image.intitule}" onclick="displayImage(this);">
                                </div>`;
                    
                    $("#listImagesForImmo").append(image);
                });
            }
        }
    });
}


function toggleDecision(id_immo, element, type) {
    $.ajax({
        type: 'GET',
        url: `/api/toggle/${id_immo}`,
        dataType: "json",
        beforeSend : function () {
            element[0].innerHTML = "Chargement...";
        },
        success: function (data) {
            
           
            if (data.getObjet) {
                getDetails(id_immo)
                if (type == 'retirer') {
                    swal(
                        {
                            title: "DESACTIVATION IMMOBILIER", 
                            html: "La desactivation de l'immobilier à reussit avec success, cet immobilier ne sera plus afficher sur le site", 
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: "Fermer",
                            confirmButtonColor: "#DD6B55"
                            
                        }
                    );
                }else if (type == 'autoriser') {
                    swal(
                        {
                            title: "ACTIVATION IMMOBILIER", 
                            html: "L'activation de l'immobilier à reussit avec success", 
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: "Fermer",
                            confirmButtonColor: "#DD6B55"
                            
                        }
                    );
                }
            }
        }
    });
}

function setCountImmo() {
    $.ajax({
        type: 'GET',
        url: "/api/countImmo",
        dataType: "json",
        success: function (data) {
            if (data.getEtat) {
                console.log("a");
                
                $("#countImmo").text(data.getObjet.total);   
            }
        }
    });
}

//Fonction permettant le réfuser de publier un immobilier qui est en attente
function refuser(id_immo) {
    $.ajax({
        type: 'POST',
        url: "/api/declineRequest",
        data: {
            "id_immo": id_immo
        },
        dataType: "json",
        success: function (data) {
            if (data.getEtat) {
                window.location.href = window.location.pathname;
            }
        }
    });
}

//Ajoute un type immobilier
function addTypeImmo() {
    $("#typeAddForm").on('submit', function (e) {
        e.preventDefault();
        var inputs = e.target.elements;
            objData = {};
        for (var index = 0; index < inputs.length; index++) {
            
            if (/input/i.test(e.target.elements[index].localName)) {

                objData[inputs[index].name] = inputs[index].value;

            }
        }

        if (objData.intitule !== "") {
            $.ajax({
                type: 'POST',
                url: "/api/type/create",
                dataType: "json",
                data: objData,
                beforeSend : function () {
                    $("#addType")[0].innerHTML = "AJOUT EN COURS...";
                },
                success: function (data) {
                    $("#addType")[0].innerHTML = "VALIDER";
                    $("#errorMessageType").html(`<div class="alert alert-success">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Success!</strong> Le type a été ajouter avec success
                      </div>`)
                }
            });
        }else{

            $("#errorMessageType").html(`<div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Erreur!</strong> Veuillez renseigner l'intitulé du type
          </div>`)
        }
    })
}

//Recupere les contacts sur un immobilier
function launchModalContact(id_immo) {
    $.ajax({
        type: 'GET',
        url: "/api/listUserInterest/" + id_immo,
        dataType: "json",
        success: function (data) {
            if (data.getEtat) {
                var data = data.getObjet,
                infos = `<div class="modal-header">
                    <h5 class="modal-title">Liste contacts (${data.length})</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div style="height:300px;overflow-y:scroll;" class="modal-body">
                        <div class="row" id="contentContactList"></div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  </div>`;
                $("#contactModalContent").html(infos);
                data.map(user => {
                    var contact = function () {
                            user.contacts.map(contact => {
                                $("#contact_user_phone_" + user._id).append(`<span style="background-color:#eee;padding:5px;margin-left:5px;">${contact.telephone}</span>`);

                                $("#contact_user_email_" + user._id).append(`<p style="background-color:#eee;padding:5px;margin-left:5px;margin-bottom:10px;"><i class="zmdi zmdi-email"></i>&nbsp;${contact.email}</p>`);
                            });
                            
                        },
                         infosContactUser = `<div class="col-md-6"> 
                            <div class="card">
                                <div class="card-header">
                                    <center>
                                        <img class="img-thumbnail" style="height:12em;" src="${user.image.srcFormat}" title="" />
                                        <h4>${user.prenom}&nbsp;${user.nom}</h4>
                                    </center>
                                </div>
                                <div class="card-body">
                                    <center>
                                        <p style="margin-bottom:15px;"><i class="zmdi zmdi-my-location"></i>&nbsp; ${user.adresse.avenue ? `<span>Avenue : <span>${user.adresse.avenue}</span></span>` : ""} ${user.adresse.numero ? `<span>${user.adresse.numero}</span>` : ""}, ${user.adresse.quartier ? `<span>Quartier : <span>${user.adresse.quartier}</span></span>` : ""}, ${user.adresse.commune ? `<span>${user.adresse.commune}</span>` : ""}</p>
                                    </center>
                                    <p  style="margin-bottom:15px;" id="contact_user_phone_${user._id}"><i class="zmdi zmdi-phone"></i>&nbsp;</p>
                                    <div  style="margin-bottom:15px;" id="contact_user_email_${user._id}"></div>
                                </div>
                            </div> 
                        </div>`;

                    $("#contentContactList").append(infosContactUser);

                    contact();
                });
            }else{
                $("#contactModalContent").html(`<div class="modal-header">
                    <h5 class="modal-title">Liste contacts (0)</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div style="height:300px;overflow-y:scroll;" class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <center><h2>AUCUN CONTACT TROUVE POUR CET IMMOBILIER</h2></center>
                            </div>
                        </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  </div>`);
            }
            
            
        }
    });
}

//recupere les infos du proprietaire d'un immobilier
function launchModalInfos(id_users) {
    $.ajax({
        type: 'GET',
        url: "/api/immo_contact/" + id_users,
        dataType: "json",
        success: function (data) {
            var sortieContact = 0,
                contact = function () {
                    data.getObjet.contacts.map(contact => {
                        $("#contact_phone").append(`<span style="background-color:#eee;padding:5px;margin-left:5px;">${contact.telephone}</span>`);

                        $("#contact_email").append(`<span style="background-color:#eee;padding:5px;margin-left:5px;">${contact.email}</span>`);
                    });
                    
                },

                infos = ` <div class="modal-header">
                    <h5 class="modal-title"><img style="height:100px;width:100px;" class="img-thumbnail" src="${data.getObjet.image.srcFormat}" title="${data.getObjet.image.name}">&nbsp;${data.getObjet.prenom} ${data.getObjet.nom}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div height:300px;overflow-y:scroll;overflow-x:hidden;" class="modal-body">
                    <p style="margin-bottom:15px;"><i class="zmdi zmdi-my-location"></i>&nbsp; ${data.getObjet.adresse.avenue ? `<span>Avenue : <span>${data.getObjet.adresse.avenue}</span></span>` : "Avenue non renseignée"} ${data.getObjet.adresse.numero ? `<span>${data.getObjet.adresse.numero}</span>` : "numero non renseigné"}, ${data.getObjet.adresse.quartier ? `<span>Quartier : <span>${data.getObjet.adresse.quartier}</span></span>` : "Quartier non renseigné"}, ${data.getObjet.adresse.commune ? `<span>${data.getObjet.adresse.commune}</span>` : "Commune non renseignée"}</p>

                    <p  style="margin-bottom:15px;" id="contact_phone"><i class="zmdi zmdi-phone"></i>&nbsp;</p>
                    <p  style="margin-bottom:15px;" id="contact_email"><i class="zmdi zmdi-email"></i>&nbsp;</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  </div>`;
            $("#infosModalContent").html(infos);
            contact();
        }
    });
}