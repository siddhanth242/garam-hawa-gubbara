var balloon,balloonImage1,balloonImage2;
//create database and position variable here
var database, position


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
var balloonPosition=database.ref('balloon/height');
balloonPosition.on("value",readPosition, showError)      
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    update(-10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    update(+10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    update(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(balloon.scale > 0){
      balloon.scale -= 0.01
    }
    
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    update(0,+10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale += 0.01
  }
  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function update(x,y){
 database.ref('balloon/height').set({
x : position.x+x,
y : position.y + y
 })


}

function readPosition(data){
position= data.val();
balloon.x = position.x
balloon.y= position.y
}

function showError(){

console.log("Error in writing to the database")
}

