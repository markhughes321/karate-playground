# Deploy to Railway.app

**Railway gives the best user experience** - fast, supports Docker, free tier.

## Steps

1. **Go to** https://railway.app
2. **Sign in** with GitHub
3. **Click** "New Project"
4. **Select** "Deploy from GitHub repo"
5. **Choose** `markhughes321/karate-playground`
6. **Railway will**:
   - Detect Dockerfile
   - Build the Docker image automatically
   - Deploy the server
   - Give you a public URL

## Done!

Railway will give you a URL like: `https://karate-playground-production.up.railway.app`

Users can then:
- Visit the URL
- Edit Karate tests in Monaco Editor
- Run tests with real-time streaming
- No installation needed!

## Why Railway?

- ✅ Supports Docker (your current setup works as-is)
- ✅ Free tier: 500 hours/month
- ✅ Auto-deploys on git push
- ✅ Fast (~3 second test execution)
- ✅ No 791MB WASM download

## Alternative: Render.com

Same process:
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Select Docker environment
5. Deploy

Both work perfectly with your current setup!
