import express from 'express';
const router = express.Router();

// Chatbot endpoint
router.post('/chat', async (req, res) => {
  // ...integrate with Sensay AI API...
  res.json({ message: 'AI chat response' });
});

export default router;
