const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Import error handler
require('dotenv').config();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute untuk user API
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);  // Pasang middleware setelah semua route

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}/`);
});
