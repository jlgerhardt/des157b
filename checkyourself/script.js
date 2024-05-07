(function(){
    'use strict';

    async function getData(){
        const watched = await fetch('data/runs.json');
        const data = await watched.json();
        const values = Object.values(data);
        console.log(values);
    
        const links = document.querySelectorAll('main nav a');
        links.forEach(function(eachLink){
            eachLink.addEventListener('click', function(event){
                event.preventDefault();
                const day = event.target.getAttribute('href');
                outputHTML(values[day]);
            } );
        });  
    }

    function outputHTML(data){
        const display = document.querySelector("#display")
        display.innerHTML = 
        `<p id="day">${data.day}</p>
        <p id="mile">${data.mileage}</p>
        <img src="images/${data.route}.png" alt="route">`;
    }
    
    getData();
    

})(); // end IIFE

