const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Website') 
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
 


// Schema Definition
const WebsiteSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

// Model
const WebsiteData = mongoose.model('WebsiteData', WebsiteSchema);

// POST Endpoint
app.post('/WebsiteData', async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const Website = new WebsiteData({
      Name,
      Email,
      Password,
    });

    await Website.save();
    res.status(201).json({ message: 'User created successfully', data: Website });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'Name already exists' });
    }

    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
