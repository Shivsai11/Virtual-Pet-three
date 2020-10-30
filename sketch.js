var dog, happyDog, database, food, foodStock, dogimg, happyDogimg, feedButton, addButton;
var lastFed, milkDisplay, readState, bedroomimg, gardenimg, washroomimg, gameState;
var sadDog, currentTime, foodObj;

function preload()
{
  dogimg = loadImage("virtual pet images/dogImg.png");
  happyDogimg = loadImage("virtual pet images/dogImg1.png");
  bedroomimg = loadImage("virtual pet images/Bed Room.png")
  gardenimg = loadImage("virtual pet images/Garden.png")
  washroomimg = loadImage("virtual pet images/Wash Room.png")
  sadDog = loadImage("virtual pet images/Lazy.png");
}
 
function setup() {
  createCanvas(800, 600);
  database = firebase.database();
  dog = createSprite(400, 300, 20, 20);
  dog.addImage(dogimg, 400, 300);
  dog.scale = 0.2;

  foodStock = database.ref("Food").on("value", readStock);
  feedButton = createButton("Feed the dog");
  feedButton.position(350, 550);
  lastFed = 2;
  feedButton.mousePressed(()=>{
    updateStock(food);
    image(happyDogimg, 400, 300, 130, 130);
    //updateState("Playing");
    lastFed = currentTime;
  })

  addButton = createButton("Add food");
  addButton.position(360, 520);
  addButton.mousePressed(()=>{
    addFood(food);
  })

  foodObj = new Food();


  readState = database.ref("gameState");
  readState.on("value", (data)=>{
    gameState = data.val();
    console.log(gameState);
  })
  
  currentTime = hour();
}

function draw() {  
  background(mouseX, mouseY, 80);
  drawSprites();

  textSize(25);
  fill("blue");
  textFont("Impact");
  text("Remaining food: "+ food, 300, 50);

  if(lastFed>=12){
    fill("red");
    text("Last Fed: "+ lastFed%12 + "PM", 330, 500);
  }
  else if(lastFed===0){
    fill("red");
    text("Last Fed: 12AM", 330, 500);
  }
  else{
    fill("red");
    text("Last Fed: "+lastFed + "AM", 330, 500);
  }
  //milkDisplay.display();

  if(gameState!=="Hungry"){
    feedButton.hide();
    addButton.hide();
    dog.remove();
  }
  else if(lastFed < currentTime - 1){
    feedButton.show();
    addButton.show();
    imageMode(CENTER);
    image(sadDog, 400, 300, 130, 130);
    //dog.scale = 0.2;
  }
  
  //Gamestate updation
  if(currentTime===lastFed){
    updateState("Happy");
    image(happyDogimg, 400, 300, 130, 130);
  }
  if(currentTime==(lastFed+1)){
    updateState("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    updateState("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    updateState("Bathing");
    foodObj.washroom();
  }
  else{
    updateState("Hungry");
    foodObj.display();
  }
}

function readStock(data){
  food = data.val();
}

function updateStock(x){
   if(x<=0){
     x = 0;
   }
   else{
     x = x - 1;
   }
   database.ref('/').update({
    Food:x,
    feedTime:lastFed
  });
}

function addFood(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x + 1;
  }
  database.ref('/').update({
  Food:x
 });
}
function updateState(state){
  database.ref('/').update({
    gameState:state
  });
  console.log("bye");
}

