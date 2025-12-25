const Model = () => {
  return (
    <div className="container-simple">
      <h1 className="text-2xl font-bold mb-4">Kiến trúc mô hình</h1>
      
      <p className="mb-6 text-muted-foreground">
        Hệ thống nhận diện khuôn mặt sử dụng pipeline gồm 3 thành phần chính:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. YOLO – Face Detection</h2>
      <p className="mb-2 text-muted-foreground">
        Mô hình YOLO (You Only Look Once) được sử dụng để phát hiện và định vị 
        khuôn mặt trong ảnh. Đầu ra là tọa độ bounding box của các khuôn mặt.
      </p>
      <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-1">
        <li>Input: Ảnh RGB</li>
        <li>Output: Danh sách bounding boxes (x, y, w, h)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. FaceNet – Feature Extraction</h2>
      <p className="mb-2 text-muted-foreground">
        FaceNet chuyển đổi mỗi khuôn mặt thành một vector đặc trưng 128 chiều 
        (embedding). Các khuôn mặt của cùng một người sẽ có embedding gần nhau.
      </p>
      <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-1">
        <li>Input: Ảnh khuôn mặt đã crop 160x160</li>
        <li>Output: Vector 128 chiều</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. SVM – Classification</h2>
      <p className="mb-2 text-muted-foreground">
        Support Vector Machine phân loại embedding thành các lớp tương ứng với 
        danh tính đã được huấn luyện trước.
      </p>
      <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-1">
        <li>Input: Vector embedding 128 chiều</li>
        <li>Output: Label và confidence score</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Pipeline tổng quan</h2>
      <ol className="list-decimal list-inside text-muted-foreground space-y-1">
        <li>Nhận ảnh đầu vào</li>
        <li>YOLO phát hiện các khuôn mặt → trả về bounding boxes</li>
        <li>Crop từng khuôn mặt theo bounding box</li>
        <li>FaceNet trích xuất embedding cho mỗi khuôn mặt</li>
        <li>SVM phân loại embedding → trả về label và score</li>
        <li>Vẽ bounding box và label lên ảnh gốc</li>
      </ol>
    </div>
  );
};

export default Model;
