const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../public/sequence');
const sourceImagePath = 'C:\\Users\\riski\\.gemini\\antigravity\\brain\\2422b144-803c-4e2f-b115-05196d7aaa8d\\cyberpunk_mainframe_1771747296163.png';

if (!fs.existsSync(sequenceDir)) {
    fs.mkdirSync(sequenceDir, { recursive: true });
}

// Read image and convert to base64
const imageBuffer = fs.readFileSync(sourceImagePath);
const base64Image = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Image}`;

// Dimension of generated image is usually 1920x1080 for 16:9 prompt or similar. Let's assume 1920x1080 canvas.
const width = 1920;
const height = 1080;

for (let i = 1; i <= 60; i++) {
    const frameNum = i.toString().padStart(3, '0');
    const fileName = `frame_${frameNum}.svg`;

    // Zoom from 1.0 to 1.5 over 60 frames
    const progress = (i - 1) / 59; // 0 to 1
    const scale = 1.0 + (progress * 0.5);

    // Center translation to keep it zooming into the middle
    // when scaled by S, the new width is w*S. the translation to center is: -(w*S - w)/2
    const tx = -(width * scale - width) / 2;
    const ty = -(height * scale - height) / 2;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <g transform="translate(${tx}, ${ty}) scale(${scale})">
            <image href="${dataUri}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />
        </g>
        
        <!-- Subtle digital noise lines moving down as we scroll -->
        <rect x="0" y="${(progress * 1080 * 2) % 1080}" width="1920" height="2" fill="#00ff41" opacity="0.3" />
        <rect x="0" y="${(progress * 1080 * 3 + 400) % 1080}" width="1920" height="4" fill="#00ff41" opacity="0.1" />
    </svg>`;

    fs.writeFileSync(path.join(sequenceDir, fileName), svg);
}

console.log("Successfully generated 60 SVG image-embedded frames in public/sequence");
