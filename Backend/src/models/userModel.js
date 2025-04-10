const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://i.pinimg.com/736x/c9/eb/90/c9eb900d25604c51d2638c0ca409b99f.jpg' },
    bio: { type: String, default: '' },
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
    reputation: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
