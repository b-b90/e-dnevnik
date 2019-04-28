$(function () {

    fetch('./data/ucenici.json')
        .then(response => response.json())
        .then(data => listaUcenika(data))

    function listaUcenika (data) {

        for(let i = 0; i < data.length; i++) {
            let ime = data[i].imePrezime;
            
            $('.ucenici-lista').append(`
                <div class="ucenik">
                    <a href="profesor.html" id="${i}">${ime}</a>
                </div>
            `);
        }

        $('.ucenik a').on('click', function (e) {
            localStorage.setItem('redniBroj', e.target.id);
        });
    }
    
});