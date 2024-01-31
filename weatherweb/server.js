const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const http = require('http');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;
const apiKey = '1b56f07543mshcaecd24d22689cdp1345aajsnace1b40043f1';
// Middleware to parse JSON data
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://sabakhader2024:sqj2h8IVApkMFpsU@cluster0.8cnwccx.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();
app.post('/api/user', async (req, res) => {
  const { email, name } = req.body;

  try {
    const database = client.db('weather'); // Replace with your database name
    const collection = database.collection('usernames');

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user document
    const newUser = { email, name };
    await collection.insertOne(newUser);

    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/api/weather', async (req, res) => {
  const { location, userEmail } = req.query;

  try {
    // Simulate using the OpenWeatherMap API (replace with your actual weather API)
    const weatherApiUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;
    const response = await axios.get(weatherApiUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    });

    // Save user preferences to MongoDB
    const database = client.db('weather'); // Replace with your database name
    const collection = database.collection('usernames');

    const userPreferences = {
      userEmail,
      location,
      weatherData: response.data,
      timestamp: new Date(),
    };

    await collection.insertOne(userPreferences);

    // Return weather data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace with actual authentication logic)
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Return a token or other user information
    res.json({ user, apiKey });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Weather data endpoint
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  // Simulate using the OpenWeatherMap API (replace with your actual weather API)
  const weatherApiUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;

  try {
    const response = await axios.get(weatherApiUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    });

    // Return weather data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
    
      const database = client.db('weather'); 
      const collection = database.collection('usernames');
  
      const userData = await collection.findOne({ userId });
  
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
 
  

app.get('/search-history', async (req, res) => {
  const { userEmail } = req.query;

  try {
    const database = client.db('weather'); 
    const collection = database.collection('usernames');

    
    const searchHistory = await collection.find({ userEmail }).toArray();

    res.json(searchHistory);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
