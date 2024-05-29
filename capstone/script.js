( function (){
    'use strict';

    // CODE FOR DISPLAYING TIME
    setInterval(function() {
        // Just move your date creation inside the interval function
        var today = new Date();
        // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date + " " + time; // Add the time to the date string
      
        // Now it will take the current date and put it in all html elements
        document.getElementById('clock').innerHTML = time;

      }, 1000);



    // CODE FOR HIDING AND SHOWING CONTENT
    const link1 = document.getElementById("link1");

    link1.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("content").innerHTML = 
        `<section>
        <p>Enter Your Income:</p> <br>
        <input type="text" id="#" name="#" value="Income">
        <a id="link2" href="#"> NEXT </a>
        </section>
        `;
    });

    document.getElementById("content").addEventListener("click", function(event) {
        if (event.target && event.target.id === "link2") {
            event.preventDefault();
            document.getElementById("content").innerHTML = `
            <section class="info">
            <p>page1</p> <br>
            </section>`;
            document.getElementById("observablehq-chart-0997c195").classList.remove('notThere');
            document.getElementById("observablehq-chart-0997c195").classList.add('There');
        }
    });

    

})();