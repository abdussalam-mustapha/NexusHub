// Property model for real estate listings
class Property {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title;
    this.price = data.price;
    this.location = data.location;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.sqft = data.sqft;
    this.type = data.type; // house, apartment, condo, etc.
    this.images = data.images || [];
    this.description = data.description;
    this.agent = data.agent; // agent info
    this.features = data.features || [];
    this.status = data.status || 'available'; // available, sold, pending
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      location: this.location,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      sqft: this.sqft,
      type: this.type,
      images: this.images,
      description: this.description,
      agent: this.agent,
      features: this.features,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Property;
