import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Simple auth middleware (use a strong password in production)
const adminAuth = (req, res, next) => {
  const { password } = req.body;
  if (password !== 'your-admin-password-here') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get pending reviews
router.post('/reviews/pending', adminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve review
router.post('/reviews/approve/:id', adminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;