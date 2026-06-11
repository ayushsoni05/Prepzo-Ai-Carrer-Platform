const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function recordTour() {
  console.log('Starting automated tour recording...');
  console.log('Make sure your local server is running on http://localhost:5173');
  
  const browser = await chromium.launch({
    headless: false, // Running headful ensures all CSS/canvas animations render cleanly
    slowMo: 60       // Adds a human-like delay to typing and navigation
  });
  
  const videoDir = path.join(__dirname, '../public');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const context = await browser.newContext({
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    },
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();
  
  try {
    // 1. Visit Landing Page
    console.log('Step 1: Navigating to landing page...');
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(3500); 

    // Scroll down to Metrics section
    await page.evaluate(() => window.scrollBy({ top: 450, behavior: 'smooth' }));
    await page.waitForTimeout(2500);

    // Scroll down to Simulator deck
    await page.evaluate(() => window.scrollBy({ top: 550, behavior: 'smooth' }));
    await page.waitForTimeout(3500);

    // 2. Go to Login Page
    console.log('Step 2: Accessing login portal...');
    // Select login button or navigate directly
    const signInBtn = page.locator('button:has-text("Sign In"), a:has-text("Sign In"), a:has-text("Log In")').first();
    if (await signInBtn.isVisible()) {
      await signInBtn.click();
    } else {
      await page.goto('http://localhost:5173/login');
    }
    await page.waitForTimeout(2500);

    // Enter test student credentials
    console.log('Step 3: Authenticating test student...');
    await page.fill('input[type="email"], input[placeholder*="email"]', 'test.student@example.com');
    await page.waitForTimeout(500);
    await page.fill('input[type="password"], input[placeholder*="password"]', 'TestPassword123!');
    await page.waitForTimeout(500);
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await page.waitForTimeout(4500); // Wait for dashboard transition

    // 3. Explore Dashboard
    console.log('Step 4: Exploring Dashboard command deck...');
    await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'smooth' }));
    await page.waitForTimeout(3000);

    // 4. Explore Playground (Coding Lab)
    console.log('Step 5: Accessing Coding Playground...');
    await page.goto('http://localhost:5173/playground');
    await page.waitForTimeout(3500);

    // 5. Explore Assessment
    console.log('Step 6: Accessing Skill Assessments...');
    await page.goto('http://localhost:5173/assessment');
    await page.waitForTimeout(3500);

    // 6. Explore Network page
    console.log('Step 7: Scrolling Social Neural Network...');
    await page.goto('http://localhost:5173/network');
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(3000);

    console.log('Walkthrough completed successfully. Shutting down...');
  } catch (error) {
    console.error('An error occurred during recording:', error);
  } finally {
    await context.close();
    await browser.close();

    // Search public folder for the newly recorded playwright video
    setTimeout(() => {
      const files = fs.readdirSync(videoDir);
      // Playwright recordings are usually named with a GUID string.
      // We look for files that do not equal our target 'prepzo-tour.mp4' or 'prepzo-tour.webm'
      const recordedFile = files.find(f => 
        (f.endsWith('.webm') || f.endsWith('.mp4')) && 
        f !== 'prepzo-tour.mp4' && 
        f !== 'prepzo-tour.webm'
      );

      if (recordedFile) {
        const oldPath = path.join(videoDir, recordedFile);
        const fileExt = path.extname(recordedFile);
        
        // We save it both as prepzo-tour.mp4 and prepzo-tour.webm to ensure cross-browser HTML5 video compatibility
        const newMp4Path = path.join(videoDir, 'prepzo-tour.mp4');
        const newWebmPath = path.join(videoDir, 'prepzo-tour.webm');

        try {
          if (fs.existsSync(newMp4Path)) fs.unlinkSync(newMp4Path);
          if (fs.existsSync(newWebmPath)) fs.unlinkSync(newWebmPath);
        } catch (e) {}

        fs.renameSync(oldPath, newMp4Path);
        // Create a symlink or secondary copy for webm fallback support
        try {
          fs.copyFileSync(newMp4Path, newWebmPath);
        } catch (e) {}

        console.log('\n==================================================');
        console.log(`WALKTHROUGH RECORDED SUCCESSFULLY!`);
        console.log(`Video saved to public assets: /prepzo-tour.mp4`);
        console.log('==================================================\n');
      } else {
        console.warn('Could not find any recorded browser session files in the public directory.');
      }
    }, 1500);
  }
}

recordTour();
