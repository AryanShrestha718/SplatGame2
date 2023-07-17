class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();
    splat1 = createSprite(width / 2 - 50, height - 100);
    splat1.addImage("splat1", Green_Splat);
    splat1.scale = 0.07;

    splat2 = createSprite(width / 2 + 100, height - 100);
    splat2.addImage("splat2", Red_Splat);
    splat2.scale = 0.07;

    splats = [splat1, splat2];


    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: Rock_Splat},
      { x: width / 2 - 150, y: height - 1300, image: Yellow_Splat},
      { x: width / 2 + 250, y: height - 1800, image: Yellow_Splat},
      { x: width / 2 - 180, y: height - 2300, image: Rock_Splat},
      { x: width / 2, y: height - 2800, image: Rock_Splat},
      { x: width / 2 - 180, y: height - 3300, image: Yellow_Splat},
      { x: width / 2 + 180, y: height - 3300, image: Rock_Splat},
      { x: width / 2 + 250, y: height - 3800, image: Rock_Splat},
      { x: width / 2 - 150, y: height - 4300, image: Yellow_Splat},
      { x: width / 2 + 250, y: height - 4800, image: Rock_Splat},
      { x: width / 2, y: height - 5300, image: Yellow_Splat},
      { x: width / 2 - 180, y: height - 5500, image: Rock_Splat}
    ];

    this.addSprites(fuels, 4, fuelImage, 0.02);

    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.04,
      obstaclesPositions
    );
  }
   

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Restart Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;

        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        var currentlife = allPlayers[plr].life;

        if (currentlife <= 0) {
          cars[index - 1].changeImage("blast");
          cars[index - 1].scale = 0.3;
        }

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handleCarACollisionWithCarB(index);
          this.handleObstacleCollision(index);

          camera.position.y = cars[index - 1].position.y;
        }
      } 
    }
  }
  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      player.update();
    }
  }

  handleCarACollisionWithCarB(index) {
    if (index === 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        if (player.life > 0) {
          player.life -= 185 / 4;
        }

        player.update();
      }
    }
    if (index === 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        player.update();
      }
    }
  }

  end() {
    console.log("End of Game");
  }
}
