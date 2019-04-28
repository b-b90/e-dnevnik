$(function () {
    
    document.getElementById("login").addEventListener("click", function (evt) {
        evt.preventDefault();  

        let user = 'prof1';
        let pass = 'prof1';
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;

        if(username === user && password === pass) {
            window.location.replace("./ucenici.html");
            return false;
        } else {
            $("#error").slideDown();

            setTimeout(function () {
                $("#error").slideUp();
            }, 3000);
        }
    });

});