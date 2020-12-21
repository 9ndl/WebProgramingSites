//Name: Yasser Alsaif
//Class: CSC337
//hw7: gerrymendering homework

"use strict";
(function() {  
    
    window.onload = function() { 
        // create the search button
        let search = document.getElementById("search"); 
        search.onclick = Search; 
    };

    /**
    *the search function
    */
    function Search(){ 
        // clear the page divs we are using
        document.getElementById("statedata").innerHTML = "";
        document.getElementById("statename").innerHTML = "";
        document.getElementById("voters").innerHTML = "";
        document.getElementById("errors").innerHTML = "";
            
        // get the value of the text box
        let textbox = document.getElementById("box").value; 

        // link for the server
        let link1 = "http://localhost:3000?state=" + textbox + "&type=voters";
           fetch(link1)
            .then(checkStatus)
            .then(function(responseText) {
                // creat the header for the votes then add it to the voters div
                let votesnum = document.createElement("h4"); 
                votesnum.innerHTML = responseText + " eligible voters"; 
                document.getElementById("voters").appendChild(votesnum); 

            })
            .catch(function(error) {

                // to print the error in the error div
                let err = document.createElement("div");
                err.innerHTML = error;
                document.getElementById("errors").appendChild(err);
                
            });



        let link = "http://localhost:3000?state=" + textbox + "&type=districts";
        fetch(link)
            .then(checkStatus)
            .then(function(responseText) {
                //get the state info
                let stateinfo = JSON.parse(responseText); 
                
                // to print the name of the state and add it to a header
                let stateheader = document.createElement("h2"); 
                stateheader.innerHTML = stateinfo.state; 
                document.getElementById("statename").appendChild(stateheader);

                let Dwastedvotes = 0; 
                let Rwastedvotes = 0; 
                let i = 0;
                // while loop to go through districts in the state
                while (i < stateinfo.districts.length){
                     
                    let Dvotes = stateinfo.districts[i][0]; // get democratic votes
                    let Rvotes = stateinfo.districts[i][1]; // get republican votes
                    let districtvotes = Dvotes + Rvotes;

                    // create the district div that will have 2 div, 1 dive each party 
                    let District = document.createElement("div"); 
                    
                    // creat the democratic party div with the width and style
                    let democrat = document.createElement("div"); 
                    democrat.className = "dem";
                    let Dper = (Dvotes/(districtvotes)) * 100;
                    democrat.style.width = Dper + "%"; // width
                    democrat.style.display = "inline-block";  // make div side by side
                
                    // add democratic party div to the distric div
                    District.appendChild(democrat);  

                    // creat the republican party div with the width and style
                    let republican = document.createElement("div"); 
                    republican.className = "gop";
                    let Rper = 100 - Dper; 
                    republican.style.width = Rper + "%"; // width
                    republican.style.display = "inline-block";  // make div side by side
                       
                    // add republican party div to the distric div 
                    District.appendChild(republican); 
                    
                    // add the district div to statedata
                    document.getElementById("statedata").appendChild(District);

                    // get the number of votes needed to win
                    let votestowin = (Math.floor(districtvotes/2) + 1);

                    // calculate the wasted votes depending on the winning party 
                    if(Dvotes < Rvotes) {
                        Rwastedvotes = Math.abs((votestowin - Rvotes)) + Rwastedvotes;
                        Dwastedvotes = Dvotes + Dwastedvotes; 
                    }
                    else {
                        Dwastedvotes = Math.abs((votestowin - Dvotes)) + Dwastedvotes; 
                        Rwastedvotes = Rvotes + Rwastedvotes; 
                    }
                    i++;
                }
                
                // calculate the percentage we need to determine 
                let totalwastedvotes = Dwastedvotes + Rwastedvotes;
                let percent = Math.abs(Dwastedvotes - Rwastedvotes)/totalwastedvotes; 
                
                // create the header for gerrymandering to add to the state div
                let mandered = document.createElement("h3");

                // if statement to decide weather gerrymandered
                if (percent < 0.07) {
                    // not gerrymandered
                    mandered.innerHTML = "Not Gerrymandered";
                    document.getElementById("statename").appendChild(mandered);
                }
                else {
                    // if gerrymandered, get the party whome is favored then append to statename div
                    let favored; 
                    if(Rwastedvotes > Dwastedvotes) {  
                        favored = "Democratic";
                    }
                    else {
                        favored = "Republican";
                    }
                    mandered.innerHTML = "Gerrymandered to favor the " + favored + " Party"; 
                    document.getElementById("statename").appendChild(mandered); 
                }
                
            })
            .catch(function(error) {
                
                let err = document.createElement("div");
                err.innerHTML = error;
                document.getElementById("errors").appendChild(err);
                
            });
           
    }
    
    /**
    *function for errors
    */
    function checkStatus(response) { 
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        // special reject message for page not found
        }else if(response.status == 404) {
            return Promise.reject(new Error("sorry we do not have any data"));
        }else if(response.status == 410){ 
            // for error 410
            let name = document.getElementById("box").value;
            return Promise.reject(new Error(response.status + ": " + response.statusText + 
            " and there was no data found for " + name));
        }
         else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
}) ();
