const express = require('express');
const router = express.Router();
const dataStore = require('../data/dataStore');
const Post = require('../models/Post');

// GET all posts
router.get('/posts', (req, res) => {
  try {
    const posts = dataStore.getAllPosts();
    
    // Populate user information for each post
    const postsWithUsers = posts.map(post => {
      const user = dataStore.findUserById(post.userId);
      return {
        ...post,
        user: user ? {
          id: user.id,
          name: user.name,
          picture: user.picture
        } : null
      };
    });

    res.json({
      success: true,
      data: postsWithUsers,
      count: postsWithUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
});

// GET single post
router.get('/posts/:id', (req, res) => {
  try {
    const post = dataStore.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const user = dataStore.findUserById(post.userId);
    res.json({
      success: true,
      data: {
        ...post,
        user: user ? {
          id: user.id,
          name: user.name,
          picture: user.picture
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    });
  }
});

// POST new post
router.post('/posts', (req, res) => {
  try {
    const { userId, content, images, type, hashtags, location } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({
        success: false,
        error: 'userId and content are required'
      });
    }

    const postData = {
      userId,
      content,
      images: images || [],
      type: type || 'text',
      hashtags: hashtags || [],
      location
    };

    const post = new Post(postData);
    const createdPost = dataStore.createPost(post);
    
    // Get user info for response
    const user = dataStore.findUserById(userId);
    
    res.status(201).json({
      success: true,
      data: {
        ...createdPost,
        user: user ? {
          id: user.id,
          name: user.name,
          picture: user.picture
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    });
  }
});

// POST like a post
router.post('/posts/:id/like', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const post = dataStore.likePost(req.params.id, userId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: {
        postId: post.id,
        likesCount: post.likes.length,
        isLiked: post.likes.includes(userId)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to like post'
    });
  }
});

// POST unlike a post
router.post('/posts/:id/unlike', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const post = dataStore.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const index = post.likes.indexOf(userId);
    if (index > -1) {
      post.likes.splice(index, 1);
    }

    res.json({
      success: true,
      data: {
        postId: post.id,
        likesCount: post.likes.length,
        isLiked: false
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to unlike post'
    });
  }
});

// GET all users for networking
router.get('/users', (req, res) => {
  try {
    const users = dataStore.users.map(user => ({
      id: user.id,
      name: user.name,
      picture: user.picture,
      email: user.email // Consider removing in production for privacy
    }));

    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// POST connect with user
router.post('/connect', (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    
    if (!userId || !targetUserId) {
      return res.status(400).json({
        success: false,
        error: 'userId and targetUserId are required'
      });
    }

    if (userId === targetUserId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot connect with yourself'
      });
    }

    dataStore.createConnection(userId, targetUserId);
    
    res.json({
      success: true,
      message: 'Connection request sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create connection'
    });
  }
});

// GET user connections
router.get('/connections/:userId', (req, res) => {
  try {
    const connections = dataStore.getUserConnections(req.params.userId);
    
    // Populate user information for connections
    const connectionsWithUsers = connections.map(conn => {
      const otherUserId = conn.user1 === req.params.userId ? conn.user2 : conn.user1;
      const otherUser = dataStore.findUserById(otherUserId);
      
      return {
        ...conn,
        user: otherUser ? {
          id: otherUser.id,
          name: otherUser.name,
          picture: otherUser.picture
        } : null
      };
    });

    res.json({
      success: true,
      data: connectionsWithUsers,
      count: connectionsWithUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch connections'
    });
  }
});

// GET suggested users for networking
router.get('/suggestions/:userId', (req, res) => {
  try {
    const currentUserId = req.params.userId;
    const userConnections = dataStore.getUserConnections(currentUserId);
    const connectedUserIds = userConnections.map(conn => 
      conn.user1 === currentUserId ? conn.user2 : conn.user1
    );
    
    // Filter out current user and already connected users
    const suggestions = dataStore.users.filter(user => 
      user.id !== currentUserId && !connectedUserIds.includes(user.id)
    ).map(user => ({
      id: user.id,
      name: user.name,
      picture: user.picture
    }));

    res.json({
      success: true,
      data: suggestions.slice(0, 5), // Return top 5 suggestions
      count: suggestions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions'
    });
  }
});

module.exports = router;
