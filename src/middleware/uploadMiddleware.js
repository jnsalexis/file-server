const multer = require('multer');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: async (req, file, cb) => {
        const user = await User.findById(req.userId);
        if (user.usedQuota + file.size > user.maxQuota) {
            return cb(new Error('Quota dépassé'), false);
        }
        cb(null, true);
    },
});

module.exports = upload;
