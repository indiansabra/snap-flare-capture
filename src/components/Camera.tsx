
import { useRef, useState, useEffect } from "react";
import { Camera as CameraIcon, RotateCw } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
}

const Camera = ({ onCapture }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg");
        onCapture(photoData);
      }
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
          <div className="w-8 h-8 border-4 border-neutral-600 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full aspect-[3/4] object-cover"
      />
      
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
        <button
          onClick={toggleCamera}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
        >
          <RotateCw className="w-6 h-6" />
        </button>
        
        <button
          onClick={capturePhoto}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Take photo"
        >
          <CameraIcon className="w-8 h-8 text-black" />
        </button>
        
        <div className="w-12" /> {/* Spacer for layout balance */}
      </div>
    </div>
  );
};

export default Camera;
