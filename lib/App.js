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
                message: "Please enter your role",
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
                        console.log('Please enter your name.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s employee ID?`,
                name: "id",
                when: ({role}) => role != "Exit",
                validate: id => {
                    if (id) {
                        return true;
                    } else {
                        console.log('Please enter your employee ID.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) =>  `What is the ${role}'s email address?`,
                name: "email",
                when: (data) => data.role != "Exit",
                validate: email => {
                    if (email) {
                        return true;
                    } else {
                        console.log('Please enter your email address.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s office number?`,
                name: "officeN",
                when: ({role}) => role === "Manager",
                validate: function (value) {
                    return value.match(/^\d+$/) ? true : "Invalid office number";
                }

            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s github username?`,
                name: "github",
                when: ({role}) => role === "Engineer",
                validate: github => {
                    if (github) {
                        return true;
                    } else {
                        console.log('Please enter your github username.');
                        return false;
                    }
                }

            },
            {
                type: "input",
                message:  ({role}) => `Which school does the ${role} attend?`,
                name: "school",
                when: ({role}) => role === "Intern",
                validate: school => {
                    if (school) {
                        return true;
                    } else {
                        console.log('Please enter name of school.');
                        return false;
                    }
                }
            }
        ];
    }
    start() {
        this.nextEmployee();
    }

    nextEmployee() {
        inquirer.prompt(this.employeePrompt).then(data => {
            switch (data.role) {
                case "Exit":
                    this.renderHTML();
                    console.log("Team Profile Generated");
                    break;
                case "Manager":
                    this.employees.push(new Manager(data.name, data.id, data.email, data.officeN));
                    this.nextEmployee();
                    break;
                case "Engineer":
                    this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
                    this.nextEmployee();
                    break;
                case "Intern":
                    this.employees.push(new Intern(data.name, data.id, data.email, data.school));
                    this.nextEmployee();
                    break;
            }
        });
    }
    renderHTML() {
        fs.readFile('HTML-template/main.html', 'utf8', (err, htmlString) => {

            htmlString = htmlString.split("<script></script>").join(this.getScript());

            fs.writeFile('dist/final.html', htmlString, (err) => {
                if (err) throw err;
                console.log('HTML file generated!');
            });
        });

    }

    getScript() {

        var scripts = ``;
        this.employees.forEach(e => {
            var field = "";
            var iconClass = "";
            switch (e.getRole()) {
                case "Manager":
                    field = `Office #: ${e.getOfficeNumber()}`;
                    iconClass = `users`;
                    break;
                case "Engineer":
                    field = `Github: ${e.getGithub()}`;
                    iconClass = `cogs`;
                    break;
                case "Intern":
                    field = `School: ${e.getSchool()}`;
                    iconClass = `user-graduate`;
                    break;
            }

            var cardScript = `
            <script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${e.getName()}");
            var header2 = $('<div class="card-header text-center">');
            var icon = $('<i class="fas fa-${iconClass}">');
            header2.text(" ${e.getRole()}");
            header2.prepend(icon);

            var cardBody = $('<div class="card-body text-info bg-primary">');
            var cardTitle = $('<h5 class="card-title text-white">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${e.getId()}");
            var cardText2 = $('<p class="card-text">');
            cardText2.text("Email: ${e.getEmail()}");
            var cardText3 = $('<p class="card-text">');
            cardText3.text("${field}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText3);
    
            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);    
            </script>        
            `;
            scripts += cardScript;

        });
        return scripts;
    }

}


module.exports = App;
