import inquirer from "inquirer";
let totalScore = 0;
let rounds = 0;
const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 10) + 1;
};
const initPrompt = async () => {
    let prompt = await inquirer.prompt([{
            name: "userChoice",
            type: "confirm",
            message: "start game?"
        }
    ]);
    return prompt.userChoice;
};
const startGame = async () => {
    let prompt;
    rounds += 1;
    console.log("\t\t\t Score:" + totalScore + "\tRound:" + rounds);
    prompt = await inquirer.prompt([{
            name: "userGuessedNumber",
            type: "input",
            message: "guess the number?"
        }
    ]);
    return prompt.userGuessedNumber;
};
export default { generateRandomNumbers, initPrompt, startGame };
