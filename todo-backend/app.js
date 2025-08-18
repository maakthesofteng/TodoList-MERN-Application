// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const DB_PATH = "mongodb+srv://eliteefusion:eliteefusion@cluster0.tsjhhgw.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0";

//Local Module
const errorsController = require("./controllers/errors");
const todoItemRouter = require('./routes/todoItemRoute');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/api/todo', todoItemRouter)
app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
