import Foundation; import CoreImage; import CoreImage.CIFilterBuiltins
// ogphoto.swift <in.png> <out.png> — 520x630 crop with an elliptical alpha fade baked in
// (the OG renderer can't do CSS masks reliably).
let a = CommandLine.arguments
var img = CIImage(contentsOf: URL(fileURLWithPath: a[1]))!
let W: CGFloat = 520, H: CGFloat = 630
let s = max(W / img.extent.width, H / img.extent.height) * 1.0
img = img.transformed(by: CGAffineTransform(scaleX: s, y: s))
// keep the top of the frame (head) — crop from the top
let x0 = (img.extent.width - W) / 2, y0 = img.extent.height - H
img = img.cropped(to: CGRect(x: x0, y: y0, width: W, height: H)).transformed(by: CGAffineTransform(translationX: -x0, y: -y0))
let g = CIFilter.radialGradient()
g.center = CGPoint(x: W * 0.55, y: H * 0.58); g.radius0 = 100; g.radius1 = 265
g.color0 = .white; g.color1 = .black
// stretch the circle vertically into an ellipse
let mask = g.outputImage!.transformed(by: CGAffineTransform(translationX: -W*0.55, y: -H*0.58).concatenating(CGAffineTransform(scaleX: 1, y: 1.3)).concatenating(CGAffineTransform(translationX: W*0.55, y: H*0.58))).cropped(to: CGRect(x: 0, y: 0, width: W, height: H))
let b = CIFilter.blendWithMask(); b.inputImage = img; b.backgroundImage = CIImage(color: .clear).cropped(to: img.extent); b.maskImage = mask
let ctx = CIContext()
try ctx.writePNGRepresentation(of: b.outputImage!, to: URL(fileURLWithPath: a[2]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
