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
      const videoSrc = getVideoSrc("N4Ya01cvSRoJX2S7JsMEAwTCvrsOqmbUjP00E767qNdbo"); // Tu playback ID real
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
        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 p-6"
      >
        <div className="text-center text-white max-w-lg">
          <div className="mb-8">
            <svg className="w-20 h-20 mx-auto text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            Experiencia VR 360°
          </h1>
          <p className="text-base text-gray-300 mb-6 leading-relaxed">
            Presiona <strong>Iniciar</strong> para activar los sensores de movimiento y sumergirte en el video.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Para una mejor experiencia, usa tus gafas de realidad virtual.
          </p>
          <button
            onClick={handleStart}
            className="rounded-full px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
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
