var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
  var survivalTime=0
  
//creating monkey
monkey= createSprite(80,315,20,20)
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1; 
//monkey.collide(ground)
  
ground=createSprite(400,350,900,10)
ground.velocityX = -4;
ground.x=ground.width/2
  
bananaGroup = createGroup();
  
  obstaclesGroup = new Group();
 
  score=0;
}

function draw() {
background(255);
  //resetting the ground
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY= -12;
  }
   //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
    //spawn the bananas
    spawnBananas();
  
   //spawn the obstacles
   spawnObstacles(); 
  


drawSprites();
  

stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 500,500)
  
//if monkey touches obstacle group
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
    
    }
stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 100,50);
}


  function spawnBananas(){
 if (frameCount % 80 === 0){
   banana = createSprite(600,150,5,5);
   banana.y = random(120,200); 
   banana.addImage(bananaImage)
   banana.velocityX= -6;
   banana.scale=0.1;
   banana.lifetime= 200;
   
   monkey.depth = banana.depth + 1;
   bananaGroup.add(banana);

}
  }

  function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(420,350,900,10);
   obstacle.addImage(obstaceImage)
   obstacle.velocityX= -6;
   obstacle.scale=0.1;
   obstacle.y=random(350,300);
   obstacle.lifetime= 200;
   obstaclesGroup.add(obstacle);
   
 }
  }