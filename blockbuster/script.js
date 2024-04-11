(function() {
    'use strict';

    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const myNav = document.querySelector('nav');

    const poem = {
    start: [0, 5, 8],
    stop: [4, 7, 10],
    line: [line1, line2, line3]
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
    }

    // reveal nav
    function showNav() {
        myNav.className = "showing";
    }

    const myTimeout = setTimeout(showNav, 12000)
    

    fs.addEventListener('click', function() {
        // The fullscreenElement attribute returns null if the element is in windowed mode
        if (!document.fullscreenElement) {
            // document.documentElement returns the Element that is a direct child of the document, the <html> element
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();

        }
    });

    const loading = document.querySelector('.fa-dove');

    myVideo.addEventListener('playing', function() {
        loading.style.display = 'none';
    })
    
})();