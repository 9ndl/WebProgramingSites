/*  CSC 337 Final Project 
    Name: Crave
    Authors: Yasser Alsaif and Matthew Heger
    Descripton: The page will display all upcoming raves and you can search for upcoming raves by location or name.   */

 

                /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
   (function () {
    'use strict';
    
    window.onload = function () {
    console.log("start"); 
    let header = document.getElementById("banner"); //get banner
    let button = document.getElementById("search"); //get search button

    header.onclick = Clear;  //Set click events for header 
    header.onmouseover = MouseOver; 
    header.onmouseout = MouseOut; 

    button.onclick = Search; //Set click events for button
    button.onmouseover = MouseOver; 
    button.onmouseout = MouseOut; 
    Fetch(); 
   };

/**
* Function
*/
   function Clear() { //Clear contents of page 
    let singlediv = document.getElementById("singlediv"); 
    let searchbox = document.getElementById("searchinput"); 

    searchbox.style.backgroundColor = "white"; 
    document.getElementById("info").innerHTML = ""; 
    document.getElementById("lineup").innerHTML = "";
    document.getElementById("ravebox").innerHTML = ""; 
    Fetch(); 
   }

/**
* Function
*/
   function Search() { //Function to search rave by location and name
    let searchbox = document.getElementById("searchinput"); 
    let radio = document.getElementsByName("search"); 

    let regex = new RegExp("[^A-Z^a-z^ ]+"); //Check if input contains any bad characters 
    let match = searchbox.value.match(regex); //find bad characters in searchbox

    if (match) { //If there is a bad character 
        console.log("Not a Valid Input"); 
        searchbox.style.backgroundColor = "red"; 
        window.alert("Your input is not valid!"); //send window alert
    }
    else { // If input is valid 
        console.log("Valid:)"); 
        document.getElementById("info").innerHTML = ""; 
         document.getElementById("lineup").innerHTML = ""; 
        searchbox.style.backgroundColor = "green"; //change textbox green 
        let words = searchbox.value.split(" "); 
        let state = ""; 
        
        
        for(let m = 0; m < words.length; m++) {  //Replace with underscores to put in url
            if (m == words.length - 1) {
                if (radio[0].checked) {
                    //Make Search case insensitive 
                words[m] = words[m].charAt(0).toUpperCase() + words[m].slice(1).toLowerCase(); 
                }
                state = state + words[m]; 
            }
            else {
                if (radio[0].checked) {
                words[m] = words[m].charAt(0).toUpperCase() + words[m].slice(1).toLowerCase();
                }
                state = state + words[m] + "_"; 
            }
        }

        if(radio[0].checked) { //If the location button is checked 

            let url = "http://localhost:3000?mode=location&name=" + state;
            fetch(url) //Start fetching description for description mode 
            .then(checkStatus)
            .then(function (responseText) {
            let raves = JSON.parse(responseText); 
            let RaveBox = document.getElementById("ravebox"); 
            RaveBox.innerHTML = ""; //Clear contents of the featured raves 
            if (raves.length < 1) { //If search returns no results 
                RaveBox.innerHTML = "There are no raves matching your search"; 
            }
            else { //If search is successful 
            for (let i = 0; i < raves.length; i++) { // loop through all results 
                let ravediv = document.createElement("div");
                ravediv.id = raves[i].folder; 
                ravediv.onmouseover = MouseOver; //set mouse events for all results 
                ravediv.onclick = Click;
                ravediv.onmouseout = MouseOut;
                let namediv = document.createElement("div"); 
                let image = document.createElement("IMG");
                image.src = "Raves/" + raves[i].folder + "/pic.jpg";
                image.className = "mainimage"; 
                namediv.className = "name"; 
                ravediv.className = "ravediv"; 

                let name = raves[i].name; 
                namediv.innerHTML = name; 

                ravediv.appendChild(namediv); // append content to page 
                ravediv.appendChild(image);
                RaveBox.appendChild(ravediv);
            }
        }
        
            })
            .catch(function (error) { //catch errors 
            console.log(error); 
            });
        
        
            }
        if(radio[1].checked) {

            let url = "http://localhost:3000?mode=rave&name=" + state;
            fetch(url) //Start fetching for searching by name 
            .then(checkStatus)
            .then(function (responseText) {
            let raves = JSON.parse(responseText); 
            let RaveBox = document.getElementById("ravebox"); 
            RaveBox.innerHTML = "";
            if(raves.length < 1) { //If there are no matches 
                RaveBox.innerHTML = "There are no raves matching your search"; 
            }
            else { //If there are matches 
            for (let i = 0; i < raves.length; i++) {
                let ravediv = document.createElement("div"); 
                ravediv.id = raves[i].folder; 
                ravediv.onmouseover = MouseOver; //Set mouse events for matches 
                ravediv.onclick = Click;
                ravediv.onmouseout = MouseOut;
                let namediv = document.createElement("div"); 
                let image = document.createElement("IMG");
                image.src = "Raves/" + raves[i].folder + "/pic.jpg";
                image.className = "mainimage"; 
                namediv.className = "name"; 
                ravediv.className = "ravediv"; 

                let name = raves[i].name; 
                namediv.innerHTML = name; 

                ravediv.appendChild(namediv); //append information to div
                ravediv.appendChild(image);
                RaveBox.appendChild(ravediv);
            }
        }
        
            })
            .catch(function (error) {
            console.log(error); 
            });
        }
        }
   }

/**
* Function
*/
   function Fetch() { //Fetch all of the raves in the database 
    let url = "http://localhost:3000?mode=all&name=empty";
    fetch(url) //Start fetching 
    .then(checkStatus)
    .then(function (responseText) {
    let raves = JSON.parse(responseText); 
    console.log(raves);
    let RaveBox = document.getElementById("ravebox"); 
    
    for (let i = 0; i < raves["Raves"].length; i++) { //loop through all raves 
        let ravediv = document.createElement("div");
        ravediv.id = raves["Raves"][i].folder;
        ravediv.onmouseover = MouseOver; //set mouse events for all raves 
        ravediv.onclick = Click;
        ravediv.onmouseout = MouseOut;
        let namediv = document.createElement("div"); 
        let image = document.createElement("IMG");
        image.src = "Raves/" + raves["Raves"][i].folder + "/pic.jpg";
        image.className = "mainimage";  //set classes for all of them 
        namediv.className = "name"; 
        ravediv.className = "ravediv"; 

        let name = raves["Raves"][i].name;
        namediv.innerHTML = name; 

        ravediv.appendChild(namediv); //Add all of the raves to the divs on page
        ravediv.appendChild(image);
        RaveBox.appendChild(ravediv);
    }

    })
    .catch(function (error) { //catch errors 
    console.log(error); 
    });
   }

/**
* Function
*/
   function Click(){ //When an individual rave is clicked on 
    window.scrollTo({ top: 400, behavior: 'smooth' });
    let folder = this.id;
    console.log(this.id); 
    let url = "http://localhost:3000?mode=single&name=" + folder;
    fetch(url) //Fetch information for clicked on rave 
    .then(checkStatus)
    .then(function (responseText) {
    console.log(responseText); 
    let rave = JSON.parse(responseText); //Create all elements for single rave page
    let singlediv = document.getElementById("singlediv"); 
    document.getElementById("ravebox").innerHTML = ""; 
    let name = document.createElement("div"); 
    let date = document.createElement("div"); 
    let location = document.createElement("div"); 
    let description = document.createElement("div"); 
    let cover = document.createElement("IMG");
    let coverdiv = document.createElement("div"); 
    let lineupimage = document.createElement("IMG"); 
    let lineup = document.getElementById("lineup"); 
    let info = document.getElementById("info"); 
    
    cover.id = "coverimage";  //Add ids 
    lineupimage.id = "lineupimage"; 
    coverdiv.id = "cover"; 
    description.id = "description"; 
    
    name.innerHTML = "<strong>Name: </strong>" + rave.name; //modify html text
    date.innerHTML = "<strong>Date: </strong>" + rave.date; 
    location.innerHTML = "<strong>Location: </strong>" + rave.location; 

    cover.src = "Raves/" + folder + "/pic.jpg";
    lineupimage.src =  "Raves/" + folder + "/lineup.jpg";

    name.className = "titleinfo";  //set classes 
    date.className = "titleinfo"; 
    location.className = "titleinfo"; 
    
    coverdiv.appendChild(cover);  //add all elements to singlediv page 
    description.appendChild(name); 
    description.appendChild(date); 
    description.appendChild(location); 

    info.appendChild(coverdiv); 
    info.appendChild(description); 
    
    lineup.appendChild(lineupimage); 
    
    singlediv.appendChild(info); 
    singlediv.appendChild(lineup); 
    
    })
    .catch(function (error) { //catch errors 
    console.log(error); 
    });
   }

/**
* Function
*/
   function MouseOut(){ //Mouse Out events 
    this.style.color = "black"; //Change CSS styles to default 
    this.style.borderColor = "white";
    this.style.cursor = "default";
    let R = document.getElementById("r"); 
    let A = document.getElementById("a"); 
    let V = document.getElementById("v"); 
    let E = document.getElementById("e"); 

    if (this.id == "banner") { //set "rave" in header back to white 
        R.style.color = "white"; 
        R.style.fontWeight = ""; 

        A.style.color = "white"; 
        A.style.fontWeight = ""; 

        V.style.color = "white"; 
        V.style.fontWeight = ""; 

        E.style.color = "white"; 
        E.style.fontWeight = ""; 
    }
   }

/**
* Function
*/
   function MouseOver(){ //On mouse out event 
    let R = document.getElementById("r"); 
    let A = document.getElementById("a"); 
    let V = document.getElementById("v"); 
    let E = document.getElementById("e"); 

    this.style.backgorundColor= "black"; //Change CSS styles of current object 
    this.style.borderColor = "black"; 
    this.style.color = "white"; 
    this.style.cursor = "pointer";

    if (this.id == "banner") { //Set "rave" in header to rainbow colored 
        R.style.color = "red"; 
        R.style.fontWeight = "bold"; 

        A.style.color = "orange"; 
        A.style.fontWeight = "bold"; 

        V.style.color = "yellow"; 
        V.style.fontWeight = "bold"; 

        E.style.color = "green"; 
        E.style.fontWeight = "bold"; 
    }
   }

/**
* Function
* @param {int} response response
* @returns {int} return
*/
   function checkStatus(response) {    //Checks for errors on the page 
    if (response.status >= 200 && response.status < 300) {
        return response.text();
    } else if (response.status == 404) {    //404 error when there is no data
        return Promise.reject(new Error("sorry we do not have any data"));
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
}

})();
   