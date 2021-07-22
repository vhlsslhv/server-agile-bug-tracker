const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    project : {
        type: Schema.Types.ObjectId,
        ref: "Project",
    },
    comments: [{
        username: String,
        comment: String,
    }], 
});
