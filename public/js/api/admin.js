$(document).ready(function () {
    initAdmin();
})

function initAdmin() {
    
    getAdminId((isMatched, result) => {
        if (isMatched) {
            if (window.location.pathname == "/") {
                window.location.href = "/dashboard";
            }
        } else {
            if (window.location.pathname == "/") {
                login();
            }else{
                window.location.href = "/"
            }
        }
    })
}

function login() {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        var objData = {};

        for (let index = 0; index < e.target.elements.length; index++) {
            objData[e.target.elements[index].name] = e.target.elements[index].value
        }

        //Ajax pour interrogé le côté serveur
        $.ajax({
            type: 'POST',
            url: "/api/login",
            dataType: "json",
            data: objData,
            beforeSend: function (params) {
                
                $("#submitLogin").text("Chargement...")
            },
            success: function (data) {
                console.log(data)
                if (data.getEtat) {
                    $("#submitLogin").text("Connecté avec succès")
                    window.location.href = "/dashboard";
                } else {
                    $("#submitLogin").css({backgroundColor: 'red'});
                    $("#submitLogin").text("Erreur de connexion...")

                    setTimeout(() => {
                        $("#submitLogin").css({ backgroundColor: '#3cb371'});
                        $("#submitLogin").text("Se connecter")
                    }, 1500);
                    
                }
            }
        });
    })
}
