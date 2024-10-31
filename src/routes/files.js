const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post('/upload', authMiddleware, uploadMiddleware.single('file'), fileController.uploadFile);
router.delete('/:fileId', authMiddleware, fileController.deleteFile);
router.get('/', authMiddleware, fileController.getUserFiles);

module.exports = router;
