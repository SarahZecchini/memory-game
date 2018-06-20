// Declare Globally

// Array to Hold Cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards); //should detail 16 within array - confirmed

// Create Deck to Hold All Cards
const deck = document.getElementById("card-deck");

// Push Open Cards Here
var openedCards = [];

// Is it a Match???
let matchedCard = document.getElementsByClassName("match");

// Create move counters
let moves = 0;
let counter = document.querySelector(".moves");

// Create stars
const stars = document.querySelectorAll(".fa-star");

// List stars
let starsList = document.querySelectorAll(".stars li");

// Launch modal - Congrats window!
let modal = document.getElementById("modalStart")

// Close modal
let closeicon = document.querySelector(".close");


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


// On page load, shuffle cards
document.body.onload = startGame();


// Function to initiate game
function startGame() {
  // Call shuffle function
  cards = shuffle(cards);
  // Reset classes
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // Reset moves
  moves = 0;
  counter.innerHTML = moves;
  // Reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //Reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}


// Toggle classes to flip cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};


// Push opened cards to array
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  // Compare to determine match
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};


// Do they match?
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}


// They don't?
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}


// Temp disable cards
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}


// Enable matches
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}


// Count and time players moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  // Start timer, on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // Stars given based on number of moves
  if (moves > 10 && moves < 14) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 15) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}


// Timer function
var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


// Congratulations Function!
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // Show Modal on 16 matched cards
    modal.classList.add("show");

    // Star rating
    var starRating = document.querySelector(".stars").innerHTML;

    // Show move conter, star rating, final time
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    // Close modal
    closeModal();
  };
}


// Close modal
function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startGame();
  });
}


// Play again?
function playAgain() {
  modal.classList.remove("show");
  startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
