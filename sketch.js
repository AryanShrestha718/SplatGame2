var canvas;
var backgroundImage
var database, gameState;
var blastImage;
var form, player, playerCount;
var allPlayers, splat1, splat2, obstacles;
var splats = []
function preload() {
  backgroundImage = loadImage("../assets/Background.jpg");
  Green_Splat = loadImage("../assets/Splat_Green.jpg");
  Red_Splat = loadImage("../assets/Splat_Red.jpg");
  Rock_Splat = loadImage("../assets/Splat_Rock.jpg");
  Yellow_Splat = loadImage("../assets/Splat_Yellow.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }



  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
