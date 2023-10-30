#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    constructor(name, courses = [], balance = 0) {
        this.name = name;
        this.courses = courses;
        this.balance = balance;
        // Generate a unique student ID for each student
        this.studentId = Student.nextStudentId++;
    }
    enroll(course, tuition) {
        this.courses.push(course);
        this.balance += tuition;
        console.log(`${this.name} is enrolled in ${course}.`);
    }
    viewBalance() {
        console.log(`${this.name}'s balance: $${this.balance}`);
    }
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`${this.name} paid $${amount} tuition.`);
        }
        else {
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
Student.nextStudentId = 1001; // Starting student ID
const students = [];
async function addStudent() {
    const answers = await inquirer.prompt([
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
    const studentIdAnswer = await inquirer.prompt([
        {
            type: "number",
            name: "studentId",
            message: "Enter student ID: ",
        },
    ]);
    const student = students.find((s) => s.studentId === studentIdAnswer.studentId);
    if (student) {
        const courseAndTuition = await inquirer.prompt([
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
    }
    else {
        console.log("Student not found.");
    }
}
async function main() {
    while (true) {
        const choiceAnswer = await inquirer.prompt([
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
        }
        else if (choice === "Add Student") {
            await addStudent();
        }
        else if (choice === "Enroll Student") {
            await enrollStudent();
        }
        else if (choice === "View Balance") {
            const studentIdAnswer = await inquirer.prompt([
                {
                    type: "number",
                    name: "studentId",
                    message: "Enter student ID: ",
                },
            ]);
            const student = students.find((s) => s.studentId === studentIdAnswer.studentId);
            if (student) {
                student.viewBalance();
            }
            else {
                console.log("Student not found.");
            }
        }
        else if (choice === "Pay Tuition") {
            const studentIdAnswer = await inquirer.prompt([
                {
                    type: "number",
                    name: "studentId",
                    message: "Enter student ID: ",
                },
            ]);
            const student = students.find((s) => s.studentId === studentIdAnswer.studentId);
            if (student) {
                const tuitionAnswer = await inquirer.prompt([
                    {
                        type: "number",
                        name: "tuition",
                        message: "Enter tuition amount: ",
                    },
                ]);
                student.payTuition(tuitionAnswer.tuition);
            }
            else {
                console.log("Student not found.");
            }
        }
        else if (choice === "Show Status") {
            const studentIdAnswer = await inquirer.prompt([
                {
                    type: "number",
                    name: "studentId",
                    message: "Enter student ID: ",
                },
            ]);
            const student = students.find((s) => s.studentId === studentIdAnswer.studentId);
            if (student) {
                student.showStatus();
            }
            else {
                console.log("Student not found.");
            }
        }
    }
}
main();
