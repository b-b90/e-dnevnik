$(function () {

    let redniBroj = localStorage.getItem('redniBroj');
    
    // open panel for adding new notification
    $('#dodaj-obavestenje').on('click', function() {

        $('.obavestenje').slideToggle();
    })

    // add new notification
    $('#dodaj-novo-obavestenje').on('click', function() {
        let naslov = $('#naslov').val();
        let description = $('#description').val();

        if (naslov != '' && description != '') {
            $('.obavestenje').slideToggle();
            $('#description').val(' ');
            $('#naslov').val(' ');

            $('.okvir').prepend(`
                <div class="staro-obavestenje">
                    <div class="naslov-obavestenja d-flex">
                        <h5>${naslov}</h5>
                        <img class="procitaj-obavestenje" src="media/look-down-min.png" alt="">
                    </div>
                    <div class="description-obavestenja">
                        <p>${description}</p>
                    </div>
                </div>
            `);
        } else {
            alert('Popunite sva polja pa pokusajte ponovo.')
        }
    })
    
    $(document).on('click', '.procitaj-obavestenje', function() {
        $(this).parent().siblings().slideToggle();
        $(this).toggleClass('activ-obavestenje');
    });

    // get data about pupil
    fetch('./data/ucenici.json')
        .then(response => response.json())
        .then(data => dataWork(data))

    function dataWork (data) {
        console.log(data);

        // ime prezime
        $('#ime-prezime').text(data[redniBroj].imePrezime);

        // obavestenja
        for(let i = 0; i < data[redniBroj].obavestenja.length; i++) {
            let naslov = data[redniBroj].obavestenja[i].naslov;
            let description = data[redniBroj].obavestenja[i].description;

            $('.okvir').prepend(`
                <div class="staro-obavestenje">
                    <div class="naslov-obavestenja d-flex">
                        <h5>${naslov}</h5>
                        <img class="procitaj-obavestenje" src="media/look-down-min.png" alt="">
                    </div>
                    <div class="description-obavestenja">
                        <p>${description}</p>
                    </div>
                </div>
            `);
        }

        // izostanci
        $('.izostanci.left span').text(data[redniBroj].izostanci.opravdaniIzostanci);
        $('.izostanci.right span').text(data[redniBroj].izostanci.neopravdaniIzostnci);
        $('.izostanci.ukupno span').text(data[redniBroj].izostanci.opravdaniIzostanci + data[redniBroj].izostanci.neopravdaniIzostnci);

        // predmeti i ocene
        let ukupanProsek = 0;
        let brojPredmeta = data[redniBroj].predmeti.length;

        for(let i = 0; i < data[redniBroj].predmeti.length; i++) {

            let predmet = data[redniBroj].predmeti[i];
            let ocene = '';
            let prosek = 0;
            let zakljucnaOcena = 0;
            let brojOcena = data[redniBroj].ocene[predmet].length;

            for(let i = 0; i < brojOcena; i++) {
                ocene += `<span>${data[redniBroj].ocene[predmet][i]}</span>`;
            }

            for(let i = 0; i < brojOcena; i++) {
                prosek += data[redniBroj].ocene[predmet][i];
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
                                    <div class="dodavanje-ocene">
                                        <input class="nova-ocena" type="number" min="1" max="5" />
                                        <input class="ocena-dodata" type="button" value="OK" />
                                    </div>
                                    <img class="otvori-dodavanje" src="media/add-ocena.png" alt="">
                                </div>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h4 class="mali-ekran">Prosek</h4>
                                <h3>${prosek}</h3>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h4 class="mali-ekran">Zakljucna ocena</h4>
                                <h3 class="zakljucna-ocena">${zakljucnaOcena}</h3>
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
                                    <div class="dodavanje-ocene">
                                        <input class="nova-ocena" type="number" min="1" max="5" />
                                        <input class="ocena-dodata" type="button" value="OK" />
                                    </div>
                                    <img class="otvori-dodavanje" src="media/add-ocena.png" alt="">
                                </div>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h3>${prosek}</h3>
                            </div>
                            <div class="col-md-2 cetiri-kolone">
                                <h3 class="zakljucna-ocena">${zakljucnaOcena}</h3>
                            </div>
                        </div>
                    </div>
                `)
            }
        }

        ukupanProsek = (ukupanProsek / brojPredmeta).toFixed(2);

        $('#ukupan-prosek').text(ukupanProsek);

        $(document).on('click', '.otvori-dodavanje', function() {
            $(this).prev().toggle();
            $(this).toggle();
        })

        // when you add new mark
        $(document).on('click', '.ocena-dodata', function() {
            let ocena = $(this).prev().val();

            if(ocena != '') {
                $(this).parent().prev().append( `<span>${ocena}</span>`);
                $(this).parent().next().toggle();
                $(this).parent().toggle();
                $(this).prev().val('');
            } else {
                alert('Niste uneli ocenu.')
            }

            let ocene = $(this).parent().prev().find('span');
            let brojOcena = ocene.length;
            let zbir = 0;
            let prosek = 0;
            let zakljucna = 0;
            let ukupnaZakljucna = 0;
            
            for(let i = 0; i < brojOcena; i++) {
                zbir += Number($(ocene[i]).text());
            }

            prosek = (zbir / brojOcena).toFixed(2);
            zakljucna = Math.round(prosek);

            let prosekNiz = $(this).parent().parent().parent().next().find('h3');
            $(prosekNiz[0]).text(prosek);

            let zakljucnaNiz = $(this).parent().parent().parent().next().next().find('h3');
            $(zakljucnaNiz[0]).text(zakljucna);

            let sveZakljucne = $('.predmet').find('.zakljucna-ocena');

            for(let i = 0; i < sveZakljucne.length; i++) {
                ukupnaZakljucna += Number($(sveZakljucne[i]).text());
            }

            ukupnaZakljucna = (ukupnaZakljucna / sveZakljucne.length).toFixed(2);
            $('#ukupan-prosek').text(ukupnaZakljucna);
        })
    }

});