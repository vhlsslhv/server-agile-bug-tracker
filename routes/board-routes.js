const express = require("express");
const router = express.Router();
const Board = require("../models/Board.model");
const Issue = require("../models/Issue.model");
const fileUpload = require("../config/cloudinary");


//Get all boards
router.get("/boards", async (req, res) => {
    try {
        const allBoards = await Board.find();
        res.status(200).json(allBoards);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});


//Create Board
router.post("/boards", async (req, res) => {
    const { title } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: "missing fields" });
        return;
    }
    try {
        const response = await Board.create({
            title,
        });
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//get board by id
router.get("/boards/todoBoard/:id", async (req, res)=>{
    try {
        const todoBoard = await Board.findById(req.params.id).populate("Issue");
        res.status(200).json(todoBoard);
    } catch (e){
        res.status(500).json({message: `error occurred${e}`});
    }
})

//Delete project
router.delete("/boards/:id", async (req, res) => {
    try {
        await Board.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: `id ${req.params.id} was deleted` });
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});


module.exports = router;

