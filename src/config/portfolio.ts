// Portfolio Configuration
export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Victor Mungai",
    title: "DevOps Engineer & Cloud Engineer",
    email: "mungaivictor2781@gmail.com",
    github: "victor-mungai",
    linkedin: "victor-mungai-a998942a2",
    medium: "mungaivictor2781",
  },

  // Social Links
  social: {
    github: "https://github.com/victor-mungai",
    linkedin: "https://www.linkedin.com/in/victor-mungai-a998942a2",
    email: "mailto:mungaivictor2781@gmail.com",
  },

  // S3 Configuration for CV
  s3: {
    bucketName: "your-cv-bucket", // Replace with your S3 bucket name
    cvKey: "victor-mungai-cv.pdf", // Replace with your CV file key
  },

  // API Configuration
  api: {
    githubUsername: "victor-mungai",
    mediumUsername: "mungaivictor2781",
    apifyApiKey: process.env.VITE_APIFY_API_KEY,
    apifyDatasetId: process.env.VITE_APIFY_DATASET_ID,
  },

  // Feature Flags
  features: {
    enableGitHubIntegration: true,
    enableMediumIntegration: true,
    enableLinkedInIntegration: true, // Now enabled with Apify
    enableS3CVDownload: true,
    enableAnimations: true,
    enableFloatingNav: true,
  },

  // Theme Configuration
  theme: {
    primaryColor: "hsl(262.1 83.3% 57.8%)", // Purple
    accentColor: "hsl(210 40% 98%)",
    darkMode: true,
  },
};

export default portfolioConfig;