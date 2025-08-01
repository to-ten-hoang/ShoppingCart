import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import type { CartItem } from '../types';

const CARTS_COLLECTION = 'carts';

export class CartService {
  // Lấy giỏ hàng của user
  static async getUserCart(userId: string): Promise<CartItem[]> {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, userId);
      const cartSnap = await getDoc(cartRef);
      
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        return cartData.items || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  }

  // Lưu giỏ hàng của user
  static async saveUserCart(userId: string, items: CartItem[]): Promise<void> {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, userId);
      await setDoc(cartRef, {
        items,
        updatedAt: new Date()
      }, { merge: true }); // merge: true để không ghi đè toàn bộ document
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  }

  // Xóa giỏ hàng của user
  static async clearUserCart(userId: string): Promise<void> {
    try {
      const cartRef = doc(db, CARTS_COLLECTION, userId);
      await updateDoc(cartRef, {
        items: [],
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Lắng nghe thay đổi giỏ hàng real-time
  static subscribeToUserCart(
    userId: string, 
    callback: (items: CartItem[]) => void
  ): () => void {
    const cartRef = doc(db, CARTS_COLLECTION, userId);
    
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        const cartData = doc.data();
        callback(cartData.items || []);
      } else {
        callback([]);
      }
    });

    return unsubscribe; // Trả về function để hủy subscription
  }
}