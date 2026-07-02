"use client";

import { useRef, useState } from "react";

export function useTilt(maxTilt = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.03)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)",
      transition: "transform 0.4s ease-out",
    });
  };

  return { ref, style, onMouseMove, onMouseLeave };
}
