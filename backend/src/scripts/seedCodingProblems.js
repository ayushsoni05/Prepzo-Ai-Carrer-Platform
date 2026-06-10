import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import CodingProblem from '../models/CodingProblem.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const COMPANIES = [
  'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Netflix', 
  'Uber', 'Airbnb', 'Twitter', 'Adobe', 'Oracle', 'Salesforce'
];

// Helper to select random items
const getRandomCompanies = () => {
  const count = Math.floor(Math.random() * 2) + 1; // 1 to 2 companies
  const shuffled = [...COMPANIES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper to generate random array
const generateRandomArray = (length, min = 1, max = 100) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Helper to generate random string
const generateRandomString = (length, chars = 'abcdefghijklmnopqrstuvwxyz') => {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

function generateSVG(categoryIdx, variation) {
  const primaryColor = '#10B981'; // Emerald green
  const secondaryColor = '#3B82F6'; // Blue
  const accentColor = '#F59E0B'; // Orange
  const textColor = '#FFFFFF';
  const bgColor = '#1E293B'; // Slate 800
  const neutralColor = '#475569'; // Slate 600

  let svgContent = '';
  switch (categoryIdx) {
    case 1: {
      const k = variation + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Sum elements divisible by ${k}</text>
        <g transform="translate(40, 50)">
          ${[k, k*2, 1, k*3, 2].map((val, idx) => {
            const isDiv = val % k === 0;
            const border = isDiv ? primaryColor : neutralColor;
            const fill = isDiv ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 60}, 0)">
                <rect width="45" height="40" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="22.5" y="25" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold">${val}</text>
                ${isDiv ? `<path d="M 22.5 -15 L 22.5 -5 M 17.5 -8 L 22.5 -3 L 27.5 -8" stroke="${primaryColor}" stroke-width="2" fill="none"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 2: {
      const occurrence = (variation % 4) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Find occurrence index: ${occurrence}</text>
        <g transform="translate(40, 50)">
          ${[7, 3, 7, 9, 7].map((val, idx) => {
            const isTarget = val === 7;
            const border = isTarget ? primaryColor : neutralColor;
            const fill = isTarget ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 60}, 0)">
                <rect width="45" height="40" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="22.5" y="25" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold">${val}</text>
                <text x="22.5" y="52" text-anchor="middle" fill="${isTarget ? primaryColor : 'rgba(255,255,255,0.4)'}" font-family="sans-serif" font-size="10">idx ${idx}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 3: {
      const char = String.fromCharCode(97 + (variation % 26));
      const parity = (variation % 2 === 0 ? 'even' : 'odd');
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Count '${char}' at ${parity.toUpperCase()} indices</text>
        <g transform="translate(40, 45)">
          ${[char, char, 'b', char, 'c'].map((c, idx) => {
            const isMatch = c === char;
            const isParity = (parity === 'even' && idx % 2 === 0) || (parity === 'odd' && idx % 2 !== 0);
            const fill = isMatch && isParity ? accentColor : neutralColor;
            return `
              <g transform="translate(${idx * 60}, 0)">
                <circle cx="22.5" cy="22.5" r="20" fill="${isMatch && isParity ? 'rgba(245,158,11,0.2)' : 'transparent'}" stroke="${fill}" stroke-width="2"/>
                <text x="22.5" y="28" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="16" font-weight="bold">${c}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 4: {
      const k = (variation % 5) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="35" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Find ${k}-th Largest Element</text>
        <g transform="translate(60, 100)">
          ${[20, 40, 75, 50, 30].map((val, idx) => {
            // sorted: 75, 50, 40, 30, 20. k-th largest is highlighted.
            const ranks = [5, 3, 1, 2, 4];
            const isKth = ranks[idx] === k;
            const fill = isKth ? primaryColor : secondaryColor;
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect x="0" y="-${val * 0.7}" width="25" height="${val * 0.7}" rx="3" fill="${fill}" opacity="${isKth ? '1' : '0.6'}"/>
                <text x="12.5" y="-${val * 0.7 + 5}" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="10">${val}</text>
                ${isKth ? `<text x="12.5" y="15" text-anchor="middle" fill="${primaryColor}" font-family="sans-serif" font-size="8" font-weight="bold">Rank ${k}</text>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 5: {
      const rep = (variation % 5) + 1;
      const transform = (variation % 2 === 0 ? 'reverse' : 'uppercase');
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${transform.toUpperCase()} and Repeat ${rep}x</text>
        <g transform="translate(10, 45)" font-family="sans-serif" font-size="11">
          <rect x="10" y="10" width="60" height="30" rx="6" fill="transparent" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="40" y="28" text-anchor="middle" fill="${textColor}">"abc"</text>
          <path d="M 70 25 L 105 25" stroke="${textColor}" stroke-width="2" fill="none"/>
          <polygon points="105,21 113,25 105,29" fill="${textColor}"/>
          <rect x="115" y="10" width="90" height="30" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
          <text x="160" y="28" text-anchor="middle" fill="${textColor}">${transform === 'reverse' ? 'Reverse: "cba"' : 'Upper: "ABC"'}</text>
          <path d="M 205 25 L 230 25" stroke="${textColor}" stroke-width="2" fill="none"/>
          <polygon points="230,21 238,25 230,29" fill="${textColor}"/>
          <rect x="240" y="10" width="130" height="30" rx="6" fill="transparent" stroke="${accentColor}" stroke-width="2"/>
          <text x="305" y="28" text-anchor="middle" fill="${textColor}">"${transform === 'reverse' ? 'cba'.repeat(rep).substring(0,10) : 'ABC'.repeat(rep).substring(0,10)}..."</text>
        </g>
      `;
      break;
    }
    case 6: {
      const k = (variation % 5) + 2;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Common Divisible by ${k}</text>
        <g transform="translate(80, 20)">
          <circle cx="70" cy="50" r="40" fill="rgba(59,130,246,0.3)" stroke="${secondaryColor}" stroke-width="2"/>
          <circle cx="130" cy="50" r="40" fill="rgba(16,185,129,0.3)" stroke="${primaryColor}" stroke-width="2"/>
          <text x="45" y="55" fill="${textColor}" font-family="sans-serif" font-size="12">Set A</text>
          <text x="155" y="55" fill="${textColor}" font-family="sans-serif" font-size="12">Set B</text>
          <text x="100" y="55" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">A ∩ B (% ${k}==0)</text>
        </g>
      `;
      break;
    }
    case 7: {
      const modulo = (variation % 50) + 10;
      const isTrib = (variation % 2 !== 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${isTrib ? 'Tribonacci' : 'Fibonacci'} Modulo ${modulo}</text>
        <g transform="translate(50, 45)">
          ${[0, 1, 1, isTrib?2:2, isTrib?4:3, isTrib?7:5].map((val, idx) => {
            const w = 30 + idx * 5;
            return `
              <g transform="translate(${idx * 48}, 0)">
                <rect width="${w}" height="40" fill="rgba(99,102,241,0.2)" stroke="${secondaryColor}" stroke-width="1.5" rx="4"/>
                <text x="${w/2}" y="25" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">${isTrib?'T':'F'}(${idx})</text>
                <text x="${w/2}" y="52" text-anchor="middle" fill="${primaryColor}" font-family="sans-serif" font-size="10" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 8: {
      const k = (variation % 4) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">k-Anagram Checker (Diff limit k = ${k})</text>
        <g transform="translate(50, 35)">
          <g transform="translate(0, 0)">
            ${['l', 'i', 's', 't', 'e', 'n'].map((c, idx) => `
              <rect x="${idx * 40}" y="0" width="30" height="25" rx="4" fill="rgba(255,255,255,0.05)" stroke="${neutralColor}" stroke-width="1.5"/>
              <text x="${idx * 40 + 15}" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${c}</text>
            `).join('')}
          </g>
          <g transform="translate(0, 45)">
            ${['s', 'i', 'l', 'e', 'n', 't'].map((c, idx) => `
              <rect x="${idx * 40}" y="0" width="30" height="25" rx="4" fill="rgba(16,185,129,0.1)" stroke="${primaryColor}" stroke-width="1.5"/>
              <text x="${idx * 40 + 15}" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${c}</text>
            `).join('')}
          </g>
        </g>
      `;
      break;
    }
    case 9: {
      const modulo = (variation % 100) + 100;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Power Modulo: base^exp % ${modulo}</text>
        <g transform="translate(80, 50)" font-family="sans-serif" font-size="11" fill="${textColor}">
          <rect x="0" y="0" width="70" height="30" rx="6" fill="transparent" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="35" y="18" text-anchor="middle">Base ^ Exp</text>
          <path d="M 70 15 L 110 15" stroke="${textColor}" stroke-width="2"/>
          <polygon points="110,11 118,15 110,19" fill="${textColor}"/>
          <rect x="120" y="0" width="120" height="30" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
          <text x="180" y="18" text-anchor="middle">(Result) % ${modulo}</text>
        </g>
      `;
      break;
    }
    case 10: {
      const d = [1, 3, 7, 9][variation % 4];
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Primes ending in ${d}</text>
        <g transform="translate(60, 45)">
          ${[2, 3, 11, 13, 17, 19, 23, 29].map((val, idx) => {
            const match = val % 10 === d;
            const fill = match ? primaryColor : neutralColor;
            return `
              <g transform="translate(${idx * 35}, 0)">
                <rect width="28" height="28" rx="6" fill="${match ? 'rgba(16,185,129,0.2)' : 'transparent'}" stroke="${fill}" stroke-width="2"/>
                <text x="14" y="18" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 11: {
      const tempIdx = variation % 10;
      let textLabel = "Palindrome Checker";
      let displayString = "RACECAR";
      if (tempIdx === 0) {
        textLabel = `Palindrome with Delete Limit ${(Math.floor(variation / 10) % 3) + 1}`;
      } else if (tempIdx === 1) {
        const char = ['*', '?', '#', '@'][variation % 4];
        textLabel = `Wildcard Palindrome with '${char}'`;
        displayString = `R${char}CE${char}R`;
      } else if (tempIdx === 2) {
        const type = (variation % 2 === 0 ? "DNA" : "RNA");
        textLabel = `${type} Complementary Palindrome`;
        displayString = type === "DNA" ? "ATCGAT" : "AUCGAU";
      } else if (tempIdx === 3) {
        textLabel = "Atbash Mirror Palindrome";
        displayString = "I Z S E N G";
      } else if (tempIdx === 4) {
        textLabel = `Index-Skipping (Step ${(variation % 3) + 2})`;
      } else if (tempIdx === 5) {
        const filterType = ["vowels", "consonants", "digits"][variation % 3];
        textLabel = `Filter Palindrome (${filterType})`;
      } else if (tempIdx === 6) {
        textLabel = "Longest Palindromic Prefix";
      } else if (tempIdx === 7) {
        textLabel = `Permutation Palindrome (${variation % 3} deletes)`;
      } else if (tempIdx === 8) {
        textLabel = "Bracket Palindrome Match";
        displayString = "([  ])";
      } else if (tempIdx === 9) {
        textLabel = `Odd Shift Palindrome (+ ${(variation % 5) + 1})`;
      }

      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${textLabel}</text>
        <g transform="translate(100, 50)" font-family="sans-serif" font-size="14" font-weight="bold">
          <rect x="0" y="0" width="200" height="35" rx="6" fill="rgba(255,255,255,0.05)" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="100" y="22" text-anchor="middle" fill="${textColor}" letter-spacing="10">${displayString}</text>
        </g>
      `;
      break;
    }
    case 12: {
      const mode = variation % 3;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Non-Divisible Sum Filter Mode ${mode}</text>
        <g transform="translate(60, 45)">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map((val, idx) => {
            return `
              <g transform="translate(${idx * 35}, 0)">
                <rect width="28" height="28" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke="${primaryColor}" stroke-width="2"/>
                <text x="14" y="18" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 13: {
      const k = (variation % 5) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Distance Range: |val - target| &lt;= ${k}</text>
        <g transform="translate(50, 45)">
          ${[5, 2, 8, 9, 4, 12].map((val, idx) => {
            const isMatch = Math.abs(val - 5) <= k;
            const border = isMatch ? primaryColor : neutralColor;
            const fill = isMatch ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 14: {
      const isSum = (variation % 2 === 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Pair ${isSum ? 'Sum' : 'Difference'} Checker</text>
        <g transform="translate(50, 45)">
          ${[3, 8, 7, 2, 9].map((val, idx) => {
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="transparent" stroke="${neutralColor}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 15: {
      const nextConsonant = (variation % 2 === 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Vowels followed by ${nextConsonant ? 'Consonants' : 'Vowels'}</text>
        <g transform="translate(60, 50)" font-family="sans-serif" font-size="16" font-weight="bold">
          ${['H', 'e', 'l', 'l', 'o'].map((c, idx) => {
            return `
              <g transform="translate(${idx * 24}, 0)">
                <text x="12" y="20" text-anchor="middle" fill="${textColor}">${c}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 16: {
      const isSum = (variation % 2 === 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Two ${isSum ? 'Sum' : 'Product'} Indices</text>
        <g transform="translate(50, 45)">
          ${[2, 7, 11, 15].map((val, idx) => {
            return `
              <g transform="translate(${idx * 60}, 0)">
                <rect width="45" height="35" rx="6" fill="transparent" stroke="${neutralColor}" stroke-width="2"/>
                <text x="22.5" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                <text x="22.5" y="48" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="sans-serif" font-size="10">idx ${idx}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 17: {
      const maxDepth = (variation % 5) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Valid Parentheses (Max depth limit: ${maxDepth})</text>
        <g transform="translate(140, 30)">
          <rect x="0" y="0" width="100" height="70" rx="4" fill="rgba(255,255,255,0.02)" stroke="${neutralColor}" stroke-width="2"/>
          <text x="50" y="-8" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="10" opacity="0.6">STACK</text>
        </g>
      `;
      break;
    }
    case 18: {
      const k = (variation % 2) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Remove duplicates (Max allowed: ${k})</text>
        <g transform="translate(60, 45)">
          ${[1, 1, 2, 2, 3].map((val, idx) => {
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 19: {
      const isAsc = (variation % 2 === 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Merge Sorted (${isAsc ? 'Ascending' : 'Descending'})</text>
        <g transform="translate(60, 35)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="50" height="25" rx="4" fill="rgba(59,130,246,0.1)" stroke="${secondaryColor}" stroke-width="1.5"/>
            <text x="25" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">1, 3, 5</text>
          </g>
          <g transform="translate(70, 0)">
            <rect x="0" y="0" width="50" height="25" rx="4" fill="rgba(245,158,11,0.1)" stroke="${accentColor}" stroke-width="1.5"/>
            <text x="25" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">2, 4, 6</text>
          </g>
        </g>
      `;
      break;
    }
    case 20: {
      const d = (variation % 4) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Missing Term in AP (diff: ${d})</text>
        <g transform="translate(80, 45)">
          ${[0, d, '?', d*3, d*4].map((val, idx) => {
            const isMiss = val === '?';
            const border = isMiss ? accentColor : primaryColor;
            return `
              <g transform="translate(${idx * 45}, 0)">
                <rect width="35" height="35" rx="6" fill="${isMiss ? 'rgba(245,158,11,0.2)' : 'transparent'}" stroke="${border}" stroke-width="2"/>
                <text x="17.5" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 21: {
      const thresholdDiv = (variation % 2 === 0 ? 2 : 3);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Majority Element (&gt; N / ${thresholdDiv})</text>
        <g transform="translate(60, 45)">
          ${[3, 3, 3, 2, 3, 1].map((val, idx) => {
            return `
              <g transform="translate(${idx * 40}, 0)">
                <rect width="30" height="30" rx="6" fill="transparent" stroke="${neutralColor}" stroke-width="2"/>
                <text x="15" y="20" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 22: {
      const isAsc = (variation % 2 === 0);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Search Insert Position (${isAsc ? 'Ascending' : 'Descending'})</text>
        <g transform="translate(60, 45)">
          ${[1, 3, 5, 6].map((val, idx) => {
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${isAsc ? val : 7 - val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 23: {
      const k = (variation % 3) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Word ${k} from end</text>
        <g transform="translate(60, 50)" font-family="sans-serif" font-size="16">
          <text x="0" y="20" fill="${textColor}" opacity="0.6">Hello Beautiful World</text>
        </g>
      `;
      break;
    }
    case 24: {
      const rep = (variation % 2 === 0 ? 2 : 3);
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Single Number (Others repeat ${rep}x)</text>
        <g transform="translate(60, 45)">
          ${[2, 2, 1, 5, 5].map((val, idx) => {
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 25: {
      const k = (variation % 9) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Plus ${k} Increment</text>
        <g transform="translate(80, 40)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="30" height="30" rx="4" stroke="${neutralColor}" stroke-width="2" fill="none"/>
            <text x="15" y="20" text-anchor="middle" fill="${textColor}">1</text>
            <rect x="35" y="0" width="30" height="30" rx="4" stroke="${neutralColor}" stroke-width="2" fill="none"/>
            <text x="50" y="20" text-anchor="middle" fill="${textColor}">2</text>
            <rect x="70" y="0" width="30" height="30" rx="4" stroke="${primaryColor}" stroke-width="2" fill="rgba(16,185,129,0.2)"/>
            <text x="85" y="20" text-anchor="middle" fill="${textColor}" font-weight="bold">9</text>
          </g>
        </g>
      `;
      break;
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="100%" style="max-width: 400px; display: inline-block;">
      ${svgContent}
    </svg>
  `;
}

function buildFullDescription(baseDesc, constraints, publicTestCases) {
  let html = `<div>${baseDesc}</div>`;
  
  html += `<p>&nbsp;</p><strong>Examples:</strong>`;
  publicTestCases.forEach((tc, idx) => {
    html += `
      <p>&nbsp;</p>
      <p><strong class="example">Example ${idx + 1}:</strong></p>
      <pre>
<strong>Input:</strong> ${tc.input}
<strong>Output:</strong> ${tc.expectedOutput}
      </pre>
    `;
  });
  
  if (constraints && constraints.length > 0) {
    html += `
      <p>&nbsp;</p>
      <strong>Constraints:</strong>
      <ul>
        ${constraints.map(c => `<li><code>${c}</code></li>`).join('')}
      </ul>
    `;
  }
  return html;
}

function generateProblem(categoryIdx, variation, globalIdx) {
  const difficulty = globalIdx % 3 === 0 ? 'Hard' : globalIdx % 3 === 1 ? 'Easy' : 'Medium';
  const acceptanceRate = Math.floor(Math.random() * 45) + 40; // 40% to 85%
  const companyTags = getRandomCompanies();
  
  let id = '';
  let title = '';
  let baseDescription = '';
  let constraints = [];
  let hints = [];
  let starterCode = { javascript: '', python: '', cpp: '', java: '' };
  let testCases = [];

  switch (categoryIdx) {
    case 1: { // Sum Divisible
      const k = variation + 1;
      id = `sum-divisible-by-${k}-${globalIdx}`;
      title = `${globalIdx}. Sum of Elements Divisible by ${k}`;
      baseDescription = `<p>Given an array of integers <code>nums</code>, return the sum of all elements in the array that are divisible by <code>${k}</code>.</p><p>If no such elements exist, return <code>0</code>.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `1 <= nums[i] <= 1000`
      ];
      hints = [
        `Iterate through each element of the array.`,
        `Check if the element modulo ${k} is equal to 0. If so, add it to your running sum.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar sumDivisible = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def sumDivisible(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int sumDivisible(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int sumDivisible(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => nums.filter(x => x % k === 0).reduce((a, b) => a + b, 0);

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [k, k * 2, k * 3, 1, 2, 3];
        else if (tc === 2) nums = [1, 2, 3, 5, 7].map(x => x === k ? x + 1 : x); // ensure no division unless expected
        else if (tc === 3) nums = Array.from({ length: 5 }, (_, i) => k * (i + 1));
        else nums = generateRandomArray(Math.floor(Math.random() * 20) + 10, 1, 200);

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 2: { // Find Target Element Index (k-th occurrence)
      const occurrence = (variation % 4) + 1;
      id = `find-target-index-occurrence-${occurrence}-${globalIdx}`;
      title = `${globalIdx}. Find ${occurrence}-th Occurrence Index of Target`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return the 0-based index of the <code>${occurrence}</code>-th occurrence of <code>target</code>.</p><p>If <code>target</code> does not occur at least <code>${occurrence}</code> times in <code>nums</code>, return <code>-1</code>.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Use a loop to iterate through the array while keeping a count of occurrences of the target.`,
        `Return the index when the count reaches ${occurrence}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findElement = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def findElement(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int findElement(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int findElement(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        let count = 0;
        for (let i = 0; i < nums.length; i++) {
          if (nums[i] === target) {
            count++;
            if (count === occurrence) return i;
          }
        }
        return -1;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { 
          nums = Array.from({ length: 10 }, (_, i) => i % 2 === 0 ? 7 : i); 
          target = 7; 
        } else if (tc === 2) { 
          nums = [1, 5, 8, 12, 15]; 
          target = 100; 
        } else if (tc === 3) { 
          nums = Array.from({ length: occurrence }, () => 8); 
          target = 8; 
        } else {
          nums = generateRandomArray(Math.floor(Math.random() * 20) + 10, 1, 10);
          target = Math.random() > 0.3 ? nums[Math.floor(Math.random() * nums.length)] : 999;
        }

        const inputStr = `nums = [${nums.join(',')}], target = ${target}`;
        const expected = solver(nums, target).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 3: { // Count Character at Parity indices
      const targetChar = String.fromCharCode(97 + (variation % 26));
      const parity = (variation % 2 === 0 ? 'even' : 'odd');
      id = `count-char-${targetChar}-${parity}-${globalIdx}`;
      title = `${globalIdx}. Count Character '${targetChar}' at ${parity.toUpperCase()} Indices`;
      baseDescription = `<p>Given a string <code>s</code>, count and return the number of occurrences of the character <code>'${targetChar}'</code> that are located at <strong>${parity}</strong> (0-based) indices in the string.</p>`;
      constraints = [
        `0 <= s.length <= 500`,
        `s consists of lowercase English letters.`
      ];
      hints = [
        `Loop through the string index-by-index.`,
        `Check if the index is ${parity} (index % 2 === ${parity === 'even' ? '0' : '1'}) and the character matches '${targetChar}'.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar countChar = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def countChar(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countChar(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countChar(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        let count = 0;
        for (let i = 0; i < s.length; i++) {
          if (s[i] === targetChar) {
            if (parity === 'even' && i % 2 === 0) count++;
            if (parity === 'odd' && i % 2 !== 0) count++;
          }
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = `a${targetChar}c${targetChar}e`;
        else if (tc === 2) s = "xyzxyz";
        else if (tc === 3) s = targetChar.repeat(5);
        else s = generateRandomString(Math.floor(Math.random() * 50) + 10);

        const inputStr = `s = "${s}"`;
        const expected = solver(s).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 4: { // K-th Largest Element
      const k = (variation % 5) + 1;
      id = `find-kth-largest-${k}-${globalIdx}`;
      title = `${globalIdx}. Find ${k}-th Largest Element`;
      baseDescription = `<p>Given an array of integers <code>nums</code>, find and return the <code>${k}</code>-th largest element in the array.</p><p>You may assume the array is never empty and always contains at least <code>${k}</code> elements.</p>`;
      constraints = [
        `${k} <= nums.length <= 100`,
        `-1000 <= nums[i] <= 1000`
      ];
      hints = [
        `You can sort the array in descending order.`,
        `The ${k}-th largest element will be at index ${k - 1}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar findMax = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def findMax(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int findMax(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        const sorted = [...nums].sort((a, b) => b - a);
        return sorted[k - 1];
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [3, 2, 1, 5, 6, 4];
        else if (tc === 2) nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
        else if (tc === 3) nums = Array.from({ length: k }, (_, i) => i * 10);
        else nums = generateRandomArray(Math.floor(Math.random() * 20) + 10, -500, 500);

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 5: { // String Reverse/Uppercase and Repeat
      const repeatCount = (variation % 5) + 1;
      const transform = (variation % 2 === 0 ? 'reverse' : 'uppercase');
      id = `string-transform-repeat-${transform}-${repeatCount}-${globalIdx}`;
      title = `${globalIdx}. String ${transform === 'reverse' ? 'Reverse' : 'Uppercase'} and Repeat ${repeatCount}x`;
      baseDescription = `<p>Given a string <code>s</code>, <strong>${transform === 'reverse' ? 'reverse the string' : 'convert the string to uppercase'}</strong>, and then return a new string consisting of the transformed string repeated <code>${repeatCount}</code> times.</p>`;
      constraints = [
        `0 <= s.length <= 50`,
        `s consists of lowercase English letters.`
      ];
      hints = [
        `First, perform the ${transform} transformation.`,
        `Repeat the resulting string ${repeatCount} times.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {string}\n */\nvar reverseRepeat = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def reverseRepeat(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: str\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    string reverseRepeat(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public String reverseRepeat(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        const transformed = transform === 'reverse' ? s.split('').reverse().join('') : s.toUpperCase();
        return transformed.repeat(repeatCount);
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "hello";
        else if (tc === 2) s = "a";
        else if (tc === 3) s = "z";
        else s = generateRandomString(Math.floor(Math.random() * 10) + 5);

        const inputStr = `s = "${s}"`;
        const expected = solver(s);

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 6: { // Common Elements Count divisible by k
      const k = (variation % 5) + 2;
      id = `count-common-elements-divisible-${k}-${globalIdx}`;
      title = `${globalIdx}. Common Elements Divisible by ${k}`;
      baseDescription = `<p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return the count of unique common elements between the two arrays that are <strong>divisible by <code>${k}</code></strong>.</p>`;
      constraints = [
        `1 <= nums1.length, nums2.length <= 50`,
        `1 <= nums1[i], nums2[i] <= 100`
      ];
      hints = [
        `Find the intersection of both arrays.`,
        `Filter the common elements to only include those where element % ${k} === 0.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar countCommon = function(nums1, nums2) {\n    \n};`,
        python: `class Solution(object):\n    def countCommon(self, nums1, nums2):\n        \"\"\"\n        :type nums1: List[int]\n        :type nums2: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countCommon(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countCommon(int[] nums1, int[] nums2) {\n        \n    }\n}`
      };

      const solver = (nums1, nums2) => {
        const s1 = new Set(nums1);
        const s2 = new Set(nums2);
        let count = 0;
        for (const val of s1) {
          if (s2.has(val) && val % k === 0) count++;
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums1, nums2;
        if (tc === 1) { nums1 = [k, k * 2, 3]; nums2 = [k, k * 2, 4]; }
        else if (tc === 2) { nums1 = [1, 2, 3]; nums2 = [4, 5, 6]; }
        else if (tc === 3) { nums1 = [k]; nums2 = [k]; }
        else {
          nums1 = generateRandomArray(Math.floor(Math.random() * 15) + 5, 1, 50);
          nums2 = generateRandomArray(Math.floor(Math.random() * 15) + 5, 1, 50);
        }

        const inputStr = `nums1 = [${nums1.join(',')}], nums2 = [${nums2.join(',')}]`;
        const expected = solver(nums1, nums2).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 7: { // Fibonacci / Tribonacci Number Modulo
      const modulo = (variation % 50) + 10;
      const isTrib = (variation % 2 !== 0);
      id = `fibo-tribo-mod-${isTrib ? 'trib' : 'fib'}-${modulo}-${globalIdx}`;
      title = `${globalIdx}. ${isTrib ? 'Tribonacci' : 'Fibonacci'} Number Modulo ${modulo}`;
      baseDescription = isTrib 
        ? `<p>Given an integer <code>n</code>, calculate the <code>n</code>-th Tribonacci number modulo <code>${modulo}</code>.</p><p>Recall that T(0) = 0, T(1) = 1, T(2) = 1, and T(n) = T(n-1) + T(n-2) + T(n-3) for n &gt;= 3.</p>`
        : `<p>Given an integer <code>n</code>, calculate the <code>n</code>-th Fibonacci number modulo <code>${modulo}</code>.</p><p>Recall that F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt;= 2.</p>`;
      constraints = [
        `0 <= n <= 100`
      ];
      hints = [
        `Use dynamic programming to compute values iteratively.`,
        `Apply the modulo operation at each step to prevent numeric overflow.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number} n\n * @return {number}\n */\nvar fibonacciMod = function(n) {\n    \n};`,
        python: `class Solution(object):\n    def fibonacciMod(self, n):\n        \"\"\"\n        :type n: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int fibonacciMod(int n) {\n        \n    }\n};`,
        java: `class Solution {\n    public int fibonacciMod(int n) {\n        \n    }\n}`
      };

      const solver = (n) => {
        if (isTrib) {
          if (n === 0) return 0;
          if (n === 1 || n === 2) return 1;
          let prev3 = 0, prev2 = 1, prev1 = 1, curr = 0;
          for (let i = 3; i <= n; i++) {
            curr = (prev1 + prev2 + prev3) % modulo;
            prev3 = prev2;
            prev2 = prev1;
            prev1 = curr;
          }
          return curr;
        } else {
          if (n === 0) return 0;
          if (n === 1) return 1;
          let prev2 = 0, prev1 = 1, curr = 0;
          for (let i = 2; i <= n; i++) {
            curr = (prev1 + prev2) % modulo;
            prev2 = prev1;
            prev1 = curr;
          }
          return curr;
        }
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let n;
        if (tc === 1) n = 5;
        else if (tc === 2) n = 10;
        else if (tc === 3) n = 0;
        else n = Math.floor(Math.random() * 80) + 15;

        const inputStr = `n = ${n}`;
        const expected = solver(n).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 8: { // Anagram Checker with Diff Limit (k-anagram)
      const k = (variation % 4) + 1;
      id = `check-k-anagram-${k}-${globalIdx}`;
      title = `${globalIdx}. Anagram Checker with Diff Limit ${k}`;
      baseDescription = `<p>Given two strings <code>s1</code> and <code>s2</code>, check if they are <code>${k}</code>-anagrams of each other.</p><p>Return <code>true</code> if they are, and <code>false</code> otherwise.</p><p>Two strings are <code>${k}</code>-anagrams if they have the exact same length and can be made anagrams by changing at most <code>${k}</code> characters in one string.</p>`;
      constraints = [
        `1 <= s1.length, s2.length <= 100`,
        `Strings consist of lowercase English letters.`
      ];
      hints = [
        `First check if s1 and s2 have equal lengths; if not, return false.`,
        `Count character frequencies for both strings. Sum up the positive differences and check if they are less than or equal to ${k}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nvar isAnagram = function(s1, s2) {\n    \n};`,
        python: `class Solution(object):\n    def isAnagram(self, s1, s2):\n        \"\"\"\n        :type s1: str\n        :type s2: str\n        :rtype: bool\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    bool isAnagram(string s1, string s2) {\n        \n    }\n};`,
        java: `class Solution {\n    public boolean isAnagram(String s1, String s2) {\n        \n    }\n}`
      };

      const solver = (s1, s2) => {
        if (s1.length !== s2.length) return false;
        const count1 = {};
        const count2 = {};
        for (const char of s1) count1[char] = (count1[char] || 0) + 1;
        for (const char of s2) count2[char] = (count2[char] || 0) + 1;
        let diff = 0;
        for (const char in count1) {
          if (count1[char] > (count2[char] || 0)) {
            diff += count1[char] - (count2[char] || 0);
          }
        }
        return diff <= k;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s1, s2;
        if (tc === 1) { s1 = "listen"; s2 = "silent"; }
        else if (tc === 2) { s1 = "anagram"; s2 = "grammar"; } // diff is 3
        else if (tc === 3) { s1 = "abc"; s2 = "xyz"; }
        else {
          s1 = generateRandomString(Math.floor(Math.random() * 8) + 4);
          if (Math.random() > 0.5) {
            // slightly modified
            const chars = s1.split('');
            for (let i = 0; i < Math.min(k, chars.length); i++) {
              chars[i] = 'z';
            }
            s2 = chars.join('');
          } else {
            s2 = generateRandomString(s1.length);
          }
        }

        const inputStr = `s1 = "${s1}", s2 = "${s2}"`;
        const expected = solver(s1, s2).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 9: { // Exponentiation Modulo
      const modulo = (variation % 100) + 100; // Modulo values between 100 and 199
      id = `exponentiation-mod-${modulo}-${globalIdx}`;
      title = `${globalIdx}. Power Modulo ${modulo}`;
      baseDescription = `<p>Given two non-negative integers <code>base</code> and <code>exp</code>, return <code>(base ^ exp) % ${modulo}</code>.</p>`;
      constraints = [
        `0 <= base, exp <= 1000`
      ];
      hints = [
        `Do not calculate base^exp directly as it will overflow quickly.`,
        `Use modular exponentiation (repeated squaring) to calculate the result efficiently in O(log(exp)) time.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number} base\n * @param {number} exp\n * @return {number}\n */\nvar powerMod = function(base, exp) {\n    \n};`,
        python: `class Solution(object):\n    def powerMod(self, base, exp):\n        \"\"\"\n        :type base: int\n        :type exp: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int powerMod(int base, int exp) {\n        \n    }\n};`,
        java: `class Solution {\n    public int powerMod(int base, int exp) {\n        \n    }\n}`
      };

      const solver = (base, exp) => {
        if (modulo === 1) return 0;
        let result = 1;
        let b = base % modulo;
        let e = exp;
        while (e > 0) {
          if (e % 2 === 1) {
            result = (result * b) % modulo;
          }
          b = (b * b) % modulo;
          e = Math.floor(e / 2);
        }
        return result;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let base, exp;
        if (tc === 1) { base = 2; exp = 10; }
        else if (tc === 2) { base = 5; exp = 0; }
        else if (tc === 3) { base = 10; exp = 9; }
        else {
          base = Math.floor(Math.random() * 500) + 1;
          exp = Math.floor(Math.random() * 500) + 1;
        }

        const inputStr = `base = ${base}, exp = ${exp}`;
        const expected = solver(base, exp).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 10: { // Count Primes ending in d in Range
      const d = [1, 3, 7, 9][variation % 4];
      id = `count-primes-ending-in-${d}-${globalIdx}`;
      title = `${globalIdx}. Prime Numbers Ending in ${d} in Range`;
      baseDescription = `<p>Given two positive integers <code>low</code> and <code>high</code>, count and return the number of prime numbers in the range <code>[low, high]</code> (inclusive) whose last digit (unit digit) is <code>${d}</code>.</p>`;
      constraints = [
        `1 <= low <= high <= 1000`
      ];
      hints = [
        `Write a helper function isPrime(n).`,
        `Loop from low to high, checking if the number is prime AND number % 10 === ${d}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number} low\n * @param {number} high\n * @return {number}\n */\nvar countPrimes = function(low, high) {\n    \n};`,
        python: `class Solution(object):\n    def countPrimes(self, low, high):\n        \"\"\"\n        :type low: int\n        :type high: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countPrimes(int low, int high) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countPrimes(int low, int high) {\n        \n    }\n}`
      };

      const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i * i <= num; i++) {
          if (num % i === 0) return false;
        }
        return true;
      };

      const solver = (low, high) => {
        let count = 0;
        for (let i = low; i <= high; i++) {
          if (isPrime(i) && i % 10 === d) count++;
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let low, high;
        if (tc === 1) { low = 1; high = 30; }
        else if (tc === 2) { low = 10; high = 50; }
        else if (tc === 3) { low = 14; high = 16; }
        else {
          low = Math.floor(Math.random() * 200) + 1;
          high = low + Math.floor(Math.random() * 200) + 50;
        }

        const inputStr = `low = ${low}, high = ${high}`;
        const expected = solver(low, high).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 11: { // Palindrome Checker Template switcher
      const templateIdx = variation % 10;
      let solver;

      if (templateIdx === 0) { // Deletion Palindrome
        const k = (Math.floor(variation / 10) % 3) + 1;
        id = `palindrome-deletion-${k}-${globalIdx}`;
        title = `${globalIdx}. Palindrome with Deletion Limit ${k}`;
        baseDescription = `<p>Given a string <code>s</code> containing lowercase English letters, determine if it can be made a palindrome by deleting <strong>at most <code>${k}</code></strong> characters.</p>`;
        constraints = [
          `0 <= s.length <= 500`,
          `s consists of lowercase English letters only.`
        ];
        hints = [
          `Use a two-pointer approach starting at both ends of the string.`,
          `When a mismatch occurs, recursively try deleting from left or right with reduced deletion allowance.`
        ];
        
        const checkPal = (str, i, j, kLeft) => {
          while (i < j) {
            if (str[i] !== str[j]) {
              if (kLeft === 0) return false;
              return checkPal(str, i + 1, j, kLeft - 1) || checkPal(str, i, j - 1, kLeft - 1);
            }
            i++;
            j--;
          }
          return true;
        };
        solver = (s) => checkPal(s, 0, s.length - 1, k);

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = k === 1 ? "racea-car" : k === 2 ? "rabc-ec-xar" : "abcde-edcba";
          else if (tc === 2) s = "hello";
          else if (tc === 3) s = "a";
          else {
            s = generateRandomString(Math.floor(Math.random() * 15) + 5);
            if (Math.random() > 0.5) {
              const half = generateRandomString(5);
              let pal = half + half.split('').reverse().join('');
              for (let i = 0; i < k; i++) {
                pal = pal.substring(0, i * 2) + 'z' + pal.substring(i * 2);
              }
              s = pal;
            }
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 1) { // Wildcard Palindrome
        const char = ['*', '?', '#', '@'][variation % 4];
        const w = (Math.floor(variation / 15) % 2) + 1;
        id = `palindrome-wildcard-${char === '*' ? 'star' : char === '?' ? 'quest' : char === '#' ? 'hash' : 'at'}-${w}-${globalIdx}`;
        title = `${globalIdx}. Wildcard Palindrome with '${char}' (Limit ${w})`;
        baseDescription = `<p>Given a string <code>s</code>, determine if it is a palindrome where the character <code>'${char}'</code> acts as a wildcard that can match any other character. You can use at most <strong><code>${w}</code></strong> wildcards in the match.</p>`;
        constraints = [
          `0 <= s.length <= 500`,
          `s consists of lowercase letters and '${char}'.`
        ];
        hints = [
          `Use a two-pointer approach.`,
          `When mismatch occurs and one of the characters is '${char}', it matches any other character and counts as a wildcard used. Ensure you do not exceed ${w} wildcards.`
        ];

        const checkWildcard = (str, i, j, wLeft) => {
          while (i < j) {
            if (str[i] !== str[j]) {
              if (str[i] === char || str[j] === char) {
                if (wLeft === 0) return false;
                return checkWildcard(str, i + 1, j - 1, wLeft - 1);
              } else {
                return false;
              }
            }
            i++;
            j--;
          }
          return true;
        };
        solver = (s) => checkWildcard(s, 0, s.length - 1, w);

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = `race${char}ar`;
          else if (tc === 2) s = `abc${char}def`;
          else if (tc === 3) s = `${char}`;
          else {
            const half = generateRandomString(5);
            let pal = half + half.split('').reverse().join('');
            if (Math.random() > 0.5) {
              const pos = Math.floor(Math.random() * pal.length);
              pal = pal.substring(0, pos) + char + pal.substring(pos + 1);
            }
            s = pal;
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 2) { // DNA/RNA Complementary Palindrome
        const type = (variation % 2 === 0 ? "DNA" : "RNA");
        const pairsDesc = type === "DNA" ? "A pairs with T, C pairs with G" : "A pairs with U, C pairs with G";
        id = `palindrome-complementary-${type.toLowerCase()}-${globalIdx}`;
        title = `${globalIdx}. ${type} Complementary Palindrome`;
        baseDescription = `<p>In ${type}, the complementary base pairs are: <strong>${pairsDesc}</strong>.</p><p>A ${type} complementary palindrome is a sequence that is equal to its complementary reverse (i.e., when read from right to left, each base is replaced by its complement).</p><p>Given a string <code>s</code> consisting of uppercase base characters, return <code>true</code> if it is a ${type} complementary palindrome, and <code>false</code> otherwise.</p>`;
        constraints = [
          `1 <= s.length <= 500`,
          `s consists of uppercase base characters only.`
        ];
        hints = [
          `Check if the character at index i matches the complement of the character at index n - 1 - i.`,
          `The complements are: ${type === "DNA" ? "A-T, T-A, C-G, G-C" : "A-U, U-A, C-G, G-C"}.`
        ];

        const comps = type === "DNA" ? { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' } : { 'A': 'U', 'U': 'A', 'C': 'G', 'G': 'C' };
        solver = (s) => {
          let i = 0, j = s.length - 1;
          while (i <= j) {
            if (comps[s[i]] !== s[j]) return false;
            i++;
            j--;
          }
          return true;
        };

        const chars = type === "DNA" ? ['A', 'T', 'C', 'G'] : ['A', 'U', 'C', 'G'];
        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = type === "DNA" ? "ATCGAT" : "AUCGAU";
          else if (tc === 2) s = type === "DNA" ? "AAAA" : "UUUU";
          else if (tc === 3) s = type === "DNA" ? "CGCG" : "CGGC";
          else {
            if (Math.random() > 0.5) {
              const half = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]);
              const second = half.map(c => comps[c]).reverse();
              s = half.join('') + second.join('');
            } else {
              s = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
            }
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 3) { // Atbash Mirror Palindrome
        const isAlnum = (variation % 2 === 1);
        id = `palindrome-atbash-${isAlnum ? 'alnum' : 'alpha'}-${globalIdx}`;
        title = `${globalIdx}. Atbash Mirror Palindrome`;
        baseDescription = `<p>Under Atbash rules, characters are paired from opposite ends of the alphabet (e.g., 'a' pairs with 'z', 'b' with 'y', 'c' with 'x', etc.). ${isAlnum ? 'For digits 0-9, they mirror similarly (0 pairs with 9, 1 with 8, etc.).' : ''}</p><p>A string is an Atbash Mirror Palindrome if it is equal to its Atbash mirror reverse.</p><p>Given a string <code>s</code> containing only lowercase English letters ${isAlnum ? 'and digits' : ''}, return <code>true</code> if it is an Atbash mirror palindrome, and <code>false</code> otherwise.</p>`;
        constraints = [
          `0 <= s.length <= 500`,
          `s consists of lowercase letters ${isAlnum ? 'and digits' : ''}.`
        ];
        hints = [
          `For each character s[i], find its Atbash complement and compare it to s[n - 1 - i].`,
          `Atbash of a letter c is String.fromCharCode(219 - c.charCodeAt(0)). ${isAlnum ? 'Atbash of a digit d is String.fromCharCode(105 - d.charCodeAt(0)).' : ''}`
        ];

        solver = (s) => {
          let i = 0, j = s.length - 1;
          while (i <= j) {
            const c1 = s[i];
            const c2 = s[j];
            let expected;
            if (/[a-z]/.test(c1)) {
              expected = String.fromCharCode(219 - c1.charCodeAt(0));
            } else if (isAlnum && /[0-9]/.test(c1)) {
              expected = String.fromCharCode(105 - c1.charCodeAt(0));
            } else {
              return false;
            }
            if (expected !== c2) return false;
            i++;
            j--;
          }
          return true;
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = isAlnum ? "gzd09" : "gzd"; // Atbash mirrors: g-t, z-a, d-w -> wait! expected of "gzd" is "t" + "a" + "w"? No!
          // let's check: Atbash of 'g' (103) is 219 - 103 = 116 ('t').
          // Atbash of 'z' (122) is 219 - 122 = 97 ('a').
          // Atbash of 'd' (100) is 219 - 100 = 119 ('w').
          // So "gzd" mirrored is "t", "a", "w" reversed, which is "w", "a", "t".
          // So "gzdwat" is an Atbash mirror! Let's check:
          // s[0]='g' pairs with s[5]='t' (yes, Atbash mirror).
          // s[1]='z' pairs with s[4]='a' (yes).
          // s[2]='d' pairs with s[3]='w' (yes).
          // Yes! "gzdwat" is an Atbash mirror palindrome!
          if (tc === 1) s = isAlnum ? "gzdwat09" : "gzdwat";
          else if (tc === 2) s = "hello";
          else if (tc === 3) s = isAlnum ? "18" : "a";
          else {
            if (Math.random() > 0.5) {
              const half = generateRandomString(4);
              const second = half.split('').map(c => String.fromCharCode(219 - c.charCodeAt(0))).reverse();
              s = half + second.join('');
            } else {
              s = generateRandomString(8);
            }
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 4) { // Index-Skipping Palindrome
        const d = (variation % 3) + 2;
        id = `palindrome-skipping-step-${d}-${globalIdx}`;
        title = `${globalIdx}. Index-Skipping Palindrome (Step ${d})`;
        baseDescription = `<p>Given a string <code>s</code>, check if the sequence formed by taking every <strong><code>${d}</code></strong>-th character starting from index 0 (i.e., indices 0, <code>${d}</code>, <code>${d*2}</code>, <code>${d*3}</code>, etc.) forms a palindrome.</p>`;
        constraints = [
          `1 <= s.length <= 500`,
          `s consists of lowercase English letters.`
        ];
        hints = [
          `Extract characters at indices 0, ${d}, ${d * 2}, etc. into a new string or list.`,
          `Check if the extracted string is a standard palindrome.`
        ];

        solver = (s) => {
          let extracted = "";
          for (let i = 0; i < s.length; i += d) {
            extracted += s[i];
          }
          return extracted === extracted.split('').reverse().join('');
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) {
            // E.g. extracted is "racecar". Construct s.
            const p = "racecar";
            const chars = [];
            for (let i = 0; i < p.length; i++) {
              chars.push(p[i]);
              for (let j = 0; j < d - 1; j++) chars.push('x');
            }
            s = chars.join('');
          } else if (tc === 2) s = "hello";
          else if (tc === 3) s = "a";
          else {
            s = generateRandomString(12);
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 5) { // Character-Filtered Palindrome
        const filterType = ["vowels", "consonants", "digits"][variation % 3];
        id = `palindrome-filtered-${filterType}-${globalIdx}`;
        title = `${globalIdx}. Character-Filtered Palindrome (${filterType.toUpperCase()})`;
        baseDescription = `<p>Given a string <code>s</code>, remove all <strong>${filterType}</strong> from the string, and check if the remaining characters form a case-insensitive palindrome.</p>`;
        constraints = [
          `0 <= s.length <= 500`,
          `s consists of alphanumeric characters and spaces.`
        ];
        hints = [
          `Filter the string to exclude all ${filterType}.`,
          `Convert the filtered string to lowercase and check if it reads the same forwards and backwards.`
        ];

        const isVowel = (c) => /[aeiouAEIOU]/.test(c);
        const isConsonant = (c) => /[a-zA-Z]/.test(c) && !isVowel(c);
        const isDigit = (c) => /[0-9]/.test(c);
        
        solver = (s) => {
          let cleaned = "";
          for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (filterType === "vowels" && isVowel(c)) continue;
            if (filterType === "consonants" && isConsonant(c)) continue;
            if (filterType === "digits" && isDigit(c)) continue;
            if (/[a-zA-Z0-9]/.test(c)) {
              cleaned += c.toLowerCase();
            }
          }
          return cleaned === cleaned.split('').reverse().join('');
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = filterType === "digits" ? "r1a2c3e4c5a6r" : filterType === "vowels" ? "rxaecxar" : "racecar123";
          else if (tc === 2) s = "hello";
          else if (tc === 3) s = " ";
          else {
            s = generateRandomString(10) + " " + generateRandomString(5);
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 6) { // Longest Palindromic Prefix Length
        id = `palindrome-prefix-longest-${globalIdx}`;
        title = `${globalIdx}. Longest Palindromic Prefix Length`;
        baseDescription = `<p>Given a string <code>s</code>, find and return the <strong>length</strong> of the longest prefix of <code>s</code> that is a palindrome.</p>`;
        constraints = [
          `1 <= s.length <= 500`,
          `s consists of lowercase English letters.`
        ];
        hints = [
          `Check prefixes of s starting from the longest down to length 1.`,
          `Return the length of the first prefix that is a palindrome.`
        ];

        solver = (s) => {
          const isPal = (str) => str === str.split('').reverse().join('');
          for (let len = s.length; len >= 1; len--) {
            if (isPal(s.substring(0, len))) return len;
          }
          return 0;
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = "abacaba";
          else if (tc === 2) s = "racecarxyz";
          else if (tc === 3) s = "abcd";
          else {
            s = generateRandomString(Math.floor(Math.random() * 15) + 5);
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 7) { // Permutation Palindrome with Deletions
        const k = variation % 3;
        id = `palindrome-permutation-deletions-${k}-${globalIdx}`;
        title = `${globalIdx}. Permutation Palindrome with Deletions (${k})`;
        baseDescription = `<p>Given a string <code>s</code>, return <code>true</code> if any permutation of the string can form a palindrome after deleting <strong>at most <code>${k}</code></strong> characters, and <code>false</code> otherwise.</p>`;
        constraints = [
          `0 <= s.length <= 500`,
          `s consists of lowercase English letters.`
        ];
        hints = [
          `Count frequencies of all characters in the string.`,
          `Count how many characters have odd frequencies. To form a palindrome after at most ${k} deletions, the number of odd-frequency characters minus ${k} must be at most 1 (i.e., oddCount <= ${k} + 1).`
        ];

        solver = (s) => {
          const counts = {};
          for (const char of s) counts[char] = (counts[char] || 0) + 1;
          let oddCount = 0;
          for (const char in counts) {
            if (counts[char] % 2 !== 0) oddCount++;
          }
          return oddCount <= k + 1;
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = "aabbcc";
          else if (tc === 2) s = "abcde";
          else if (tc === 3) s = "abc";
          else {
            s = generateRandomString(Math.floor(Math.random() * 15) + 5);
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 8) { // Bracket Palindrome
        const bracketMode = variation % 3;
        const types = bracketMode === 0 ? "standard ()" : bracketMode === 1 ? "square []" : "mixed ()[]";
        id = `palindrome-bracket-mode-${bracketMode}-${globalIdx}`;
        title = `${globalIdx}. Bracket Palindrome (${types})`;
        baseDescription = `<p>In a bracket palindrome, an open bracket at index <code>i</code> must match its corresponding close bracket at index <code>n - 1 - i</code> (e.g., <code>'('</code> matches <code>')'</code>, <code>'['</code> matches <code>']'</code>).</p><p>Given a string <code>s</code> consisting of bracket characters, check if it is a bracket palindrome.</p>`;
        constraints = [
          `1 <= s.length <= 100`,
          `s consists of brackets of type: ${types}.`
        ];
        hints = [
          `For each character s[i], check if it forms a matching pair with s[n - 1 - i].`,
          `Matching pairs are: ( with ), and [ with ].`
        ];

        const pairs = { '(': ')', '[': ']' };
        solver = (s) => {
          let i = 0, j = s.length - 1;
          while (i <= j) {
            if (pairs[s[i]] !== s[j]) return false;
            i++;
            j--;
          }
          return true;
        };

        const bracketChars = bracketMode === 0 ? ['(', ')'] : bracketMode === 1 ? ['[', ']'] : ['(', ')', '[', ']'];
        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) s = bracketMode === 0 ? "(())" : bracketMode === 1 ? "[[]]" : "([])";
          else if (tc === 2) s = "()()";
          else if (tc === 3) s = bracketMode === 0 ? "(" : "[";
          else {
            if (Math.random() > 0.5) {
              const half = Array.from({ length: 4 }, () => bracketChars[Math.floor(Math.random() * (bracketChars.length / 2)) * 2]);
              const second = half.map(b => pairs[b]).reverse();
              s = half.join('') + second.join('');
            } else {
              s = Array.from({ length: 8 }, () => bracketChars[Math.floor(Math.random() * bracketChars.length)]).join('');
            }
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }

      } else if (templateIdx === 9) { // Shift Palindrome
        const shift = (variation % 5) + 1;
        id = `palindrome-shift-odd-${shift}-${globalIdx}`;
        title = `${globalIdx}. Shift Palindrome (Shift ${shift})`;
        baseDescription = `<p>Given a string <code>s</code> of lowercase English letters, check if the string becomes a palindrome after shifting the characters at <strong>odd (1-based) indices</strong> forward in the alphabet by <strong><code>${shift}</code></strong> positions (with wrap-around from 'z' to 'a').</p><p>Note: 1-based odd indices correspond to 0-based even indices (0, 2, 4, etc.).</p>`;
        constraints = [
          `1 <= s.length <= 500`,
          `s consists of lowercase English letters.`
        ];
        hints = [
          `Create a new string where characters at 0-based even indices (0, 2, 4, ...) are shifted forward by ${shift} positions in the alphabet.`,
          `Check if the shifted string is a palindrome.`
        ];

        solver = (s) => {
          let shifted = "";
          for (let i = 0; i < s.length; i++) {
            if (i % 2 === 0) { // 1-based odd index is 0-based even index
              const code = s.charCodeAt(i);
              const newCode = ((code - 97 + shift) % 26) + 97;
              shifted += String.fromCharCode(newCode);
            } else {
              shifted += s[i];
            }
          }
          return shifted === shifted.split('').reverse().join('');
        };

        for (let tc = 1; tc <= 13; tc++) {
          const isHidden = tc > 3;
          let s;
          if (tc === 1) {
            // E.g. we want shifted to be "racecar" (len=7).
            // P = "racecar". Shift even back by shift.
            // P[0]='r' -> shift back.
            const p = "racecar";
            let constructed = "";
            for (let i = 0; i < p.length; i++) {
              if (i % 2 === 0) {
                const code = p.charCodeAt(i);
                const newCode = ((code - 97 - shift + 260) % 26) + 97;
                constructed += String.fromCharCode(newCode);
              } else {
                constructed += p[i];
              }
            }
            s = constructed;
          } else if (tc === 2) s = "hello";
          else if (tc === 3) s = "a";
          else {
            s = generateRandomString(10);
          }
          testCases.push({
            id: `${id}-tc-${tc}`,
            input: `s = "${s}"`,
            expectedOutput: solver(s).toString(),
            isHidden
          });
        }
      }

      if (templateIdx === 6) { // Longest Palindromic Prefix Length returns number
        starterCode = {
          javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar isPalindrome = function(s) {\n    \n};`,
          python: `class Solution(object):\n    def isPalindrome(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
          cpp: `class Solution {\npublic:\n    int isPalindrome(string s) {\n        \n    }\n};`,
          java: `class Solution {\n    public int isPalindrome(String s) {\n        \n    }\n}`
        };
      } else {
        starterCode = {
          javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    \n};`,
          python: `class Solution(object):\n    def isPalindrome(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: bool\n        \"\"\"\n        `,
          cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
          java: `class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}`
        };
      }

      break;
    }

    case 12: { // Non-Divisible Sum mode-based
      const mode = variation % 3;
      id = `non-divisible-sum-mode-${mode}-${globalIdx}`;
      title = `${globalIdx}. Non-Divisible Sum Filter Mode ${mode}`;
      
      let modeDesc = "";
      if (mode === 0) modeDesc = "are NOT divisible by <code>fizzDiv</code> and NOT divisible by <code>buzzDiv</code>";
      else if (mode === 1) modeDesc = "are divisible by <code>fizzDiv</code> but NOT divisible by <code>buzzDiv</code>";
      else if (mode === 2) modeDesc = "are divisible by <code>buzzDiv</code> but NOT divisible by <code>fizzDiv</code>";

      baseDescription = `<p>Given three positive integers <code>n</code>, <code>fizzDiv</code>, and <code>buzzDiv</code>, return the sum of all integers in the range <code>[1, n]</code> that ${modeDesc}.</p>`;
      constraints = [
        `1 <= n <= 1000`,
        `2 <= fizzDiv, buzzDiv <= 100`
      ];
      hints = [
        `Loop from 1 to n.`,
        `Apply the specific conditional filter matching Mode ${mode}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number} n\n * @param {number} fizzDiv\n * @param {number} buzzDiv\n * @return {number}\n */\nvar nonDivisibleSum = function(n, fizzDiv, buzzDiv) {\n    \n};`,
        python: `class Solution(object):\n    def nonDivisibleSum(self, n, fizzDiv, buzzDiv):\n        \"\"\"\n        :type n: int\n        :type fizzDiv: int\n        :type buzzDiv: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int nonDivisibleSum(int n, int fizzDiv, int buzzDiv) {\n        \n    }\n};`,
        java: `class Solution {\n    public int nonDivisibleSum(int n, int fizzDiv, int buzzDiv) {\n        \n    }\n}`
      };

      const solver = (n, fizzDiv, buzzDiv) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          if (mode === 0 && i % fizzDiv !== 0 && i % buzzDiv !== 0) sum += i;
          else if (mode === 1 && i % fizzDiv === 0 && i % buzzDiv !== 0) sum += i;
          else if (mode === 2 && i % fizzDiv !== 0 && i % buzzDiv === 0) sum += i;
        }
        return sum;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let n, fizzDiv, buzzDiv;
        if (tc === 1) { n = 10; fizzDiv = 3; buzzDiv = 5; }
        else if (tc === 2) { n = 5; fizzDiv = 2; buzzDiv = 3; }
        else if (tc === 3) { n = 1; fizzDiv = 2; buzzDiv = 2; }
        else {
          n = Math.floor(Math.random() * 200) + 50;
          fizzDiv = Math.floor(Math.random() * 8) + 2;
          buzzDiv = Math.floor(Math.random() * 8) + 2;
        }

        const inputStr = `n = ${n}, fizzDiv = ${fizzDiv}, buzzDiv = ${buzzDiv}`;
        const expected = solver(n, fizzDiv, buzzDiv).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 13: { // Target Frequency Count within distance k
      const k = (variation % 5) + 1;
      id = `target-frequency-distance-${k}-${globalIdx}`;
      title = `${globalIdx}. Count Elements in Range [target-${k}, target+${k}]`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return the frequency (count of occurrences) of elements in the array whose absolute difference from <code>target</code> is at most <code>${k}</code> (i.e., <code>|num - target| &lt;= ${k}</code>).</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Initialize a count variable to 0.`,
        `Loop through each element in nums and increment count if Math.abs(num - target) <= ${k}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar elementFrequency = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def elementFrequency(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int elementFrequency(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int elementFrequency(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => nums.filter(x => Math.abs(x - target) <= k).length;

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 2, 2, 3, 2, 4]; target = 2; }
        else if (tc === 2) { nums = [1, 10, 20]; target = 5; }
        else if (tc === 3) { nums = [5, 5, 5]; target = 5; }
        else {
          nums = generateRandomArray(Math.floor(Math.random() * 20) + 10, 1, 20);
          target = Math.random() > 0.4 ? nums[Math.floor(Math.random() * nums.length)] : 99;
        }

        const inputStr = `nums = [${nums.join(',')}], target = ${target}`;
        const expected = solver(nums, target).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 14: { // Pair sum / difference checker
      const isSum = (variation % 2 === 0);
      id = `pair-${isSum ? 'sum' : 'diff'}-check-${globalIdx}`;
      title = `${globalIdx}. Pair ${isSum ? 'Sum' : 'Difference'} Checker`;
      baseDescription = isSum
        ? `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return <code>true</code> if there exists a pair of distinct elements in the array that sum up to <code>target</code>, and <code>false</code> otherwise.</p>`
        : `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return <code>true</code> if there exists a pair of distinct elements in the array whose absolute difference is equal to <code>target</code> (i.e. <code>|nums[i] - nums[j]| = target</code>), and <code>false</code> otherwise.</p>`;
      constraints = [
        `2 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        isSum ? `Check if two elements nums[i] + nums[j] equal target.` : `Check if two elements Math.abs(nums[i] - nums[j]) equal target.`,
        `Make sure indices i and j are distinct (i !== j).`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {boolean}\n */\nvar hasPairWithSum = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def hasPairWithSum(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: bool\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    bool hasPairWithSum(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public boolean hasPairWithSum(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (isSum && nums[i] + nums[j] === target) return true;
            if (!isSum && Math.abs(nums[i] - nums[j]) === target) return true;
          }
        }
        return false;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 2, 3, 9]; target = 5; }
        else if (tc === 2) { nums = [1, 2, 4, 4]; target = 8; }
        else if (tc === 3) { nums = [1, 2, 3, 9]; target = 8; }
        else {
          nums = generateRandomArray(Math.floor(Math.random() * 15) + 5, 1, 50);
          if (Math.random() > 0.5 && nums.length > 2) {
            target = isSum ? nums[0] + nums[1] : Math.abs(nums[0] - nums[1]);
          } else {
            target = 999;
          }
        }

        const inputStr = `nums = [${nums.join(',')}], target = ${target}`;
        const expected = solver(nums, target).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 15: { // Vowel count followed by type
      const nextConsonant = (variation % 2 === 0);
      id = `vowel-count-followed-by-${nextConsonant ? 'consonant' : 'vowel'}-${globalIdx}`;
      title = `${globalIdx}. Count Vowels Followed by ${nextConsonant ? 'Consonants' : 'Vowels'}`;
      baseDescription = nextConsonant
        ? `<p>Given a string <code>s</code>, count and return the total number of vowels (a, e, i, o, u, case-insensitive) in the string that are immediately followed by a consonant character.</p>`
        : `<p>Given a string <code>s</code>, count and return the total number of vowels (a, e, i, o, u, case-insensitive) in the string that are immediately followed by another vowel.</p>`;
      constraints = [
        `0 <= s.length <= 500`,
        `s consists of letters and spaces.`
      ];
      hints = [
        `Loop from index 0 to length - 2.`,
        `For each char, check if it is a vowel and the next character is ${nextConsonant ? 'a consonant' : 'a vowel'}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar countVowels = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def countVowels(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countVowels(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countVowels(String s) {\n        \n    }\n}`
      };

      const isVowel = (c) => /[aeiouAEIOU]/.test(c);
      const isConsonant = (c) => /[a-zA-Z]/.test(c) && !isVowel(c);
      const solver = (s) => {
        let count = 0;
        for (let i = 0; i < s.length - 1; i++) {
          if (isVowel(s[i])) {
            if (nextConsonant && isConsonant(s[i + 1])) count++;
            if (!nextConsonant && isVowel(s[i + 1])) count++;
          }
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "hello world";
        else if (tc === 2) s = "aeiou";
        else if (tc === 3) s = "xyz";
        else s = generateRandomString(Math.floor(Math.random() * 40) + 10, 'abcdefghijklmnopqrstuvwxyz');

        const inputStr = `s = "${s.replace(/"/g, '\\"')}"`;
        const expected = solver(s).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 16: { // Two Sum / Product Indices
      const isSum = (variation % 2 === 0);
      id = `two-${isSum ? 'sum' : 'product'}-indices-${globalIdx}`;
      title = `${globalIdx}. Two ${isSum ? 'Sum' : 'Product'} Indices`;
      baseDescription = isSum
        ? `<p>Given an array of integers <code>nums</code> and a target integer <code>target</code>, return the 0-based indices of the two numbers such that they add up to <code>target</code>.</p>`
        : `<p>Given an array of integers <code>nums</code> and a target integer <code>target</code>, return the 0-based indices of the two numbers such that their product is equal to <code>target</code>.</p>`;
      
      baseDescription += `<p>You may assume that each input would have exactly one solution, and you may not use the same element twice. Return the indices as a sorted pair list <code>[idx1, idx2]</code>.</p>`;
      constraints = [
        `2 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Use a nested loop to check all pairs of indices.`,
        isSum ? `Check if nums[i] + nums[j] === target.` : `Check if nums[i] * nums[j] === target.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def twoSum(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (isSum && nums[i] + nums[j] === target) return [i, j];
            if (!isSum && nums[i] * nums[j] === target) return [i, j];
          }
        }
        return [];
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [2, 7, 11, 15]; target = isSum ? 9 : 14; }
        else if (tc === 2) { nums = [3, 2, 4]; target = 6; }
        else if (tc === 3) { nums = [3, 3]; target = isSum ? 6 : 9; }
        else {
          nums = Array.from({ length: 6 }, (_, i) => i + 1);
          const i1 = 0, i2 = 4;
          target = isSum ? nums[i1] + nums[i2] : nums[i1] * nums[i2];
        }

        const inputStr = `nums = [${nums.join(',')}], target = ${target}`;
        const expected = `[${solver(nums, target).join(',')}]`;

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 17: { // Valid Parentheses with depth limit
      const maxDepth = (variation % 5) + 1;
      id = `valid-parentheses-depth-limit-${maxDepth}-${globalIdx}`;
      title = `${globalIdx}. Valid Parentheses with Depth Limit ${maxDepth}`;
      baseDescription = `<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid <strong>AND</strong> its maximum nesting depth does not exceed <code>${maxDepth}</code>.</p><p>An input string is valid if open brackets are closed by the same type of brackets, and closed in the correct order.</p>`;
      constraints = [
        `1 <= s.length <= 100`,
        `s consists of parentheses characters only.`
      ];
      hints = [
        `Use a stack to validate correct matching of bracket types.`,
        `During iteration, the stack size represents the current nesting depth. Track the maximum stack size and verify it is <= ${maxDepth}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def isValid(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: bool\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        const stack = [];
        const mapping = { ')': '(', '}': '{', ']': '[' };
        let currentDepth = 0;
        let maxSeenDepth = 0;
        for (let char of s) {
          if (mapping[char]) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (top !== mapping[char]) return false;
            currentDepth--;
          } else {
            stack.push(char);
            currentDepth++;
            if (currentDepth > maxSeenDepth) {
              maxSeenDepth = currentDepth;
            }
          }
        }
        return stack.length === 0 && maxSeenDepth <= maxDepth;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "()[]{}";
        else if (tc === 2) s = "(]";
        else if (tc === 3) s = "([{}])"; // depth 3
        else if (tc === 4) s = "(".repeat(maxDepth) + ")".repeat(maxDepth);
        else if (tc === 5) s = "(".repeat(maxDepth + 1) + ")".repeat(maxDepth + 1); // fails depth
        else if (tc === 6) s = "()";
        else if (tc === 7) s = "[]";
        else if (tc === 8) s = "{}";
        else if (tc === 9) s = "}{";
        else if (tc === 10) s = "({[)]}";
        else s = "(([]{}))";

        const inputStr = `s = "${s}"`;
        const expected = solver(s).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 18: { // Remove Duplicates (elements can appear at most k times)
      const k = (variation % 2) + 1;
      id = `remove-duplicates-limit-${k}-${globalIdx}`;
      title = `${globalIdx}. Remove Duplicates with Limit ${k}`;
      baseDescription = `<p>Given an integer array <code>nums</code> sorted in non-decreasing order, return the count of elements in the array after removing duplicates such that each unique element appears <strong>at most <code>${k}</code></strong> times.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-100 <= nums[i] <= 100`
      ];
      hints = [
        `Since the array is sorted, you can use a two-pointer approach.`,
        `Compare the current element with the element at index - ${k}. If they differ, keep it.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar removeDuplicates = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def removeDuplicates(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        if (nums.length <= k) return nums.length;
        let index = k;
        for (let i = k; i < nums.length; i++) {
          if (nums[i] !== nums[index - k]) {
            index++;
          }
        }
        return index;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [1, 1, 1, 2, 2, 3];
        else if (tc === 2) nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
        else if (tc === 3) nums = [1, 2, 3];
        else {
          const size = Math.floor(Math.random() * 20) + 5;
          nums = generateRandomArray(size, 1, 15).sort((a,b) => a-b);
        }

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 19: { // Merge Sorted Arrays in order
      const isAscending = (variation % 2 === 0);
      id = `merge-sorted-array-${isAscending ? 'asc' : 'desc'}-${globalIdx}`;
      title = `${globalIdx}. Merge Sorted Arrays in ${isAscending ? 'Ascending' : 'Descending'} Order`;
      baseDescription = `<p>Given two sorted integer arrays <code>nums1</code> and <code>nums2</code>, merge them and return a new sorted array in <strong>${isAscending ? 'ascending' : 'descending'}</strong> order.</p>`;
      constraints = [
        `1 <= nums1.length, nums2.length <= 50`,
        `-1000 <= nums1[i], nums2[i] <= 1000`
      ];
      hints = [
        `Concatenate both arrays.`,
        isAscending ? `Sort them in ascending order (a - b).` : `Sort them in descending order (b - a).`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number[]}\n */\nvar mergeSorted = function(nums1, nums2) {\n    \n};`,
        python: `class Solution(object):\n    def mergeSorted(self, nums1, nums2):\n        \"\"\"\n        :type nums1: List[int]\n        :type nums2: List[int]\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> mergeSorted(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] mergeSorted(int[] nums1, int[] nums2) {\n        \n    }\n}`
      };

      const solver = (nums1, nums2) => {
        const merged = [...nums1, ...nums2];
        return isAscending ? merged.sort((a,b) => a-b) : merged.sort((a,b) => b-a);
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums1, nums2;
        if (tc === 1) { nums1 = [1, 2, 3]; nums2 = [2, 5, 6]; }
        else if (tc === 2) { nums1 = [1]; nums2 = [2]; }
        else if (tc === 3) { nums1 = [0]; nums2 = [5]; }
        else {
          nums1 = generateRandomArray(Math.floor(Math.random() * 10) + 5, -100, 100).sort((a,b) => a-b);
          nums2 = generateRandomArray(Math.floor(Math.random() * 10) + 5, -100, 100).sort((a,b) => a-b);
        }

        const inputStr = `nums1 = [${nums1.join(',')}], nums2 = [${nums2.join(',')}]`;
        const expected = `[${solver(nums1, nums2).join(',')}]`;

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 20: { // Missing Number in AP with diff d
      const d = (variation % 4) + 1;
      id = `missing-number-ap-diff-${d}-${globalIdx}`;
      title = `${globalIdx}. Missing Term in AP with Difference ${d}`;
      baseDescription = `<p>Given an array <code>nums</code> containing distinct numbers representing an arithmetic progression with a common difference of <code>${d}</code>, but exactly one term is missing. Return the missing term.</p>`;
      constraints = [
        `2 <= nums.length <= 100`,
        `All terms are within the progression range.`
      ];
      hints = [
        `First sort the array in ascending order.`,
        `Iterate through the sorted array and find where the difference between adjacent terms is not equal to ${d}.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar missingNumber = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def missingNumber(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        const sorted = [...nums].sort((a, b) => a - b);
        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i + 1] - sorted[i] !== d) {
            return sorted[i] + d;
          }
        }
        return sorted[0] - d; // fallback
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [0, d, d * 3]; // missing d * 2
        else if (tc === 2) nums = [5, 5 + d, 5 + d * 3];
        else if (tc === 3) nums = [10, 10 + d * 2, 10 + d * 3];
        else {
          const n = Math.floor(Math.random() * 20) + 5;
          const missingIdx = Math.floor(Math.random() * (n - 2)) + 1;
          nums = Array.from({ length: n }, (_, i) => 10 + i * d).filter((_, idx) => idx !== missingIdx);
          nums.sort(() => 0.5 - Math.random());
        }

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 21: { // Majority Element (> n / thresholdDiv)
      const thresholdDiv = (variation % 2 === 0 ? 2 : 3);
      id = `majority-element-ratio-${thresholdDiv}-${globalIdx}`;
      title = `${globalIdx}. Majority Element with Threshold Ratio 1/${thresholdDiv}`;
      baseDescription = `<p>Given an array <code>nums</code> of size <code>n</code>, return the majority element that appears strictly more than <code>⌊n / ${thresholdDiv}⌋</code> times.</p><p>If multiple such elements exist, return the smallest one. If none exist, return <code>-1</code>.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i] <= 1000`
      ];
      hints = [
        `Count occurrences of all elements using a hash map.`,
        `Filter elements that appear more than nums.length / ${thresholdDiv} times, and return the minimum of those.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar majorityElement = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def majorityElement(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        const counts = {};
        for (const val of nums) {
          counts[val] = (counts[val] || 0) + 1;
        }
        const candidates = [];
        for (const val in counts) {
          if (counts[val] > nums.length / thresholdDiv) {
            candidates.push(Number(val));
          }
        }
        if (candidates.length === 0) return -1;
        return Math.min(...candidates);
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [3, 2, 3];
        else if (tc === 2) nums = [2, 2, 1, 1, 1, 2, 2];
        else if (tc === 3) nums = [1];
        else {
          const maj = Math.floor(Math.random() * 100) - 50;
          const others = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) - 50);
          const size = Math.floor(Math.random() * 10) + 6;
          nums = Array.from({ length: size }, (_, i) => i < Math.ceil(size / thresholdDiv) + 1 ? maj : others[i % others.length]);
          nums.sort(() => 0.5 - Math.random());
        }

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 22: { // Search Insert Position order-based
      const isAscending = (variation % 2 === 0);
      id = `search-insert-direction-${isAscending ? 'asc' : 'desc'}-${globalIdx}`;
      title = `${globalIdx}. Search Insert Position in ${isAscending ? 'Ascending' : 'Descending'} Array`;
      baseDescription = `<p>Given a sorted array of distinct integers <code>nums</code> in <strong>${isAscending ? 'ascending' : 'descending'}</strong> order and a target value <code>target</code>, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Use binary search or scan the array.`,
        isAscending ? `Find the first index where nums[index] >= target.` : `Find the first index where nums[index] <= target.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar searchInsert = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def searchInsert(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        if (isAscending) {
          let low = 0, high = nums.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
          }
          return low;
        } else {
          let low = 0, high = nums.length - 1;
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) return mid;
            else if (nums[mid] > target) low = mid + 1;
            else high = mid - 1;
          }
          return low;
        }
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = isAscending ? [1, 3, 5, 6] : [6, 5, 3, 1]; target = 5; }
        else if (tc === 2) { nums = isAscending ? [1, 3, 5, 6] : [6, 5, 3, 1]; target = 2; }
        else if (tc === 3) { nums = isAscending ? [1, 3, 5, 6] : [6, 5, 3, 1]; target = 7; }
        else {
          nums = Array.from({ length: 15 }, (_, i) => isAscending ? i * 3 + 1 : (45 - i * 3));
          target = Math.random() > 0.5 ? nums[Math.floor(Math.random() * nums.length)] : Math.floor(Math.random() * 50);
        }

        const inputStr = `nums = [${nums.join(',')}], target = ${target}`;
        const expected = solver(nums, target).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 23: { // Length of k-th Word from End
      const k = (variation % 3) + 1;
      id = `length-of-word-from-end-${k}-${globalIdx}`;
      title = `${globalIdx}. Length of Word ${k} From End`;
      baseDescription = `<p>Given a string <code>s</code> consisting of words and spaces, return the length of the <code>${k}</code>-th word from the end of the string.</p><p>A word is a maximal substring consisting of non-space characters only. If the string has fewer than <code>${k}</code> words, return <code>0</code>.</p>`;
      constraints = [
        `1 <= s.length <= 500`,
        `s consists of only English letters and spaces ' '.`
      ];
      hints = [
        `Split the string by spaces and filter out empty words.`,
        `Retrieve the word at index length - ${k} and return its length.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLastWord = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def lengthOfLastWord(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int lengthOfLastWord(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        const words = s.trim().split(/\s+/).filter(Boolean);
        if (words.length < k) return 0;
        return words[words.length - k].length;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "Hello World From Seeding";
        else if (tc === 2) s = "   fly me   to   the moon  ";
        else if (tc === 3) s = "luffy is still joyboy";
        else if (tc === 4) s = "a";
        else if (tc === 5) s = "a ".repeat(k - 1);
        else s = "quick brown fox jumps over the wall";

        const inputStr = `s = "${s}"`;
        const expected = solver(s).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 24: { // Single Number replication count rep
      const rep = (variation % 2 === 0 ? 2 : 3);
      id = `single-number-rep-${rep}-${globalIdx}`;
      title = `${globalIdx}. Single Number with Replication Factor ${rep}`;
      baseDescription = `<p>Given a non-empty array of integers <code>nums</code>, every element appears exactly <code>${rep}</code> times except for one element which appears exactly once. Find that single one.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i] <= 1000`
      ];
      hints = [
        `Count occurrences of each number using a hash map or frequency array.`,
        `Find the element with count === 1.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar singleNumber = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def singleNumber(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        const counts = {};
        for (const val of nums) {
          counts[val] = (counts[val] || 0) + 1;
        }
        for (const val in counts) {
          if (counts[val] === 1) return Number(val);
        }
        return nums[0];
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = rep === 2 ? [2, 2, 1] : [2, 2, 2, 1];
        else if (tc === 2) nums = rep === 2 ? [4, 1, 2, 1, 2] : [4, 1, 1, 1, 2, 2, 2];
        else if (tc === 3) nums = [1];
        else {
          const oddVal = Math.floor(Math.random() * 100) + 10;
          nums = [oddVal];
          for (let i = 0; i < 3; i++) {
            const pairVal = Math.floor(Math.random() * 100) + 200 + i;
            for (let j = 0; j < rep; j++) nums.push(pairVal);
          }
          nums.sort(() => 0.5 - Math.random());
        }

        const inputStr = `nums = [${nums.join(',')}]`;
        const expected = solver(nums).toString();

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }

    case 25: { // Plus K
      const k = (variation % 9) + 1;
      id = `plus-k-${k}-${globalIdx}`;
      title = `${globalIdx}. Plus ${k} Digit Increment`;
      baseDescription = `<p>You are given a large integer represented as an integer array <code>digits</code>, where each <code>digits[i]</code> is the <code>i</code>-th digit of the integer.</p><p>Increment the large integer by <strong><code>${k}</code></strong> and return the resulting array of digits.</p>`;
      constraints = [
        `1 <= digits.length <= 20`,
        `0 <= digits[i] <= 9`
      ];
      hints = [
        `Add ${k} to the last digit.`,
        `Propagate any carry to the left, adding new digit 1 at index 0 if carry reaches beyond the first digit.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = function(digits) {\n    \n};`,
        python: `class Solution(object):\n    def plusOne(self, digits):\n        \"\"\"\n        :type digits: List[int]\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}`
      };

      const solver = (digits) => {
        const res = [...digits];
        let carry = k;
        for (let i = res.length - 1; i >= 0; i--) {
          const sum = res[i] + carry;
          res[i] = sum % 10;
          carry = Math.floor(sum / 10);
          if (carry === 0) return res;
        }
        if (carry > 0) res.unshift(carry);
        return res;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let digits;
        if (tc === 1) digits = [1, 2, 3];
        else if (tc === 2) digits = [9, 9, 9];
        else if (tc === 3) digits = [0];
        else {
          const size = Math.floor(Math.random() * 8) + 4;
          digits = Array.from({ length: size }, () => Math.floor(Math.random() * 9));
        }

        const inputStr = `digits = [${digits.join(',')}]`;
        const expected = `[${solver(digits).join(',')}]`;

        testCases.push({
          id: `${id}-tc-${tc}`,
          input: inputStr,
          expectedOutput: expected,
          isHidden
        });
      }
      break;
    }
  }

  // Compile full description dynamically with examples and constraints
  const publicTestCases = testCases.filter(tc => !tc.isHidden);
  const description = `<div style="text-align: center; margin-bottom: 20px;">${generateSVG(categoryIdx, variation)}</div>` + buildFullDescription(baseDescription, constraints, publicTestCases);

  return {
    id,
    title,
    description,
    difficulty,
    acceptanceRate,
    companyTags,
    hints,
    starterCode,
    testCases
  };
}

async function seedCodingProblems() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to Database.');

    // Clear existing coding problems
    console.log('Clearing existing coding problems from database...');
    await CodingProblem.deleteMany({});

    console.log('Generating 2500 coding problems with dynamic variations...');
    const problems = [];

    // Define 25 categories, 100 variations each
    for (let categoryIdx = 1; categoryIdx <= 25; categoryIdx++) {
      for (let variation = 1; variation <= 100; variation++) {
        const globalIdx = (categoryIdx - 1) * 100 + variation;
        const problemData = generateProblem(categoryIdx, variation, globalIdx);
        problems.push(problemData);
      }
    }

    console.log(`Inserting ${problems.length} coding problems into MongoDB...`);
    // Insert in batches of 200 to be safe
    const batchSize = 200;
    for (let i = 0; i < problems.length; i += batchSize) {
      const batch = problems.slice(i, i + batchSize);
      await CodingProblem.insertMany(batch);
      console.log(`Inserted batch ${i / batchSize + 1}/${Math.ceil(problems.length / batchSize)}`);
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedCodingProblems();
