/*  Name: Yasser Alsaif
    Class: CSC 337 
    Date: 4/12/2019
    HW10 Kevin bacon NODE.js
*/

const express = require("express");
const app = express();
var mysql = require('mysql');

app.use(express.static('public'));


//setup for the connection
var con = mysql.createConnection({
    host: "mysql.allisonobourn.com",
    database: "csc337imdb",
    user: "csc337homer",
    password: "d0ughnut",
    debug: "true"
});
console.log("connected");


//start the get
app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //request the mode and the name
    let mode = req.query.mode;
    let firstname = req.query.first_name;
    let lastname = req.query.last_name;
    //id works as a flag
    let id = 0;
    console.log("Connected!"); 
        //create the query to select from the actors table to get all ctors mathcing the last name
    con.query("SELECT * from actors WHERE last_name = '" + lastname + "'",
        function (err, result, fields) {
        if(err) throw err;
        let count = 0;
        //for loop to travers through all matching results with the given last name
        for(let i = 0; i < result.length; i++) {
            //include function to see if the result first name is in the first name of the actor
            //substring function to check if the first name of the result is matching the the given first name
            if(result[i].first_name.substring(0, firstname.length).includes(firstname)) {
                //check if the the film count is higher than the set minimum films count
                if(result[i].film_count > count) {
                    //if the films count higher than coount, set the id to the actor's id
                    id = result[i].id;
                    //then reset the minimum film count 
                    count = result[i].film_count;
                }
                if(result[i].film_count == count) {
                    //if the result film count = minimum films count, get the lower id
                    if(result[i].id < id) {
                        id = result[i].id;
                    }
                }
            }
        }
        //first mode is for all movies search
        if(mode == "allmovies") {
            //if id still zero, the actor doesnt exist
            if(id == 0){
                //send flag
                res.send(JSON.stringify("1"));
            }else{
                //otherwise, start query setup 
                con.query("SELECT name, year " +
                "From actors A " +
                "JOIN roles B ON B.actor_id = A.id " +
                "JOIN movies C ON C.id = B.movie_id " +
                "WHERE A.id = " + id + " ORDER BY year DESC",
                    function (err, result, fields) {
                    if (err) throw err;
                    //send the result
                    res.send(JSON.stringify(result));
                });       
            }
        }
        //mode for bacon search
        if(mode == "bacon") {
            //if flag still zero, the actor doesnt exist
            if(id == 0){
                //send flag 
                res.send(JSON.stringify("1"));
            }else{
                //otherwise, start query
                con.query("SELECT A.name, A.year "+
                "From actors B " + 
                "JOIN actors C ON C.id = " + id + 
                " JOIN roles D ON B.id = D.actor_id " +
                "JOIN roles E ON C.id = E.actor_id " + 
                "JOIN movies A ON D.movie_id = A.id " +
                "JOIN movies F ON E.movie_id = F.id " +
                "WHERE B.id = 22591 AND D.movie_id = E.movie_id ORDER BY year DESC",
                    function (err, result, fields) {
                        if (err) throw err;
                        res.send(JSON.stringify(result));
                });
            } 
        }
    });
});
app.listen(3000); //port 

