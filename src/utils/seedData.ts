import { ProductService } from '../services/productService';
import type { Product } from '../types';

const sampleProducts: Omit<Product, 'id'>[] = [
  {
    name: 'iPhone 15 Pro Max',
    price: 29990000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và màn hình Super Retina XDR 6.7 inch',
    category: 'phone',
    stock: 10,
    createdAt: new Date()
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 26990000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
    description: 'Galaxy S24 Ultra với S Pen tích hợp, camera 200MP và màn hình Dynamic AMOLED 6.8 inch',
    category: 'phone',
    stock: 15,
    createdAt: new Date()
  },
  {
    name: 'MacBook Pro M3',
    price: 52990000,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    description: 'MacBook Pro 14 inch với chip M3, RAM 16GB và SSD 512GB cho hiệu suất vượt trội',
    category: 'laptop',
    stock: 8,
    createdAt: new Date()
  },
  {
    name: 'iPad Air M2',
    price: 19990000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    description: 'iPad Air với chip M2, màn hình Liquid Retina 10.9 inch và hỗ trợ Apple Pencil',
    category: 'tablet',
    stock: 12,
    createdAt: new Date()
  },
  {
    name: 'AirPods Pro 2',
    price: 6990000,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300',
    description: 'AirPods Pro thế hệ 2 với chống ồn chủ động và âm thanh không gian',
    category: 'accessory',
    stock: 25,
    createdAt: new Date()
  },
  {
    name: 'Apple Watch Series 9',
    price: 12990000,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300',
    description: 'Apple Watch Series 9 với chip S9, màn hình Always-On và tính năng sức khỏe toàn diện',
    category: 'watch',
    stock: 20,
    createdAt: new Date()
  }
];

export const seedProducts = async () => {
  try {
    console.log('Đang thêm dữ liệu mẫu...');
    
    for (const product of sampleProducts) {
      await ProductService.addProduct(product);
      console.log(`Đã thêm: ${product.name}`);
    }
    
    console.log('Hoàn thành việc thêm dữ liệu mẫu!');
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu:', error);
  }
};