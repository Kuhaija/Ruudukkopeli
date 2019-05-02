
/*global $*/
/*global location*/
/*global localStorage*/

var arvotut = {"25": "O"};
var maaliTesti = 0;
var sijainti = 25;
var oikeat = -1;
var vaarat = 0;
var maaliTehty = "";
/*var huippu = "";*/

/*Sivun latautuessa suoritetaan pelihahmon siirto, millä siis tässä tilanteessa 
 * pusketaan se piirretty pelihahmo aloitusruutuun*/
$(document).ready(function () {
    pelihahmonSiirto(sijainti, sijainti);
});

/*Tämä funktio siirtää pelihahmoa, lisäten sen oikein vastattuun kohtaan 
 * ja poistaen aikaisemmasta ja lisäten sen tilalle "O"-kirjaimen jos 
 * poistettavaa kuvaa ei ole niin sitten vain leikitään O-kirjaimella.
 * Puskee myös oikein vastattuun ruutuun vihreän taustavärin.
 * Kutsuttaessa myös lisää "pisteen" variableen oikeat, sillä tämä kutsutaan vain jos
 * vastataan oikein. Paitsi pelin käynnistystä ei lasketa. Lisää myös avaamista varten
 * arvotut-arrayhyn O jotta se tajuaa aukoa lisää ruutuja*/
function pelihahmonSiirto(lisata, poistaa) {
    /*Näillä tehdään lisata ja poistaa arvoista id:t*/
    var add = $('#' + lisata);
    var remove = $('#' + poistaa);
    /*Jos "poistaa"-arvo on 25, eli aloitusruutu siihen lisätään "" eli tyhjä.*/
    if (poistaa === 25) {
        remove.html("");
        /*Muulloin siihen laitetaan O-kirjain*/
    } else {
        remove.html("O");
    }
    /*Jos itse piirretty hahmo on olemassa, se isketään add kohtaan, eli "lisata"- arvosta tehtyyn id:hen*/
    if (localStorage.getItem('pelihahmonKuva')) {
        add.html("<img class = 'pelihahmo' src='" + localStorage.getItem('pelihahmonKuva') + "' width='100px' height='100' />");
        /*ja kunhan ruutu ei ole ehdoissa luetelluista mikään, niin siihen paiskataan pelihahmon poistuessa vihreä taustaväri*/
        if (poistaa !== 25 && poistaa !== "1" && poistaa !== "7" && poistaa !== "43" && poistaa !== "49") {
            remove.css("background-color", "DarkSeaGreen ");
        }
        /*Jos pelihahmoa ei ole piirretty ja kyseessä ei ole aloitusruutu niin siihen paiskataan O-kirjain, ja jos 
         * se ei ole maaliruutu niin sitten sille annetaan vihreä taustaväri.*/
    } else if (lisata !== 25) {
        if (lisata !== "1" && lisata !== "7" && lisata !== "43" && lisata !== "49") {
            add.css("background-color", "DarkSeaGreen ");
        }
        add.html("O");
    }
    /*Tässä vain lisätään pistelaskuriin yksi, eli oikeat on pistelaskuri (tulostettaessa miinustetaan yksi että ollaan oikin laskuissa, kun
     * se kutsutaan heti sivun latauksessakin). Arvotut on  se ruutujen avaus-array ja sijainti arvoon saadaan aina talletettua 
     * viimeksi klikattu sijainti*/
    oikeat++;
    arvotut[lisata.toString()] = "O";
    sijainti = lisata;
}

/*Maaliruudussa oikin vastaamisen jälkeen kutsutaan tämä, mikä kutsuu modalin onnitteluineen ja alustus mahdollisuuksineen. */

function maaliruutuOikein() {
    /*huippu= (oikeat-1) + vaarat;*/
    $("#onnittelu").modal('show');
    $('.modal-body').html("<div> Sait " + oikeat + " pistettä!" + "<br>" + "Vääriä vastauksia " + vaarat + " kappaletta.  </div>");
    $('.alusta').click(function () {
        location.reload();
    });
    $('.sulje').click(function () {
        maaliTehty++;
    });
    /*$('.highScore').html("Paras tulos tähän mennessä: Oikeita vastauksia " + oikeat + " ja vääriä vastauksia " + vaarat);*/
}

