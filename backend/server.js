import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import deliveryRoutes from './routes/delivery.routes.jsx';
// import marketplaceRoutes from './routes/marketplace.routes.js';
// import advisoryRoutes from './routes/advisory.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/delivery', deliveryRoutes);
// app.use('/api/marketplace', marketplaceRoutes);
// app.use('/api/advisory', advisoryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


  
app.get("/", (req,res) => {
  res.send('welcome to agro backend')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
