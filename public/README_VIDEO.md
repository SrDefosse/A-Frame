# Configuración de Video

Este proyecto soporta dos formas de cargar videos 360°:

## 1. Video Local (desde /public)

### Ventajas:
- ✅ Sin dependencias externas
- ✅ Más rápido para cargar inicialmente
- ✅ Sin límites de ancho de banda
- ✅ Funciona sin conexión a internet
- ✅ Sin costos de streaming

### Desventajas:
- ❌ El video completo debe descargarse antes de reproducirse
- ❌ No hay streaming adaptativo (calidad fija)
- ❌ Mayor uso de ancho de banda del usuario
- ❌ No optimizado para diferentes velocidades de conexión

### Cómo usar:
1. Coloca tu video 360° en la carpeta `/public/`
2. Modifica `src/utils/getVideoSrc.ts`:
   ```typescript
   export const VIDEO_CONFIG = {
     source: 'local', // Cambiar a 'local'
     localVideoPath: '/tu-video-360.mp4', // Ruta del video
   };
   ```

## 2. Video desde Mux

### Ventajas:
- ✅ Streaming adaptativo (se ajusta a la conexión)
- ✅ CDN global para carga rápida
- ✅ Solo se descarga lo necesario
- ✅ Optimizado para diferentes dispositivos
- ✅ Mejor rendimiento en redes lentas

### Desventajas:
- ❌ Dependencia de servicio externo
- ❌ Costos de uso (aunque hay free tier)
- ❌ Requiere subida previa a Mux

### Cómo usar:
1. Sube tu video a Mux y obtén el Playback ID
2. Modifica `src/utils/getVideoSrc.ts`:
   ```typescript
   export const VIDEO_CONFIG = {
     source: 'mux', // Cambiar a 'mux'
     muxPlaybackId: 'tu-playback-id-aqui', // Tu ID de Mux
   };
   ```

## Requisitos del Video 360°

### Formato Recomendado:
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x960 o superior (equirectangular)
- **Proyección**: Equirectangular (spherical)
- **Tamaño**: Lo más pequeño posible para web (máx. 100MB recomendado)

### Herramientas para crear videos 360°:
- Adobe Premiere Pro
- FFmpeg (con filtros de proyección)
- Online converters: CloudConvert, HandBrake

## Archivos de Ejemplo

Para probar con video local, puedes:
1. Descargar un video 360° de ejemplo desde Internet Archive
2. Colocarlo en `/public/video360.mp4`
3. Cambiar la configuración a `source: 'local'`

## Troubleshooting

### Video no carga:
- Verifica que el archivo esté en `/public/`
- Asegúrate de que sea formato MP4 compatible
- Revisa la consola del navegador (F12)

### Video se ve distorsionado:
- Verifica que sea un video 360° equirectangular
- La resolución debe ser 2:1 (ancho:alto)

### Problemas de CORS:
- Videos locales no tienen problemas de CORS
- Videos de Mux requieren configuración CORS en Mux
