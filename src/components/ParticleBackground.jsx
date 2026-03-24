import React, { useCallback, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 30,
        particles: {
          number: { value: 25, density: { enable: true, area: 900 } },
          color: { value: ["#00f0ff", "#7000ff"] },
          opacity: {
            value: { min: 0.05, max: 0.2 },
          },
          size: { value: { min: 1, max: 2.5 } },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            outModes: { default: "bounce" },
          },
        },
        detectRetina: false,
      }}
    />
  );
};

export default ParticleBackground;
