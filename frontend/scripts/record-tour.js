import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for smooth scrolling down
async function smoothScroll(page, distance, duration = 2000) {
  await page.evaluate(async ({ dist, dur }) => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distancePerStep = 20;
      const stepTime = (dur / (dist / distancePerStep));
      const timer = setInterval(() => {
        window.scrollBy(0, distancePerStep);
        totalHeight += distancePerStep;
        if (totalHeight >= dist) {
          clearInterval(timer);
          resolve();
        }
      }, stepTime);
    });
  }, { dist: distance, dur: duration });
  await page.waitForTimeout(500);
}

// Helper for smooth scrolling up
async function smoothScrollUp(page, distance, duration = 1500) {
  await page.evaluate(async ({ dist, dur }) => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distancePerStep = -20;
      const stepTime = (dur / (dist / Math.abs(distancePerStep)));
      const timer = setInterval(() => {
        window.scrollBy(0, distancePerStep);
        totalHeight += Math.abs(distancePerStep);
        if (totalHeight >= dist) {
          clearInterval(timer);
          resolve();
        }
      }, stepTime);
    });
  }, { dist: distance, dur: duration });
  await page.waitForTimeout(500);
}

// Helper to move mouse smoothly to an element and click it
async function smoothMoveAndClick(page, locatorOrSelector) {
  const element = typeof locatorOrSelector === 'string' ? page.locator(locatorOrSelector).first() : locatorOrSelector;
  await element.waitFor({ state: 'visible', timeout: 15000 });
  const box = await element.boundingBox();
  if (box) {
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    // Glide mouse smoothly
    await page.mouse.move(x, y, { steps: 25 });
    await page.waitForTimeout(400); // Hover beat
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.up();
    await page.waitForTimeout(500);
  } else {
    await element.hover();
    await page.waitForTimeout(200);
    await element.click();
  }
}

// Helper to wait for global loading indicator to disappear completely
async function waitForLoaderToDisappear(page) {
  console.log('Waiting for global loading overlay to disappear...');
  // Give React click handler time to run and mount the loader
  await page.waitForTimeout(800);
  try {
    // Wait for the loader image to be hidden or unmounted
    await page.waitForSelector('img[alt="AI Thinking"]', { state: 'hidden', timeout: 15000 });
  } catch (e) {
    console.log('Loader was already hidden or timed out.');
  }
  // Wait for entrance animations to finish rendering
  await page.waitForTimeout(1500);
}

