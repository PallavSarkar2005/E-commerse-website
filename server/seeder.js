const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const users = require('./data/users'); <--- REMOVED THIS
const products = require('./data/products');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear out the database
    // Note: If you haven't created the Order model yet, comment out the next line
    // await Order.deleteMany(); 
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create the Admin User manually
    const createdUsers = await User.insertMany([
        {
            name: 'Admin User',
            email: 'admin@example.com',
            password: '$2a$10$D.pX/d7X.u7.u7.u7.u7.u7.u7.u7.u7.u7.u7.u7.u7.u7', // Hash for "123456"
            isAdmin: true
        }
    ]);
    
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany(); // Comment out if Order model doesn't exist yet
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}