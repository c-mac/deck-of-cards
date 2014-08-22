cardLibrary = (function(){
  var library = {},
  
  /* Defaults for standard card library */
  config = {
    suits: {
      "c" : "Clubs",
      "d" : "Diamonds",
      "h" : "Hearts",
      "s" : "Spades"
    },
    ranks: {
      "a" : "Ace",
      "2" : "Two",
      "3" : "Three",
      "4" : "Four",
      "5" : "Five",
      "6" : "Six",
      "7" : "Seven",
      "8" : "Eight",
      "9" : "Nine",
      "10": "Ten",
      "j" : "Jack",
      "q" : "Queen",
      "k" : "King"
    },
    values: {
      "a" : 1,
      "2" : 2,
      "3" : 3,
      "4" : 4,
      "5" : 5,
      "6" : 6,
      "7" : 7,
      "8" : 8,
      "9" : 9,
      "10" : 10,
      "j" : 11,
      "q" : 12,
      "k" : 13
    },
    numDecks : 1
  };
  
  /* Allow users to see library defaults */
  library.getConfig = function() {
    return config;
  }
  
  /* Change value of an existing card */
  library.setValue = function(key, value) {
    if (config.values.hasOwnProperty(key)) {
      config.values[key] = value;
    }
  }
  
  /* Change default number of decks to be used */
  library.setDecks = function(n) {
    if (n % 1 === 0) {
      config.numDecks = n;
    }
  }
  
  library.Card = Card;
  
  /* Constuctor for Card object */
  function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = config.values[rank];
    this.faceUp = false;
  }
  
  /* Method to flip card - state captured by boolean */
  Card.prototype.flip = function() {
    this.faceUp = !this.faceUp;
  }

  /* Return a display string that can be used to print 
     English representation of card */
  Card.prototype.displayString = function() {
    return config.ranks[this.rank] + " of " + config.suits[this.suit] + " is worth " + this.value;
  }

  /* Return an integer that represent whether this card is 
     greater, less, or equal to an input card */
  Card.prototype.compare = function(otherCard) {
    if (this.value > otherCard.value) {
      return 1;
    }
    else if (this.value < otherCard.value) {
      return -1;
    }
    else {
      return 0;
    }
  }
  
  
  library.CardStack = CardStack;

  /* Constructor for CardStack object */
  function CardStack(decks) {
    if (decks % 1 === 0) {
      this.numDecks = decks;
    }
    else {
      this.numDecks = config.numDecks;
    }
    this.cards = [];
    this.init();
  }
  
  /* Initialize stack based on library config */
  CardStack.prototype.init = function() {
    for (var i = 0; i < this.numDecks; i++) {
      for (var suit in config.suits) {
        for (var rank in config.ranks) {
          this.cards.push(new Card(rank,suit));
        }
      }
    }
  }
  
  /* Iteratively print contents of stack */
  CardStack.prototype.print = function() {
    for (var i = 0, x = this.cards.length; i < x; i++) {
      console.log(this.cards[i].displayString());
    }
  }
  
  /* Shuffle the CardStack, user can input number of shuffles
     and/or a custom shuffling algorithm. */
  CardStack.prototype.shuffle = function(n, func) {
    var shuffles = 7;
    if (n%1 === 0) {
      shuffles = n;
    }
    // default shuffling algorithm
    function fisherYates(a) {
      console.log("Starting good shuffle!");
      for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = a[i];
          a[i] = a[j];
          a[j] = temp;
      }  
    }
  
    if (!func || typeof func == "undefined") {
      func = fisherYates;
    }
    
    while (shuffles > 0) {
      func.call(this, this.cards);
      shuffles--;
    } 
  }
  
  /* Deal one card from the top of the stack */
  CardStack.prototype.deal = function() {
    if (this.cards.length > 0) {
      return this.cards.shift();
    }
    else {
      return null;
    }
  }
  
  /* Change the numeric value of all cards in the stack at runtime */
  CardStack.prototype.setValue = function(key, value) {
    for (var i = 0, x = this.cards.length; i < x; i++) {
      if (this.cards[i].rank === key) {
        this.cards[i].value = value;
      }
    }
  }
    
  return library;
})();



// REALLY bad shuffle
function badShuffle(a) {
  console.log("Starting bad shuffle...");
  var temp = a[0];
  a[0] = a[a.length-1];
  a[a.length-1] = temp;
}

// create our cardLibrary, declare a deck
var lib = cardLibrary,
    deck;
    
// set value of cards before deck is created
    //lib.setValue("5", 10);
    //lib.setValue("q", 1);

// create a deck using the library, shuffle it 5 times using a bad algorithm
deck = new lib.CardStack();
deck.shuffle(5, badShuffle);
deck.print();

// now lets do a better shuffle
deck.shuffle();
deck.print();


// quick comparison tests
    //console.log(deck.cards[13].compare(deck.cards[12]));
    //console.log(deck.cards[12].compare(deck.cards[13]));
    //console.log(deck.cards[13].compare(deck.cards[13]));

// set value of cards in existing deck
   //deck.setValue("q", 50);





