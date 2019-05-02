/* global $ */

var menuStatus = false;

var menuHTML = "<div class='applications shadow' id='valitsepeli'><div class='row align-items-center'><div class='col-6 col-md-4 col-lg-3'><a href='Ruudukko.html'><p class='apptitle'>Ruudukkopeli</p></a><a href='Ruudukko.html'><img class='appicon' src='img/ruudukonKuva.png'></a></div><div class='col-6 col-md-4 col-lg-3'><a href='enkkuvisa.html'><p class='apptitle'>Enkkuvisa</p></a><a href='enkkuvisa.html'><img class='appicon' src='img/Enkkuvisa.png'></a></div></div></div>";

function getMenu() {
    var url = window.location.href;
    var url_parts = url.split("/");
    var menu = document.getElementById('menu');
    var height = menu.clientHeight;
    var width = menu.clientWidth;
    
    if (url_parts[url_parts.length - 1] === "index.html") {
        $("html, body").animate({ scrollTop: ($('#valitsepeli').offset().top) }, 1500);
        $("#menu").remove();
    } else {
        if(menu.style.visibility == 'hidden'){
            menu.style.visibility = 'visible';
            menu.style.height = 'auto';
            menu.style.marginTop = '15px';
            menu.style.marginBottom = '40px';
            $('.menubutton').attr('src','img/close.png');
            $('.menubutton').css('transform', 'scale(0.8)');
        } else{
            menu.style.visibility = 'hidden';
            menu.style.height = '0px';
            menu.style.marginTop = '0px';
            menu.style.marginBottom = '0px';
            $('.menubutton').attr('src','img/menu.png');
            $('.menubutton').css('transform', 'scale(1)');
        }
    }
}

function getOhje(){
    $('#ohjeModal').modal('show');
}

$(function() {
    if ($('#menu')) {
        $('#menu').html(menuHTML);
    }
});