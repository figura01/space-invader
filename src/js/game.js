let game = {
    level: '',
    nbrLive: '',
    width: 800,
    heigth: 600,
    arrEnemy: [],
    gameIsOver: false,
    score: 0,
    time: 0,
};

class Ship {
    constructor(name) {
        this.name =name;
        this.positionX = game.width /2;
        this.positionY = game.heigth -50;
        this.hp = 100;
        this.ref = '';
        this.lasers= []

        this.isCollised = false;
    }

    moveToTop() { 
        this.positionY -= 5;
    }

    moveToBottom() { 
        this.positionY += 5;
    }

    moveToLeft() { 
        this.positionX -= 5;
    }

    moveToRight() { 
        this.positionX += 5;
    }

    getPosition() {
        return { posX: this.positionX, posY:this.positionY };
    }

    shoot() {
        
    }

}

var player = new Ship('toto');


const gameInit = (initStateGame) => {
    console.log('game init');
    console.log(initStateGame);

    if(initStateGame.level =='easy') {
        game.nbrLive = 5;
    }

    let divGame = document.createElement('div');
    divGame.id ='main-screen';
    

    let elBody = document.getElementById('body');
    let elMain = document.getElementById('main');
    let elHeader = document.getElementById('header').style.display = 'none';
    let elPanels = document.getElementById('panels').style.display ='none';
    
    console.log(elMain.childNodes[1]);
    elMain.childNodes[1].appendChild(divGame);

    let mainScreen = document.getElementById('main-screen');
    mainScreen.style.width = 800 +'px';
    mainScreen.style.height = 600 +'px';
    mainScreen.classList.add('anim-bg');

    createPlayer(mainScreen);

};

const createPlayer = (screen) => {
    let imgPlayer = document.createElement('img');
    imgPlayer.id = 'player';

    imgPlayer.src = './src/images/player-orange-2.png';
    screen.appendChild(imgPlayer);

    const refShip = document.getElementById('player');
    console.log(refShip);
    player.ref = refShip;

    console.log(player.ref);
    imgPlayer.style.transform = `translate(${player.positionY}px, ${player.positionX}px)`;
}

gameInit({psedoPlayer: 'toto', level:'easy' });

const printMove = (ship, destination) => {
    let currentShip = ship;
    let domShip = ship.ref;

    let positions = ship.getPosition();
    console.log(positions);

    domShip.style.transform = `translate(${positions.posX}px, ${positions.posY}px)`;
}

const listnerKeybord =  (evt) => {
    console.log(evt.keyCode);
    /* yop:38 bottom: 40,  left: 37, right: 39, spacebar: 32*/

    switch(evt.keyCode) {
        case 38: {
            player.moveToTop();
            printMove(player);
            break;
        }

        case 40: {
            player.moveToBottom();
            printMove(player);
            break;
        }

        case 37: {
            player.moveToLeft();
            printMove(player);
            break;
        }

        case 39: {
            player.moveToRight();
            printMove(player);
            break;
        }

        case 32: {
            player.shoot();
            printMove(player);
            break;
        }
    }
};



window.addEventListener('keydown', listnerKeybord);
