const fs = require('node:fs');
const path = require('node:path');

const jxl = require('@jsquash/jxl');
const { Image } = require('image-js');
const sharp = require('sharp');

// Input and output directories
const inputDir = path.join(__dirname, 'seeds/images-orig');
const outputDir = path.join(__dirname, 'seeds/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all files from the input directory
const files = fs.readdirSync(inputDir);

// Process each file
async function processImages() {
  console.log('Converting images to WebP format...');

  await import('@jsquash/jxl/decode.js').then(({ init }) =>
    init(undefined, { wasmBinary: fs.readFileSync(require.resolve('@jsquash/jxl/codec/dec/jxl_dec.wasm')) }),
  );

  for (const file of files) {
    const inputPath = path.join(inputDir, file);

    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    const outputPath = path.join(outputDir, `${fileName}.webp`);

    if (fileExt === '.jxl') {
      const jxlBuffer = fs.readFileSync(inputPath);
      const imageData = await jxl.decode(jxlBuffer);
      const image = new Image(imageData);
      await sharp(image.toBuffer())
        .webp({ quality: 80 }) // Adjust quality as needed
        .toFile(outputPath);
    } else {
      await sharp(inputPath)
        .webp({ quality: 80 }) // Adjust quality as needed
        .toFile(outputPath);
    }

    console.log(`Converted: ${file} -> ${fileName}.webp`);
  }

  console.log('Image conversion completed!');
}

processImages();
