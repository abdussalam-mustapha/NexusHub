require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const realEstateRoutes = require('./routes/realEstate');
const ecommerceRoutes = require('./routes/ecommerce');
const networkingRoutes = require('./routes/networking');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/api/real-estate', realEstateRoutes);
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/networking', networkingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NexusHub backend running on port ${PORT}`);
});
