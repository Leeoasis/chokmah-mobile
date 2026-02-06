# Changelog

All notable changes to Capetech RSM will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-02-06

### Added
- Initial release of Capetech RSM
- Point of Sale (POS) system with shopping cart
- Repair job management with workflow tracking
- Inventory management with low stock alerts
- Customer database management
- Sales and repair reporting
- User authentication system
- Data persistence with AsyncStorage
- Sample product data
- Comprehensive documentation (README, API docs, User Guide, Developer Guide)
- Mobile-responsive design
- Offline capability

### Features
- **POS Module**
  - Product catalog with search
  - Shopping cart with quantity management
  - Multiple payment methods (Cash, Card, Mobile)
  - Automatic tax calculation
  - Real-time stock updates

- **Repair Management**
  - Customer and device tracking
  - Status workflow (Pending → In Progress → Completed → Delivered)
  - Cost estimation and tracking
  - Repair history

- **Inventory**
  - Product CRUD operations
  - Stock level monitoring
  - Low stock alerts
  - Category management
  - SKU system

- **Customer Management**
  - Customer database
  - Contact information storage
  - Repair history association

- **Reports & Analytics**
  - Sales summaries (Daily, Weekly, Monthly)
  - Repair statistics
  - Inventory status
  - Recent transactions

### Technical
- React Native with Expo
- TypeScript for type safety
- React Navigation for routing
- AsyncStorage for data persistence
- Context API for state management
- Bottom tab and stack navigation

## [Unreleased]

### Planned Features
- Backend API integration
- Cloud data synchronization
- Barcode scanning
- Thermal printer support
- SMS/Email notifications
- Advanced charts and graphs
- Multi-store support
- Employee management
- Appointment scheduling
- Photo attachments
- Data export (CSV/PDF)
- Dark mode
