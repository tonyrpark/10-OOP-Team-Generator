// Classes
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// npm
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// Adding jest to this list to allow testing to properly occur
const jest = require("jest");
const express = require("express");
const path = require("path");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var pdf = require("html-pdf");
var options = {
  format: "Letter",
};

// Output
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const generateHTML = require("./lib/generateHTML");
const render = require("./lib/htmlRenderer");

// Express App Set-up
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up Express for urlencoding (example putting %20 in place of spaces, allowing browser to read) & outputting in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Employee Array Data
const employees = [];
const engineers = [];
const interns = [];
const managers = [];
let id = 0;
var response;

// User Prompt --- QUESTIONS
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Email: ",
        name: "email",
      },
      {
        type: "list",
        name: "role",
        message: "What is your position at the company?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (data) {
      switch (data.role) {
        case "Manager":
          inquirer.prompt([
              {
                  type: "input",
                  message: "Enter employee ID: ",
                  name: "id"
              },
              {
                  type: "input",
                  message: "Enter office number: ", 
                  name: "office"
              }
          ])
          .then(function(res)) {
              const officeNum = res.office; 
              console.log(officeNum);
              const manager = new Manager(
                  data.name,
                  res.id,
                  data.email,
                  officeNum,
                  "Manager"
              );
              console.log(manager); 
              employees.push(manager);

          }).then(function(){
              addNext()
          });
          break; 
          case "Engineer": 
          inquirer
          .prompt([
              {
                  type: "input",
                  message: "Enter employee ID: ",
                  name: "id"
              },
              {
                  type: "input",
                  message: "Enter GitHub Username: ",
                  name: "github"
              }
          ])
          .then(function(res){
              const githubName = res.github; 
              const engineer = new Engineer(
                  data.name,
                  res.id,
                  data.email,
                  githubName,
                  "Engineer"
              );
              employees.push(engineer);
          }).then(function(){
              addNext()
          }); 
          break;
          case "Intern"; 
          inquirer
          .prompt([
              {
                  type:"input",
                  message: "Enter employee ID: ", 
                  name: "id" 
              },
              {
                  type: "input",
                  message: "Enter school: ",
                  name: "school"
              }
          ])
          .then(function(res){
              const internSchool = res.school; 
              const intern = new Intern(
                  data.name,
                  res.id,
                  data.email,
                  internSchool,
                  "Intern"
              );
              employees.push(intern);
          }).then(function(){
              addNext()
          });
            break; 
      }
    })
    .then(function(){

    });
};

// Second part of Inquirer - adding additional employees

const addNext = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "add",
            message: "Would you like to add another Employee?",
            choices: ["Yes","No"]
        }
    ])
    .then(function(res){
        if(res.add === "Yes" {
            promptUser(); 
        } else {
            console.log("Your roster is complete!"); 
            completedRoster(employees); 
        }
    });
};

function completedRoster(employees){
    console.log("Success!");
    console.log(employees); 
    const html = generateHTML(employees); 
    console.log(html); 
    writeFileAsync("./output/employees.html", html, "utf-8"); 
}

function init(){
    console.log("Please enter employee info")
    promptUser(); 
}

init(); 

// require("./output/employees.html")(app); 

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
