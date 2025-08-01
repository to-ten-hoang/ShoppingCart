import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from '../types';

// Collection name trong Firestore
const PRODUCTS_COLLECTION = 'products';

export class ProductService {
  // Lấy tất cả sản phẩm
  static async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const querySnapshot = await getDocs(productsRef);
      
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        } as Product);
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  // Lấy sản phẩm theo ID
  static async getProductById(id: string): Promise<Product | null> {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data()
        } as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  // Thêm sản phẩm mới (dành cho admin)
  static async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...product,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
}