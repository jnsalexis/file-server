const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, linkController.createShareLink);

module.exports = router;
