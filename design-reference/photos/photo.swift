import Foundation
import CoreImage
import CoreImage.CIFilterBuiltins
// photo.swift <in.jpg> <out.png> — full photo (no cutout), duotone in the site palette,
// pulled darker so the wall reads as a mid-tone rather than a bright block on a dark page.
let a = CommandLine.arguments
let src = CIImage(contentsOf: URL(fileURLWithPath: a[1]), options: [.applyOrientationProperty: true])!
let cc = CIFilter.colorControls(); cc.inputImage = src; cc.saturation = 0; cc.contrast = 1.1; cc.brightness = -0.03
let g = CIFilter.gammaAdjust(); g.inputImage = cc.outputImage; g.power = 1.2
let fc = CIFilter.falseColor(); fc.inputImage = g.outputImage
fc.color0 = CIColor(red: 0x16/255, green: 0x14/255, blue: 0x0F/255)
fc.color1 = CIColor(red: 0xDE/255, green: 0xD6/255, blue: 0xC8/255)
let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
try ctx.writePNGRepresentation(of: fc.outputImage!.cropped(to: src.extent), to: URL(fileURLWithPath: a[2]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
