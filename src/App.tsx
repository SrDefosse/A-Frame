import { useEffect, useRef } from "react";
import { getVideoSrc } from "./utils/getVideoSrc";

// Componentes A-Frame tipados
const AScene = 'a-scene' as any;
const AAssets = 'a-assets' as any;
const AVideosphere = 'a-videosphere' as any;
const AEntity = 'a-entity' as any;

export default function App() {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Set video source dynamically based on platform when component mounts
    const video = document.getElementById("vid360") as HTMLVideoElement | null;
    if (video) {
      const videoSrc = getVideoSrc("rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy"); // Tu playback ID real
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
      <AScene
        embedded
        device-orientation-permission-ui="enabled: true"
        vr-mode-ui="enabled: true"
        renderer="colorManagement: true; antialias: true"
      >
        <AAssets timeout="15000">
          <video
            id="vid360"
            playsInline
            webkit-playsinline="true"
            muted
            autoPlay
            loop
            crossOrigin="anonymous"
          ></video>
        </AAssets>

        <AVideosphere src="#vid360" rotation="0 -90 0"></AVideosphere>

        <AEntity
          camera
          look-controls="enabled: true"
          wasd-controls="enabled: false"
        ></AEntity>
      </AScene>
    </div>
  );
}
