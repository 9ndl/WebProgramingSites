/*  Name: yasser alsaif
    Class: CSC 337
    Date: 4/12/2019
    HW10 Kevin bacon javascript
*/

"use strict"; 
(function() {

    window.onload = function() {
        //get the to search buttons
        let search1 = document.getElementById("search1");
        let search2 = document.getElementById("search2");
        search1.onclick = allmovies;
        search2.onclick = bacon;
    };
    /**
    //
    */
    function allmovies() {
        //get the name with and solve the case sensitivity
        let FirstName = document.getElementById("first1").value;
        FirstName = FirstName.charAt(0).toUpperCase() +
        FirstName.slice(1).toLowerCase();
        let LastName = document.getElementById("last1").value;
        LastName = LastName.charAt(0).toUpperCase() +
        LastName.slice(1).toLowerCase();
        document.getElementById("pic").innerHTML = "";
        let name = FirstName +" "+ LastName;
        //craete the url with the name and mode 
        //so we can access them from the server side
        let url = "http://localhost:3000?first_name=" + FirstName +
        "&last_name=" + LastName + "&mode=allmovies";
        //start get
        fetch(url)
        .then(checkStatus)
        .then(function (responseText) {
            //parse the responsetext
            let movies = JSON.parse(responseText);
            //check flag from the server to see if the actor exists
            if(movies != 1){
                //get the table and empty the its content and set the id
                let tablediv = document.getElementById("tablediv");
                tablediv.innerHTML = "";
                let table = document.createElement("table");
                table.id = "t1";
                //get text and header for and set it up for results
                let para = document.getElementById("text1");
                para.innerHTML = "All movies";
                let text = document.getElementById("text");
                text.innerHTML = "Result for " + name;
                //creat the mainrow then append it to the table
                let mainrow = document.createElement("tr");
                mainrow.innerHTML = "<th>#</th><th>Titile</th><th>Year</th>";
                table.appendChild(mainrow);
                //for loop to creat the row for each movie
                let i = 0;
                for(i = 0; i < movies.length; i++){
                    let row = document.createElement("tr");
                    let num = i + 1;
                    let title = movies[i].name;
                    let year = movies[i].year;
                    row.innerHTML = "<td>" + num + "</td><td>" + title + "</td><td>" +year + "</td>";
                    //append the the row to the table
                    table.appendChild(row);
                }
                //append the table to its designated div
                tablediv.appendChild(table);
            }else{
                //in case the actor doesnt exist
                let tablediv = document.getElementById("tablediv");
                tablediv.innerHTML = "";
                let text = document.getElementById("text");
                text.innerHTML = "";
                document.getElementById("text1").innerHTML = "There is no result for " + name;
            }
        });
    } 
    /**
    //
    */
    function bacon() {
        //get the name and solve its case sensitivity
        let FirstName = document.getElementById("first2").value;
        FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase();
        let LastName = document.getElementById("last2").value; 
        LastName = LastName.charAt(0).toUpperCase() + LastName.slice(1).toLowerCase();
        //remove bacon's picture
        document.getElementById("pic").innerHTML = "";
        let name = FirstName +" "+ LastName;
        //craete the url with the name and mode so we can access them from the server side
        let url = "http://localhost:3000?first_name=" + FirstName + "&last_name=" + LastName  + "&mode=bacon";

        fetch(url) 
        .then(checkStatus)
        .then(function (responseText) {
            //parse the responsetext
            let movies = JSON.parse(responseText);
            //conditon to check if the actor exists in the databas
            if(movies != 1){
                //condition if the actor doen't have any movies with kevin bacon
                if(movies.length != 0){
                    //get the tablediv and empty it
                    let tablediv = document.getElementById("tablediv");
                    tablediv.innerHTML = "";
                    //create the table and assign an id to it
                    let table = document.createElement("table");
                    table.id = "t1";
                    //get the text in the page for the results
                    let text = document.getElementById("text");
                    text.innerHTML = "Result for " + name;
                    let para = document.getElementById("text1");
                    para.innerHTML = "All movies for " + name +" with Kevin Bacon.";
                    //create the mainrow
                    let mainrow = document.createElement("tr");
                    mainrow.innerHTML = "<th>#</th><th>Titile</th><th>Year</th>";
                    //append the mainrow 
                    table.appendChild(mainrow);
                    //for loop to creat the row for each movie
                    for(let i = 0; i < movies.length; i++){
                        let row = document.createElement("tr");
                        let num = i + 1;
                        let title = movies[i].name;
                        let year = movies[i].year;
                        row.innerHTML = "<td>" + num + "</td><td>" + title + "</td><td>" +year + "</td>";
                        //append the the row to the table
                        table.appendChild(row);
                    }
                    //append the table to its designated div
                    tablediv.appendChild(table);
                }else{
                    //in case the actor doesn't have movies with kevin bacon
                    let tablediv = document.getElementById("tablediv");
                    tablediv.innerHTML = "";
                    let text = document.getElementById("text");
                    text.innerHTML = "Result for " + name;
                    document.getElementById("text1").innerHTML = "There is no mivies for " + name + " with Kevin Bacon.";
                }
            }else{
                //in case the actor doesnt exist
                let tablediv = document.getElementById("tablediv");
                tablediv.innerHTML = "";
                let text = document.getElementById("text");
                text.innerHTML = "";
                document.getElementById("text1").innerHTML = "There is no result for " + name;
            }
        });
    }
    /**
    //this function for the checkstatus
    */
    function checkStatus(response) {   
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        }else if(response.status == 404) {
            return Promise.reject(new Error("sorry we do not have any data"));
        }else {     
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
})();
   