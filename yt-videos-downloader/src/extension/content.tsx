import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { DownloadButton } from "../components/DownloadButton";
import { DownloadPopover } from "../components/DownloadPopover";
import { useVideoDownload } from "../hooks/useVideoDownload";

// Find current video URL strategy can be improved as needed
function getYouTubeUrl(): string | null {
  const match = location.href.match(/watch\?v=([A-Za-z0-9_-]+)/);
  return match ? location.href : null;
}

const App = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { meta, fetchQualities, downloadHighest, loading } = useVideoDownload();

  useEffect(() => {
    if (popoverOpen) {
      const url = getYouTubeUrl();
      if (url) fetchQualities(url);
    }
  }, [popoverOpen]);

  // Only inject on YouTube video pages
  if (!getYouTubeUrl()) return null;

  return (
    <>
      <div style={{ position: "fixed", left: 18, top: "50%", transform: "translateY(-50%)", zIndex: 9999999 }}>
        <DownloadButton onClick={() => setPopoverOpen(true)} size={56} />
      </div>
      <DownloadPopover
        visible={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        onDownload={downloadHighest}
        title={meta.title}
        thumbnail={meta.thumbnail}
        loading={loading}
        videoUrl={meta.url ? `https://www.youtube.com/embed/${new URLSearchParams(new URL(meta.url).search).get("v")}` : undefined}
      />
    </>
  );
};

// Mount at document.body
const container = document.createElement("div");
document.body.appendChild(container);
createRoot(container).render(<App />);
