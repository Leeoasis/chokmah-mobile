# How to Test Chokmah Mobile App

**Quick answer: Your app is ready to test! Follow the steps below.**

---

## 🚀 Fastest Way to Test (2 Commands)

```bash
# 1. Validate your setup
./validate-setup.sh

# 2. Start testing
./quick-test.sh
```

Select option **1 (Web Browser)** for the easiest testing experience.

---

## 📋 Step-by-Step Guide

### Step 1: Validate Setup

Run the validation script to ensure everything is ready:

```bash
./validate-setup.sh
```

**Expected result:** All checks should pass (or only minor issues about dependencies)

### Step 2: Install Dependencies (if needed)

If validation shows dependencies are missing:

```bash
npm install
```

This takes 30-60 seconds and installs ~947 packages.

### Step 3: Start the App

**Option A: Automatic (Recommended)**
```bash
./quick-test.sh
```

Then select your preferred platform:
- **Option 1**: Web Browser (easiest)
- **Option 2**: iOS Simulator (Mac only)
- **Option 3**: Android Emulator
- **Option 4**: Physical Device via Expo Go

**Option B: Manual**
```bash
# For web
npm run web

# For iOS
npm run ios

# For Android
npm run android

# For device via Expo Go
npm start
```

### Step 4: Test the App

Once the app loads, you'll see:

1. **Splash Screen** (2 seconds)
   - Shows "Chokmah Mobile" and "SPPS Parent Portal"

2. **Login Screen**
   - Email input
   - Password input
   - Sign In button
   - Sign Up link

3. **Try the Navigation**
   - Click "Sign Up" to see the registration screen
   - Test role selection (Parent/Teacher)
   - Test form validation (try submitting empty forms)

---

## 📖 Detailed Testing

For comprehensive testing instructions, see:

- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete testing guide with all features
- **[QUICKSTART.md](QUICKSTART.md)** - Quick setup guide
- **[README.md](README.md)** - Full documentation

---

## ✅ Quick Testing Checklist

Minimum tests to verify the app works:

- [ ] App starts without errors
- [ ] Splash screen appears
- [ ] Login screen loads
- [ ] Form validation works (try submitting empty form)
- [ ] Can navigate to Register screen
- [ ] Role selection works (Parent/Teacher buttons)
- [ ] Back navigation works

---

## 🎯 What to Expect

### On Web Browser

**URL:** http://localhost:19006

**Loading time:** 10-20 seconds

**What you'll see:**
1. Metro bundler compiling JavaScript
2. Splash screen with amber background
3. Login screen with form

### On Mobile Device (Expo Go)

**Steps:**
1. Install "Expo Go" app from App Store/Play Store
2. Run `npm start` or `./quick-test.sh` (option 4)
3. Scan QR code with Expo Go app
4. App loads on your device

---

## 🐛 Common Issues

### Issue: "Dependencies not installed"
**Fix:** Run `npm install`

### Issue: "Metro bundler won't start"
**Fix:** 
```bash
npm start -- --clear
```

### Issue: "Cannot connect to Metro"
**Fix:**
```bash
npm start -- --tunnel
```

### Issue: "Port already in use"
**Fix:**
```bash
killall node
npm start
```

---

## 💡 Pro Tips

1. **Test on Web First**
   - Fastest and easiest
   - No emulator needed
   - Great for UI testing

2. **Use Hot Reload**
   - Changes appear instantly
   - No need to restart app

3. **Check Console**
   - Press F12 in browser
   - View any errors or logs

4. **Test Different Roles**
   - Try Parent role
   - Try Teacher role
   - See different dashboards

---

## 🎓 Learning the App

### Key Features to Test

1. **Authentication**
   - Login/Register screens
   - Form validation
   - Role selection

2. **Navigation**
   - Tab navigation (bottom tabs)
   - Stack navigation (screen to screen)
   - Back button

3. **UI Components**
   - Custom buttons
   - Input fields
   - Cards
   - Loading states

4. **State Management**
   - Login persists after refresh (Redux Persist)
   - User data stored correctly

---

## 📱 Testing on Real Device

### iOS (via Expo Go)
1. Install "Expo Go" from App Store
2. Run `npm start`
3. Scan QR code with Camera app
4. App opens in Expo Go

### Android (via Expo Go)
1. Install "Expo Go" from Play Store
2. Run `npm start`
3. Scan QR code with Expo Go app
4. App opens in Expo Go

---

## 🔧 Advanced Testing

### Test with Backend API

The app connects to:
```
https://chokmah-resources-backend.onrender.com
```

To test with real data:
1. Create a teacher account on backend
2. Generate invitation token
3. Create parent account using token
4. Test real login/data flow

### Test Redux State

1. Install Redux DevTools (browser extension)
2. Run app on web
3. Open Redux DevTools
4. See state changes in real-time

---

## 📊 Testing Progress Tracker

Track your testing:

```
✓ Setup validated
✓ Dependencies installed
✓ App starts successfully
✓ Splash screen works
✓ Login screen loads
✓ Form validation tested
✓ Registration screen tested
✓ Navigation tested
```

---

## 🆘 Need Help?

1. **Read the guides:**
   - TESTING_GUIDE.md (detailed)
   - QUICKSTART.md (quick)
   - README.md (complete)

2. **Check common issues:**
   - See "Common Issues" section above
   - Check TESTING_GUIDE.md troubleshooting

3. **Validate setup:**
   - Run `./validate-setup.sh`
   - Fix any failed checks

4. **Ask for help:**
   - Create GitHub issue
   - Include error messages
   - Include what you've tried

---

## ✨ Success!

If you can see the Login screen and interact with the form, **your app is working!** 🎉

**Next steps:**
- Test all features (see TESTING_GUIDE.md)
- Create test accounts
- Upload test data
- Build for production

---

**Happy Testing!** 🚀

For detailed testing instructions, read **[TESTING_GUIDE.md](TESTING_GUIDE.md)**
