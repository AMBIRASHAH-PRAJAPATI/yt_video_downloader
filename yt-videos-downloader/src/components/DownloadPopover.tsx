import React from "react";
import { X, Download } from "lucide-react";

interface DownloadPopoverProps {
  visible: boolean;
  onClose: () => void;
  onDownload: () => void;
  thumbnail?: string;
  title?: string;
  loading?: boolean;
  videoUrl?: string;
}
export const DownloadPopover: React.FC<DownloadPopoverProps> = ({
  visible, onClose, onDownload, thumbnail, title, loading = false, videoUrl
}) => {
  if (!visible) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-label="Close popover backdrop"
      />
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            onClick={onClose}
            aria-label="Close popover"
          >
            <X size={24} />
          </button>
          {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title="Video preview"
              className="w-full aspect-video rounded mb-2"
              allow="autoplay; encrypted-media"
            />
          ) : thumbnail && (
            <img src={thumbnail} alt="Video" className="mx-auto mb-2 max-h-48 rounded" />
          )}
          <button
            onClick={onDownload}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded shadow w-full justify-center"
          >
            <Download size={20} />
            {loading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </>
  );
};
