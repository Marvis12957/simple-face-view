import { useState, useRef } from "react";

interface FaceResult {
  label: string;
  confidence: number;
  bbox: [number, number, number, number];
}

interface DetectionResult {
  faces: FaceResult[];
  processedImageUrl: string;
}

const Demo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Vui lòng chọn ảnh trước");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with actual endpoint
      // const formData = new FormData();
      // formData.append("image", selectedFile);
      // const response = await fetch("http://localhost:8000/api/detect", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();

      // Mock response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResult: DetectionResult = {
        faces: [
          { label: "Person A", confidence: 0.95, bbox: [100, 50, 150, 200] },
          { label: "Person B", confidence: 0.87, bbox: [300, 60, 140, 190] },
        ],
        processedImageUrl: previewUrl || "",
      };
      setResult(mockResult);
    } catch (err) {
      setError("Lỗi khi xử lý ảnh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container-simple">
      <h1 className="text-2xl font-bold mb-4">Demo nhận diện từ ảnh</h1>

      <div className="mb-6">
        <label className="block mb-2">Chọn ảnh:</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-card file:text-foreground file:cursor-pointer"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || loading}
          className="btn btn-primary disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Submit"}
        </button>
        <button onClick={handleClear} className="btn">
          Clear
        </button>
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {previewUrl && (
          <div>
            <h3 className="font-semibold mb-2">Ảnh gốc:</h3>
            <div className="image-container">
              <img
                src={previewUrl}
                alt="Original"
                className="max-w-full max-h-80"
              />
            </div>
          </div>
        )}

        {result && (
          <div>
            <h3 className="font-semibold mb-2">Kết quả:</h3>
            <div className="image-container">
              <img
                src={result.processedImageUrl}
                alt="Processed"
                className="max-w-full max-h-80"
              />
            </div>
          </div>
        )}
      </div>

      {result && result.faces.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Danh sách khuôn mặt ({result.faces.length}):
          </h3>
          <div className="border border-border">
            {result.faces.map((face, index) => (
              <div key={index} className="face-item px-4">
                <span className="font-medium">{face.label}</span>
                <span className="text-muted-foreground ml-4">
                  Score: {(face.confidence * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.faces.length === 0 && (
        <p className="mt-4 text-muted-foreground">
          Không phát hiện khuôn mặt nào trong ảnh.
        </p>
      )}
    </div>
  );
};

export default Demo;
