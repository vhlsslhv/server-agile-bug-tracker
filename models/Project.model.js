const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    photo: String,
    boards: [{
        type: Schema.Types.ObjectId,
        ref: "Board",
    }]
});


const Project = mongoose.model("Project", projectSchema);
module.exports = Project;