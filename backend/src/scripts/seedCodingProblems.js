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
      const target = 7;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Find target index of ${target}</text>
        <g transform="translate(40, 50)">
          ${[1, 3, target, 9, 12].map((val, idx) => {
            const isTarget = val === target;
            const border = isTarget ? primaryColor : neutralColor;
            const fill = isTarget ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 60}, 0)">
                <rect width="45" height="40" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="22.5" y="25" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold">${val}</text>
                <text x="22.5" y="52" text-anchor="middle" fill="${isTarget ? primaryColor : 'rgba(255,255,255,0.4)'}" font-family="sans-serif" font-size="10">idx ${idx}</text>
                ${isTarget ? `<path d="M 22.5 -15 L 22.5 -5 M 17.5 -8 L 22.5 -3 L 27.5 -8" stroke="${primaryColor}" stroke-width="2" fill="none"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 3: {
      const char = String.fromCharCode(97 + (variation % 26));
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Frequency of character '${char}'</text>
        <g transform="translate(40, 45)">
          ${['a', char, 'b', char, 'c'].map((c, idx) => {
            const isMatch = c === char;
            const fill = isMatch ? accentColor : neutralColor;
            return `
              <g transform="translate(${idx * 60}, 0)">
                <circle cx="22.5" cy="22.5" r="20" fill="${isMatch ? 'rgba(245,158,11,0.2)' : 'transparent'}" stroke="${fill}" stroke-width="2"/>
                <text x="22.5" y="28" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="16" font-weight="bold">${c}</text>
                ${isMatch ? `<circle cx="22.5" cy="22.5" r="3" fill="${accentColor}"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 4: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="35" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Find Maximum Element</text>
        <g transform="translate(60, 100)">
          ${[20, 40, 75, 50, 30].map((val, idx) => {
            const isMax = val === 75;
            const fill = isMax ? primaryColor : secondaryColor;
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect x="0" y="-${val * 0.7}" width="25" height="${val * 0.7}" rx="3" fill="${fill}" opacity="${isMax ? '1' : '0.6'}"/>
                <text x="12.5" y="-${val * 0.7 + 5}" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="10">${val}</text>
                ${isMax ? `<text x="12.5" y="15" text-anchor="middle" fill="${primaryColor}" font-family="sans-serif" font-size="8" font-weight="bold">MAX</text>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 5: {
      const rep = (variation % 5) + 1;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Reverse and Repeat ${rep}x</text>
        <g transform="translate(10, 45)" font-family="sans-serif" font-size="11">
          <rect x="10" y="10" width="60" height="30" rx="6" fill="transparent" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="40" y="28" text-anchor="middle" fill="${textColor}">"abc"</text>
          
          <path d="M 70 25 L 105 25" stroke="${textColor}" stroke-width="2" fill="none"/>
          <polygon points="105,21 113,25 105,29" fill="${textColor}"/>
          
          <rect x="115" y="10" width="80" height="30" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
          <text x="155" y="28" text-anchor="middle" fill="${textColor}">Reverse: "cba"</text>
          
          <path d="M 195 25 L 230 25" stroke="${textColor}" stroke-width="2" fill="none"/>
          <polygon points="230,21 238,25 230,29" fill="${textColor}"/>
          
          <rect x="240" y="10" width="130" height="30" rx="6" fill="transparent" stroke="${accentColor}" stroke-width="2"/>
          <text x="305" y="28" text-anchor="middle" fill="${textColor}">"${"cba".repeat(rep).substring(0,10)}${"cba".repeat(rep).length > 10 ? '...' : ''}"</text>
        </g>
      `;
      break;
    }
    case 6: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Common Elements Count</text>
        <g transform="translate(80, 20)">
          <circle cx="70" cy="50" r="40" fill="rgba(59,130,246,0.3)" stroke="${secondaryColor}" stroke-width="2"/>
          <circle cx="130" cy="50" r="40" fill="rgba(16,185,129,0.3)" stroke="${primaryColor}" stroke-width="2"/>
          <text x="45" y="55" fill="${textColor}" font-family="sans-serif" font-size="12">Set A</text>
          <text x="155" y="55" fill="${textColor}" font-family="sans-serif" font-size="12">Set B</text>
          <text x="100" y="55" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">A ∩ B</text>
        </g>
      `;
      break;
    }
    case 7: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Fibonacci modulo calculation</text>
        <g transform="translate(50, 45)">
          ${[0, 1, 1, 2, 3, 5].map((val, idx) => {
            const w = 30 + idx * 5;
            return `
              <g transform="translate(${idx * 48}, 0)">
                <rect width="${w}" height="40" fill="rgba(99,102,241,0.2)" stroke="${secondaryColor}" stroke-width="1.5" rx="4"/>
                <text x="${w/2}" y="25" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">F(${idx})</text>
                <text x="${w/2}" y="52" text-anchor="middle" fill="${primaryColor}" font-family="sans-serif" font-size="10" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 8: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Anagram Checker: Match Letters</text>
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
          <path d="M 15 25 L 95 45 M 55 25 L 55 45 M 95 25 L 15 45 M 135 25 L 215 45 M 175 25 L 175 45 M 215 25 L 135 45" stroke="${primaryColor}" stroke-width="1" stroke-dasharray="3" opacity="0.6"/>
        </g>
      `;
      break;
    }
    case 9: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Modular Exponentiation: repeated squaring</text>
        <g transform="translate(80, 50)" font-family="sans-serif" font-size="11" fill="${textColor}">
          <rect x="0" y="0" width="70" height="30" rx="6" fill="transparent" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="35" y="18" text-anchor="middle">Base ^ Exp</text>
          
          <path d="M 70 15 L 110 15" stroke="${textColor}" stroke-width="2"/>
          <polygon points="110,11 118,15 110,19" fill="${textColor}"/>
          
          <rect x="120" y="0" width="120" height="30" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
          <text x="180" y="18" text-anchor="middle">(Base^2) ^ (Exp/2)</text>
        </g>
      `;
      break;
    }
    case 10: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Primes Highlighted</text>
        <g transform="translate(60, 45)">
          ${[2, 3, 4, 5, 6, 7, 8, 9].map((val, idx) => {
            const isPrime = [2, 3, 5, 7].includes(val);
            const fill = isPrime ? primaryColor : neutralColor;
            return `
              <g transform="translate(${idx * 35}, 0)">
                <rect width="28" height="28" rx="6" fill="${isPrime ? 'rgba(16,185,129,0.2)' : 'transparent'}" stroke="${fill}" stroke-width="2"/>
                <text x="14" y="18" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                ${isPrime ? `<circle cx="14" cy="4" r="2.5" fill="${primaryColor}"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 11: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Palindrome Checker Symmetric Comparison</text>
        <g transform="translate(100, 50)" font-family="sans-serif" font-size="14" font-weight="bold">
          <rect x="0" y="0" width="200" height="35" rx="6" fill="rgba(255,255,255,0.05)" stroke="${secondaryColor}" stroke-width="2"/>
          <text x="100" y="22" text-anchor="middle" fill="${textColor}" letter-spacing="10">R A C E C A R</text>
          
          <path d="M -15 17 L -2 17 M -2 17 L -8 12 M -2 17 L -8 22" stroke="${primaryColor}" stroke-width="2" fill="none"/>
          <path d="M 215 17 L 202 17 M 202 17 L 208 12 M 202 17 L 208 22" stroke="${primaryColor}" stroke-width="2" fill="none"/>
        </g>
      `;
      break;
    }
    case 12: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Non-Divisible Sum Numbers Range</text>
        <g transform="translate(60, 45)">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map((val, idx) => {
            const isDiv = val % 3 === 0 || val % 5 === 0;
            const stroke = isDiv ? 'rgba(239, 68, 68, 0.6)' : primaryColor;
            return `
              <g transform="translate(${idx * 35}, 0)">
                <rect width="28" height="28" rx="6" fill="${isDiv ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}" stroke="${stroke}" stroke-width="2"/>
                <text x="14" y="18" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                ${isDiv ? `<line x1="4" y1="4" x2="24" y2="24" stroke="rgba(239, 68, 68, 0.8)" stroke-width="2" />` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 13: {
      const target = 5;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Frequency of target: ${target}</text>
        <g transform="translate(50, 45)">
          ${[5, 2, 5, 9, 5, 12].map((val, idx) => {
            const isTarget = val === target;
            const border = isTarget ? primaryColor : neutralColor;
            const fill = isTarget ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                ${isTarget ? `<circle cx="19" cy="-8" r="4" fill="${primaryColor}"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 14: {
      const target = 10;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Pair Sum Equals ${target}</text>
        <g transform="translate(50, 45)">
          ${[3, 8, 7, 2, 9].map((val, idx) => {
            const isPart = val === 3 || val === 7;
            const border = isPart ? primaryColor : neutralColor;
            const fill = isPart ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
          <path d="M 19 35 C 19 60, 119 60, 119 35" stroke="${primaryColor}" stroke-width="2" fill="none" stroke-dasharray="3"/>
          <text x="69" y="62" text-anchor="middle" fill="${primaryColor}" font-family="sans-serif" font-size="10" font-weight="bold">3 + 7 = ${target}</text>
        </g>
      `;
      break;
    }
    case 15: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Vowel highlight in string</text>
        <g transform="translate(60, 50)" font-family="sans-serif" font-size="16" font-weight="bold">
          ${['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'].map((c, idx) => {
            const isVow = ['e', 'o'].includes(c.toLowerCase());
            return `
              <g transform="translate(${idx * 24}, 0)">
                <text x="12" y="20" text-anchor="middle" fill="${isVow ? accentColor : textColor}">${c}</text>
                ${isVow ? `<circle cx="12" cy="28" r="3" fill="${accentColor}"/>` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 16: {
      const target = 9;
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Two Sum Indices (Target = ${target})</text>
        <g transform="translate(50, 45)">
          ${[2, 7, 11, 15].map((val, idx) => {
            const isPart = val === 2 || val === 7;
            const border = isPart ? primaryColor : neutralColor;
            const fill = isPart ? 'rgba(16,185,129,0.2)' : 'transparent';
            return `
              <g transform="translate(${idx * 60}, 0)">
                <rect width="45" height="35" rx="6" fill="${fill}" stroke="${border}" stroke-width="2"/>
                <text x="22.5" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                <text x="22.5" y="48" text-anchor="middle" fill="${isPart ? primaryColor : 'rgba(255,255,255,0.4)'}" font-family="sans-serif" font-size="10">idx ${idx}</text>
              </g>
            `;
          }).join('')}
          <path d="M 22.5 35 C 22.5 55, 82.5 55, 82.5 35" stroke="${primaryColor}" stroke-width="2" fill="none" stroke-dasharray="3"/>
        </g>
      `;
      break;
    }
    case 17: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Valid Parentheses Stack Matching</text>
        <g transform="translate(140, 30)">
          <rect x="0" y="0" width="100" height="70" rx="4" fill="rgba(255,255,255,0.02)" stroke="${neutralColor}" stroke-width="2"/>
          <text x="50" y="-8" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="10" opacity="0.6">STACK</text>
          
          <rect x="10" y="45" width="80" height="20" rx="4" fill="rgba(16,185,129,0.1)" stroke="${primaryColor}" stroke-width="1.5"/>
          <text x="50" y="59" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">[  ]</text>
          
          <rect x="10" y="20" width="80" height="20" rx="4" fill="rgba(59,130,246,0.1)" stroke="${secondaryColor}" stroke-width="1.5"/>
          <text x="50" y="34" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">{  }</text>
        </g>
      `;
      break;
    }
    case 18: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Remove duplicates in-place</text>
        <g transform="translate(60, 45)">
          ${[1, 1, 2, 2, 3].map((val, idx) => {
            const isDup = idx === 1 || idx === 3;
            const stroke = isDup ? 'rgba(239, 68, 68, 0.6)' : primaryColor;
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="${isDup ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}" stroke="${stroke}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
                ${isDup ? `<line x1="4" y1="4" x2="34" y2="31" stroke="rgba(239, 68, 68, 0.8)" stroke-width="2" />` : ''}
              </g>
            `;
          }).join('')}
        </g>
      `;
      break;
    }
    case 19: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Merge Sorted Arrays</text>
        <g transform="translate(60, 35)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="50" height="25" rx="4" fill="rgba(59,130,246,0.1)" stroke="${secondaryColor}" stroke-width="1.5"/>
            <text x="25" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">1, 3, 5</text>
          </g>
          <g transform="translate(70, 0)">
            <rect x="0" y="0" width="50" height="25" rx="4" fill="rgba(245,158,11,0.1)" stroke="${accentColor}" stroke-width="1.5"/>
            <text x="25" y="17" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12">2, 4, 6</text>
          </g>
          <g transform="translate(0, 40)">
            <rect x="0" y="0" width="120" height="28" rx="6" fill="rgba(16,185,129,0.1)" stroke="${primaryColor}" stroke-width="2"/>
            <text x="60" y="19" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">1, 2, 3, 4, 5, 6</text>
          </g>
          <path d="M 25 25 L 40 40 M 95 25 L 80 40" stroke="${textColor}" stroke-width="1.5" opacity="0.4"/>
        </g>
      `;
      break;
    }
    case 20: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Missing Number</text>
        <g transform="translate(80, 45)">
          ${[0, 1, '?', 3, 4].map((val, idx) => {
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
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Majority Element (> N/2)</text>
        <g transform="translate(60, 45)">
          ${[3, 3, 3, 2, 3, 1].map((val, idx) => {
            const isMaj = val === 3;
            const border = isMaj ? primaryColor : neutralColor;
            return `
              <g transform="translate(${idx * 40}, 0)">
                <rect width="30" height="30" rx="6" fill="${isMaj ? 'rgba(16,185,129,0.2)' : 'transparent'}" stroke="${border}" stroke-width="2"/>
                <text x="15" y="20" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
          <text x="250" y="20" fill="${primaryColor}" font-family="sans-serif" font-size="12" font-weight="bold">3 dominates!</text>
        </g>
      `;
      break;
    }
    case 22: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Search Insert Position</text>
        <g transform="translate(60, 45)">
          ${[1, 3, 5, 6].map((val, idx) => {
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="transparent" stroke="${primaryColor}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
          <g transform="translate(138, 0)">
            <rect width="10" height="35" fill="rgba(245,158,11,0.2)" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="2"/>
            <text x="5" y="-10" text-anchor="middle" fill="${accentColor}" font-family="sans-serif" font-size="10" font-weight="bold">Insert 4</text>
          </g>
        </g>
      `;
      break;
    }
    case 23: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Length of Last Word</text>
        <g transform="translate(60, 50)" font-family="sans-serif" font-size="16">
          <text x="0" y="20" fill="${textColor}" opacity="0.6">Hello</text>
          <g transform="translate(60, 0)">
            <rect x="-5" y="-5" width="65" height="30" rx="4" fill="rgba(16,185,129,0.1)" stroke="${primaryColor}" stroke-width="2"/>
            <text x="0" y="20" fill="${textColor}" font-weight="bold">World</text>
            <text x="27" y="42" text-anchor="middle" fill="${primaryColor}" font-size="10">Length: 5</text>
          </g>
        </g>
      `;
      break;
    }
    case 24: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="30" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Single Number (No Pair)</text>
        <g transform="translate(60, 45)">
          ${[2, 2, 1, 5, 5].map((val, idx) => {
            const isSingle = val === 1;
            const border = isSingle ? accentColor : primaryColor;
            return `
              <g transform="translate(${idx * 50}, 0)">
                <rect width="38" height="35" rx="6" fill="${isSingle ? 'rgba(245,158,11,0.2)' : 'transparent'}" stroke="${border}" stroke-width="2"/>
                <text x="19" y="22" text-anchor="middle" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">${val}</text>
              </g>
            `;
          }).join('')}
          <path d="M 19 35 C 19 55, 69 55, 69 35 M 169 35 C 169 55, 219 55, 219 35" stroke="${primaryColor}" stroke-width="1.5" opacity="0.4" fill="none"/>
        </g>
      `;
      break;
    }
    case 25: {
      svgContent = `
        <rect width="100%" height="100%" rx="12" fill="${bgColor}"/>
        <text x="20" y="25" fill="${textColor}" font-family="sans-serif" font-size="12" font-weight="bold">Plus One Increment</text>
        <g transform="translate(80, 40)">
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="30" height="30" rx="4" stroke="${neutralColor}" stroke-width="2" fill="none"/>
            <text x="15" y="20" text-anchor="middle" fill="${textColor}">1</text>
            <rect x="35" y="0" width="30" height="30" rx="4" stroke="${neutralColor}" stroke-width="2" fill="none"/>
            <text x="50" y="20" text-anchor="middle" fill="${textColor}">2</text>
            <rect x="70" y="0" width="30" height="30" rx="4" stroke="${primaryColor}" stroke-width="2" fill="rgba(16,185,129,0.2)"/>
            <text x="85" y="20" text-anchor="middle" fill="${textColor}" font-weight="bold">9</text>
          </g>
          <text x="120" y="20" fill="${textColor}" font-family="sans-serif" font-size="16">+</text>
          <text x="140" y="20" fill="${primaryColor}" font-family="sans-serif" font-size="16" font-weight="bold">1</text>
          <path d="M 85 -5 C 85 -20, 50 -20, 50 -5" stroke="${accentColor}" stroke-width="2" fill="none"/>
          <text x="67.5" y="-18" fill="${accentColor}" font-family="sans-serif" font-size="8" text-anchor="middle">carry</text>
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

async function seedCodingProblems() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to Database.');

    // Clear existing coding problems
    console.log('Clearing existing coding problems from database...');
    await CodingProblem.deleteMany({});

    console.log('Generating 2500 coding problems...');
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

function generateProblem(categoryIdx, variation, globalIdx) {
  const difficulty = globalIdx % 3 === 0 ? 'Hard' : globalIdx % 3 === 1 ? 'Easy' : 'Medium';
  const acceptanceRate = Math.floor(Math.random() * 45) + 40; // 40% to 85%
  const companyTags = getRandomCompanies();
  
  let id = '';
  let title = '';
  let baseDescription = '';
  let description = '';
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
        else if (tc === 2) nums = [1, 2, 3, 5, 7];
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

    case 2: { // Find Target Element Index
      const baseMultiplier = variation;
      id = `find-target-index-${baseMultiplier}-${globalIdx}`;
      title = `${globalIdx}. Find Target Index Variation ${baseMultiplier}`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return the 0-based index of the first occurrence of <code>target</code>.</p><p>If <code>target</code> does not exist in <code>nums</code>, return <code>-1</code>.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Use a simple loop to iterate through the array.`,
        `Return the current index if the element matches the target.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findElement = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def findElement(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int findElement(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int findElement(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => nums.indexOf(target);

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 5, 8, 12, 15]; target = 8; }
        else if (tc === 2) { nums = [1, 5, 8, 12, 15]; target = 100; }
        else if (tc === 3) { nums = [7, 7, 7, 7]; target = 7; }
        else {
          nums = generateRandomArray(Math.floor(Math.random() * 20) + 10, 1, 100);
          target = Math.random() > 0.4 ? nums[Math.floor(Math.random() * nums.length)] : 999;
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

    case 3: { // Count Character
      const targetChar = String.fromCharCode(97 + (variation % 26)); // cycling letters
      id = `count-char-${targetChar}-${globalIdx}`;
      title = `${globalIdx}. Frequency of Character '${targetChar}'`;
      baseDescription = `<p>Given a string <code>s</code>, count and return the number of occurrences of the character <code>'${targetChar}'</code> in the string.</p>`;
      constraints = [
        `0 <= s.length <= 500`,
        `s consists of lowercase English letters.`
      ];
      hints = [
        `Initialize a counter to 0.`,
        `Loop through each character of the string s. If it matches '${targetChar}', increment your counter.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar countChar = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def countChar(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countChar(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countChar(String s) {\n        \n    }\n}`
      };

      const solver = (s) => (s.match(new RegExp(targetChar, 'g')) || []).length;

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = `abcde${targetChar}fg`;
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

    case 4: { // Subarray Maximum Element
      id = `find-maximum-element-${variation}-${globalIdx}`;
      title = `${globalIdx}. Subarray Maximum Element Variation ${variation}`;
      baseDescription = `<p>Given an array of integers <code>nums</code>, find and return the maximum value in the array.</p><p>You may assume the array is never empty.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i] <= 1000`
      ];
      hints = [
        `Initialize a variable to store the maximum value with the first element of the array.`,
        `Iterate through the rest of the array and update the maximum if you find a larger element.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar findMax = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def findMax(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int findMax(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => Math.max(...nums);

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [1, 2, 3, 4, 10, 5];
        else if (tc === 2) nums = [-10, -5, -2, -20];
        else if (tc === 3) nums = [42];
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

    case 5: { // String Reverse and Repeat
      const repeatCount = (variation % 5) + 1;
      id = `string-reverse-repeat-${repeatCount}-${globalIdx}`;
      title = `${globalIdx}. String Reverse and Repeat ${repeatCount}x`;
      baseDescription = `<p>Given a string <code>s</code>, reverse the string, and then return a new string consisting of the reversed string repeated <code>${repeatCount}</code> times.</p>`;
      constraints = [
        `0 <= s.length <= 50`,
        `s consists of lowercase English letters.`
      ];
      hints = [
        `First, write a helper logic to reverse the string.`,
        `After reversing s, concatenate it with itself ${repeatCount} times.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {string}\n */\nvar reverseRepeat = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def reverseRepeat(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: str\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    string reverseRepeat(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public String reverseRepeat(String s) {\n        \n    }\n}`
      };

      const solver = (s) => s.split('').reverse().join('').repeat(repeatCount);

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

    case 6: { // Common Elements Count
      id = `count-common-elements-${variation}-${globalIdx}`;
      title = `${globalIdx}. Common Elements Count Variation ${variation}`;
      baseDescription = `<p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return the count of common elements between the two arrays.</p><p>An element is common if it appears in both arrays. Only count unique common values.</p>`;
      constraints = [
        `1 <= nums1.length, nums2.length <= 50`,
        `1 <= nums1[i], nums2[i] <= 100`
      ];
      hints = [
        `Convert one or both arrays into a Set to filter out duplicate values.`,
        `Loop through one set and check if each element is present in the other set.`
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
          if (s2.has(val)) count++;
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums1, nums2;
        if (tc === 1) { nums1 = [1, 2, 2, 3]; nums2 = [2, 3, 4]; }
        else if (tc === 2) { nums1 = [1, 2, 3]; nums2 = [4, 5, 6]; }
        else if (tc === 3) { nums1 = [10]; nums2 = [10]; }
        else {
          nums1 = generateRandomArray(Math.floor(Math.random() * 15) + 5, 1, 30);
          nums2 = generateRandomArray(Math.floor(Math.random() * 15) + 5, 1, 30);
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

    case 7: { // Fibonacci Modulo
      const modulo = (variation % 50) + 10; // Modulo values between 10 and 59
      id = `fibonacci-mod-${modulo}-${globalIdx}`;
      title = `${globalIdx}. Fibonacci Number Modulo ${modulo}`;
      baseDescription = `<p>Given an integer <code>n</code>, calculate the <code>n</code>-th Fibonacci number modulo <code>${modulo}</code>.</p><p>Recall that F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt;= 2.</p>`;
      constraints = [
        `0 <= n <= 100`
      ];
      hints = [
        `Use dynamic programming or an iterative array to store Fibonacci values up to n.`,
        `Apply the modulo operation at each step of the addition to prevent overflow.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number} n\n * @return {number}\n */\nvar fibonacciMod = function(n) {\n    \n};`,
        python: `class Solution(object):\n    def fibonacciMod(self, n):\n        \"\"\"\n        :type n: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int fibonacciMod(int n) {\n        \n    }\n};`,
        java: `class Solution {\n    public int fibonacciMod(int n) {\n        \n    }\n}`
      };

      const solver = (n) => {
        if (n === 0) return 0;
        if (n === 1) return 1;
        let prev2 = 0;
        let prev1 = 1;
        let curr = 0;
        for (let i = 2; i <= n; i++) {
          curr = (prev1 + prev2) % modulo;
          prev2 = prev1;
          prev1 = curr;
        }
        return curr;
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

    case 8: { // Is Anagram
      id = `check-anagram-${variation}-${globalIdx}`;
      title = `${globalIdx}. Anagram Checker Variation ${variation}`;
      baseDescription = `<p>Given two strings <code>s1</code> and <code>s2</code>, check if they are anagrams of each other.</p><p>Return <code>true</code> if they are anagrams, and <code>false</code> otherwise.</p>`;
      constraints = [
        `1 <= s1.length, s2.length <= 100`,
        `Strings consist of lowercase English letters.`
      ];
      hints = [
        `If s1 and s2 have different lengths, they cannot be anagrams.`,
        `Sort both strings and check if the sorted versions are identical.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nvar isAnagram = function(s1, s2) {\n    \n};`,
        python: `class Solution(object):\n    def isAnagram(self, s1, s2):\n        \"\"\"\n        :type s1: str\n        :type s2: str\n        :rtype: bool\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    bool isAnagram(string s1, string s2) {\n        \n    }\n};`,
        java: `class Solution {\n    public boolean isAnagram(String s1, String s2) {\n        \n    }\n}`
      };

      const solver = (s1, s2) => {
        const sorted1 = s1.split('').sort().join('');
        const sorted2 = s2.split('').sort().join('');
        return sorted1 === sorted2;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s1, s2;
        if (tc === 1) { s1 = "listen"; s2 = "silent"; }
        else if (tc === 2) { s1 = "hello"; s2 = "world"; }
        else if (tc === 3) { s1 = "rat"; s2 = "car"; }
        else {
          s1 = generateRandomString(Math.floor(Math.random() * 8) + 4);
          s2 = Math.random() > 0.5 ? s1.split('').sort(() => 0.5 - Math.random()).join('') : generateRandomString(s1.length);
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

    case 10: { // Count Primes in Range
      id = `count-primes-range-${variation}-${globalIdx}`;
      title = `${globalIdx}. Prime Numbers in Range Variation ${variation}`;
      baseDescription = `<p>Given two positive integers <code>low</code> and <code>high</code>, count and return the number of prime numbers in the range <code>[low, high]</code> (inclusive).</p>`;
      constraints = [
        `1 <= low <= high <= 500`
      ];
      hints = [
        `Write a helper function to determine if a single number is prime.`,
        `Loop through all integers from low to high, incrementing a count whenever you find a prime.`
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
          if (isPrime(i)) count++;
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let low, high;
        if (tc === 1) { low = 1; high = 10; }
        else if (tc === 2) { low = 10; high = 20; }
        else if (tc === 3) { low = 14; high = 16; } // no primes
        else {
          low = Math.floor(Math.random() * 100) + 1;
          high = low + Math.floor(Math.random() * 100) + 10;
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

    case 11: { // Palindrome Checker
      id = `palindrome-check-${variation}-${globalIdx}`;
      title = `${globalIdx}. Palindrome Checker Variation ${variation}`;
      baseDescription = `<p>Given a string <code>s</code>, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.</p>`;
      constraints = [
        `0 <= s.length <= 500`,
        `s consists of printable ASCII characters.`
      ];
      hints = [
        `Strip out all non-alphanumeric characters first.`,
        `Convert the cleaned string to lowercase, then check if it reads the same forwards and backwards.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def isPalindrome(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: bool\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return cleaned === cleaned.split('').reverse().join('');
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "A man, a plan, a canal: Panama";
        else if (tc === 2) s = "race a car";
        else if (tc === 3) s = " ";
        else if (tc === 4) s = "abacaba";
        else if (tc === 5) s = "Was it a car or a cat I saw";
        else if (tc === 6) s = "No lemon, no melon";
        else if (tc === 7) s = "Not a palindrome!";
        else if (tc === 8) s = "12321";
        else if (tc === 9) s = "hello";
        else if (tc === 10) s = "a";
        else if (tc === 11) s = "0P";
        else s = generateRandomString(Math.floor(Math.random() * 15) + 5);

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

    case 12: { // Non-Divisible Sum
      id = `non-divisible-sum-${variation}-${globalIdx}`;
      title = `${globalIdx}. Non-Divisible Sum Variation ${variation}`;
      baseDescription = `<p>Given three positive integers <code>n</code>, <code>fizzDiv</code>, and <code>buzzDiv</code>, return the sum of all integers in the range <code>[1, n]</code> that are NOT divisible by <code>fizzDiv</code> and NOT divisible by <code>buzzDiv</code>.</p>`;
      constraints = [
        `1 <= n <= 1000`,
        `2 <= fizzDiv, buzzDiv <= 100`
      ];
      hints = [
        `Loop through all numbers from 1 to n.`,
        `For each number, check if it modulo fizzDiv is non-zero AND modulo buzzDiv is non-zero. If so, add it to your sum.`
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
          if (i % fizzDiv !== 0 && i % buzzDiv !== 0) {
            sum += i;
          }
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

    case 13: { // Target Frequency Count
      id = `target-frequency-${variation}-${globalIdx}`;
      title = `${globalIdx}. Target Frequency Count Variation ${variation}`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return the frequency (count of occurrences) of <code>target</code> in <code>nums</code>.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `Initialize a counter to 0.`,
        `Loop through each number in nums. If it matches target, increment your counter.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar elementFrequency = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def elementFrequency(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int elementFrequency(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int elementFrequency(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => nums.filter(x => x === target).length;

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 2, 2, 3, 2, 4]; target = 2; }
        else if (tc === 2) { nums = [1, 2, 3]; target = 5; }
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

    case 14: { // Pair Sum Checker
      id = `pair-sum-check-${variation}-${globalIdx}`;
      title = `${globalIdx}. Pair Sum Checker Variation ${variation}`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return <code>true</code> if there exists a pair of distinct elements in the array that sum up to <code>target</code>, and <code>false</code> otherwise.</p>`;
      constraints = [
        `2 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `A nested loop checking all pairs is a simple way to start.`,
        `Ensure that you check distinct indices (i.e. i != j).`
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
            if (nums[i] + nums[j] === target) return true;
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
            target = nums[0] + nums[1];
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

    case 15: { // Vowel Frequency Count
      id = `vowel-count-${variation}-${globalIdx}`;
      title = `${globalIdx}. Vowel Frequency Count Variation ${variation}`;
      baseDescription = `<p>Given a string <code>s</code>, count and return the total number of vowels (a, e, i, o, u, case-insensitive) in the string.</p>`;
      constraints = [
        `0 <= s.length <= 500`,
        `s consists of printable ASCII characters.`
      ];
      hints = [
        `Loop through each character of the string s.`,
        `Check if the lowercase version of the character matches 'a', 'e', 'i', 'o', or 'u'. If so, increment your count.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar countVowels = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def countVowels(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int countVowels(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int countVowels(String s) {\n        \n    }\n}`
      };

      const solver = (s) => (s.match(/[aeiouAEIOU]/g) || []).length;

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "hello world";
        else if (tc === 2) s = "AEIOU";
        else if (tc === 3) s = "bcdfgh";
        else s = generateRandomString(Math.floor(Math.random() * 40) + 10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

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

    case 16: { // Two Sum Indices (LeetCode)
      id = `two-sum-indices-${variation}-${globalIdx}`;
      title = `${globalIdx}. Two Sum Indices Variation ${variation}`;
      baseDescription = `<p>Given an array of integers <code>nums</code> and a target integer <code>target</code>, return the 0-based indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>`;
      constraints = [
        `2 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`
      ];
      hints = [
        `You can use a hash map to store elements you've seen and their indices.`,
        `For each number x, check if target - x is already in the map.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def twoSum(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          if (map.has(complement)) {
            return [map.get(complement), i];
          }
          map.set(nums[i], i);
        }
        return [];
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [2, 7, 11, 15]; target = 9; }
        else if (tc === 2) { nums = [3, 2, 4]; target = 6; }
        else if (tc === 3) { nums = [3, 3]; target = 6; }
        else {
          const size = Math.floor(Math.random() * 10) + 5;
          nums = Array.from({ length: size }, (_, i) => i * 3 + 2);
          const i1 = Math.floor(Math.random() * (size / 2));
          const i2 = Math.floor(Math.random() * (size / 2)) + Math.ceil(size / 2);
          target = nums[i1] + nums[i2];
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

    case 17: { // Valid Parentheses (LeetCode / GFG)
      id = `valid-parentheses-${variation}-${globalIdx}`;
      title = `${globalIdx}. Valid Parentheses Variation ${variation}`;
      baseDescription = `<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p><p>An input string is valid if open brackets are closed by the same type of brackets, and closed in the correct order.</p>`;
      constraints = [
        `1 <= s.length <= 100`,
        `s consists of parentheses characters only.`
      ];
      hints = [
        `Use a stack data structure.`,
        `Push open brackets onto the stack. For close brackets, pop from the stack and verify it matches.`
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
        for (let char of s) {
          if (mapping[char]) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (top !== mapping[char]) return false;
          } else {
            stack.push(char);
          }
        }
        return stack.length === 0;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "()[]{}";
        else if (tc === 2) s = "(]";
        else if (tc === 3) s = "([{}])";
        else if (tc === 4) s = "(((((())))))";
        else if (tc === 5) s = "(((((()))))"; // false
        else if (tc === 6) s = "()";
        else if (tc === 7) s = "[]";
        else if (tc === 8) s = "{}";
        else if (tc === 9) s = "}{"; // false
        else if (tc === 10) s = "({[)]}"; // false
        else if (tc === 11) s = "({[]})[]{}";
        else s = "(([]{}))" + (Math.random() > 0.5 ? "()" : "(");

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

    case 18: { // Remove Duplicates from Sorted Array (LeetCode)
      id = `remove-duplicates-${variation}-${globalIdx}`;
      title = `${globalIdx}. Remove Duplicates Count Variation ${variation}`;
      baseDescription = `<p>Given an integer array <code>nums</code> sorted in non-decreasing order, return the count of unique elements in the array.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-100 <= nums[i] <= 100`
      ];
      hints = [
        `Since the array is sorted, duplicates are adjacent to each other.`,
        `Iterate through the array and count how many elements are different from their predecessor.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar removeDuplicates = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def removeDuplicates(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        if (nums.length === 0) return 0;
        let count = 1;
        for (let i = 1; i < nums.length; i++) {
          if (nums[i] !== nums[i-1]) count++;
        }
        return count;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [1, 1, 2];
        else if (tc === 2) nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
        else if (tc === 3) nums = [1, 2, 3];
        else {
          const size = Math.floor(Math.random() * 20) + 5;
          nums = generateRandomArray(size, 1, 20).sort((a,b) => a-b);
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

    case 19: { // Merge Sorted Array (LeetCode simplified)
      id = `merge-sorted-array-${variation}-${globalIdx}`;
      title = `${globalIdx}. Merge Sorted Array Variation ${variation}`;
      baseDescription = `<p>Given two sorted integer arrays <code>nums1</code> and <code>nums2</code>, merge them and return the merged array as a new sorted array.</p>`;
      constraints = [
        `1 <= nums1.length, nums2.length <= 50`,
        `-1000 <= nums1[i], nums2[i] <= 1000`
      ];
      hints = [
        `You can use a two-pointer approach to merge both arrays in O(n + m) time.`,
        `Compare elements at both pointers, push the smaller one, and advance that pointer.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number[]}\n */\nvar mergeSorted = function(nums1, nums2) {\n    \n};`,
        python: `class Solution(object):\n    def mergeSorted(self, nums1, nums2):\n        \"\"\"\n        :type nums1: List[int]\n        :type nums2: List[int]\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> mergeSorted(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] mergeSorted(int[] nums1, int[] nums2) {\n        \n    }\n}`
      };

      const solver = (nums1, nums2) => [...nums1, ...nums2].sort((a,b) => a-b);

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums1, nums2;
        if (tc === 1) { nums1 = [1, 2, 3]; nums2 = [2, 5, 6]; }
        else if (tc === 2) { nums1 = []; nums2 = [1]; }
        else if (tc === 3) { nums1 = [0]; nums2 = []; }
        else {
          nums1 = generateRandomArray(Math.floor(Math.random() * 10) + 5, -100, 100).sort((a,b) => a-b);
          nums2 = generateRandomArray(Math.floor(Math.random() * 10) + 5, -100, 100).sort((a,b) => a-b);
        }

        // Clean up empty arrays representations
        if (nums1.length === 1 && nums1[0] === 0 && tc === 3) nums1 = [0]; // fallback representation
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

    case 20: { // Missing Number (LeetCode / GFG)
      id = `missing-number-${variation}-${globalIdx}`;
      title = `${globalIdx}. Missing Number Variation ${variation}`;
      baseDescription = `<p>Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing from the array.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `0 <= nums[i] <= nums.length`,
        `All elements of nums are unique.`
      ];
      hints = [
        `The sum of all numbers from 0 to n is equal to n * (n + 1) / 2.`,
        `Compute the expected sum and subtract the sum of elements in the array to find the missing one.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar missingNumber = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def missingNumber(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => {
        const n = nums.length;
        const expected = (n * (n + 1)) / 2;
        const actual = nums.reduce((a,b) => a+b, 0);
        return expected - actual;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [3, 0, 1];
        else if (tc === 2) nums = [0, 1];
        else if (tc === 3) nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
        else {
          const n = Math.floor(Math.random() * 20) + 5;
          const missing = Math.floor(Math.random() * (n + 1));
          nums = Array.from({ length: n + 1 }, (_, i) => i).filter(x => x !== missing);
          // Shuffle array
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

    case 21: { // Majority Element (LeetCode / CodeChef)
      id = `majority-element-${variation}-${globalIdx}`;
      title = `${globalIdx}. Majority Element Variation ${variation}`;
      baseDescription = `<p>Given an array <code>nums</code> of size <code>n</code>, return the majority element.</p><p>The majority element is the element that appears more than <code>⌊n / 2⌋</code> times. You may assume that the majority element always exists in the array.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i] <= 1000`
      ];
      hints = [
        `You can sort the array. The majority element will always be located at index n / 2.`,
        `Alternatively, look up Boyer-Moore Majority Vote Algorithm which runs in O(N) time and O(1) space.`
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
          if (counts[val] > nums.length / 2) return val;
        }
        return nums[0]; // fallback
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
          nums = Array.from({ length: size }, (_, i) => i < Math.ceil(size / 2) + 1 ? maj : others[i % others.length]);
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

    case 22: { // Search Insert Position (LeetCode)
      id = `search-insert-${variation}-${globalIdx}`;
      title = `${globalIdx}. Search Insert Position Variation ${variation}`;
      baseDescription = `<p>Given a sorted array of distinct integers <code>nums</code> and a target value <code>target</code>, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p>`;
      constraints = [
        `1 <= nums.length <= 100`,
        `-1000 <= nums[i], target <= 1000`,
        `nums is sorted in ascending order.`
      ];
      hints = [
        `Use binary search to achieve O(log n) time complexity.`,
        `Initialize low = 0 and high = nums.length - 1. When low exceeds high, low is the insertion index.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar searchInsert = function(nums, target) {\n    \n};`,
        python: `class Solution(object):\n    def searchInsert(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};`,
        java: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}`
      };

      const solver = (nums, target) => {
        let low = 0, high = nums.length - 1;
        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          if (nums[mid] === target) return mid;
          else if (nums[mid] < target) low = mid + 1;
          else high = mid - 1;
        }
        return low;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 3, 5, 6]; target = 5; }
        else if (tc === 2) { nums = [1, 3, 5, 6]; target = 2; }
        else if (tc === 3) { nums = [1, 3, 5, 6]; target = 7; }
        else {
          nums = Array.from({ length: 15 }, (_, i) => i * 3 + 1);
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

    case 23: { // Length of Last Word (LeetCode)
      id = `length-of-last-word-${variation}-${globalIdx}`;
      title = `${globalIdx}. Length of Last Word Variation ${variation}`;
      baseDescription = `<p>Given a string <code>s</code> consisting of words and spaces, return the length of the last word in the string.</p><p>A word is a maximal substring consisting of non-space characters only.</p>`;
      constraints = [
        `1 <= s.length <= 500`,
        `s consists of only English letters and spaces ' '.`
      ];
      hints = [
        `Trim any trailing spaces from the string first.`,
        `Find the last space character in the trimmed string. The length of the last word is the difference between the string's length and the index of that space.`
      ];
      starterCode = {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLastWord = function(s) {\n    \n};`,
        python: `class Solution(object):\n    def lengthOfLastWord(self, s):\n        \"\"\"\n        :type s: str\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        \n    }\n};`,
        java: `class Solution {\n    public int lengthOfLastWord(String s) {\n        \n    }\n}`
      };

      const solver = (s) => {
        const trimmed = s.trim();
        const lastSpace = trimmed.lastIndexOf(' ');
        return trimmed.length - 1 - lastSpace;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "Hello World";
        else if (tc === 2) s = "   fly me   to   the moon  ";
        else if (tc === 3) s = "luffy is still joyboy";
        else if (tc === 4) s = "a";
        else if (tc === 5) s = "a ";
        // Clean random sentences
        else s = "quick brown fox jumps over " + generateRandomString(Math.floor(Math.random() * 8) + 3);

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

    case 24: { // Single Number (LeetCode / Codeforces)
      id = `single-number-${variation}-${globalIdx}`;
      title = `${globalIdx}. Single Number Variation ${variation}`;
      baseDescription = `<p>Given a non-empty array of integers <code>nums</code>, every element appears twice except for one. Find that single one.</p>`;
      constraints = [
        `1 <= nums.length <= 99`,
        `-1000 <= nums[i] <= 1000`,
        `Every element appears twice except one.`
      ];
      hints = [
        `You can use a hash map or set to count frequencies, but that takes O(N) space.`,
        `Recall that XOR of a number with itself is 0 (x ^ x = 0), and x ^ 0 = x. XORing all elements in the array will yield the single number in O(N) time and O(1) space.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar singleNumber = function(nums) {\n    \n};`,
        python: `class Solution(object):\n    def singleNumber(self, nums):\n        \"\"\"\n        :type nums: List[int]\n        :rtype: int\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};`,
        java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`
      };

      const solver = (nums) => nums.reduce((a,b) => a^b, 0);

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let nums;
        if (tc === 1) nums = [2, 2, 1];
        else if (tc === 2) nums = [4, 1, 2, 1, 2];
        else if (tc === 3) nums = [1];
        else {
          const size = Math.floor(Math.random() * 8) + 3; // odd size
          const oddVal = Math.floor(Math.random() * 100) + 10;
          nums = [oddVal];
          for (let i = 0; i < size; i++) {
            const pairVal = Math.floor(Math.random() * 100) + 200 + i;
            nums.push(pairVal, pairVal);
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

    case 25: { // Plus One (LeetCode)
      id = `plus-one-${variation}-${globalIdx}`;
      title = `${globalIdx}. Plus One Variation ${variation}`;
      baseDescription = `<p>You are given a large integer represented as an integer array <code>digits</code>, where each <code>digits[i]</code> is the <code>i</code>-th digit of the integer.</p><p>The digits are ordered from most significant to least significant in left-to-right order. Increment the large integer by one and return the resulting array of digits.</p>`;
      constraints = [
        `1 <= digits.length <= 20`,
        `0 <= digits[i] <= 9`
      ];
      hints = [
        `Start from the last digit (least significant) and add 1.`,
        `If the digit becomes 10, set it to 0 and carry over 1 to the next digit. If you carry over past the first digit, insert 1 at the beginning of the array.`
      ];
      starterCode = {
        javascript: `/**\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = function(digits) {\n    \n};`,
        python: `class Solution(object):\n    def plusOne(self, digits):\n        \"\"\"\n        :type digits: List[int]\n        :rtype: List[int]\n        \"\"\"\n        `,
        cpp: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};`,
        java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}`
      };

      const solver = (digits) => {
        const res = [...digits];
        for (let i = res.length - 1; i >= 0; i--) {
          if (res[i] < 9) {
            res[i]++;
            return res;
          }
          res[i] = 0;
        }
        res.unshift(1);
        return res;
      };

      for (let tc = 1; tc <= 13; tc++) {
        const isHidden = tc > 3;
        let digits;
        if (tc === 1) digits = [1, 2, 3];
        else if (tc === 2) digits = [4, 3, 2, 1];
        else if (tc === 3) digits = [9];
        else {
          const size = Math.floor(Math.random() * 8) + 4;
          digits = Array.from({ length: size }, () => Math.floor(Math.random() * 9));
          if (Math.random() > 0.5) digits[digits.length - 1] = 9;
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
  description = `<div style="text-align: center; margin-bottom: 20px;">${generateSVG(categoryIdx, variation)}</div>` + buildFullDescription(baseDescription, constraints, publicTestCases);

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

seedCodingProblems();
