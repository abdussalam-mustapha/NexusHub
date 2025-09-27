// Validation utilities for API endpoints
class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

const validators = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Required field validation
  isRequired: (value, fieldName) => {
    if (value === undefined || value === null || value === '') {
      throw new ValidationError(`${fieldName} is required`, fieldName);
    }
    return true;
  },

  // String length validation
  isValidLength: (str, min, max, fieldName) => {
    if (typeof str !== 'string') {
      throw new ValidationError(`${fieldName} must be a string`, fieldName);
    }
    if (str.length < min || str.length > max) {
      throw new ValidationError(`${fieldName} must be between ${min} and ${max} characters`, fieldName);
    }
    return true;
  },

  // Number validation
  isValidNumber: (num, fieldName) => {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new ValidationError(`${fieldName} must be a valid number`, fieldName);
    }
    return true;
  },

  // Positive number validation
  isPositiveNumber: (num, fieldName) => {
    validators.isValidNumber(num, fieldName);
    if (num <= 0) {
      throw new ValidationError(`${fieldName} must be a positive number`, fieldName);
    }
    return true;
  },

  // Array validation
  isValidArray: (arr, fieldName) => {
    if (!Array.isArray(arr)) {
      throw new ValidationError(`${fieldName} must be an array`, fieldName);
    }
    return true;
  },

  // URL validation
  isValidUrl: (url, fieldName) => {
    try {
      new URL(url);
      return true;
    } catch {
      throw new ValidationError(`${fieldName} must be a valid URL`, fieldName);
    }
  },

  // User validation
  validateUser: (userData) => {
    validators.isRequired(userData.email, 'email');
    validators.isRequired(userData.name, 'name');
    
    if (!validators.isValidEmail(userData.email)) {
      throw new ValidationError('Invalid email format', 'email');
    }
    
    validators.isValidLength(userData.name, 1, 100, 'name');
    
    return true;
  },

  // Property validation
  validateProperty: (propertyData) => {
    validators.isRequired(propertyData.title, 'title');
    validators.isRequired(propertyData.price, 'price');
    validators.isRequired(propertyData.location, 'location');
    validators.isRequired(propertyData.bedrooms, 'bedrooms');
    validators.isRequired(propertyData.bathrooms, 'bathrooms');
    
    validators.isValidLength(propertyData.title, 1, 200, 'title');
    validators.isPositiveNumber(propertyData.price, 'price');
    validators.isValidLength(propertyData.location, 1, 100, 'location');
    validators.isValidNumber(propertyData.bedrooms, 'bedrooms');
    validators.isValidNumber(propertyData.bathrooms, 'bathrooms');
    
    if (propertyData.images) {
      validators.isValidArray(propertyData.images, 'images');
    }
    
    return true;
  },

  // Product validation
  validateProduct: (productData) => {
    validators.isRequired(productData.name, 'name');
    validators.isRequired(productData.price, 'price');
    validators.isRequired(productData.category, 'category');
    
    validators.isValidLength(productData.name, 1, 200, 'name');
    validators.isPositiveNumber(productData.price, 'price');
    validators.isValidLength(productData.category, 1, 50, 'category');
    
    if (productData.stock !== undefined) {
      validators.isValidNumber(productData.stock, 'stock');
    }
    
    if (productData.images) {
      validators.isValidArray(productData.images, 'images');
    }
    
    return true;
  },

  // Post validation
  validatePost: (postData) => {
    validators.isRequired(postData.userId, 'userId');
    validators.isRequired(postData.content, 'content');
    
    validators.isValidLength(postData.content, 1, 2000, 'content');
    
    if (postData.images) {
      validators.isValidArray(postData.images, 'images');
    }
    
    if (postData.hashtags) {
      validators.isValidArray(postData.hashtags, 'hashtags');
    }
    
    return true;
  },

  // Chat message validation
  validateChatMessage: (messageData) => {
    validators.isRequired(messageData.message, 'message');
    validators.isValidLength(messageData.message, 1, 1000, 'message');
    
    return true;
  }
};

module.exports = {
  validators,
  ValidationError
};
