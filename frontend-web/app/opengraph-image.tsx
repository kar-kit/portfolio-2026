import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// The link-preview card (LinkedIn, Slack, iMessage, X…). Rendered once at build time.

export const alt = `${site.name} — ${site.motto}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), "assets", p));

export default async function Image() {
  const [monoBold, monoRegular, sansRegular, photo] = await Promise.all([
    asset("fonts/IBMPlexMono-Bold.ttf"),
    asset("fonts/IBMPlexMono-Regular.ttf"),
    asset("fonts/IBMPlexSans-Regular.ttf"),
    asset("og-photo.png"),
  ]);
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#16140F", color: "#F2ECE1" }}>
        {/* Portrait, right side; the edge fade is baked into og-photo.png (design-reference/photos/ogphoto.swift) */}
        <div style={{ position: "absolute", right: 0, top: 0, width: 520, height: 630, display: "flex" }}>
          <img src={photoSrc} alt="" width={520} height={630} style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 24, color: "#B8AD9B" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#C1272D" }} />
            London or remote
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Mono", fontWeight: 700, fontSize: 112, letterSpacing: "-0.06em", lineHeight: 0.95 }}>
              Joey Pang
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 28,
                fontFamily: "Mono",
                fontWeight: 700,
                fontSize: 38,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              <span>Small, measured increments.&nbsp;</span>
              <span style={{ color: "#B8AD9B" }}>I don&apos;t cut corners.</span>
            </div>
            <div style={{ marginTop: 28, fontFamily: "Sans", fontSize: 28, color: "#B8AD9B", lineHeight: 1.35 }}>
              Full-stack engineer · First Class CS, Brunel
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Mono", fontSize: 24 }}>
            <div style={{ width: 40, height: 6, background: "#C1272D" }} />
            <span style={{ color: "#F2ECE1" }}>joeykarkitpang.co.uk</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mono", data: monoBold, weight: 700, style: "normal" },
        { name: "Mono", data: monoRegular, weight: 400, style: "normal" },
        { name: "Sans", data: sansRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
