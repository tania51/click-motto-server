const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const cors = require('cors')
const port = process.env.PORT || 5000

const corsOptions = {
    origin: [
      'http://localhost:5173'
    ],
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(express.json())



const uri = process.env.USER_URI


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const imageCollection = client.db('clientMotto').collection('images');

    app.post('/images', async(req, res) => {
        const query = req.body;
        const result = await imageCollection.insertOne(query);
        res.send(result)
    })

    app.get('/all-images', async(req, res) => {
        const result = await imageCollection.find().toArray();
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Click Motto!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})