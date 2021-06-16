'use strict';

//selecting elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currenScore0Element = document.getElementById('current--0');
const currenScore1Element = document.getElementById('current--1');
const btnNewElement = document.querySelector('.btn--new');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');

//initializing global variables and setting everything to zero
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
score0Element.textContent = 0;
score1Element.textContent = 0;


////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
//function to change activePlayer
const changeActivePlayer = () => {
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
}

//funciton for rolling the dice, called by eventlistener of btnRollElement
const btnRollClick = function () {
    //generating random dice
    let dice = Math.trunc(Math.random() * 6 + 1);

    //show dice image
    diceElement.src = `dice-${dice}.png`;
    diceElement.classList.remove('hidden');

    if (dice !== 1) {
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        changeActivePlayer();
    }
};

//btnHodlFunction 
const btnHoldFunction = function () {

    //add current score to scores on Hold
    scores[activePlayer] += currentScore;

    //check if the player has won
    if (scores[activePlayer] >= 100) {
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //add the winner class
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        //remove event listeners after winning
        btnRollElement.removeEventListener('click', btnRollClick);
        btnHoldElement.removeEventListener('click', btnHoldFunction);

    } else {
        //display the score of active player
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //set current score to zero
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        //and change the active player
        changeActivePlayer();
    }

}

//btnNewFunction
const btnNewFunction = function () {
    //reset everything to 0 at the start of the game
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore = 0;
    scores = [0, 0];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;

    //remove/ reset all classes from Players
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    diceElement.classList.add('hidden');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');

    //again add event listeners to roll and hold buttons
    btnRollElement.addEventListener('click', btnRollClick);
    btnHoldElement.addEventListener('click', btnHoldFunction);

    //set active player to 0 at start of the game
    activePlayer = 0;
}
//////////////////////////////////////////////FUNCTIONS END ///////////////////////////////////////////


//adding event listener to btnRollElement, btnHoldElement, and btnNewFuntion
btnRollElement.addEventListener('click', btnRollClick);
btnHoldElement.addEventListener('click', btnHoldFunction);
btnNewElement.addEventListener('click', btnNewFunction)

//extra functionality for Rules to show/hide
const rulesBtn = document.querySelector('.rules__btn');
const expandArrow = document.querySelector('.expand');
const rulesList = document.querySelector('.rules__list');

//adding event listener to Rules title 
rulesBtn.addEventListener('click', function () {
    expandArrow.classList.toggle('collapse');
    rulesList.classList.toggle('hidden');

})

//check for mobile users and display error
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var element = document.querySelector('body');
if (isMobile) {
    element.innerHTML = "This website is not optimized for mobile. Please use a Desktop";
    element.style.color = '#ddd';
    element.style.fontSize = '2rem';
    element.style.textAlign = 'center';
}