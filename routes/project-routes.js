const express = require("express");
const router = express.Router();
const Project = require("../models/Project.model");

//Create project
router.post("/projects", async (req, res)=>{
    const {title, description} = req.body;
    if( !title || !description){
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    try{
        const response = await Project.create({
            title,
            description,
        });
        res.status(200).json(response);
    } catch(e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//Get all projects
router.get("/projects", async (req, res)=>{
    try {
        const allProjects = await Project.find();
        res.status(200).json(allProjects);
    } catch (error) {
        res.status(500).json({ message: `error occured ${e}` });
    }
});

//Get Project by ID
router.get("/projects/:id", async (req, res)=>{
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch(e){
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//Update Project
router.put("/projects/:id", async (req, res)=>{
    try{
        const{title, description}=req.body;
        await Project.findByIdAndUpdate(req.params.id, {
            title,
            description,
        });
        res.status(200).json(`id ${req.params.id} was updated`);
    } catch (e){
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//Delete Project
router.delete("/projects/:id", async (req, res)=>{
    try {
        await Project.findByIdAndRemove(req.param.id);
        res.status(200).json({ message: `id ${req.params.id} was deleted` });
    } catch (error) {
        res.status(500).json({ message: `error occurred ${e}` });        
    }
});

module.exports = router;
