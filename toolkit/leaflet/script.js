(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([34.128150, -118.114422], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker2 = L.marker([34.139455,-118.241990]).addTo(map);
    var marker = L.marker([34.136716, -118.125352]).addTo(map);
    var circle = L.circle([34.128150, -118.114422], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);




    
    
    marker.bindPopup("Caltech").openPopup();
    circle.bindPopup("Huntington Library & Botanical Gardens");
    marker2.bindPopup("Shawty's Crib")

}());