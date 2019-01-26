var database;
// var playerWins = 0;
// var computerWins = 0;
// var playerOneReady = false;
// var plyerTwoReady = false; 
// var ties = 0;

//Player objects for storing their game info
playerOne = {
  name: "player-one",
  wins: 0,
  losses: 0,
  ties: 0,
  isReady: false
}
playerTwo = {
  name: "player-two",
  wins: 0,
  loses: 0,
  ties: 0,
  isReady: false
}
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyA215TH7yXiFn9bCgXi79LK15jRnUnFSH0",
    authDomain: "datbase-8b368.firebaseapp.com",
    databaseURL: "https://datbase-8b368.firebaseio.com",
    projectId: "datbase-8b368",
    storageBucket: "datbase-8b368.appspot.com",
    messagingSenderId: "1075879225786"
  };
firebase.initializeApp(config);

database = firebase.database();

function findWinner(str){
   
};

$(".btn").on("click", function(){
    console.log("here");
    findWinner($(this).val());
});
$("#button-area-p1").hide();
$("#button-area-p2").hide();