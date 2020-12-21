/*Name: Yasser Alsaif
	homework 3  the guessing game
			  javascript  file       */
			  

"use strict"; // to use strict mode

(function(num){ // starting function with global var num

	window.onload = function(){ // to activate event 
		let sbutton = document.getElementById("start"); // to get the buttens
		let gbutton = document.getElementById("guess");
		sbutton.onclick = startf; //activate functions when button is clicked
		gbutton.onclick = guessf;

	}
function startf(){ // function when the start button is clicked
	document.getElementById("result").innerHTML = ""; // emtying the previous guesses
	let min = parseInt(document.getElementById("mini").value); // to get the input of min and max boxes
	let max = parseInt(document.getElementById("maxi").value);

	let p = 1; //power to use to generate the integer num
	let ch = max/10;
	// since the math function generates decimal numbers we have to play with its power of 10
	while(ch > 1){
		p = p + 1;
		ch = ch/10;
	}
	num = Math.floor(Math.random()*Math.pow(10,p));
	while(num < min || num > max){ //statements to make sure the random number is in bounds
		num = Math.floor(Math.random()*Math.pow(10,p));
	}
	

}
function guessf(){ // function for the guess button
	let gnum = parseInt(document.getElementById("gnume").value); // get value from the guess box

	let paragraph = document.getElementById("result"); // to get previous elements of guesses at first is empty

	// the cases for each guess senario.
	if(gnum == num){ 
		document.getElementById("result").innerHTML = "you got it right! <br> " + paragraph.innerHTML;
	}
	else if(gnum < num){
		document.getElementById("result").innerHTML = "more than " + gnum + " <br> " + paragraph.innerHTML;
	}
	else if (gnum > num) {
		document.getElementById("result").innerHTML = "less than " + gnum + " <br> " + paragraph.innerHTML;
	}
	
}
})();