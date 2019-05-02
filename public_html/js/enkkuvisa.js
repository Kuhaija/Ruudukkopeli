/*global $*/

var Visa;
var peli;
var pelinPituus;
var oikeatVastaukset;

function init() {
    $('#voittoModal').modal('hide');
    $('#ekaVastaus').css("background-color", "white");
    $('#tokaVastaus').css("background-color", "white");
    $('#kolmasVastaus').css("background-color", "white");
    $('#neljasVastaus').css("background-color", "white");
    enableButtons();
    Visa = new Array(
        new Tehtava("Mikä on englanniksi omena?", "Apple", "Pear", "Banana", "Strawberry", 1),
        new Tehtava("Mikä on englanniksi kissa?", "Raccoon", "Dog", "Bear", "Cat", 4),
        new Tehtava("Mikä on suomeksi Elephant?", "Sinivalas", "Karhu", "Norsu", "Sika", 3),
        new Tehtava("Mikä on suomeksi House?", "Talo", "Vessa", "Tohtori", "Strawberry", 1),
        new Tehtava("Mikä on englanniksi ikkuna?", "iPhone", "Door", "Window", "Wall", 3),
        new Tehtava("Mikä on englanniksi kello?", "Fox", "Clock", "Walkie Talkie", "Mirror", 2),
        new Tehtava("Mikä on suomeksi Mirror?", "Peili", "Seinä", "Ovi", "Ikkuna", 1),
        new Tehtava("Mikä on englanniksi kettu?", "Shoe", "Pear", "Dog", "Fox", 4),
        new Tehtava("Mikä on englanniksi kenkä?", "Sharp", "Shoe", "Nose", "Foot", 2),
        new Tehtava("Mikä on englanniksi nenä?", "Finger", "Eye", "Nose", "Table", 3),
        );
    pelinPituus = Visa.length;
    oikeatVastaukset = 0;
    peli = tehtavaNumero();
    kirjoitus(peli);
}

function tehtavaNumero() {
    if(Visa.length >= 1){
        return randomGeneraattori(0, Visa.length-1);
    }
}

function randomGeneraattori(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Tehtava {
    constructor(kysymys, vastaus1, vastaus2, vastaus3, vastaus4, oikea) {
        this.kysymys = kysymys;
        this.vastaus1 = vastaus1;
        this.vastaus2 = vastaus2;
        this.vastaus3 = vastaus3;
        this.vastaus4 = vastaus4;
        this.oikea = oikea;
    }
}

function kirjoitus(peli) {
    $('#kysymys').html(Visa[peli].kysymys);
    $('#ekaVastaus').html(Visa[peli].vastaus1);
    $('#tokaVastaus').html(Visa[peli].vastaus2);
    $('#kolmasVastaus').html(Visa[peli].vastaus3);
    $('#neljasVastaus').html(Visa[peli].vastaus4);
    $('#nro').text( 11 - Visa.length + ' / ' + pelinPituus);
}

$(document).ready(function () {
    init();
});

function tarkistus(numero){
    if(numero === Number(Visa[peli].oikea)){
        return true;
    } else {
        return false;
    }
}

function eteneminen(id){
    if(Visa.length > 1) {
        setTimeout(function(){ 
            Visa.splice(peli,1);
            peli = tehtavaNumero();
            kirjoitus(peli);
            $('#'+ id).css("background-color", "white ");
        }, 1500);
        setTimeout(function(){
            enableButtons();
        }, 1500);
    } else {
        setTimeout(function(){
            $('#'+ id).css("background-color", "white ");
            valmis();
        }, 1500);
    }
}

function valmis() {
    $('#voittoModalTeksti').text("Hienoa! Sait " + oikeatVastaukset + " / " + pelinPituus + " kysymystä oikein.");
    $('#voittoModal').modal('show');
}

function oikea(id){
    $('#'+ id).css("background-color", "#66FF66");
    console.log("oikein");
    oikeatVastaukset++;
    eteneminen(id);
}
 
function vaarin(id){
    $('#'+ id).css("background-color", "#FF6666");
    console.log("väärin");
    eteneminen(id);
}
 
function ekaVastaus(){
    disableButtons();
    var check = tarkistus(1);
    if (check === true){
        oikea('ekaVastaus');
    } else {
        vaarin('ekaVastaus');
    }
 }
 
function tokaVastaus(){
    disableButtons();
    var check = tarkistus(2);
    if (check === true){
        oikea('tokaVastaus');
    } else {
        vaarin('tokaVastaus');
    }
}

function kolmasVastaus(){
    disableButtons();
    var check = tarkistus(3);
    if (check === true){
        oikea('kolmasVastaus');
    } else {
        vaarin('kolmasVastaus');
    }
}
 
function neljasVastaus(){
    disableButtons();
    var check = tarkistus(4);
    if (check === true){
        oikea('neljasVastaus');
    } else {
        vaarin('neljasVastaus');
    }
}
 
function disableButtons() {
    $('#ekaVastaus').prop("disabled", true);
    $('#tokaVastaus').prop("disabled", true);
    $('#kolmasVastaus').prop("disabled", true);
    $('#neljasVastaus').prop("disabled", true);
}
 
function enableButtons() {
    $('#ekaVastaus').prop("disabled", false);
    $('#tokaVastaus').prop("disabled", false);
    $('#kolmasVastaus').prop("disabled", false);
    $('#neljasVastaus').prop("disabled", false);
}