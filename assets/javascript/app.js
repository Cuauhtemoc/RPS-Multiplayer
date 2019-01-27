var database;

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

//set up our database var that we will be refrencing 
database = firebase.database();

//set the initial values of the player objects
database.ref("users/player1").set(
  playerOne);
database.ref("users/player2").set(
    playerTwo);  

//logic for RPS game
function findWinner(){
  console.log(playerOne.hasChosen, playerTwo.hasChosen);
  if(playerOne.hasChosen && playerTwo.hasChosen)
    {
      if(playerOne.choice === "rock" && playerTwo.choice === "scissors")
      {
        playerOne.wins++;
        console.log("player 1 wins");
      }
      else if(playerOne.choice === "rock" && playerTwo.choice === "paper")
      {
        playerTwo.wins++;
        console.log("player 2 wins");
      }
      else  if(playerOne.choice === "paper" && playerTwo.choice === "scissors")
      {
        playerTwo.wins++;
        console.log("player 2 wins");
      }
      else  if(playerOne.choice === "paper" && playerTwo.choice === "rock")
      {
        playerOne.wins++;
        console.log("player 1 wins");
      }
      else  if(playerOne.choice === "scissors" && playerTwo.choice === "rock")
      {
        playerTwo.wins++;
        console.log("player 2 wins");
      }
      else  if(playerOne.choice === "scissors" && playerTwo.choice === "paper")
      {
        playerOne.wins++;
        console.log("player 1 wins");
      }

      else  if(playerOne.choice === playerTwo.choice)
      { 
        playerOne.ties++;
        playerTwo.ties++;
        console.log("tie");
      }
      database.ref("users/player1/wins").set(playerOne.wins);
      database.ref("users/player1/ties").set(playerOne.ties);
      database.ref("users/player2/wins").set(playerTwo.wins);
    } 
};

//here are the click event that we will be listeing for in the game.  The goal here is to capture the data
//and pass it to firebase then update the game so multiple users can see the updated game state
$(".game-button").on("click", function(){
    findWinner($(this).val());
});
//save chat msgs to firebase
$("#chat-box-button").on('click', function(){
  msg = $("#chat-box").val();
  database.ref("chat/msgs").push({
    msg: msg
  })
})

//collect the name the user wants to go by for the game session and save it to firebase
$("#p1-name-box-button").on('click', function(){
  var name = $("#p1-name-box").val();
  playerOne.name = name;
  playerOne.isReady = true;//the user has entered a name and is ready to play
  $("#p1-name").text(name);
  database.ref("users/player1").set(playerOne);  
})
$("#p2-name-box-button").on('click', function(){
  var name = $("#p2-name-box").val();
  playerTwo.name = name;
  playerTwo.isReady = true;//the user has entered a name and is ready to play
  $("#p2-name").text(name);
  database.ref("users/player2").set(playerTwo);
})
//check to see which button the user selected (R, P , or S) and save that info to firebase
$(".game-button-p1").on("click", function(){
  playerOne.choice = $(this).val();
  database.ref("users/player2/hasChosen").once("value").then(function(snapshot){
    playerTwo.hasChosen = snapshot.val();
    playerOne.hasChosen = true;//make sure the other player is ready before deciding a winner
    database.ref("users/player1/choice").set(playerOne.choice);
    database.ref("users/player1/hasChosen").set(playerOne.hasChosen);
    findWinner();//run the game if both players are ready
  })

})
//save as above but for the second player
$(".game-button-p2").on("click", function(){
  playerTwo.choice = $(this).val();
  database.ref("users/player1/hasChosen").once("value").then(function(snapshot){
    playerOne.hasChosen = snapshot.val();
    playerTwo.hasChosen = true;
    database.ref("users/player2/choice").set(playerTwo.choice);
    database.ref("users/player2/hasChosen").set(playerTwo.hasChosen);
    findWinner();
  })

})

//fire base database change event listeners below

//make sure we are updating the game choices locally for players
database.ref("users/player2/choice").on("value", function(snapshot){
  playerTwo.choice = snapshot.val();
})
database.ref("users/player1/choice").on("value", function(snapshot){
  playerOne.choice = snapshot.val();
})

//once the user chooses a name empty and show the correct divs
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
//update the game locally from firebase data  
database.ref("users/player1/").on("value", function(snapshot){
    results = snapshot.val();
    $("#player1-wins").text(results.name +": "+ results.wins);
    $("#ties").text("Ties: " + results.ties);
  });
database.ref("users/player2/").on("value", function(snapshot){
   results = snapshot.val();
   $("#player2-wins").text(results.name +": "+ results.wins);
 });

//update the chat div 
database.ref("chat/msgs").on("child_added", function(snapshot){
  msg = snapshot.val();
  $("#chat-area").append("<p> MSG: " + msg.msg + "</p>");
})

//hide divs we dont need when the game starts
$("#button-area-p1").hide();
$("#button-area-p2").hide();
$("#chat-area").hide();