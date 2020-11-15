var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score;

function preload(){
  backgroundImage = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  
  background = createSprite(0, 100, 400, 400);
  background.addImage(backgroundImage);
  background.x = background.width/2;
  
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  
  ground = createSprite(400,350,900,100);
  ground.visible = false;
  
  score = 0;
  
  //monkey.debug = true;
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height-30);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background.velocityX = -7;
  
  if (background.x < 0) {
    background.x = background.width/2;
  }
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  survivalTime = Math.round(frameCount/frameRate());
  
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score++;
  }
  
  if (monkey.isTouching(obstacleGroup)) {
    obstacleGroup.destroyEach();
    monkey.scale = 0.08;
    score = 0;
  }
  
  switch(score) {
    case 10: monkey.scale = 0.1;
      break;
    case 20: monkey.scale = 0.12;
      break;
    case 30: monkey.scale = 0.14;
      break;
    case 40: monkey.scale = 0.16;
      break;
    case 50: monkey.scale = 0.18;
      break;
    default: break;
  }
  
  createFood();
  createObstacle();
  
  drawSprites();
  
  fill("white");
  textSize(15);
  text("Score: " + score, 180, 20);
}

function createFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(120,200)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 105;
    banana.depth = monkey.depth;
    monkey.depth++;
    foodGroup.add(banana);
  }
}

function createObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 270, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}