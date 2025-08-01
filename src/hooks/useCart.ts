import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { 
  setLoading as setCartLoading, 
  setError as setCartError,
  loadCart,
  mergeCart 
} from '../store/slices/cartSlice';
import { CartService } from '../services/cartService';
import type { CartItem } from '../types';

export const useCart = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartState = useSelector((state: RootState) => state.cart);

  // Load cart khi user login
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromFirebase(user.uid);
    }
  }, [isAuthenticated, user]);

  // Save cart khi có thay đổi (debounce để tránh call liên tục)
  useEffect(() => {
    if (isAuthenticated && user && cartState.items.length >= 0) {
      // Delay save để tránh call API liên tục khi user thay đổi quantity nhanh
      const timeoutId = setTimeout(() => {
        saveCartToFirebase(user.uid, cartState.items);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [cartState.items, isAuthenticated, user]);

  const loadCartFromFirebase = async (userId: string) => {
    try {
      dispatch(setCartLoading(true));
      
      const firebaseCartItems = await CartService.getUserCart(userId);
      
      if (cartState.items.length > 0) {
        // User có cart local → merge với Firebase cart
        dispatch(mergeCart(firebaseCartItems));
      } else {
        // User chưa có cart local → load từ Firebase
        dispatch(loadCart(firebaseCartItems));
      }
      
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch(setCartError('Không thể tải giỏ hàng'));
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const saveCartToFirebase = async (userId: string, items: CartItem[]) => {
    try {
      await CartService.saveUserCart(userId, items);
      console.log('✅ Cart saved to Firebase');
    } catch (error) {
      console.error('❌ Error saving cart:', error);
      // Silent fail - không làm phiền user
    }
  };

  return {
    ...cartState,
  };
};