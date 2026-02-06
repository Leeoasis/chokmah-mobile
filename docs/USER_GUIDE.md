# User Guide - Capetech RSM

## Getting Started

### First Time Login
1. Launch the app
2. Enter any username (e.g., "admin")
3. Enter any password (e.g., "password")
4. Click "Login"

**Note:** This is a demo app with simplified authentication. Any credentials will work.

---

## Dashboard

The home screen shows an overview of your business:

- **Today's Sales**: Total revenue for the current day
- **Pending Repairs**: Number of repairs in progress
- **Low Stock Items**: Products running low on inventory

### Quick Actions
- **New Sale**: Opens the POS screen
- **New Repair**: Create a repair job
- **Add Customer**: Add a new customer
- **Add Product**: Add inventory

---

## Point of Sale (POS)

### Making a Sale

1. **Browse Products**
   - View all available products in the left panel
   - Use the search bar to find specific items

2. **Add to Cart**
   - Tap a product to add it to your cart
   - Cart appears in the right panel

3. **Manage Cart**
   - Use + button to increase quantity
   - Use - button to decrease quantity
   - View subtotal, tax, and total

4. **Checkout**
   - Tap "Checkout" button
   - Select payment method:
     - 💵 Cash
     - 💳 Card
     - 📱 Mobile Payment
   - Sale is completed automatically
   - Stock is updated

5. **Clear Cart**
   - Use "Clear" button to empty the cart

### Tips
- Products with 0 stock cannot be added to cart
- You cannot add more items than available stock
- Tax is calculated automatically at 10%

---

## Repairs Management

### Creating a Repair Job

1. Tap "+ New Repair" button
2. **Select Customer**
   - Choose from existing customers
   - If customer doesn't exist, add them first from Customers tab

3. **Enter Device Details**
   - Device Type (e.g., Smartphone, Laptop)
   - Brand (e.g., Apple, Samsung)
   - Model (e.g., iPhone 12)

4. **Describe the Problem**
   - Enter a detailed description of the issue
   - Be specific to help technicians

5. **Set Estimated Cost**
   - Enter the expected repair cost
   - Can be updated later with actual cost

6. Tap "Create Repair Job"

### Managing Repair Status

Repair jobs follow this workflow:
1. **Pending** (Orange badge)
   - Click "Start" to begin work
2. **In Progress** (Blue badge)
   - Click "Complete" when finished
3. **Completed** (Green badge)
   - Click "Deliver" when customer picks up
4. **Delivered** (Purple badge)
   - Final status

### Viewing Repairs
- All repairs are shown in chronological order
- Most recent repairs appear at the top
- Each card shows:
  - Job ID
  - Status badge
  - Problem description
  - Estimated cost
  - Creation date

---

## Inventory Management

### Adding Products

1. Tap "+ Add Product"
2. Fill in product details:
   - **Name**: Product name
   - **SKU**: Stock Keeping Unit (unique code)
   - **Category**: Parts, Accessories, etc.
   - **Description**: Optional details
   - **Selling Price**: Customer price
   - **Cost Price**: Your cost (optional)
   - **Initial Stock**: Quantity in stock
   - **Minimum Stock**: Alert threshold

3. Tap "Add Product"

### Monitoring Inventory

- **Green border**: Normal stock
- **Red border**: Low stock (at or below minimum)
- **⚠️ Low Stock badge**: Needs restocking

### Product Information
Each product card shows:
- Name and SKU
- Category
- Current stock level
- Minimum stock requirement
- Selling price
- Cost price (if set)

---

## Customer Management

### Adding Customers

1. Tap "+ Add Customer"
2. Enter details:
   - **Name**: Required
   - **Phone**: Required
   - **Email**: Optional
   - **Address**: Optional

3. Tap "Add Customer"

### Customer Cards

Each customer card displays:
- Avatar with first initial
- Full name
- Phone number
- Email (if provided)
- Address (if provided)
- Join date

### Using Customer Data
- Customers are used when creating repair jobs
- Link repairs to customers for history tracking
- Can optionally link sales to customers

---

## Reports & Analytics

### Sales Summary
View revenue for different periods:
- **Today**: Current day's sales
- **This Week**: Last 7 days
- **This Month**: Last 30 days

### Repair Statistics
- **Total Repairs**: All-time count
- **Completed**: Successfully finished
- **Pending**: Still in progress
- Progress bar shows completion rate

### Inventory Status
- ✅ All items well stocked (green)
- ⚠️ Low stock alert (orange)
- Shows number of items needing restock

### Recent Sales
View last 5 transactions:
- Transaction ID
- Number of items
- Payment method
- Total amount
- Date and time

### Refreshing Data
- Tap 🔄 Refresh button to update all reports
- Pull down on mobile to refresh

---

## Tips & Best Practices

### For Sales
- Keep product catalog updated
- Monitor low stock alerts daily
- Use accurate SKUs for tracking
- Set realistic minimum stock levels

### For Repairs
- Add customer first before creating repair
- Be detailed in problem descriptions
- Update status promptly
- Track actual costs for profitability

### For Inventory
- Regular stock counts
- Adjust minimum stock based on demand
- Include cost prices for profit tracking
- Use clear, consistent naming

### General
- Log out when not using the app
- Refresh reports regularly
- Back up data periodically (future feature)

---

## Troubleshooting

### Can't add to cart
- Check product stock level
- Ensure you're not exceeding available quantity

### Can't create repair
- Verify customer exists
- Fill in all required fields
- Check estimated cost is a number

### Low stock not showing
- Verify minimum stock level is set correctly
- Refresh inventory screen
- Check stock count is accurate

---

## Keyboard Shortcuts

While using the app:
- **Tab**: Navigate between fields
- **Enter**: Submit forms
- **Esc**: Close modals (on some platforms)

---

## Support

For help or questions:
- Check the README.md file
- Review API documentation in docs/API.md
- Contact support@capetech.com
