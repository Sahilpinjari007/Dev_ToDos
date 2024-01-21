const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TodoSchema = new Schema({

    text: { type: String, require: true },
    complete: { type: Boolean, default: false },
    timeStamp: { type: String, default: Date.now() }
})


const Todo = new mongoose.model("Todo", TodoSchema);

module.exports = Todo;