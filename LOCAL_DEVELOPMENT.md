# Local Development Guide

This guide explains how to set up and run the Chokmah Mobile app with your local backend API running on port 3000.

## Quick Start

The app is **already configured** to use `http://localhost:3000` by default!

### 1. Start Your Backend

```bash
cd /path/to/chokmah-backend
rails server -p 3000
```

Verify it's running:
```bash
curl http://localhost:3000
# Should return a response from your Rails app
```

### 2. Start the Mobile App

```bash
cd chokmah-mobile
npm install  # if you haven't already
npm start
```

### 3. Test on Your Platform

- **Web:** Press `w` - will open in browser
- **iOS:** Press `i` - will open in iOS Simulator
- **Android:** Press `a` - will open in Android Emulator

---

## Platform-Specific URLs

### iOS Simulator ✅
Uses: `http://localhost:3000`

The iOS simulator can access your host machine's localhost directly.

### Android Emulator ✅
Uses: `http://10.0.2.2:3000`

The app **automatically** uses this for Android. The emulator cannot use `localhost` - it has to use the special alias `10.0.2.2` which points to the host machine.

### Web Browser ✅
Uses: `http://localhost:3000`

Web browser can access localhost directly.

### Physical Device 📱

If testing on a real phone/tablet, you need to use your computer's IP address:

1. **Find your IP address:**
   ```bash
   # Mac/Linux:
   ifconfig | grep "inet "
   # or
   ipconfig getifaddr en0
   
   # Windows:
   ipconfig
   ```

2. **Update the URL in `src/constants/api.js`:**
   ```javascript
   development: {
     name: 'Development',
     ios: 'http://192.168.1.100:3000',      // Use your actual IP
     android: 'http://192.168.1.100:3000',  // Use your actual IP
     web: 'http://192.168.1.100:3000',      // Use your actual IP
     default: 'http://192.168.1.100:3000',  // Use your actual IP
   },
   ```

3. **Make sure your phone and computer are on the same Wi-Fi network**

4. **Allow incoming connections on port 3000:**
   ```bash
   # Rails should bind to 0.0.0.0, not just localhost
   rails server -b 0.0.0.0 -p 3000
   ```

---

## Switching Environments

### Current Environment

The app uses the environment set in `src/constants/api.js`:

```javascript
const currentEnvironment = 'development'; // <- Change this line
```

### Available Environments

1. **'development'** - Local backend (localhost:3000)
2. **'staging'** - Staging server (if you have one)
3. **'production'** - Production backend (render.com)

### How to Switch

Edit `src/constants/api.js` and change line 41:

```javascript
// For local development (default)
const currentEnvironment = 'development';

// For production
const currentEnvironment = 'production';
```

Save the file and the app will automatically reload with the new URL.

---

## Verifying Configuration

### Check Current API URL

When you start the app, check the console output:

```
===========================================
📡 API Configuration
===========================================
Environment: Development
Platform: ios
API URL: http://localhost:3000
===========================================
```

### Test API Connection

Run the test script:

```bash
node test-api.js
```

This will:
- Test backend connectivity
- Try the login endpoint
- Show exactly what URL is being used

### Check in App

When you try to sign in, watch the console for logs like:

```
🔵 API REQUEST
Method: POST
URL: http://localhost:3000/api/v1/login
Data: { user: { email: "...", password: "***" } }
```

This shows exactly what URL the app is hitting.

---

## Common Issues

### Issue: "Network error" or "Failed to connect"

**Cause:** Backend not running or wrong URL

**Fix:**
1. Check backend is running: `curl http://localhost:3000`
2. Check the URL in console logs matches your backend
3. Make sure nothing else is using port 3000

### Issue: Android emulator can't connect

**Cause:** Using `localhost` instead of `10.0.2.2`

**Fix:** The app should handle this automatically. If not, verify `src/constants/api.js` has:
```javascript
android: 'http://10.0.2.2:3000',
```

### Issue: Physical device can't connect

**Cause:** Using localhost instead of your computer's IP

**Fix:** 
1. Find your IP address (see "Physical Device" section above)
2. Update all URLs in the development environment
3. Make sure Rails is bound to 0.0.0.0: `rails s -b 0.0.0.0 -p 3000`
4. Check firewall isn't blocking port 3000

### Issue: "CORS error" in console

**Cause:** Backend not configured to allow requests from mobile app

**Fix:** Add CORS configuration to your Rails backend:

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # For development. Use specific origins in production!
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

### Issue: 404 "Route not found"

**Cause:** API endpoints don't match backend routes

**Fix:** Compare endpoints in `src/constants/api.js` with your backend's `config/routes.rb`

---

## Backend Setup Checklist

Make sure your Rails backend has:

- [x] Running on port 3000: `rails s -p 3000`
- [x] CORS configured (if testing from web)
- [x] Routes match mobile app endpoints
- [x] Authentication working (can sign in via curl)
- [x] Accepts JSON requests and returns JSON responses

---

## Testing Your Setup

### 1. Test Backend Directly

```bash
# Test root endpoint
curl http://localhost:3000

# Test login
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@example.com","password":"password"}}'
```

### 2. Test from Mobile App

1. Start the app
2. Try to sign in
3. Watch console logs for API requests
4. Check for errors

### 3. Use the API Test Script

```bash
node test-api.js
```

This will automatically test connectivity and endpoints.

---

## Pro Tips

### Hot Reload

Both the mobile app and Rails support hot reload:
- Mobile: Changes to JS files reload automatically
- Rails: Code changes reload on next request

### Console Logs

The app logs every API request with:
- Request method and URL
- Request data
- Response status and data
- Errors with details

Check your console/terminal to debug API issues.

### Quick Environment Switch

Create aliases for quick switching:

```bash
# In your ~/.bashrc or ~/.zshrc
alias dev-api='cd ~/projects/chokmah-backend && rails s -p 3000'
alias dev-mobile='cd ~/projects/chokmah-mobile && npm start'
```

Then just run:
```bash
dev-api    # In one terminal
dev-mobile # In another terminal
```

---

## Next Steps

Once your local development is working:

1. **Test all features** - Try sign in, registration, uploading files, etc.
2. **Check the logs** - Make sure API calls are working correctly
3. **Compare with backend** - Ensure endpoints match your Rails routes
4. **Update as needed** - Adjust endpoints in `src/constants/api.js` if different

When ready to deploy:
1. Change environment to 'production' in `src/constants/api.js`
2. Build the app for iOS/Android
3. Deploy!

---

## Need Help?

- Check [API_TROUBLESHOOTING.md](./API_TROUBLESHOOTING.md) for detailed debugging
- Check [SIGNIN_FIX_GUIDE.md](./SIGNIN_FIX_GUIDE.md) for sign-in issues
- Run `node test-api.js` to diagnose API problems
- Check console logs for detailed error messages
