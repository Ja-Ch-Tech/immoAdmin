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
}

function getDetails(id_immo) {
    $.ajax({
        type: 'GET',
        url: "/api/details/" + id_immo,
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.getEtat) {
                var {getObjet} = data,
                    viewButton = () => {
                        if (getObjet.validate) {
                            return  `<button class="float-right btn btn-danger" onclick="toggleDecision('${id_immo}')"><i class="zmdi zmdi-close-circle-o"></i>&nbsp;Rétirer</button>`;
                        } else {
                            return `<button class="float-right btn btn-success" onclick="toggleDecision('${id_immo}')"><i class="zmdi zmdi-case-check"></i>&nbsp;Autoriser</button>`;
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
                                                        <div id="gridImagesImmo" class="row">
                                                            
                                                        </div>
                                                        
                                                        <!-- The expanding image container -->
                                                        <div class="container">
                                                            
                                                            <!-- Expanded image -->
                                                            <img alt="${getObjet.detailsImages[0].srcFormat}" title="${getObjet.detailsImages[0].intitule}" src="${getObjet.detailsImages[0].srcFormat}" id="expandedImg" style="width:100%">
                                                            
                                                            <!-- Image text -->
                                                            <div id="imgtext">
                                                            ${getObjet.detailsImages[0].intitule}"
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>`;

                $("#containsDetails").html(content);
                //Gestion images
                data.getObjet.detailsImages.map(image => {
                    var image = `<div class="column">
                                    <img src="${image.srcFormat}" title="${image.intitule}" alt="${image.intitule}" onclick="displayImage(this);">
                                </div>`;
                    
                    $("#gridImagesImmo").append(content);

                })
            }
        }
    });
}


function toggleDecision(id_immo) {
    $.ajax({
        type: 'GET',
        url: `/api/toggle/${id_immo}`,
        dataType: "json",
        success: function (data) {
            if (data.getObjet) {
                getDetails(id_immo)
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