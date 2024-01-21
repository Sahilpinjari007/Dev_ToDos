const express = require("express");
const cors = require("cors");


const PORT = process.env.PORT || 3001;
const connectDB  = require('./DB/connection');
connectDB();


const app = express();
app.use(express.json());
app.use(cors());


// Model
const Todo = require("./models/toDoModel");


// get Todo Api
app.get("/todos", async (req, res) => {

    try {
        const data = await Todo.find();
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
    }
});


// insert Todo Api
app.post("/todos/new", async (req, res) => {

    try {
        const todo = new Todo({ text: req.body.text });
        todo.save();

        res.status(200).json(todo);
    }
    catch (err) {
        console.log(err);
    }
});


// update todo
app.put("/todos/update/:id", async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id);
        todo.text = req.body.text;

        todo.save();
        res.status(200).json(todo);
    }
    catch (err) {
        console.log(err);
    }
});


// delete todo
app.delete("/todos/delete/:id", async (req, res) => {

    try {

        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json(todo);
    }
    catch (err) {
        console.log(err);
    }
});


// update completion
app.get("/todos/complete/:id", async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;

        todo.save();
        res.status(200).json(todo);
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`lisitening on PORT ${PORT}`))