const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017";


app.use(express.json());

const client = new MongoClient(uri);


async function connectToDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDb();

//Routes
app.post('/submit', async (req, res) => {
    const { full_name, email, dob,password,gender, mobile, address } = req.body;
    
    const database = client.db("local");
    const collection = database.collection("userCollection");

    try {
        const result = await collection.insertOne({ full_name, email, dob,password,gender, mobile, address });
        res.status(201).json({ message: 'User created', insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Define a route for getting all users
app.get('/users', async (req, res) => {
    const database = client.db("local");
    const collection = database.collection("userCollection");

    try {
        const users = await collection.find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(port,'0.0.0.0' ,() => {
    console.log(`Server is running at http://localhost:${port}`);
});


