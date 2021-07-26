const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: String,
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    }
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;