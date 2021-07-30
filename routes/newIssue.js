const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue.model");
const fileUpload = require("../config/cloudinary");
const Board = require("../models/Board.model");

router.post("/issues/new", async (req, res) => {
    const { title, description, type, status, reporter, assignee, user, project, comments, attachment } = req.body;
    if (!title || !description || !status) {
        res.status(400).json({ message: "missing fields" });
        return;
    }
    try {
        const issueCreated = await Issue.create({
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

        res.status(200).json(issueCreated);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
   
});

