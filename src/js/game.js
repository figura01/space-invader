console.log('gamejs');

class Game {
    constructor(difficulty) {
        this.level = 1;
        this.difficulty = difficulty;
        this.width = 800;
        this.height = 600;

        this.arrEnemies = [];
        this.arrBulletsEnemies = [];
        this.arrBulletsPlayers = [];

        this.gameIsOver = false;
        this.score = 0;
        this.time = 0;
        this.nbrEnemies = 12 * this.level;

        this.intervalId = 0;

    }

    startLoopGame() {
        this.intervalId = setInterval(function () {
            updateValue();
            ckeckColision();
            actionEnnemies();
            renderElements();
        }, 60);
    }

    stopLoopGame() {
        clearInterval(this.intervalId);
    }
};

class objElGame {
    constructor(posX, posY, width, height) {
        this.positionX = posX;
        this.positionY = posY;
        this.width = width;
        this.height = height;

        this.isCollised = false;
    }

    getPosition() {
        return {
            posX: this.positionX,
            posY: this.positionY
        };
    }
}
class ShipPlayer extends objElGame {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height);

        this.positionX = posX;
        this.positionY = posY;
        this.width = width;
        this.height = height;
        this.hp = 100;
        this.ref = '';
        this.imgSrc = './src/images/player-orange-2.png';
    }

    moveToTop() {
        if (this.positionY != 0) {
            this.positionY -= 5;
        }
    }

    moveToBottom() {
        if (this.positionY != gameObject.height - 50) {
            this.positionY += 5;
        }
    }

    moveToLeft() {
        if (this.positionX != 0) {
            this.positionX -= 5;
        }
    }

    moveToRight() {
        if (this.positionX != (800 - this.width)) {
            this.positionX += 5;
        }
    }

    getPosition() {
        return {
            posX: this.positionX,
            posY: this.positionY
        };
    }
}

class ShipEnemie extends objElGame {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height);

        this.positionX = posX;
        this.positionY = posY;
        this.width = width;
        this.height = height;
        this.imgSrc = './src/images/enemy-black-1.png';
        this.refId = '';
        this.points = 100;

        this.isCollised = false;
    }

    moveToBottom() {
        if (this.positionY != gameObject.height - 50) {
            this.positionY += 5;
        }
    }

    moveToLeft() {
        if (this.positionX != 0) {
            this.positionX -= 5;
        }
    }

    moveToRight() {
        if (this.positionX != (800 - this.width)) {
            this.positionX += 5;
        }
    }

    shoot() {
        console.log('ennemie shoot');
        
        //createEnemiesLasers();
    }

    getPosition() {
        return {
            posX: this.positionX,
            posY: this.positionY
        };
    }

    getShip() {
        return this;
    }
}

class Laser extends objElGame {
    constructor(posX, posY) {
        super(posX, posY);
        this.positionX = posX;
        this.positionY = posY;
        this.width = 6;
        this.height = 20;
        this.refId = '';
        this.ref = '';
        this.imgSrc = './src/images/laser-blue-1.png';
    }

    moveToTop() {
        this.positionY -= 5;
    }

    moveToBottom() {
        this.positionY += 5;
    }
}

/*********CONST GAME *********/
var elMain = document.getElementById('main').childNodes[1];
console.log(elMain)
var gameObject = new Game('easy');
console.log(gameObject);

var mainScreenById;

var testObj = new objElGame(100, 200, 40, 30);
console.log(testObj.getPosition());

var player = new ShipPlayer((gameObject.width / 2), (gameObject.height - 50), 40, 30);

/*****************************/

const updateValue = () => {

}

const actionEnnemies = () => {
    console.log('actions ennemies')
    if (gameObject.arrEnemies.length != 0) {
        for(let i=0; i < gameObject.arrEnemies.length; i++) {
            if(gameObject.arrEnemies[i].positionX == player.positionX) {
                //gameObject.arrEnemies[i].shoot();
                //let enemieShipPositions = gameObject.arrEnemies[i].getPosition();
                let enemieShip = gameObject.arrEnemies[i];
                console.log(enemieShip);
                setTimeout(function(){
                    createEnemiesLasers(enemieShip);
                }, 500);           
                
                //gameObject.stopLoopGame();
            }
        }
    }
}

