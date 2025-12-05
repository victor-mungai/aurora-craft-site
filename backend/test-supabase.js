import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
console.log('SUPABASE_ANON_KEY:', supabaseKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
async function testConnection() {
  try {
    console.log('Testing reviews table access...');
    const { data, error } = await supabase
      .from('reviews')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Connection successful!');
    }
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();