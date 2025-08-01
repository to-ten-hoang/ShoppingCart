
import { Card, InputNumber, Button, Image, Typography, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import type { CartItem as CartItemType } from '../../types';

const { Text, Title } = Typography;

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: value }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
        
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ margin: '0 0 8px 0' }}>
            {item.name}
          </Title>
          
          <Space direction="vertical" size="small">
            <Text type="secondary">
              Đơn giá: {formatPrice(item.price)}
            </Text>
            
            <Space align="center">
              <Text>Số lượng:</Text>
              <InputNumber
                min={1}
                max={99}
                value={item.quantity}
                onChange={handleQuantityChange}
                size="small"
              />
            </Space>
            
            <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>
              Thành tiền: {formatPrice(item.subtotal)}
            </Text>
          </Space>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
            onConfirm={handleRemove}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;