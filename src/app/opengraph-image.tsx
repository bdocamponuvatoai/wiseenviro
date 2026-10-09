import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.legalName}: Alabama waste collection and portable sanitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colors from the Wise Environmental logo (ImageResponse can't read CSS variables).
const BLUE = "#055D9E";
const LIME = "#96C11D";
const MIST = "#DCE8F2";

async function getLogoDataUrl() {
  "use cache";
  cacheLife("max");
  const logo = await readFile(join(process.cwd(), "src/assets/brand/logo-white.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function OpengraphImage() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BLUE,
        color: "white",
        padding: "64px 72px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
      <img src={logoSrc} width={476} height={110} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 120, height: 4, background: LIME, marginBottom: 28 }} />
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          Your Partner in Responsible Waste Solutions
        </div>
        <div style={{ fontSize: 30, color: MIST, marginTop: 24 }}>
          Dumpsters · Portable Toilets · Restroom & Shower Trailers · Septic · Answering 24/7
        </div>
      </div>
    </div>,
    size,
  );
}