async function recordTour() {
  console.log('Starting automated HD tour recording (1920x1080)...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'] // Run in maximized window
  });
  
  const videoDir = path.join(__dirname, '../public');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  // Setup full HD viewport and recording dimensions
  const context = await browser.newContext({
    recordVideo: {
      dir: videoDir,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Print browser console logs and errors to terminal for debugging
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error' || text.toLowerCase().includes('error') || text.toLowerCase().includes('fail')) {
      console.log('BROWSER LOG (ERROR):', text);
    } else {
      console.log('BROWSER LOG:', text);
    }
  });
  page.on('pageerror', err => {
    console.error('BROWSER RUNTIME ERROR:', err.message);
  });

  // Inject a custom visual neon pointer so the viewer can see the mouse cursor
  await page.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const box = document.createElement('div');
      box.id = 'playwright-cursor';
      box.style.position = 'fixed';
      box.style.width = '14px';
      box.style.height = '14px';
      box.style.borderRadius = '50%';
      box.style.backgroundColor = 'rgba(94, 210, 156, 0.6)';
      box.style.border = '2px solid rgba(255, 255, 255, 0.9)';
      box.style.boxShadow = '0 0 12px rgba(94, 210, 156, 0.9), 0 0 20px rgba(94, 210, 156, 0.5)';
      box.style.pointerEvents = 'none';
      box.style.zIndex = '999999';
      box.style.transition = 'transform 0.1s ease, background-color 0.15s ease, box-shadow 0.15s ease';
      box.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(box);
      
      document.addEventListener('mousemove', (e) => {
        box.style.left = e.clientX + 'px';
        box.style.top = e.clientY + 'px';
      });
      
      document.addEventListener('mousedown', () => {
        box.style.transform = 'translate(-50%, -50%) scale(0.75)';
        box.style.backgroundColor = 'rgba(168, 85, 247, 0.8)';
        box.style.borderColor = 'rgba(255, 255, 255, 1)';
        box.style.boxShadow = '0 0 12px rgba(168, 85, 247, 0.9), 0 0 20px rgba(168, 85, 247, 0.5)';
      });
      
      document.addEventListener('mouseup', () => {
        box.style.transform = 'translate(-50%, -50%) scale(1)';
        box.style.backgroundColor = 'rgba(94, 210, 156, 0.6)';
        box.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        box.style.boxShadow = '0 0 12px rgba(94, 210, 156, 0.9), 0 0 20px rgba(94, 210, 156, 0.5)';
      });
    });
  });

  try {
    // 1. Visit Landing Page
    console.log('Navigating to landing page...');
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000); // Allow entrance animations to render

    // Smooth scroll down the landing page
    console.log('Scrolling landing page...');
    await smoothScroll(page, 700, 2500);
    await page.waitForTimeout(1500);
    await smoothScroll(page, 800, 2500);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 1500, 2000);
    await page.waitForTimeout(1000);

    // 2. Click Sign In
    console.log('Clicking Sign In button...');
    const signInBtnSelector = 'header button:has-text("LOG IN"), button:has-text("LOG IN"), button:has-text("Sign In"), a:has-text("Log In")';
    const signInBtn = page.locator(signInBtnSelector).first();
    await signInBtn.waitFor({ state: 'visible', timeout: 5000 });
    const btnText = await signInBtn.innerText();
    console.log(`Matched button text: "${btnText.trim()}"`);
    await smoothMoveAndClick(page, signInBtn);
    await waitForLoaderToDisappear(page);

    // 3. Fill in Login Credentials
    console.log('Typing credentials...');
    const emailField = page.locator('input[type="email"], input[placeholder="EMAIL ADDRESS"]').first();
    await emailField.waitFor({ state: 'visible', timeout: 5000 });
    await emailField.fill('test.student@example.com');
    await page.waitForTimeout(600);
    const passwordField = page.locator('input[type="password"], input[placeholder="PASSWORD"]').first();
    await passwordField.fill('TestPassword123!');
    await page.waitForTimeout(600);
    
    // Click Log In
    console.log('Submitting login...');
    const submitBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("LOG IN")').first();
    await smoothMoveAndClick(page, submitBtn);
    
    // Crucial: wait for loading overlay to disappear
    await waitForLoaderToDisappear(page);

    // 4. Explore Dashboard (Home)
    console.log('Viewing Dashboard...');
    await page.waitForTimeout(4000); // Enjoy the cockpit sweep laser scan and clocks
    await smoothScroll(page, 450, 2000);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 450, 1500);
    await page.waitForTimeout(1000);

    // 5. Navigate to Community (Network) client-side
    console.log('Navigating to Community...');
    const sidebar = page.locator('.sidebar-floating-container');
    const communityTab = sidebar.locator('div').filter({ hasText: 'Community' }).first();
    await smoothMoveAndClick(page, communityTab);
    await waitForLoaderToDisappear(page);
    
    // Scroll and explore community
    await smoothScroll(page, 500, 2200);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 500, 1800);
    await page.waitForTimeout(1000);

    // 6. Navigate to Resume
    console.log('Navigating to Resume...');
    const resumeTab = sidebar.locator('div').filter({ hasText: 'Resume' }).first();
    await smoothMoveAndClick(page, resumeTab);
    await waitForLoaderToDisappear(page);
    await smoothScroll(page, 300, 1500);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 300, 1200);
    await page.waitForTimeout(1000);

    // 7. Navigate to Skill (Assessments)
    console.log('Navigating to Skill Assessments...');
    const skillTab = sidebar.locator('div').filter({ hasText: 'Skill' }).first();
    await smoothMoveAndClick(page, skillTab);
    await waitForLoaderToDisappear(page);
    await smoothScroll(page, 350, 1800);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 350, 1500);
    await page.waitForTimeout(1000);

    // 8. Navigate to Jobs
    console.log('Navigating to Jobs...');
    const jobsTab = sidebar.locator('div').filter({ hasText: 'Jobs' }).first();
    await smoothMoveAndClick(page, jobsTab);
    await waitForLoaderToDisappear(page);
    await smoothScroll(page, 450, 2000);
    await page.waitForTimeout(2000);
    await smoothScrollUp(page, 450, 1500);
    await page.waitForTimeout(1000);

    // 9. Navigate to Code (Coding Lab)
    console.log('Navigating to Coding Lab...');
    const codeTab = sidebar.locator('div').filter({ hasText: 'Code' }).first();
    await smoothMoveAndClick(page, codeTab);
    await waitForLoaderToDisappear(page);
    await smoothScroll(page, 400, 1800);
    await page.waitForTimeout(1500);
    
    // Select Two Sum
    console.log('Opening Two Sum challenge...');
    const solveBtn = page.locator('button:has-text("Solve")').first();
    await smoothMoveAndClick(page, solveBtn);
    await waitForLoaderToDisappear(page);

    // 10. Code Playground (IDE)
    console.log('Inside IDE playground...');
    await page.waitForTimeout(2500); // Allow editor to settle
    
    // Click editor
    await page.click('.cm-content');
    await page.waitForTimeout(1000);
    
    // Select all and clear starter code
    console.log('Replacing starter code...');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(800);

    // Type JavaScript solution for Two Sum
    const jsSolution = `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
};`;

    await page.keyboard.type(jsSolution, { delay: 25 });
    await page.waitForTimeout(2000);

    // Click Submit
    console.log('Submitting code solution...');
    await smoothMoveAndClick(page, 'button:has-text("Submit")');

    // Wait for the submission status "Accepted"
    console.log('Waiting for Accepted test result...');
    await page.waitForSelector('span:has-text("Accepted"), div:has-text("Accepted")', { timeout: 15000 });
    
    // Wait for the confetti animation to complete and be captured
    console.log('Confetti triggered! Capturing cinematic celebration...');
    await page.waitForTimeout(6000);

    console.log('Automated walkthrough recording complete.');
  } catch (error) {
    console.error('Error during automated recording:', error);
    try {
      console.log('Capturing debug screenshot...');
      const screenshotPath = path.join(videoDir, 'error-screenshot.png');
      await page.screenshot({ path: screenshotPath });
      console.log('Screenshot saved to:', screenshotPath);
      console.log('Current page URL:', page.url());
      const html = await page.content();
      console.log('HTML content preview (first 1000 chars):', html.slice(0, 1000));
    } catch (screenerr) {
      console.error('Failed to capture screenshot:', screenerr);
    }
  } finally {
    await context.close();
    await browser.close();

    // Look for the newly generated webm/mp4 file and rename to prepzo-tour.mp4 & prepzo-tour.webm
    setTimeout(() => {
      try {
        const files = fs.readdirSync(videoDir);
        const recordedFile = files.find(f => 
          (f.endsWith('.webm') || f.endsWith('.mp4')) && 
          f !== 'prepzo-tour.mp4' && 
          f !== 'prepzo-tour.webm'
        );

        if (recordedFile) {
          const oldPath = path.join(videoDir, recordedFile);
          const newMp4Path = path.join(videoDir, 'prepzo-tour.mp4');
          const newWebmPath = path.join(videoDir, 'prepzo-tour.webm');

          if (fs.existsSync(newMp4Path)) fs.unlinkSync(newMp4Path);
          if (fs.existsSync(newWebmPath)) fs.unlinkSync(newWebmPath);

          fs.renameSync(oldPath, newMp4Path);
          fs.copyFileSync(newMp4Path, newWebmPath);

          console.log('\n==================================================');
          console.log(`WALKTHROUGH RECORDED SUCCESSFULLY IN HD (1920x1080)!`);
          console.log(`Video saved to public assets: /prepzo-tour.mp4`);
          console.log('==================================================\n');
        } else {
          console.warn('Could not find any recorded browser session files.');
        }
      } catch (err) {
        console.error('Failed to rename video files:', err);
      }
    }, 2000);
  }
}

recordTour();
