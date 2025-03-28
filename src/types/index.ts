
export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export type EquipmentCategory = 
  | 'tent' 
  | 'hammock' 
  | 'torch' 
  | 'powerBank' 
  | 'cookware'
  | 'sleeping'
  | 'other';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentSlipUrl: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface OrderItem {
  equipmentId: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'returned' | 'cancelled';
