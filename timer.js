// Set the date we're counting down to
var countDownDate = new Date("May 6, 2017 20:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        retrieveGender();
        // document.getElementById("finalText").innerHTML = "<h2><br>Am gonna be a <br>Big Brother <br> to<br><br> </h2><h1><span style='font-size:80px;color:pink'>A LITTLE SISTER !!</span></h1>";
        // document.getElementById("mainTimerContainer").style.backgroundColor = 'hotpink';

        // document.getElementById("finalText").innerHTML = "<h2><br>Am gonna be a <br>Big Brother <br> to<br><br> </h2><h1><span style='font-size:80px;color:blue'>A LITTLE BROTHER</span></h1>";
        // document.getElementById("mainTimerContainer").style.backgroundColor = 'skyblue';
    }
}, 1000);

function retrieveGender() {
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "https://api.mlab.com/api/1/databases/vadlakonda/collections/gender?apiKey=2-byIVNo-oqo6Irfu3ywY1OkJW8GY_xh",
        success: function(data) {
            updateGender(data);
        }
    });
}

function updateGender(genderResponse) {
    console.log(genderResponse[0].gender);

    if (genderResponse) {
        if (genderResponse[0].gender.toUpperCase() === 'BOY') {
            document.getElementById("finalText").innerHTML = "<h2><br>Am gonna be a <br>Big Brother <br> to<br><br> </h2><h1><span style='font-size:80px;color:blue'>A LITTLE BROTHER</span></h1>";
            document.getElementById("mainTimerContainer").style.backgroundColor = 'skyblue';
        } else if (genderResponse[0].gender.toUpperCase() === 'GIRL') {
            document.getElementById("finalText").innerHTML = "<h2><br>Am gonna be a <br>Big Brother <br> to<br><br> </h2><h1><span style='font-size:80px;color:pink'>A LITTLE SISTER !!</span></h1>";
            document.getElementById("mainTimerContainer").style.backgroundColor = 'hotpink';
        }
    }
}