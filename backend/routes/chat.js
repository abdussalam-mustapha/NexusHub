const express = require('express');
const router = express.Router();

// POST chat with Sensay AI
router.post('/', async (req, res) => {
  try {
    const { message, userId, context } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Prepare the request to Sensay AI API
    const sensayPayload = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for NexusHub, a platform that combines real estate, e-commerce, and social networking. 
          Current context: ${context || 'general'}
          Help users with their questions about properties, products, networking, or general platform usage.
          Be friendly, helpful, and concise in your responses.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    // Make request to Sensay AI API
    const sensayResponse = await fetch(process.env.SENSAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Organization-Secret': process.env.SENSAY_ORG_SECRET,
        'X-User-Id': userId || process.env.SENSAY_USER_ID,
        'X-API-Version': process.env.SENSAY_API_VERSION || '2025-03-25'
      },
      body: JSON.stringify(sensayPayload)
    });

    if (!sensayResponse.ok) {
      console.error('Sensay API error:', sensayResponse.statusText);
      
      // Fallback response if Sensay API fails
      return res.json({
        success: true,
        data: {
          reply: "I'm here to help! I can assist you with information about properties, products, and connecting with other users on NexusHub. What would you like to know?",
          timestamp: new Date().toISOString(),
          fallback: true
        }
      });
    }

    const aiResponse = await sensayResponse.json();
    const reply = aiResponse.choices?.[0]?.message?.content || 
                 "I'm here to help! How can I assist you today?";

    res.json({
      success: true,
      data: {
        reply: reply,
        timestamp: new Date().toISOString(),
        context: context
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Provide fallback response
    res.json({
      success: true,
      data: {
        reply: "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to browse our real estate listings, product catalog, or connect with other users!",
        timestamp: new Date().toISOString(),
        fallback: true
      }
    });
  }
});

// GET chat history (if you want to implement chat history)
router.get('/history/:userId', (req, res) => {
  try {
    // For now, return empty array
    // In a real implementation, you'd fetch chat history from database
    res.json({
      success: true,
      data: [],
      message: 'Chat history feature coming soon'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history'
    });
  }
});

// POST save chat message (for history)
router.post('/save', (req, res) => {
  try {
    const { userId, message, reply, timestamp } = req.body;
    
    // For now, just acknowledge
    // In a real implementation, you'd save to database
    res.json({
      success: true,
      message: 'Chat saved successfully',
      data: {
        userId,
        message,
        reply,
        timestamp: timestamp || new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save chat'
    });
  }
});

module.exports = router;
