const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue.model");
const fileUpload = require("../config/cloudinary");


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
router.post("/issues", async (req, res) => {
    const { title, description, type, status, reporter, assignee, user, project, comments, attachment } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: "missing fields" });
        return;
    }
    try {
        const response = await Issue.create({
            title,
            description,
            type,
            status,
            reporter,
            assignee,
            user,
            project,
            comments,
            attachment,
        });
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
    // create issue for
});

//Update issue

//get issue by id
router.get("/issues/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate("issues");
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
