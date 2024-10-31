const File = require('../models/File');
const User = require('../models/User');

exports.getUserFiles = async (req, res) => {
    try {
        const files = await File.find({ userId: req.userId });

        res.json({
            message: 'Liste des fichiers récupérée avec succès',
            files,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers', error });
    }
};


exports.uploadFile = async (req, res) => {
    const { file } = req;
    const user = await User.findById(req.userId);

    try {
        const newFile = new File({
            userId: user._id,
            filename: file.filename,
            path: file.path,
            size: file.size,
        });

        await newFile.save();
        user.usedQuota += file.size;
        await user.save();

        res.status(201).json({ message: 'Votre fichier a été enregistré avec succès', file: newFile });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'enregistrement du fichier", error });
    }
};

exports.deleteFile = async (req, res) => {
    const { fileId } = req.params;

    try {
        const file = await File.findById(fileId);
        if (!file || file.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        await file.remove();
        const user = await User.findById(req.userId);
        user.usedQuota -= file.size;
        await user.save();

        res.json({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la supression du fichier', error });
    }
};
