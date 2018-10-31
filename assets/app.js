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


    // console.log(now);
    var trainName;
    var destination;
    // var frequency;
    //var startTime = ("03:00");

    // console.log(startTimeM);
    console.log(startTime);

    // var minAway = (frequency - ((now - startTimeM) % frequency));
    // var nextArrival = moment(startTime).toNow("HH:mm");
    // console.log(minAway);
    // console.log(nextArrival);


    var newTrain;
    var newDestination;
    var newStartTime;
    var newFrequency;


    $("#submit").on("click", function (event) {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#startTime").val().trim();
        frequency = $("#frequency").val().trim();


        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        });
        $("#trainName").val("");
        $("#destination").val("");
        $("#startTime").val("");
        $("#frequency").val("");
    });

    var tdName;
    var tdDest;
    var tdStart;
    var tdFreq;
    
    database.ref().on("child_added", function (childSnapshot) {
        var now = moment().format("HH:mm");
        var frequency = parseInt(childSnapshot.val().frequency);
        var startTime = moment(childSnapshot.val().startTime, "HH:mm").format("HH:mm");
        var timeSince = moment.utc(moment(now,"HH:mm").diff(moment(startTime,"HH:mm"))).format("HH:mm");
        var mins = moment.duration(timeSince).asMinutes();
        var minsAway = frequency - (mins % frequency);
        var nextTrain = moment().add(minsAway, "m").format("HH:mm");
        tdName = $("<td>").append(childSnapshot.val().trainName);
        tdDest = $("<td>").append(childSnapshot.val().destination);
        tdFreq = $("<td>").append(childSnapshot.val().frequency);
        tdNextTrain = $("<td>").append(nextTrain);
        tdMinsAway = $("<td>").append(minsAway);
        var tRow = $("<tr>").append(tdName, tdDest, tdStart, tdFreq, tdNextTrain, tdMinsAway);
        $(".train-table").append(tRow);
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});