const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const fs = require('fs');

class App {

    constructor() {

        this.employees = [];
        this.employeePrompt = [
            {
                type: "list",
                message: "Enter your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Exit"],
            },
            {
                type: "input",
                message: ({role}) => `Creating a new ${role}?. What is the ${role}'s name?`,
                name: "name",
                when: ({role}) => role != "Exit",
                validate: name => {
                    if (name) {
                        return true;
                    } else {
                        console.log('Please enter a name.');
                        return false;
                    }
                }
            },