$(function () {
    
    // open panel for adding new notification
    $('#dodaj-obavestenje').on('click', function() {

        $('.obavestenje').slideToggle();
    })

    // add new notification
    $("#dodaj-novo-obavestenje").on('click', function() {
        let naslov = $("#naslov").val();
        let description = $("#description").val();

        $(".obavestenje").slideToggle();
        $("#description").val(' ');
        $("#naslov").val(' ');

        $('.okvir').append();
    })

    // get data about pupil
    fetch('./data/ucenici.json')
        .then(response => response.json())
        .then(data => dataWork(data))

    function dataWork (data) {
        console.log(data);

        // izostanci
        $('.izostanci.left span').text(data[0].izostanci.opravdaniIzostanci);
        $('.izostanci.right span').text(data[0].izostanci.neopravdaniIzostnci);
        $('.izostanci.ukupno span').text(data[0].izostanci.opravdaniIzostanci + data[0].izostanci.neopravdaniIzostnci);

        // predmeti i ocene
        let ukupanProsek = 0;
        let brojPredmeta = data[0].predmeti.length;

        for(let i = 0; i < data[0].predmeti.length; i++) {

            let predmet = data[0].predmeti[i];
            let ocene = '';
            let prosek = 0;
            let zakljucnaOcena = 0;
            let brojOcena = data[0].ocene[predmet].length;

            for(let i = 0; i < data[0].ocene[predmet].length; i++) {
                ocene += `<span>${data[0].ocene[predmet][i]}</span>`;
            }

            for(let i = 0; i < data[0].ocene[predmet].length; i++) {
                prosek += data[0].ocene[predmet][i];
            }

            prosek = (prosek / brojOcena).toFixed(2);

            zakljucnaOcena = Math.round(prosek);

            ukupanProsek += zakljucnaOcena;

            if(i === 0) {
                $('#predmeti').append(`
                    <div class="predmet">
                        <div class="row">
                            <div class="col-md-3 cetiri-kolone">
                                <h4 class="mali-ekran">Naziv</h4>
                                <h5>${predmet}</h5>
                            </div>
                            <div class="col-md-5 cetiri-kolone">
                                <h4 class="mali-ekran">Ocene</h4>
                                <div class="d-flex ocene">
                                    <p>${ocene}</p>
                                    <img src="media/add-ocena.png" alt="">
                                </div>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h4 class="mali-ekran">Prosek</h4>
                                <h3>${prosek}</h3>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h4 class="mali-ekran">Zakljucna ocena</h4>
                                <h3>${zakljucnaOcena}</h3>
                            </div>
                        </div>
                    </div>
                `)
            } else {
                $('#predmeti').append(`
                    <div class="predmet">
                        <div class="row">
                            <div class="col-md-3 cetiri-kolone">
                                <h5>${predmet}</h5>
                            </div>
                            <div class="col-md-5 cetiri-kolone">
                                <div class="d-flex ocene">
                                    <p>${ocene}</p>
                                    <img src="media/add-ocena.png" alt="">
                                </div>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h3>${prosek}</h3>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h3>${zakljucnaOcena}</h3>
                            </div>
                        </div>
                    </div>
                `)
            }
        }

        ukupanProsek = (ukupanProsek / brojPredmeta).toFixed(2);

        $('#ukupan-prosek').text(ukupanProsek);
    }

});