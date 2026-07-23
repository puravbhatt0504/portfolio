"use client";

export function GlobalBackground() {
  return (
    <>
      {/* Base light paper color is handled in layout.tsx via bg-paper */}

      {/* Sketched / faint dot grid overlay */}
      <div
        className="fixed inset-0 -z-25 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.06) 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Rough paper grain texture overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette to make edges slightly darker */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.03), inset 0 0 30px rgba(0,0,0,0.02)",
        }}
      />
    </>
  );
}
