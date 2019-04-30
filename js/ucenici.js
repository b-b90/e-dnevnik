$(function () {

    fetch('./data/ucenici.json')
        .then(response => response.json())
        .then(data => listaUcenika(data))

    function listaUcenika (data) {

        let listaUcenika = "";
        let sviUcenici = [];

        for(let i = 0; i < data.length; i++) {
            let ime = data[i].imePrezime;
            
            sviUcenici.push({"ime" : ime, "id" : i})
            
            listaUcenika += `
                <div class="ucenik">
                    <a href="profesor.html" id="${i}">${ime}</a>
                </div>
            `;
        }

        function listAndSave () {

            $('.ucenici-lista').html(listaUcenika);

            // da se sacuva id izabrabog ucenika
            $('.ucenik a').on('click', function (e) {
                localStorage.setItem('redniBroj', e.target.id);
            });
        }

        listAndSave();

        // pretraga
        $('#search').on('input', function() {
            let trazeno = $('#search').val();

            listaUcenika = "";
            
            for(let i = 0; i < sviUcenici.length; i++) {
                if(sviUcenici[i].ime.toLowerCase().includes(trazeno.toLowerCase())) {
                    
                    listaUcenika += `
                        <div class="ucenik">
                            <a href="profesor.html" id="${sviUcenici[i].id}">${sviUcenici[i].ime}</a>
                        </div>
                    `;
                }
            }

            listAndSave();
        });

        // da se izlistaju ucenici po redosledu a-z
        $('#po-redu').on('click', function() {

            function compare(a,b) {
                if (a.ime < b.ime)
                return -1;
                if (a.ime > b.ime)
                return 1;
                return 0;
            }

            sviUcenici.sort(compare);

            listaUcenika = "";

            for(let i = 0; i < sviUcenici.length; i++) {
                
                listaUcenika += `
                    <div class="ucenik">
                        <a href="profesor.html" id="${sviUcenici[i].id}">${sviUcenici[i].ime}</a>
                    </div>
                `;
            }

            listAndSave();
        });
    }
    
});