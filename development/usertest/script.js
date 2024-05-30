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
        document.getElementById("header").innerHTML = `<h1> Where can YOU live comfortably? </h1> `;
        document.getElementById("content").innerHTML = 
        `<section>
        <p>Enter Your Projected Income Range:</p> <br>
        <input type="text" id="#" name="#" value="Income">
        <a class= "continue" id="link2" href="#"> NEXT </a>
        </section>
        `;
    });

    document.getElementById("content").addEventListener("click", function(event) {
        if (event.target && event.target.id === "link2") {
            event.preventDefault();
            document.getElementById("header").innerHTML = `
            <div class="wrapper">
            <p>Click on the states for more information. <br> Press ESC to reset zoom.</p>
            <p>Your Income Range: <br> <b>$30,000-$50,000</p>
            </div>
`;
            document.getElementById("content").innerHTML = ``;
            document.getElementById("observablehq-chart-0997c195").classList.remove('notThere');
            document.getElementById("observablehq-chart-0997c195").classList.add('There');
        }
    });

    // This function will run when the window finishes loading
    window.onload = function() {
      alert('You are a graduating UC Davis student with a projected income out of college at $30,000-$50,000. You want to find out more about where you could live comfortably in the US and are recommended this website from a friend. Enter your income and find out which states suit you financial situation.');
    };

    

    

})();