const SharedLink = require('../models/SharedLink');
const File = require('../models/File');
const crypto = require('crypto');

exports.createShareLink = async (req, res) => {
    const { fileId, expiresInHours } = req.body;

    try {
        const file = await File.findById(fileId);
        if (!file || file.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        const expiresAt = new Date(Date.now() + expiresInHours * 3600 * 1000);
        const link = crypto.randomBytes(16).toString('hex');

        const sharedLink = new SharedLink({
            fileId,
            expiresAt,
            link,
        });

        await sharedLink.save();
        res.json({ link: `/share/${link}` });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du lien de partage', error });
    }
};
