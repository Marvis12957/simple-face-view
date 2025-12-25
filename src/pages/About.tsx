const About = () => {
  return (
    <div className="container-simple">
      <h1 className="text-2xl font-bold mb-4">Giới thiệu</h1>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Nhận diện khuôn mặt là gì?</h2>
      <p className="mb-4 text-muted-foreground">
        Nhận diện khuôn mặt (Face Recognition) là một công nghệ sinh trắc học sử dụng 
        đặc điểm khuôn mặt để xác định hoặc xác minh danh tính của một người. Hệ thống 
        phân tích các đặc trưng như khoảng cách giữa hai mắt, chiều rộng mũi, hình dạng 
        xương gò má để tạo ra một "dấu vân tay khuôn mặt" duy nhất.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ứng dụng thực tế</h2>
      <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-1">
        <li>Mở khóa điện thoại và thiết bị di động</li>
        <li>Hệ thống chấm công và kiểm soát ra vào</li>
        <li>Xác minh danh tính trong ngân hàng và tài chính</li>
        <li>Tìm kiếm người mất tích</li>
        <li>Hệ thống an ninh và giám sát</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Về dự án này</h2>
      <p className="text-muted-foreground">
        Đây là một ứng dụng demo phục vụ mục đích học tập và nghiên cứu. Hệ thống sử dụng 
        các mô hình học sâu để phát hiện và nhận diện khuôn mặt trong ảnh hoặc video 
        trực tiếp từ webcam.
      </p>
    </div>
  );
};

export default About;
