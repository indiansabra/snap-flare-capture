
import { RotateCcw } from "lucide-react";

interface PhotoPreviewProps {
  photo: string;
  onRetake: () => void;
}

const PhotoPreview = ({ photo, onRetake }: PhotoPreviewProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden animate-fade-in">
      <img
        src={photo}
        alt="Captured photo"
        className="w-full aspect-[3/4] object-cover"
      />
      
      <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
        <button
          onClick={onRetake}
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-2 transition-all hover:bg-white/20 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Photo
        </button>
      </div>
    </div>
  );
};

export default PhotoPreview;
