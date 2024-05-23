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

})();