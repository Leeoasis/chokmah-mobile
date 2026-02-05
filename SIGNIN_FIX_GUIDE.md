# 🔧 How to Fix Sign-In Issues - Quick Start

## The Problem
You can't sign in to the Chokmah Mobile app and need to ensure you're hitting the correct API endpoints.

## The Solution
I've added comprehensive debugging tools to help you diagnose and fix the issue.

---

## 🏠 Using Local Development?

**If your backend is running on `localhost:3000`:**

The app is **already configured** for local development by default! Just:

1. **Start your backend:**
   ```bash
   cd /path/to/backend
   rails server -p 3000
   ```

2. **Verify it's running:**
   ```bash
   curl http://localhost:3000
   ```

3. **Start the app and sign in!**

If still having issues, continue with the diagnosis below.

📖 **See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for detailed local setup**

---

## 🚀 Quick Diagnosis (30 seconds)

### Step 1: Run the Diagnostic Tool

```bash
cd chokmah-mobile
node test-api.js
```

This will automatically test the configured API (localhost or production) and check:
- ✅ Is the backend reachable?
- ✅ Does the login endpoint exist?
- ✅ Does the register endpoint exist?

**Example output:**
```
═══════════════════════════════════════════════════════════
         CHOKMAH API DIAGNOSTIC REPORT
═══════════════════════════════════════════════════════════

Backend Reachable:     ✅ YES
Login Endpoint:        ✅ WORKING
Register Endpoint:     ✅ WORKING

RECOMMENDATIONS
All tests passed! Try signing in with valid credentials.
```

---

### Step 2: Check Your Environment

When you start the app (`npm start`), look for this in the console:

```
===========================================
📡 API Configuration
===========================================
Environment: Development (or Production)
Platform: ios (or android, web)
API URL: http://localhost:3000 (or production URL)
===========================================
```

This tells you exactly which API the app is using.

---

### Step 3: Wake Up the Backend (Production Only)

**Only if using production backend on Render.com:**

Render.com free tier puts apps to sleep after inactivity.

**Open in browser:**
```
https://chokmah-resources-backend.onrender.com
```

- If it takes 30-60 seconds to load, it was sleeping
- Now it's awake and ready to use
- Try signing in again

---

### Step 3: Try Signing In With Console Open

When you run the app, you'll now see detailed logs like:

```
🔵 API REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Method: POST
URL: https://chokmah-resources-backend.onrender.com/api/v1/login
Data: {
  "user": {
    "email": "yourlogin@example.com",
    "password": "***"
  }
}
```

Then either:

**Success:**
```
✅ API RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 200
Response Data: {
  "token": "...",
  "user": {...}
}
```

**Or Error:**
```
🔴 API ERROR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 401
Response Data: {
  "error": "Invalid credentials"
}
```

This tells you **exactly** what's wrong!

---

## 📋 Common Issues & Fixes

### Issue 1: Backend Not Reachable
**Symptom:** Network error, can't connect

**Fix:**
1. Check internet connection
2. Visit backend URL in browser to wake it up
3. Wait 60 seconds for Render.com to wake up
4. Try again

---

### Issue 2: Wrong Credentials
**Symptom:** 401 Unauthorized, "Invalid credentials"

**Fix:**
1. Double-check email and password
2. Ensure user exists in backend database
3. Try registering a new account first

---

### Issue 3: Endpoint Not Found (404)
**Symptom:** 404 error when trying to login

**Fix:** API endpoints don't match backend routes

**Check your backend** (`config/routes.rb`):
```ruby
namespace :api do
  namespace :v1 do
    post 'login', to: 'sessions#create'    # Should be /api/v1/login
    post 'signup', to: 'users#create'      # Should be /api/v1/signup
  end
end
```

**If different, update mobile app** (`src/constants/api.js`):
```javascript
export const API_ENDPOINTS = {
  LOGIN: '/api/v1/login',      // Update to match backend
  REGISTER: '/api/v1/signup',  // Update to match backend
  // ...
};
```

---

### Issue 4: Wrong Request Format
**Symptom:** 422 Unprocessable Entity

**Check your backend controller** expects `params[:user][:email]`:
```ruby
def create
  user = User.find_by(email: params[:user][:email])
  # ...
end
```

**Mobile app sends** (in `src/services/api/authAPI.js`):
```javascript
const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
  user: { email, password },  // Wrapped in 'user' object
});
```

**If backend expects different format**, update the mobile app.

---

## 📚 Full Documentation

I've created 3 comprehensive guides:

### 1. **API_TROUBLESHOOTING.md**
Step-by-step debugging guide with solutions for all common issues.

### 2. **API_ENDPOINTS_GUIDE.md**
Complete reference of all API endpoints with examples:
- Request formats
- Response formats
- Error codes
- Testing commands

### 3. **test-api.js**
Automated diagnostic tool (already used above).

---

## 🔍 How to Compare Mobile App vs Backend

### Mobile App API Configuration

**File:** `src/constants/api.js`
```javascript
export const API_BASE_URL = 'https://chokmah-resources-backend.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: '/api/v1/login',
  REGISTER: '/api/v1/signup',
  LOGOUT: '/api/v1/logout',
  PROFILE: '/api/v1/users/profile',
  // ... more
};
```

### Your Backend Configuration

**File:** `config/routes.rb` (in your projects folder on desktop)
```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'
      post 'signup', to: 'users#create'
      delete 'logout', to: 'sessions#destroy'
      get 'users/profile', to: 'users#show'
      # ... more
    end
  end
end
```

**Make sure they match!**

---

## 🎯 Next Steps

1. **Run the diagnostic:**
   ```bash
   node test-api.js
   ```

2. **Wake up backend** (visit in browser if needed)

3. **Try signing in** with console open

4. **Look at the logs** to see exact error

5. **Follow the specific fix** for your error

6. **If endpoints don't match:**
   - Compare backend routes with mobile app
   - Update `src/constants/api.js` if needed
   - Update request format in `src/services/api/authAPI.js` if needed

---

## 💡 Pro Tips

**Test with curl:**
```bash
# Test login endpoint directly
curl -X POST https://chokmah-resources-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@test.com","password":"test123"}}'
```

**Expected responses:**
- `401 Unauthorized` = Endpoint exists, wrong credentials
- `404 Not Found` = Wrong endpoint path
- `422 Unprocessable Entity` = Wrong request format
- `200 OK` = Success!

---

## ✅ Checklist

Before asking for more help, ensure:

- [ ] Backend is running (visit URL in browser)
- [ ] Backend woke up (waited 60 seconds)
- [ ] Ran `node test-api.js`
- [ ] Checked console logs while signing in
- [ ] Compared mobile endpoints with backend routes
- [ ] Verified request format matches backend expectations
- [ ] Tried with valid user credentials
- [ ] Cleared app data and tried again

---

## 🆘 Still Not Working?

**Share this information:**
1. Output of `node test-api.js`
2. Console logs from the app (API REQUEST/RESPONSE/ERROR)
3. Backend routes from `config/routes.rb`
4. Backend controller code (sessions_controller.rb)
5. Any error messages from backend logs

This will help identify the exact mismatch!

---

**Good luck! The detailed logging should help you identify the issue quickly.** 🚀
