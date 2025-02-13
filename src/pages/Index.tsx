
import { useState } from "react";
import Camera from "@/components/Camera";
import PhotoPreview from "@/components/PhotoPreview";

const Index = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoCapture = (photoData: string) => {
    setPhoto(photoData);
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md relative">
        {!photo ? (
          <Camera onCapture={handlePhotoCapture} />
        ) : (
          <PhotoPreview photo={photo} onRetake={handleRetake} />
        )}
      </div>
    </div>
  );
};

export default Index;
