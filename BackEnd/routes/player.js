const express = require("express");
const router = express.Router();

let player = require("../data/dummyPlayerDB");
let words = require("../data/dummyWordsDB");

var randomNumber;
// console.log(randomNumber);


router.get("/", async (req, res) => {
    try {
        randomNumber = Math.floor((Math.random() * words.length));
        res.status(200).json({
            data: player
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
    player.lives--;
    if (player.lives <= 0) {
        console.log("DEAD");
    } else {
        console.log(randomNumber);
        console.log(player.lives);
    }
    res.send("POST TO THE HOME PAGE");
})

module.exports = router;