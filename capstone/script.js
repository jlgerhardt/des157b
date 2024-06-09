( function (){
    'use strict';

    //-------------------------CODE FOR DATE AND TIME DISPLAY-------------------------

    // Function to pad single digits with leading zeros
    function padToTwoDigits(number) {
        return number.toString().padStart(2, '0');
    }

    // Function to format the date with two digits for day, month, and year
    function formatDate(date) {
        const day = padToTwoDigits(date.getDate());
        const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
        const year = padToTwoDigits(date.getFullYear() % 100); // Get last two digits of the year
        return `${month}.${day}.${year}`;
    }

    // Function to format the time with two digits for hours, minutes, and seconds
    function formatTime(date) {
        const hours = padToTwoDigits(date.getHours());
        const minutes = padToTwoDigits(date.getMinutes());
        const seconds = padToTwoDigits(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    // Function to display the current date and time
    function displayDateTime() {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const formattedTime = formatTime(currentDate);
        document.getElementById('currentDate').textContent = formattedDate;
        document.getElementById('currentTime').textContent = formattedTime;
    }

    // Update the time every second
    setInterval(displayDateTime, 1000);

    // Call the displayDateTime function when the page loads
    window.onload = displayDateTime;

    //-------------------------CODE FOR HIDING AND SHOWING CONTENT-------------------------
    const link1 = document.getElementById("link1");

    link1.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("bigText").innerHTML = `<h1> Where can YOU live comfortably? </h1> `;
        document.getElementById("content").innerHTML = 
        `<section>
        <form>
        <label for="cars">Choose an income range:</label>
        <select name="income" id="income">
          <option value="veryLow">veryLow</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <br><br>
        <input type="submit" value="Submit">
        </form>
        </section>
        `;
        document.querySelector('form').addEventListener('submit', function(event){
            event.preventDefault();
            const choice = document.querySelector('#income').value;
            if (choice == 'veryLow') {
                statesToColor = ['California', 'Florida'];
                updateStateColors();
                console.log(statesToColor);
            } else if (choice == 'low') {
                statesToColor.push('Alabama');
                updateStateColors();
            } else if (choice == 'medium') {
                statesToColor.push('Utah');
                updateStateColors();
            } else {
                statesToColor.push('Colorado');
                updateStateColors();
            }
            document.getElementById("bigText").innerHTML = `
            <div>
            <p>Click on the states for more information. <br> Press ESC to reset zoom. <br> Highlighted states are where you can live comfortably.</p>
            <p>Your Income Range: <br> <b>$30,000-$50,000</b></p>
            </div>
            `;
            document.getElementById("content").innerHTML = ``;
            document.getElementById("observablehq-chart-0997c195").classList.remove('notThere');
            document.getElementById("observablehq-chart-0997c195").classList.add('There');
        });
    });

})();