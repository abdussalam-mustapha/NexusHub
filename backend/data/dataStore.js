// In-memory data store (replace with database in production)
class DataStore {
  constructor() {
    this.users = [];
    this.properties = [];
    this.products = [];
    this.posts = [];
    this.connections = []; // user connections/friendships
    this.favorites = []; // user favorites for properties
    this.cart = []; // shopping cart items
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Sample properties
    this.properties = [
      {
        id: 'prop1',
        title: 'Modern Downtown Apartment',
        price: 450000,
        location: 'Downtown, City Center',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        type: 'apartment',
        images: ['/src/assets/property1.jpg'],
        description: 'Beautiful modern apartment in the heart of downtown',
        agent: { name: 'Sarah Johnson', phone: '+1-555-0123', email: 'sarah@realty.com' },
        features: ['Balcony', 'Gym', 'Parking', 'Pet Friendly'],
        status: 'available'
      },
      {
        id: 'prop2',
        title: 'Luxury Family House',
        price: 750000,
        location: 'Suburbs, Green Valley',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2500,
        type: 'house',
        images: ['/src/assets/property2.jpg'],
        description: 'Spacious family home with large garden',
        agent: { name: 'Mike Wilson', phone: '+1-555-0124', email: 'mike@realty.com' },
        features: ['Garden', 'Garage', 'Fireplace', 'Pool'],
        status: 'available'
      }
    ];

    // Sample products
    this.products = [
      {
        id: 'prod1',
        name: 'Wireless Headphones',
        price: 199.99,
        category: 'Electronics',
        images: ['/src/assets/product1.jpg'],
        description: 'High-quality wireless headphones with noise cancellation',
        stock: 50,
        rating: 4.5,
        tags: ['trending', 'bestseller'],
        brand: 'AudioTech',
        sku: 'AT-WH-001'
      },
      {
        id: 'prod2',
        name: 'Smart Watch',
        price: 299.99,
        category: 'Electronics',
        images: ['/src/assets/product2.jpg'],
        description: 'Advanced smart watch with health monitoring',
        stock: 30,
        rating: 4.8,
        tags: ['new'],
        brand: 'TechWear',
        sku: 'TW-SW-002'
      }
    ];

    // Sample posts
    this.posts = [
      {
        id: 'post1',
        userId: 'user1',
        content: 'Just discovered this amazing hiking trail! Perfect for weekend adventures 🥾',
        type: 'text',
        likes: ['user2', 'user3'],
        hashtags: ['hiking', 'adventure', 'nature'],
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: 'post2',
        userId: 'user2',
        content: 'Anyone interested in joining our board game night this Friday? We need more players!',
        type: 'event',
        likes: ['user1'],
        hashtags: ['boardgames', 'friday', 'fun'],
        createdAt: new Date(Date.now() - 43200000) // 12 hours ago
      }
    ];

    // Sample users
    this.users = [
      {
        id: 'user1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        picture: '/src/assets/ava1.png'
      },
      {
        id: 'user2',
        name: 'Sarah Miller',
        email: 'sarah@example.com',
        picture: '/src/assets/ava2.png'
      },
      {
        id: 'user3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        picture: '/src/assets/ava3.png'
      }
    ];
  }

  // User methods
  findUserByGoogleId(googleId) {
    return this.users.find(user => user.googleId === googleId);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(userData) {
    const user = { ...userData, id: this.generateId() };
    this.users.push(user);
    return user;
  }

  // Property methods
  getAllProperties(filters = {}) {
    let filtered = [...this.properties];
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filtered;
  }

  getPropertyById(id) {
    return this.properties.find(p => p.id === id);
  }

  createProperty(propertyData) {
    const property = { ...propertyData, id: this.generateId() };
    this.properties.push(property);
    return property;
  }

  // Product methods
  getAllProducts(filters = {}) {
    let filtered = [...this.products];
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.tags) {
      filtered = filtered.filter(p => 
        filters.tags.some(tag => p.tags.includes(tag))
      );
    }
    
    return filtered;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  createProduct(productData) {
    const product = { ...productData, id: this.generateId() };
    this.products.push(product);
    return product;
  }

  // Post methods
  getAllPosts() {
    return this.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getPostById(id) {
    return this.posts.find(p => p.id === id);
  }

  createPost(postData) {
    const post = {
      ...postData,
      id: this.generateId(),
      likes: [],
      shares: [],
      comments: [],
      createdAt: new Date()
    };
    this.posts.push(post);
    return post;
  }

  likePost(postId, userId) {
    const post = this.getPostById(postId);
    if (post && !post.likes.includes(userId)) {
      post.likes.push(userId);
    }
    return post;
  }

  // Cart methods
  addToCart(userId, productId, quantity = 1) {
    const existingItem = this.cart.find(item => 
      item.userId === userId && item.productId === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: this.generateId(),
        userId,
        productId,
        quantity,
        createdAt: new Date()
      });
    }
  }

  getCartItems(userId) {
    return this.cart.filter(item => item.userId === userId);
  }

  // Favorites methods
  addToFavorites(userId, propertyId) {
    const existing = this.favorites.find(fav => 
      fav.userId === userId && fav.propertyId === propertyId
    );
    
    if (!existing) {
      this.favorites.push({
        id: this.generateId(),
        userId,
        propertyId,
        createdAt: new Date()
      });
    }
  }

  getFavorites(userId) {
    return this.favorites.filter(fav => fav.userId === userId);
  }

  // Connection methods
  createConnection(userId1, userId2) {
    const existing = this.connections.find(conn => 
      (conn.user1 === userId1 && conn.user2 === userId2) ||
      (conn.user1 === userId2 && conn.user2 === userId1)
    );
    
    if (!existing) {
      this.connections.push({
        id: this.generateId(),
        user1: userId1,
        user2: userId2,
        status: 'pending',
        createdAt: new Date()
      });
    }
  }

  getUserConnections(userId) {
    return this.connections.filter(conn => 
      conn.user1 === userId || conn.user2 === userId
    );
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Singleton instance
const dataStore = new DataStore();

module.exports = dataStore;
