$(document).ready(function() {



var config = {
    apiKey: "AIzaSyCDW3VevjX_9R6xiumXAO6OjLJbj5x7g_8",
    authDomain: "nickila-train-scheduler.firebaseapp.com",
    databaseURL: "https://nickila-train-scheduler.firebaseio.com",
    projectId: "nickila-train-scheduler",
    storageBucket: "nickila-train-scheduler.appspot.com",
    messagingSenderId: "1026948699686"
};
firebase.initializeApp(config);

console.log("javascript, check!")

        
      

var now = moment().format("h:mm");
console.log(now);

        
        
});