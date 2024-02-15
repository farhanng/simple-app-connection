// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

// Create an Express application
const app = express();

// Define PostgreSQL connection parameters
const pgPool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT, // Use environment variable for PostgreSQL port
});

// Test PostgreSQL connection
pgPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database at:', res.rows[0].now);
  }
});

// Define Redis connection parameters
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT, // Use environment variable for Redis port
});

// Test Redis connection
redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

// Define a route to handle HTTP requests
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});