console.log('gamejs');

class Game {
    constructor(difficulty, level = 1) {
        this.level = level;
        this.difficulty = difficulty;
        this.width = 800;
        this.height = 600;

        this.arrEnemies = [];
        this.arrBulletsEnemies = [];
        this.arrBulletsPlayers = [];

        this.gameIsOver = false;
        this.score = 0;
        this.time = 0;
        this.lastTime = new Date().setMinutes(3);
        this.nbrEnemies = 12 * this.level;

        this.intervalId = 0;

        difficulty === "easy" ? this.nbrLife = 5 : difficulty === "medium" ? this.nbrLife = 4 : this.nbrLife = 3;

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

    resetLoopGame() {
        this.intervalId = 0;
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

        /*
        this.positionX = posX;
        this.positionY = posY;
        this.width = width;
        this.height = height;
        */
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
        this.isBlocked = false;
        this.haveMove = false;
        this.imgSrc = './src/images/enemy-black-1.png';
        this.refId = '';
        this.points = 100;
        this.index = gameObject.arrEnemies.push(this) - 1;

        this.isCollised = false;
    }

    moveToBottom() {
        if (this.haveMove) return;
        if (this.positionY != gameObject.height - 50) {
            this.positionY += 5;
        }
        this.haveMove = true;
        setTimeout(() => {
            this.haveMove = false;
        }, 2000);
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
        if (this.isBlocked) return;
        let indexTab;
        if (gameObject.arrBulletsEnemies.length == 0) {
            indexTab = 0;
        } else {
            indexTab = gameObject.arrBulletsEnemies.length;
        }
        let laserN = new Laser(this.positionX + (this.width / 2) - 3, this.positionY + this.height, 'n', this.index);

        /*
        let laserId = 'laser-enemie-' + indexTab;
        let laserNdom = createElementDom('img', laserId);
        laserNdom.src = './src/images/laser-green-11.png';
        laserNdom.classList.add('laser-enemie');
        laserNdom.style.position = 'absolute';
        laserNdom.style.transformOrigin = 'center';
        laserNdom.style.transform = 'rotate(180deg)';
        laserNdom.style.width = laserN.width;
        laserNdom.style.height = laserN.height;
        laserNdom.style.top = laserN.positionY;
        laserNdom.style.left = laserN.positionX;
        mainScreenById.appendChild(laserNdom);
        laserN.ref = document.getElementById(laserNdom.id);
        laserN.refId = laserNdom.id;
        gameObject.arrBulletsEnemies.push(laserN);
        */
        this.isBlocked = true;
        setTimeout(() => {
            this.isBlocked = false;
        }, 500);

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

    destroy() {
        console.log(this);
        //gameObject.arrEnemies.splice(this.index, 1);

        if (this.isCollised === true) {
            //this.gameObject.score += this.points; 
            //this.isCollised = true;

            //gameObject.arrEnemies.splice(this.index, 1);
            this.ref.remove();
        }


        //gameObject.stopLoopGame();
    }
}


class Laser extends objElGame {
    constructor(posX, posY, type, imgSrc, propLaser) {
        super(posX, posY);
        this.width = 6;
        this.height = 20;
        this.refId = '';
        this.ref = '';
        this.type = type;
        this.isToofar = false;
        this.index = this.type === 'p' ?
            'player' :
            propLaser;

        //this.frameId = requestAnimationFrame(this.checkCollision);
        this.imgSrc = this.type === 'p' ?
            "./src/images/laser-blue-1.png" :
            "./src/images/laser-green-11.png";
        this.index = this.type === 'p' ?
            gameObject.arrBulletsPlayers.push(this) - 1 :
            gameObject.arrBulletsEnemies.push(this) - 1;

        this.element = this.type === "p" ? this.createElementDomP() : this.createElementDomN();
        //this.element = this.type === "n" ? this.createElementDomN() : null;

    }

    createElementDomP() {

        const elDom = document.createElement('img');
        elDom.style.opacity = 0;
        // elDom.src = el.imgSrc;
        elDom.src = this.imgSrc;
        elDom.id = 'laser-' + this.index;
        //el.refId = elDom.id; 
        elDom.classList.add('laser-player');

        elDom.style.position = 'absolute';
        elDom.style.transformOrigin = 'center';

        elDom.style.width = this.width;
        elDom.style.height = this.height;
        elDom.style.left = this.positionX;
        elDom.style.top = this.positionY;
        elDom.style.opacity = 1;

        return mainScreenById.appendChild(elDom);

    }

    createElementDomN() {

        const elDom = document.createElement('img');
        elDom.style.opacity = 0;
        elDom.src = this.imgSrc;
        elDom.id = 'laser-' + this.index;
        elDom.classList.add('laser-enemie');
        elDom.style.position = 'absolute';
        elDom.style.transformOrigin = 'center';
        elDom.style.transform = 'rotate(180deg)';

        elDom.style.width = this.width;
        elDom.style.height = this.height;
        elDom.style.left = this.positionX;
        elDom.style.top = this.positionY;
        elDom.style.opacity = 1;
        return mainScreenById.appendChild(elDom);
    }

    checkCollision = () => {
        //console.log("tick"
        /*
        gameObject.stopLoopGame();
        */
        if (this.isToofar) {
            this.destroy();
        }
        if (this.type == 'n') {


            if (
                this.positionX < player.positionX + player.width &&
                this.positionX + this.positionX > player.positionX &&
                this.positionY < player.positionY + player.height &&
                this.height + this.positionY > player.positionY &&
                this.isCollised === false

                // this.positionY + (this.height/2) > player.positionY - (player.height/2)
                // && this.positionY - (this.height/2) < gameObject.height
                // && this.positionX > player.positionX - (player.width/2)
                // && this.positionX < player.positionX + (player.width/2)
            ) {

                this.isCollised = true;
                this.element.remove();
                gameObject.nbrLife -= 1;
                console.log(gameObject.nbrLife);
                if (gameObject.nbrLife < 0) {
                    divPanelMessage.innerHTML = createPanel('lose');
                    const btnReload = document.addEventListener('click', fctReloadPage);
                    divPanelMessage.classList.add('show');
                    gameObject.stopLoopGame();
                    gameObject.resetLoopGame();

                    //gameInit();
                }
            }

            /*
            gameObject.stopLoopGame();
            */

        } else {
            console.log('player colision');
            console.log(this);
            /*
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
            */
            /*
            if(
                gameObject.arrBulletsPlayers[i].positionY <= gameObject.arrEnemies[j].positionY + gameObject.arrEnemies[j].height &&
                    gameObject.arrBulletsPlayers[i].positionX >= gameObject.arrEnemies[j].positionX &&
                    gameObject.arrBulletsPlayers[i].positionX <= gameObject.arrEnemies[j].positionX + gameObject.arrEnemies[j].width)
                {}
            gameObject.stopLoopGame();
            */
        }
        requestAnimationFrame(this.checkCollision);

    }

    moveToTop() {
        //console.log('in moveTo', this, +' ' + this.type)
        if (this.positionY < 0 && this.type === 'p') {
            this.element.style.display = 'none';
            this.isToofar = true;
            //this.destroy();
        } else {
            this.positionY -= 5;

        }



        //this.checkCollision();
        //gameObject.stopLoopGame();
    }

    moveToBottom() {

        if (this.positionY > gameObject.height && this.type === 'n') {
            this.element.style.display = 'none';
            this.isToofar = true;

            //this.destroy();
        } else {
            this.positionY += 5;
        }

        this.checkCollision();


        //this.checkCollision();
        //if ("check pos vs container");
    }

    destroy() {
        // delete dqns le tablo avec son index
        if (this.type == 'n') {
            //console.log(this.index);
            //gameObject.arrBulletsEnemies.splice(this.index, 1);

            // delete du doc    

        } else {
            //console.log(this.index);
            //gameObject.arrBulletsPlayers.splice(this.index, 1);
            // delete du docu

        }
        this.element.remove();
        cancelAnimationFrame(this.frameId);
    }

    render() {
        //console.log(this.ref);


        if (this.type == 'p') {

            this.element.style.top = this.positionY;
            //gameObject.stopLoopGame();
        } else {

            this.element.style.top = this.positionY;

            //gameObject.stopLoopGame();
        }


    }
}

/*********CONST GAME *********/
var elMain = document.getElementById('main').childNodes[1];
//console.log(elMain)
var gameObject = new Game('easy');
//console.log(gameObject);

var mainScreenById;
var divMessagePanel;
var btnReload;

var player = new ShipPlayer((gameObject.width / 2), (gameObject.height - 50), 40, 30);

/*****************************/

const updateValue = () => {
    let lifes = gameObject.nbrLife;
    let lifesDom = document.querySelector('#zone-player .nbr-life');
    lifesDom.innerHTML = `${lifes}`;

    let score = gameObject.score;
    let scoreDom = document.querySelector('#zone-score .text');
    scoreDom.innerHTML = `${score}`;
    /******************************/
    /*
    console.log('gameObject.lastTime',gameObject.lastTime);

    const timeStart = gameObject.lastTime;
    console.log(timeStart);
    const timeStartSec = timeStart.getSeconds();
    const timeStartMin = timeStart.getMinutes();
    const time2 = new Date();
    //time2.setMinutes(5);
    
    let time2Min = time2.getMinutes();
    let time2Sec = time2.getSeconds();

    console.log('time2', timeStartMin - time2Min, timeStartSec -time2Sec);
    */
}

const actionEnnemies = () => {
    //console.log('actions ennemies');
    if (gameObject.arrEnemies.length != 0) {
        for (let i = 0; i < gameObject.arrEnemies.length; i++) {
            var enemieShip = gameObject.arrEnemies[i];
            if (gameObject.arrEnemies[i].positionX == player.positionX) {
                //gameObject.arrEnemies[i].shoot();
                //let enemieShipPositions = gameObject.arrEnemies[i].getPosition();
                let indexTab = gameObject.arrEnemies.indexOf(gameObject.arrEnemies[i])
                console.log(indexTab)
                //console.log(enemieShip);
                enemieShip.shoot();

                //createEnemiesLasers(enemieShip);


                //gameObject.stopLoopGame();
            }
            enemieShip.moveToBottom();

        }
    }
}

const renderElements = () => {
    const playerDom = player.ref;
    //console.log(player.ref);
    //console.log(player.getPosition());

    let playerPosition = player.getPosition();
    playerDom.style.left = playerPosition.posX;
    playerDom.style.top = playerPosition.posY;
    //console.log(playerDom.style.left);


    if (gameObject.arrBulletsPlayers) {

        //console.log(gameObject.arrBulletsPlayers);
        for (let i = 0; i < gameObject.arrBulletsPlayers.length; i++) {

            gameObject.arrBulletsPlayers[i].moveToTop();
            gameObject.arrBulletsPlayers[i].render();

            /*
            lasers[i].style.top = gameObject.arrBulletsPlayers[i].positionY;
            //console.log(gameObject.arrBulletsPlayers[i].positionY);
            if (gameObject.arrBulletsPlayers[i].positionY < 0) {
                let elDom = document.getElementById(gameObject.arrBulletsPlayers[i].refId);
                //elDom.remove();
                //gameObject.arrBulletsPlayers.splice(i, 1);

            }
            */
        }
        gameObject.arrBulletsPlayers = gameObject.arrBulletsPlayers.filter(e => !e.isToofar);

    }

    if (gameObject.arrBulletsEnemies.length != 0) {

        for (let j = 0; j < gameObject.arrBulletsEnemies.length; j++) {
            //console.log(gameObject.arrBulletsEnemies[j]);

            gameObject.arrBulletsEnemies[j].moveToBottom();
            gameObject.arrBulletsEnemies[j].render();


            /*
            lasersN[j].style.top = gameObject.arrBulletsEnemies[j].positionY;
            if (gameObject.arrBulletsEnemies[j].positionY > gameObject.height + (gameObject.arrBulletsEnemies[j].height)) {
                //console.log(gameObject.arrBulletsEnemies[j].positionY);
                let laserDomN = document.getElementById(gameObject.arrBulletsEnemies[j].refId);
                laserDomN.remove();
                gameObject.arrBulletsEnemies.splice(j, 1);
                //gameObject.stopLoopGame();
            }
            */
        }
        gameObject.arrBulletsEnemies = gameObject.arrBulletsEnemies.filter(e => !e.isToofar);
        //gameObject.stopLoopGame();
    }

    if (gameObject.arrEnemies.length != 0) {
        for (let k = 0; k < gameObject.arrEnemies.length; k++) {
            const shipDom = gameObject.arrEnemies[k].ref;
            //console.log(shipDom);
            shipDom.style.top = gameObject.arrEnemies[k].positionY;
        }
        gameObject.arrEnemies = gameObject.arrEnemies.filter(e => !e.isCollised);
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
        //gameObject.arrEnemies.push(ship);
        insertElementInDom(mainScreenById, elShip);
        ship.ref = document.getElementById(elShip.id);
        ship.refId = elShip.id;
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

const fctReloadPage = (evt) => {
    evt.preventDefault();
    window.location.reload();
}

const createLaser = (src, indexLaser) => {
    /*
    let indexLaser;
    if (gameObject.arrBulletsPlayers.length == 0) {
        indexLaser = 0;
    } else {
        indexLaser = gameObject.arrBulletsPlayers.length;
    }
    let laserType = 'p';
   */
    let elDom = document.createElement('img');
    elDom.style.opacity = 0;
    // elDom.src = el.imgSrc;
    elDom.src = src;
    elDom.id = 'laser-' + indexLaser;
    //el.refId = elDom.id;
    elDom.classList.add('laser-player');
    elDom.style.position = 'absolute';
    elDom.style.transformOrigin = 'center';

    elDom.style.width = el.width;
    elDom.style.height = el.height;
    elDom.style.left = el.positionX;
    elDom.style.top = el.positionY;
    elDom.style.opacity = 1;
    mainScreenById.appendChild(elDom);
    //el.ref = document.getElementById(elDom.id);

    return el;
};

const ckeckColision = () => {

    if (gameObject.arrBulletsPlayers.length != 0 && gameObject.arrEnemies.length != 0) {
        for (let i = 0; i < gameObject.arrBulletsPlayers.length; i++) {
            for (let j = 0; j < gameObject.arrEnemies.length; j++) {
                // console.log('laser Y: ', gameObject.arrBulletsPlayers[i].positionY + 'laser X: ', gameObject.arrBulletsPlayers[i].positionX);
                // console.log('ennemie Y: ', gameObject.arrEnemies[j].positionY + 'ennemie X: ', gameObject.arrEnemies[j].positionX);
                if (
                    gameObject.arrBulletsPlayers[i].positionY <= gameObject.arrEnemies[j].positionY + gameObject.arrEnemies[j].height &&
                    gameObject.arrBulletsPlayers[i].positionX >= gameObject.arrEnemies[j].positionX &&
                    gameObject.arrBulletsPlayers[i].positionX <= gameObject.arrEnemies[j].positionX + gameObject.arrEnemies[j].width) {

                    let enemie = gameObject.arrEnemies[j];
                    let enemieId = gameObject.arrEnemies[j].ref;
                    if (enemie.isCollised === false) {
                        gameObject.score += gameObject.arrEnemies[j].points;
                    }

                    enemie.isCollised = true;
                    enemie.destroy();
                    gameObject.arrBulletsPlayers[i].isCollised = true;
                    gameObject.arrEnemies.splice(j, 1);

                    if (gameObject.arrEnemies.length == 0) {
                        gameObject.gameIsOver = true;
                        divMessagePanel.innerHTML = createMessagePanel('victory');
                        divMessagePanel.classList.add('show');
                        gameObject.stopLoopGame();
                        gameObject.resetLoopGame();
                    }
                }
            }
        }
    }

    if (gameObject.arrBulletsEnemies.length != 0) {
        let bulletsToRemove = [];
        let indexOfEl;
        for (let d = 0; d < gameObject.arrBulletsEnemies.length; d++) {
            if (gameObject.arrBulletsEnemies[d].positionY >= (player.positionY - player.height) + (gameObject.arrBulletsEnemies[d].height / 2) &&
                gameObject.arrBulletsEnemies[d].positionX >= player.positionX &&
                gameObject.arrBulletsEnemies[d].positionX <= player.positionX + player.width) {

                gameObject.nbrLife -= 1;
                if (gameObject.nbrLife < 0) {
                    gameObject.gameIsOver = true;
                    //console.log(divMessagePanel);
                    divMessagePanel.innerHTML = createMessagePanel('lose');

                    divMessagePanel.classList.add('show');
                    btnReload = document.getElementById('btn-reload');
                    btnReload.addEventListener('click', fctRealodPage);
                    gameObject.stopLoopGame();
                    gameObject.resetLoopGame();

                }
            }
        }

        if (gameObject.arrEnemies.length == 0) {

        }
    };

    const fctRealodPage = (evt) => {
        evt.preventDefault();
        window.location.reload();
    }

    const createMessagePanel = (type) => {
        var el;

        if (type == 'lose') {
            el = `<h3>GAME OVER !</h3><p>You lose ! You have lost all your life</p><button id="btn-reload" type="button" class="btn">Try again ?</button>`;
        } else {
            el = `<h3>VICTORY !</h3><p>You won ! You have killed all aliens bfore they destroy the earth</p><button id="btn-next" type="button" class="btn">Go next level</button>`;
        }

        return el;
    }
};

/************* GAME INIT ***********/
const gameInit = () => {
    //display header + panels
    let header = document.getElementById('header');
    header.classList.remove('header-intro');
    header.classList.add('header-game');
    header.innerHTML = `<div class="flex-h-between">
    <div id="zone-player">
        <h3 class="title-menu">PLAYER: </h3>
        <p class="text flex-left"><span class="nbr-life">${gameObject.nbrLife}</span> X <img class="img-life" src="./src/images/player-orange-2.png"></p>
    </div>
    <div id="zone-time">
        <h3 class="title-menu">TIME</h3>
        <p class="text">${gameObject.time}</p>
    </div>
    <div id="zone-score">
        <h3 class="title-menu">SCORE</h3>
        <p class="text">${gameObject.score}</p>
    </div></div>`;
    document.getElementById('panels').style.display = 'none';

    let messagePanel = document.createElement('div');
    messagePanel.id = 'panel-message';
    messagePanel.classList.add('panel');
    messagePanel.innerHTML = '';

    const mainScreen = createElementDom('div', 'main-screen');
    createMainScreenGame(mainScreen);
    insertElementInDom(elMain, mainScreen);
    mainScreenById = document.getElementById('main-screen');
    mainScreenById.style.margin = '0 auto';

    mainScreenById.appendChild(messagePanel);
    divMessagePanel = document.getElementById('panel-message');

    createPlayer();
    createEnnemies();
    //console.log('nbrLife: ', gameObject.nbrLife);
    gameObject.startLoopGame();
};

const listnerKeybord = (evt) => {
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
            new Laser(player.positionX + (player.width / 2) - 3, player.positionY - (player.height / 2) - 20, "p").moveToTop();
            break;
        }
    }
    //console.log(player);
};

window.addEventListener('keydown', listnerKeybord);

gameInit();