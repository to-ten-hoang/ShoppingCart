// Định nghĩa cấu trúc dữ liệu
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  createdAt: Date;
}

export interface CartItem {
  id: string;           // ID của item trong cart
  productId: string;    // ID của sản phẩm gốc
  name: string;
  price: number;
  image: string;
  quantity: number;
  subtotal: number;     // price * quantity
}

export interface CartState {
  items: CartItem[];
  totalItems: number;   // Tổng số sản phẩm
  totalAmount: number;  // Tổng tiền
  loading: boolean;
  error: string | null;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

