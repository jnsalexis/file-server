require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

// Import des routes
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const shareRoutes = require('./routes/share');

const app = express();

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/share', shareRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
