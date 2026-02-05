# API Troubleshooting Guide

## "Cannot Sign In" - Quick Fix Steps

If you're unable to sign in to the Chokmah Mobile app, follow these steps:

---

## Step 1: Check Backend is Running

The backend might be "sleeping" on Render.com (free tier sleeps after inactivity).

**Test in browser:**
1. Open: https://chokmah-resources-backend.onrender.com
2. You should see a response (might be Rails default page or API info)
3. If it takes 30-60 seconds, the backend was sleeping and is now waking up

**If you see an error:**
- Backend might be down
- URL might have changed
- Contact the backend administrator

---

## Step 2: Verify API Endpoints Match Backend

The mobile app uses these endpoints:

```
POST /api/v1/login          - Sign in
POST /api/v1/signup         - Register
GET  /api/v1/users/profile  - Get user profile
```

**Check your backend code** (in the projects folder on desktop):

Look for routes in `config/routes.rb`:

```ruby
namespace :api do
  namespace :v1 do
    post 'login', to: 'sessions#create'
    post 'signup', to: 'users#create'
    # ... more routes
  end
end
```

**If routes are different**, update `src/constants/api.js` in the mobile app.

---

## Step 3: Check Request Format

The mobile app sends login requests like this:

```json
{
  "user": {
    "email": "test@example.com",
    "password": "password123"
  }
}
```

**Check your backend controller** (e.g., `app/controllers/api/v1/sessions_controller.rb`):

```ruby
def create
  user = User.find_by(email: params[:user][:email])
  # ...
end
```

**If your backend expects a different format**, update `src/services/api/authAPI.js`.

---

## Step 4: Check Response Format

The mobile app expects login responses like this:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "role": "parent"
  }
}
```

**Check your backend response** (in sessions controller):

```ruby
def create
  # ... authentication logic
  render json: {
    token: token,
    user: UserSerializer.new(user)
  }, status: :ok
end
```

**If response format is different**, update the mobile app's auth handling.

---

## Step 5: Run API Diagnostic Tool

From the mobile app directory, run:

```bash
node test-api.js
```

This will test:
- ✅ Backend connectivity
- ✅ Login endpoint availability
- ✅ Register endpoint availability

**Example output:**
```
═══════════════════════════════════════════════════════════
         CHOKMAH API DIAGNOSTIC REPORT
═══════════════════════════════════════════════════════════

Backend Reachable:     ✅ YES
Login Endpoint:        ✅ WORKING
Register Endpoint:     ✅ WORKING
```

---

## Step 6: Check Mobile App Logs

When you try to sign in, the mobile app will now log detailed information:

**Look for these logs in the console:**

```
🔵 API REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Method: POST
URL: https://chokmah-resources-backend.onrender.com/api/v1/login
Data: {
  "user": {
    "email": "test@example.com",
    "password": "***"
  }
}
```

```
✅ API RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 200
Response Data: {
  "token": "...",
  "user": {...}
}
```

Or if there's an error:

```
🔴 API ERROR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: 401
Response Data: {
  "error": "Invalid credentials"
}
```

---

## Common Issues & Solutions

### Issue 1: "Network error. Please check your connection."

**Cause:** Backend is not reachable

**Solutions:**
1. Check your internet connection
2. Wake up the backend (visit URL in browser first)
3. Verify backend URL is correct
4. Check if backend is deployed and running

---

### Issue 2: "Invalid credentials"

**Cause:** Wrong email/password OR user doesn't exist

**Solutions:**
1. Double-check email and password
2. Ensure user exists in backend database
3. Try registering a new account first
4. Check backend logs for authentication errors

---

### Issue 3: "401 Unauthorized" (after successful login)

**Cause:** Token not being saved or sent correctly

**Solutions:**
1. Check AsyncStorage permissions
2. Clear app data and try again
3. Check token format matches backend expectations
4. Verify Authorization header is being sent

---

### Issue 4: Endpoint returns 404

**Cause:** API endpoint path is wrong

**Solutions:**
1. Check backend routes match mobile app endpoints
2. Verify `/api/v1/` prefix is correct
3. Check for typos in endpoint names
4. Update `src/constants/api.js` if needed

---

### Issue 5: Request payload rejected (422)

**Cause:** Backend expects different data structure

**Solutions:**
1. Check backend controller parameter requirements
2. Verify request is wrapped in `{ user: {...} }`
3. Ensure all required fields are present
4. Check for field name mismatches

---

## How to Fix: Update API Configuration

If your backend uses different endpoints:

### 1. Update API Constants

Edit `src/constants/api.js`:

```javascript
export const API_BASE_URL = 'YOUR_BACKEND_URL';

export const API_ENDPOINTS = {
  LOGIN: '/your/login/path',     // Update this
  REGISTER: '/your/signup/path', // Update this
  // ... etc
};
```

### 2. Update Request Format (if needed)

Edit `src/services/api/authAPI.js`:

```javascript
// If backend doesn't use { user: {...} } wrapper
export const login = async (email, password) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    email,      // Direct fields
    password,   // Not wrapped
  });
  return response.data;
};
```

### 3. Update Response Handling (if needed)

Edit `src/redux/slices/authSlice.js`:

```javascript
// If token is at different location in response
if (response.data.token) {  // or response.token, etc.
  await saveToken(response.data.token);
}
```

---

## Quick Diagnosis Commands

### Test backend connectivity:
```bash
curl https://chokmah-resources-backend.onrender.com
```

### Test login endpoint:
```bash
curl -X POST https://chokmah-resources-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@test.com","password":"test123"}}'
```

### Expected response (401 is OK - means endpoint exists):
```json
{"error": "Invalid credentials"}
```

### Not found (404 means wrong endpoint):
```json
{"error": "Not found"}
```

---

## Environment Variables (Advanced)

To easily switch between development and production APIs:

### 1. Create `.env` file:
```
API_BASE_URL=https://chokmah-resources-backend.onrender.com
```

### 2. Install dotenv:
```bash
npm install react-native-dotenv
```

### 3. Update `src/constants/api.js`:
```javascript
import { API_BASE_URL as ENV_API_URL } from '@env';

export const API_BASE_URL = ENV_API_URL || 'https://chokmah-resources-backend.onrender.com';
```

### 4. For local development:
```
API_BASE_URL=http://localhost:3000
```

---

## Still Having Issues?

1. **Check the detailed logs** in your app console
2. **Run the diagnostic tool**: `node test-api.js`
3. **Review the API guide**: See `API_ENDPOINTS_GUIDE.md`
4. **Compare with backend code** in your projects folder
5. **Test endpoints with curl** or Postman
6. **Check backend logs** on Render.com
7. **Verify database** has test users

---

## Quick Reference

| What to Check | File to Edit |
|---------------|--------------|
| API Base URL | `src/constants/api.js` |
| Endpoint paths | `src/constants/api.js` |
| Request format | `src/services/api/authAPI.js` |
| Response handling | `src/redux/slices/authSlice.js` |
| Token storage | `src/utils/storage.js` |
| Debug logs | Console when app runs |

---

**Last Updated:** 2026-02-05
