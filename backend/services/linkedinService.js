import axios from 'axios';

export const fetchLinkedInProfile = async () => {
  try {
    const response = await axios.get(`https://api.apify.com/v2/acts/dev_fusion~linkedin-profile-scraper/runs/last/dataset/items?token=${process.env.APIFY_API_KEY}`);
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    throw error;
  }
};

export const fetchLinkedInPosts = async () => {
  try {
    const response = await axios.get(`https://api.apify.com/v2/acts/curious_coder~linkedin-post-search-scraper/runs/last/dataset/items?token=${process.env.APIFY_API_KEY}`);
    return response.data.slice(0, 6).map(post => ({
      id: post.urn,
      text: post.text,
      images: post.images || [],
      url: post.url,
      timeSincePosted: post.timeSincePosted,
      numLikes: post.numLikes,
      numComments: post.numComments,
      numShares: post.numShares,
      postedAtISO: post.postedAtISO,
      type: post.type,
      author: post.author
    }));
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    throw error;
  }
};

export const fetchGitHubRepos = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      topics: repo.topics || []
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
};

export const fetchMediumPosts = async (username) => {
  try {
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mungaivictor2781`);
    return response.data.items?.slice(0, 3).map((post) => ({
      title: post.title,
      link: post.link,
      pubDate: post.pubDate,
      description: post.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      thumbnail: post.thumbnail
    })) || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    throw error;
  }
};