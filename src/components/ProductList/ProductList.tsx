import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Alert, Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types';
import { ProductService } from '../../services/productService';

const { Title } = Typography;
const { Option } = Select;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');

  // Load sản phẩm khi component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter và sort sản phẩm khi có thay đổi
  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại!');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '20px' }}>Đang tải sản phẩm...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px 0' }}
      />
    );
  }

  return (
    <div>
      <Title level={2}>Danh sách sản phẩm</Title>
      
      {/* Search và Filter */}
      <Space style={{ marginBottom: '20px', width: '100%' }} size="middle">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
        
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: '200px' }}
        >
          <Option value="name">Sắp xếp theo tên</Option>
          <Option value="price-asc">Giá thấp đến cao</Option>
          <Option value="price-desc">Giá cao đến thấp</Option>
        </Select>
      </Space>

      {/* Products Grid */}
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Title level={4} type="secondary">
            Không tìm thấy sản phẩm nào
          </Title>
        </div>
      )}
    </div>
  );
};

export default ProductList;