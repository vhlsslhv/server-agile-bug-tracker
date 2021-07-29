const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const issueSchema = new Schema({
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
    comments: [{
        username: String, // Do I need to pass user ID?
        comment: String,
    }],
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
    },
    /* attachment: {
        type: File,
    } */
});

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;