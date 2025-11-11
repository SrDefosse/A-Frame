// Configuración de video
export const VIDEO_CONFIG = {
  // Cambia entre 'local' o 'mux'
  source: 'local', // 'local' | 'mux'

  // Para video local: ruta relativa desde /public
  localVideoPath: '/video360.mov',

  // Para Mux: playback ID
  muxPlaybackId: 'N4Ya01cvSRoJX2S7JsMEAwTCvrsOqmbUjP00E767qNdbo'
};

export function getVideoSrc(playbackId?: string): string {
  if (VIDEO_CONFIG.source === 'local') {
    // Usar video local desde /public
    return VIDEO_CONFIG.localVideoPath;
  }

  // Usar Mux (código original)
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);

  if (isIOS) {
    // iOS Safari doesn't handle HLS well as WebGL texture, use direct MP4
    return `https://stream.mux.com/${playbackId || VIDEO_CONFIG.muxPlaybackId}/medium.mp4`;
  }

  // Android and other devices can use HLS for adaptive streaming
  return `https://stream.mux.com/${playbackId || VIDEO_CONFIG.muxPlaybackId}.m3u8`;
}
