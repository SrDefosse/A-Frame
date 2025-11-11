export function getVideoSrc(playbackId?: string): string {
  // Usar el playback ID real de Mux
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  // Use MP4 for better compatibility and to avoid CORS/HLS issues in production
  // MP4 works better with A-Frame video textures
  if (isIOS || isAndroid) {
    // Mobile devices: use medium quality for better loading times
    return `https://stream.mux.com/${playbackId}/medium.mp4`;
  }

  // Desktop: use high quality MP4
  return `https://stream.mux.com/${playbackId}/high.mp4`;
}
