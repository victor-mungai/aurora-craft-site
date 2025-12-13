import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import linkedinRouter from './api/linkedin.js';
import githubRouter from './api/github.js';
import mediumRouter from './api/medium.js';
import projectsRouter from './api/projects.js';
import statsRouter from './api/stats.js';
import skillsRouter from './api/skills.js';
import postsRouter from './api/posts.js';
import reviewsRouter from './api/reviews.js';
import { sendContactEmail } from './api/contact.js';
import { getConfig } from './api/config.js';
import { proxyImage } from './api/proxy.js';
import { getSecrets } from './utils/secrets.js';

dotenv.config({ path: './.env' });

// Load secrets and set as env vars
const secrets = getSecrets();
Object.assign(process.env, secrets);

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Loaded' : 'Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Loaded' : 'Missing');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = NODE_ENV === 'production' 
  ? ['https://victormungai.dpdns.org', 'http://102.213.179.45']
  : ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:5174'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/linkedin', linkedinRouter);
app.use('/api/github', githubRouter);
app.use('/api/medium', mediumRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/reviews', reviewsRouter);
app.post('/api/contact', sendContactEmail);
app.get('/api/config', getConfig);
app.get('/api/proxy/image', proxyImage);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

app.get('/api/debug', (req, res) => {
  res.json({ 
    message: 'Debug info',
    routes: {
      reviews: '/api/reviews',
      reviewsTest: '/api/reviews/test',
      reviewsPending: '/api/reviews/pending'
    },
    port: PORT,
    env: NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio API server running on port ${PORT} in ${NODE_ENV} mode`);
});