import { Form, Input, Button, Alert, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';  // ← Thêm hooks
import { AuthService } from '../../services/authService';
import { setError, setLoading, clearError } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

const { Title } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();      // ← Thêm
  const location = useLocation();      // ← Thêm
  
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginFormData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      
      // Call Firebase login
      await AuthService.login(values.email, values.password);
      message.success({
        content: (
          <span>
            Đăng nhập thành công
          </span>
        ),
        duration: 1, // 2 seconds
        style: {
          marginTop: '10px'
        }
      });
      
      // ✅ SUCCESS - Redirect logic
      const from = location.state?.from?.pathname || '/';  // Lấy trang trước đó hoặc home
      navigate(from, { replace: true });
      
    } catch (error: any) {
      // ... existing error handling
      let errorMessage = 'Đăng nhập thất bại';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Email không tồn tại';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mật khẩu không đúng';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email không hợp lệ';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Quá nhiều lần thử. Vui lòng thử lại sau.';
          break;
      }
      
      dispatch(setError(errorMessage));
    }
  };

  // ... rest of component remains the same
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Đăng nhập
      </Title>
      
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}
      
      <Form
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;