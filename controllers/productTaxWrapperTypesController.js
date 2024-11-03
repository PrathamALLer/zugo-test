const { ProductTaxWrapperTypes } = require('../models');
const { validateProductTaxWrapperTypeCreate, validateProductTaxWrapperTypeUpdate } = require('../validators/productTaxWrapperTypesValidator');

exports.createProductTaxWrapperType = async (req, res) => {
  try {
    console.log('creating new type')
    const { error } = validateProductTaxWrapperTypeCreate(req.body);
    if (error) {
      console.log('validation failed')
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log('validation passed ')
    const productTaxWrapperType = await ProductTaxWrapperTypes.create(req.body);
    res.status(201).json(productTaxWrapperType);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProductTaxWrapperTypes = async (req, res) => {
  try {
    const productTaxWrapperTypes = await ProductTaxWrapperTypes.findAll();
    res.json(productTaxWrapperTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductTaxWrapperTypeById = async (req, res) => {
  try {
    const productTaxWrapperType = await ProductTaxWrapperTypes.findByPk(req.params.id);
    if (productTaxWrapperType) {
      res.json(productTaxWrapperType);
    } else {
      res.status(404).json({ message: 'ProductTaxWrapperType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductTaxWrapperType = async (req, res) => {
  try {
    const { error } = validateProductTaxWrapperTypeUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await ProductTaxWrapperTypes.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProductTaxWrapperType = await ProductTaxWrapperTypes.findByPk(req.params.id);
      return res.status(200).json(updatedProductTaxWrapperType);
    } else {
      return res.status(404).json({ message: 'ProductTaxWrapperType not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteProductTaxWrapperType = async (req, res) => {
  try {
    const deleted = await ProductTaxWrapperTypes.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'ProductTaxWrapperType deleted' });
    } else {
      res.status(404).json({ message: 'ProductTaxWrapperType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
