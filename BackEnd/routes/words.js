const express = require("express");
const router = express.Router();

var words = require("../data/dummyWordsDB");
var player = require("../data/dummyPlayerDB");
var id;
var leftLives;
var leftLetters;
var guessedLetters;

router.get("/", async (req, res) => {
    id = Math.floor((Math.random() * (words.length)));
    try {
        var word = words.find(word => word.word_id === id);
        leftLives = player.lives;
        leftLetters = word.word_to_guess.length;
        guessedLetters = new Array();
        res.status(200).json({
            data: word
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
});

router.post("/guess", function (req, res) {
    let letter = req.body.letter;
    console.log(letter);
    let findings = 0;
    console.log(guessedLetters);
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        for (let i = 0; i < words[id].word_to_guess.length; i++) {
            if (words[id].word_to_guess[i] == letter) {
                findings++;
            }
        }
        if (findings != 0) {
            leftLetters -= findings;
        }
        else {
            leftLives--;
        }
    }
    res.send(JSON.stringify({
        leftLives: leftLives,
        leftLetters: leftLetters,
        rightGuess: findings > 0
    }));
})

module.exports = router;