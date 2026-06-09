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

    console.log('Generating 1500 coding problems...');
    const problems = [];

    // Define 15 categories, 100 variations each
    for (let categoryIdx = 1; categoryIdx <= 15; categoryIdx++) {
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

      // Generate 13 test cases (3 public, 10 hidden)
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

        // Escape internal double quotes if any
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

        // Escape double quotes just in case
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
  }

  // Compile full description dynamically with examples and constraints
  const publicTestCases = testCases.filter(tc => !tc.isHidden);
  description = buildFullDescription(baseDescription, constraints, publicTestCases);

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
