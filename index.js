const express = require('express');
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");
var cors = require("cors");

const port = process.env.PORT || 5000;


const ObjectId = require("mongodb").ObjectId;
//middleware
app.use(express.json());
app.use(cors());

// database setup 
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpne0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("volunteer_network");
    const v_works_Collection = database.collection("vWorks");
    const volunteer_Register_Collection =
      database.collection("volunteer_Register");
    
      
//get all api
      app.get('/services', async (req, res) => {
          const services = v_works_Collection.find({});
          const result = await services.toArray();
          res.send(result);
      })
      
//get one api
      app.get("/services/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await v_works_Collection.findOne(query);
        // console.log(result);
        res.send(result);
      });
      
//post api
      app.post('/v_register', async (req, res) => {
          const result = await volunteer_Register_Collection.insertOne(
            req.body
          );
        //   console.log(result);
          res.json(result)
      })

//event get api 
      app.get("/events/:email", async (req, res) => {
          const email = req.params.email
          const query = { Email: email };
          const result = await volunteer_Register_Collection.find(query).toArray();
          res.send(result);
      });

//event delete
      app.delete("/eventDelete/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await volunteer_Register_Collection.deleteOne(query);
        //   console.log(result);
          res.json(result)
      })
      
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



























console.log("connected",uri);
app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log("start on port",port);
})