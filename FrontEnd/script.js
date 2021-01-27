var givenWord;

function resetInputs() {
    document.getElementById('guessedLetters').textContent = '';
    document.getElementById('livesLeft').textContent = '';
    document.getElementById('guessInput').value = '';
}

function startNewPlaySession() {
    let url = 'http://localhost:3333/player';
    fetch(url).then(response => {
        return response.json();
    }).then(player => {
        console.log(player);
        document.getElementById('playing').style.display = "block";
        document.getElementById('playBtn').textContent = "Play again?";
        let livesLeft = document.getElementById('livesLeft');
        let info = player.data;
        let text = document.createElement('label');
        text.innerText = info.lives;
        livesLeft.append(text);
    });
}

function getRandomWord() {
    let url = 'http://localhost:3333/word';
    fetch(url).then(response => {
        return response.json();
    }).then(player => {
        let label = document.getElementById('wordLabel');
        label.textContent = "";
        let word = player.data.word_to_guess;
        for (let i = 0; i < word.length; i++) {
            let letter = document.createElement('span');
            letter.setAttribute('class', word[i]);
            letter.textContent = "?"
            label.appendChild(letter);
        }
        givenWord = word;
    });
}

function guessLetter() {
    let url = 'http://localhost:3333/word/guess';
    let guessInput = document.getElementById('guessInput');
    let guessLetter = guessInput.value.toLowerCase();
    if (guessLetter) {
        let guessedLetters = document.getElementById('guessedLetters');
        if (!guessedLetters.textContent.includes(guessLetter)) {
            guessedLetters.textContent += guessLetter;
        }
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                letter: guessLetter
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.rightGuess) {
                let letterPos = document.getElementsByClassName(guessLetter);
                for (let i = 0; i < letterPos.length; i++) {
                    letterPos[i].textContent = guessLetter;
                    letterPos[i].style.color = "greenyellow";
                }
            } else {
                console.log(data.leftLives);
                if (data.leftLives <= 0) {
                    alert("GAME OVER! TRY AGAIN!");
                    document.getElementById('playing').style.display = "none";
                } else {
                    let livesLeft = document.getElementById('livesLeft');
                    livesLeft.textContent = "";
                    let text = document.createElement('label');
                    text.innerText = data.leftLives;
                    livesLeft.append(text);
                }
            }
            if (data.leftLetters == 0) {
                alert("CONGRATULATIONS! WORD HAS BEEN SOLVED!");
                document.getElementById('playing').style.display = "none";
            }
        });
    }
}