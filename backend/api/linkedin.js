import express from 'express';
import { fetchLinkedInProfile, fetchLinkedInPosts } from '../services/linkedinService.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    console.log('LinkedIn profile request received');
    const profile = await fetchLinkedInProfile();
    console.log('LinkedIn profile response:', profile ? 'Success' : 'No data');
    res.json(profile);
  } catch (error) {
    console.error('LinkedIn profile error:', error.message);
    res.status(500).json({ error: 'Failed to fetch LinkedIn profile', details: error.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    console.log('LinkedIn posts request received');
    const posts = await fetchLinkedInPosts();
    console.log('LinkedIn posts response:', posts ? `${posts.length} posts` : 'No data');
    res.json(posts);
  } catch (error) {
    console.error('LinkedIn posts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts', details: error.message });
  }
});

export default router;