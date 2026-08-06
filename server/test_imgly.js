const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

async function test() {
  try {
    console.log("Starting test...");
    // Just use any file as input, maybe package.json just to see if it complains about invalid image format,
    // or better, an actual image if we have one. We can create a 1x1 image or use a known one.
    // Let's create a dummy 1x1 png file or use one from client/public if exists.
    const inputPath = "../client/public/vite.svg"; // exists in typical vite projects
    const imageBuffer = fs.readFileSync(inputPath);
    console.log("File read successfully, size:", imageBuffer.length);
    
    console.log("Running imgly removeBackground...");
    const resultBlob = await removeBackground(imageBuffer);
    console.log("Imgly completed! result size:", resultBlob.size);
    
  } catch (err) {
    console.error("IMGLY_ERROR:", err.toString());
    console.error(err);
  }
}

test();
