import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, Product } from '../../types';

// State ban đầu
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Nếu đã có trong giỏ, tăng số lượng
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.price * existingItem.quantity;
      } else {
        // Nếu chưa có, thêm mới
        const newItem: CartItem = {
          id: `cart_${product.id}_${Date.now()}`, // ID duy nhất cho cart item
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          subtotal: product.price,
        };
        state.items.push(newItem);
      }
      
      // Cập nhật tổng
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
        item.subtotal = item.price * quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },

    // Tính toán tổng (helper function)
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.subtotal, 0);
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Load cart từ Firebase
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Merge guest cart với user cart khi login
    mergeCart: (state, action: PayloadAction<CartItem[]>) => {
      const firebaseItems = action.payload;
      const localItems = state.items;

      // Logic merge: ưu tiên local cart (user vừa thêm)
      const mergedItems: CartItem[] = [...localItems];

      firebaseItems.forEach(firebaseItem => {
        const existingIndex = mergedItems.findIndex(
          item => item.productId === firebaseItem.productId
        );

        if (existingIndex === -1) {
          // Sản phẩm chỉ có trong Firebase → thêm vào
          mergedItems.push(firebaseItem);
        }
      })
      state.items = mergedItems;
      cartSlice.caseReducers.calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  calculateTotals,
  setLoading,
  setError,
  loadCart,      
  mergeCart,   
} = cartSlice.actions;

export default cartSlice.reducer;