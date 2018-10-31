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

        // $(".form-group")[0].reset();

    });
    var tdMinAway;
    var tdName;
    var tdDest;
    var tdStart;
    var tdFreq;
    var minAway;
    database.ref().on("child_added", function (childSnapshot) {
        var now = moment().format("HH:mm");
        var frequency = parseInt(childSnapshot.val().frequency);
        // var frequency = moment(childSnapshot.val().frequency, "m").format("HH:mm");
        var startTime = moment(childSnapshot.val().startTime, "HH:mm").format("HH:mm");
        console.log(childSnapshot.val().startTime);
        //$(".train-table").append(tRow);
        console.log(startTime + " started at");
        // startTime = moment(startTime).format("HH:mm");
        console.log(now);
        tdName = $("<td>").append(childSnapshot.val().trainName);
        tdDest = $("<td>").append(childSnapshot.val().destination);
        tdFreq = $("<td>").append(childSnapshot.val().frequency);
        console.log("hey hey hey! " + moment().add(frequency, "m").format("HH:mm"));
        
        
        minAway = moment(frequency, "m" - (moment("HH:mm").subtract(startTime, "HH:mm")) % frequency, "m").format("m")
        tdNextTrain = $("<td>").append(moment().add(parseInt(minAway)));
        console.log("try this " + moment().subtract(startTime, "HH:mm").format("HH:mm"));
        
        tdMinAway = $("<td>").append(minAway);



        var a = moment([2007, 0, 28]);
        var b = moment([2007, 0, 29]);
        a.to(b) // "in a day"
        console.log("now - start time = " + moment().subtract(startTime, "HH:mm").format("HH:mm"));
        console.log("start time: " + startTime);
        console.log("now " + now);
        console.log("frequency " + frequency);
        console.log("minutes away " + minAway);

        //tdMinAway = $("<td>").append()
        //tdNext = $("<td>").append(moment(startTime).toNow("HH:mm"));
        // tdStart = $("<td>").append(childSnapshot.val().startTime);
        console.log(minAway + " mins away!");
        var tRow = $("<tr>").append(tdName, tdDest, tdStart, tdFreq, tdNextTrain, tdMinAway);
        $(".train-table").append(tRow);
        // tData.append(snapshot.val().);



    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);


    });







// DID ALL THE FOLLOWING ON A SEPARATE FILE FOR CLARITY. NEEDS TO BE REFORMATTED TO MEET UP WITH THIS JAVASCRIPT. 
// BUT IT ALL WORKS.
    var frequency = "30";
    var startTime = "5:00";
    var now = moment().format("HH:mm");
    var span = moment("21:00", "mm").fromNow();
    var lapse = moment()
    var a = moment("21:00");
    
    console.log("worky?? " + a.to(now, 'minutes')); // 1
    console.log(span);
    console.log(now);
    console.log(moment().add(frequency, "m").format("HH:mm"));
    var frequency = 30;
    // var a = moment([6, 00]);
    // var b = moment([5, 00]);
    // var diff = (a.diff(b, "minutes"));
    // console.log(diff);

    // var now  = "04/09/2013 15:00:00";
    // var then = "04/09/2013 14:20:30";

    var timeSince = moment.utc(moment(now,"HH:mm").diff(moment(startTime,"HH:mm"))).format("HH:mm");
    var mins = moment.duration(timeSince).asMinutes();
    console.log(mins);
    var minsAway = frequency - (mins % frequency);
    console.log(minsAway);
    var nextTrain = moment().add(minsAway, "m").format("HH:mm");
    console.log(nextTrain);

});