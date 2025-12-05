# Production Deployment Guide

## Prerequisites
- Node.js 18+ and npm 8+
- Domain name configured
- SSL certificate setup

## Frontend Deployment

### Build for Production
```bash
npm run build:prod
```

### Deploy to Static Hosting (Vercel/Netlify)
```bash
# Upload dist/ folder to your hosting provider
# Or use their CLI tools
```

### Environment Variables (Frontend)
Set these in your hosting provider:
- `VITE_API_BASE_URL=https://your-api-domain.com/`
- `VITE_APIFY_API_KEY=re_8ahz7iyY_2N9SP4W83rssY8NUeNdKqdjG`

## Backend Deployment

### Deploy to Server (Railway/Render/DigitalOcean)
```bash
cd backend
npm install --production
npm run prod
```

### Environment Variables (Backend)
Set these on your server:
- `NODE_ENV=production`
- `PORT=5050`
- `FRONTEND_URL=https://your-domain.com`
- `RESEND_API_KEY=re_8ahz7iyY_2N9SP4W83rssY8NUeNdKqdjG`

## Security Checklist
- ✅ Helmet.js for security headers
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ API rate limiting (consider adding)
- ✅ Input validation on contact form

## Performance Optimizations
- ✅ Vite build optimization
- ✅ Image optimization in components
- ✅ Lazy loading implemented
- ✅ Glass morphism optimized for mobile

## Monitoring
- Set up error logging
- Monitor API response times
- Track email delivery success rates