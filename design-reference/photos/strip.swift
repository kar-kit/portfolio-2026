import ImageIO; import Foundation; import UniformTypeIdentifiers
// Re-encode pixel data only — no EXIF/GPS/TIFF/maker dictionaries carried over.
for p in CommandLine.arguments.dropFirst() {
  let url = URL(fileURLWithPath: p)
  let src = CGImageSourceCreateWithURL(url as CFURL, nil)!
  let img = CGImageSourceCreateImageAtIndex(src, 0, nil)!
  let tmp = url.deletingLastPathComponent().appendingPathComponent(".strip-" + url.lastPathComponent)
  let dst = CGImageDestinationCreateWithURL(tmp as CFURL, UTType.png.identifier as CFString, 1, nil)!
  CGImageDestinationAddImage(dst, img, nil)
  precondition(CGImageDestinationFinalize(dst))
  try! FileManager.default.removeItem(at: url)
  try! FileManager.default.moveItem(at: tmp, to: url)
}
