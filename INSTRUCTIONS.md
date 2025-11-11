# VR 360° con A-Frame + React + TypeScript

## Requisitos
- React + TypeScript + Vite
- Tailwind CSS
- A-Frame para VR
- Mux para hosting de video

## Implementación

### 1. Instalar dependencias
```bash
npm install -D tailwindcss @tailwindcss/vite
```

### 2. Configurar Vite + Tailwind
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Configurar index.html
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="mobile-web-app-capable" content="yes" />
    <title>Experiencia VR 360°</title>

    <!-- A-Frame CDN with iOS/Android detection -->
    <script>
      (function() {
        var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        var s = document.createElement('script');
        s.src = isIOS
          ? 'https://aframe.io/releases/1.2.0/aframe.min.js'
          : 'https://aframe.io/releases/1.4.2/aframe.min.js';
        document.head.appendChild(s);
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 4. Crear utilidad para video source
```typescript
// src/utils/getVideoSrc.ts
export function getVideoSrc(playbackId: string): string {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);

  if (isIOS) {
    // iOS Safari doesn't handle HLS well as WebGL texture, use direct MP4
    return `https://stream.mux.com/${playbackId}/medium.mp4`;
  }

  // Android and other devices can use HLS for adaptive streaming
  return `https://stream.mux.com/${playbackId}.m3u8`;
}
```

### 5. Implementar componente VR360
```tsx
// src/App.tsx
import { useEffect, useRef } from "react";
import { getVideoSrc } from "./utils/getVideoSrc";

export default function App() {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Set video source dynamically based on platform when component mounts
    const video = document.getElementById("vid360") as HTMLVideoElement | null;
    if (video) {
      const videoSrc = getVideoSrc("PLACEHOLDER_ID");
      video.setAttribute("src", videoSrc);
    }
  }, []);

  function handleStart() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const video = document.getElementById("vid360") as HTMLVideoElement | null;
    if (!video) {
      console.error("Video element not found");
      return;
    }

    // Try to play with audio first, fallback to muted if blocked
    video.muted = false;
    video.play().catch(() => {
      console.log("Audio blocked, playing muted");
      video.muted = true;
      video.play();
    });

    // Enter VR mode programmatically
    const scene = document.querySelector("a-scene") as any;
    if (scene && scene.enterVR) {
      setTimeout(() => {
        scene.enterVR();
      }, 500); // Small delay to ensure video starts
    }

    // Hide gate screen
    const gate = document.getElementById("gate");
    if (gate) {
      gate.style.display = "none";
    }
  }

  return (
    <div className="w-full h-screen bg-black">
      {/* Gate Screen - User must interact before entering VR */}
      <div
        id="gate"
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/90"
      >
        <div className="text-center text-white px-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Experiencia VR 360°</h1>
          <p className="text-sm opacity-90 mb-6 leading-relaxed">
            Toca <strong>Iniciar</strong> para habilitar los sensores de
            movimiento y comenzar la reproducción del video.
          </p>
          <p className="text-xs opacity-75 mb-6">
            Después de iniciar, coloca tu teléfono en las gafas VR Cardboard.
          </p>
          <button
            onClick={handleStart}
            className="rounded-lg px-8 py-3 bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Iniciar
          </button>
        </div>
      </div>

      {/* A-Frame VR Scene */}
      <a-scene
        embedded
        device-orientation-permission-ui="enabled: true"
        vr-mode-ui="enabled: true"
        renderer="colorManagement: true; antialias: true"
      >
        <a-assets timeout="15000">
          <video
            id="vid360"
            playsInline
            webkit-playsinline="true"
            muted
            autoPlay
            loop
            crossOrigin="anonymous"
          ></video>
        </a-assets>

        <a-videosphere src="#vid360" rotation="0 -90 0"></a-videosphere>

        <a-entity
          camera
          look-controls="enabled: true"
          wasd-controls="enabled: false"
        ></a-entity>
      </a-scene>
    </div>
  );
}
```

### 6. Configurar CSS
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
}

#root {
  width: 100vw;
  height: 100vh;
}
```

## Despliegue en Vercel
1. Conectar repositorio a Vercel
2. Configurar build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Añadir variable de entorno:
   - `VITE_MUX_PLAYBACK_ID`: tu playback ID de Mux
4. Desplegar

## Uso
1. Escanear QR que apunte a la URL desplegada
2. Tocar "Iniciar" en el dispositivo móvil
3. Colocar teléfono en gafas Cardboard
4. Disfrutar experiencia VR 360°

## Consideraciones técnicas
- iOS usa A-Frame 1.2.0 (WebVR fallback con sensores)
- Android usa A-Frame 1.4.2 (WebXR nativo)
- Video en MP4 para iOS, HLS para Android
- Requiere HTTPS para sensores en iOS
- Manejo automático de permisos de movimiento