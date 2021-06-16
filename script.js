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

//initializing everything
score0Element.textContent = 0;
score1Element.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

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

//adding event listener to btnRollElement
btnRollElement.addEventListener('click', btnRollClick);

btnHoldElement.addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        btnRollElement.removeEventListener('click', btnRollClick);
    } else {
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        changeActivePlayer();
    }

});

btnNewElement.addEventListener('click', function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    diceElement.classList.add('hidden');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
})

//extra functionality
const rulesBtn = document.querySelector('.rules__btn');
const expandArrow = document.querySelector('.expand');
const rulesList = document.querySelector('.rules__list');

rulesBtn.addEventListener('click', function () {
    expandArrow.classList.toggle('collapse');
    rulesList.classList.toggle('hidden');

})