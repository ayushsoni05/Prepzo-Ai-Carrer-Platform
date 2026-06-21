import { asyncHandler } from '../middleware/error.middleware.js';
import AdmZip from 'adm-zip';
import path from 'path';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Analyze uploaded git repository zip file
 * @route   POST /api/github/analyze
 * @access  Private
 */
export const analyzeRepositoryZip = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a valid .zip repository file.'
    });
  }

  const fileBuffer = req.file.buffer;
  let zip;
  try {
    zip = new AdmZip(fileBuffer);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Failed to read zip archive. Ensure it is a valid zip file.'
    });
  }

  const entries = zip.getEntries();
  
  let totalFiles = 0;
  let totalLines = 0;
  const languagesMap = {};
  const timelineMap = {};
  const securityRisks = [];
  let complexityDensity = 0;

  // Standard directories/files to ignore in static analysis
  const ignorePatterns = [
    'node_modules',
    'dist',
    'build',
    '.git',
    '.vscode',
    '.idea',
    '.next',
    '.nuxt',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'tmp',
    'uploads'
  ];

  entries.forEach((entry) => {
    // Skip directories
    if (entry.isDirectory) return;

    // Check if the path includes any ignored folders
    const isIgnored = ignorePatterns.some(pattern => 
      entry.entryName.split('/').includes(pattern) || 
      entry.entryName.split('\\').includes(pattern)
    );
    if (isIgnored) return;

    totalFiles += 1;

    // Language identification by extension
    const ext = path.extname(entry.entryName).toLowerCase();
    let lang = 'Other';
    if (['.js', '.jsx'].includes(ext)) lang = 'JavaScript';
    else if (['.ts', '.tsx'].includes(ext)) lang = 'TypeScript';
    else if (ext === '.py') lang = 'Python';
    else if (ext === '.java') lang = 'Java';
    else if (['.cpp', '.cc', '.c', '.h', '.hpp'].includes(ext)) lang = 'C/C++';
    else if (ext === '.html') lang = 'HTML';
    else if (ext === '.css') lang = 'CSS';
    else if (ext === '.json') lang = 'JSON';
    else if (ext === '.md') lang = 'Markdown';
    else if (ext === '.go') lang = 'Go';
    else if (ext === '.rs') lang = 'Rust';
    else if (ext === '.sh') lang = 'Bash';

    languagesMap[lang] = (languagesMap[lang] || 0) + 1;

    // Read file contents for lines & security analysis
    try {
      const content = entry.getData().toString('utf8');
      
      // Calculate lines of code
      const lines = content.split(/\r?\n/).length;
      totalLines += lines;

      // Scan for simple security alerts (hardcoded secrets, plain sql)
      if (content.includes('process.env') === false && 
          (content.includes('PASSWORD =') || content.includes('SECRET =') || content.includes('KEY =')) &&
          !entry.entryName.includes('.test.') && !entry.entryName.includes('config')) {
        securityRisks.push(`[MEDIUM RISK] Potential hardcoded credential in: ${path.basename(entry.entryName)}`);
      }

      if (content.includes('SELECT') && content.includes('WHERE') && 
          (content.includes('+\'') || content.includes('+"') || content.includes('$`'))) {
        securityRisks.push(`[HIGH RISK] SQL string concatenation found in: ${path.basename(entry.entryName)}. Switch to parameterized queries.`);
      }

      // Check imports/functions for complexity metrics
      const importMatches = content.match(/(import|require)\b/g);
      const funcMatches = content.match(/\b(function|class|def|=>)\b/g);
      if (importMatches) complexityDensity += importMatches.length;
      if (funcMatches) complexityDensity += funcMatches.length;

    } catch (e) {
      // Binary file or read error, ignore contents
    }

    // Capture modification time for timeline mapping
    try {
      const dateObj = new Date(entry.header.time);
      if (!isNaN(dateObj.getTime())) {
        const dateString = dateObj.toISOString().split('T')[0];
        timelineMap[dateString] = (timelineMap[dateString] || 0) + 1;
      }
    } catch (e) {
      // Date parse error
    }
  });

  // Check for configuration risks
  entries.forEach((entry) => {
    const filename = path.basename(entry.entryName);
    if (filename === '.env') {
      securityRisks.push(`[HIGH RISK] Found raw environment file: .env. Keep secrets out of version control.`);
    }
  });

  // Re-format languagesMap to Recharts pie structure
  const languagesData = Object.keys(languagesMap).map((key) => ({
    name: key,
    value: languagesMap[key]
  })).sort((a, b) => b.value - a.value);

  // Format timelineMap to react-activity-calendar format
  // [{ date: '2026-06-15', count: 4, level: 2 }]
  const timelineData = Object.keys(timelineMap).map((dateStr) => {
    const count = timelineMap[dateStr];
    // Map count to activity levels (0 to 4)
    let level = 1;
    if (count > 15) level = 4;
    else if (count > 8) level = 3;
    else if (count > 3) level = 2;
    return { date: dateStr, count, level };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // If timeline data is empty, seed a dummy point for visual clarity
  if (timelineData.length === 0) {
    const today = new Date().toISOString().split('T')[0];
    timelineData.push({ date: today, count: 1, level: 1 });
  }

  // Calculate Authorship Strength Score (0 to 100)
  const complexityRank = Math.min(40, Math.round(complexityDensity / 4));
  const linesRank = Math.min(40, Math.round(totalLines / 80));
  const fileRank = Math.min(20, totalFiles * 2);
  const authorshipStrength = Math.max(10, complexityRank + linesRank + fileRank);

  // Update Game Stats & XP
  const userId = req.user._id;
  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Base 60 XP for uploading + line count multiplier (max 140 XP bonus)
  const earnedXp = Math.min(140, Math.round(totalLines / 15)) + 60;
  stats.xp += earnedXp;

  stats.githubReconstructor.played += 1;
  stats.githubReconstructor.lineCountAnalyzed += totalLines;

  // Award Git Architect badge if code contains over 3000 lines
  if (stats.githubReconstructor.lineCountAnalyzed >= 3000 && !stats.badges.includes('Git Architect')) {
    stats.badges.push('Git Architect');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      totalFiles,
      totalLines,
      languages: languagesData,
      timeline: timelineData,
      securityRisks: securityRisks.slice(0, 5), // return max 5 risk items
      authorshipStrength,
      xpEarned: earnedXp,
      badges: stats.badges
    }
  });
});
