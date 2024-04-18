(function() {
    'use strict';

    const myVideo = document.querySelector('#myVideo'); 
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');
    const myNav = document.querySelector('nav');

    const poem = {
    start: [0, 3, 6, 9],
    stop: [11, 5, 8, 11],
    line: [line1, line2, line3, line4]
    }

    const intervalID = setInterval(checkTime, 1000);

    // main text showing
    function checkTime() {
        console.log(parseInt(myVideo.currentTime));

        if (poem.start[0] < myVideo.currentTime && myVideo.currentTime < poem.stop[0]) {
            poem.line[0].className = "showing";
        } else {
            poem.line[0].className = "hidden";
        }
        if (poem.start[1] < myVideo.currentTime && myVideo.currentTime < poem.stop[1]) {
            poem.line[1].className = "showing";
        } else {
            poem.line[1].className = "hidden";
        }
        if (poem.start[2] < myVideo.currentTime && myVideo.currentTime < poem.stop[2]) {
            poem.line[2].className = "showing";
        } else {
            poem.line[2].className = "hidden";
        }
        if (poem.start[3] < myVideo.currentTime && myVideo.currentTime < poem.stop[3]) {
            poem.line[3].className = "showing";
        } else {
            poem.line[3].className = "hidden";
        }
    }

    // reveal nav
    function showNav() {
        myNav.className = "showing";
    }

    const myTimeout = setTimeout(showNav, 12000)


    const loading = document.getElementById('loading');

    myVideo.addEventListener('playing', function() {
        loading.style.display = 'none';
    })
    
})();