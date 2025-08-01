
import { Card, Button, Typography, Space, Divider, Empty, Spin } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/slices/cartSlice';
import { useCart } from '../../hooks/useCart';  // ← Thay thế useSelector
import CartItem from '../CartItem/CartItem';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Sử dụng custom hook thay vì useSelector
  const { items, totalItems, totalAmount, loading } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    alert('Chức năng thanh toán sẽ được phát triển sau!');
  };

  // Loading state khi đang sync với Firebase
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '20px' }}>Đang đồng bộ giỏ hàng...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Giỏ hàng của bạn đang trống"
        >
          <Button type="primary" onClick={handleContinueShopping}>
            Tiếp tục mua sắm
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Giỏ hàng của bạn</Title>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Cart Items */}
        <div style={{ flex: 2 }}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button danger onClick={handleClearCart}>
              Xóa tất cả
            </Button>
          </div>
        </div>

        {/* Cart Summary */}
        <div style={{ flex: 1 }}>
          <Card title="Tóm tắt đơn hàng" style={{ position: 'sticky', top: '20px' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Số lượng sản phẩm:</Text>
                <Text strong>{totalItems}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Tạm tính:</Text>
                <Text>{formatPrice(totalAmount)}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Phí vận chuyển:</Text>
                <Text>Miễn phí</Text>
              </div>
              
              <Divider style={{ margin: '12px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={4}>Tổng cộng:</Title>
                <Title level={4} style={{ color: '#ff4d4f' }}>
                  {formatPrice(totalAmount)}
                </Title>
              </div>
              
              <Button 
                type="primary" 
                size="large" 
                block 
                onClick={handleCheckout}
                style={{ marginTop: '16px' }}
              >
                Thanh toán
              </Button>
              
              <Button 
                icon={<ShoppingOutlined />}
                block 
                onClick={handleContinueShopping}
              >
                Tiếp tục mua sắm
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;