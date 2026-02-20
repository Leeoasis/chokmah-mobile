# ✅ Your API is Now Configured for localhost:3000

## What Changed

The Chokmah Mobile app now connects to **`http://localhost:3000`** by default, perfect for your local development environment!

## Quick Start

### 1. Start Your Backend
```bash
cd /path/to/your/backend
rails server -p 3000
```

### 2. Verify It's Running
```bash
curl http://localhost:3000
```
You should see a response from your Rails app.

### 3. Start the Mobile App
```bash
cd chokmah-mobile
npm start
```

### 4. Choose Your Platform
- Press **`w`** for Web Browser
- Press **`i`** for iOS Simulator
- Press **`a`** for Android Emulator

### 5. Sign In!
Try signing in with your credentials. The app will connect to your local backend automatically.

---

## How It Works

### Automatic Platform Detection

The app automatically uses the correct URL for each platform:

| Platform | URL Used |
|----------|----------|
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` ⭐ |
| Web Browser | `http://localhost:3000` |
| Physical Device | Use your computer's IP |

⭐ Android emulators can't use "localhost" - they need `10.0.2.2`, which the app handles automatically!

### Configuration

The magic happens in **`src/constants/api.js`**:

```javascript
const ENVIRONMENTS = {
  development: {
    name: 'Development',
    ios: 'http://localhost:3000',
    android: 'http://10.0.2.2:3000',
    web: 'http://localhost:3000',
    default: 'http://localhost:3000',
  },
  production: {
    name: 'Production',
    // ... production URLs
  },
};

// 👇 This line controls which environment to use
const currentEnvironment = 'development';
```

### Console Output

When you start the app, you'll see:
```
===========================================
📡 API Configuration
===========================================
Environment: Development
Platform: ios
API URL: http://localhost:3000
===========================================
```

This confirms which API URL the app is using!

---

## Testing Your Setup

### Option 1: Quick Test Script
```bash
node test-api.js
```

This will:
- Test if your backend is reachable
- Try the login endpoint
- Try the register endpoint
- Show you exactly what's happening

### Option 2: Manual cURL Test
```bash
# Test that backend is running
curl http://localhost:3000

# Test login endpoint
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@test.com","password":"password"}}'
```

---

## Switching to Production Later

When you're ready to test against the production backend:

1. **Edit `src/constants/api.js`**
2. **Change line 41:**
   ```javascript
   const currentEnvironment = 'production'; // Change from 'development'
   ```
3. **Save and reload the app**

That's it! The app will now use the production URL.

---

## Testing on Physical Devices

If you want to test on a real phone/tablet:

### Find Your Computer's IP Address

**Mac/Linux:**
```bash
ifconfig | grep "inet "
# or
ipconfig getifaddr en0
```

**Windows:**
```bash
ipconfig
```

Look for your local network IP (usually starts with `192.168` or `10.0`).

### Update the Configuration

Edit `src/constants/api.js` and replace localhost with your IP:

```javascript
development: {
  name: 'Development',
  ios: 'http://192.168.1.100:3000',      // Use YOUR IP
  android: 'http://192.168.1.100:3000',  // Use YOUR IP
  web: 'http://192.168.1.100:3000',      // Use YOUR IP
  default: 'http://192.168.1.100:3000',  // Use YOUR IP
},
```

### Start Backend with External Access

```bash
rails server -b 0.0.0.0 -p 3000
```

This allows connections from other devices on your network.

### Make Sure Your Phone and Computer Are on the Same Wi-Fi!

---

## Common Issues & Solutions

### ❌ "Network error" or "Can't connect"

**Check:**
1. Is your backend running? `curl http://localhost:3000`
2. Check the console - what URL is being used?
3. If on Android, is it using `10.0.2.2`?

**Fix:**
- Make sure `rails s -p 3000` is running
- Check the console logs for the exact URL being used

### ❌ "404 Not Found"

**Check:**
- Do your backend routes match the endpoints?
- Compare `config/routes.rb` with `src/constants/api.js`

**Fix:**
- Update the endpoints in `src/constants/api.js` to match your backend

### ❌ Android emulator can't connect

**Should work automatically!** The app uses `10.0.2.2:3000` for Android.

If it doesn't work, verify in `src/constants/api.js`:
```javascript
android: 'http://10.0.2.2:3000',
```

### ❌ CORS errors (in browser console)

**Fix:** Add CORS configuration to your Rails backend:

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # For development only!
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

---

## Documentation

I've created several helpful guides:

- **[LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)** - Complete local development guide
- **[SIGNIN_FIX_GUIDE.md](SIGNIN_FIX_GUIDE.md)** - Quick sign-in troubleshooting
- **[API_TROUBLESHOOTING.md](API_TROUBLESHOOTING.md)** - Detailed API debugging
- **[README.md](README.md)** - Main documentation (updated)

---

## Summary

✅ **App now points to `http://localhost:3000` by default**
✅ **Automatic platform-specific URLs (Android uses 10.0.2.2)**
✅ **Easy switching between development and production**
✅ **Console logs show exact API configuration**
✅ **Test script supports localhost**
✅ **Comprehensive documentation**

**You're all set!** Just start your backend and mobile app, then sign in. 🚀

---

## Need Help?

1. Run `node test-api.js` for automated diagnosis
2. Check console logs when starting the app
3. Read [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for details
4. Check [API_TROUBLESHOOTING.md](API_TROUBLESHOOTING.md) for debugging

Good luck! 🎉
