const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usedQuota: { type: Number, default: 0 },
    maxQuota: { type: Number, default: 2 * 1024 * 1024 * 1024 }, // 2 Go
});

module.exports = mongoose.model('User', userSchema);
