const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175', 'https://mehedi-hassan.netlify.app'],
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



    const db = client.db('myPortfolio');
    const projectCollection = db.collection('projects')

    // const projects = [{
    //   "title":"Product Recommendation",
    //   "image":"https://i.postimg.cc/R05p9z48/easy-recommendation-feature.png",
    //   "liveLink":"https://easy-recommendations.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/easy-recommendations-client",
    //   "techStack":["React", "TailwindCSS", "Firebase"],
    //   "description":"A personal portfolio built with React and Tailwind CSS.",
    //   "challenges":"Integrating dynamic product recommendations using APIs and managing state.",
    //   "futurePlans":"Add machine learning algorithms for better recommendations."
    // },
    // {
    //   "title":"Sports Equipment Store",
    //   "image":"https://i.postimg.cc/W4GW1f44/sports-equipment-store.png", 
    //   "liveLink":"https://sports-equipment-store.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/sports-equipment-store-client",
    //   "techStack":["React", "Stripe", "Node.js", "MongoDB"],
    //   "description":"A fully functional e-commerce store with Stripe payment integration.",
    //   "challenges":"Implementing secure payment integration with Stripe API.",
    //   "futurePlans":"Integrate inventory management system and customer feedback system."
    // },
    // {
    //   "title":"My Haven Homes",
    //   "image":"https://i.postimg.cc/FHChT4Ht/my-haven-homes.png", 
    //   "liveLink":"https://my-haven-homes.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/my-haven-homes-client",
    //   "techStack":["React", "Node.js", "MongoDB", "Express", "JWT Authentication"],
    //   "description":"A realstate website where user can buy property.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add team collaboration features and integration with Google Calendar."
    // },
    // {
    //   "title":"Home Tutor",
    //   "image":"https://i.ibb.co.com/v6bLd8qv/hometutor.png", 
    //   "liveLink":"https://home-tutor-kbph.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/home-tutor-client",
    //   "serverGitHubLink":"https://github.com/developernagor/home-tutor-server",
    //   "techStack":["React", "Node.js", "MongoDB", "Express", "JWT Authentication"],
    //   "description":"A realstate website where user can buy property.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add team collaboration features and integration with Google Calendar."
    // },
    // {
    //   "title":"Task Vibe",
    //   "image":"https://i.postimg.cc/FHChT4Ht/my-haven-homes.png", 
    //   "liveLink":"https://my-haven-homes.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/comment-and-reactions",
    //   "serverGitHubLink":"https://github.com/developernagor/comment-and-reaction-in-a-task-server",
    //   "techStack":["React", "Node.js", "MongoDB", "Express", "JWT Authentication"],
    //   "description":"A realstate website where user can buy property.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add team collaboration features and integration with Google Calendar."
    // },
    // {
    //   "title":"Bright Future Hub",
    //   "image":"https://i.postimg.cc/FHChT4Ht/my-haven-homes.png", 
    //   "liveLink":"https://my-haven-homes.netlify.app",
    //   "gitHubLink":"https://github.com/developernagor/my-haven-homes-client",
    //   "techStack":["React", "Node.js", "MongoDB", "Express", "JWT Authentication"],
    //   "description":"A realstate website where user can buy property.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add team collaboration features and integration with Google Calendar."
    // },
    // {
    //   "title":"Gadget Haven",
    //   "image":"https://i.postimg.cc/FHChT4Ht/my-haven-homes.png", 
    //   "liveLink":"https://my-haven-homes.netlify.app",
    //   "gitHubLink":"https://github.com/developernagor/my-haven-homes-client",
    //   "techStack":["React", "Node.js", "MongoDB", "Express", "JWT Authentication"],
    //   "description":"A realstate website where user can buy property.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add team collaboration features and integration with Google Calendar."
    // },
    // {
    //   "title":"BPL Dream Eleven",
    //   "image":"https://i.ibb.co.com/Xx9y53ZS/bpl-dream-11.png", 
    //   "liveLink":"https://bpl-best-eleven.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/bpl-dream-11",
    //   "techStack":["React", "Tailwind Css", "Html", "Css"],
    //   "description":"A cricket website.",
    //   "challenges":"Handling authentication and protecting sensitive data using JWT.",
    //   "futurePlans":"Add database to store data."
    // },
    // {
    //   "title":"Peddy",
    //   "image":"https://i.ibb.co.com/zTD2cmBw/Screenshot.png", 
    //   "liveLink":"https://peddy-adaption.netlify.app",
    //   "clientGitHubLink":"https://github.com/developernagor/peddy-pet-adaption",
    //   "techStack":["HTML", "CSS", "JavaScript"],
    //   "description":"A pet animal adaption website",
    //   "challenges":"Handling function and fetching data",
    //   "futurePlans":"Convert to javascript framework"
    // }]

    // const result = projectCollection.insertMany(projects)
    
    
    app.get('/projects', async (req, res) => {
      try {
          const result = await projectCollection.find().toArray();
          console.log("Fetched projects:", result);
          res.send(result);
      } catch (error) {
          console.error("Error fetching projects:", error);
          res.status(500).send({ error: "Internal Server Error" });
      }
  });
  
    
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
    
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

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

