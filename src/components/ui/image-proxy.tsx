import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface ImageProxyProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

const ImageProxy = ({ src, alt, className = "", fallbackIcon }: ImageProxyProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a proxy URL to handle CORS issues
  const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=400&h=300&fit=cover&a=attention`;

  if (imageError) {
    return (
      <div className={`flex items-center justify-center glass ${className}`}>
        {fallbackIcon || <ExternalLink className="h-8 w-8 text-white/40" />}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center glass">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={proxyUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ImageProxy;