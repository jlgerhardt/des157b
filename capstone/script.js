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
        document.getElementById("textsection").innerHTML = `
        <h1> Where can YOU live? </h1>
        <p>As of 2024, the state with the lowest cost of living is Mississippi with $32,336, and the state with the highest is Hawaii at $55,491. Choices for income range will be available accordingly.</p>
        <p>
        While cost of living is essential when deciding where to set down roots, you will likely want to balance the lure of affordability with what you require to enjoy your life on a day-to-day basis. For example, a location with a lower cost of living does not always equate with a better quality of life.
        </p>
        <p>
        Even so, getting a sense of how much money you’ll have left in your pocket after shelling out for essentials can help direct your attention to places more likely to fit your affordability requirements and lifestyle needs.
        </p>
        <form>
        <label for="cars">Choose an income range:</label>
        <select name="income" id="income">
          <option value="$32,336-$35,000">$32,336-$35,000</option>
          <option value="$35,000-$40,000">$35,000-$40,000</option>
          <option value="$40,000-$45,000">$40,000-$45,000</option>
          <option value="$45,000-$55,491">$45,000-$55,491</option>
        </select>
        <br><br>
        <input type="submit" value="Submit">
        </form>
        `;
        document.querySelector('form').addEventListener('submit', function(event){
            event.preventDefault();
            const choice = document.querySelector('#income').value;
            if (choice == '$32,336-$35,000') {
                statesToColor = ['Mississippi','Arkansas','Alabama','Oklahoma','New Mexico','Tennessee','South Carolina','West Virginia'];
                updateStateColors();
                console.log(statesToColor);
            } else if (choice == '$35,000-$40,000') {
                statesToColor = ['Mississippi','Arkansas','Alabama','Oklahoma','New Mexico','Tennessee','South Carolina','West Virginia','Kansas','Missouri','Kentucky','Louisiana','North Dakota','Iowa','Ohio','Indiana','North Carolina','South Dakota','Michigan','Montana','Wisconsin','Nebraska','Wyoming','Texas','Idaho','Georgia','Arizona','Maine'];
                updateStateColors();
                console.log(statesToColor);
            } else if (choice == '$40,000-$45,000') {
                statesToColor = ['Mississippi','Arkansas','Alabama','Oklahoma','New Mexico','Tennessee','South Carolina','West Virginia','Kansas','Missouri','Kentucky','Louisiana','North Dakota','Iowa','Ohio','Indiana','North Carolina','South Dakota','Michigan','Montana','Wisconsin','Nebraska','Wyoming','Texas','Idaho','Georgia','Arizona','Maine','Pennsylvania','Florida','Utah','Illinois','Minnesota','Nevada','Virginia','Vermont','Delaware','Rhode Island'];
                updateStateColors();
                console.log(statesToColor);
            } else {
                statesToColor = ['Mississippi','Arkansas','Alabama','Oklahoma','New Mexico','Tennessee','South Carolina','West Virginia','Kansas','Missouri','Kentucky','Louisiana','North Dakota','Iowa','Ohio','Indiana','North Carolina','South Dakota','Michigan','Montana','Wisconsin','Nebraska','Wyoming','Texas','Idaho','Georgia','Arizona','Maine','Pennsylvania','Florida','Utah','Illinois','Minnesota','Nevada','Virginia','Vermont','Delaware','Rhode Island','New Hampshire','Colorado','Oregon','Connecticut','Washington','Maryland','Alaska','New Jersey','New York','California','Massachusetts','Hawaii'];
                updateStateColors();
                console.log(statesToColor);
            }
            document.getElementById("textsection").innerHTML = ``;
            document.getElementById("background").innerHTML = ``;
            document.querySelector("header").innerHTML = `
            <div id="dateDisplay"><span id="currentDate"></span></div>
            <h1 class="finalheader">INTERACTIVE MAP</h1>
            <div id="clock"><span id="currentTime"></span></div>
            `;
            document.getElementById("topmapinfo").innerHTML = `
            <div id="maplegend">
            <p>Click on the states for more information. <br> 
            Press ESC to reset zoom. <br> 
            Highlighted states are within the income range you selected.</p>
            </div>

            <div id="incomerange">
            <p>Your Income Range: <br> <b>${choice}</b></p>
            </div>
            `;
            document.getElementById("mapinfo").innerHTML = `
            <div id="state-info" height>
                choose a state to view information!
            </div>
            `;
            document.getElementById("mapinfo").style.height = '610px';
            document.getElementById("observablehq-chart-0997c195").classList.remove('notThere');
            document.getElementById("observablehq-chart-0997c195").classList.add('There');
        });
    });

})();