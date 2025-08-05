import React, { useState } from "react";
import { DownloadButton } from "../components/DownloadButton";
import { DownloadPopover } from "../components/DownloadPopover";
import { useVideoDownload } from "../hooks/useVideoDownload";

const Home: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const { meta, fetchQualities, downloadHighest, loading, error } = useVideoDownload();

  const handleGetVideo = async () => {
    await fetchQualities(inputUrl);
    setPopoverOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-1">YouTube Video Downloader</h1>
      <p className="mb-4 text-gray-700">
        Paste a YouTube link below and get the highest quality download.
      </p>
      <div className="flex items-center mb-6">
        <input
          className="border rounded-l px-3 py-2 flex-1"
          placeholder="YouTube video URL"
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
        />
        <button
          onClick={handleGetVideo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r flex gap-2 items-center"
        >
          <DownloadButton size={24} />
          Get Video
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
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

export default Home;
