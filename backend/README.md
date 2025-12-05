# Portfolio Backend API

Node.js/Express backend for Victor Mungai's portfolio website with secure Docker Swarm deployment.

## Features

- **Reviews System**: CRUD operations with Supabase integration
- **Contact Form**: Email sending via Resend API
- **Config Endpoint**: Secure runtime configuration for frontend
- **External APIs**: LinkedIn, GitHub, Medium integration
- **Docker Swarm**: Encrypted secrets management

## API Endpoints

### Core APIs
- `GET /api/config` - Runtime configuration (AWS secrets)
- `POST /api/contact` - Send contact emails
- `GET /api/reviews` - Fetch approved reviews
- `POST /api/reviews` - Submit new review
- `GET /api/reviews/pending` - Admin: pending reviews
- `PUT /api/reviews/:id/approve` - Admin: approve review
- `DELETE /api/reviews/:id` - Admin: delete review

### External Data
- `GET /api/linkedin/*` - LinkedIn profile/posts
- `GET /api/github/*` - GitHub repositories
- `GET /api/medium/*` - Medium articles
- `GET /api/projects` - Project data
- `GET /api/stats` - Portfolio statistics

## Deployment

### Docker Swarm (Production)

1. **Initialize swarm**:
```bash
docker swarm init
```

2. **Create secrets**:
```bash
docker secret create supabase_url - <<< "https://your-supabase-url.supabase.co"
docker secret create supabase_key - <<< "your_supabase_anon_key"
docker secret create resend_key - <<< "re_your_resend_api_key"
docker secret create aws_api_url - <<< "https://your-api-gateway.amazonaws.com/prod"
docker secret create aws_api_key - <<< "your_aws_api_key"
docker secret create apify_key - <<< "apify_api_your_apify_key"
```

3. **Deploy stack**:
```bash
docker stack deploy -c docker-compose.yaml portfolio
```

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Set environment variables** in `.env`:
```bash
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=re_your_resend_api_key
AWS_API_URL=https://your-api-gateway.amazonaws.com/prod
AWS_API_KEY=your_aws_api_key
APIFY_API_KEY=apify_api_your_apify_key
```

3. **Start server**:
```bash
npm run dev
```

## Security

- **Docker Secrets**: Encrypted at rest, never stored in images
- **Runtime Config**: Secrets served to frontend at runtime
- **CORS**: Configured for production domains
- **Helmet**: Security headers middleware

## Architecture

```
Frontend (Static) → Backend API → External Services
                 ↓
              Docker Swarm
                 ↓
            Encrypted Secrets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `RESEND_API_KEY` | Resend email service key | Yes |
| `AWS_API_URL` | AWS API Gateway URL | Yes |
| `AWS_API_KEY` | AWS API Gateway key | Yes |
| `APIFY_API_KEY` | Apify scraping service key | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 3001) | No |

## Database Schema

Reviews table in Supabase:
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(100),
  position VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```