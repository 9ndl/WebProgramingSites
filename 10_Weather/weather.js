// Allison Obourn
// CSC 337, Spring 2019
// Lecture 14

// requests weather data from the server and puts the city on the page as 
// a header and the temperatures for the city on the page as a list
window.onload = function() {
	var url = "http://localhost:3000";
	fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
			let json = JSON.parse(responseText);
			let city = json["city"]; // same as json.city
			document.getElementById("header").innerHTML = city;

			let ul = document.getElementById("days");
			let temps = json["weather"];
			for(let i = 0; i < temps.length; i++) {
				let temp = temps[i]["temperature"];
				let li = document.createElement("li");
				li.innerHTML = temp;
				ul.appendChild(li);
			}
			
		})
		.catch(function(error) {
			console.log(error);
		});
}


// returns the response text if the status is in the 200s
// otherwise rejects the promise with a message including the status
function checkStatus(response) { 
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    // special reject message for page not found
    } else if(response.status == 404) {
    	return Promise.reject(new Error("sorry we do not have any data"));
    } else {  
        return Promise.reject(new Error(response.status+": "+response.statusText)); 
    } 
}