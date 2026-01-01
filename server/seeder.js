import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // Optional, you can remove if you don't have it
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

dotenv.config();

const startSeeder = async () => {
  try {
    // 1. CONNECT TO DATABASE FIRST
    console.log("Connecting to Database...");
    await connectDB(); 
    console.log("Database Connected! Starting import...");

    // 2. RUN THE IMPORT/DESTROY LOGIC
    if (process.argv[2] === '-d') {
      await destroyData();
    } else {
      await importData();
    }
  } catch (error) {
    console.error(`Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear old data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create Users
    const createdUsers = await User.create([
        {
            name: 'Admin User',
            email: 'admin@example.com',
            password: '123456', 
            isAdmin: true
        },
        ...users 
    ]);
    
    const adminUser = createdUsers[0]._id;

    // Create Products with Admin ID
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// EXECUTE
startSeeder();