import React from "react";
import { Download } from "lucide-react";

export const DownloadButton: React.FC<{
  onClick?: () => void;
  size?: number;
  className?: string;
}> = ({ onClick, size = 48, className = "" }) => (
  <button
    onClick={onClick}
    style={{ width: size, height: size, borderRadius: "50%" }}
    className={`bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-md transition-colors focus:outline-none ${className}`}
  >
    <Download size={size * 0.6} />
  </button>
);
