const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const routes = require('./src/routes');
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes with versioning
app.use('/api/v1', routes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to DiaPredict API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});