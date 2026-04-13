import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(34,211,238,0.3), transparent 30%), radial-gradient(circle at bottom right, rgba(52,211,153,0.25), transparent 34%), linear-gradient(180deg, #05070b 0%, #08111c 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a5f3fc",
            fontSize: 24,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#6ee7b7",
            }}
          />
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1,
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              color: "#dbeafe",
              maxWidth: 900,
            }}
          >
            Full-stack product developer building polished interfaces, real
            systems, and premium client-facing web experiences.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            color: "#d1fae5",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <div>Next.js</div>
          <div>TypeScript</div>
          <div>Flutter</div>
          <div>Motion UI</div>
        </div>
      </div>
    ),
    size,
  );
}
