import express from 'express';
import { fetchLinkedInPosts } from '../services/linkedinService.js';

const router = express.Router();

router.get('/linkedin', async (req, res) => {
  try {
    console.log('LinkedIn posts request received (via posts API)');
    const posts = await fetchLinkedInPosts();
    console.log('LinkedIn posts response:', posts ? `${posts.length} posts` : 'No data');
    res.json(posts);
  } catch (error) {
    console.error('LinkedIn posts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts', details: error.message });
  }
});

export default router;