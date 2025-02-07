const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json()); // Gives us access to req.body.
app.use(cors()); // Cross Origin Resource Server Allows us to make requests from our frontend.

const PORT = 3000;

app.get("/test", (req, res) => {
  console.log("Test route hit");
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});