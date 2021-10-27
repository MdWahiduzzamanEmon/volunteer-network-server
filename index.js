const express = require('express');
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());

// database setup 
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpne0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("connected",uri);
app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log("start on port",port);
})