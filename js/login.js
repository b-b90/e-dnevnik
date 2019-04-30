$(function () {
    
    document.getElementById("login").addEventListener("click", function (evt) {
        evt.preventDefault();  

        let user = 'prof1';
        let pass = 'prof1';
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;

        if(username === "" || password ==="") {

            error("<h3>Sva polja moraju biti popunjena!</h3>");

        } else if(username === user && password === pass) {

            window.location.replace("./ucenici.html");
            return false;
            
        } else {

            error("<h3>Niste uneli validan username ili password.<br> Pokušajte ponovo...</h3>");
        }

        function error(message) {
            $("#error").html(message);
            $("#error").slideDown();

            setTimeout(function () {
                $("#error").slideUp();
            }, 3000);
        }
    });

});