/*
Name:Yasser Alsaif
HW9: paint
javascript file
*/ 



"use strict"; 
(function() {
    //gobal variables
    let mode = "";
    let pencolor = "#000000";
    let size = 1;  
    let XYreset = false;

    window.onload = function() {
        //initilizing the canvasas
        initilizeCanvas();
        initilizePenCanvas();
        initilizeColorsCanvas();
        //initilizing plus button
        let plusb = document.getElementById("+");
        plusb.onclick = plusFunction; 
        //initilizing minus button
        let minusb = document.getElementById("-");
        minusb.onclick = minusFunction;
        //initilizing pen button
        let pen = document.getElementById("pen");
        pen.onclick = SetupPenmode;
        //initilizing circle button
        let circleb = document.getElementById("circles");
        circleb.onclick = SetupCirclemode;
        //initilizing square button
        let squareb = document.getElementById("squares");
        squareb.onclick = SetupSquaremode;
        //initilizing line button
        let lineb = document.getElementById("lines");
        lineb.onclick = SetupLinemode;
        //initilizing clear button
        let clearb = document.getElementById("clear");
        clearb.onclick = initilizeCanvas;
    };

    /**
     //
    */
    function initilizeCanvas(){
        //getting the canvas
        let canvas = document.getElementById("canvas");
        // getting the context of the convas
        let ctx = canvas.getContext("2d");
        //fill the canvas with white color
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     //
    */
    function initilizePenCanvas(){
        //getting the pencanvas
        let pencanvas = document.getElementById("pencanvas");
        let penctx = pencanvas.getContext("2d");
        //fill the pen canvas with white color
        penctx.fillStyle = "white"; 
        penctx.fillRect(0, 0, pencanvas.height, pencanvas.width);
        //draw the circle of the pensize on the pencanvas
        penctx.beginPath();
        penctx.arc(25, 25, size, 0, 2*Math.PI);
        penctx.stroke();
    }

    /**
     //
    */
    function initilizeColorsCanvas(){
        //getting the color canvas
        let color = document.getElementById("colorscanvas");
        //creat the color output from the colorcanvas when its clicked
        color.onclick = creatcolor;
        //getting color context
        let ctx = color.getContext("2d"); 
        // creat the linear gradient for ranbow colors as specified 
        color = ctx.createLinearGradient(0,0,100,0);
        //adding the colors stops for the gradient
        color.addColorStop(0, "rgb(255, 0, 0)");
        color.addColorStop(0.15, "rgb(255, 0, 255)");
        color.addColorStop(0.33, "rgb(0, 0, 255)");
        color.addColorStop(0.49, "rgb(0, 255, 255)");
        color.addColorStop(0.67, "rgb(0, 255, 0)");
        color.addColorStop(0.84, "rgb(255, 255, 0)");
        color.addColorStop(1, "rgb(255, 0, 0)");
        // fill the rainbow colors on the colors canvas
        ctx.fillStyle = color;
        ctx.fillRect(0,0,100,100);
        // creat te linear black/white colors
        color = ctx.createLinearGradient(0,0,0,100);
        color.addColorStop(0, "rgb(255, 255, 255, 1)");
        color.addColorStop(0.5, "rgb(255, 255, 255, 0)");
        color.addColorStop(0.5, "rgb(0, 0, 0, 0)");
        color.addColorStop(1, "rgb(0, 0, 0, 1)");
        //fill the black/white colors on the canvas
        ctx.fillStyle = color;
        ctx.fillRect(0,0,100,100); 
    }

    /**
     //
    */
    function creatcolor(event){
        //get the color canvas and context
        let color = document.getElementById("colorscanvas"); 
        let ctx = color.getContext("2d");
        //function returns colors from the clicked px on the canvas
        let colordata = ctx.getImageData(event.offsetX, event.offsetY, 100, 100);
        //put the colors in rgb mode so we can use it directly 
        pencolor = "rgb(" + colordata.data[0] + ", " +
        colordata.data[1] + ", " + colordata.data[2] + ")";
    }

    /**
     //
    */
    function plusFunction() {
        //bound the size between 1 to 25 which is the the max radius for 50x50 canvas
        if((size < 25)){
            //increase the size
            size += 1; 
            //get the color canvas context
            let canvas = document.getElementById("pencanvas");
            let ctx = canvas.getContext("2d");
            //first empty the pen canvas
            ctx.fillStyle = "white"; 
            ctx.fillRect(0, 0, canvas.height, canvas.width);
            //then fill the color canvas with the new size
            ctx.beginPath();
            ctx.arc(25, 25, size, 0, Math.PI*2);
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.fill(); 
        }
    }

    /**
     //
    */
    function minusFunction() {
        //bound the size 
        if((size > 1)) { 
            //decrease the sixe
            size -= 1;
            //get the pencanvas
            let canvas = document.getElementById("pencanvas");
            let ctx = canvas.getContext("2d"); 
            //empty the pen canvas
            ctx.fillStyle = "white"; 
            ctx.fillRect(0, 0, canvas.height, canvas.width);
            //fill the canvas with the new size
            ctx.beginPath();
            ctx.arc(25, 25, size, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.fill(); 
        }
    }

    /**
     //
    */
    function SetupPenmode() {
        //first set up the mode so we can leave the infinit loop the call pen function
        mode = "p"; 
        FunctionPen(); 
    }

    /**
     //
    */
    function FunctionPen() {
        let canvas = document.getElementById("canvas");
        //on mousedown call function onmouse move to draw the path
        canvas.onmousedown = function(){
            window.addEventListener("mousemove", penpath);
        };
        //on mouseup stop calling the draw function
        canvas.onmouseup = function() {
            XYreset = false;
            window.removeEventListener("mousemove", penpath);
        };
        //recall the function if it still in the same mode
        if (mode == "p") {
            window.requestAnimationFrame(FunctionPen);
        }
    }
     
    /**
     //
    */
    function penpath(event) {
        //get the context of the canvas
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        if (!XYreset) {
            //reset the mouse location
            ctx.moveTo(event.offsetX, event.offsetY);
            //after reste get the flag high
            XYreset = true;      
        }
        else { 
            //draw setup
            ctx.strokeStyle = pencolor;
            ctx.lineWidth = size;
            let rect = canvas.getBoundingClientRect();
            ctx.lineTo(event.clientX-rect.left, event.clientY-rect.top);
            ctx.stroke();
            FunctionPen(); 
        }
    }

    /**
     //
    */
    function SetupCirclemode(){
        //set up mode
        mode = "c"; 
        Cfunction(); 
    }

    /**
     //
    */
    function Cfunction() { 
        //get the canvas
        let canvas = document.getElementById("canvas");
        //on mousedown call function onmouse move to draw the path
        canvas.onmousedown = function(){
            window.addEventListener("mousemove", circlepath);
        };
        //on mouseup stop calling the draw function
        canvas.onmouseup = function (){
            XYreset = false;
            window.removeEventListener("mousemove", circlepath);
        };
        //recall the function if it still in the same mode
        if (mode == "c") {
            window.requestAnimationFrame(Cfunction); 
        }
    }

    /**
     //
    */
    function circlepath(event) {
        //get the canvas context
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        //setup for the line of circuls
        ctx.strokeStyle = pencolor; 
        ctx.beginPath();
        let rect = canvas.getBoundingClientRect(); 
        ctx.arc(event.clientX - rect.left, event.clientY - rect.top, size, 0, 2*Math.PI);
        ctx.lineWidth = 1;
        ctx.stroke();
        //call function again
        Cfunction();
    }

    /**
     //
    */
    function SetupSquaremode() {
        mode = "s"; 
        sfunction(); 
    }

    /**
     //
    */
    function sfunction() {
        //get the canvas
        let canvas = document.getElementById("canvas");
        //on mousedown call function onmouse move to draw the path
        canvas.onmousedown = function(){
            window.addEventListener("mousemove", squarepath);
        };
        //on mouseup stop calling the draw function 
        canvas.onmouseup = function(){
            window.removeEventListener("mousemove", squarepath);
        };
        //recall the function if it still in the same mode
        if(mode == "s") {
            window.requestAnimationFrame(sfunction);
        }      
    }

    /**
     //
    */
    function squarepath(event) {
        //get the canvas context
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        //setup for drawing 
        ctx.fillStyle = pencolor; 
        let rect = canvas.getBoundingClientRect();
        ctx.lineWidth = 1;
        ctx.fillRect(event.clientX - rect.left, event.clientY - rect.top, size, size); 
        //call the function back again 
        sfunction(); 
    }

    /**
     //
    */
    function SetupLinemode(){
        //setup mode
        mode = "l";
        lfunction(); 
    }

    /**
     //
    */
    function lfunction() {
        //get the canvas
        let canvas = document.getElementById("canvas");
        //on mousedown call function onmouse move to draw the path
        canvas.onmousedown = function(){
            window.addEventListener("mousemove", linepath);
        };
        //on mouseup stop calling the draw function 
        canvas.onmouseup = function(){
            window.removeEventListener("mousemove", linepath);
        };
        //recall the function if it still in the same mode
        if(mode == "l") {
        window.requestAnimationFrame(lfunction);
        }      
    }

    /**
     //
    */
    function linepath(event) {
        //get context of the canvas
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");
        //setup forthe path
        pencontext.strokeStyle = pencolor; 
        pencontext.lineWidth = size;
        pencontext.beginPath();
        pencontext.moveTo(0,0); 
        let rect = canvas.getBoundingClientRect();
        pencontext.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        pencontext.stroke();
        lfunction(); 
    }
}) ();