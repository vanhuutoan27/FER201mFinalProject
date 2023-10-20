import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7088/api',
});

// Interceptor trước khi gửi yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Thực hiện xử lý trước khi yêu cầu được gửi
    // Ví dụ: thêm headers, kiểm tra token đăng nhập, v.v.
    return config;
  },
  (error) => {
    // Xử lý lỗi trong quá trình xử lý yêu cầu
    return Promise.reject(error);
  }
);

// Interceptor sau khi nhận phản hồi
instance.interceptors.response.use(
  (response) => {
    // Thực hiện xử lý sau khi nhận phản hồi
    return response;
  },
  (error) => {
    // Xử lỗi trong quá trình xử lý phản hồi
    // Đảm bảo rằng bạn xử lý lỗi một cách hợp lý dưới đây
    if (error.response) {
      // Phản hồi trả về mã trạng thái không ổn định (vd: 404, 500, v.v.)
      console.error('HTTP Error:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      // Yêu cầu không có phản hồi từ máy chủ
      console.error('No response received from server.');
    } else {
      // Lỗi không xác định
      console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
