'use strict';

// selecting element 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition 
let currentScore,activePlayer,playing,scores;
const init = function () {
 scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;

 score0El.textContent = 0;
 score1El.textContent = 0;
 current0El.textContent = 0;
 current1El.textContent = 0;

 diceEl.classList.add('hidden');
 player0El.classList.remove('player--winner');
 player1El.classList.remove('player--winner');
 player0El.classList.add('player--active');
 player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0 ;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rolling dice of funcionality 

 btnRoll.addEventListener('click', function () {
  if (playing) {
  // Generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // check for dice roll
  if (dice !== 1) {
  // Add dice to current score

  currentScore += dice;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  // current0El.textContent = currentScore; //change later
  } else {
// switch player 
  switchPlayer();
  }
}
});

btnHold.addEventListener('click', function () {
  // Adding current score to active player 
  if (playing) {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // if check player score >= 100 ;
   if (scores[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.remove('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  }else {
  // switch player 
  switchPlayer();
  }
}
});

btnNew.addEventListener('click', init);