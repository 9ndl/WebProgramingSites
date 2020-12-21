/* Name: Yasser Alsaif
   Hw8 bestreads .js file*/
   "use strict"; 
   (function() { 
   
        window.onload = function() {
        //start function to get every book
        Start(); 
        //home when clicked
        let back = document.getElementById("back");      
        back.onclick = Home;
        back.onmouseover = Mouseover;
        };
        
        /**
        //this function for the statuschek
        */
        function checkStatus(response) {    //Checks for errors on the page 
            if (response.status >= 200 && response.status < 300) {  
                return response.text();
            }else if(response.status == 404) {    //404 error when there is no data
                return Promise.reject(new Error("sorry we do not have any data"));
            }else {     
                return Promise.reject(new Error(response.status+": "+response.statusText)); 
            } 
        }
        /**
        //this function goes one when tha page is loading
        */
        function Start() {
            //url to get books info from the server
            let url = "http://localhost:3000?mode=books&title";  

            fetch(url)
            .then(checkStatus)
            .then(function(responseText) {
                // get books area
                let Booksdiv = document.getElementById("allbooks"); 
                //parse the json 
                let json = JSON.parse(responseText); 
                let i = 0;
                while(i < json.books.length){
                    //creat the book div
                    let book = document.createElement("div");
                    // creat the click functionality on a book
                    book.onclick = bookclick;
                    book.onmouseover = Mouseover;
                    // creat the img element and id
                    let picture = document.createElement("img"); 
                    //pic source
                    picture.src = "books/" + json.books[i].folder + "/cover.jpg"; 
                    //creat the paragraph for the title
                    let BookTitle = document.createElement("p"); 
                    //add the title to the page
                    BookTitle.innerHTML = json.books[i].title; 
                    //id for books
                        book.id = json.books[i].folder; 
                    //ids for titles
                        BookTitle.id = "title" + json.books[i].folder; 
                    // ids for pictures
                        picture.id = "image" + json.books[i].folder;  
                    //add elements to the book div
                    book.appendChild(picture);
                    book.appendChild(BookTitle); 
                    //add the book to the books area
                    Booksdiv.appendChild(book);
                    ++i;
                }
            });
            //.catch(function(error) {

            //} );
        }
        /**
        // function when a book is clicked
        */
        function bookclick() {
            //get ids first so we can call elements
            let name = this.id;
            //assign title to book
            let title = document.getElementById("title");
            let booktitle = document.getElementById("title" + name);
            title.innerHTML = booktitle.innerHTML;
            //assign the picture of book
            let picsrc = document.getElementById("image" + name).src;
            let pic = document.getElementById("cover"); 
            pic.src = picsrc; 
            // link to request info
            let url = "http://localhost:3000?mode=info&title=" + this.id;  
            fetch(url)
            .then(checkStatus)
                .then(function(responseText) { 
                    // parse the json
                    let json = JSON.parse(responseText);
                    console.log();
                    //assign the stars and author name to the their divs
                    document.getElementById("stars").innerHTML = json.stars;
                    document.getElementById("author").innerHTML = json.author; 
                });

            //link to request description
            url = "http://localhost:3000?mode=description&title=" + this.id;   
            fetch(url)
            .then(checkStatus)
                .then(function(responseText) {
                    //add the description to the page     
                    document.getElementById("description").innerHTML = responseText;   
                });

            //link to request the reviews
            url = "http://localhost:3000?mode=reviews&title=" + this.id;  
            fetch(url)
            .then(checkStatus)
                .then(function(responseText) {      
                    // parse the json
                    let json = JSON.parse(responseText);
                    let i = 0;
                    while(i < json.reviews.length){
                        //creat the header fisrt fo the name 
                        let reviewer = document.createElement("h3");
                        //add the name of the reviewer and the rating of the book
                        reviewer.innerHTML = json.reviews[i].name + " <span>" + 
                        json.reviews[i].stars + "</span>"; 
                        let comments = document.createElement("p");
                        comments.innerHTML = json.reviews[i].review; 
                        //get reviews div so we can add the elements to it
                        let Review = document.getElementById("reviews"); 
                        Review.appendChild(reviewer); 
                        Review.appendChild(comments);
                        ++i;
                    }
                });
            //remove the books dive so we get one singlebook page              
            document.getElementById("allbooks").innerHTML = "";  
        }

        /**
        //change cursor when you can click
        */
        function Mouseover(){
            this.style.cursor = "pointer";
        }

        /**
        //function when home is clicked
        */
        function Home() {
            //to empty the divs before the start function get all the books again
            document.getElementById("title").innerHTML = "";
            document.getElementById("author").innerHTML = ""; 
            document.getElementById("stars").innerHTML = "";
            document.getElementById("description").innerHTML = ""; 
            document.getElementById("cover").innerHTML = ""; 
            document.getElementById("reviews").innerHTML = "";  
            // start function to get all books
            Start(); 
        }
   }) ();