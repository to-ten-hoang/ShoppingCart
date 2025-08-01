
import { Layout, Menu, Badge, Button, Space, Dropdown, Avatar } from 'antd';
import { 
  ShoppingCartOutlined, 
  HomeOutlined, 
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RootState } from '../../store';
import { AuthService } from '../../services/authService';

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get auth và cart state từ Redux
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '/products',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Dropdown menu cho user đã đăng nhập
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 50px'
      }}>
        {/* Logo */}
        <div style={{ 
          color: 'white', 
          fontSize: '20px', 
          fontWeight: 'bold' 
        }}>
          E-Commerce Store
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ flex: 1, justifyContent: 'center' }}
        />

        {/* Right side - Cart & Auth */}
        <Space size="middle">
          {/* Cart Button */}
          <Badge count={totalItems} showZero>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleCartClick}
              size="large"
            >
              Giỏ hàng
            </Button>
          </Badge>

          {/* Auth Section */}
          {isAuthenticated ? (
            // User đã đăng nhập
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Button type="text" style={{ color: 'white' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span style={{ marginLeft: '8px' }}>
                  {user?.email?.split('@')[0]}
                </span>
              </Button>
            </Dropdown>
          ) : (
            // User chưa đăng nhập
            <Space>
              <Button onClick={() => navigate('/login')}>
                Đăng nhập
              </Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Đăng ký
              </Button>
            </Space>
          )}
        </Space>
      </Header>

      <Content style={{ padding: '20px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          minHeight: '500px',
          borderRadius: '8px'
        }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        E-Commerce Store ©2024 Created with React + Firebase
      </Footer>
    </Layout>
  );
};

export default AppLayout;