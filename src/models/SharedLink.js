const mongoose = require('mongoose');

const sharedLinkSchema = new mongoose.Schema({
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    expiresAt: { type: Date, required: true },
    link: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('SharedLink', sharedLinkSchema);
