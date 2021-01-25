const express = require("express");
const router = express.Router();

let words = require("../data/dummyWordsDB");

router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            data: words
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        var word = words.find(word => word.word_id === id);
        res.status(200).json({
            data: word
        });
    } catch {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
});


module.exports = router;