// Product model for e-commerce catalog
class Product {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name;
    this.price = data.price;
    this.category = data.category;
    this.images = data.images || [];
    this.description = data.description;
    this.stock = data.stock || 0;
    this.rating = data.rating || 0;
    this.reviews = data.reviews || [];
    this.tags = data.tags || []; // trending, new, bestseller
    this.specifications = data.specifications || {};
    this.brand = data.brand;
    this.sku = data.sku;
    this.status = data.status || 'active'; // active, inactive, out_of_stock
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      category: this.category,
      images: this.images,
      description: this.description,
      stock: this.stock,
      rating: this.rating,
      reviews: this.reviews,
      tags: this.tags,
      specifications: this.specifications,
      brand: this.brand,
      sku: this.sku,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Product;
