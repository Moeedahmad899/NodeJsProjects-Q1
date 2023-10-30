#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
console.log(chalk.blue('Welcome to simple calculator'));
inquirer
    .prompt([
    {
        type: "number",
        name: "num1",
        message: "enter your first number: "
    },
    {
        type: "number",
        name: "num2",
        message: "enter your second number: "
    },
    {
        type: "list",
        name: "operation",
        message: "Select Operation",
        choices: ["+", "-", "/", "*", "%"]
    }
])
    .then((answers) => {
    if (answers.operation === "+") {
        const result = answers.num1 + answers.num2;
        console.log("Sum ", result);
    }
    else if (answers.operation === "-") {
        const result = answers.num1 - answers.num2;
        console.log("Subtraction ", result);
    }
    else if (answers.operation === "/") {
        const result = answers.num1 / answers.num2;
        console.log("Division ", result);
    }
    else if (answers.operation === "*") {
        const result = answers.num1 * answers.num2;
        console.log("Multiplication ", result);
    }
    else if (answers.operation === "%") { // Handle modulus operation
        const result = answers.num1 % answers.num2;
        console.log("Modulus ", result);
    }
})
    .catch((error) => {
    if (error.isTtyError) {
        console.log(error);
    }
});
