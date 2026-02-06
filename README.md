# Capetech RSM - Repair Shop Manager

A comprehensive React Native mobile application for managing repair shops with built-in Point of Sale (POS) functionality, inventory management, customer tracking, and repair job management.

## 🚀 Features

### Point of Sale (POS)
- **Product Catalog**: Browse and search products quickly
- **Shopping Cart**: Add/remove items with quantity management
- **Multiple Payment Methods**: Cash, Card, and Mobile payments
- **Real-time Stock Updates**: Automatic inventory adjustments after sales
- **Tax Calculation**: Automatic tax calculation (10%)
- **Receipt Generation**: Digital receipts for all transactions

### Repair Management
- **Job Tracking**: Track repairs from pending to delivered
- **Status Workflow**: Pending → In Progress → Completed → Delivered
- **Customer Association**: Link repairs to customers
- **Device Information**: Store device type, brand, model details
- **Cost Estimation**: Estimated and actual cost tracking
- **Technician Notes**: Add notes and observations

### Inventory Management
- **Product Management**: Add, view, and manage products
- **Stock Tracking**: Real-time stock level monitoring
- **Low Stock Alerts**: Visual warnings for low inventory
- **Category Organization**: Organize products by categories
- **Pricing Management**: Track both cost and selling price
- **SKU System**: Unique identifiers for all products

### Customer Management
- **Customer Database**: Store customer information
- **Contact Details**: Phone, email, and address
- **Repair History**: View all customer repairs
- **Quick Access**: Easy customer lookup and management

### Reports & Analytics
- **Sales Reporting**: Today, week, and month summaries
- **Repair Statistics**: Track completion rates
- **Inventory Status**: Monitor stock levels
- **Recent Transactions**: View latest sales
- **Revenue Tracking**: Track business performance

### Additional Features
- **User Authentication**: Secure login system
- **Data Persistence**: Local storage with AsyncStorage
- **Sample Data**: Pre-loaded demo products
- **Responsive Design**: Works on phones and tablets
- **Offline Capable**: Works without internet connection

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Leeoasis/chokmah-mobile.git
   cd chokmah-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g expo-cli
   ```

## 🚀 Running the App

### Start the development server
```bash
npm start
```

### Run on iOS Simulator
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

## 📱 Using the App

### First Login
1. Open the app
2. Enter any username and password (demo mode)
3. You'll be logged in as an admin user

### Making a Sale (POS)
1. Navigate to the "Point of Sale" tab
2. Search or browse products
3. Tap products to add them to cart
4. Adjust quantities using +/- buttons
5. Tap "Checkout"
6. Select payment method
7. Sale is completed and inventory is updated

### Creating a Repair Job
1. Navigate to the "Repairs" tab
2. Tap "+ New Repair"
3. Select a customer
4. Enter device details
5. Describe the problem
6. Enter estimated cost
7. Tap "Create Repair Job"
8. Update status as work progresses

### Managing Inventory
1. Navigate to the "Inventory" tab
2. View all products and stock levels
3. Tap "+ Add Product" to add new items
4. Fill in product details
5. Set minimum stock level for alerts

### Adding Customers
1. Navigate to the "Customers" tab
2. Tap "+ Add Customer"
3. Enter customer details
4. Customer is saved and available for repairs

### Viewing Reports
1. Navigate to the "Reports" tab
2. View sales summaries
3. Check repair statistics
4. Monitor inventory alerts
5. Review recent transactions

## 📂 Project Structure

```
capetech-rsm/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
├── assets/                # Images and static assets
│   ├── icon.png          # App icon
│   ├── splash.png        # Splash screen
│   └── adaptive-icon.png # Android adaptive icon
└── src/
    ├── components/        # Reusable components
    ├── contexts/          # React contexts
    │   └── AuthContext.tsx
    ├── navigation/        # Navigation setup
    │   └── AppNavigator.tsx
    ├── screens/           # App screens
    │   ├── LoginScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── POSScreen.tsx
    │   ├── RepairsScreen.tsx
    │   ├── InventoryScreen.tsx
    │   ├── CustomersScreen.tsx
    │   └── ReportsScreen.tsx
    ├── services/          # Business logic and data
    │   └── dataService.ts
    ├── types/             # TypeScript type definitions
    │   └── index.ts
    └── utils/             # Utility functions
```

## 🔧 Configuration

### Customizing Tax Rate
Edit `src/screens/POSScreen.tsx`:
```typescript
const calculateTax = (subtotal: number) => {
  return subtotal * 0.1; // Change 0.1 to your tax rate
};
```

### Adding Sample Data
Sample products are automatically loaded on first launch. To modify, edit `src/services/dataService.ts` in the `initializeSampleData` function.

### Branding
Update `app.json` to customize:
- App name
- Bundle identifier
- Colors and theme

## 📊 Data Storage

The app uses AsyncStorage for local data persistence:
- **Customers**: Stored in 'customers' key
- **Products**: Stored in 'products' key
- **Repairs**: Stored in 'repairs' key
- **Sales**: Stored in 'sales' key
- **Devices**: Stored in 'devices' key

Data persists across app restarts.

## 🔐 Security

**Important**: This is a demo application with basic authentication. For production use:
- Implement proper authentication with a backend API
- Add encryption for sensitive data
- Implement user roles and permissions
- Use secure storage for credentials
- Add API integration for data sync

## 🚧 Future Enhancements

Potential features for future versions:
- [ ] Backend API integration
- [ ] Cloud data synchronization
- [ ] Barcode scanning for products
- [ ] Thermal printer integration for receipts
- [ ] SMS/Email notifications
- [ ] Advanced reporting with charts
- [ ] Multi-store support
- [ ] Employee management
- [ ] Appointment scheduling
- [ ] Photo attachments for repairs
- [ ] Export data to CSV/PDF
- [ ] Dark mode support

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
expo start --clear
```

### Dependency issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@capetech.com

## 🙏 Acknowledgments

Built with:
- React Native
- Expo
- React Navigation
- AsyncStorage
- TypeScript

---

**Made with ❤️ by Capetech**
