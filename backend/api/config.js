export const getConfig = (req, res) => {
  res.json({
    AWS_API_URL: process.env.AWS_API_URL,
    AWS_API_KEY: process.env.AWS_API_KEY
  });
};