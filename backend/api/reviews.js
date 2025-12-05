import express from 'express';
import { fetchReviews, submitReview, fetchPendingReviews, approveReview, deleteReview } from '../services/supabaseService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    console.log('Reviews fetch request received', { page, limit });
    const reviews = await fetchReviews(page, limit);
    console.log('Reviews response:', reviews ? `${reviews.length} reviews` : 'No data');
    res.json(reviews);
  } catch (error) {
    console.error('Reviews fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Review submission request received:', req.body);
    
    // Validate required fields
    const { name, email, rating, review_text } = req.body;
    if (!name || !email || !rating || !review_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const review = await submitReview(req.body);
    console.log('Review submitted successfully:', review);
    res.status(201).json(review);
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit review', 
      details: error.message,
      stack: error.stack 
    });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: 'Reviews router is working!' });
});

router.get('/pending', async (req, res) => {
  try {
    console.log('Pending reviews fetch request received');
    const reviews = await fetchPendingReviews();
    console.log('Pending reviews response:', reviews ? `${reviews.length} pending reviews` : 'No pending reviews');
    res.json(reviews);
  } catch (error) {
    console.error('Pending reviews fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch pending reviews', details: error.message });
  }
});

router.put('/:id/approve', async (req, res) => {
  try {
    const review = await approveReview(req.params.id);
    res.json(review);
  } catch (error) {
    console.error('Review approval error:', error.message);
    res.status(500).json({ error: 'Failed to approve review', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteReview(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Review deletion error:', error.message);
    res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
});

export default router;