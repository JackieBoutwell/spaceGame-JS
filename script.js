var prompt = require('prompt-sync')();

//Game Loop
while (true){
  //The aliens send a random number of ships to attack Earth. Think of a reasonable range and implement it.
  alienSquad = Math.round(Math.random() * 6) + 6;
  
  
  const USSAssembly = {
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    shield: 0
  }
  console.log('USS Assembly', USSAssembly);
  
  let alienFleet = makeAlienFleet(alienSquad);//Function at bottom of code
  console.log('Alien Fleet', alienFleet);
  

  // A game round would look like this:
  // Battle loop
  while (alienFleet.length > 0 && USSAssembly.hull > 0){
    console.log('\n ')
    alienShip = alienFleet[0];
    // Scientists have improved your ship's shields. They don't work that consistently, and only improve your hit points by a random number each time
    USSAssembly.shield = Math.round(Math.random() * 2);
    // You attack the first alien ship
    yourAttack(USSAssembly, alienShip)//Function at bottom of code
    
    // If the alien ship survives, it attacks you
    if (alienShip.hull > 0){ //Alien Ship survived
      aliensAttack(USSAssembly, alienShip);//Function at bottom of code
      continue;
    }else{ //Alien ship was destroyed, continue to next round.
      alienFleet.shift();
      console.log('Alien ship destroyed!');
      console.log('Your hull is at', USSAssembly.hull);
      console.log('Remaiing alien ships:', alienFleet.length)
      //Retreat or contine?    
      if (alienFleet.length > 0){
        let response = prompt('Hit enter to continue ');
        if (response === ''){
          console.log('_______________________');
          continue;
        }else{
          break;
        }
      }// End of Retreat or contine decission
    }
  } // End battle loop 

  
    // You win the game if you destroy all of the aliens
    // You lose the game if you are destroyed
  
    // End Game Sequence
    if (alienFleet.length === 0){
      console.log('!!!!!!!!!!You win!!!!!!!!!!');
    }else if (USSAssembly.hull === 0){
      console.log('You lose!');
    }else{
      console.log('You fled successfully!')
    }
  
    //Play again?
    let response = prompt('Hit enter to continue to play again');
    if (response === ''){
      console.log('\n\n******************\n\n');
      continue;
    }else{
      break;
    }
}// End game loop




// Make Alien Ship
function makeAlienShip() {
  let alienShip = {};
  alienShip.hull = Math.round(Math.random() * 3) + 3;
  alienShip.firePower = Math.round(Math.random() * 2) + 2;
  alienShip.accuracy = (Math.round(Math.random() * 2) + 6) / 10;
  return alienShip;
}

// Make Alien Fleet
function makeAlienFleet(number) {
  let alienShips = [];
  for (let i = 0; i < number; i++) {
    alienShips.push(makeAlienShip());//Function above
  }
  return alienShips;
}

// Your Ship Attack Actions
function yourAttack(yourShip, alienShip){
  if (yourShip.accuracy > Math.random()){
    alienShip.hull -= yourShip.firePower;
    console.log('You hit the alien ship!');
  }else{
    console.log('You missed!');
  }
}

// Alien Ship Attack Actions
function aliensAttack(yourShip, alienShip){
  if (alienShip.accuracy > Math.random()){
    
    yourShip.hull -= alienShip.firePower - yourShip.shield;
    
    console.log('You were hit!');
    console.log('Your shield absorbed ', yourShip.shield, ' damage')
  }else{
    console.log('Alien ship missed!');
  }
}





// Bonuses

// Scientists have developed a super targeting computer for your lasers. You now are asked which of the aliens you would like to hit with your lasers.

// Scientists have put missiles on your ship. You only have a limited number of them, but they do a lot of damage. You can say before each battle if you want to use one of your missles.
// The aliens have gained emotions and now can attack more than one at a time.
// Evil alien scientists have created an alien mega-ship. This mega-ship contains a number of "weapon pods" that each have their own individual hit points. These "weapon-pods" ( objects ) must all be destroyed before you can begin doing damage to the main ship, which also has its own hit points.

// So far the entire game is just one battle, with many aliens. Implement a game that consists of multiple battles where enemies respawn for a new battle at the end of the old battle. Keep track of points for the number of wins the player has.
// After every battle you are asked if you want to return to base and recharge your shields.
// Make the players and enemies stronger after each battle
// Distribute medals and power ups to the player depending on points