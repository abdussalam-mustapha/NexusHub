const express = require('express');
const router = express.Router();
const dataStore = require('../data/dataStore');
const Product = require('../models/Product');

// GET all products with filtering
router.get('/', (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      tags: req.query.tags ? req.query.tags.split(',') : undefined,
      search: req.query.search
    };

    let products = dataStore.getAllProducts(filters);
    
    // Search functionality
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

// GET single product
router.get('/:id', (req, res) => {
  try {
    const product = dataStore.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
});

// POST add to cart
router.post('/cart', (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        error: 'userId and productId are required'
      });
    }

    const product = dataStore.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient stock'
      });
    }

    dataStore.addToCart(userId, productId, quantity);
    res.json({
      success: true,
      message: 'Product added to cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to cart'
    });
  }
});

// GET cart items
router.get('/cart/:userId', (req, res) => {
  try {
    const cartItems = dataStore.getCartItems(req.params.userId);
    const cartWithProducts = cartItems.map(item => {
      const product = dataStore.getProductById(item.productId);
      return {
        ...item,
        product: product
      };
    }).filter(item => item.product); // Filter out items with deleted products

    const total = cartWithProducts.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    res.json({
      success: true,
      data: {
        items: cartWithProducts,
        total: total,
        itemCount: cartWithProducts.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cart'
    });
  }
});

// PUT update cart item quantity
router.put('/cart/:cartItemId', (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = dataStore.cart.find(item => item.id === req.params.cartItemId);
    
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const index = dataStore.cart.indexOf(cartItem);
      dataStore.cart.splice(index, 1);
    } else {
      cartItem.quantity = quantity;
    }

    res.json({
      success: true,
      message: 'Cart updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update cart'
    });
  }
});

// DELETE remove from cart
router.delete('/cart/:cartItemId', (req, res) => {
  try {
    const index = dataStore.cart.findIndex(item => item.id === req.params.cartItemId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    dataStore.cart.splice(index, 1);
    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove from cart'
    });
  }
});

// POST new product (admin only)
router.post('/', (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = dataStore.createProduct(product);
    res.status(201).json({
      success: true,
      data: createdProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
});

// PUT update product
router.put('/:id', (req, res) => {
  try {
    const product = dataStore.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    Object.assign(product, req.body, { updatedAt: new Date() });
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update product'
    });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  try {
    const index = dataStore.products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    dataStore.products.splice(index, 1);
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete product'
    });
  }
});

module.exports = router;
