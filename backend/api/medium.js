import express from 'express';
import { fetchMediumPosts } from '../services/mediumService.js';

const router = express.Router();

router.get('/posts/:username', async (req, res) => {
  try {
    console.log('Medium posts request for:', req.params.username);
    const { username } = req.params;
    const posts = await fetchMediumPosts(username);
    console.log('Medium posts response:', posts ? `${posts.length} posts` : 'No data');
    res.json(posts);
  } catch (error) {
    console.error('Medium posts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Medium posts', details: error.message });
  }
});

export default router;