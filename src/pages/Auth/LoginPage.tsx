
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm';

const { Text } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
        <LoginForm />
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text type="secondary">Chưa có tài khoản? </Text>
          <Link to="/register">
            <Button type="link" style={{ padding: 0 }}>
              Đăng ký ngay
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;