$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCcnMUobI4_PPEQE2-xPti995PfCY6Yt7E",
        authDomain: "briannickilaproject1.firebaseapp.com",
        databaseURL: "https://briannickilaproject1.firebaseio.com",
        projectId: "briannickilaproject1",
        storageBucket: "briannickilaproject1.appspot.com",
        messagingSenderId: "109852495499"
    };
    firebase.initializeApp(config);
    // Create a variable to reference the database.
    var database = firebase.database();
    // var now = moment().format("h:mm");
    // console.log(now);
    /*
    Set global variables-trainName, destination, frequency, startTime
    Send info to firebase
    Show snapshot in html to appropriate locations
    Append trainName, destination, frequency, nextArrival, minAway to:
    separate <td> and into a <tr> and prepend the <tr> to ".train-table"
    Figure out calculation for train arrival based on start time, frequency and current time.
    If start time is 3:00, and frequency is 5 mins and it's currently 3:17 the next train should be
    arriving in 3 mins because current time minus start time equals 17 mins divided by 5 has a remainder
    of 2 and frequency time minus the remainder of those numbers equals three. So I would need a variable
    for the current time (now).
    now - startTime      
    */
    var trainName;
    var destination;


    $("#submit").on("click", function (event) {
        event.preventDefault();

        if (($("#trainName").val() == "") || ($("#trainName").val() == " ")) {
            alert("Please enter a valid Train Name"); 

        } else {
            trainName = $("#trainName").val().trim();
        }
        if (($("#destination").val() == "") || ($("#destination").val() == " ")) {
            alert("Please enter a valid Destination"); 
        } else {
            destination = $("#destination").val().trim();
        }
        if (($("#startTime").val() == "") || ($("#startTime").val() == " ")) {
            alert("Please enter a valid First Train Time");
        } else {
            startTime = $("#startTime").val().trim();
        }
        // if (($("#frequency").val().isInteger()) && ($("#frequency").val > 0) && ($("#frequency").val < 100)) {
            if (($("#frequency").val() == "") || ($("#frequency").val() == " ")) {
                alert("Please enter a valid Frequency");
            } else {
            frequency = $("#frequency").val().trim();
            }
        
        
            database.ref().push({
                trainName: trainName,
                destination: destination,
                startTime: startTime,
                frequency: frequency
            });
           
       
    });

    var tdName;
    var tdDest;
    var tdStart;
    var tdFreq;
    var minsAway;
    var nextTrain;

    database.ref().on("child_added", function (childSnapshot) {
        var now = moment().format("HH:mm");
        var frequency = parseInt(childSnapshot.val().frequency);
        var startTime = moment(childSnapshot.val().startTime, "HH:mm").format("HH:mm");
        var timeSince = moment.utc(moment(now, "HH:mm").diff(moment(startTime, "HH:mm"))).format("HH:mm");
        var mins = moment.duration(timeSince).asMinutes();
        minsAway = frequency - (mins % frequency);
        nextTrain = moment().add(minsAway, "m").format("HH:mm");
        
        if ((frequency > 0) && (frequency < 500)) {
        tdName = $("<td>").append(childSnapshot.val().trainName);
        tdDest = $("<td>").append(childSnapshot.val().destination);
        tdFreq = $("<td>").append(childSnapshot.val().frequency);
        tdNextTrain = $("<td>").append(nextTrain);
        tdMinsAway = $("<td>").append(minsAway);
        tdFreq.addClass("center");
        tdNextTrain.addClass("center");
        tdMinsAway.addClass("center bold");

        var tRow = $("<tr>").append(tdName, tdDest, tdStart, tdFreq, tdNextTrain, tdMinsAway);
        $(".train-table").append(tRow);
        $("#trainName").val("");
        $("#destination").val("");
        $("#startTime").val("");
        $("#frequency").val("");
    //     console.log("valid? " + moment([startTime]).isValid());
    //     console.log("start time 1" + moment([startTime]).format("HH:mm"));
    } else {
        alert("Please enter a valid Frequency");
    return;
    }
        // console.log("startTime "  + startTime);
        // console.log("T or F " + ((startTime).isInteger()));
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


});