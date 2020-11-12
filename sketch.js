
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var ground,invisibleGround;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(550,350);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
 ground=createSprite(400,315,900,10);
 ground.velocityX=-4;
  
  invisibleGround=createSprite(400,315,900,5);
  
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  console.log(ground.x);
  monkey.debug=true;
}


function draw() {
background(180);
  
  invisibleGround.visible=false;
  
  stroke("white");
  textSize(15);
  fill("white");
  text("Score: "+score,450,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
  if(foodGroup.isTouching(monkey))
  {
    foodGroup.destroyEach();
    score=score+1;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
   if (ground.x < 0){
      ground.x = ground.width/2;
    }


  monkey.collide(invisibleGround);

  if (obstacleGroup.isTouching(monkey)) {
    monkey.velocityY=0;
    
  }
  
  obstacles();
  bananas();
  drawSprites();
}

function bananas(){
  


if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
     
    banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
   foodGroup.add(banana);
  }
}

function obstacles(){
  


if (frameCount % 300 === 0) {
    obstacle = createSprite(600,280,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    
    
    obstacle.lifetime = 200;
    
    
    
    
    obstacleGroup.add(obstacle);
  }
}





