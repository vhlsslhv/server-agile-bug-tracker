const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue.model");
const fileUpload = require("../config/cloudinary");
const Board = require("../models/Board.model");
const Project = require("../models/Project.model");


//Get all issues
router.get("/issues", async (req, res) => {
    try {
        const allIssues = await Issue.find();
        res.status(200).json(allIssues);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});


//Create issue
router.post("/projects/:id/issues/new", async (req, res) => {
    const { title, description, type, status, reporter, assignee, user, board, comments, attachment } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: "missing fields" });
        return;
    }
    try {

        const project = await Project.findById(req.params.id);
        console.log("project", project.boards[0]);
        const todoBoard = await Board.findById(project.boards[0]);
        console.log("board", todoBoard)
        const issueCreated = await Issue.create({
            title,
            description,
            board: todoBoard,
            user: req.session.currentUser
        });

        await Board.findByIdAndUpdate(todoBoard._id, {
            $push: { issues: issueCreated }
        });

        res.status(200).json(issueCreated);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
    
});

//Update issue
router.put("/issues/:id", async (req, res) => {
    try {
        const { title, description, type, status } = req.body;
        await Issue.findByIdAndUpdate(req.params.id, {
            title,
            description,
            type,
            status
        });
        res.status(200).json(`id ${req.params.id} was updated`);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//get issue by id
router.get("/issues/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate("todoBoard");
        res.status(200).json(issue);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//Delete issue
router.delete("/issue/:id", async (req, res) => {
    try {
        await Issue.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: `id ${req.params.id} was deleted` });
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

module.exports = router;
