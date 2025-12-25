import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container-simple">
      <h1 className="text-3xl font-bold mb-4">Face Recognition Demo</h1>
      <p className="text-muted-foreground mb-6">
        Ứng dụng demo nhận diện khuôn mặt sử dụng YOLO, FaceNet và SVM. 
        Hỗ trợ nhận diện từ ảnh tĩnh hoặc webcam trực tiếp.
      </p>
      
      <div className="flex gap-4">
        <Link to="/demo" className="btn">
          Demo Image
        </Link>
        <Link to="/live" className="btn">
          Live Webcam
        </Link>
      </div>
    </div>
  );
};

export default Index;