const renderElements = () => {
    const playerDom = player.ref;
    console.log(player.ref);
    console.log(player.getPosition());

    let playerPosition = player.getPosition();
    playerDom.style.left = playerPosition.posX;
    playerDom.style.top = playerPosition.posY;
    console.log(playerDom.style.left);


    if (gameObject.arrBulletsPlayers) {
        let lasers = document.querySelectorAll('.laser-player');
        console.log('render laser');
        for (let i = 0; i < gameObject.arrBulletsPlayers.length; i++) {
            gameObject.arrBulletsPlayers[i].moveToTop();
            lasers[i].style.top = gameObject.arrBulletsPlayers[i].positionY;
            console.log(gameObject.arrBulletsPlayers[i].positionY);
            if (gameObject.arrBulletsPlayers[i].positionY < 0) {
                let elDom= document.getElementById(gameObject.arrBulletsPlayers[i].refId);
                elDom.remove();
                gameObject.arrBulletsPlayers.splice(i, 1);

            }
        }
    }

    if (gameObject.arrBulletsEnemies.length != 0) {
        let lasersN = document.querySelectorAll('.laser-enemie');
        for(let j = 0; j < gameObject.arrBulletsEnemies.length; j++) {
            console.log(gameObject.arrBulletsEnemies[j]);
            gameObject.arrBulletsEnemies[j].moveToBottom();
            lasersN[j].style.top = gameObject.arrBulletsEnemies[j].positionY;

        }
        //gameObject.stopLoopGame();
    }

}

const createElementDom = (elType, idName) => {
    const el = document.createElement(elType);
    el.id = idName;

    return el;
};

const insertElementInDom = (elParent, el) => {
    elParent.appendChild(el);
};

const createMainScreenGame = (el) => {
    el.style.width = gameObject.width;
    el.style.height = gameObject.height;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
};

const createEnnemies = () => {
    let initX = 50;
    let initY = 50;
    for (let j = 0; j < gameObject.nbrEnemies; j++) {
        let enemie = 'enemie-' + j;

        let ship = new ShipEnemie(initX, initY, 40, 30);
        let elShip = createElementDom('img', enemie);

        elShip.src = ship.imgSrc;
        elShip.style.position = 'absolute';
        elShip.style.width = ship.width;
        elShip.style.height = ship.height;

        elShip.style.top = ship.positionY;
        elShip.style.left = ship.positionX;
        gameObject.arrEnemies.push(ship);
        insertElementInDom(mainScreenById, elShip);
        ship.refId = document.getElementById(elShip.id);
        initX += ship.width + 20;
    };
};

const createPlayer = () => {
    const elImg = createElementDom('img', 'player');
    elImg.src = player.imgSrc;

    elImg.style.position = 'absolute';
    elImg.style.transformOrigin = 'center';
    elImg.style.top = player.positionY;
    elImg.style.left = player.positionX;
    insertElementInDom(mainScreenById, elImg);
    player.ref = document.getElementById(elImg.id);
}

const createLaser = () => {
    let indexLaser;
    if (gameObject.arrBulletsPlayers.length == 0) {
        indexLaser = 0;
    } else {
        indexLaser = gameObject.arrBulletsPlayers.length;
    }
    const el = new Laser(player.positionX + (player.width / 2) - 3, player.positionY - (player.height / 2) - 20);
    let elDom = document.createElement('img');
    elDom.style.opacity = 0;
    elDom.src = el.imgSrc;
    elDom.id = 'laser-' + indexLaser;
    el.refId = elDom.id;
    elDom.classList.add('laser-player');
    elDom.style.position = 'absolute';
    elDom.style.transformOrigin = 'center';

    elDom.style.width = el.width;
    elDom.style.height = el.height;
    elDom.style.left = el.positionX;
    elDom.style.top = el.positionY;
    elDom.style.opacity = 1;
    mainScreenById.appendChild(elDom);
    el.ref = document.getElementById(elDom.id);
    return el;
};

