import axios from 'axios';

export const fetchMediumPosts = async (username) => {
  try {
    // Medium RSS feed URL
    const rssUrl = `https://medium.com/feed/@${username}`;
    
    // Use RSS2JSON service to convert RSS to JSON
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    
    if (response.data.status !== 'ok') {
      return [];
    }

    // Transform the data to match expected format
    const posts = response.data.items.map(item => ({
      title: item.title,
      description: item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      link: item.link,
      pubDate: item.pubDate,
      thumbnail: '/medium.png'
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
};