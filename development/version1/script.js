( function (){
    'use strict';

    setInterval(function() {
        // Just move your date creation inside the interval function
        var today = new Date();
        // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date + " " + time; // Add the time to the date string
      
        // Now it will take the current date and put it in all html elements
        document.getElementById('clock').innerHTML = time;

      }, 1000);

      // d3.select(window).on("keydown", function() {
      //   if (d3.event.key === "Escape") {
      //     reset();
      //   }
      // });

          // Get references to the link elements
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");

    // Add click event listeners to the links
    link1.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default link behavior (e.g., page reload)

      // Replace content with new HTML
      document.getElementById("content").innerHTML = "<p>This is content for Link 1.</p>";
    });

    link2.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default link behavior (e.g., page reload)

      // Replace content with new HTML
      document.getElementById("content").innerHTML = "<p>This is content for Link 2.</p>";
    });

    

})();