// sportController.js
const Sport = require('../models/sports');

// Fonction pour obtenir la liste de tous les sports
exports.getAllSports = async (req, res) => {
    try {
        const sports = await Sport.findAll();
        res.json(sports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour obtenir un sport spécifique par son ID
exports.getSportById = async (req, res) => {
    const id = req.params.id;
    try {
        const sport = await Sport.findByPk(id);
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        res.json(sport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour créer un nouveau sport
exports.createSport = async (req, res) => {
    const { nom } = req.body;
    try {
        const sport = await Sport.create({ nom });
        res.status(201).json(sport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un sport existant
exports.updateSport = async (req, res) => {
    const id = req.params.id;
    const { nom } = req.body;
    try {
        const sport = await Sport.findByPk(id);
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        await sport.update({ nom });
        res.json(sport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un sport spécifique par son ID
exports.deleteSport = async (req, res) => {
    const id = req.params.id;
    try {
        const sport = await Sport.findByPk(id);
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        await sport.destroy();
        res.json({ message: 'Sport deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
