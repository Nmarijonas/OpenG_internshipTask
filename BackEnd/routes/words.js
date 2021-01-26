const express = require("express");
const router = express.Router();

var words = require("../data/dummyWordsDB");
var player = require("../data/dummyPlayerDB");
var leftLives;


var id;

router.get("/", async (req, res) => {
    id = Math.floor((Math.random() * (words.length)));
    try {
        var word = words.find(word => word.word_id === id);
        leftLives = player.lives;
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
    leftLives--;
    res.send(JSON.stringify(leftLives));
    // if (player.lives <= 0) {
    //     res.send('');
    // } else {
    //     res.send(JSON.stringify(player.lives));
    // }
})

module.exports = router;