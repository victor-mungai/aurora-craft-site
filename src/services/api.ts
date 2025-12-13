import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vic.dita.co.ke/';
const APIFY_TOKEN = import.meta.env.VITE_APIFY_API_KEY;

// GitHub API
export const fetchGitHubRepos = async (username: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/github/repos/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export const fetchGitHubProfile = async (username: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/github/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};

// Medium API
export const fetchMediumPosts = async (username: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/medium/posts/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
};

// LinkedIn API
export const fetchLinkedInProfile = async () => {
  try {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/linkedin/profile`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) console.error('Error fetching LinkedIn profile:', error);
    return null;
  }
};

// Projects API
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Stats API
export const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
};

// Skills API
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/skills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return { skillCategories: [], certifications: [], quickStats: [] };
  }
};

// Posts API
export const fetchLinkedInPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/posts/linkedin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return [];
  }
};

// S3 CV Download
export const getS3CVUrl = (bucketName: string, key: string) => {
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};

// Reviews API
export const fetchReviews = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace(/\/$/, '')}/api/reviews?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const submitReview = async (reviewData: any) => {
  try {
    const { configService } = await import('@/services/config');
    const config = await configService.getConfig();
    
    const response = await axios.post(`${config.AWS_API_URL}/review`, reviewData, {
      headers: {
        'x-api-key': config.AWS_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Image optimization
export const optimizeImageUrl = (url: string, width?: number, height?: number) => {
  if (!url) return url;
  return url;
};