import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'GitHub router is working!' });
});

router.get('/profile/:username', (req, res) => {
  console.log('GitHub profile request for:', req.params.username);
  res.json({ message: `GitHub profile for ${req.params.username}`, status: 'test' });
});

export default router;