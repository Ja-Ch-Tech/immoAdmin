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