const { ContributionWithdrawals } = require('../models');
const { validateCreateContributionWithdrawal, validateUpdateContributionWithdrawal } = require('../validators/contributionWithdrawalsValidator');

exports.createContributionWithdrawal = async (req, res) => {
  try {
    const { error } = validateCreateContributionWithdrawal(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const contributionWithdrawal = await ContributionWithdrawals.create(req.body);
    res.status(201).json(contributionWithdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllContributionWithdrawals = async (req, res) => {
  try {
    const contributionWithdrawals = await ContributionWithdrawals.findAll();
    res.json(contributionWithdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContributionWithdrawalById = async (req, res) => {
  try {
    const contributionWithdrawal = await ContributionWithdrawals.findByPk(req.params.id);
    if (contributionWithdrawal) {
      res.json(contributionWithdrawal);
    } else {
      res.status(404).json({ message: 'ContributionWithdrawal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContributionWithdrawal = async (req, res) => {
  try {
    const { error } = validateUpdateContributionWithdrawal(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await ContributionWithdrawals.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedContributionWithdrawal = await ContributionWithdrawals.findByPk(req.params.id);
      res.json(updatedContributionWithdrawal);
    } else {
      res.status(404).json({ message: 'ContributionWithdrawal not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteContributionWithdrawal = async (req, res) => {
  try {
    const deleted = await ContributionWithdrawals.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'ContributionWithdrawal deleted' });
    } else {
      res.status(404).json({ message: 'ContributionWithdrawal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
