import { seedProducts } from './seedData';

// Function này sẽ được gọi từ console để thêm dữ liệu mẫu
(window as any).addSampleData = async () => {
  try {
    await seedProducts();
    alert('Đã thêm dữ liệu mẫu thành công!');
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Có lỗi xảy ra khi thêm dữ liệu!');
  }
};