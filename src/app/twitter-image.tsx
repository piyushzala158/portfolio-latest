import { ImageResponse } from "next/og";

export const alt = "Piyush Zala — Frontend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#000",
          color: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>Piyush Zala</div>
        <div style={{ fontSize: 44, marginTop: 16, color: "#a3a3a3" }}>
          Frontend Software Engineer
        </div>
        <div style={{ fontSize: 32, marginTop: 40, color: "#737373" }}>
          React · Next.js · TypeScript
        </div>
      </div>
    ),
    size,
  );
}
