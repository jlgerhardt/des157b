(function(){
    'use strict';

    async function getData(){
        const watched = await fetch('data/watched.json');
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
        `
        <p id="mile">${data.mileage}</p>
         <p id="day">${data.day}</p>`;
    }
    
    getData();
    

})(); // end IIFE

