import { secrets } from '../utils/secrets.js';

export const getConfig = (req, res) => {
  res.json({
    AWS_API_URL: secrets.AWS_API_URL,
    AWS_API_KEY: secrets.AWS_API_KEY,
    supabaseUrl: secrets.SUPABASE_URL,
    supabaseKey: secrets.SUPABASE_KEY
  });
};