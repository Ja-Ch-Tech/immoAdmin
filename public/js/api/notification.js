$(document).ready(function () {
    initNotification();
})

function initNotification() {

    getAdminId((isMatched, result) => {
        if (isMatched) {
            if (window.location.pathname != "/") {
                setNotification(result)
            }

            if (/Notifications|notification/i.test(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1])) {
                getAllNotification(result);
            }
        }
    })
}

function setNotification(id) {
    $.ajax({
        type: 'GET',
        url: `/api/setNotication/${id}/2`,
        dataType: "json",
        success: function (data) {

            if (data.getEtat) {
                if (data.getObjet.notifications.length > 0) {
                    var containerNotif = document.getElementById("forNotification");


                    containerNotif.classList.add("has-noti");

                    data.getObjet.notifications.map(item => {
                        var content = `<a href="/dashboard/immobilier/${item.details._id}/details" onClick="setRead('${item._id}')"><div class="notifi__item">
                                            <div class="bg-c2 img-cir img-40">
                                                <i class="zmdi zmdi-account-calendar"></i>
                                            </div>
                                            <div class="content">
                                                <p style="font-family: Calibri; font-size: .95em"><b>${(item.details.prenomOwner +" " + item.details.nomOwner).toUpperCase()}</b> vient de publier une ${item.details.type} à ${/Locations|location/i.test(item.details.mode) ? "louer" : "vendre"}</p>
                                                <span class="date text-capitalize">${customDate(item.details.created_at)}</span>
                                            </div>
                                        </div></a>`;
                        
                        $("#dropNotification").append(content);
                    })
                }
            }
        }
    });
}

function getAllNotification(id) {
    $.ajax({
        type: 'GET',
        url: `/api/setNotication/${id}/${null}`,
        dataType: "json",
        beforeSend: function () {
            
        },
        success: function (data) {

            if (data.getEtat) {
                if (data.getObjet.notifications.length > 0) {

                    data.getObjet.notifications.map(item => {
                        
                        var content = `<a href="/dashboard/immobilier/${item.details._id}/details" onClick="setRead('${item._id}')" class="col-xl-12">
                                    <div class="notifi__item">
                                        
                                            <div class="bg-c3 img-cir img-40">
                                                <i class="zmdi zmdi-hotel"></i>
                                            </div>
                                        
                                        <div class="content">
                                            <p style="font-family: Calibri; font-size: .95em"><b>${(item.details.prenomOwner + " " + item.details.nomOwner).toUpperCase()}</b> vient de publier une ${item.details.type.toLowerCase()} à ${/Locations|location/i.test(item.details.mode) ? "louer" : "vendre"}</p>
                                                <span class="date text-capitalize">${customDate(item.details.created_at)}</span>
                                        </div>
                                    </div><hr style="margin:0;">
                                </a>`;

                        $("#allNotification").append(content);
                    })
                }
            }
        }
    });
}

//Function pour la définition de lecture
function setRead(id_notif) {
    $.ajax({
        type: 'POST',
        url: "/api/setRead",
        data: {
            "id_notif": id_notif
        },
        dataType: "json",
        success: function (data) {

            //On verra bien
        }
    });
}