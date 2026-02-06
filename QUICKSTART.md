# Quick Start Guide - Capetech RSM

Get up and running with Capetech Repair Shop Manager in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- npm or yarn
- A code editor (VS Code recommended)
- iOS Simulator (Mac) or Android Emulator

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Leeoasis/chokmah-mobile.git
cd chokmah-mobile

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

## First Run

1. **Launch the app**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

2. **Login**
   - Username: `admin` (or any text)
   - Password: `password` (or any text)
   - Tap "Login"

3. **Explore the Dashboard**
   - View today's sales
   - Check pending repairs
   - See inventory alerts

## Try These Features

### Make Your First Sale

1. Go to **Point of Sale** tab
2. Tap on a product (e.g., "Phone Case")
3. Tap "Checkout"
4. Select "Cash" payment
5. ✅ Sale completed!

### Create a Repair Job

1. Go to **Customers** tab
2. Tap "+ Add Customer"
3. Add customer details, tap "Add Customer"
4. Go to **Repairs** tab
5. Tap "+ New Repair"
6. Select the customer you just created
7. Fill in device and problem details
8. Tap "Create Repair Job"
9. ✅ Repair job created!

### Add Inventory

1. Go to **Inventory** tab
2. Tap "+ Add Product"
3. Fill in product details
4. Tap "Add Product"
5. ✅ Product added!

### View Reports

1. Go to **Reports** tab
2. See your sales summary
3. Check repair statistics
4. Review recent transactions

## Sample Data

The app comes with 5 pre-loaded products:
- iPhone Screen Replacement ($150)
- Samsung Battery ($50)
- Phone Case ($15)
- Screen Protector ($10)
- Charging Cable ($12)

Feel free to use these for testing!

## What's Next?

- Read the full [User Guide](docs/USER_GUIDE.md)
- Check out the [API Documentation](docs/API.md)
- Review the [Developer Guide](docs/DEVELOPER_GUIDE.md)
- Customize the app for your business

## Need Help?

- 📖 [README.md](README.md) - Full documentation
- 👥 [User Guide](docs/USER_GUIDE.md) - How to use the app
- 💻 [Developer Guide](docs/DEVELOPER_GUIDE.md) - Technical details
- 🐛 [GitHub Issues](https://github.com/Leeoasis/chokmah-mobile/issues) - Report bugs

## Quick Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Check for TypeScript errors
npx tsc --noEmit
```

## Demo Credentials

For demo purposes, **any** username and password will work!

Try:
- Username: `admin`, Password: `admin`
- Username: `john`, Password: `123`
- Username: `test`, Password: `test`

---

**🎉 You're all set! Happy managing!**
