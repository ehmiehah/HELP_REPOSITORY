var five = require('johnny-five');  // Pulls in Johnny-five framework
var board = new five.Board(); // Boardconstructor deefines at which port the Arduino is - in this case(on PC) this is automatic

const fetch = require('node-fetch'); // gives node the ability to execute fetch (node-fetch needs to be installed)
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";


//this function starts up the board (it should be the first thing that happens)
board.on("ready", function() {
     
    var motor = new five.Motor(6);

    console.log("BOARD IS ON");

     });


// this one collects the data from the API and returns the visibility value
async function getISS(){
    
    const response = await fetch(api_url);
    const data = await response.json();
    const {visibility} = data;

    //console.log(visibility); // prints daylight
    return visibility;
} 

// this one here powers motor based on the visibility
async function motorAction(){
    const response = await getISS();
    const visibility = await response;
    

// sentences to be exchanged with motor actions
    if(visibility == "daylight"){
        console.log("The ISS is currently in a daylight zone.");

    }else if(visibility == "eclipsed"){
        console.log("The ISS is currently in an eclipse zone.");

    }else{
        console.log("I don't know where the ISS is at.")
    }
}

motorAction(getISS);


 
//NOTES TO MYSELF:

// FETCHING AN API THE CLEAN WAY:
// fetch(api_url)
// .then(response => {
//     return response.json();
// })
// .then(json =>{
//     console.log(json);
// })

// .catch(function(err) {
//     console.log(err);
// })



// RUN THE MOTOR:
// board.on("ready", function() {
//     console.log("CHECKING FOR VISIBILITY");


//     // var motor = new five.Motor(6);
//     // motor.forward(255);

//     // setTimeout(function(){
//     //     motor.stop();
//     // }, 8000);
// });









// RUN THIS PROGRAM by going to command line and enter: node motor.js
// IF YOU QUIT by clicking Strg+ C twice, the programm will stay in it's last state (Johnny-Five default)