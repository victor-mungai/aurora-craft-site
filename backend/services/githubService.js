import axios from 'axios';

export const fetchGitHubProfile = async (username) => {
  try {
    console.log('Fetching GitHub profile for:', username);
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log('GitHub API response status:', response.status);
    return {
      name: response.data.name,
      bio: response.data.bio,
      avatar_url: response.data.avatar_url,
      public_repos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error.message);
    console.error('Error details:', error.response?.data || error);
    throw error;
  }
};

export const fetchGitHubRepos = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    return response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};