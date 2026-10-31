import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#f5f5f5",
          fontSize: 260,
          fontWeight: 700,
          letterSpacing: -10,
          borderRadius: 112,
        }}
      >
        PZ
      </div>
    ),
    size,
  );
}
