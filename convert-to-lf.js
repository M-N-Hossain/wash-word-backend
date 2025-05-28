const fs = require('fs');
const path = require('path');

// Define text file extensions to process
const textExtensions = [
  '.ts',
  '.js',
  '.json',
  '.html',
  '.css',
  '.scss',
  '.txt',
  '.md',
  '.gitignore',
  '.env',
  '.yml',
  '.yaml',
  '.xml',
  '.svg',
  '.eslintrc',
  '.prettierrc',
  '.editorconfig',
];

// Files to include regardless of extension
const includeFiles = ['.gitignore', '.prettierrc', '.eslintrc.js', '.env'];

// Directories to ignore
const ignoreDirs = ['node_modules', 'dist', '.git'];

let convertedCount = 0;
let checkedCount = 0;
let processedDirs = new Set();
let processedFiles = [];
let sampleFiles = [];

function isTextFile(file) {
  const fileName = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  return (
    textExtensions.includes(ext) ||
    includeFiles.includes(fileName) ||
    (fileName.startsWith('.') && !fileName.includes('.'))
  );
}

function processFile(filePath) {
  try {
    checkedCount++;
    const content = fs.readFileSync(filePath, 'utf8');
    processedFiles.push(filePath);

    // Take sample files for display
    if (sampleFiles.length < 5) {
      sampleFiles.push(filePath);
    }

    // Replace CRLF with LF
    if (content.includes('\r\n')) {
      const newContent = content.replace(/\r\n/g, '\n');
      fs.writeFileSync(filePath, newContent, 'utf8');
      convertedCount++;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  try {
    // Avoid processing the same directory twice
    if (processedDirs.has(dir)) {
      return;
    }
    processedDirs.add(dir);

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);

      try {
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          if (!ignoreDirs.includes(item)) {
            processDirectory(itemPath);
          }
        } else if (stats.isFile() && isTextFile(itemPath)) {
          processFile(itemPath);
        }
      } catch (err) {
        console.error(`Error accessing ${itemPath}:`, err.message);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
}

// Start processing from the current directory
console.log('Converting files from CRLF to LF...');
processDirectory('.');
console.log(
  `Conversion complete! Checked ${checkedCount} files, converted ${convertedCount}.`,
);
console.log(`Directories processed: ${processedDirs.size}`);
console.log(`Sample files checked (showing 5/${processedFiles.length}):`);
sampleFiles.forEach((file) => console.log(` - ${file}`));

// Search src directory more thoroughly to ensure all files are processed
console.log('\nDouble-checking src directory...');
let srcFiles = [];
function findAllFiles(dir) {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      try {
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          if (!ignoreDirs.includes(item)) {
            findAllFiles(itemPath);
          }
        } else if (stats.isFile()) {
          srcFiles.push(itemPath);
        }
      } catch (err) {
        // Ignore errors
      }
    }
  } catch (error) {
    // Ignore errors
  }
}

findAllFiles('src');
console.log(`Found ${srcFiles.length} files in src directory.`);
console.log('Sample src files:');
srcFiles.slice(0, 5).forEach((file) => console.log(` - ${file}`));
