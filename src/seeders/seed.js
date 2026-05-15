const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');

// Explicitly tell dotenv where the .env file is (two folders up from /seeders)
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

        console.log('Data Seeded Successfully!');
        console.log('Users:', users.map(u => `${u.name} - ${u.email}`).join(', '));
        console.log('Items:', items.map(i => `${i.name} - $${i.price}`).join(', '));
        
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