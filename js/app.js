let cards = [ 'あ', 'あ', 'い', 'い','う','う','え','え','お','お','か','か','き','き','く','く','け','け','こ','こ'];
const matchedCards = [];
let numberOfMatches = 0;
// const  $flip = $('.flip').get(0);
let card1 = null;
let card2 = null;
let numberOfclicks = 0;
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$(() => {
  console.log('Ready.');
  const $clickDisplay = $('#clickCounter');
  let scores = null;
  let time = null;
  const $score = $('.score');
  const $board = $('ul');
  const $pika = $('.pika').get(0);
  const $zenMusic = $('.zenSong').get(0);
  const $justPikaButton = $('#justPika');
  const $timeOnScreen = $('#timeDisplay');
  const $startTheGame =$('#startGame');















  function createBoard() {
    $board.empty();
    cards = shuffle(cards);
    cards.forEach(() => {
      $('<li/>').appendTo($board);
    });
  }

  function beginPika () {
    $pika.play();
    $zenMusic.play();
    $('html, body').animate({
      scrollTop: $('#startScreen').offset().top
    }, 2000);

  }

  function timeOn() {

    setInterval(() => {
      time++;
      $timeOnScreen.text(time);
      //$pika.play();


    }, 1500); //give more time to think :)

  }


  function restart() {
    numberOfMatches = 0;
    scores = 0;
    numberOfclicks = 0;
    time = 0;
    $score.text(scores);

    createBoard();
  }

  function flipCardBack() {
    card1.text('');
    card2.text('');
    card1 = null;
    card2 = null;
    $('.selected').removeClass('selected');
    if(numberOfMatches * 2 === cards.length) {
      restart();
    }
  }
  restart();
  $justPikaButton.on('click' , beginPika);
  $startTheGame.on('click' , timeOn);
  $board.on('click', 'li', pickTwoCards);

  function pickTwoCards() {

    const index = $(this).index();
    const letter = cards[index];
    const  $flip = $('.flip').get(0);
    const $pikachu = $('.pikachu').get(0);
    numberOfclicks++;
    $clickDisplay.text(numberOfclicks);
    if(card1 && card2 || $(this).hasClass('correct')) return false;
    $(this).text(letter);

    if (!card1){
      card1 = $(this);
      $(this).addClass('selected');

      $flip.play();


    } else if(this !== card1[0]) {
      card2 = $(this);
      $(this).addClass('selected');
      $flip.play();
      if (card1.text() === card2.text()) {
        matchedCards.push(card1.text(), card2.text());
        scores++;
        $('.selected').removeClass('selected').addClass('correct');
        $score.text(scores);
        numberOfMatches++;
        $pikachu.play();

        if (numberOfMatches === 10) {

          restart();
        }
      }
      setTimeout(flipCardBack, 1500);
    }
  }
});
//
