const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    website: { type: String },
    country: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);