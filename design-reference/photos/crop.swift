import ImageIO; import Foundation; import UniformTypeIdentifiers
// crop.swift <in> <out> <topPixelsToRemove>
let a = CommandLine.arguments
let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil)!
let img = CGImageSourceCreateImageAtIndex(src, 0, nil)!
let top = Int(a[3])!
let out = img.cropping(to: CGRect(x: 0, y: top, width: img.width, height: img.height - top))!
let dst = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dst, out, nil); precondition(CGImageDestinationFinalize(dst))
