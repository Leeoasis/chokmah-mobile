import AsyncStorage from '@react-native-async-storage/async-storage';
import { Customer, Device, RepairJob, Product, Sale } from '../types';

const KEYS = {
  CUSTOMERS: 'customers',
  DEVICES: 'devices',
  REPAIRS: 'repairs',
  PRODUCTS: 'products',
  SALES: 'sales',
};

// Generic storage functions
async function getItems<T>(key: string): Promise<T[]> {
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error(`Failed to get ${key}:`, error);
    return [];
  }
}

async function saveItems<T>(key: string, items: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}

// Customer operations
export const CustomerService = {
  async getAll(): Promise<Customer[]> {
    return getItems<Customer>(KEYS.CUSTOMERS);
  },

  async getById(id: string): Promise<Customer | undefined> {
    const customers = await this.getAll();
    return customers.find(c => c.id === id);
  },

  async create(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const customers = await this.getAll();
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    customers.push(newCustomer);
    await saveItems(KEYS.CUSTOMERS, customers);
    return newCustomer;
  },

  async update(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
    const customers = await this.getAll();
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updates };
      await saveItems(KEYS.CUSTOMERS, customers);
      return customers[index];
    }
    return undefined;
  },

  async delete(id: string): Promise<boolean> {
    const customers = await this.getAll();
    const filtered = customers.filter(c => c.id !== id);
    if (filtered.length < customers.length) {
      await saveItems(KEYS.CUSTOMERS, filtered);
      return true;
    }
    return false;
  },
};

// Product operations
export const ProductService = {
  async getAll(): Promise<Product[]> {
    return getItems<Product>(KEYS.PRODUCTS);
  },

  async getById(id: string): Promise<Product | undefined> {
    const products = await this.getAll();
    return products.find(p => p.id === id);
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const products = await this.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    products.push(newProduct);
    await saveItems(KEYS.PRODUCTS, products);
    return newProduct;
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      await saveItems(KEYS.PRODUCTS, products);
      return products[index];
    }
    return undefined;
  },

  async updateStock(id: string, quantity: number): Promise<Product | undefined> {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index].stock += quantity;
      await saveItems(KEYS.PRODUCTS, products);
      return products[index];
    }
    return undefined;
  },

  async getLowStock(): Promise<Product[]> {
    const products = await this.getAll();
    return products.filter(p => p.stock <= p.minStock);
  },
};

// Repair operations
export const RepairService = {
  async getAll(): Promise<RepairJob[]> {
    return getItems<RepairJob>(KEYS.REPAIRS);
  },

  async getById(id: string): Promise<RepairJob | undefined> {
    const repairs = await this.getAll();
    return repairs.find(r => r.id === id);
  },

  async getByCustomer(customerId: string): Promise<RepairJob[]> {
    const repairs = await this.getAll();
    return repairs.filter(r => r.customerId === customerId);
  },

  async create(repair: Omit<RepairJob, 'id' | 'createdAt' | 'updatedAt'>): Promise<RepairJob> {
    const repairs = await this.getAll();
    const now = new Date();
    const newRepair: RepairJob = {
      ...repair,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    repairs.push(newRepair);
    await saveItems(KEYS.REPAIRS, repairs);
    return newRepair;
  },

  async update(id: string, updates: Partial<RepairJob>): Promise<RepairJob | undefined> {
    const repairs = await this.getAll();
    const index = repairs.findIndex(r => r.id === id);
    if (index !== -1) {
      repairs[index] = {
        ...repairs[index],
        ...updates,
        updatedAt: new Date(),
      };
      await saveItems(KEYS.REPAIRS, repairs);
      return repairs[index];
    }
    return undefined;
  },
};

// Sales operations
export const SalesService = {
  async getAll(): Promise<Sale[]> {
    return getItems<Sale>(KEYS.SALES);
  },

  async getById(id: string): Promise<Sale | undefined> {
    const sales = await this.getAll();
    return sales.find(s => s.id === id);
  },

  async create(sale: Omit<Sale, 'id' | 'createdAt'>): Promise<Sale> {
    const sales = await this.getAll();
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    sales.push(newSale);
    await saveItems(KEYS.SALES, sales);
    
    // Update product stock
    for (const item of sale.items) {
      await ProductService.updateStock(item.product.id, -item.quantity);
    }
    
    return newSale;
  },

  async getTodayTotal(): Promise<number> {
    const sales = await this.getAll();
    const today = new Date().toDateString();
    return sales
      .filter(s => new Date(s.createdAt).toDateString() === today)
      .reduce((sum, s) => sum + s.total, 0);
  },

  async getByDateRange(startDate: Date, endDate: Date): Promise<Sale[]> {
    const sales = await this.getAll();
    return sales.filter(s => {
      const saleDate = new Date(s.createdAt);
      return saleDate >= startDate && saleDate <= endDate;
    });
  },
};

// Device operations
export const DeviceService = {
  async getAll(): Promise<Device[]> {
    return getItems<Device>(KEYS.DEVICES);
  },

  async getById(id: string): Promise<Device | undefined> {
    const devices = await this.getAll();
    return devices.find(d => d.id === id);
  },

  async getByCustomer(customerId: string): Promise<Device[]> {
    const devices = await this.getAll();
    return devices.filter(d => d.customerId === customerId);
  },

  async create(device: Omit<Device, 'id'>): Promise<Device> {
    const devices = await this.getAll();
    const newDevice: Device = {
      ...device,
      id: Date.now().toString(),
    };
    devices.push(newDevice);
    await saveItems(KEYS.DEVICES, devices);
    return newDevice;
  },
};

// Initialize with sample data
export const initializeSampleData = async () => {
  const products = await ProductService.getAll();
  if (products.length === 0) {
    // Add sample products
    const sampleProducts = [
      {
        name: 'iPhone Screen Replacement',
        description: 'High-quality iPhone screen replacement',
        sku: 'SCR-IP-001',
        category: 'Parts',
        price: 150,
        cost: 80,
        stock: 10,
        minStock: 3,
      },
      {
        name: 'Samsung Battery',
        description: 'Original Samsung battery',
        sku: 'BAT-SAM-001',
        category: 'Parts',
        price: 50,
        cost: 25,
        stock: 15,
        minStock: 5,
      },
      {
        name: 'Phone Case',
        description: 'Universal phone protective case',
        sku: 'ACC-CAS-001',
        category: 'Accessories',
        price: 15,
        cost: 5,
        stock: 50,
        minStock: 10,
      },
      {
        name: 'Screen Protector',
        description: 'Tempered glass screen protector',
        sku: 'ACC-SCR-001',
        category: 'Accessories',
        price: 10,
        cost: 3,
        stock: 100,
        minStock: 20,
      },
      {
        name: 'Charging Cable',
        description: 'USB-C charging cable',
        sku: 'ACC-CAB-001',
        category: 'Accessories',
        price: 12,
        cost: 4,
        stock: 30,
        minStock: 10,
      },
    ];

    for (const product of sampleProducts) {
      await ProductService.create(product);
    }
  }
};
