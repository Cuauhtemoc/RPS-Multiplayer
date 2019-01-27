var database;
// var playerWins = 0;
// var computerWins = 0;
// var playerOneReady = false;
// var plyerTwoReady = false; 
// var ties = 0;

//Player objects for storing their game info
playerOne = {
  wins: 0,
  losses: 0,
  ties: 0,
  isReady: false,
  hasChosen: false,
  choice: ""
}
playerTwo = {
  wins: 0,
  loses: 0,
  ties: 0,
  isReady: false,
  hasChosen: false,
  choice: ""
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

database.ref("users/player1").set(
  playerOne);
database.ref("users/player2").set(
    playerTwo);  

function findWinner(){
  console.log(playerOne.hasChosen, playerTwo.hasChosen);
  if(playerOne.hasChosen && playerTwo.hasChosen)
    {
      if(playerOne.choice === "rock" && playerTwo.choice === "scissors")
      {

        console.log("player 1 wins");
      }
      else if(playerOne.choice === "rock" && playerTwo.choice === "paper")
      {

        console.log("player 1 loses");
      }
      else  if(playerOne.choice === "paper" && playerTwo.choice === "scissors")
      {

        console.log("player 2 wins");
      }
      else  if(playerOne.choice === "paper" && playerTwo.choice === "rock")
      {

        console.log("player 1 wins");
      }
      else  if(playerOne.choice === "scissors" && playerTwo.choice === "rock")
      {

        console.log("player 2 wins");
      }
      else  if(playerOne.choice === "scissors" && playerTwo.choice === "paper")
      {

        console.log("player 1 wins");
      }

      else  if(playerOne.choice === playerTwo.choice)
      {
        console.log("tie");
      }
      
    } 
};

$(".game-button").on("click", function(){
    findWinner($(this).val());
});
$("#chat-box-button").on('click', function(){
  msg = $("#chat-box").val();
  database.ref("chat/msgs").push({
    msg: msg
  })
})
$("#p1-select-button").on("click", function(){
  playerOne.isReady = true;
  database.ref("users/player1").set(
  playerOne);  
})

 $("#p2-select-button").on("click", function(){
  playerOne.isReady = true;
  database.ref("users/player2").set(
  playerTwo);  
  $("#player1-card").empty();
})
$("#p1-name-box-button").on('click', function(){
  var name = $("#p1-name-box").val();
  playerOne.name = name;
  playerOne.isReady = true;
  $("#p1-name").text(name);
  database.ref("users/player1").set(playerOne);  
})
$("#p2-name-box-button").on('click', function(){
  var name = $("#p2-name-box").val();
  playerTwo.name = name;
  playerTwo.isReady = true;
  $("#p2-name").text(name);
  database.ref("users/player2").set(playerTwo);
})
$(".game-button-p1").on("click", function(){
  playerOne.choice = $(this).val();
  database.ref("users/player2/hasChosen").once("value").then(function(snapshot){
    playerTwo.hasChosen = snapshot.val();
    playerOne.hasChosen = true;
    database.ref("users/player1/choice").set(playerOne.choice);
    database.ref("users/player1/hasChosen").set(playerOne.hasChosen);
    findWinner();
  })
  
  // database.ref("users/player1/hasChosen").on("value", function(snapshot){
  //   if(snapshot.val() && playerTwo.hasChosen){
  //     findWinner();
  //   }
  // })
})
$(".game-button-p2").on("click", function(){
  playerTwo.choice = $(this).val();
  database.ref("users/player1/hasChosen").once("value").then(function(snapshot){
    playerOne.hasChosen = snapshot.val();
    playerTwo.hasChosen = true;
    database.ref("users/player2/choice").set(playerTwo.choice);
    database.ref("users/player2/hasChosen").set(playerTwo.hasChosen);
    findWinner();
  })
  
  // database.ref("users/player2/hasChosen").on("value", function(snapshot){
  //   if(playerOne.hasChosen && snapshot.val()){
  //     findWinner();
  //   }
  // })
})


database.ref("users/player2/choice").on("value", function(snapshot){
  playerTwo.choice = snapshot.val();
})
database.ref("users/player1/choice").on("value", function(snapshot){
  playerOne.choice = snapshot.val();
})
database.ref("users/player2/isReady").on("value", function(snapshot){
   database.ref("users/player2/name").on("value", function(snapshot){   
   if (playerTwo.name === snapshot.val())
   {
      $("#p2-name-area").empty();
      $("#player1-card").empty();
   }
  });
   p2Ready = snapshot.val();
   if (p2Ready)
   { 
    $("#p2-name-area").empty();
     $("#button-area-p2").show();
   } 
 })
 database.ref("users/player1/isReady").on("value", function(snapshot){
  database.ref("users/player1/name").on("value", function(snapshot){
      if (playerOne.name === snapshot.val())
        {
          $("#p1-name-area").empty();
          $("#player2-card").empty();
        }
    });
  p1Ready = snapshot.val();
  if (p1Ready)
    {
      $("#p1-name-area").empty();
      $("#button-area-p1").show();
    } 
  })
database.ref("chat/msgs").on("child_added", function(snapshot){
  msg = snapshot.val();
  $("#chat-area").append("<p> MSG: " + msg.msg + "</p>");

})

// $("#button-select-area-p1").hide();
// $("#button-select-area-p2").hide();
$("#button-area-p1").hide();
$("#button-area-p2").hide();
$("#chat-area").hide();