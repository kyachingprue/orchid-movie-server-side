const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// name: orchidMovie;
// pass: XCVxNeAkrixLlWF6;

const uri =
  'mongodb+srv://orchidMovie:XCVxNeAkrixLlWF6@cluster0.a9hfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    const movieCollection = client.db('movieDB').collection('movies');
    //Movies Related APIs
    app.post('/movies', async (req, res) => {
      const newMovie = req.body;
      const result = await movieCollection.insertOne(newMovie);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Orchid Server side is Running ');
});

app.listen(port, () => {
  console.log(`Orchid Server running PORT: ${port}`);
});
