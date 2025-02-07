const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables from the .env file
require('dotenv').config();

const app = express();
const PORT = 3000;

// Access to the req.body
app.use(express.json()); 

// Cross Origin Resource Sharing
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
)); 

//  --- Mongoose Schema and Model ---
const Schema = mongoose.Schema;
const ToDoSchema = new Schema(
    {
        todo: { type: String, required: true },
        created: { type: Number, default: Date.now }
    }
);

// Create a model
const ToDo = mongoose.model("ToDo", ToDoSchema);

// --- Routes ---

// GET /test - Test route
app.get("/test", (req, res) => {
    console.log("Test route hit");
    res.json({ msg: "Test route" });
});

// GET Retrieve all todos
app.get("/gettodos", (req, res) => {
    console.log("Get todos route hit");
    ToDo.find(req.query)
        .then(found => {
            console.log("found", found);
            res.json(found);
        })
        .catch(err => console.log(err));
});

// GET /gettodo/:id - Retrieve a todo by id
app.get("/gettodos/:id", (req, res) => {
    console.log("Get todo by id route hit");
    ToDo.findById(req.params.id)
        .then(todo => {
            if (!todo) return res.status(404).json({ error: "Todo not found" });
            res.status(200).json(todo);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// POST /create - Create a new todo
app.post("/create", (req, res) => {
    console.log("Create route hit", req.body)
    const newToDo = new ToDo(req.body);
    newToDo.save()
        .then(todo => {
            res.json(todo);
        }) 
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// DELETE /delete/:id - Delete a todo by id
app.delete('/delete/:id', (req, res) => {
    console.log("Delete route Hit");
    ToDo.findByIdAndDelete(req.params.id)
      .then(deletedToDo => {
        if (!deletedToDo) {
            return res.status(404).json({ error: "ToDo not found" });
        }
        res.json(deletedToDo);
      })
      .catch(err => {
        res.status(500).json({ error: err.message});
      })
})

// PUT /edit/:id - Update a todo by id
app.put('/edit/:id', (req, res) => {
    console.log("Edit route Hit");
    ToDo.findByIdAndUpdate(req.params.id, { todo: req.body.todo}, { new: true })
        .then(updatedTodo => {
            if (!updatedTodo) {
                return res.status(404).json({ error: "Todo not found" });
            }
            res.json(updatedTodo);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
          console.log("Connected to Database");       
      })
      .catch(err => console.log(err));

    console.log(`Server is running on port ${PORT}`);
});

// test