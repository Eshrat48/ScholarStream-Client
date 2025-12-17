# Deployment Guide - ScholarStream Client

## Prerequisites

- GitHub repository set up
- Netlify or Vercel account
- Server deployed and accessible (see server deployment guide)
- Stripe account with API keys
- Firebase project configured

## Environment Variables

Before deployment, ensure you have these environment variables ready:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=https://your-server-url.com/api/v1
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

## Option 1: Deploy to Netlify

### Via Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **Configure environment variables**
   - Go to Site Settings → Environment Variables
   - Add all VITE_* variables from your `.env` file

### Via Netlify Web UI

1. **Login to Netlify** (https://app.netlify.com)

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the ScholarStream-Client repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

4. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all variables from your `.env` file

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

## Option 2: Deploy to Vercel

### Via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Configure environment variables**
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_API_URL
# ... add all other variables
```

### Via Vercel Web UI

1. **Login to Vercel** (https://vercel.com)

2. **New Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**
   - Add all VITE_* variables
   - Make sure VITE_API_URL points to your deployed server

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Post-Deployment Steps

### 1. Update Firebase Configuration

Add your deployed domain to Firebase authorized domains:

1. Go to Firebase Console → Authentication → Settings
2. Click "Authorized domains"
3. Add your Netlify/Vercel domain (e.g., `scholarstream.netlify.app`)

### 2. Update Server CORS

Update your server's CORS configuration to include the deployed client URL:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-deployed-client.netlify.app' // Add this
  ],
  credentials: true
};
```

### 3. Test the Deployment

1. **Authentication**
   - Register new account
   - Login with email/password
   - Login with Google

2. **Browse Scholarships**
   - Search functionality
   - Filter by category/degree
   - Sort by fees/deadline

3. **Apply & Payment**
   - Apply for scholarship
   - Complete Stripe payment
   - Verify payment success/failure

4. **Dashboard Features**
   - Student: View applications, leave reviews
   - Moderator: Manage applications, view reviews
   - Admin: All features including analytics

5. **Private Route Reload**
   - Navigate to a protected route
   - Reload the page
   - Should stay on the same page (not redirect to login)

## Custom Domain (Optional)

### Netlify

1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow instructions to update DNS records

### Vercel

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build Fails

- Check Node.js version (use 18 or higher)
- Verify all dependencies are in package.json
- Check for TypeScript errors or missing imports

### Environment Variables Not Working

- Make sure all variables start with `VITE_`
- Redeploy after adding/updating variables
- Check variable names match exactly

### API Calls Failing

- Verify VITE_API_URL is correct
- Check server CORS configuration
- Ensure server is deployed and accessible

### Authentication Issues

- Check Firebase authorized domains
- Verify Firebase config variables
- Test on incognito/private browser

### Payment Issues

- Verify Stripe publishable key is correct
- Check browser console for errors
- Test with Stripe test card: 4242 4242 4242 4242

## Monitoring & Analytics

### Netlify

- Analytics: Site Settings → Analytics
- Build logs: Deploys → [deployment] → Deploy log
- Function logs: Functions → [function name]

### Vercel

- Analytics: Project → Analytics tab
- Build logs: Deployments → [deployment] → Build Logs
- Real-time logs: Project → Logs

## Rollback

If something goes wrong:

### Netlify
1. Go to Deploys
2. Find previous working deployment
3. Click "Publish deploy"

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click ⋯ → "Promote to Production"

## Support

For issues:
- Check deployment logs
- Review environment variables
- Test locally with production API URL
- Contact support via platform dashboard
