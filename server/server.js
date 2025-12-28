const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors()); 
app.use(express.json());
(async () => {
  try {
    await connectDB();
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes); 
    app.get('/api/health', (req, res) => res.json({ ok: true }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed starting server:', err.message || err);
    process.exit(1);
  }
})();