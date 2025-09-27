// Post model for social networking
class Post {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.userId = data.userId;
    this.content = data.content;
    this.images = data.images || [];
    this.likes = data.likes || [];
    this.shares = data.shares || [];
    this.comments = data.comments || [];
    this.type = data.type || 'text'; // text, image, event, activity
    this.visibility = data.visibility || 'public'; // public, friends, private
    this.hashtags = data.hashtags || [];
    this.location = data.location;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
      images: this.images,
      likes: this.likes,
      shares: this.shares,
      comments: this.comments,
      type: this.type,
      visibility: this.visibility,
      hashtags: this.hashtags,
      location: this.location,
      likesCount: this.likes.length,
      sharesCount: this.shares.length,
      commentsCount: this.comments.length,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Post;
