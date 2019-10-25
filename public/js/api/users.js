$(document).ready(function () {
    initAdminUser();
})

function initAdminUser() {

    getAdminId((isMatched, result) => {
        if (isMatched) {
            var path = window.location.pathname.split("/dashboard");

            if ((path[path.length - 1] == "/") || (path[path.length - 1] == "")) {
                setCountUsers();
            }
        }
    })
}

function setCountUsers() {
    $.ajax({
        type: 'GET',
        url: "/api/countUsers",
        dataType: "json",
        success: function (data) {

            if (data.getEtat) {                
                data.getObjet.details.map((value) => {
                    if (/proprietaire|proprio|proprietaires/i.test(value._id.type)) {
                        
                        $("#countProprio").text(value.count)

                    } else if (/client|acheteur|clients|acheteurs/i.test(value._id.type)) {
                        
                        $("#countSimpleUsers").text(value.count)
                    }
                })
            }

        }
    });
}