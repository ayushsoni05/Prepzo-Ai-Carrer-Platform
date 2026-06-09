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

async function seedCodingProblems() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to Database.');

    // Clear existing coding problems
    console.log('Clearing existing coding problems from database...');
    await CodingProblem.deleteMany({});

    console.log('Generating 1000 coding problems...');
    const problems = [];

    // Define 10 categories
    for (let categoryIdx = 1; categoryIdx <= 10; categoryIdx++) {
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
  let description = '';
  let hints = [];
  let starterCode = { javascript: '', python: '', cpp: '', java: '' };
  let testCases = [];

  switch (categoryIdx) {
    case 1: { // Sum Divisible
      const k = variation + 1;
      id = `sum-divisible-by-${k}-${globalIdx}`;
      title = `${globalIdx}. Sum of Elements Divisible by ${k}`;
      description = `
        <p>Given an array of integers <code>nums</code>, return the sum of all elements in the array that are divisible by <code>${k}</code>.</p>
        <p>If no such elements exist, return <code>0</code>.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= nums.length &lt;= 100</code></li>
          <li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
        </ul>
      `;
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

      // Generate 10 test cases
      for (let tc = 1; tc <= 10; tc++) {
        const isHidden = tc > 3;
        // Generate random array input
        let nums;
        if (tc === 1) nums = [k, k * 2, k * 3, 1, 2, 3];
        else if (tc === 2) nums = [1, 2, 3, 5, 7]; // likely 0 sum
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
      description = `
        <p>Given an array of integers <code>nums</code> and a <code>target</code> integer, return the 0-based index of the first occurrence of <code>target</code>.</p>
        <p>If <code>target</code> does not exist in <code>nums</code>, return <code>-1</code>.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= nums.length &lt;= 100</code></li>
          <li><code>-1000 &lt;= nums[i], target &lt;= 1000</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
        const isHidden = tc > 3;
        let nums, target;
        if (tc === 1) { nums = [1, 5, 8, 12, 15]; target = 8; }
        else if (tc === 2) { nums = [1, 5, 8, 12, 15]; target = 100; } // not found
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
      description = `
        <p>Given a string <code>s</code>, count and return the number of occurrences of the character <code>'${targetChar}'</code> in the string.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>0 &lt;= s.length &lt;= 500</code></li>
          <li><code>s</code> consists of lowercase English letters.</li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given an array of integers <code>nums</code>, find and return the maximum value in the array.</p>
        <p>You may assume the array is never empty.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= nums.length &lt;= 100</code></li>
          <li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given a string <code>s</code>, reverse the string, and then return a new string consisting of the reversed string repeated <code>${repeatCount}</code> times.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>0 &lt;= s.length &lt;= 50</code></li>
          <li><code>s</code> consists of lowercase English letters.</li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
        const isHidden = tc > 3;
        let s;
        if (tc === 1) s = "hello";
        else if (tc === 2) s = "a";
        else if (tc === 3) s = "z";
        else s = generateRandomString(Math.floor(Math.random() * 10) + 5);

        const inputStr = `s = "${s}"`;
        const expected = solver(s); // Raw string output matched directly

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
      description = `
        <p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return the count of common elements between the two arrays.</p>
        <p>An element is common if it appears in both arrays. Only count unique common values.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= nums1.length, nums2.length &lt;= 50</code></li>
          <li><code>1 &lt;= nums1[i], nums2[i] &lt;= 100</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given an integer <code>n</code>, calculate the <code>n</code>-th Fibonacci number modulo <code>${modulo}</code>.</p>
        <p>Recall that F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt;= 2.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>0 &lt;= n &lt;= 100</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given two strings <code>s1</code> and <code>s2</code>, check if they are anagrams of each other.</p>
        <p>Return <code>true</code> if they are anagrams, and <code>false</code> otherwise.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= s1.length, s2.length &lt;= 100</code></li>
          <li>Strings consist of lowercase English letters.</li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given two non-negative integers <code>base</code> and <code>exp</code>, return <code>(base ^ exp) % ${modulo}</code>.</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>0 &lt;= base, exp &lt;= 1000</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
      description = `
        <p>Given two positive integers <code>low</code> and <code>high</code>, count and return the number of prime numbers in the range <code>[low, high]</code> (inclusive).</p>
        <p>&nbsp;</p>
        <strong>Constraints:</strong>
        <ul>
          <li><code>1 &lt;= low &lt;= high &lt;= 500</code></li>
        </ul>
      `;
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

      for (let tc = 1; tc <= 10; tc++) {
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
  }

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
