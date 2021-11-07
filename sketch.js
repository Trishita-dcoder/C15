var cloud,cloudImg,cloudsGroup
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup
var trex ,trex_running;
var ground,groundImg,invisibleGround
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png") 
  groundImg = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png")
   
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex = createSprite(50,100,20,20)
 trex.addAnimation("running",trex_running)
 trex.scale= 0.5

 ground = createSprite(300,180,600,10)
 ground.addImage("ground",groundImg)
 ground.x  = ground.width/2
 

 invisibleGround = createSprite(300,190,600,10)
 invisibleGround.visible = false

 cloudsGroup = createGroup()
 obstaclesGroup = createGroup()
}

function draw(){
  background("white")
  textSize(15)
  text("Score: "+score,450,40)
  if(gamestate ==PLAY) {

    score = score + Math.round(frameCount/60) 

    ground.velocityX = -2
    if(ground.x < 0){
      ground.x = ground.width/2    
    }
    if (keyDown("space")) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY +0.8
    
    trex.collide(invisibleGround)
    //calling function spawn clouds
     spawnClouds()

    //calling spawn obstacles
    spawnObstacles()
    if(trex.isTouching(obstaclesGroup)) {
        gamestate = END
    }
    
  }
  else if(gamestate == END){
        ground.velocityX = 0
        trex.velocityY = 0
        obstaclesGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)
  }
  drawSprites()
}

function spawnClouds(){

  if(frameCount % 60 == 0){
    var cloud = createSprite(600,80,10,10)
    cloud.velocityX = -2
    cloud.y =Math.round(random(50,150))
    cloud.addImage(cloudImg)
    cloud.scale = 0.5
    cloud.depth = trex.depth
    trex.depth = trex.depth+1
    cloud.lifetime = 300
    cloudsGroup.add(cloud)
  }
 
}

function spawnObstacles() {
  if(frameCount % 60 == 0) {
    var obstacle = createSprite(600,165,10,10)
    obstacle.velocityX = -6
    var rand = Math.round(random(1,6))

    switch(rand) {
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 300
    obstaclesGroup.add(obstacle)
  }

}
