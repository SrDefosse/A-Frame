# VR 360° Experience

Aplicación web de realidad virtual 360° con React, A-Frame y Vite.

## Instalación

```bash
npm install
npm run dev
```

## Configuración

El Playback ID de Mux está en `src/App.tsx` línea 9:

```typescript
const PLAYBACK_ID = "VQ1yPMehRhzKcH8Kv502Sh33IKjEHezxA54LB9MpAalM";
```

Cámbialo por tu propio Playback ID de Mux.

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
```

## Probar en móvil

1. Encuentra tu IP: `ipconfig`
2. Accede desde móvil: `http://TU_IP:5173`
3. Usa HTTPS en producción para sensores

## Estructura

```
src/
├── App.tsx              # Componente principal
├── utils/
│   └── getVideoSrc.ts   # URL del video Mux
└── main.tsx
```

## Deploy

```bash
vercel deploy
```

