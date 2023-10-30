#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const todos: string[] = [];

async function main() {
  while (true) {
    const answers: {
      action: string;
    } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["Add Task", "Remove Task", "Show Tasks", "Quit"],
      },
    ]);

    const { action } = answers;

    if (action === "Quit") {
      break;
    } else if (action === "Add Task") {
      const newTodo: {
        task: string;
      } = await inquirer.prompt([
        {
          type: "input",
          name: "task",
          message: "What do you want to add to your todo? ",
        },
      ]);

      const { task } = newTodo;

      if (task) {
        todos.push(task);
        console.log(chalk.green("Task added successfully!"));
      } else {
        console.log(chalk.red("Kindly add a valid input."));
      }
    } else if (action === "Remove Task") {
      if (todos.length === 0) {
        console.log(chalk.yellow("No tasks to remove."));
      } else {
        const removedTodo: {
          taskToRemove: string;
        } = await inquirer.prompt([
          {
            type: "list",
            name: "taskToRemove",
            message: "Select a task to remove:",
            choices: todos,
          },
        ]);

        const { taskToRemove } = removedTodo;

        const index = todos.indexOf(taskToRemove);

        if (index !== -1) {
          todos.splice(index, 1);
          console.log(chalk.green("Task removed successfully!"));
        }
      }
    } else if (action === "Show Tasks") {
      if (todos.length > 0) {
        console.log(chalk.blue("Your Todo List:"));
        todos.forEach((todo) => {
          console.log(todo);
        });
      } else {
        console.log(chalk.yellow("No todos found."));
      }
    }
  }

  console.log(chalk.blue("Goodbye!"));
}

main();
