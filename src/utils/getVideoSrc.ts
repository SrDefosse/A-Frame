export function getVideoSrc(playbackId: string): string {
  // Mux HLS stream - funciona en todos los navegadores modernos
  return `https://stream.mux.com/${playbackId}.m3u8`;
}
