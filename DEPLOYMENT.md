# Deployment & PWA Configuration — PaySure

## 1. Production Deployment on Vercel or Node.js

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. The Next.js framework preset will automatically detect App Router settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Node.js Version: `18.x` or higher
4. Configure environment variables (optional for Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.

---

## 2. Progressive Web App (PWA) Support
- **Web App Manifest**: Configured in `/manifest.json` with standalone display, app icons, and theme color `#0b1c3d`.
- **Service Worker**: `/sw.js` caches offline assets to ensure stall operation continues during cellular outages.
- **Home Screen Installation**: Street vendors can tap *"Add to Home Screen"* in Chrome/Edge on Android to run PaySure as a full-screen stall application without browser chrome.
