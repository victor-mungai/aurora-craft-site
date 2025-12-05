import fs from 'fs';

const readSecret = (secretName) => {
  try {
    return fs.readFileSync(`/run/secrets/${secretName}`, 'utf8').trim();
  } catch (error) {
    console.warn(`Secret ${secretName} not found, falling back to env var`);
    return null;
  }
};

export const getSecrets = () => ({
  SUPABASE_URL: readSecret('supabase_url') || process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: readSecret('supabase_key') || process.env.SUPABASE_ANON_KEY,
  RESEND_API_KEY: readSecret('resend_key') || process.env.RESEND_API_KEY,
  AWS_API_URL: readSecret('aws_api_url') || process.env.AWS_API_URL,
  AWS_API_KEY: readSecret('aws_api_key') || process.env.AWS_API_KEY,
  APIFY_API_KEY: readSecret('apify_key') || process.env.APIFY_API_KEY
});