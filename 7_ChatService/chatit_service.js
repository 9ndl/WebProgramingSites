//Name:Yasser Alsaof
//hw9: chatit
// server js
"use strict";
	// set up for the server
   	const express = require("express");
   	const app = express();
   	let fs = require('fs');
   	const bodyParser = require('body-parser');
   	const jsonParser = bodyParser.json();
   
	//set up for the post get fetching
    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", 
                  "Origin, X-Requested-With, Content-Type, Accept");
       next();
   	});
   
   	app.use(express.static('public'));
/**
//function for reading the file
*/
function readFile(fileName) { 
	let file = 0;
	try {  
    	file = fs.readFileSync(fileName, 'utf8');
    	console.log(file);    
	}
	catch(e) {
   		console.log('Error:', e.stack);
	}
	return file;
}
   
   console.log('web service started');
   // starting the POST to receive 
	app.post('/', jsonParser, function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		//request to chatit.js to get the inputs from the json 
       	let texter = req.body.Name;
		let text = req.body.Comment;
		//create the line to be added to the file
       	let line = texter + ":::" + text + "\n";
		// add the line to the file
       	fs.appendFile("messages.txt", line, function(err) {
           	if(err) {
               	console.log(err);
               	res.status(400);
           	}
           	console.log("The file was saved!");
           	res.send("Success!");
       	});
   	});
   	//starting the GET to red from the file then send it to chatit.js
   	app.get('/', function (req, res) {
  	res.header("Access-Control-Allow-Origin", "*");
	// read the file
   	let lines = readFile("messages.txt");
   	let textsinfo = json(lines);
	//send the textsinfo to the chatit.js
    res.send(JSON.stringify(textsinfo)); 
	});
/**
//function bulding the json
*/
function json(text) {
	//split each lien by itself
    text = text.split("\n");
    let alltexts = []; 
	let list = {};
	//for loop to go over all lines
    for(let i = 0; i < text.length; i++){
		//split to fit the format 
		let splitline =  text[i].split(":::");
		//assigning in json format to the text info 
    	let textinfo = {"name": splitline[0],
		"comment": splitline[1]
		};
		//push the element to the all texts array
    	alltexts.push(textinfo); 
	}	
	//assign the texts array to messages 
    list["messages"] = alltexts; 
	return list; 
}
//server port
app.listen(3000);