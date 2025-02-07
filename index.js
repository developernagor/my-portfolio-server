const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json())
app.use(cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5174'],
    credentials: true
  }));
  




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7oyvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    await client.connect();
    
      
    const projectCollection = client.db('myPortfolio').collection('projects');
    
    app.get('/projects', async(req,res) => {
        const result = await projectCollection.find().toArray();
        res.send(result);
    })
    
    app.get('/projects/:id', async(req,res) => {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const query = {_id: new ObjectId(id)}
        const result = await projectCollection.findOne(query);
        if (!result) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.send(result);
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


app.get('/', (req,res) => {
    res.send('Welcome to my server')
})
app.listen(port, ()=>{
    console.log('My server is running')
})

