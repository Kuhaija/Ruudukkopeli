/* global $ */
/* global localStorage*/

var pelihahmonKuva = document.getElementById('pelihahmonKuva');
var pelihahmo = document.getElementById('pelihahmo');

if (pelihahmonKuva) {
    if (localStorage.getItem('pelihahmonKuva')) {
        pelihahmonKuva.src = localStorage.getItem('pelihahmonKuva');
    } else {
        pelihahmonKuva.remove();
    }
}

if (pelihahmo) {
    if (localStorage.getItem('pelihahmonKuva')) {
        pelihahmo.style.backgroundImage = "url('" + localStorage.getItem('pelihahmonKuva') + "')";
        pelihahmo.style.backgroundPosition = "top left";
    }
}
