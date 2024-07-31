const Product = require('../models/product');

// Get all products
exports.getAllProducts = async () => {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

// Get a single product by id
exports.getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Failed to fetch product by id: ${error.message}`);
  }
};

// Create a new product
exports.createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

// Update a product by id
exports.updateProduct = async (id, productData) => {
  try {
    const [updated] = await Product.update(productData, {
      where: { id }
    });
    if (updated === 0) {
      throw new Error('Product not found');
    }
    return await Product.findByPk(id);
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

// Delete a product by id
exports.deleteProduct = async (id) => {
  try {
    const deleted = await Product.destroy({
      where: { id }
    });
    if (deleted === 0) {
      throw new Error('Product not found');
    }
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
