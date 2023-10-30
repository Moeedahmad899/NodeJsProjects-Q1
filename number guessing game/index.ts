#! /usr/bin/env node
import helpers from './functions.js';



let totalScore = 0;
let prompt = await helpers.initPrompt();


if(prompt){
   let random_numbers = helpers.generateRandomNumbers();
   console.log(random_numbers)
   console.log("\t\t Welcome To The Number Guessing Game!");
   console.log("\t\t     Guess the Number Between 1-10");
   for (let i = 1; i <= 3; i++){
      let userGuessedNumber = await helpers.startGame();

      if(userGuessedNumber == random_numbers){
         totalScore +=30;
         console.log(` Correct guess you got ${totalScore} points! `);
         break;
      }  else if(userGuessedNumber < random_numbers){
         totalScore -=10;
         console.log(`your guess is close you got ${totalScore} points! `);
      }
      else if (userGuessedNumber > random_numbers) {
         totalScore -=10;
         console.log(`your guess is far you got ${totalScore} points! `);
      }
   }
  
} 




