#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  private static nextStudentId: number = 1001; // Starting student ID

  constructor(
    public name: string,
    public courses: string[] = [],
    public balance: number = 0
  ) {
    // Generate a unique student ID for each student
    this.studentId = Student.nextStudentId++;
  }

  studentId: number;

  enroll(course: string, tuition: number) {
    this.courses.push(course);
    this.balance += tuition;
    console.log(`${this.name} is enrolled in ${course}.`);
  }

  viewBalance() {
    console.log(`${this.name}'s balance: $${this.balance}`);
  }

  payTuition(amount: number) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`${this.name} paid $${amount} tuition.`);
    } else {
      console.log("Insufficient balance to pay tuition.");
    }
  }

  showStatus() {
    console.log(`Student ID: ${this.studentId}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
    this.viewBalance();
  }
}

const students: Student[] = [];

async function addStudent() {
  const answers: {
    name: string;
  } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter student name: ",
    },
  ]);

  const student = new Student(answers.name);
  students.push(student);
  console.log(`${answers.name} has been added with Student ID ${student.studentId}.`);
}

async function enrollStudent() {
  const studentIdAnswer: {
    studentId: number;
  } = await inquirer.prompt([
    {
      type: "number",
      name: "studentId",
      message: "Enter student ID: ",
    },
  ]);

  const student = students.find((s) => s.studentId === studentIdAnswer.studentId);

  if (student) {
    const courseAndTuition: {
      course: string;
      tuition: number;
    } = await inquirer.prompt([
      {
        type: "input",
        name: "course",
        message: "Enter course name: ",
      },
      {
        type: "number",
        name: "tuition",
        message: "Enter tuition amount: ",
      },
    ]);

    student.enroll(courseAndTuition.course, courseAndTuition.tuition);
  } else {
    console.log("Student not found.");
  }
}

async function main() {
  while (true) {
    const choiceAnswer: {
      choice: string;
    } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Balance",
          "Pay Tuition",
          "Show Status",
          "Quit",
        ],
      },
    ]);

    const choice = choiceAnswer.choice;

    if (choice === "Quit") {
      console.log("Goodbye!");
      break;
    } else if (choice === "Add Student") {
      await addStudent();
    } else if (choice === "Enroll Student") {
      await enrollStudent();
    } else if (choice === "View Balance") {
      const studentIdAnswer: {
        studentId: number;
      } = await inquirer.prompt([
        {
          type: "number",
          name: "studentId",
          message: "Enter student ID: ",
        },
      ]);

      const student = students.find((s) => s.studentId === studentIdAnswer.studentId);

      if (student) {
        student.viewBalance();
      } else {
        console.log("Student not found.");
      }
    } else if (choice === "Pay Tuition") {
      const studentIdAnswer: {
        studentId: number;
      } = await inquirer.prompt([
        {
          type: "number",
          name: "studentId",
          message: "Enter student ID: ",
        },
      ]);

      const student = students.find((s) => s.studentId === studentIdAnswer.studentId);

      if (student) {
        const tuitionAnswer: {
          tuition: number;
        } = await inquirer.prompt([
          {
            type: "number",
            name: "tuition",
            message: "Enter tuition amount: ",
          },
        ]);

        student.payTuition(tuitionAnswer.tuition);
      } else {
        console.log("Student not found.");
      }
    } else if (choice === "Show Status") {
      const studentIdAnswer: {
        studentId: number;
      } = await inquirer.prompt([
        {
          type: "number",
          name: "studentId",
          message: "Enter student ID: ",
        },
      ]);

      const student = students.find((s) => s.studentId === studentIdAnswer.studentId);

      if (student) {
        student.showStatus();
      } else {
        console.log("Student not found.");
      }
    }
  }
}

main();
