import React, { useState } from "react";
import { DownloadButton } from "../../components/DownloadButton";
import { DownloadPopover } from "../../components/DownloadPopover";
import { useVideoDownload } from "../../hooks/useVideoDownload";

const Popup: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [url, setUrl] = useState("");
  const { meta, fetchQualities, downloadHighest, loading } = useVideoDownload();

  const handleDownload = () => {
    fetchQualities(url).then(() => setPopoverOpen(true));
  };

  return (
    <div className="p-5 w-[340px] min-h-[220px] flex flex-col items-center gap-4">
      <input
        className="border px-2 py-1 rounded w-full"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <DownloadButton onClick={handleDownload} size={48} />
      <DownloadPopover
        visible={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        onDownload={downloadHighest}
        title={meta.title}
        thumbnail={meta.thumbnail}
        loading={loading}
        videoUrl={meta.url ? `https://www.youtube.com/embed/${new URLSearchParams(new URL(meta.url).search).get('v')}` : undefined}
      />
    </div>
  );
};
export default Popup;
