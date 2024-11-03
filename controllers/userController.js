const { User } = require('../models');
const {validateCreateUser, validateUpdateUser} = require('../validators/userValidator');
exports.createUser = async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error, value } = validateCreateUser(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // If validation passes, proceed with user creation
    const newUser = await User.create(value);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error, value } = validateUpdateUser(req.body, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }

    const [updated] = await User.update(value, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
