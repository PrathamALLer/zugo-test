const { Settings } = require('../models');
const { validateCreateSettings, validateUpdateSettings } = require('../validators/settingsValidator');

exports.createSettings = async (req, res) => {
  try {
    const { error } = validateCreateSettings(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const settings = await Settings.create(req.body);
    res.status(201).json(settings);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSettingsById = async (req, res) => {
  try {
    const settings = await Settings.findByPk(req.params.id);
    if (settings) {
      res.json(settings);
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { error } = validateUpdateSettings(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await Settings.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSettings = await Settings.findByPk(req.params.id);
      res.json(updatedSettings);
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSettings = async (req, res) => {
  try {
    const deleted = await Settings.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Settings deleted' });
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
