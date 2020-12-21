/*CSC 337 Final Project 
Name: Crave
Authors: Yasser Alsaif and Matthew Heger
Descripton: The page will display all upcoming raves and you can search for upcoming raves by location or name.  */


"use strict";   
const express = require("express");
const app = express();
var mysql = require('mysql');
let fs = require('fs');
let Response = "";
let files = fs.readdirSync(__dirname + '/Raves'); 
let RavesList = {}; //List containing all the books

//let http = require('http'); 
//let server = http.Server(app); 

app.use(express.static('public'));

function readFile(fileName) { //Read from text file function 
	let file = 0;
	try {  
	    file = fs.readFileSync(fileName, 'utf8');
	    console.log(file);    
	} catch(e) {
	    console.log('Error:', e.stack);
	}
	return file;
}
console.log("opened"); 
app.get('/', function (req, res) { //Start of the server 
    console.log("Service Connected"); 
    
    res.header("Access-Control-Allow-Origin", "*");

    let mode = req.query.mode;   //mode of request 

    console.log("query error"); 

    if (mode == "all"){
    let RavesArray = [];  //Array containing all the Raves
    let words;  
    let name; 

    for	(let j = 0; j < files.length; j++){  //traverse through all books 
        words = files[j].split("_");
        name = ""; 
        for (let m = 0; m < words.length; m++){
        if (m == words.length - 1) {
            name = name + words[m]; 
        }
        else {
            name = name + words[m] + " "; 
        }
        }
        
        let fileName = "Raves/" + files[j] + "/date.txt";
        let EntireFile = readFile(fileName); 

        let lines = EntireFile.split("\n");  
        let raveinfo = {}; 
        
        raveinfo["name"] = name;  //add json title 
        raveinfo["folder"] = files[j]; //add fodler to json 
        raveinfo["date"] = lines[0]; //add date to json 
        raveinfo["location"] = lines[1]; //add location to json

        RavesArray.push(raveinfo); //add to the Raves Array
    } 

    RavesList["Raves"] = RavesArray; //Add Raves array to Rave list

    console.log(JSON.stringify(RavesList)); 
    res.send(JSON.stringify(RavesList)); //send Raves list as a string 
}
    if(mode == "single") {
    let folder = req.query.name;   //mode of request 
    let RavesList = {}; //List containing all the books
    let name = ""; 

    let words = folder.split("_");
    for (let m = 0; m < words.length; m++){
    if (m == words.length - 1) {
        name = name + words[m]; 
    }
    else {
        name = name + words[m] + " "; 
    }
    }

    let fileName = "Raves/" + folder + "/date.txt";

    let EntireFile = readFile(fileName); 
    let lines = EntireFile.split("\n");  
    let raveinfo = {}; 
    raveinfo["name"] = name;  //add json title 
    raveinfo["date"] = lines[0]; //add date to json 
    raveinfo["location"] = lines[1]; //add location to json
    res.send(JSON.stringify(raveinfo));
    }

    if (mode == "location") { //When searching for a rave by location 
    let state = req.query.name; 
    let statename = ""; 
    let matches = []; 

    let words = state.split("_"); //Split the name of folder on underscore 
    for (let m = 0; m < words.length; m++){
    if (m == words.length - 1) { //if it is last word don't add extra space at end 
        statename = statename + words[m]; 
    }
    else {
        statename = statename + words[m] + " "; 
    }
    }
    console.log(statename); 

    for(let i = 0; i < RavesList["Raves"].length; i++) { //loop through all raves 
       if (RavesList["Raves"][i].location.includes(statename)) {
            matches.push(RavesList["Raves"][i]);  //add raves that match statename to array
       }
    }

    res.send(JSON.stringify(matches)); //send response 
    }

    if (mode == "rave") { //when searching by rave 
        console.log("inside"); 
    let state = req.query.name; 
    let statename = ""; 
    let matches = []; 
    let words = state.split("_");

    for (let m = 0; m < words.length; m++){
    if (m == words.length - 1) {
        statename = statename + words[m]; 
    }
    else {
        statename = statename + words[m] + " "; 
    }
    }
    console.log(statename); 

    for(let i = 0; i < RavesList["Raves"].length; i++) {
       if (RavesList["Raves"][i].name.includes(statename)) {
            matches.push(RavesList["Raves"][i]); 
       }
    }
    res.send(JSON.stringify(matches)); //send rave name matches 
    }


    
    });


app.listen(3000); //Specify the port number 