const createEnemiesLasers = (enemieShip) => {
    console.log(enemieShip);
    let indexTab;
    if(gameObject.arrBulletsEnemies.length == 0) {
        indexTab = 0;
    } else {
        indexTab = gameObject.arrBulletsEnemies.length;
    }
    let laserN = new Laser(enemieShip.positionX + (enemieShip.width/2) -3, enemieShip.positionY + enemieShip.height ) ;

    let laserId = 'laser-enemie-'+indexTab;
    let laserNdom = createElementDom('img', laserId );
    laserNdom.src ='./src/images/laser-green-11.png';
    laserNdom.classList.add('laser-enemie');
    laserNdom.style.position = 'absolute';
    laserNdom.style.transformOrigin = 'center';
    laserNdom.style.transform = 'rotate(180deg)';
    laserNdom.style.width = laserN.width;
    laserNdom.style.height = laserN.height;
    laserNdom.style.top = laserN.positionY;
    laserNdom.style.left = laserN.positionX;

    console.log('laserDomN X: ', laserNdom.style.left + 'laser X: ', laserN.positionX);
    mainScreenById.appendChild(laserNdom);
    laserN.ref = document.getElementById(laserNdom.id);
    laserN.refId = laserNdom.id;
    console.log(laserNdom)
    gameObject.arrBulletsEnemies.push(laserN);
}

const ckeckColision = () => {
    console.log('checkColision');
    // check laser on ennemie

    if (gameObject.arrBulletsPlayers.length != 0 && gameObject.arrEnemies.length != 0) {
        for (let i = 0; i < gameObject.arrBulletsPlayers.length; i++) {
            for (let j = 0; j < gameObject.arrEnemies.length; j++) {
                console.log('laser Y: ', gameObject.arrBulletsPlayers[i].positionY + 'laser X: ', gameObject.arrBulletsPlayers[i].positionX);
                console.log('ennemie Y: ', gameObject.arrEnemies[j].positionY + 'ennemie X: ', gameObject.arrEnemies[j].positionX);
                if (
                    gameObject.arrBulletsPlayers[i].positionY <= gameObject.arrEnemies[j].positionY + gameObject.arrEnemies[j].height &&
                    gameObject.arrBulletsPlayers[i].positionX >= gameObject.arrEnemies[j].positionX &&
                    gameObject.arrBulletsPlayers[i].positionX <= gameObject.arrEnemies[j].positionX + gameObject.arrEnemies[j].width) {

                    gameObject.score += gameObject.arrEnemies[j].points;
                    console.log(gameObject.score);
                    

                    let enemie = gameObject.arrEnemies[j];
                    let enemieId = gameObject.arrEnemies[j].refId;
                    enemie.isCollised = true;

                    gameObject.arrEnemies.splice(j, 1);
                    enemieId.remove();

                    let laser = gameObject.arrBulletsPlayers[i];
                    let laserId = gameObject.arrBulletsPlayers[i].refId;
                    let laserRef = gameObject.arrBulletsPlayers[i].ref;
                    
                    laserRef.remove();
                    gameObject.arrBulletsPlayers.splice(i, 1);
                    
                }
            }
        }
    }

    if(gameObject.arrEnemies.length == 0) {
        gameObject.stopLoopGame;
        console.log('------ Level Complite ------')
    }
};

/************* GAME INIT ***********/
const gameInit = () => {
    //display header + panels
    document.getElementById('header').style.display = 'none';
    document.getElementById('panels').style.display = 'none';



    const mainScreen = createElementDom('div', 'main-screen');
    createMainScreenGame(mainScreen);
    insertElementInDom(elMain, mainScreen);
    mainScreenById = document.getElementById('main-screen');
    createPlayer();
    createEnnemies();
    gameObject.startLoopGame();
};

const listnerKeybord = (evt) => {
    console.log(evt.keyCode);
    /* yop:38 bottom: 40,  left: 37, right: 39, spacebar: 32*/

    switch (evt.keyCode) {
        case 38: {
            player.moveToTop();

            break;
        }

        case 40: {
            player.moveToBottom();

            break;
        }

        case 37: {
            player.moveToLeft();

            break;
        }

        case 39: {
            player.moveToRight();
            break;
        }

        case 32: {
            const laser = createLaser();
            gameObject.arrBulletsPlayers.push(laser);
            console.log(gameObject.arrBulletsPlayers);
            break;
        }
    }
    console.log(player);
};



window.addEventListener('keydown', listnerKeybord);

gameInit();