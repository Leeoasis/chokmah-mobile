# API Endpoints Guide

## Overview

This guide documents the API endpoints used by the Chokmah Mobile app and helps debug authentication issues.

## Backend Information

- **Base URL**: `https://chokmah-resources-backend.onrender.com`
- **API Version**: v1
- **Authentication**: JWT Bearer Token

---

## Authentication Endpoints

### 1. Login (Sign In)

**Endpoint**: `POST /api/v1/login`

**Request Body**:
```json
{
  "user": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

**Expected Response** (Success - 200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "parent|teacher|admin",
    "name": "User Name"
  }
}
```

**Possible Error Responses**:
- **401 Unauthorized**: Invalid credentials
- **422 Unprocessable Entity**: Missing or invalid fields
- **500 Internal Server Error**: Backend issue

---

### 2. Register (Sign Up)

**Endpoint**: `POST /api/v1/signup`

**Request Body (Parent)**:
```json
{
  "user": {
    "email": "parent@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "parent",
    "parent_name": "John Doe",
    "child_name": "Jane Doe",
    "child_grade": "Grade 5",
    "invitation_token": "abc123xyz" 
  }
}
```

**Request Body (Teacher)**:
```json
{
  "user": {
    "email": "teacher@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "teacher",
    "name": "John Teacher"
  }
}
```

**Expected Response** (Success - 201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "teacher@example.com",
    "role": "teacher",
    "name": "John Teacher"
  }
}
```

---

### 3. Logout

**Endpoint**: `DELETE /api/v1/logout`

**Headers**:
```
Authorization: Bearer <token>
```

**Expected Response**: 204 No Content or 200 OK

---

## User Endpoints

### 4. Get User Profile

**Endpoint**: `GET /api/v1/users/profile`

**Headers**:
```
Authorization: Bearer <token>
```

**Expected Response**:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "parent",
    "name": "User Name"
  }
}
```

---

### 5. Validate Invitation Token

**Endpoint**: `GET /api/v1/users/teacher_by_token/:token`

**Example**: `GET /api/v1/users/teacher_by_token/abc123xyz`

**Expected Response**:
```json
{
  "teacher": {
    "id": 1,
    "name": "Teacher Name"
  },
  "child_name": "Jane Doe",
  "child_grade": "Grade 5"
}
```

---

## Resources Endpoints

### 6. Get Resources

**Endpoint**: `GET /api/v1/resources`

**Headers**:
```
Authorization: Bearer <token>
```

---

### 7. Upload Resource (Admin Only)

**Endpoint**: `POST /api/v1/resources`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body** (FormData):
- `resource[title]`: "Resource Title"
- `resource[description]`: "Description"
- `resource[file]`: File object

---

## Reports Endpoints

### 8. Get Reports

**Endpoint**: `GET /api/v1/reports`

**Headers**:
```
Authorization: Bearer <token>
```

---

### 9. Upload Report (Admin Only)

**Endpoint**: `POST /api/v1/reports`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body** (FormData):
- `report[title]`: "Report Title"
- `report[student_name]`: "Student Name"
- `report[file]`: File object

---

## Common Issues & Debugging

### Issue 1: "Cannot sign in" / "Login failed"

**Possible causes**:

1. **Wrong API endpoint path**
   - Check: Is it `/api/v1/login` or just `/login`?
   - Current config: `/api/v1/login`

2. **Wrong request payload structure**
   - Check: Is the request wrapped in `{ user: { email, password } }`?
   - Current config: Yes, wrapped in `user` object

3. **CORS issues**
   - Check browser/network tab for CORS errors
   - Backend must allow the mobile app origin

4. **Backend not running**
   - Check if `https://chokmah-resources-backend.onrender.com` is accessible
   - Try: `curl https://chokmah-resources-backend.onrender.com/api/v1/login`

5. **Invalid credentials**
   - Ensure user exists in the database
   - Check password is correct

6. **Token storage issues**
   - Check AsyncStorage is working
   - Clear app data and try again

---

### Issue 2: Network Errors

**Check these**:
1. Internet connection
2. Backend server status (Render.com may sleep after inactivity)
3. HTTPS vs HTTP
4. CORS configuration

---

### Issue 3: 401 Unauthorized (After login)

**Possible causes**:
1. Token not being saved to AsyncStorage
2. Token not being sent in Authorization header
3. Token expired
4. Backend expects different token format

---

## Testing the API

### Method 1: Using curl

```bash
# Test backend is alive
curl https://chokmah-resources-backend.onrender.com

# Test login endpoint
curl -X POST https://chokmah-resources-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@example.com","password":"password123"}}'

# Test with token
curl -X GET https://chokmah-resources-backend.onrender.com/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Method 2: Using the debug tool

Run the API test utility:
```bash
node test-api.js
```

---

## Current Configuration

**File**: `src/constants/api.js`
```javascript
export const API_BASE_URL = 'https://chokmah-resources-backend.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: '/api/v1/login',
  REGISTER: '/api/v1/signup',
  LOGOUT: '/api/v1/logout',
  // ... more endpoints
};
```

**File**: `src/services/api/authAPI.js`
```javascript
export const login = async (email, password) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    user: { email, password },
  });
  return response.data;
};
```

---

## Environment Variables (Optional Enhancement)

To make the API URL configurable:

1. Create `.env` file:
```
API_BASE_URL=https://chokmah-resources-backend.onrender.com
```

2. Update `src/constants/api.js`:
```javascript
export const API_BASE_URL = process.env.API_BASE_URL || 'https://chokmah-resources-backend.onrender.com';
```

3. For local development:
```
API_BASE_URL=http://localhost:3000
```

---

## Quick Diagnosis Checklist

When sign-in fails, check:

- [ ] Backend is running (visit URL in browser)
- [ ] Network connection is active
- [ ] User credentials are correct
- [ ] API endpoint paths match backend routes
- [ ] Request payload structure is correct
- [ ] Response format matches expectations
- [ ] Token is being saved to AsyncStorage
- [ ] CORS is configured on backend
- [ ] Check browser/app console for errors
- [ ] Check network tab for actual request/response

---

## Need More Help?

1. Enable detailed logging (see `src/utils/apiDebugger.js`)
2. Check the network tab in browser/React Native Debugger
3. Test the backend API directly with curl/Postman
4. Review backend logs on Render.com
5. Compare with web app implementation

---

**Last Updated**: 2026-02-05
