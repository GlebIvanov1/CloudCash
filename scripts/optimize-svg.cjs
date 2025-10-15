const fs = require("fs").promises;
const path = require("path");
const { optimize } = require("svgo");

const CONFIG_PATH = path.join(process.cwd(), "svgo.config.cjs");
const INPUT_DIR = path.join(__dirname, "../public/Imgs/notOptimiziedSvg");
const OUTPUT_DIR = path.join(__dirname, "../public/OptimiziedSvg");

async function optimizeSvgs() {
  try {
    await fs.access(CONFIG_PATH);

    let config;

    try {
      config = require(CONFIG_PATH);
    } catch (e) {
      config = {
        multipass: true,
        plugins: ["preset-default"],
      };
    }

    try {
      await fs.access(INPUT_DIR);
    } catch {
      await fs.mkdir(INPUT_DIR, { recursive: true });
      return;
    }

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const files = await fs.readdir(INPUT_DIR);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    if (svgFiles.length === 0) {
      return;
    }

    for (const file of svgFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);

      const content = await fs.readFile(inputPath, "utf8");
      const result = optimize(content, config);

      await fs.writeFile(outputPath, result.data);
    }
  } catch (e) {
    console.log("123");
    process.exit(1);
  }
}

optimizeSvgs();
