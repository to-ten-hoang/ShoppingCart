
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';

const { Text } = Typography;

const RegisterPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
        <RegisterForm />
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text type="secondary">Đã có tài khoản? </Text>
          <Link to="/login">
            <Button type="link" style={{ padding: 0 }}>
              Đăng nhập ngay
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;