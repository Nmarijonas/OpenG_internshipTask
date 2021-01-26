const { json } = require("body-parser");
const express = require("express");
const { response } = require("..");
const router = express.Router();

let player = require("../data/dummyPlayerDB");

router.get("/", async (req, res) => {
    try {
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

module.exports = router;