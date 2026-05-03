# Comprehensive QA Audit Report: Sheetal.net

**Date of Audit:** April 29, 2026  
**Auditor:** QA Engineering Team  
**Target:** https://sheetal.net/  

---

## 📌 Executive Summary
We have conducted a thorough, end-to-end QA audit of **Sheetal.net**. While the platform successfully provides basic information about packers and movers, it is currently suffering from significant usability, design, and functional issues. 

The most pressing concern is the mobile experience, where sticky elements overlap critical form fields, completely blocking users from reading or interacting with the page. Additionally, the post-submission form flow is broken, taking users to an unstyled, raw script page instead of a branded "Thank You" screen.

Below is a detailed breakdown of all identified bugs, UI/UX shortcomings, and performance bottlenecks, categorized by severity.

---

## 🔴 Critical Issues

### 1. Mobile "Get Free Quote" Button Overlaps Main Content
*   **Category:** UI/UX & Responsiveness
*   **Description:** On mobile devices (viewports under 768px), there is a sticky "GET FREE QUOTE" button pinned to the right edge of the screen and rotated 90 degrees. This button completely covers up form fields (specifically the email and phone number inputs) and paragraph text, making it extremely frustrating for a user to type out their details.
*   **Steps to Reproduce:**
    1. Open the website on a mobile device or shrink your desktop browser to mobile width.
    2. Scroll down to the "Want To Shift House / Office?" form.
    3. Observe the right side of the screen where the pink/purple button blocks the inputs.
*   **Expected Behavior:** Interactive floating elements should never obstruct the core content or input fields.
*   **Actual Behavior:** The button overlays the form, creating a massive conversion blocker.
*   **Suggested Fix:** Remove the rotated side-button on mobile devices. Instead, use a bottom-fixed "Floating Action Button (FAB)" or pin a standard horizontal button to the bottom of the screen.

---

## 🟠 High Priority Issues

### 2. Broken Post-Submission Redirection (mailtest.php)
*   **Category:** Functional Testing / User Flow
*   **Description:** After a user fills out the main shifting quote form and clicks "Submit", the site processes the request and abruptly redirects the user to a raw file named `mailtest.php`. This page has a stark white background and zero branding, completely breaking the user out of the site's ecosystem.
*   **Steps to Reproduce:**
    1. Navigate to the homepage form.
    2. Enter dummy data (Name, Phone, Email).
    3. Click the yellow "Submit" button.
*   **Expected Behavior:** The user should be smoothly transitioned to a beautifully designed "Thank You" page or shown a success pop-up (modal) that confirms their request while keeping them on the website.
*   **Actual Behavior:** The user is dumped onto a raw PHP script output page.
*   **Suggested Fix:** Update the form action handler to redirect to a proper `thank-you.html` page that includes the site's header, footer, and navigation.

### 3. Keyword-Stuffed Meta Titles (SEO Penalization Risk)
*   **Category:** SEO & Discoverability
*   **Description:** The page `<title>` tag is heavily spammed with keywords (e.g., `Surprising!!! Cost Get Quote 1 Min Packers Movers Bangalore FatShe™ Top5`). Search engines like Google actively penalize sites that use keyword stuffing instead of natural, descriptive titles. 
*   **Expected Behavior:** A professional, descriptive title like "Sheetal Packers and Movers | Reliable Relocation Services in Bangalore".
*   **Actual Behavior:** The title reads like spam, which reduces user trust before they even click the link on Google.
*   **Suggested Fix:** Rewrite the meta titles across all pages to focus on readability, brand name, and core service without stuffing keywords.

---

## 🟡 Medium Priority Issues

### 4. "Date of Shifting" Field is a Plain Text Input
*   **Category:** Functional / UX
*   **Description:** When a user tries to enter their shifting date in the quote form, the field behaves like a normal text box. It does not open a calendar view. This forces users to guess the required date format (e.g., DD/MM/YYYY vs MM/DD/YYYY) and increases the chance of data entry errors.
*   **Steps to Reproduce:** Click on the "Date of Shifting" field inside the main form.
*   **Expected Behavior:** A native calendar widget should pop up, allowing the user to tap on a specific date easily.
*   **Actual Behavior:** The user has to manually type the date out.
*   **Suggested Fix:** Simply change the HTML input type from `<input type="text">` to `<input type="date">`. 

### 5. Harsh, High-Contrast Color Palette
*   **Category:** UI/UX & Design
*   **Description:** The website utilizes extremely bright, neon colors—specifically a stark blue background, neon green headers, and bright yellow buttons. This combination causes visual fatigue, reduces readability, and gives the website a slightly unprofessional, "spammy" aesthetic.
*   **Expected Behavior:** A corporate service website should evoke trust through clean, modern, and soothing color palettes.
*   **Actual Behavior:** The colors are aggressive and clash with one another.
*   **Suggested Fix:** Implement a modern UI refresh. Switch to a white or light-grey background for main content areas, use a single primary brand color (like a softer blue) for accents, and ensure high contrast for text.

### 6. Missing Accessibility Attributes (Alt Tags)
*   **Category:** Accessibility (a11y) & SEO
*   **Description:** Important navigational icons, such as the WhatsApp logo and the phone icons in the top right header, are missing descriptive `alt` tags. Visually impaired users relying on screen readers will not know what these icons do.
*   **Suggested Fix:** Add `alt="WhatsApp Contact"` and `alt="Phone Contact"` to the respective image tags.

---

## 🟢 Low Priority Issues

### 7. Confusing "Advertise Here" Microcopy
*   **Category:** UX / Copywriting
*   **Description:** Right under the "Whatsapp Me" section at the top left of the site, there is tiny text that says "Advertise Here". This is confusing contextually. Are you asking moving companies to advertise on your site? Or is it leftover placeholder text from a template?
*   **Suggested Fix:** Remove the "Advertise Here" text if it serves no functional business purpose. It distracts from the primary goal of getting the user to request a quote.

### 8. Unoptimized Background Imagery
*   **Category:** Performance
*   **Description:** The background images used across the site appear slightly blurry and pixelated on high-resolution (Retina) displays, indicating they are either stretched or saved in a low-quality format.
*   **Suggested Fix:** Compress the images using modern formats like WebP to maintain crispness without slowing down the page load time. 

---

## 🏁 Summary of Recommendations for the Dev Team

To bring Sheetal.net up to modern web standards, the development team should tackle this in phases:
1. **Phase 1 (Immediate):** Fix the mobile overlapping button. It is actively preventing users from filling out the form on their phones.
2. **Phase 2 (Functional):** Fix the `mailtest.php` redirect to ensure users have a smooth, branded experience after requesting a quote. Change the date field to `type="date"`.
3. **Phase 3 (Design & SEO):** Clean up the keyword-stuffed SEO titles and plan a lightweight CSS overhaul to mute the harsh background colors.