/*SatunnaislukuGeneraattori*/
function randomGeneraattori(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Tarkistetaan viereiset laatikot painettavasta painikkeesta, eli jos sieltä
 * löytyy "O"-kirjain, niin sitten annetaan function tapahtua. Jos siellä ei ole
 * mitään tai V-kirjain, silloin sitä ei voi painaa. Tai siis tämä ei tee niinkään muuta
 * kuin antaa arvon true tai false ja siitä riippuen sen kutsunut funktio toimii*/
function tarkistus(kohde) {
    var ok = false;

    if (arvotut[kohde - 1] === "O") {
        ok = true;
    }
    if (arvotut[kohde - 7] === "O") {
        ok = true;
    }
    if (arvotut[kohde + 1] === "O") {
        ok = true;
    }
    if (arvotut[kohde + 7] === "O") {
        ok = true;
    }
    return ok;
}

/*tämä funtio taas kutsuttaessa puskee ruutuun V-kirjaimen ja punertavan värin. Myös lisää
 * variableen vaarat yhden, eli virhelaskuriin. Maaliruudun ollessa kyseessä erona on ettei väriä lisätä
 * ja maaliTesti-muuttujaan lisätään yksi. Tällä muuttujalla tehdään se,ettei maaliruuduista voi sulkeutua
 * kuin yksi */
function vaarin(id) {
    vaarat++;
    if (id === "1" || id === "7" || id === "43" || id === "49") {
        if (maaliTesti === 0) {
            $('#' + id).append("V");
        }
        maaliTesti++;
    } else {
        $('#' + id).css("background-color", "DarkSalmon ");
        $('#' + id).append("V");
    }
}
/* Ihan vain painettaessa mitä vain normaalia valkoista painiketta tapahtuva 
 * funktio, eli satunnaislukuhässäkällä luoduilla numeroilla tehty laskutoimitus 
 * kutsutaan prompt ikkunaan ja siihen vastatessa tarkistetaan onko se oikein. 
 * Jos vastaus on oikein, pusketaan väriä ja O-kirjainta ja lisätään pistelaskuriin*/
$(".nappi").click(function () {

    var aukasu = this.id;
    var ok = tarkistus(Number(aukasu));

    if (ok === true && maaliTehty === "") {

        var noppa = randomGeneraattori(1, 6);
        var nappi = $(this).text();

        if (nappi === "" && aukasu !== sijainti) {

            if (noppa === 1) {
                var luku1 = randomGeneraattori(1, 15);
                var luku2 = randomGeneraattori(1, 15);
                var vastaus = luku1 + luku2;
                var popUp = prompt("Paljonko on \n" + luku1 + " + " + luku2);
                var testi = parseInt(popUp);

                if (testi === vastaus) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            } else if (noppa === 2) {
                var luku1 = randomGeneraattori(1, 15);
                var luku2 = randomGeneraattori(1, 15);
                var vastaus = luku1 + luku2;
                var popUp = prompt("Mikä luku on kysymysmerkin paikalla? \n" + luku1 + " + " + " ? " + " = " + vastaus);
                var testi = parseInt(popUp);

                if (testi === luku2) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            } else if (noppa === 3) {
                var luku1 = randomGeneraattori(1, 15);
                var luku2 = randomGeneraattori(1, 15);
                var vastaus = luku1 + luku2;
                var popUp = prompt("Mikä luku on kysymysmerkin paikalla? \n" + " ? " + " + " + luku2 + " = " + vastaus);
                var testi = parseInt(popUp);

                if (testi === luku1) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            } else if (noppa === 4) {
                var luku1 = randomGeneraattori(1, 10);
                var luku2 = randomGeneraattori(1, 10);
                var vastaus = luku1 - luku2;
                var popUp = prompt("Paljonko on \n" + luku1 + " - " + luku2);
                var testi = parseInt(popUp);

                if (testi === vastaus) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            } else if (noppa === 5) {
                var luku1 = randomGeneraattori(1, 10);
                var luku2 = randomGeneraattori(1, 10);
                var vastaus = luku1 - luku2;
                var popUp = prompt("Mikä luku on kysymysmerkin paikalla? \n" + luku1 + " - " + " ? " + " = " + vastaus);
                var testi = parseInt(popUp);

                if (testi === luku2) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            } else {
                var luku1 = randomGeneraattori(1, 10);
                var luku2 = randomGeneraattori(1, 10);
                var vastaus = luku1 - luku2;
                var popUp = prompt("Mikä luku on kysymysmerkin paikalla? \n" + " ? " + " - " + luku2 + " = " + vastaus);
                var testi = parseInt(popUp);

                if (testi === luku1) {
                    pelihahmonSiirto(aukasu, sijainti);
                    if (aukasu === "1" || aukasu === "7" || aukasu === "43" || aukasu === "49") {
                        maaliruutuOikein();
                    }
                } else {
                    vaarin(aukasu);
                }
            }
        }
    }
});

$(".aloitusRuutu").click(function () {
    var popUp = confirm("Oletko varma että haluat aloittaa alusta?");
    if (popUp === true) {
        location.reload();
    }
}
);


 