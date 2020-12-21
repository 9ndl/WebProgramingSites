//Name:Yasser Alsaof
//hw9: chatit
// chatit.js
"use strict"; 
(function() { 
    window.onload = function() {
        //get the send button
        let b = document.getElementById("SendB");
        //call function when button is clicked
        b.onclick = POSTfunction;
        //call the fetch function for GET to get elements to add into html
        fetchfunction();
        //call function evry 5 secs
        setInterval(fetchfunction, 5000); 
    };
     
    /**
    //function for fetching from the server
    */
    function fetchfunction(){
        
        //server link
        let url = "http://localhost:3000";
        //fetching from the server
        fetch(url)
        .then(checkStatus)
        .then(function (responseText) {
        let currenttime = new Date();
        //crrat the text block
        let texts = document.getElementById("texts");
        //empty the text block first;
        if(texts.innerHTML != ""){
            texts.innerHTML = "";
        }
        //get the text info from the parsed responsetext
        let textinfo = JSON.parse(responseText); 
        //
        for(let i = 0; i < textinfo.messages.length-1; i++) {
        //create the text element as a div
        let textbox = document.createElement("div");
        // make the div as flex so we show the texter name and and the text next to each other
        textbox.style.display = "flex"; 
        //create the texter name div and the text div 
        let texter = document.createElement("div"); 
        let thetext = document.createElement("div");
        let time = document.createElement("div");
        // have the texter name with textname class 
        texter.className = "TextName"; 
        // writong the innerhtml
        texter.innerHTML = textinfo.messages[i].name; 
        thetext.innerHTML = ": " + textinfo.messages[i].comment;
        time.innerHTML = "Delivered at " + currenttime.getHours() + ":" +
        currenttime.getMinutes();
        time.style.fontSize = "8px";
        time.style.bottom = "0px";
        time.style.padding = "2px";
        console.log(time);
        // appending the text info into the text box div
        textbox.appendChild(texter); 
        textbox.appendChild(thetext);
        textbox.appendChild(time);
        texts.appendChild(textbox);
        }
        })
        .catch(function (error) {
            console.log(error);
        });

    }
     /**
     //this function goes one when tha page is loading
     */
    function POSTfunction() {
        //get input values
        let texter = document.getElementById("Name").value;
        let text = document.getElementById("Message").value;
        //creating the info json
        let json = {};
        json.Name = texter;
        json.Comment = text;
        // fetch option to make it POST so we can send the the server
        const fetchOptions = {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            //stringfy the json
            body : JSON.stringify(json)    
        };
        //ling for the server
        let url = "http://localhost:3000";  
        fetch(url, fetchOptions)
        .then(checkStatus)
        .then(function(responseText) {
            //message after sending was successful
            document.getElementById("sendcomplete").innerHTML = "Sending was Successful!";
            console.log(responseText);
        })
        .catch(function(error) {
            document.getElementById("sendcomplete").innerHTML = "Failed to send!";
            console.log(error);
        });
        //empty the inputs boxes
        document.getElementById("Name").value = "";
        document.getElementById("Message").value = "";
    }
    /**
     //given function for checkstatus
    */
    function checkStatus(response) {   
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    }else if(response.status == 404) {    //404 error when there is no data
        return Promise.reject(new Error("sorry we do not have any data"));
    }else {     
        return Promise.reject(new Error(response.status+": "+response.statusText)); 
    } 
}  
}) ();