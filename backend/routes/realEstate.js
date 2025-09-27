const express = require('express');
const router = express.Router();
const dataStore = require('../data/dataStore');
const Property = require('../models/Property');

// GET all properties with filtering
router.get('/', (req, res) => {
  try {
    const filters = {
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined,
      bedrooms: req.query.bedrooms ? parseInt(req.query.bedrooms) : undefined,
      bathrooms: req.query.bathrooms ? parseInt(req.query.bathrooms) : undefined,
      location: req.query.location,
      type: req.query.type
    };

    const properties = dataStore.getAllProperties(filters);
    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties'
    });
  }
});

// GET single property
router.get('/:id', (req, res) => {
  try {
    const property = dataStore.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }
    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property'
    });
  }
});

// POST add to favorites
router.post('/favorites', (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    
    if (!userId || !propertyId) {
      return res.status(400).json({
        success: false,
        error: 'userId and propertyId are required'
      });
    }

    dataStore.addToFavorites(userId, propertyId);
    res.json({
      success: true,
      message: 'Property added to favorites'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to favorites'
    });
  }
});

// GET user favorites
router.get('/favorites/:userId', (req, res) => {
  try {
    const favorites = dataStore.getFavorites(req.params.userId);
    const favoriteProperties = favorites.map(fav => {
      const property = dataStore.getPropertyById(fav.propertyId);
      return { ...property, favoriteId: fav.id };
    }).filter(prop => prop.id); // Filter out null properties

    res.json({
      success: true,
      data: favoriteProperties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch favorites'
    });
  }
});

// POST new property (admin/agent only)
router.post('/', (req, res) => {
  try {
    const property = new Property(req.body);
    const createdProperty = dataStore.createProperty(property);
    res.status(201).json({
      success: true,
      data: createdProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create property'
    });
  }
});

// PUT update property
router.put('/:id', (req, res) => {
  try {
    const property = dataStore.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    Object.assign(property, req.body, { updatedAt: new Date() });
    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update property'
    });
  }
});

// DELETE property
router.delete('/:id', (req, res) => {
  try {
    const index = dataStore.properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    dataStore.properties.splice(index, 1);
    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete property'
    });
  }
});

module.exports = router;
