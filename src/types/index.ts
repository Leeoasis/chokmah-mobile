export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: Date;
}

export interface Device {
  id: string;
  customerId: string;
  type: string;
  brand: string;
  model: string;
  serialNumber?: string;
  imei?: string;
}

export interface RepairJob {
  id: string;
  customerId: string;
  deviceId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delivered' | 'cancelled';
  estimatedCost: number;
  actualCost?: number;
  technicianNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  category: string;
  price: number;
  cost?: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  customerId?: string;
  createdAt: Date;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'technician' | 'cashier';
  name: string;
}
