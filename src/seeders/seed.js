const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');
const Brand = require('../models/Brand'); 
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Item.deleteMany();
        await Brand.deleteMany(); 
        // Seed Users
        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@example.com', password: '123456' },
            { name: 'John Doe', email: 'john@example.com', password: '123456' }
        ]);

        // Seed Items
        const items = await Item.insertMany([
            { name: 'Laptop', description: 'High performance laptop', price: 999.99 },
            { name: 'Mouse', description: 'Wireless mouse', price: 29.99 },
            { name: 'Keyboard', description: 'Mechanical keyboard', price: 79.99 }
        ]);

        // Seed Brands 
        const brands = await Brand.insertMany([
            { name: 'TechCorp', description: 'Leading tech gadgets', website: 'https://techcorp.com', country: 'USA' },
            { name: 'AlphaWear', description: 'Premium accessories', website: 'https://alphawear.io', country: 'Germany' },
            { name: 'ZenDevices', description: 'Eco-friendly electronics', country: 'Japan' }
        ]);

        console.log('Data Seeded Successfully!');
        
        process.exit();
    } catch (error) {
        console.error(`Seeding Error: ${error.message}`);
        process.exit(1);
    }
};

const runSeed = async () => {
    await connectDB();
    await seedData();
};

runSeed();