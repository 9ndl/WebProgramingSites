/* Name: Yasser Alsaif
   Hw8 bestreads .js service file*/
"use strict";
const express = require("express");
const app = express();
let fs = require('fs');
app.use(express.static('public'));

console.log('web service started');
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	

	//initalizing parameters
	let book = req.query.title;
	let mode = req.query.mode;
	let fileString;
	let line; 
	let Fname = "";

	//if statements depending on the request 
	if(mode == "description") {
		//path for file
		Fname = "books/" + book + "/" + mode + ".txt";
		//function read file
		fileString = read_file(Fname); 
		//send response
		res.send(fileString); 
	}
	else if(mode == "info") {
		//path
		Fname = "books/" + book + "/" + mode + ".txt";
		// read file
		fileString = read_file(Fname); 
		//function 
		fileString = fileString.split("\n");
		//assignning the values
		let bookinfo = {
			"title": fileString[0],
			"author": fileString[1],
			"stars": fileString[2]
		}; 
		//send response
		res.send(JSON.stringify(bookinfo)); 
	} 
	else if(mode == "books") {
		let list = []; 
		let books = {}; 
		let Fnames = [];
		let i = 0;
		//get names of all files in dir starting with index 1  
		Fnames = fs.readdirSync(__dirname+"/books");
		// loop to go over all files
		for(let j = 1; j < Fnames.length; j++){
			// files paths
			Fname = "books/" + Fnames[j] + "/info.txt";
			//read file
			fileString = read_file(Fname); 
			//split the string into arrays
			line = fileString.split("\n");
			//get title 
			line = line[0];
			//assign values of the book
			let book = {
				"title": line,
				"folder":  Fnames[j]
			}; 
			//addbook to the list
			list[i]=book;
			i++;
		} 
		books["books"] = list; 
		res.send(JSON.stringify(books)); 
	}
	else if(mode == "reviews") {
		//path
		let fnames = fs.readdirSync('./books/' + book);
		let allreviews = {}; 
		let listreview = [];
		//for loop to get reviews after 3 files in path. 
		//there is alwasy 3 files before we get to the reviews
		for(let j = 0; j < fnames.length - 3; j++){
			//path
			Fname = "books/" + book + "/" + fnames[j + 3]; 
			fileString = read_file(Fname); 
			//creat reviews
			line = creatreview(fileString); 
			listreview[j] = line; 
		}
		allreviews["reviews"] = listreview; 
		//send response
		res.send(JSON.stringify(allreviews)); 
	}
});
// used the same function for read file given in class example
function read_file(file_name) {
	let file = 0;
	try {  
	    file = fs.readFileSync(file_name, 'utf8');
	    console.log(file);    
	} catch(e) {
	    console.log('Error:', e.stack);
	}
	return file;
}

//function to creat reviews
function creatreview(reviewline) {
	reviewline = reviewline.split("\n");
	//assign values
	let reviewinfo = {
		"name": reviewline[0],
		"stars":reviewline[1],
		"review":reviewline[2]
	};
	return reviewinfo; 
}   

app.listen(3000);




