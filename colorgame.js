//default value=6, for easy as default: change to 3
var howManyColors=6;

//controlling easy/hard buttons(hard=2, easy=1) //these fns will only be called when the mode button is clicked!!!
var allbuttons= document.querySelectorAll("button");
document.querySelector("#easy").addEventListener("click", function(){
    howManyColors= 3;
    allbuttons[1].classList.add("selected");
    allbuttons[2].classList.remove("selected");
    //refresh with 3 colors now
    //generating array of 3 random colors and applying, rest of the 3 become black
    colors= RandomColorsGenerator(howManyColors);
    for(var i=0; i<colors.length; i++){
        squares[i].style.backgroundColor= colors[i];
    }
    if(colors.length===3){
        for(var i=3; i<6; i++){
            squares[i].style.backgroundColor= "black"; 
        }
    }
    //picking winning color from the 3
    winnerColor= pickWinnerColor();
    document.querySelector("#rgbdisplay").textContent= winnerColor;
    //h1 background color back to steel blue
    h1.style.backgroundColor= "#00ddff";
    //changing play again to new colors
    newcolorsbutton.textContent= "New Colors!";
    msgdisplay.textContent= "";

});
document.querySelector("#hard").addEventListener("click", function(){
    howManyColors= 6;
    allbuttons[2].classList.add("selected");
    allbuttons[1].classList.remove("selected");
    //refresh with 6 colors now
    //generating array of 6 random colors and applying
    colors= RandomColorsGenerator(howManyColors);
    for(var i=0; i<colors.length; i++){
        squares[i].style.backgroundColor= colors[i];
    }
    //picking winning color from the 6
    winnerColor= pickWinnerColor();
    document.querySelector("#rgbdisplay").textContent= winnerColor;
    //h1 background color back to steel blue
    h1.style.backgroundColor= "#00ddff";
    //changing play again to new colors
    newcolorsbutton.textContent= "New Colors!";
    msgdisplay.textContent= "";
});

//picking "howmanycolors" colors and selecting all the div.squares and storing BOTH in arrays
var colors= RandomColorsGenerator(howManyColors);
var squares= document.querySelectorAll(".square");

//winning color picking function and displaying
var winnerColor= pickWinnerColor();
function pickWinnerColor(){
    return colors[Math.floor((Math.random()*colors.length)+1)];
}
document.querySelector("#rgbdisplay").textContent= winnerColor;

//msgdisplay id shows us "try again or correct!"
var msgdisplay= document.querySelector("#msgdisplay");
var h1= document.querySelector("h1");

//function controlling new colours button (refresh) //this will only be called when the newcolors button is clicked !!!
var newColorsButton= document.querySelector("#newcolorsbutton");
newColorsButton.addEventListener("click", function(){

  //refresh the screen with new colors
    //1.choosing new colors for square and applying
    colors= RandomColorsGenerator(howManyColors);
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor= colors[i];
    }

    //2.winning color picking and displaying
    winnerColor= pickWinnerColor();
    document.querySelector("#rgbdisplay").textContent= winnerColor;

    //3. changing background of h1 back to steel blue
    h1.style.backgroundColor= "#00ddff"; 

    //4. changing play again to new colors
    newcolorsbutton.textContent= "New Colors!";

    //5. changing the displayed Correct! or Try Again! to blank again
    msgdisplay.textContent= "";
  
});

//controlling default stuff ie what will happen when the page is reloaded
//loop to add 3 or 6 colors to the squares
for(var i=0; i<colors.length; i++){
    squares[i].style.backgroundColor= colors[i];
}
//this "if" will only be executed when our default mode is easy(not the case currently)
if(colors.length===3){
    for(var i=3; i<6; i++){
        squares[i].style.backgroundColor= "black"; 
    }
}
//adding event listeners to each square
for(var i=0; i<colors.length; i++)
{
    squares[i].addEventListener("click", function(){
        console.log(winnerColor);
        //wrong color picked, fade it into bg color
        if(this.style.backgroundColor!== winnerColor){
            this.style.backgroundColor= "black";
            msgdisplay.textContent= "Try Again!";
        }
        //correct color picked
        else{

            for(var j=0; j<colors.length; j++){
                squares[j].style.backgroundColor= winnerColor;
            }
            msgdisplay.textContent= "Correct!";
            h1.style.backgroundColor= winnerColor; 
            newcolorsbutton.textContent= "Play Again?";
        }
    });
}

//function to generate array of random colours (of size nums)
function RandomColorsGenerator(nums){

    //creating array
    var arr= [];
    for(var i=0; i<nums; i++){
        arr[i]= getRandomColorRGB();
    }
    return arr;
}

//getting called by the above fn to generate random rgb string one at a time, to be stored in colors array
function getRandomColorRGB(){

    //red
    var red= Math.floor((Math.random()*255)+1);
    //blue
    var blue= Math.floor((Math.random()*255)+1);
    //green
    var green= Math.floor((Math.random()*255)+1);
    var rgbstring= "rgb(" + red + ", " +green+ ", "+ blue + ")";
    return rgbstring;
}
