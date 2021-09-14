var path,boy,cash,diamonds,jwellery,sword,box
var pathImg,path2Img,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasure = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var go
var footstep,collect;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

  footstep = loadSound("footsteps/running.mp3")
  collect = loadSound("collecting/coin.mp3")
go = loadSound("go/oops.mp3")

path2Img = loadImage("path2.png")

}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(400,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 10

//creating boy running
boy = createSprite(windowWidth-70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.1;
  


  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {


if(keyDown("space")){

  footstep.play();
  
}
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;

  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 550 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasure=treasure+50;
      collect.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasure=treasure+100;
      
      collect.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasure=treasure+200;
      collect.play();
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END
        boy.addAnimation("SahilRunning",endImg)
        boy.x = windowWidth/2
        boy.y = windowHeight/2
        boy.scale = 1
        go.play();

    }  
  }
  
  drawSprites();
  textSize(20);
  fill("black");
  text("treasure: "+ treasure,150,30);
  
  
  }

else if(gameState == END){

 
  footstep.stop();

path.velocityY = 0;
jwelleryG.destroyEach();
cashG.destroyEach();
diamondsG.destroyEach();


}




}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 350;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 350;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 350;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 350;
  swordGroup.add(sword);
  }
}