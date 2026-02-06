# API Documentation

## Data Services

The app uses local storage with AsyncStorage. All data services follow a consistent pattern.

## CustomerService

### Methods

#### `getAll(): Promise<Customer[]>`
Returns all customers from storage.

#### `getById(id: string): Promise<Customer | undefined>`
Returns a specific customer by ID.

#### `create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer>`
Creates a new customer.

**Parameters:**
- `name`: string (required)
- `email`: string (required)
- `phone`: string (required)
- `address`: string (optional)

**Returns:** The created customer with generated ID and timestamp.

#### `update(id: string, updates: Partial<Customer>): Promise<Customer | undefined>`
Updates an existing customer.

#### `delete(id: string): Promise<boolean>`
Deletes a customer by ID.

---

## ProductService

### Methods

#### `getAll(): Promise<Product[]>`
Returns all products from storage.

#### `create(product: Omit<Product, 'id'>): Promise<Product>`
Creates a new product with all required fields.

#### `updateStock(id: string, quantity: number): Promise<Product | undefined>`
Updates product stock (adds or subtracts from current stock).

#### `getLowStock(): Promise<Product[]>`
Returns products where stock is at or below minimum stock level.

---

## Storage Keys

Data is stored in AsyncStorage with the following keys:
- `customers`: Array of Customer objects
- `products`: Array of Product objects
- `repairs`: Array of RepairJob objects
- `sales`: Array of Sale objects
- `devices`: Array of Device objects
- `user`: Current logged-in user object

For complete API documentation, see the source code in `src/services/dataService.ts`.
