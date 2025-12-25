import { useState, useRef, useEffect, useCallback } from "react";

interface FaceResult {
  label: string;
  confidence: number;
  bbox: [number, number, number, number];
}

const Live = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faces, setFaces] = useState<FaceResult[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  const drawBoundingBoxes = useCallback((faceResults: FaceResult[]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceResults.forEach((face) => {
      const [x, y, w, h] = face.bbox;

      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = "#333";
      ctx.font = "14px sans-serif";
      const text = `${face.label} (${(face.confidence * 100).toFixed(0)}%)`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x, y - 20, textWidth + 8, 20);

      ctx.fillStyle = "#fff";
      ctx.fillText(text, x + 4, y - 5);
    });
  }, []);

  const processFrame = useCallback(async () => {
    // Mock API call - replace with actual endpoint
    // const canvas = document.createElement("canvas");
    // canvas.width = videoRef.current?.videoWidth || 640;
    // canvas.height = videoRef.current?.videoHeight || 480;
    // const ctx = canvas.getContext("2d");
    // ctx?.drawImage(videoRef.current!, 0, 0);
    // const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
    // const formData = new FormData();
    // formData.append("image", blob);
    // const response = await fetch("http://localhost:8000/api/detect", {
    //   method: "POST",
    //   body: formData,
    // });
    // const data = await response.json();

    // Mock response
    const mockFaces: FaceResult[] = [
      {
        label: "Person A",
        confidence: 0.92,
        bbox: [150 + Math.random() * 20, 100 + Math.random() * 10, 120, 150],
      },
    ];

    setFaces(mockFaces);
    drawBoundingBoxes(mockFaces);
  }, [drawBoundingBoxes]);

  const startWebcam = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsRunning(true);

      // Start processing frames
      intervalRef.current = window.setInterval(processFrame, 500);
    } catch (err) {
      setError("Không thể truy cập webcam. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    setIsRunning(false);
    setFaces([]);
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="container-simple">
      <h1 className="text-2xl font-bold mb-4">Live Webcam</h1>

      <div className="flex gap-4 mb-6">
        {!isRunning ? (
          <button onClick={startWebcam} className="btn btn-primary">
            Start
          </button>
        ) : (
          <button onClick={stopWebcam} className="btn">
            Stop
          </button>
        )}
      </div>

      {error && <p className="text-destructive mb-4">{error}</p>}

      <div className="video-container inline-block">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={640}
          height={480}
          className="block bg-muted"
        />
        <canvas ref={canvasRef} className="video-overlay" />
      </div>

      {isRunning && faces.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Khuôn mặt phát hiện ({faces.length}):
          </h3>
          <div className="border border-border">
            {faces.map((face, index) => (
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

      <div className="mt-6 text-muted-foreground text-sm">
        <p>
          Lưu ý: Đây là bản demo với dữ liệu giả lập. Để kết nối với backend
          thực, cần cấu hình API endpoint trong code.
        </p>
      </div>
    </div>
  );
};

export default Live;
