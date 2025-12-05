import { createClient } from '@supabase/supabase-js';

let supabase = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables:');
      console.error('SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
      console.error('SUPABASE_ANON_KEY:', supabaseKey ? 'Present' : 'Missing');
      throw new Error('Supabase environment variables are required');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

export const fetchReviews = async (page = 1, limit = 6) => {
  try {
    const offset = (page - 1) * limit;
    const { data, error } = await getSupabaseClient()
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const submitReview = async (reviewData) => {
  try {
    console.log('Submitting review data:', reviewData);
    const { data, error } = await getSupabaseClient()
      .from('reviews')
      .insert([{ ...reviewData, is_approved: false }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    console.log('Review submitted successfully:', data);
    return data[0];
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export const fetchPendingReviews = async () => {
  try {
    console.log('Fetching pending reviews from Supabase...');
    const { data, error } = await getSupabaseClient()
      .from('reviews')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error in fetchPendingReviews:', error);
      throw error;
    }
    console.log('Pending reviews from DB:', data ? `Found ${data.length} pending reviews` : 'No pending reviews found');
    return data || [];
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    throw error;
  }
};

export const approveReview = async (id) => {
  try {
    console.log('Approving review with ID:', id);
    const { data, error } = await getSupabaseClient()
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error in approveReview:', error);
      throw error;
    }
    console.log('Review approved successfully:', data);
    return data[0];
  } catch (error) {
    console.error('Error approving review:', error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const { error } = await getSupabaseClient()
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};