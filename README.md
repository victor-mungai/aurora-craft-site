# Victor Mungai - Full-Stack Portfolio Platform

A modern, secure, and scalable portfolio website with hybrid cloud architecture featuring AWS serverless integration, Docker Swarm deployment, and runtime security.

## 🏗️ Architecture Overview

```
Frontend (Static)     Backend (Docker Swarm)     AWS Serverless
     ↓                        ↓                        ↓
React/TypeScript    →    Node.js/Express    →    API Gateway
Vite Build                Supabase DB              SQS Queues
Static Hosting           Docker Secrets           Lambda Functions
                         Port 3123                Email/Processing
```

## 🚀 Key Features

### Frontend (React/TypeScript)
- **Modern UI/UX** - Glassmorphism design with dark theme
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Dynamic Content** - GitHub repos, Medium articles, LinkedIn posts
- **Interactive Elements** - Animated counters, smooth scrolling, hover effects
- **Runtime Configuration** - Secure secret fetching from backend

### Backend (Node.js/Express)
- **Reviews System** - Full CRUD with admin approval workflow
- **Contact Management** - Email integration via Resend API
- **External APIs** - GitHub, LinkedIn, Medium data aggregation
- **Security** - Docker Swarm encrypted secrets, CORS, Helmet middleware
- **Config Endpoint** - Runtime secret delivery to frontend

### AWS Serverless Integration
- **API Gateway** - RESTful endpoints with API key authentication
- **SQS Queues** - Reliable message processing for submissions
- **Lambda Functions** - Serverless processing for contact/review submissions
- **Terraform IaC** - Complete infrastructure as code

## 🔒 Security Architecture

### Multi-Layer Security
1. **Docker Swarm Secrets** - Encrypted at rest, never in images
2. **Runtime Configuration** - Secrets fetched at runtime, not build-time
3. **API Gateway Authentication** - API key protection for AWS endpoints
4. **CORS Protection** - Configured for production domains
5. **Input Validation** - Server-side validation for all endpoints

### Secret Management Flow
```
Docker Secrets → Backend Runtime → Frontend Config API → Client Usage
```

## 📁 Project Structure

```
aurora-craft-site/
├── src/                          # Frontend React/TypeScript
│   ├── components/portfolio/     # Portfolio sections
│   ├── services/                 # API integrations & config
│   └── pages/                    # Main pages & admin panel
├── backend/                      # Node.js API server
│   ├── api/                      # Route handlers
│   ├── services/                 # External service integrations
│   ├── utils/                    # Docker secrets reader
│   ├── secrets/                  # Secret files (gitignored)
│   ├── Dockerfile               # Multi-stage container build
│   └── docker-compose.yaml      # Swarm deployment config
├── Terraform/                    # AWS Infrastructure
│   ├── main.tf                  # API Gateway & integrations
│   ├── sqs.tf                   # SQS queue definitions
│   └── variables.tf             # Configuration variables
└── README.md                    # This file
```

## 🚀 Deployment Guide

### Prerequisites
- Docker Swarm initialized
- AWS CLI configured
- Terraform installed
- Domain/IP for backend (currently: `62.169.16.219:3123`)

### 1. AWS Infrastructure Setup
```bash
cd Terraform/
terraform init
terraform plan
terraform apply
```

### 2. Backend Deployment (Docker Swarm)
```bash
cd backend/

# Initialize swarm
docker swarm init

# Create encrypted secrets
docker secret create supabase_url - <<< "your_supabase_url"
docker secret create supabase_key - <<< "your_supabase_key"
docker secret create resend_key - <<< "your_resend_key"
docker secret create aws_api_url - <<< "your_aws_api_url"
docker secret create aws_api_key - <<< "your_aws_api_key"
docker secret create apify_key - <<< "your_apify_key"

# Deploy stack
docker stack deploy -c docker-compose.yaml portfolio
```

### 3. Frontend Deployment
```bash
# Build for production
npm run build:prod

# Deploy dist/ to static hosting
# (Netlify, Vercel, S3, etc.)
```

## 🔧 Configuration

### Environment Variables




**Backend** (Docker Secrets):
- `supabase_url` - Supabase project URL
- `supabase_key` - Supabase anonymous key
- `resend_key` - Email service API key
- `aws_api_url` - API Gateway endpoint
- `aws_api_key` - API Gateway authentication key
- `apify_key` - Web scraping service key

## 📊 API Endpoints

### Backend APIs (Port 3123)
- `GET /api/config` - Runtime configuration for frontend
- `GET /api/reviews` - Fetch approved reviews
- `POST /api/contact` - Send contact emails (local fallback)
- `GET /api/reviews/pending` - Admin: pending reviews
- `PUT /api/reviews/:id/approve` - Admin: approve review
- `GET /api/github/*` - GitHub integration
- `GET /api/linkedin/*` - LinkedIn integration
- `GET /api/medium/*` - Medium integration

### AWS APIs (Serverless)
- `POST /contact` - Contact form submissions → SQS → Lambda
- `POST /review` - Review submissions → SQS → Lambda

## 🛠️ Development

### Local Development
```bash
# Backend
cd backend/
npm install
npm run dev

# Frontend
npm install
npm run dev
```

### Testing AWS Integration
```bash
# Test contact endpoint
curl -X POST https://your-api-gateway.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

## 🔄 Data Flow

### Review Submission Flow
1. **Frontend Form** → AWS API Gateway
2. **API Gateway** → SQS Queue (with authentication)
3. **SQS** → Lambda Function (automatic trigger)
4. **Lambda** → Supabase Database (review stored as pending)
5. **Admin Panel** → Backend API → Approve/Reject

### Contact Form Flow
1. **Frontend Form** → AWS API Gateway
2. **API Gateway** → SQS Queue
3. **SQS** → Lambda Function
4. **Lambda** → Resend API (email sent)

### Configuration Flow
1. **Frontend Startup** → Backend `/api/config`
2. **Backend** → Docker Secrets (encrypted)
3. **Response** → Frontend (AWS credentials)
4. **Frontend** → AWS APIs (authenticated requests)

## 🎯 Performance Features

- **Static Frontend** - CDN-ready, fast loading
- **Serverless Processing** - Auto-scaling AWS Lambda
- **Database Optimization** - Supabase with proper indexing
- **Container Optimization** - Multi-stage Docker builds
- **Secret Security** - Runtime-only secret access

## 📈 Monitoring & Maintenance

### Health Checks
- `GET /api/health` - Backend health status
- AWS CloudWatch - Lambda function monitoring
- Docker Swarm - Service health monitoring

### Log Management
- Docker Swarm logs: `docker service logs portfolio_backend`
- AWS CloudWatch logs for Lambda functions
- Frontend error tracking via browser dev tools

## 🔮 Future Enhancements

- **CI/CD Pipeline** - Automated deployment
- **SSL/TLS** - HTTPS for backend
- **Load Balancing** - Multiple backend instances
- **Monitoring Dashboard** - Grafana/Prometheus integration
- **Backup Strategy** - Automated database backups

---

**Built with**: React, TypeScript, Node.js, Docker Swarm, AWS (API Gateway, SQS, Lambda), Terraform, Supabase

**Security**: Docker Secrets, Runtime Configuration, API Authentication, CORS Protection

**Deployment**: Hybrid Cloud (Static Frontend + Containerized Backend + Serverless Processing)