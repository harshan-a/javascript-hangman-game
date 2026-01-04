import {wordsList} from '../data/data.js';


renderPage();
function renderPage() {
  const randomObj = selectRandomObj();
  const randomWord = randomObj.word;
  let incorrectCount = 0;
  let matchCount = 0;
  console.log(randomWord);
  console.log(randomWord.length);

  const pageHTML = `
    <div class="container">
      <div class="hangman-column">
        <img src="data/images/hangman-0.svg">
        <p>HANGMAN GAME</p>
      </div>
      <div class="details-column">
        <ul class="word-list">${randomObj.generateWordListHTML()}</ul>
        <p class="hint">
          Hint: <span>${randomObj.hint}</span>
        </p>
        <p class="incorrect-guess"></p>
        <div class="btn-list">${generatebtns()}</div>
        <button class="play-again shuffle">Shuffle</button>
      </div>
    </div>
    <div class="game-over"></div>
  `;
  const wrapperElem = document.querySelector('.wrapper');
  wrapperElem.innerHTML = pageHTML;

  const gameOverElem = document.querySelector('.game-over');
  const shuffleBtn = document.querySelector('.shuffle');
  shuffleBtn.addEventListener('click', renderPage);

  document.querySelectorAll('.btn-list button').forEach(btn => {
    btn.addEventListener('click', clickEvent);
  })
  
  
  function selectRandomObj() {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };

  function generatebtns() {
    let btnListHTML = '';
    for(let i = 97; i <= 122; i++) {
      const char = String.fromCharCode(i).toLocaleUpperCase();
      btnListHTML += `<button>${char}</button>`;
    };

    return btnListHTML;
  };

  function generateIncorrectHTML() {
    document.querySelector('.incorrect-guess')
      .innerHTML = `Incorrect guesses: <span>${incorrectCount}/6</span>`;
    
    document.querySelector('.hangman-column img').src = `
      data/images/hangman-${incorrectCount}.svg
    `;
  }
  generateIncorrectHTML();

  function generateGameOverHTML(param) {
    gameOverElem.innerHTML = `
      <span>${param === 1 ? 'You win' : 'Game Over'}</span>
      <img src="data/images/${param === 1 ? 'victory' : 'lost'}.gif">
      <button class="play-again js-play-again">Play Again</button>
    `;

    document.querySelector('.js-play-again')
      .addEventListener('click', renderPage);
  }

  function clickEvent(e) {
    const btn = e.target;
    const btnText = btn.innerText.toLocaleLowerCase();

    let match = false;
    randomWord.split('').forEach((char, i) => {
      if(btnText === char) {
        match = true;
        matchCount++;
        const listTag = document.querySelectorAll('.word-list li')[i];
        listTag.innerText = char;
        listTag.classList.add('guessed');
        btn.classList.add('guessed');
      }
    })

    !match && incorrectCount++;
    if(incorrectCount === 6) {
      generateGameOverHTML(0);
      gameOverElem.classList.add('game-over-render');

    } else if(matchCount === randomWord.length) {
      generateGameOverHTML(1);
      gameOverElem.classList.add('game-over-render');
    }

    generateIncorrectHTML();
  }

};

