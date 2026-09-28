import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The title-menu selection cursor, in signal on ink.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0E0F0C" }}>
        <svg width="15" height="21" viewBox="0 0 5 7" shapeRendering="crispEdges">
          <path d="M0 0h1v1h1v1h1v1h1v1H3v1H2v1H1v1H0z" fill="#39FF14" />
        </svg>
      </div>
    ),
    size,
  );
}
