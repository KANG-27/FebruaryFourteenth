import React, { useState, useRef } from "react";
import YouTube from "react-youtube";

function Reproduccion() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [videoOrDisco, setVideoOrDisco] = useState("disco");
  const playerRef = useRef(null);

  // 🎬 Función para manejar el reproductor
  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
  };

  // ⏯️ Play/Pause
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  // 📍 Actualizar barra de progreso cada segundo
  const updateProgress = () => {
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      const currentTime = playerRef.current.getCurrentTime();
      setProgress((currentTime / duration) * 100);
    }
  };

  // ⏩ Cambiar manualmente la posición del video
  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    if (playerRef.current) {
      const newTime = (newProgress / 100) * playerRef.current.getDuration();
      playerRef.current.seekTo(newTime, true);
    }
  };

  // 🔊 Cambiar volumen
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 fixed right-50 top-20">
      <img
        src="https://i.ytimg.com/vi/7-Ikexq03O0/sddefault.jpg"
        alt=""
        className={`${
          videoOrDisco == "video"
            ? "hidden"
            : "rounded-full w-[640px] h-[610px]"
        }`}
      />
      <div  className={`${videoOrDisco == "disco" ? "hidden" : "w-[640px] h-[610px]"}`}>
        <YouTube
          videoId="7-Ikexq03O0" // Cambia este ID por el de tu video
          opts={{ with: 850, height: 610, playerVars: { autoplay: 0 } }}
          onReady={onReady}
          onStateChange={updateProgress} // Se actualiza cuando el video cambia
         
        />
      </div>
      <div className="flex gap-5">
        <button onClick={async () => await setVideoOrDisco("disco")}>
            Disco
        </button>
        <button onClick={async () => await setVideoOrDisco("video")}>
            Video
        </button>

      </div>

      {/* ⏯️ BOTÓN PLAY/PAUSE */}
      <button
        onClick={togglePlay}
        className="p-4 text-white bg-blue-500 rounded-full"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      {/* 📍 BARRA DE PROGRESO */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-60 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />

      {/* 🔊 CONTROL DE VOLUMEN */}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="w-60 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

export default Reproduccion;
