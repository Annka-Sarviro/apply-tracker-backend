const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src/predictions/data');
const destDir = path.resolve('dist/predictions');

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(srcDir, destDir, { recursive: true });