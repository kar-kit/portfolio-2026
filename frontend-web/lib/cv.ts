import { existsSync } from "node:fs";
import path from "node:path";

// The CV links only render when the PDF is actually in public/, so a missing
// file can never produce a dead link. This is the phone-free web copy of the CV.
export const CV_HREF = "/joey-pang-cv.pdf";
export const hasCv = existsSync(path.join(process.cwd(), "public", CV_HREF));
