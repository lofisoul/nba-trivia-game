var trivia = [
  {
    question: 'What city was home to the Lakers before the team moved to Los Angeles?',
    answer: 'Minneapolis',
    options: ['Kansas City','Minneapolis','Miami','Baltimore'],
    factoid: 'The Lakers moved from Minneapolis to Los Angeles in 1960',
    image: 'http://gifrific.com/wp-content/uploads/2012/12/Lakers-Fan-Takes-Off-Sunglasses.gif'
  },
  {
    question: 'Which NBA team lost the NBA Finals after being up 3-1 in the series?',
    answer: 'The Warriors',
    options: ['The Jazz','The Rockets','The Warriors','The Bulls'],
    factoid: 'The Warriors became the first team in NBA history to lose a Finals after being up 3 games to 1.',
    image: 'https://media.giphy.com/media/xT8qBjNjVELuZN2eGY/giphy.gif'
  },
  {
    question: 'Which NBA franchise has the most NBA titles?',
    answer: 'Boston Celtics',
    options: ['San Antonio Spurs','Boston Celtics','Los Angeles Lakers','Chicago Bulls'],
    factoid: 'The Celtics have won 17 NBA championships. The Lakers are in second with 16.',
    image: 'https://media.giphy.com/media/sQpl7yebgk3Pq/giphy.gif'
  },
  {
    question: 'Who is the NBA\'s all time leading shot-blocker?',
    answer: 'Hakeem Olajuwon',
    options: ['Dikembe Mutumbo','Bill Russell','Kareem Abdul-Jabbar','Hakeem Olajuwon'],
    factoid: '\'The Dream\' posted 3,830 blocks over his career.',
    image: 'http://i304.photobucket.com/albums/nn200/nbacardDOTnet/zz%20NBA%20Photo%20Gallery/Hakeem%20Olajuwon/VS/Abdul-Jabbar/8fdh54747.gif'
  },
  {
    question: 'Who was the last player to average a triple double for a season?',
    answer: 'Oscar Robertson',
    options: ['Michael Jordan','Oscar Robertson','Magic Johnson','Lebron James'],
    factoid: 'Oscar Robertson is the only NBA player in history to average a triple double for the season.',
    image: 'https://media.giphy.com/media/ey4n1uHjW9NDi/giphy.gif'
  },
  {
    question: 'Wilt Chamberlain scored 100 in a game. Who has the next highest point total in a game?',
    answer: 'Kobe Bryant',
    options: ['Kobe Bryant','Lebron James','Michael Jordan','Larry Bird'],
    factoid: 'Kobe scored 81 in a game against the Toronto Raptors.',
    image: 'http://www.steveaoki.com/site/wp-content/uploads/2015/11/kobe-gif-5.gif'
  }

]

var timer;

var game = {
  rightAnswers: 0,
  wrongAnswers: 0,
  noGuess: 0,
  gameClock: 24,
  questionCounter: 0,
  initGame: function(){
    $('.game-window .inner').html('<h1>NBA Trivia</h1><p>Test your knowledge of the NBA!</p><button class="button start-game">Start Game</button>')
  },
  startGame: function() {
    game.generateQuestion();
    game.setTimer();
  },
  generateQuestion: function() {
    $('.game-window .inner').html('<h3>Timer: <span class="timer">' + game.gameClock + '</span></h3><p>' + trivia[game.questionCounter].question + '</p><ul class="answer-list"</ul>');
    for (i=0; i<trivia[game.questionCounter].options.length; i++) {
      $('.answer-list').append('<li class="choice">' + trivia[game.questionCounter].options[i] + '</li>');
    }
  },
  answerQuestion: function(){
      var selectedAnswer = $(this).text();
      if (selectedAnswer === trivia[game.questionCounter].answer) {
        game.correctAnswer();
      }
      else {
        game.wrongAnswer();
      }
  },
  correctAnswer: function(){
    clearInterval(timer);
    game.rightAnswers++;
    $('.game-window .inner').html('<h1>Correct!</h1><p>'+trivia[game.questionCounter].factoid +'</p><img src="'+ trivia[game.questionCounter].image+'">');
    setTimeout(game.gameEngine,4000);
  },
  wrongAnswer: function(){
    clearInterval(timer);
    game.wrongAnswers++;
    $('.game-window .inner').html('<h1>Incorrect!</h1><p>The correct answer is '+ trivia[game.questionCounter].answer+'</p><p>'+trivia[game.questionCounter].factoid +'</p><img src="'+ trivia[game.questionCounter].image+'">');
    setTimeout(game.gameEngine,4000);
  },
  unanswered: function() {
    clearInterval(timer);
    game.noGuess++;
    $('.game-window .inner').html('<h1>Shot Clock Violation!</h1><p>The correct answer is '+ trivia[game.questionCounter].answer+'</p><p>'+trivia[game.questionCounter].factoid +'</p><img src="'+ trivia[game.questionCounter].image+'">');
    setTimeout(game.gameEngine,4000);
  },
  setTimer: function() {
    timer = setInterval(countdown, 1000);
	  function countdown() {
        if (game.gameClock === 0) {
          clearInterval(timer);
          game.unanswered();
        }
		    if(game.gameClock > 0) {
			      game.gameClock--;
		    }
		    $('.timer').html(game.gameClock);
	}

  },
  gameEngine: function() {

    if (game.questionCounter < trivia.length-1) {
      game.questionCounter++;
      game.gameClock = 24;
      game.generateQuestion();
      game.setTimer();
    }
    else {
      game.generateResults();
    }
  },
  generateResults: function() {
      $('.game-window .inner').html('<h1>The Final Buzzer!</h1><p>Here\'s how you did:</p><p>Correct Answers: '+game.rightAnswers+'</p><p>Wrong Answers: '+game.wrongAnswers+'</p><p>Unanswered: '+game.noGuess+'</p><button class="play-again">Play Again</button>');
  },
  resetGame: function(){
    game.questionCounter = 0;
    game.rightAnswers = 0;
    game.wrongAnswers = 0;
    game.noGuess =  0;
    game.gameClock =  24;
    game.initGame();
  }
}
//init game on page load
game.initGame();
//fire up the first question
$('.game-window').on('click', '.start-game', game.startGame);
//answer a question
$('.game-window').on('click','.choice', game.answerQuestion);
$('.game-window').on('click','.play-again', game.resetGame);
