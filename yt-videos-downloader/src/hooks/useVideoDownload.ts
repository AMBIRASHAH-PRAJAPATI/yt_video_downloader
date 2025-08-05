import { useState } from "react";

export interface VideoQuality {
  quality: string;
  formatId: string;
  ext: string;
  hasVideo: boolean;
  hasAudio: boolean;
}
export interface VideoMeta {
  title: string;
  thumbnail: string;
  url: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function useVideoDownload() {
  const [qualities, setQualities] = useState<VideoQuality[]>([]);
  const [meta, setMeta] = useState<VideoMeta>({ title: "", thumbnail: "", url: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchQualities(url: string) {
    setLoading(true);
    setError(null);
    setMeta((m) => ({ ...m, url }));
    try {
      const resp = await fetch(`${API_BASE_URL}/api/qualities`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url })
      });
      if (!resp.ok) throw new Error('Failed to fetch qualities.');
      const data = await resp.json();
      setQualities(data.qualities || []);
      setMeta({ title: data.title || "", thumbnail: data.thumbnail || "", url });
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setQualities([]);
      setMeta((m) => ({ ...m, title: "", thumbnail: "" }));
    } finally {
      setLoading(false);
    }
  }

  function downloadHighest() {
    const best = qualities.find(q => q.hasVideo) || qualities[0];
    if (best) {
      if (typeof chrome !== 'undefined' && chrome.runtime?.id) {
        // We are in a browser extension, send message to background script
        chrome.runtime.sendMessage({
          action: 'downloadVideo',
          url: meta.url,
          formatId: best.formatId,
        });
      } else {
        // We are in the web app, use the standard download method
        const downloadUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(meta.url)}&formatId=${encodeURIComponent(best.formatId)}`;
        window.open(downloadUrl, "_blank");
      }
    }
  }

  return {
    qualities, loading, error, fetchQualities, downloadHighest, meta
  };
}
