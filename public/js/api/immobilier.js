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
                                           
                                        </strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <h1>En construction</h1>
                                            <!-- <div class="col-md-7">
                                                <div style="background-color: #f5f5f5;padding: 15px;">
                                                    <img style="width: 100%;" src="/images/bg-title-01.jpg" alt=""><hr>
                                                    <center><p style="text-transform: uppercase;">Image principale</p></center>
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="row">
                                                    <div style="background-color: #f5f5f5;padding: 15px;margin-left: 10px;margin-bottom: 15px;" class="col-md-5">
                                                        <img style="width: 100%;" src="/images/bg-title-01.jpg" alt="">
                                                        <center><p style="text-transform: uppercase;">Chambre</p></center>
                                                    </div>
                                                    <div style="background-color: #f5f5f5;padding: 15px;margin-left: 10px;margin-bottom: 15px;" class="col-md-5">
                                                        <img style="width: 100%;" src="/images/bg-title-01.jpg" alt="">
                                                        <center><p style="text-transform: uppercase;">Cuisine</p></center>
                                                    </div>
                                                    <div style="background-color: #f5f5f5;padding: 15px;margin-left: 10px;margin-bottom: 15px;" class="col-md-5">
                                                        <img style="width: 100%;" src="/images/bg-title-01.jpg" alt="">
                                                        <center><p style="text-transform: uppercase;">Douche</p></center>
                                                    </div>
                                                    <div style="background-color: #f5f5f5;padding: 15px;margin-left: 10px;margin-bottom: 15px;" class="col-md-5">
                                                        <img style="width: 100%;" src="/images/bg-title-01.jpg" alt="">
                                                        <center><p style="text-transform: uppercase;">Veranda</p></center>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div class="row">
                                            <!-- <div class="col-md-3">
                                               Type : Villa
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`;

                $("#containsDetails").html(content);
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