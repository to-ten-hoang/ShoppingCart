import React, { useState } from 'react';  // ← Thêm useState
import { Card, Button, Typography, Space, Image, message } from 'antd';
import { ShoppingCartOutlined, LoadingOutlined } from '@ant-design/icons';  // ← Thêm LoadingOutlined
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import type { Product } from '../../types';

const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [addingToCart, setAddingToCart] = useState(false);  // ← Thêm local loading state

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {  // ← Thêm async
    if (product.stock <= 0) {
      message.error('Sản phẩm đã hết hàng!');
      return;
    }
    
    try {
      setAddingToCart(true);  // ← Bắt đầu loading
      
      // Dispatch action
      dispatch(addToCart(product));
      
      // Delay nhỏ để user thấy loading effect
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Success message
      message.success({
        content: (
          <span>
            Đã thêm <strong>"{product.name}"</strong> vào giỏ hàng!
          </span>
        ),
        duration: 2, // 2 seconds
        style: {
          marginTop: '10px'
        }
      });
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setAddingToCart(false);  // ← Kết thúc loading
    }
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <Image
          alt={product.name}
          src={product.image}
          height={200}
          style={{ objectFit: 'cover' }}
          placeholder={
            <div style={{ 
              height: 200, 
              background: '#f0f0f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              Loading...
            </div>
          }
        />
      }
      actions={[
        <Button
          key="add-to-cart"
          type="primary"
          icon={addingToCart ? <LoadingOutlined /> : <ShoppingCartOutlined />}  // ← Dynamic icon
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || addingToCart}  // ← Disable khi loading
          loading={addingToCart}  // ← Button loading state
          block
        >
          {addingToCart 
            ? 'Đang thêm...' 
            : product.stock <= 0 
              ? 'Hết hàng' 
              : 'Thêm vào giỏ'
          }
        </Button>
      ]}
    >
      <Card.Meta
        title={
          <Title level={5} ellipsis={{ rows: 2 }}>
            {product.name}
          </Title>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text ellipsis type="secondary">
              {product.description}
            </Text>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>
                {formatPrice(product.price)}
              </Text>
              
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Còn: {product.stock}
              </Text>
            </div>
          </Space>
        }
      />
    </Card>
  );
};

export default ProductCard;