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
            $('#description').val('');
            $('#naslov').val('');

            $('.okvir').prepend(`
                <div class="staro-obavestenje">
                    <div class="naslov-obavestenja d-flex">
                        <h5>${naslov}</h5>
                        <img class="procitaj-obavestenje" src="media/look-down-min.png" alt="">
                    </div>
                    <div class="description-obavestenja">
                        <p>${description}</p>
                        <div class="edit-delete-obavestenje">
                            <img class="edit-obavestenje" src="media/edit-50.png" alt="">
                            <img class="delete-obavestenje" src="media/remove-50.png" alt="">
                        </div>
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

    // edit i delete obavestenja
    $(document).on('click', '.delete-obavestenje', function() {
        $(this).parent().parent().parent().remove();
    });

    $(document).on('click', '.edit-obavestenje', function() {

        let naslovNiz = $(this).parent().parent().prev().find('h5');
        let naslov = $(naslovNiz[0]).text();
        let description = $(this).parent().prev().text();
    
        document.getElementById('naslov').value = naslov;
        document.getElementById('description').value = description;
        $('.obavestenje').slideToggle();

        $(this).parent().parent().parent().remove();
    });

    // get data about pupil
    fetch('./data/ucenici.json')
        .then(response => response.json())
        .then(data => dataWork(data))

    function dataWork (data) {

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
                        <div class="edit-delete-obavestenje">
                            <img class="edit-obavestenje" src="media/edit-50.png" alt="">
                            <img class="delete-obavestenje" src="media/remove-50.png" alt="">
                        </div>
                    </div>
                </div>
            `);
        }

        // izostanci
        $('.izostanci.left span').text(data[redniBroj].izostanci.opravdaniIzostanci);
        $('.izostanci.right span').text(data[redniBroj].izostanci.neopravdaniIzostnci);
        $('.izostanci.ukupno span').text(data[redniBroj].izostanci.opravdaniIzostanci + data[redniBroj].izostanci.neopravdaniIzostnci);

        // dodavanje novih izostanaka
        $('.izostanci input[type="button"]').on('click', function() {
            let nizStarih = $(this).parent().parent().find('span');
            let stari = Number(nizStarih[0].innerText);
            let dodati = Number($(this).prev().val());
            let novi = stari + dodati;

            if(novi < 0) {
                alert('Ne moze broj izostanaka da bude negativan.')
            } else {
                $(nizStarih[0]).text(novi);

                let stariUkupno = Number($('.izostanci.ukupno span').text());
                $('.izostanci.ukupno span').text(stariUkupno + dodati);

                $(this).parent().next().toggle();
                $(this).parent().toggle();
                $(this).prev().val('');
            }
        })

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
                ocene += `<span>${data[redniBroj].ocene[predmet][i]}<img class="brisi" src="media/delete-20.png" alt="delete"></span>`;
            }

            for(let i = 0; i < brojOcena; i++) {
                prosek += data[redniBroj].ocene[predmet][i];
            }

            prosek = (prosek / brojOcena).toFixed(2);

            zakljucnaOcena = Math.round(prosek);

            ukupanProsek += zakljucnaOcena;

            $('#predmeti').append(`
                <div class="predmet">
                    <div class="row">
                        <div class="col-lg-3 cetiri-kolone">
                            <div class="naziv-predmeta d-flex">
                                <h5>${predmet}</h5>
                            </div>
                        </div>
                        <div class="col-lg-5 cetiri-kolone">
                            <div class="d-flex ocene">
                                <p>${ocene}</p>
                                <div class="dodavanje-ocene">
                                    <input class="nova-ocena" type="number" min="1" max="5" />
                                    <input class="ocena-dodata" type="button" value="OK" />
                                </div>
                                <img class="otvori-dodavanje" src="media/add-ocena.png" alt="add">
                            </div>
                        </div>
                        <div class="col-lg-2 cetiri-kolone">
                            <div class="prosek-predmeta d-flex">
                                <h3>${prosek}</h3>
                            </div>
                        </div>
                        <div class="col-lg-2 cetiri-kolone">
                            <div class="zakljucna-predmeta d-flex">
                                <h3 class="zakljucna-ocena">${zakljucnaOcena}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        ukupanProsek = (ukupanProsek / brojPredmeta).toFixed(2);

        $('#ukupan-prosek').text(ukupanProsek);

        $(document).on('click', '.otvori-dodavanje', function() {
            $(this).prev().toggle();
            $(this).toggle();
        })

        // nakon dodavanja ili brisanja neke ocene
        function menjanjeProseka(ocene, prosekNiz, zakljucnaNiz, sveZakljucne) {
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

            $(prosekNiz[0]).text(prosek);

            $(zakljucnaNiz[0]).text(zakljucna);

            for(let i = 0; i < sveZakljucne.length; i++) {
                ukupnaZakljucna += Number($(sveZakljucne[i]).text());
            }

            ukupnaZakljucna = (ukupnaZakljucna / sveZakljucne.length).toFixed(2);
            $('#ukupan-prosek').text(ukupnaZakljucna);
        }

        // when you add new mark
        $(document).on('click', '.ocena-dodata', function() {
            let ocena = $(this).prev().val();

            if(ocena === '') {
                alert('Niste uneli ocenu.')
            } else if(ocena < 1 || ocena > 5) {
                alert('Uneta ocena mora da bude od 1 do 5.')
            } else  if(ocena != '') {
                $(this).parent().prev().append( `<span>${ocena}<img class="brisi" src="media/delete-20.png" alt="delete"></span>`);
                $(this).parent().next().toggle();
                $(this).parent().toggle();
                $(this).prev().val('');
            }

            let ocene = $(this).parent().prev().find('span');
            let prosekNiz = $(this).parent().parent().parent().next().find('h3');
            let zakljucnaNiz = $(this).parent().parent().parent().next().next().find('h3');
            let sveZakljucne = $('.predmet').find('.zakljucna-ocena');

            menjanjeProseka(ocene, prosekNiz, zakljucnaNiz, sveZakljucne);
            
        })

        // brisanje ocena
        $(document).on('click', '.ocene span', function() {
            let nizSlika = $(this).find('img');
            $(nizSlika[0]).slideToggle();
        });

        $(document).on('click', '.ocene span img', function() {

            let p = $(this).parent().parent();
            let prosekNiz = $(this).parent().parent().parent().parent().next().find('h3');
            let zakljucnaNiz = $(this).parent().parent().parent().parent().next().next().find('h3');
            let sveZakljucne = $('.predmet').find('.zakljucna-ocena');

            $(this).parent().remove();

            let ocene = $(p).find('span');
            
            menjanjeProseka(ocene, prosekNiz, zakljucnaNiz, sveZakljucne);

        });
    }

});