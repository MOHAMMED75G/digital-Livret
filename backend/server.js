// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001; // Use any port you prefer

// Connect to MongoDB Atlas
const MONGO_URI = 'mongodb+srv://mohamedgharab:helloworld@cluster0.tfqpsea.mongodb.net/?retryWrites=true&w=majority';
async function connect() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

  } catch (error) {
    console.log(error);
  }
};
connect();
// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running  ${PORT}`);
});
