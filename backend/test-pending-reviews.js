import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testPendingReviews() {
  console.log('Testing pending reviews...');
  
  try {
    // Check all reviews
    const { data: allReviews, error: allError } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (allError) {
      console.error('Error fetching all reviews:', allError);
      return;
    }
    
    console.log(`Total reviews in database: ${allReviews.length}`);
    allReviews.forEach(review => {
      console.log(`- ${review.name}: is_approved = ${review.is_approved}`);
    });
    
    // Check pending reviews specifically
    const { data: pendingReviews, error: pendingError } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });
    
    if (pendingError) {
      console.error('Error fetching pending reviews:', pendingError);
      return;
    }
    
    console.log(`\nPending reviews: ${pendingReviews.length}`);
    pendingReviews.forEach(review => {
      console.log(`- ${review.name}: "${review.review_text.substring(0, 50)}..."`);
    });
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testPendingReviews();