# Testing Guide - Chokmah Mobile App

**A Complete Guide to Testing Your React Native Mobile Application**

---

## Table of Contents

1. [Pre-Testing Setup](#pre-testing-setup)
2. [Quick Testing (5 Minutes)](#quick-testing-5-minutes)
3. [Detailed Feature Testing](#detailed-feature-testing)
4. [Testing Checklist](#testing-checklist)
5. [Common Issues & Solutions](#common-issues--solutions)
6. [Advanced Testing](#advanced-testing)

---

## Pre-Testing Setup

### ✅ Requirements Check

Before testing, ensure you have:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check if dependencies are installed
ls node_modules/ > /dev/null 2>&1 && echo "✓ Dependencies installed" || echo "✗ Run: npm install"
```

### 📦 Install Dependencies (If Not Done)

```bash
cd /path/to/chokmah-mobile
npm install
```

**Expected output:**
- Installing ~947 packages
- Takes 30-60 seconds
- No critical errors

---

## Quick Testing (5 Minutes)

### Step 1: Start the Development Server

```bash
npm start
```

**What to expect:**
```
Starting Metro Bundler
Metro waiting on exp://192.168.x.x:8081

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

**✓ SUCCESS**: If you see the Expo DevTools menu  
**✗ FAIL**: If you see errors, check [Common Issues](#common-issues--solutions)

### Step 2: Test on Web (Easiest)

```bash
# In a new terminal (or press 'w' in the running app)
npm run web
```

**What to expect:**
- Browser opens at `http://localhost:19006`
- App loads in 10-20 seconds
- You see the **Splash Screen** with "Chokmah Mobile"

**Screenshot Expected:**
```
┌─────────────────────────────┐
│                             │
│    Chokmah Mobile           │
│    SPPS Parent Portal       │
│                             │
└─────────────────────────────┘
```

### Step 3: Navigate to Login

After splash screen (2 seconds), you should see:

**Login Screen Elements:**
- ✓ "Welcome Back" heading
- ✓ Email input field
- ✓ Password input field
- ✓ "Sign In" button
- ✓ "Don't have an account? Sign Up" link

---

## Detailed Feature Testing

### 🔐 Test 1: Authentication Flow

#### A. Test Login Screen

1. **Navigate to Login** (automatic after splash)

2. **Test Form Validation:**
   ```
   Action: Click "Sign In" without entering anything
   Expected: Error messages appear
   - "Please enter a valid email address"
   - "Password must be at least 6 characters"
   ```

3. **Test Invalid Email:**
   ```
   Email: "notanemail"
   Password: "test123"
   Action: Click "Sign In"
   Expected: "Please enter a valid email address"
   ```

4. **Test Valid Login (requires backend):**
   ```
   Email: your-email@example.com
   Password: your-password
   Action: Click "Sign In"
   Expected: 
   - Loading spinner appears
   - If credentials valid: Navigate to dashboard
   - If invalid: Error message shows
   ```

#### B. Test Registration Screen

1. **Navigate to Register:**
   ```
   Action: Click "Sign Up" link on Login screen
   Expected: Registration screen appears
   ```

2. **Registration Screen Elements:**
   - ✓ "Create Account" heading
   - ✓ Role selection buttons (Parent/Teacher)
   - ✓ Email field
   - ✓ Password field
   - ✓ Confirm Password field
   - ✓ Parent fields (if Parent selected)
   - ✓ "Sign Up" button

3. **Test Role Selection:**
   ```
   Action: Click "Parent" button
   Expected: 
   - Button becomes highlighted (amber color)
   - Parent-specific fields appear:
     • Parent Name
     • Invitation Token
     • Child Name
     • Child Grade
   ```

   ```
   Action: Click "Teacher" button
   Expected:
   - Button becomes highlighted
   - Parent fields disappear
   - Only email/password fields remain
   ```

4. **Test Password Match Validation:**
   ```
   Password: "test123"
   Confirm Password: "test456"
   Action: Click "Sign Up"
   Expected: "Passwords do not match" error
   ```

5. **Test Token Validation (Parent):**
   ```
   Role: Parent
   Invitation Token: "test-token-123"
   Action: Click "Validate Token"
   Expected:
   - Loading spinner on button
   - If valid: Child name/grade auto-filled
   - If invalid: Error message
   ```

### 📱 Test 2: Parent Dashboard

**Prerequisites:** Successfully logged in as Parent

1. **Dashboard Elements:**
   - ✓ Welcome message with parent name
   - ✓ Child information displayed
   - ✓ Stats cards (Reports count, Resources count)
   - ✓ Recent Reports section
   - ✓ Recent Resources section
   - ✓ Bottom tab navigation

2. **Test Tab Navigation:**
   ```
   Tabs Available:
   - Home 🏠
   - Reports 📄
   - Resources 📁
   - Calendar 📅
   - Profile 👤
   
   Action: Tap each tab
   Expected: Screen changes, tab icon highlighted
   ```

3. **Test Reports Screen:**
   ```
   Action: Tap "Reports" tab
   Expected:
   - Reports list appears (or "No reports available")
   - Each report shows: title, description, date, teacher
   ```

4. **Test Resources Screen:**
   ```
   Action: Tap "Resources" tab
   Expected:
   - Resources list appears (or "No resources available")
   - Each resource shows: title, description, date, file type
   ```

5. **Test Calendar Screen:**
   ```
   Action: Tap "Calendar" tab
   Expected:
   - Calendar placeholder screen
   - "Homework & Assignments" header
   - "Coming soon" message
   ```

6. **Test Profile Screen:**
   ```
   Action: Tap "Profile" tab
   Expected:
   - User avatar with initial
   - Email displayed
   - Parent name displayed
   - Child name and grade displayed
   - "Logout" button
   ```

### 👨‍🏫 Test 3: Teacher Dashboard

**Prerequisites:** Successfully logged in as Teacher

1. **Dashboard Elements:**
   - ✓ Welcome message
   - ✓ Stats cards (Reports, Resources)
   - ✓ Quick action cards:
     • View Students 👥
     • Invitations 🎫

2. **Test View Students:**
   ```
   Action: Tap "View Students" card
   Expected: Navigate to Student List screen
   
   Screen Elements:
   - List of students (or "No students available")
   - Student names and details
   ```

3. **Test Invitations:**
   ```
   Action: Tap "Invitations" card
   Expected: Navigate to Invitation Codes screen
   
   Screen Elements:
   - Generate invitation code button
   - List of existing invitation codes (if any)
   ```

### 👨‍💼 Test 4: Admin Dashboard

**Prerequisites:** Successfully logged in as Admin

1. **Dashboard Elements:**
   - ✓ Admin Dashboard heading
   - ✓ Stats cards (Parents, Teachers, Reports, Resources)
   - ✓ Quick action cards:
     • Upload Resource 📁
     • Upload Report 📄
     • User Management 👥
     • Analytics 📊

2. **Test Upload Resource:**
   ```
   Action: Tap "Upload Resource" card
   Expected: Navigate to Upload Resource screen
   
   Screen Elements:
   - Title input
   - Description input
   - File picker button
   - Upload button
   ```

3. **Test File Picker:**
   ```
   Action: Tap "Choose File"
   Expected:
   - File picker dialog opens
   - Can select documents/PDFs/images
   - Selected file name appears
   ```

4. **Test Upload (with file):**
   ```
   Title: "Test Resource"
   Description: "Testing upload"
   File: Select any PDF/document
   Action: Tap "Upload Resource"
   Expected:
   - Loading indicator appears
   - Progress bar shows (if applicable)
   - On success: Navigate back with success message
   - On error: Error message displayed
   ```

5. **Test Upload Report:**
   ```
   Action: Tap "Upload Report" from dashboard
   Expected: Upload Report screen
   
   Additional Field:
   - Student Name input (required)
   ```

---

## Testing Checklist

### ✅ Visual Testing

- [ ] App loads without errors
- [ ] Splash screen displays correctly
- [ ] Colors match design (Amber primary, Gray secondary)
- [ ] Text is readable on all screens
- [ ] Buttons are properly styled
- [ ] Input fields have proper borders
- [ ] Cards have shadows/elevation
- [ ] Loading indicators appear when needed
- [ ] Tab icons display correctly

### ✅ Navigation Testing

- [ ] Splash → Login transition works
- [ ] Login → Register navigation works
- [ ] Register → Login navigation works
- [ ] Login → Dashboard navigation works (by role)
- [ ] Tab navigation works smoothly
- [ ] Back navigation works on stacked screens
- [ ] Deep navigation (dashboard → upload → back) works

### ✅ Form Testing

- [ ] Email validation works
- [ ] Password validation works
- [ ] Password match validation works
- [ ] Required field validation works
- [ ] Form submits with valid data
- [ ] Error messages display correctly
- [ ] Input focus/blur works
- [ ] Password show/hide toggle works

### ✅ State Management Testing

- [ ] Login persists after app reload
- [ ] User data persists in Redux
- [ ] Logout clears user data
- [ ] API errors are handled
- [ ] Loading states work
- [ ] Data updates reflect in UI

### ✅ File Upload Testing

- [ ] File picker opens
- [ ] File selection works
- [ ] Selected file name displays
- [ ] Upload progress shows
- [ ] Upload success message appears
- [ ] Upload error handling works

### ✅ Platform Testing

- [ ] Works on Web
- [ ] Works on iOS simulator (if Mac)
- [ ] Works on Android emulator
- [ ] Works on physical device (via Expo Go)

---

## Common Issues & Solutions

### Issue 1: "Metro Bundler won't start"

**Symptoms:**
- `npm start` hangs
- Port already in use error

**Solutions:**
```bash
# Clear cache and restart
npx expo start --clear

# Or kill existing processes
killall node
npm start
```

### Issue 2: "Module not found" errors

**Symptoms:**
- Import errors
- Cannot find module errors

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm start -- --clear
```

### Issue 3: "Can't connect to Metro"

**Symptoms:**
- App shows connection error
- "Unable to connect to development server"

**Solutions:**
```bash
# Try tunnel mode
npm start -- --tunnel

# Or specify host
npm start -- --host 192.168.1.x
```

### Issue 4: "Login fails with network error"

**Symptoms:**
- Network error message
- Can't connect to API

**Solutions:**
1. **Check backend is running:**
   ```
   Backend: https://chokmah-resources-backend.onrender.com
   Test in browser - should return JSON response
   ```

2. **Check API endpoint configuration:**
   ```bash
   # View API config
   cat src/constants/api.js
   
   # Should show:
   # API_BASE_URL = 'https://chokmah-resources-backend.onrender.com'
   ```

3. **Test API directly:**
   ```bash
   # Test login endpoint
   curl -X POST https://chokmah-resources-backend.onrender.com/api/v1/login \
     -H "Content-Type: application/json" \
     -d '{"user":{"email":"test@example.com","password":"password"}}'
   ```

### Issue 5: "File upload doesn't work"

**Symptoms:**
- File picker doesn't open
- Upload fails

**Solutions:**
1. **On Web:** File uploads work but may have CORS issues
2. **On Mobile:** Ensure permissions are granted
3. **Check file type:** Only certain types supported
4. **Check file size:** Large files may fail

### Issue 6: "Blank white screen"

**Symptoms:**
- App loads but shows nothing
- No errors in console

**Solutions:**
```bash
# Clear cache and restart
npm start -- --clear

# Check for JavaScript errors
# Open browser console (F12) or React Native debugger
```

---

## Advanced Testing

### 🧪 Testing with Different User Roles

Create test accounts for each role:

**Test Parent Account:**
```
Email: parent@test.com
Password: test123
Role: Parent
```

**Test Teacher Account:**
```
Email: teacher@test.com
Password: test123
Role: Teacher
```

**Test Admin Account:**
```
Email: admin@test.com
Password: test123
Role: Admin
```

### 🔄 Testing Redux State

1. **Install Redux DevTools (Web only):**
   - Install Redux DevTools browser extension
   - Open browser console
   - Navigate to "Redux" tab

2. **Check State:**
   ```javascript
   // In Redux DevTools, you should see:
   {
     auth: {
       user: {...},
       token: "...",
       isAuthenticated: true
     },
     reports: {...},
     resources: {...}
   }
   ```

3. **Test State Persistence:**
   ```
   1. Login successfully
   2. Refresh the page
   3. You should still be logged in (Redux Persist)
   ```

### 📊 Testing API Calls

1. **Open Network Tab:**
   - Browser: F12 → Network tab
   - Filter by "XHR" or "Fetch"

2. **Watch API Calls:**
   ```
   Login → POST /api/v1/login
   Fetch Reports → GET /api/v1/reports
   Upload → POST /api/v1/resources
   ```

3. **Check Headers:**
   - Authorization: Bearer <token>
   - Content-Type: application/json

### 🎨 Testing Responsiveness

1. **Test Different Screen Sizes:**
   - Browser DevTools → Toggle device toolbar
   - Test on: iPhone, iPad, Android phone, Android tablet

2. **Test Orientations:**
   - Portrait mode
   - Landscape mode

3. **Check Elements:**
   - No text overflow
   - Buttons are tappable
   - Forms are usable
   - Navigation is accessible

---

## Performance Testing

### 📈 Check Loading Times

**Expected Times:**
- Splash screen: 2 seconds
- Login screen load: < 1 second
- Dashboard load: < 2 seconds
- Screen transitions: < 500ms

### 🔋 Check Memory Usage

**On Web:**
```
1. Open Chrome DevTools
2. Performance tab
3. Record while using app
4. Check memory usage stays reasonable
```

**On Device:**
```
Use Expo DevTools performance monitor
```

---

## Validation Script

Create this file to validate your setup:

```bash
#!/bin/bash
# save as validate-setup.sh

echo "🔍 Validating Chokmah Mobile Setup..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✓ Node.js: $(node --version)"
else
    echo "✗ Node.js not found"
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✓ npm: $(npm --version)"
else
    echo "✗ npm not found"
fi

# Check dependencies
if [ -d "node_modules" ]; then
    echo "✓ Dependencies installed"
else
    echo "✗ Dependencies not installed (run: npm install)"
fi

# Check essential files
files=("package.json" "App.js" "app.json" "src/redux/store.js" "src/navigation/AppNavigator.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file missing"
    fi
done

echo ""
echo "📱 Ready to test? Run: npm start"
```

**Run it:**
```bash
chmod +x validate-setup.sh
./validate-setup.sh
```

---

## Testing Summary

### Minimum Tests to Run

**Before Considering App Ready:**

1. ✅ App starts without errors
2. ✅ Can navigate to Login screen
3. ✅ Form validation works
4. ✅ Can navigate to Register screen
5. ✅ Role selection works
6. ✅ Can attempt login (with test account)
7. ✅ Dashboard loads (for at least one role)
8. ✅ Tab navigation works
9. ✅ Profile screen shows user data
10. ✅ Logout works

### Full Testing (Recommended)

Complete all items in the [Testing Checklist](#testing-checklist)

---

## Next Steps After Testing

### If All Tests Pass ✅

1. **Create Real User Accounts:**
   - Use backend to create teacher account
   - Generate invitation token
   - Create parent account with token

2. **Test Real Data:**
   - Upload actual resources
   - Upload actual reports
   - View them as parent

3. **Deploy:**
   - Build for iOS: `eas build --platform ios`
   - Build for Android: `eas build --platform android`
   - Deploy to stores

### If Tests Fail ✗

1. **Check Error Messages:**
   - Read the full error
   - Check console logs
   - Look in Network tab

2. **Consult Documentation:**
   - README.md - Setup issues
   - QUICKSTART.md - Common problems
   - CONTRIBUTING.md - Development issues

3. **Common Fixes:**
   - Clear cache: `npm start -- --clear`
   - Reinstall: `rm -rf node_modules && npm install`
   - Check backend is running
   - Check network connection

---

## Testing Scorecard

Track your testing progress:

```
Authentication:    [ ] 0/10 tests
Parent Dashboard:  [ ] 0/8 tests
Teacher Dashboard: [ ] 0/3 tests
Admin Dashboard:   [ ] 0/6 tests
Navigation:        [ ] 0/7 tests
Forms:             [ ] 0/8 tests
File Upload:       [ ] 0/6 tests
Platform:          [ ] 0/4 tests

Total: 0/52 tests
```

---

## Need Help?

**Resources:**
- README.md - Complete documentation
- QUICKSTART.md - Fast setup guide
- ARCHITECTURE.md - How it works
- GitHub Issues - Report problems

**Common Questions:**

**Q: Do I need the backend running to test?**  
A: Some features work without backend (navigation, UI), but login/data requires backend.

**Q: Can I test without creating accounts?**  
A: Yes, you can test UI and navigation, but not authentication or data features.

**Q: Which platform should I test on first?**  
A: Web is easiest. Then iOS simulator (Mac only), then Android emulator.

**Q: How long does testing take?**  
A: Quick test (web only): 5 minutes. Full test (all features): 30-45 minutes.

---

**Happy Testing! 🎉**

If you encounter any issues not covered here, check the README.md or create a GitHub issue.
