const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(sequenceDir)) {
    fs.mkdirSync(sequenceDir, { recursive: true });
}

// Generate 60 frames of a hacker-style animation
// We'll simulate a 3D grid moving forward and "code" falling
for (let i = 1; i <= 60; i++) {
    const frameNum = i.toString().padStart(3, '0');
    const fileName = `frame_${frameNum}.svg`;

    // Animate a central expanding circle (tunnel effect) and data streams
    const tunnelRadius = (i * 10) % 500;
    const opacity = (i / 60).toFixed(2);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
        <rect width="1920" height="1080" fill="#000000" />
        <g stroke="#00ff41" stroke-width="2" fill="none" opacity="${0.1 + (i / 120)}">
            <line x1="960" y1="540" x2="0" y2="0" />
            <line x1="960" y1="540" x2="1920" y2="0" />
            <line x1="960" y1="540" x2="0" y2="1080" />
            <line x1="960" y1="540" x2="1920" y2="1080" />
            
            <circle cx="960" cy="540" r="${tunnelRadius}" />
            <circle cx="960" cy="540" r="${tunnelRadius + 200}" />
            <circle cx="960" cy="540" r="${(tunnelRadius + 400) % 800}" />
        </g>
        
        <text x="50" y="${(i * 20) % 1080}" fill="#00ff41" font-family="monospace" font-size="24" opacity="0.6">
            ACCESSING MAINFRAME... NODE_${frameNum}
        </text>
        <text x="1600" y="${1080 - ((i * 30) % 1080)}" fill="#00ff41" font-family="monospace" font-size="24" opacity="0.6">
            0x${(i * 1234).toString(16).toUpperCase()} NULL_PTR
        </text>
        
        <!-- Random noise points representing data -->
        ${Array.from({ length: 20 }).map((_, j) => {
        const x = (Math.sin(i + j) * 800 + 960).toFixed(0);
        const y = (Math.cos(i - j) * 400 + 540).toFixed(0);
        return `<circle cx="${x}" cy="${y}" r="3" fill="#00ff41" opacity="0.8" />`;
    }).join('')}
    </svg>`;

    fs.writeFileSync(path.join(sequenceDir, fileName), svg);
}

console.log("Successfully generated 60 SVG frames in public/sequence");
