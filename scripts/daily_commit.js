import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current day in IST (UTC + 5:30)
const utcTime = new Date().getTime();
const istTime = new Date(utcTime + (5.5 * 60 * 60 * 1000));
const currentDay = istTime.getUTCDate();
const currentMonth = istTime.getUTCMonth() + 1; // 0-indexed

console.log(`Current automated date (IST): June ${currentDay}, 2026`);

if (currentMonth !== 6) {
  console.log('Automated commit schedule is only active for June 2026. Exiting.');
  process.exit(0);
}

const scheduledDir = path.join(__dirname, '..', 'scheduled_commits', `day_${currentDay}`);
const targetDir = path.join(__dirname, '..', 'frontend', 'src', 'pages');

if (!fs.existsSync(scheduledDir)) {
  console.error(`Error: Source directory ${scheduledDir} does not exist. No files to copy for today.`);
  process.exit(0);
}

// Copy all files from scheduledDir to targetDir
const files = fs.readdirSync(scheduledDir);
if (files.length === 0) {
  console.log(`No files scheduled for day ${currentDay}.`);
  process.exit(0);
}

files.forEach(file => {
  const srcPath = path.join(scheduledDir, file);
  const destPath = path.join(targetDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Successfully copied ${file} -> ${destPath}`);
});

console.log(`Automation task complete for day ${currentDay}!`);
