var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, monkey_collided;
var bananasGroup, obstacleGroup
var score, lives;
var PLAY;
var END;
var gameState = PLAY;

function preload(){
 
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_collided=loadImage("sprite_0.png");
}



function setup() {
  // createCanvas(600, 600);
 
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
 
  ground = createSprite(400,350,900,10);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  console.log(ground.x)
 
bananasGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
   lives = 2;
 
}


function draw() {
 
  background(500,500,190);
 
  if (gameState === PLAY){
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
   
    if(keyDown("w") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
   
     monkey.collide(ground);  
   spawnBananas();
    spawnObstacles();
   
    if(obstaclesGroup.isTouching(monkey)){
       
      lives = lives-1;
     
      obstaclesGroup.destroyEach();
      monkey.scale = 0.08
    }
   
    if (bananasGroup.isTouching(monkey)){
    score = score+1;
        switch(scale){
      case 10 : monkey.scale=0.12;
        break;
        case 20 : monkey.scale = 0.14;
        break;
        case 30: monkey.scale = 0.16;
        break;
        case 40 : monkey.scale = 0.18;
        break;
        default:break;
    }
       
    bananasGroup.destroyEach();
     
       
  }
 

 
  stroke("black");
  textFont("battnise");
  textSize(20);
  fill("black");
  text("SCORE : "+score, 100,50);
 
  stroke("black");
  textFont("battnise");
  textSize(20);
  fill("black");
  text("LIVES : "+lives,100,90);
   
   
   
}
    if (lives === 0){
    gameState = END;
   
 
   if (gameState==END){
    stroke("black");
    textFont("battnise")
    textSize(30);
    fill("black");
    text("GAME OVER",100,180);
     
     bananasGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     
     bananasGroup.setLifetimeEach(0);
     obstaclesGroup.setLifetimeEach(0);
     
     monkey.visible = false;
     ground.visible = false;
     
    }}
   
     drawSprites();
 
}
 
function spawnBananas() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
   
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
   
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
   
    //add each banana to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
   
    //add image to the obstacle
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
   
    //lifetime to the obstacle    
    obstacle.lifetime = 300;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
