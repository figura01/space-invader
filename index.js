//import gameInit from './src/js/game';

let initStateGame = {
    playerPsedo: '',
    difficulty: '',
};

const liLevel = document.querySelectorAll('.level');
const btnStart = document.getElementById('btn-start');
const btnInstruction = document.getElementById('btn-instruction');
const btnValidate = document.getElementById('btn-validate');
const btnBack = document.getElementsByClassName('btn-back');

const panelGame = document.getElementById('panel-game');
const panelInstuction = document.getElementById('panel-instruction');
const panelPsedo = document.getElementById('panel-psedo') ;

/**************************************************** */
const selectLevel = (evt) => {
    evt.preventDefault();
    const target = evt.target;
    console.log(target.parentNode);
    console.log(target.parentNode.querySelector('.radio').id);
    
    switch(target.parentNode.querySelector('.radio').id) {
        case 'easy': {
            target.parentNode.querySelector('.radio').checked = true;
            initStateGame.difficulty = 'easy';
            break;
        }

        case 'medium': {
            target.parentNode.querySelector('.radio').checked = true;
            initStateGame.difficulty = 'medium';
            break;
        }

        case 'hard': {
            target.parentNode.querySelector('.radio').checked = true;
            initStateGame.difficulty = 'hard';
            break;
        }
    }
    console.log(stateGame);
};


liLevel.forEach(li => {li.addEventListener("click", selectLevel)});
console.log(liLevel);

const showPanel = (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    let target = evt.target;
    if(target.id == 'btn-start') {
        panelGame.classList.remove('active');
        panelGame.classList.add('hidden');

        panelPsedo.classList.remove('hidden');
        panelPsedo.classList.add('active');
    } 
    
};

const registerPsedo = (evt) => {
    let target = evt.target;
    let inputPsedo = document.getElementById('input-psedo');
    if(inputPsedo.value){
        // console.log(inputPsedo.value);
        stateGame.playerPsedo = inputPsedo.value;
        gameInit(initStateGame);
    }
};

btnInstruction.addEventListener('click', showPanel);
btnStart.addEventListener('click', showPanel);
btnValidate.addEventListener('click', registerPsedo);





