export function getVideoSrc(playbackId?: string): string {
  // Usar el playback ID real de Mux
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);

  if (isIOS) {
    // iOS Safari doesn't handle HLS well as WebGL texture, use direct MP4
    return `https://stream.mux.com/${playbackId}/medium.mp4`;
  }

  // Android and other devices can use HLS for adaptive streaming
  return `https://stream.mux.com/${playbackId}.m3u8`;
}
