import { useEffect, useRef, useState } from "react";
import { getVideoSrc } from "./utils/getVideoSrc";

const AScene = 'a-scene' as any;
const AAssets = 'a-assets' as any;
const AVideosphere = 'a-videosphere' as any;
const AEntity = 'a-entity' as any;

const PLAYBACK_ID = "VQ1yPMehRhzKcH8Kv502Sh33IKjEHezxA54LB9MpAalM";

export default function App() {
  const hasStartedRef = useRef(false);
  const [aframeLoaded, setAframeLoaded] = useState(false);

  useEffect(() => {
    const checkAFrame = () => {
      if ((window as any).AFRAME) {
        setAframeLoaded(true);
      } else {
        setTimeout(checkAFrame, 100);
      }
    };
    checkAFrame();
  }, []);

  useEffect(() => {
    if (!aframeLoaded) return;
    
    const video = document.getElementById("vid360") as HTMLVideoElement;
    if (video) {
      video.src = getVideoSrc(PLAYBACK_ID);
      video.load();
    }
  }, [aframeLoaded]);

  async function handleStart() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const video = document.getElementById("vid360") as HTMLVideoElement;
    if (!video) return;

    // Request device orientation permission (iOS 13+)
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        await (DeviceOrientationEvent as any).requestPermission();
      } catch (e) {
        console.warn('Permission denied:', e);
      }
    }

    // Play video
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play();
    });

    // Hide gate
    const gate = document.getElementById("gate");
    if (gate) gate.style.display = "none";

    // Enter VR
    const scene = document.querySelector("a-scene") as any;
    if (scene?.enterVR) {
      setTimeout(() => scene.enterVR(), 500);
    }
  }

  if (!aframeLoaded) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    );
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
            preload="auto"
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
