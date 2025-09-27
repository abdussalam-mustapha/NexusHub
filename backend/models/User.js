// In-memory storage (replace with database in production)
const users = [];

// User model for authentication and user management
class User {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.googleId = data.googleId;
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.connections = [];
    this.favorites = {
      properties: [],
      products: []
    };
    this.cart = [];
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  static findByGoogleId(googleId) {
    return users.find(user => user.googleId === googleId);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(data) {
    const user = new User(data);
    users.push(user);
    return user;
  }

  static getAll() {
    return users.map(user => user.toJSON());
  }

  addConnection(userId) {
    if (!this.connections.includes(userId)) {
      this.connections.push(userId);
      return true;
    }
    return false;
  }

  addToFavorites(type, itemId) {
    if (!this.favorites[type].includes(itemId)) {
      this.favorites[type].push(itemId);
      return true;
    }
    return false;
  }

  removeFromFavorites(type, itemId) {
    const index = this.favorites[type].indexOf(itemId);
    if (index > -1) {
      this.favorites[type].splice(index, 1);
      return true;
    }
    return false;
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.cart.push({
        ...product,
        quantity: product.quantity || 1,
        addedAt: new Date()
      });
    }
    return this.cart;
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index > -1) {
      this.cart.splice(index, 1);
      return true;
    }
    return false;
  }

  updateCartItem(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      return true;
    }
    return false;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      picture: this.picture,
      createdAt: this.createdAt,
      connectionsCount: this.connections.length
    };
  }
}

module.exports = User;
