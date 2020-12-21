/*
Name: Yasser Alsaif
Date: 2/22/2019
hw: puzzle homework javascript
*/

"use strict"; 

(function() { 


     // coordinates of white tile
     let WhiteTilex = 300; 
     let WhiteTiley = 300;

    window.onload = function() { 
     let TilesSpace = document.getElementById("puzzlearea");    
     let ShuffleButton = document.getElementById("shufflebutton"); 
    // this puzzle space set up
     TilesSpace.style.position = "relative"; 
     TilesSpace.style.margin = "auto"; 
     TilesSpace.style.width = "400px"; 
     TilesSpace.style.height = "400px"; 
     //coordinates
     let x = 0;  
     let y = 0;  
     let c = 1;
          // loop to creat each individual tile
     for(let i = 0; i < 15; i++) {  
          let Tile = document.createElement("div");
               // mouse functions
          Tile.onmousedown = MouseDown;
          Tile.onmouseover = MouseOver; 
          Tile.onmouseout = MouseOut; 
          // style for each tile
          Tile.style.position = "absolute";  
          Tile.style.margin = "0px";
          Tile.style.paddingTop = "0px"; 
          Tile.style.width = "90px"; 
          Tile.style.height = "90px";
          Tile.innerHTML = i + 1;
          Tile.style.fontSize = "40pt"; 
          Tile.style.textAlign = "center";
          Tile.style.border = "5px black solid"
           // position of the tile
          Tile.style.top = y + "px"; 
          Tile.style.left = x + "px"; 
          // background picture set up, offset is negative
          Tile.style.backgroundImage = "url('background.jpeg')";  
          Tile.style.backgroundPositionX = -x + "px";
          Tile.style.backgroundPositionY = -y + "px";  
          // initialize id with tile coordinates
          Tile.Posx = x; 
          Tile.Posy = y;
          Tile.id =  x + "" + y;
          x += 100;   
          ++c;
          if(c == 5) {  // to get new row
               x = 0; 
               y += 100;
               c = 1; 
          }
          // to add the tile in the end
          TilesSpace.appendChild(Tile); 
     }
          // shuffling function
          ShuffleButton.onclick = Shuffle;
}

     function MouseDown() {
     let Moveable = false; 
     let MoveRight = true; 
     let MoveLeft = true;
     let MoveBottom = true; 
     let MoveTop = true;

     switch (WhiteTilex){  // 4 edge cases for the white tile
          case 0:
               MoveLeft = false;
               break;
          case 300:
               MoveRight = false;
               break;
     }
     switch (WhiteTiley){
          case 0:
               MoveTop = false;
               break;
          case 300:
               MoveBottom = false;
               break;
     }
     // this function returns weather a tile is movable
     Moveable = routineabs(this.Posx, this.Posy); 

     if(Moveable){
          // to move left
          if((this.Posx == (WhiteTilex + 100)) && MoveRight) {  
               this.style.left = parseInt(this.style.left) - 100 + "px";   
               this.Posx -= 100; 
               WhiteTilex += 100;
               this.id = this.Posx + "" + this.Posy;
          } // to move to right
          else if((this.Posx == (WhiteTilex - 100)) && MoveLeft) {  
               this.style.left = parseInt(this.style.left) + 100 + "px";  
               this.Posx += 100; 
               WhiteTilex -= 100;
               this.id = this.Posx + "" + this.Posy;
          }// to move tie to top
          else if((this.Posy == (WhiteTiley + 100)) && MoveBottom) {  
               this.style.top = parseInt(this.style.top) - 100 + "px";  
               this.Posy -= 100;
               WhiteTiley += 100;
               this.id = this.Posx + "" + this.Posy; 
          } // move tile to bottom
          else if((this.Posy == (WhiteTiley - 100)) && MoveTop) {  
               this.style.top = parseInt(this.style.top) + 100 + "px";  
               this.Posy += 100; 
               WhiteTiley -= 100;
               this.id = this.Posx + "" + this.Posy;
          } 
     }
     }
     function Shuffle() {
     let i = 1000; 
     while (i != 0) {
          let TileChoosen;
          let LeftMovable = true;
          let RightMovable = true;
          let TopMovable = true; 
          let BottomMovable = true;
          let n = 1;
          let num = 0;  
          switch (WhiteTilex){ // 4 edge cases for white tile
               case 0: 
                    LeftMovable = false;
                    break;
               case 300:
                    RightMovable = false;
                    break;
          }
          switch (WhiteTiley){
               case 0:
                    TopMovable = false;
                    break;
               case 300:
                    BottomMovable = false;
          }

          
          while(n != 0) {    // 0 for top move, 1 for right move, 2 for bottem move, for 3 left move
               num = parseInt(Math.random() * 4); 
               if(num == 0) {     
                    if(TopMovable == true){
                         n = 0; 
                    }
               }    
               else if(num == 1) {
                    if(RightMovable == true) {
                         n = 0; 
                    }
               }
               else if(num == 2) {
                    if(BottomMovable == true) {
                    n = 0; 
                    }
               }
               else if(num == 3) {
                    if(LeftMovable == true) {
                         n = 0; 
                    }
               }
          }
            

          switch (num){
               case 0:if(TopMovable){
                         // gets the tile top of the white tile using id
                         TileChoosen = document.getElementById(WhiteTilex + "" + (WhiteTiley - 100));
                         TileChoosen.Posy += 100; // change the coordinates
                         TileChoosen.style.top = parseInt(TileChoosen.style.top) + 100 + "px";  // move to the top
                         WhiteTiley -= 100; // change white tile coordinates
                         TileChoosen.id = TileChoosen.Posx + "" + TileChoosen.Posy; // update the tile's id
                    }break;
               case 1:if(RightMovable){
                         // gets the tile right of the white tile using id
                         TileChoosen = document.getElementById((WhiteTilex + 100) + "" + WhiteTiley);
                         TileChoosen.Posx -= 100; // change the coordinates
                         TileChoosen.style.left = parseInt(TileChoosen.style.left) - 100 + "px"; // move to the right
                         WhiteTilex += 100;
                         TileChoosen.id = TileChoosen.Posx + "" + TileChoosen.Posy; // update the tile's id
                    }break;
               case 2:if(BottomMovable){
                         TileChoosen = document.getElementById(WhiteTilex  + "" + (WhiteTiley + 100));
                         TileChoosen.Posy -= 100; // change the coordinates
                         TileChoosen.style.top = parseInt(TileChoosen.style.top) - 100 + "px"; 
                         WhiteTiley += 100;
                         TileChoosen.id = TileChoosen.Posx + "" + TileChoosen.Posy; // update the tile's id
                    }break;
               case 3:if(LeftMovable){
                         TileChoosen = document.getElementById((WhiteTilex - 100)+ "" + WhiteTiley);
                         TileChoosen.Posx += 100; // change the coordinates
                         TileChoosen.style.left = parseInt(TileChoosen.style.left) + 100 + "px"; 
                         WhiteTilex -= 100;
                         TileChoosen.id = TileChoosen.Posx + "" + TileChoosen.Posy; // update the tile's id
               }break;    
          }
           --i;
           }
          }
    
     function MouseOut(){  // set up for tiles when cursor not over
          this.style.color = "black"; 
          this.style.borderColor = "black"; 
          }

     function MouseOver(){ 
          this.style.borderColor = "red"; 
          this.style.color = "red"; 
          let Moveable = routineabs(this.Posx, this.Posy);
          if(Moveable){
               this.style.cursor = "pointer";  // to make the cursor shows as a hand
          }else{
               this.style.cursor = "default";
          }
     }

    function routineabs(x,y){ // this function calculates The sum of absolute diffrenece
     let diffy = Math.abs(WhiteTiley - parseInt(y));
     let diffx = Math.abs(WhiteTilex - parseInt(x));
     let diffxy = diffx + diffy; 
     if(diffxy == 100){
          return true;
     }else{
          return false;
     }
     }

    }) ();