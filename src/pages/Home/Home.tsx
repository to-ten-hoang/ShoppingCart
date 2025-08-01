
import { Typography, Button, Row, Col, Card } from 'antd';
import { ShoppingOutlined, GiftOutlined, TruckOutlined, SafetyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      title: 'Sản phẩm đa dạng',
      description: 'Hàng ngàn sản phẩm chất lượng với giá cả hợp lý'
    },
    {
      icon: <TruckOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng tận nơi trong 24h với đội ngũ chuyên nghiệp'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
      title: 'Thanh toán an toàn',
      description: 'Bảo mật thông tin khách hàng với công nghệ hiện đại'
    },
    {
      icon: <GiftOutlined style={{ fontSize: '48px', color: '#f5222d' }} />,
      title: 'Ưu đãi hấp dẫn',
      description: 'Nhiều chương trình khuyến mãi và tích điểm thành viên'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <Title level={1} style={{ color: 'white', fontSize: '48px' }}>
          Chào mừng đến với E-Commerce Store
        </Title>
        <Paragraph style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Khám phá hàng ngàn sản phẩm chất lượng với giá cả tốt nhất
        </Paragraph>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => navigate('/products')}
          style={{ 
            marginTop: '20px', 
            height: '50px', 
            fontSize: '16px',
            minWidth: '200px'
          }}
        >
          Khám phá ngay
        </Button>
      </div>

      {/* Features Section */}
      <div>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Tại sao chọn chúng tôi?
        </Title>
        
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #f0f0f0'
                }}
                bodyStyle={{ padding: '40px 24px' }}
              >
                <div style={{ marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  {feature.title}
                </Title>
                <Paragraph type="secondary">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;