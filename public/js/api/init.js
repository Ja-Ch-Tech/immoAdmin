/*$(document).ready(function () {
    window.console.clear();
})*/

function getHostAPI() {
    //return "http://localhost:3333";
    return "https://immo-jach-api.herokuapp.com";
}
/**
 * Fonction permettant de récupérer l'identifiant de l'utilisateur en session
 * @param {Function} callback La fonction de retour
 */
function getAdminId(callback) {

    $.ajax({
        type: 'GET',
        url: "/api/adminid",
        dataType: "json",
        success: function (data) {
            
            if (data.id_admin) {
                callback(true, data.id_admin)
            } else {
                callback(false, null)
            }
        }
    });
}

//fonction de modélisation de la date
function customDate(date) {
    var myDate = new Date(date),
        jour = function () {

            return parseInt(myDate.getDate()) < 10 ? '0' + myDate.getDate() : myDate.getDate()
        },
        mois = function () {

            //return myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
            var month = myDate.getMonth() + 1;

            //La date par rapport à sa nomination
            switch (month) {
                case 1:
                    return 'janvier'
                    break;
                case 2:
                    return 'février'
                    break;
                case 3:
                    return 'mars'
                    break;
                case 4:
                    return 'avril'
                    break;
                case 5:
                    return 'mai'
                    break;
                case 6:
                    return 'juin'
                    break;
                case 7:
                    return 'juillet'
                    break;
                case 8:
                    return 'août'
                    break;
                case 9:
                    return 'septembre'
                    break;
                case 10:
                    return 'octobre'
                    break;
                case 11:
                    return 'novembre'
                    break;
                case 12:
                    return 'décembre'
                    break;
                default:
                    return null
                    break;
            }
        },
        heure = function () {

            return myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()

        },
        minute = function () {

            return myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()

        };

    return mois() + ' ' + jour() + ', ' + myDate.getFullYear() + ' ' + heure() + ':' + minute()
}