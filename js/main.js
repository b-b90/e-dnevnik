$(function () {
    
    $('#dodaj-obavestenje').on('click', function() {

        $('.obavestenje').slideToggle();
    })

    let opravdani = $('.izostanci.left span').text();
    let neopravdani = $('.izostanci.right span').text();
    $('.izostanci.ukupno span').text(Number(opravdani) + Number(neopravdani));

    let spanovi = $('.ocene').find('span');
    
    for(let i = 0; i < spanovi.length; i++) {
        console.log(spanovi[i].innerHTML)
    }

    $("#dodaj-novo-obavestenje").on('click', function() {
        let naslov = $("#naslov").val();
        let description = $("#description").val();

        $(".obavestenje").slideToggle();
        $("#description").val(' ');
        $("#naslov").val(' ');

        $('.okvir').append();
    })

});