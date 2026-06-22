import { showSuccess, showError, showInfo } from '@/utils/toastManager';
import toast from 'react-hot-toast';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { ENV } from '../../config/env';
// --- Local definitions for missing types ---
import { 
  TestAnalysisResult 
} from '@/data/intelligentAIEngine';
import Editor from '@monaco-editor/react';
import { generateTranspiledPayload } from '@/utils/generateTranspiledPayload';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  explanation?: string;
  skillTags?: string[];
  companyAskedIn?: string;
  section?: string;
  // Coding specific
  type?: 'mcq' | 'coding' | 'short_answer';
  title?: string;
  description?: string;
  starterCode?: Record<string, string>;
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  hiddenTestCases?: { id?: string; input: string; expectedOutput: string; isHidden?: boolean }[];
  expectedComplexity?: { time: string; space: string };
}

const FALLBACK_CODING_QUESTIONS: Question[] = [
  {
    id: "two-sum-fallback",
    type: "coding",
    title: "Two Sum",
    question: "Find two numbers in an array that add up to a target.",
    difficulty: "easy",
    options: [],
    correct: -1,
    description: `
      <div style="text-align: center; margin-bottom: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 120" width="100%" style="max-width: 450px; display: inline-block;">
          <rect width="100%" height="100%" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
          <text x="20" y="30" fill="#0F172A" font-family="sans-serif" font-size="12" font-weight="bold">Target = 9</text>
          <g transform="translate(30, 50)">
            <g transform="translate(0, 0)">
              <rect width="45" height="40" rx="6" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="2"/>
              <text x="22.5" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">2</text>
              <text x="22.5" y="55" text-anchor="middle" fill="#10B981" font-family="sans-serif" font-size="9" font-weight="bold">Idx 0</text>
            </g>
            <g transform="translate(60, 0)">
              <rect width="45" height="40" rx="6" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="2"/>
              <text x="22.5" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">7</text>
              <text x="22.5" y="55" text-anchor="middle" fill="#10B981" font-family="sans-serif" font-size="9" font-weight="bold">Idx 1</text>
            </g>
            <g transform="translate(120, 0)">
              <rect width="45" height="40" rx="6" fill="transparent" stroke="#94A3B8" stroke-width="1.5"/>
              <text x="22.5" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">11</text>
              <text x="22.5" y="55" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="9" font-weight="bold">Idx 2</text>
            </g>
            <g transform="translate(180, 0)">
              <rect width="45" height="40" rx="6" fill="transparent" stroke="#94A3B8" stroke-width="1.5"/>
              <text x="22.5" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">15</text>
              <text x="22.5" y="55" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="9" font-weight="bold">Idx 3</text>
            </g>
            <path d="M 22.5 -5 L 50 -15 L 82.5 -5" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4"/>
            <text x="52" y="-20" text-anchor="middle" fill="#F59E0B" font-family="sans-serif" font-size="10" font-weight="bold">Sum = 9</text>
          </g>
        </svg>
      </div>
      <div>
        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
        <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
        <p>You can return the answer in any order.</p>
      </div>
    `,
    starterCode: {
      javascript: `function solve(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def solve(self, nums: List[int], target: int) -> List[int]:\n        dct = {}\n        for i, x in enumerate(nums):\n            diff = target - x\n            if diff in dct: return [dct[diff], i]\n            dct[x] = i\n        return []`,
      cpp: `class Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (mp.count(diff)) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `import java.util.*;\nclass Solution {\n    public int[] solve(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`
    },
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    hiddenTestCases: [
      { id: "tc1", input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isHidden: false },
      { id: "tc2", input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isHidden: false },
      { id: "tc3", input: "nums = [3,3], target = 6", expectedOutput: "[0,1]", isHidden: false },
      { id: "tc4", input: "nums = [1,5,10,25], target = 35", expectedOutput: "[2,3]", isHidden: true },
      { id: "tc5", input: "nums = [5,25,75], target = 100", expectedOutput: "[1,2]", isHidden: true },
      { id: "tc6", input: "nums = [-1,-2,-3,-4,-5], target = -8", expectedOutput: "[2,4]", isHidden: true },
      { id: "tc7", input: "nums = [0,4,3,0], target = 0", expectedOutput: "[0,3]", isHidden: true },
      { id: "tc8", input: "nums = [10,20,30,40,50,60,70,80,90,100], target = 150", expectedOutput: "[5,8]", isHidden: true }
    ]
  },
  {
    id: "palindrome-check-fallback",
    type: "coding",
    title: "Palindrome Number",
    question: "Determine whether an integer is a palindrome.",
    difficulty: "easy",
    options: [],
    correct: -1,
    description: `
      <div style="text-align: center; margin-bottom: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="100%" style="max-width: 400px; display: inline-block;">
          <rect width="100%" height="100%" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
          <text x="20" y="25" fill="#0F172A" font-family="sans-serif" font-size="12" font-weight="bold">Input: 121 (True)</text>
          <g transform="translate(100, 45)">
            <circle cx="20" cy="20" r="18" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="2"/>
            <text x="20" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">1</text>
            <circle cx="70" cy="20" r="18" fill="transparent" stroke="#94A3B8" stroke-width="1.5"/>
            <text x="70" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">2</text>
            <circle cx="120" cy="20" r="18" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="2"/>
            <text x="120" y="25" text-anchor="middle" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">1</text>
            <path d="M 20 42 A 50 30 0 0 0 120 42" fill="none" stroke="#10B981" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="70" y="65" text-anchor="middle" fill="#10B981" font-family="sans-serif" font-size="9" font-weight="bold">Symmetric</text>
          </g>
        </svg>
      </div>
      <div>
        <p>Given an integer <code>x</code>, return <code>true</code><em> if </em><code>x</code><em> is a </em><strong><em>palindrome</em></strong><code>x</code><em>, and </em><code>false</code><em> otherwise</em>.</p>
        <p>An integer is a palindrome when it reads the same backward as forward. For example, 121 is a palindrome while 123 is not.</p>
      </div>
    `,
    starterCode: {
      javascript: `function solve(x) {\n    if (x < 0) return false;\n    let temp = x, rev = 0;\n    while (temp > 0) {\n        rev = rev * 10 + (temp % 10);\n        temp = Math.floor(temp / 10);\n    }\n    return x === rev;\n}`,
      python: `class Solution:\n    def solve(self, x: int) -> bool:\n        if x < 0: return False\n        return str(x) == str(x)[::-1]`,
      cpp: `class Solution {\npublic:\n    bool solve(int x) {\n        if (x < 0) return false;\n        long long rev = 0, temp = x;\n        while (temp > 0) {\n            rev = rev * 10 + (temp % 10);\n            temp /= 10;\n        }\n        return x == rev;\n    }\n};`,
      java: `class Solution {\n    public boolean solve(int x) {\n        if (x < 0) return false;\n        long rev = 0, temp = x;\n        while (temp > 0) {\n            rev = rev * 10 + (temp % 10);\n            temp /= 10;\n        }\n        return x == rev;\n    }\n}`
    },
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." }
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    hiddenTestCases: [
      { id: "tc1", input: "x = 121", expectedOutput: "true", isHidden: false },
      { id: "tc2", input: "x = -121", expectedOutput: "false", isHidden: false },
      { id: "tc3", input: "x = 10", expectedOutput: "false", isHidden: false },
      { id: "tc4", input: "x = 0", expectedOutput: "true", isHidden: true },
      { id: "tc5", input: "x = 12321", expectedOutput: "true", isHidden: true },
      { id: "tc6", input: "x = 9999", expectedOutput: "true", isHidden: true },
      { id: "tc7", input: "x = 123456", expectedOutput: "false", isHidden: true }
    ]
  },
  {
    id: "reverse-integer-fallback",
    type: "coding",
    title: "Reverse Integer",
    question: "Reverse digits of a 32-bit signed integer.",
    difficulty: "medium",
    options: [],
    correct: -1,
    description: `
      <div style="text-align: center; margin-bottom: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="100%" style="max-width: 400px; display: inline-block;">
          <rect width="100%" height="100%" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
          <text x="20" y="30" fill="#0F172A" font-family="sans-serif" font-size="12" font-weight="bold">Input: 123</text>
          <path d="M 120 25 L 180 25" stroke="#64748B" stroke-width="2" marker-end="url(#arrow)"/>
          <text x="220" y="30" fill="#10B981" font-family="sans-serif" font-size="14" font-weight="bold">Output: 321</text>
        </svg>
      </div>
      <div>
        <p>Given a signed 32-bit integer <code>x</code>, return <code>x</code><em> with its digits reversed</em>.</p>
        <p>If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, then return <code>0</code>.</p>
      </div>
    `,
    starterCode: {
      javascript: `function solve(x) {\n    const limit = Math.pow(2, 31);\n    const k = x < 0 ? -1 : 1;\n    const n = Math.abs(x);\n    const rev = parseInt(String(n).split('').reverse().join('')) * k;\n    if (rev < -limit || rev >= limit) return 0;\n    return rev;\n}`,
      python: `class Solution:\n    def solve(self, x: int) -> int:\n        limit = 2**31\n        k = -1 if x < 0 else 1\n        rev = int(str(abs(x))[::-1]) * k\n        if rev < -limit or rev >= limit: return 0\n        return rev`,
      cpp: `class Solution {\npublic:\n    int solve(int x) {\n        long long rev = 0;\n        while (x != 0) {\n            rev = rev * 10 + (x % 10);\n            x /= 10;\n        }\n        if (rev < INT_MIN || rev > INT_MAX) return 0;\n        return rev;\n    }\n};`,
      java: `class Solution {\n    public int solve(int x) {\n        long rev = 0;\n        while (x != 0) {\n            rev = rev * 10 + (x % 10);\n            x /= 10;\n        }\n        if (rev < Integer.MIN_VALUE || rev > Integer.MAX_VALUE) return 0;\n        return (int)rev;\n    }\n}`
    },
    examples: [
      { input: "x = 123", output: "321" },
      { input: "x = -123", output: "-321" }
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    hiddenTestCases: [
      { id: "tc1", input: "x = 123", expectedOutput: "321", isHidden: false },
      { id: "tc2", input: "x = -123", expectedOutput: "-321", isHidden: false },
      { id: "tc3", input: "x = 120", expectedOutput: "21", isHidden: false },
      { id: "tc4", input: "x = 1534236469", expectedOutput: "0", isHidden: true },
      { id: "tc5", input: "x = -2147483648", expectedOutput: "0", isHidden: true },
      { id: "tc6", input: "x = 9", expectedOutput: "9", isHidden: true }
    ]
  },
  {
    id: "container-water-fallback",
    type: "coding",
    title: "Container With Most Water",
    question: "Find two lines that contain the most water.",
    difficulty: "hard",
    options: [],
    correct: -1,
    description: `
      <div style="text-align: center; margin-bottom: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="100%" style="max-width: 400px; display: inline-block;">
          <rect width="100%" height="100%" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
          <line x1="50" y1="100" x2="50" y2="40" stroke="#0F172A" stroke-width="6"/>
          <line x1="90" y1="100" x2="90" y2="20" stroke="#0F172A" stroke-width="6"/>
          <line x1="130" y1="100" x2="130" y2="70" stroke="#0F172A" stroke-width="6"/>
          <line x1="170" y1="100" x2="170" y2="20" stroke="#0F172A" stroke-width="6"/>
          <rect x="93" y="20" width="74" height="80" fill="rgba(59,130,246,0.3)" stroke="#3B82F6" stroke-dasharray="2"/>
          <text x="130" y="60" text-anchor="middle" fill="#3B82F6" font-family="sans-serif" font-size="10" font-weight="bold">Water = 80</text>
        </svg>
      </div>
      <div>
        <p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
        <p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
        <p>Return <em>the maximum amount of water a container can store</em>.</p>
      </div>
    `,
    starterCode: {
      javascript: `function solve(height) {\n    let l = 0, r = height.length - 1, maxArea = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        maxArea = Math.max(maxArea, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxArea;\n}`,
      python: `class Solution:\n    def solve(self, height: List[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_area = 0\n        while l < r:\n            h = min(height[l], height[r])\n            max_area = max(max_area, h * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_area`,
      cpp: `class Solution {\npublic:\n    int solve(vector<int>& height) {\n        int l = 0, r = height.size() - 1, max_area = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            max_area = max(max_area, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return max_area;\n    }\n};`,
      java: `class Solution {\n    public int solve(int[] height) {\n        int l = 0, r = height.length - 1, maxArea = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            maxArea = Math.max(maxArea, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxArea;\n    }\n}`
    },
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area is between index 1 and index 8, height is min(8, 7) = 7, width is 8 - 1 = 7. Area = 7 * 7 = 49." },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    hiddenTestCases: [
      { id: "tc1", input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false },
      { id: "tc2", input: "height = [1,1]", expectedOutput: "1", isHidden: false },
      { id: "tc3", input: "height = [4,3,2,1,4]", expectedOutput: "16", isHidden: true },
      { id: "tc4", input: "height = [1,2,1]", expectedOutput: "2", isHidden: true },
      { id: "tc5", input: "height = [2,3,4,5,18,17,6]", expectedOutput: "17", isHidden: true }
    ]
  }
];

interface Section {
  id: string;
  name: string;
  icon: string;
  timeLimit: number;
  questions: Question[];
}

interface Violation {
  type: string;
  description: string;
  severity: string;
}

// Use real question bank configuration and helper
// Test configuration is provided by AI service; do not use local question bank

// Helper to get field-specific sections for assessment
function getSectionsByField(field: string): Section[] {
  const f = (field || '').toLowerCase();
  
  // Computer Science / IT / Software / CSE
  // Section names MUST match backend STREAM_SECTIONS keys exactly
  if (f.includes('computer') || f.includes('software') || f.includes('cse') || f.includes('it') || f.includes('info') || f.includes('bca') || f.includes('mca') || f.includes('csc')) {
    return [
      { id: 'cs-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'cs-dsa', name: 'DSA', icon: '🌳', timeLimit: 25, questions: [] },
      { id: 'cs-dbms', name: 'DBMS', icon: '🗄️', timeLimit: 25, questions: [] },
      { id: 'cs-os', name: 'OS', icon: '⚙️', timeLimit: 25, questions: [] },
      { id: 'cs-cn', name: 'CN', icon: '🌐', timeLimit: 25, questions: [] },
      { id: 'cs-oops', name: 'OOPS', icon: '🔷', timeLimit: 25, questions: [] },
    ];
  }

  // Electronics / ECE / EEE / Instrumentation / Electrical
  if (f.includes('electronics') || f.includes('electrical') || f.includes('ece') || f.includes('eee') || f.includes('instrumentation')) {
    return [
      { id: 'ece-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'ece-circuits', name: 'Circuits', icon: '⚡', timeLimit: 25, questions: [] },
      { id: 'ece-machines', name: 'Machines', icon: '📟', timeLimit: 25, questions: [] },
      { id: 'ece-electronics', name: 'Electronics', icon: '🔌', timeLimit: 25, questions: [] },
      { id: 'ece-embedded', name: 'Embedded', icon: '💾', timeLimit: 25, questions: [] },
      { id: 'ece-signals', name: 'Signals', icon: '📉', timeLimit: 25, questions: [] },
    ];
  }

  // Mechanical / Automobile
  if (f.includes('mechanical') || f.includes('automobile') || f.includes('prod') || f.includes('mech')) {
    return [
      { id: 'mech-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'mech-thermo', name: 'Thermodynamics', icon: '🔥', timeLimit: 25, questions: [] },
      { id: 'mech-mechanics', name: 'Mechanics', icon: '⚙️', timeLimit: 25, questions: [] },
      { id: 'mech-manu', name: 'Manufacturing', icon: '🏭', timeLimit: 25, questions: [] },
      { id: 'mech-design', name: 'Design', icon: '🏗️', timeLimit: 25, questions: [] },
    ];
  }

  // Civil Engineering
  if (f.includes('civil')) {
    return [
      { id: 'civil-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'civil-struct', name: 'Structures', icon: '🏗️', timeLimit: 25, questions: [] },
      { id: 'civil-geotech', name: 'Geotechnical', icon: '🌍', timeLimit: 25, questions: [] },
      { id: 'civil-hydraulics', name: 'Hydraulics', icon: '💧', timeLimit: 25, questions: [] },
      { id: 'civil-survey', name: 'Surveying', icon: '🗺️', timeLimit: 25, questions: [] },
    ];
  }

  // Management / MBA / BBA / PGDM
  if (f.includes('manage') || f.includes('business') || f.includes('mba') || f.includes('bba') || f.includes('pgdm')) {
    return [
      { id: 'mgmt-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'mgmt-marketing', name: 'Marketing', icon: '🎨', timeLimit: 25, questions: [] },
      { id: 'mgmt-finance', name: 'Finance', icon: '💰', timeLimit: 25, questions: [] },
      { id: 'mgmt-hr', name: 'HR', icon: '👥', timeLimit: 25, questions: [] },
      { id: 'mgmt-ops', name: 'Ops', icon: '📦', timeLimit: 25, questions: [] },
      { id: 'mgmt-strategy', name: 'Strategy', icon: '♟️', timeLimit: 25, questions: [] },
    ];
  }
  
  // Commerce / Accounting
  if (f.includes('commer') || f.includes('bcom') || f.includes('account') || f.includes('taxation') || f.includes('finan')) {
    return [
      { id: 'com-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'com-accounting', name: 'Accounting', icon: '📊', timeLimit: 25, questions: [] },
      { id: 'com-taxation', name: 'Taxation', icon: '💰', timeLimit: 25, questions: [] },
      { id: 'com-economics', name: 'Economics', icon: '📈', timeLimit: 25, questions: [] },
      { id: 'com-law', name: 'Law', icon: '⚖️', timeLimit: 25, questions: [] },
    ];
  }

  // IoT / Robotics / Mechatronics
  if (f.includes('iot') || f.includes('robotics') || f.includes('mechatronics')) {
    return [
      { id: 'iot-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'iot-sensors', name: 'Sensors', icon: '🌡️', timeLimit: 25, questions: [] },
      { id: 'iot-connectivity', name: 'Connectivity', icon: '📶', timeLimit: 25, questions: [] },
      { id: 'iot-protocols', name: 'Protocols', icon: '🔗', timeLimit: 25, questions: [] },
      { id: 'iot-robotics', name: 'Robotics', icon: '🤖', timeLimit: 25, questions: [] },
      { id: 'iot-security', name: 'Security', icon: '🔒', timeLimit: 25, questions: [] },
    ];
  }

  // Science / BSc / MSc
  if (f.includes('bsc') || f.includes('msc') || f.includes('science') || f.includes('physics') || f.includes('chemistry') || f.includes('biology') || f.includes('math')) {
    return [
      { id: 'sci-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'sci-core', name: 'CoreScience', icon: '🔬', timeLimit: 25, questions: [] },
      { id: 'sci-applied', name: 'AppliedScience', icon: '🧪', timeLimit: 25, questions: [] },
      { id: 'sci-data', name: 'Data', icon: '📊', timeLimit: 25, questions: [] },
    ];
  }

  // Arts / Humanities / BA / MA
  if (f.includes('ba') || f.includes('ma') || f.includes('arts') || f.includes('humanities') || f.includes('sociology') || f.includes('psychology') || f.includes('history')) {
    return [
      { id: 'arts-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
      { id: 'arts-humanities', name: 'Humanities', icon: '📖', timeLimit: 25, questions: [] },
      { id: 'arts-expression', name: 'Expression', icon: '✍️', timeLimit: 25, questions: [] },
      { id: 'arts-social', name: 'Social', icon: '🌍', timeLimit: 25, questions: [] },
    ];
  }

  // Default Fallback (General Tech — matches backend 'computer_science')
  return [
    { id: 'gen-aptitude', name: 'Aptitude', icon: '🧮', timeLimit: 25, questions: [] },
    { id: 'gen-dsa', name: 'DSA', icon: '🌳', timeLimit: 25, questions: [] },
    { id: 'gen-dbms', name: 'DBMS', icon: '🗄️', timeLimit: 25, questions: [] },
    { id: 'gen-os', name: 'OS', icon: '⚙️', timeLimit: 25, questions: [] },
    { id: 'gen-cn', name: 'CN', icon: '🌐', timeLimit: 25, questions: [] },
    { id: 'gen-oops', name: 'OOPS', icon: '🔷', timeLimit: 25, questions: [] },
  ];
}

// Build minimal test config from user profile for AI generator
function buildTestConfig(user: any, testMode?: 'field' | 'skills') {
  const field = user?.fieldOfStudy || user?.stream || 'Computer Science';
  
  let sections: Section[] = [];
  
  if (testMode === 'skills') {
    // Stage 2: Build sections from user's known technologies
    const skills = user?.knownTechnologies || [];
    sections = skills.map((skill: string) => ({
      id: `skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: skill,
      icon: '📋', // Placeholder icon, will be updated by getSectionIcon in component
      timeLimit: 15, // 15 mins per skill in Stage 2
      questions: []
    }));
    
    // If no skills, fallback to a general section to avoid empty UI
    if (sections.length === 0) {
      sections = [{ id: 'skill-general', name: 'General Technical', icon: '💡', timeLimit: 25, questions: [] }];
    }
  } else {
    // Stage 1 (Default): Build sections from domain field
    sections = getSectionsByField(field);
  }

  // Always append Coding Challenges section
  sections.push({
    id: 'coding_section',
    name: 'Coding Challenges',
    icon: '💻',
    timeLimit: 40, // 40 minutes
    questions: []
  });

  const totalTime = sections.reduce((acc, s) => acc + s.timeLimit, 0);

  return {
    questionsPerSection: testMode === 'skills' ? 10 : 20, 
    totalTime: totalTime,
    includeInterviewLevel: true,
    includeAssessmentLevel: true,
    targetRole: user?.targetRole || 'Software Engineer',
    fieldOfStudy: field,
    field: field,
    degree: user?.degree || 'B.Tech',
    skillRatings: user?.skillRatings || {},
    knownTechnologies: user?.knownTechnologies || [],
    company: undefined,
    sections: sections,
  };
}

// Import React hooks and AnswerReviewPanel
import { useState, useEffect, useRef, useCallback, memo } from 'react';

// --- Sub-components for Performance Optimization ---

const TimerDisplay = memo(({ seconds, label, className }: { seconds: number; label: string; className?: string }) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  return (
    <div className={cn("flex flex-col font-rubik", className)}>
      <span className="text-[10px] font-[900] text-indigo-600 uppercase tracking-[0.4em] italic mb-1">{label}</span>
      <span className={cn(
        "font-[900] text-2xl md:text-5xl tracking-tighter italic leading-none transition-colors duration-300",
        seconds < 60 && label.includes('Expiry') ? "text-red-500" : "text-slate-800"
      )}>
        {timeStr}
      </span>
    </div>
  );
});

const LANGUAGES = [
  { id: 'python', name: 'Python 3' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' }
];

interface CodingAreaProps {
  currentQuestion: Question;
  currentSection: any;
  onAnswer: (id: string, code: string, language: string, testResults?: any) => void;
  onNavigate: (idx: number) => void;
  questionIndex: number;
}

const CodingArea = memo(({
  currentQuestion,
  currentSection,
  onAnswer,
  onNavigate,
  questionIndex
}: CodingAreaProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  
  // Track student code for each question and language
  const [codeMap, setCodeMap] = useState<Record<string, Record<string, string>>>({});
  
  // Console state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [runStatus, setRunStatus] = useState<string>('idle'); // idle, running, accepted, failed, error

  // Get current code
  const currentCode = codeMap[currentQuestion.id]?.[selectedLanguage] || 
    currentQuestion.starterCode?.[selectedLanguage] || 
    (selectedLanguage === 'python' ? 'class Solution:\n    def solve(self, nums):\n        pass' : 'function solve() {\n\n}');

  // Update code map
  const handleCodeChange = (newCode: string) => {
    setCodeMap(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {}),
        [selectedLanguage]: newCode
      }
    }));
    
    // Save to testState answers
    onAnswer(currentQuestion.id, newCode, selectedLanguage);
  };

  // Switch language
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
  };

  // Run Code (against visible or all test cases)
  const runCode = async (isSubmit: boolean = false) => {
    if (isRunning || isSubmitting) return;
    
    if (isSubmit) {
      setIsSubmitting(true);
      setRunStatus('submitting');
    } else {
      setIsRunning(true);
      setRunStatus('running');
    }
    
    setConsoleOutput('Preparing environment and executing code...');
    setTestResults([]);
    setShowConsole(true);
    
    try {
      const allTestCases = currentQuestion.hiddenTestCases || [];
      const testCasesToRun = isSubmit 
        ? allTestCases 
        : allTestCases.filter(tc => !tc.isHidden);
        
      if (testCasesToRun.length === 0) {
        throw new Error('No test cases defined for this problem.');
      }
      
      const wrapperCode = generateTranspiledPayload(selectedLanguage, currentCode, testCasesToRun);
      
      const langMap: Record<string, number> = {
        javascript: 63,
        python: 71,
        cpp: 54,
        java: 62
      };
      
      const res = await fetch(`${ENV.JUDGE0_URL}?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language_id: langMap[selectedLanguage] || 71,
          source_code: wrapperCode
        })
      });
      
      const data = await res.json();
      
      let output = '';
      if (data.stdout) output = data.stdout;
      else if (data.stderr) output = data.stderr;
      else if (data.compile_output) output = data.compile_output;
      else if (data.message) output = data.message;
      
      setConsoleOutput(output);
      
      const outputs = output.split('---SPLIT---').slice(1).map((s: string) => s.trim());
      
      let passedCount = 0;
      const results = testCasesToRun.map((tc, idx) => {
        const outStr = outputs.length > 0 ? (outputs[idx] || 'undefined') : output.trim();
        // Simple normalization for evaluation
        const normOut = outStr.replace(/\s+/g, '').toLowerCase();
        const normExp = tc.expectedOutput.replace(/\s+/g, '').toLowerCase();
        const passed = outputs.length > 0 && normOut === normExp;
        if (passed) passedCount++;
        
        return {
          id: tc.id || `tc_${idx}`,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: outStr,
          passed,
          isHidden: tc.isHidden
        };
      });
      
      setTestResults(results);
      
      const score = Math.round((passedCount / testCasesToRun.length) * 100);
      const isAllPassed = passedCount === testCasesToRun.length;
      
      if (isAllPassed) {
        setRunStatus('accepted');
        showSuccess(isSubmit ? '🎉 Accepted! All test cases passed!' : '✅ All visible test cases passed!');
      } else {
        setRunStatus('failed');
        showError(`❌ Passed ${passedCount}/${testCasesToRun.length} test cases.`);
      }
      
      // Save results
      onAnswer(currentQuestion.id, currentCode, selectedLanguage, {
        passed: isAllPassed,
        score,
        passedTestCases: passedCount,
        totalTestCases: testCasesToRun.length
      });
      
    } catch (e: any) {
      console.error(e);
      setConsoleOutput(`Error: ${e.message}`);
      setRunStatus('error');
      showError('Execution failed: ' + e.message);
    } finally {
      setIsRunning(false);
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="relative bg-white rounded-[32px] border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-100 flex flex-col min-h-[75vh]">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 p-6 gap-4 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[16px] bg-white border border-slate-200 flex items-center justify-center shadow-sm">
            <span className="text-2xl">{currentSection.section.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              {currentQuestion.companyAskedIn && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  @{currentQuestion.companyAskedIn}
                </span>
              )}
            </div>
            <h3 className="text-xl font-[900] text-slate-800 uppercase tracking-tight italic mt-1">
              {currentQuestion.title || 'Coding Challenge'}
            </h3>
          </div>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          {currentSection.questions.map((q: any, idx: number) => {
            const isCurrent = idx === questionIndex;
            const ans = currentSection.answers[q.id];
            const isAnswered = ans !== undefined && (typeof ans === 'string' || (typeof ans === 'object' && ans.code));
            return (
              <button
                key={q.id}
                onClick={() => onNavigate(idx)}
                className={`w-8 h-8 rounded-xl text-[11px] font-black transition-all border ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-110'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-slate-100 text-slate-400 border-transparent hover:border-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[500px]">
        {/* Left Side: Problem Description */}
        <div className="flex-1 p-6 overflow-y-auto border-r border-slate-100 space-y-6 max-h-[550px] lg:max-h-none">
          {/* Problem Statement */}
          <div 
            className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentQuestion.description || currentQuestion.question }}
          />

          {/* Constraints */}
          {currentQuestion.constraints && currentQuestion.constraints.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Constraints</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 font-mono">
                {currentQuestion.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Complexity Targets */}
          {currentQuestion.expectedComplexity && (
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Target Complexity</h4>
              <div className="flex gap-4 text-xs font-mono">
                <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600">
                  Time: <span className="font-bold text-slate-800">{currentQuestion.expectedComplexity.time}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600">
                  Space: <span className="font-bold text-slate-800">{currentQuestion.expectedComplexity.space}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
          {/* Editor Sub-Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-white">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" /> Editor Console
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[300px] border-b border-slate-100 relative bg-white">
            <Editor
              height="100%"
              language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage}
              theme="vs"
              value={currentCode}
              onChange={(val) => handleCodeChange(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                lineNumbers: 'on',
                scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
                cursorBlinking: 'smooth',
                padding: { top: 12 }
              }}
            />
          </div>

          {/* Action Control Panel */}
          <div className="p-4 bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowConsole(prev => !prev)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Terminal className="w-4 h-4" /> {showConsole ? 'Hide Console' : 'Show Console'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => runCode(false)}
                  disabled={isRunning || isSubmitting}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-wider rounded-xl text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isRunning ? <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> : <Play className="w-3.5 h-3.5 fill-slate-700 stroke-none" />}
                  Run Code
                </button>

                <button
                  onClick={() => runCode(true)}
                  disabled={isRunning || isSubmitting}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-wider rounded-xl text-xs transition-colors disabled:opacity-50 shadow-md shadow-emerald-100 flex items-center gap-1.5"
                >
                  {isSubmitting ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  Submit Code
                </button>
              </div>
            </div>

            {/* Console Output Drawer */}
            {showConsole && (
              <div className="bg-slate-900 rounded-2xl p-5 text-xs text-slate-300 font-mono space-y-4 max-h-[220px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Execution Details</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    runStatus === 'accepted' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    runStatus === 'failed' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                    runStatus === 'running' || runStatus === 'submitting' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {runStatus.toUpperCase()}
                  </span>
                </div>

                {/* Outputs & Test Case Details */}
                {testResults.length > 0 ? (
                  <div className="space-y-3">
                    {testResults.map((tr, i) => (
                      <div key={tr.id} className={`p-3 rounded-xl border ${tr.passed ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-rose-950/20 border-rose-900/30'}`}>
                        <div className="flex items-center justify-between font-bold mb-2">
                          <span className={tr.passed ? 'text-emerald-400' : 'text-rose-400'}>
                            Test Case {i + 1} {tr.isHidden ? '(Hidden)' : ''}: {tr.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        {!tr.isHidden && (
                          <div className="space-y-1 text-slate-400 text-[11px]">
                            <div>Input: <code className="text-slate-200">{tr.input}</code></div>
                            <div>Expected: <code className="text-emerald-400">{tr.expected}</code></div>
                            <div>Actual: <code className={tr.passed ? 'text-emerald-400' : 'text-rose-400'}>{tr.actual}</code></div>
                          </div>
                        )}
                        {tr.isHidden && (
                          <div className="text-slate-500 text-[11px] italic">
                            [Hidden inputs and outputs are obscured for test integrity]
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 break-words">{consoleOutput}</pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const QuestionArea = memo(({ 
  currentQuestion, 
  currentSection, 
  onAnswer, 
  onNavigate,
  questionIndex 
}: { 
  currentQuestion: Question; 
  currentSection: any; 
  onAnswer: (id: string, idx: number) => void; 
  onNavigate: (idx: number) => void;
  questionIndex: number;
}) => (
  <div className="relative bg-white rounded-[50px] p-10 md:p-16 border border-slate-200/80 overflow-hidden group font-rubik shadow-xl shadow-slate-100">
    {/* Console Accents */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-[24px] bg-slate-50 border border-slate-200 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-sm">
            <span className="text-3xl md:text-4xl">{currentSection.section.icon}</span>
        </div>
        <div className="flex flex-col">
           <span className="text-[10px] font-[900] text-indigo-600 uppercase tracking-[0.5em] italic mb-1 opacity-70">Operational Module</span>
           <span className="text-xl md:text-3xl font-[900] text-slate-800 uppercase italic tracking-tight">{currentSection.section.name}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[10px] font-[900] text-slate-400 uppercase tracking-[0.5em] italic mb-1 block">Vector Probe</span>
        <p className="text-xl md:text-3xl font-[900] text-slate-800 uppercase tracking-tighter">
            PROBE {questionIndex + 1} <span className="text-indigo-600">/ {currentSection.questions.length}</span>
        </p>
      </div>
    </div>

    <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden mb-12">
      <motion.div 
        className="h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
        initial={{ width: 0 }}
        animate={{ width: `${((questionIndex + 1) / currentSection.questions.length) * 100}%` }}
        transition={{ type: "spring", stiffness: 40 }}
      />
    </div>

    <div className="flex flex-wrap gap-3 mb-12">
      {currentQuestion.companyAskedIn && (
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
          <Target size={14} className="text-indigo-600" />
          <span className="text-[10px] font-[900] text-slate-500 uppercase tracking-[0.2em] italic">
            SIGNAL DETECTED AT {currentQuestion.companyAskedIn}
          </span>
        </div>
      )}
       <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
          <Award size={14} className="text-slate-400" />
          <span className="text-[10px] font-[900] text-slate-500 uppercase tracking-[0.2em] italic">
             COMPLEXITY: {currentQuestion.difficulty}
          </span>
        </div>
    </div>

    <h3 className="text-2xl md:text-5xl font-[900] text-slate-800 uppercase tracking-tighter leading-[1.1] mb-16 italic opacity-95">
      {currentQuestion.question}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
      {currentQuestion.options.map((option, idx) => {
        const isSelected = currentSection.answers[currentQuestion.id] === idx;
        return (
          <button
            key={idx}
            onClick={() => onAnswer(currentQuestion.id, idx)}
            className={`group/opt relative p-7 md:p-10 rounded-[28px] text-left transition-all duration-300 border ${
              isSelected
                ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]'
                : 'bg-white border-slate-200 hover:border-indigo-400/80 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-6">
              <span className={`flex items-center justify-center w-10 h-10 rounded-xl text-[14px] font-[900] transition-colors ${
                isSelected
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={`text-[16px] md:text-[20px] font-bold italic leading-tight ${
                isSelected ? 'text-white' : 'text-slate-700 group-hover/opt:text-slate-900'
              }`}>
                {option}
              </span>
            </div>
          </button>
        );
      })}
    </div>

    <div className="flex flex-wrap gap-3 p-8 rounded-[32px] bg-slate-50 border border-slate-200">
      {currentSection.questions.map((q: any, idx: number) => {
        const isCurrent = idx === questionIndex;
        const isAnswered = currentSection.answers[q.id] !== undefined;
        return (
          <button
            key={q.id}
            onClick={() => onNavigate(idx)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-[12px] font-[900] transition-all border ${
              isCurrent
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 scale-125'
                : isAnswered
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
            }`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  </div>
));

import AnswerReviewPanel from '@/components/assessment/AnswerReviewPanel';
import { getFallbackByField, getFallbackBySkills } from '@/data/fallbackQuestions';
import { useProctoring } from '@/hooks/useProctoring';
import { motion } from 'framer-motion';
// import toast from 'react-hot-toast'; (duplicate removed)
// Inline missing types for questionApi and related
interface SubmitAnswer {
  questionId: string;
  selectedOption: number;
  timeSpent: number;
}

interface APIQuestion {
  _id: string;
  questionText: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  explanation?: string;
  difficulty: string;
  weight?: number;
}

interface TestConfig {
  targetRole: string;
  fieldOfStudy: string;
  field: string;
  questionsPerSection: number;
  totalTime?: number; // minutes
  includeInterviewLevel?: boolean;
  includeAssessmentLevel?: boolean;
  sections: Section[];
  degree?: string;
}

interface GeneratedTest {
  test: {
    testId: string;
    sections: Array<{
      section: string;
      sectionTime: number;
      questions: APIQuestion[];
    }>;
  };
}

// questionApi implementation: calls backend AI test generation
const questionApi = {
  generateTest: async (config: TestConfig): Promise<GeneratedTest> => {
    const token = localStorage.getItem('prepzo-token');
    const headers: any = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const resp = await api.post('/ai-test/generate', { testConfig: config }, { headers, timeout: 60000 });
    // Backend returns { success: true, data: { sessionId, testId, test } }
    const data = resp.data?.data || resp.data;
    return { test: data.test, sessionId: data.sessionId, testId: data.testId } as any;
  },
  submitTest: async (_: any) => ({ recommendations: [] }),
};

import { useAuthStore } from '@/store/authStore';
// import toast from 'react-hot-toast';
import api from '@/api/axios';
import { 
  Target, Shield, Clock, AlertTriangle, ChevronRight, ChevronLeft, 
  CheckCircle, Camera, Mic, Award, Maximize, Play, Monitor, XCircle, BookOpen, 
  TrendingUp, TrendingDown, Terminal, Check
} from 'lucide-react';
import ThinkingLoader from '@/components/ui/loading';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/utils/cn';

interface ProctoredAssessmentProps {
  testMode?: 'field' | 'skills';
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface TestState {
  sections: {
    section: Section;
    questions: Question[];
    answers: Record<string, any>;
    answersWithTime: SubmitAnswer[];
    completed: boolean;
    timeSpent: number;
  }[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  totalTime: number;
  timeRemaining: number;
  status: 'setup' | 'permissions' | 'ready' | 'active' | 'paused' | 'completed' | 'terminated' | 'loading';
  sessionId: string | null;
  testId: string | null;
  isApiMode: boolean;
}

export const ProctoredAssessment = ({ testMode, onComplete, onBack }: ProctoredAssessmentProps) => {
  const { user, updateUser } = useAuthStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [testConfig] = useState<TestConfig>(() => buildTestConfig(user, testMode));

  const [testState, setTestState] = useState<TestState>({
    sections: [],
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    totalTime: (testConfig.totalTime ? testConfig.totalTime * 60 : 60 * 60), // seconds
    timeRemaining: (testConfig.totalTime ? testConfig.totalTime * 60 : 60 * 60),
    status: 'setup',
    sessionId: null,
    testId: null,
    isApiMode: false,
  });
  
  const [showInstructions, setShowInstructions] = useState(true);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [testAnalysis, setTestAnalysis] = useState<TestAnalysisResult | null>(null);
  const [results, setResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    attemptedQuestions: number;
    unattemptedQuestions: number;
    accuracyRate: number;
    score: number;
    sectionResults: {
      name: string;
      total: number;
      correct: number;
      attempted: number;
      unattempted: number;
      score: number;
      accuracyRate: number;
    }[];
    violations: Violation[];
  } | null>(null);

  const [activeViolation, setActiveViolation] = useState<Violation | null>(null);

  // Proctoring hook
  const handleViolation = useCallback((violation: Violation) => {
    setActiveViolation(violation);
    
    // Send violation to backend (optional - non-blocking)
    if (testState.sessionId && !testState.sessionId.startsWith('local_')) {
      api.post(`/test/${testState.sessionId}/violation`, {
        type: violation.type,
        description: violation.description,
        severity: violation.severity
      }, { timeout: 3000 }).catch(() => {});
    }
  }, [testState.sessionId]);

  const handleTerminate = useCallback(async (_violations: Violation[]) => {
    setTestState(prev => ({ ...prev, status: 'terminated' }));
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    
    // Smoothly exit fullscreen on termination
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Failed to exit fullscreen manually on termination:', e);
    }
    
    // Save terminated session (optional - non-blocking)
    if (testState.sessionId && !testState.sessionId.startsWith('local_')) {
      api.post(`/test/${testState.sessionId}/terminate`, {
        reason: 'Maximum violations exceeded'
      }, { timeout: 3000 }).catch(() => {});
    }
  }, [testState.sessionId]);

  const handleWarning = useCallback((_count: number) => {
    // Additional warning handling if needed
  }, []);

  const proctoring = useProctoring({
    onViolation: handleViolation,
    onTerminate: handleTerminate,
    onWarning: handleWarning,
  });

  // Auto-load results if already completed (Persistence)
  useEffect(() => {
    if (!user) return;

    const savedResults = testMode === 'field' ? user.fieldAssessmentResults : user.skillAssessmentResults;
    
    if (savedResults && savedResults.sections && savedResults.sections.length > 0) {
      console.log(`📊 Found existing ${testMode} results for user, auto-loading...`);
      
      const mappedResults = {
        totalQuestions: savedResults.sections.reduce((acc: number, s: any) => acc + (s.total || 0), 0),
        correctAnswers: savedResults.sections.reduce((acc: number, s: any) => acc + (s.correct || 0), 0),
        attemptedQuestions: savedResults.sections.reduce((acc: number, s: any) => acc + (s.total || 0), 0),
        unattemptedQuestions: 0,
        accuracyRate: savedResults.score || 0,
        score: savedResults.score || 0,
        sectionResults: savedResults.sections.map((s: any) => ({
          name: s.name,
          total: s.total || 0,
          correct: s.correct || 0,
          attempted: s.total || 0,
          unattempted: 0,
          score: s.score || 0,
          accuracyRate: s.score || 0
        })),
        violations: []
      };

      setResults(mappedResults);
      setShowResults(true);
      setShowInstructions(false);
      setTestState(prev => ({ ...prev, status: 'completed' }));
    }
  }, [testMode, user]);

  // Cleanup proctoring on unmount
  useEffect(() => {
    return () => {
      // Stop all media streams when component unmounts
      proctoring.stopProctoring().catch(() => {});
    };
  }, []);

  // Stop proctoring when test is terminated
  useEffect(() => {
    if (testState.status === 'terminated' && !practiceMode) {
      proctoring.stopProctoring().catch(() => {});
    }
  }, [testState.status, practiceMode]);

  // Handle back button with cleanup
  const handleBack = async () => {
    // Stop proctoring if active
    if (!practiceMode && proctoring.state.isActive) {
      await proctoring.stopProctoring();
    }
    // Clear timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    onBack();
  };


  // Convert API question to local format
  const convertApiQuestion = (q: any): Question => {
    // Handle new AI format or legacy schema
    const isNewFormat = Array.isArray(q.options) && typeof q.options[0] === 'string';
    return {
      id: q.id || q._id,
      question: q.question || q.questionText || q.description,
      text: q.question || q.questionText || q.description, // For compatibility
      options: isNewFormat ? q.options : (q.options?.map((o: any) => o.text) || []),
      correct: isNewFormat ? (q.correct ?? 0) : (q.options?.findIndex((o: any) => o.isCorrect) ?? 0),
      explanation: q.explanation || '',
      difficulty: (q.difficulty || 'medium').toLowerCase() as 'easy' | 'medium' | 'hard' | 'advanced',
      weight: q.weight || 1,
      companyAskedIn: q.companyAskedIn || null,
      section: q.section || null,
      type: q.type || 'mcq',
      title: q.title || 'Coding Challenge',
      description: q.description || q.questionText || q.question,
      starterCode: q.starterCode || {},
      examples: q.examples || [],
      constraints: q.constraints || [],
      hiddenTestCases: q.hiddenTestCases || q.testCases || [],
      expectedComplexity: q.expectedComplexity || { time: 'O(N)', space: 'O(1)' }
    } as Question;
  };

  // Get icon for section
  const getSectionIcon = (sectionName: string): string => {
    const icons: Record<string, string> = {
      // CS
      'Aptitude': '🧮', 'DSA': '🌳', 'DBMS': '🗄️', 'OS': '⚙️', 'CN': '🌐', 'OOPS': '🔷',
      'System Design': '🏗️', 'Coding': '💻', 'SQL': '📊',
      // Electronics / Electrical
      'Circuits': '⚡', 'Machines': '📟', 'Electronics': '🔌', 'Embedded': '💾', 'Signals': '📉',
      // Mechanical
      'Thermodynamics': '🔥', 'Mechanics': '⚙️', 'Manufacturing': '🏭', 'Design': '🏗️',
      // Civil
      'Structures': '🏗️', 'Geotechnical': '🌍', 'Hydraulics': '💧', 'Surveying': '🗺️',
      // Management
      'Marketing': '🎨', 'Finance': '💰', 'HR': '👥', 'Ops': '📦', 'Strategy': '♟️',
      // Commerce
      'Accounting': '📊', 'Taxation': '💰', 'Economics': '📈', 'Law': '⚖️',
      // IoT
      'Sensors': '🌡️', 'Connectivity': '📶', 'Protocols': '🔗', 'Robotics': '🤖', 'Security': '🔒',
      // Science
      'CoreScience': '🔬', 'AppliedScience': '🧪', 'Data': '📊',
      // Arts
      'Humanities': '📖', 'Expression': '✍️', 'Social': '🌍',
      // General
      'DevOps': '🚀', 'ML': '🤖', 'Cloud': '☁️', 'WebDevelopment': '🌍',
      // Full names
      'Operating Systems': '⚙️', 'Computer Networks': '🌐',
      'Data Structures': '🌳', 'Technical Fundamentals': '💡', 'Data Structures & Algorithms': '🌳',
      // Common Skills
      'React': '⚛️', 'Node.js': '🟢', 'Express': '🚂', 'MongoDB': '🍃',
      'Python': '🐍', 'Java': '☕', 'Docker': '🐳', 'Kubernetes': '☸️', 'AWS': '☁️',
      'Azure': '🔷', 'GCP': '☁️', 'Frontend': '🖥️', 'Backend': '⚙️', 'Fullstack': '🌐',
      'Machine Learning': '🤖', 'Data Science': '📊', 'Cybersecurity': '🔒',
      'TypeScript': '🔷', 'JavaScript': '🟨', 'C++': '🔵', 'Dart': '🎯', 'Flutter': '📱'
    };
    return icons[sectionName] || '📋';
  };

  const startTest = async (skipProctoring = false) => {
    try {
      console.log('[Assessment] startTest called', { skipProctoring, practiceMode });
      // Start proctoring only if not in practice/skip mode
      if (!skipProctoring && !practiceMode) {
        console.log('[Assessment] Attempting to start proctoring...');
        const proctoringStarted = await proctoring.startProctoring();
        console.log('[Assessment] proctoringStarted:', proctoringStarted);
        if (!proctoringStarted) {
        showError('Cannot start proctored test without permissions. Try Practice Mode instead.');
          console.error('[Assessment] Proctoring permissions denied or failed.');
          // Reset loading status so UI doesn't remain stuck
          setTestState(prev => ({ ...prev, status: 'setup' }));
          return;
        }
      } else {
        setPracticeMode(true);
        showInfo('Starting in Practice Mode - no proctoring');
        console.log('[Assessment] Practice mode enabled.');
        
        // Even in practice mode, forcibly enter fullscreen to maintain focus layout
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
        } catch (e) {
          console.error("Practice fullscreen failed:", e);
        }
      }

      // Set loading state
      setTestState(prev => ({ ...prev, status: 'loading' }));
      console.log('[Assessment] Set status to loading.');

      let sessionId = `local_${Date.now()}`;
      let testId: string | null = null;
      let isApiMode = false;
      let sections = testState.sections;

      // ─── Fetch AI-generated questions from the backend ────────────────
      try {
        const token = localStorage.getItem('prepzo-token');
        if (token) {
          const isFieldTest = testMode === 'field';
          const isSkillTest = testMode === 'skills';
          
          const aiTestConfig = {
            targetRole: user?.targetRole || 'Software Engineer',
            questionsPerSection: 20, // 20 questions per section for all modes
            testMode: testMode || 'combined',
            adaptive: true,
            enableProctoring: !skipProctoring,
            degree: user?.degree || testConfig.degree,
            fieldOfStudy: user?.fieldOfStudy,
            skillRatings: user?.skillRatings,
            // Pass the exact section names displayed in Operational Modules
            // so the AI generates questions matching what the user sees
            sections: testConfig.sections.map((s: Section) => s.name),
            // For skill test, pass the selected skills
            skills: user?.knownTechnologies || [],
          };
          
          let endpoint = '/ai-test/generate';
          if (isFieldTest) endpoint = '/ai-test/generate/field-test';
          else if (isSkillTest) endpoint = '/ai-test/generate/skill-test';

          console.log(`[Assessment] Calling ${endpoint}...`, aiTestConfig);
          showInfo(isFieldTest 
            ? '🤖 Stage 1: Generating 60 core placement questions...' 
            : '🤖 Stage 2: Generating 10 questions per selected skill...');

          const resp = await api.post(
            endpoint,
            { ...aiTestConfig, testConfig: aiTestConfig }, // Send both for backward/forward compat
            { timeout: 600000 }
          );

          toast.dismiss('ai-gen');

          // Backend wraps in: { success, data: { sessionId, testId, test: {...} } }
          const payload = resp.data?.data || resp.data;
          const aiTest  = payload?.test ?? payload;
          
          console.log('[Assessment] AI payload structure:', { 
            hasPayload: !!payload, 
            hasTest: !!aiTest, 
            isRecovery: payload?.sessionId?.startsWith('recovery_'),
            sections: aiTest?.sections?.map((s: any) => ({ name: s.name, qCount: s.questions?.length }))
          });

          // Check if this is a valid AI test OR a planned backend recovery payload
          const isRecovery = payload?.sessionId?.startsWith('recovery_');
          
          if (aiTest && Array.isArray(aiTest.sections) && aiTest.sections.length > 0) {
            sessionId = payload.sessionId || `ai_${aiTest.testId || Date.now()}`;
            testId    = aiTest.testId || null;
            isApiMode = true;

            // Map AI format -> local Section format
            sections = aiTest.sections.map((aiSec: any) => {
              const secName = aiSec.name || aiSec.section || 'General';
              const secId   = aiSec.id   || secName.toLowerCase().replace(/\s+/g, '_');
              const timeSec = aiSec.timeLimit ? Math.ceil(aiSec.timeLimit / 60) : 15;
              return {
                section: {
                  id:        secId,
                  name:      secName,
                  icon:      getSectionIcon(secName),
                  questions: [],
                  timeLimit: timeSec,
                } as Section,
                questions:       (aiSec.questions || []).map(convertApiQuestion),
                answers:         {},
                answersWithTime: [],
                completed:       false,
                timeSpent:       0,
              };
            });
            showSuccess(`✅ ${aiTest.totalQuestions} unique AI questions generated!`);
          } else if (isRecovery) {
            // Backend explicitly returned a recovery payload — skip throw and use fallback
            console.log('[Assessment] Backend triggered recovery mode. Proceeding with local fallback.');
            toast.dismiss('ai-gen');
          } else {
            toast.dismiss('ai-gen');
            throw new Error('AI returned empty test — starting with practice bank');
          }
        }
      } catch (apiError: any) {
        toast.dismiss('ai-gen');
        const status = apiError?.response?.status;
        const errMsg = apiError?.response?.data?.message || apiError?.response?.data?.detail || apiError?.message || 'AI service unavailable';
        
        console.error('[Assessment] AI generation failed:', { status, errMsg });

        if (status === 401) {
          showError('Session expired. Please logout and login again to proceed.');
          setTestState(prev => ({ ...prev, status: 'setup' }));
          return;
        }

        if (status === 400 && errMsg.includes('Invalid input')) {
          showError('Special characters detected in your profile. Please simplify your Career Goals.');
        }
        
            showError(`AI service struggle: ${String(errMsg).slice(0, 80)}. Using practice bank instead.`);
      }

      // ─── Fallback: inject comprehensive question bank if sections are still empty ─────
      const noQuestions = !sections || sections.length === 0 ||
        sections.every((s: any) => !Array.isArray(s.questions) || s.questions.length === 0);
        
      if (noQuestions) {
        let fallbackSections: any[] = [];
        
        if (testMode === 'skills') {
          // Stage 2: Strictly quarantined skill-based fallback
          console.warn('[Assessment] No AI skill questions available — using technical depth fallback.');
          fallbackSections = getFallbackBySkills(user?.knownTechnologies || []);
          showInfo('🤖 Skill pool currently being seeded. Using technical depth practice bank.');
        } else {
          // Stage 1: Domain-based fallback
          console.warn(`[Assessment] No AI field questions available — injecting fallback for ${user?.fieldOfStudy || 'Generic'}`);
          fallbackSections = getFallbackByField(user?.fieldOfStudy || 'Computer Science');
          showInfo(`⚠️ AI service unavailable. Starting with ${fallbackSections.length * 20} practice questions.`);
        }
        
        isApiMode = false;
        testId = null;
        sessionId = `local_${Date.now()}`;
        
        sections = fallbackSections.map(fb => ({
          section: {
            id: fb.id,
            name: fb.name,
            icon: fb.icon,
            questions: [],
            timeLimit: fb.timeLimit,
          } as Section,
          questions: fb.questions.map((q: Question) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correct: q.correct,
            difficulty: q.difficulty,
            explanation: q.explanation,
            type: 'mcq'
          })),
          answers: {},
          answersWithTime: [],
          completed: false,
          timeSpent: 0,
        }));

        // Append coding challenges section to fallback
        sections.push({
          section: {
            id: 'coding_section',
            name: 'Coding Challenges',
            icon: '💻',
            timeLimit: 40,
            questions: []
          } as Section,
          questions: FALLBACK_CODING_QUESTIONS,
          answers: {},
          answersWithTime: [],
          completed: false,
          timeSpent: 0
        });
      }

      // ─── Activate test ────────────────────────────────────────────────────
      const totalTimeSec = sections.reduce(
        (acc: number, s: any) => acc + (s.section?.timeLimit ?? 15) * 60,
        0
      );
      setTestState((prev: TestState) => ({
        ...prev,
        sections,
        status:        'active',
        sessionId,
        testId,
        isApiMode,
        totalTime:     isApiMode ? totalTimeSec : prev.totalTime,
        timeRemaining: isApiMode ? totalTimeSec : prev.timeRemaining,
      }));
      console.log('[Assessment] Test state set to active.');

      // Set section timer
      const currentSection = sections[0];
      setSectionTimeRemaining((currentSection.section?.timeLimit ?? 15) * 60);
      console.log('[Assessment] Section timer set.');

      showSuccess('Test started! Good luck!');
    } catch (error) {
      console.error('[Assessment] Error starting test:', error);
      showError('Failed to start test. Please try again.');
      setTestState((prev: TestState) => ({ ...prev, status: 'setup' }));
    }
  };

  // Main timer effect
  useEffect(() => {
    if (testState.status !== 'active') return;

    timerRef.current = setInterval(() => {
      setTestState((prev: TestState) => {
        if (prev.timeRemaining <= 1) {
          // Auto-submit when time runs out
          clearInterval(timerRef.current!);
          submitTest();
          return { ...prev, timeRemaining: 0, status: 'completed' };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState.status]);

  // Section timer effect
  useEffect(() => {
    if (testState.status !== 'active') return;

    sectionTimerRef.current = setInterval(() => {
      setSectionTimeRemaining((prev: number) => {
        if (prev <= 1) {
          // Auto-move to next section
          handleNextSection(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    };
  }, [testState.status, testState.currentSectionIndex]);

  // Set video element for proctoring
  useEffect(() => {
    if (videoRef.current) {
      proctoring.setVideoElement(videoRef.current);
    }
    if (canvasRef.current) {
      proctoring.setCanvasElement(canvasRef.current);
    }
  }, [testState.status]);

  // Track question start time for time tracking
  const questionStartTimeRef = useRef<number>(Date.now());

  // Reset question start time when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [testState.currentQuestionIndex, testState.currentSectionIndex]);

  // Handle answer selection
  const handleAnswer = (questionId: string, optionIndex: number) => {
    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    setTestState((prev: TestState) => {
      const newSections = [...prev.sections];
      newSections[prev.currentSectionIndex].answers[questionId] = optionIndex;
      // Update or add answer with time for API submission
      const existingIdx = newSections[prev.currentSectionIndex].answersWithTime
        .findIndex((a: SubmitAnswer) => a.questionId === questionId);
      if (existingIdx >= 0) {
        newSections[prev.currentSectionIndex].answersWithTime[existingIdx] = {
          questionId,
          selectedOption: optionIndex,
          timeSpent: timeSpent + newSections[prev.currentSectionIndex].answersWithTime[existingIdx].timeSpent,
        };
      } else {
        newSections[prev.currentSectionIndex].answersWithTime.push({
          questionId,
          selectedOption: optionIndex,
          timeSpent,
        });
      }
      return { ...prev, sections: newSections };
    });
    // Reset timer for this question in case they change their answer
    questionStartTimeRef.current = Date.now();
  };

  // Handle coding answer selection
  const handleCodingAnswer = useCallback((questionId: string, code: string, language: string, testResults?: any) => {
    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    setTestState((prev: TestState) => {
      const newSections = [...prev.sections];
      newSections[prev.currentSectionIndex].answers[questionId] = {
        code,
        language,
        passed: testResults?.passed,
        score: testResults?.score,
        passedTestCases: testResults?.passedTestCases,
        totalTestCases: testResults?.totalTestCases
      };
      // Update or add answer with time for API submission
      const existingIdx = newSections[prev.currentSectionIndex].answersWithTime
        .findIndex((a: SubmitAnswer) => a.questionId === questionId);
      if (existingIdx >= 0) {
        newSections[prev.currentSectionIndex].answersWithTime[existingIdx] = {
          questionId,
          selectedOption: -1,
          timeSpent: timeSpent + newSections[prev.currentSectionIndex].answersWithTime[existingIdx].timeSpent,
        };
      } else {
        newSections[prev.currentSectionIndex].answersWithTime.push({
          questionId,
          selectedOption: -1,
          timeSpent,
        });
      }
      return { ...prev, sections: newSections };
    });
    // Reset timer for this question in case they change their answer
    questionStartTimeRef.current = Date.now();
  }, []);

  // Navigate questions
  const handleNextQuestion = () => {
    const currentSection = testState.sections[testState.currentSectionIndex];
    if (testState.currentQuestionIndex < currentSection.questions.length - 1) {
      setTestState((prev: TestState) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const handlePrevQuestion = () => {
    if (testState.currentQuestionIndex > 0) {
      setTestState((prev: TestState) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  // Handle section navigation
  const handleNextSection = (autoSubmit = false) => {
    if (testState.currentSectionIndex < testState.sections.length - 1) {
      // Mark current section as completed
      setTestState((prev: TestState) => {
        const newSections = [...prev.sections];
        newSections[prev.currentSectionIndex].completed = true;
        newSections[prev.currentSectionIndex].timeSpent = 
          prev.sections[prev.currentSectionIndex].section.timeLimit * 60 - sectionTimeRemaining;
        const nextSection = newSections[prev.currentSectionIndex + 1];
        setSectionTimeRemaining(nextSection.section.timeLimit * 60);
        return {
          ...prev,
          sections: newSections,
          currentSectionIndex: prev.currentSectionIndex + 1,
          currentQuestionIndex: 0,
        };
      });
      if (autoSubmit) {
        showInfo('Section time ended. Moving to next section.');
      }
    } else {
      // Last section - submit test
      submitTest();
    }
  };

  // Submit test
  const submitTest = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);

    // Calculate results with attempted/unattempted tracking
    let totalQuestions = 0;
    let correctAnswers = 0;
    let attemptedQuestions = 0;
    // let totalTimeSpent = testState.totalTime - testState.timeRemaining;
    
    const sectionResults = testState.sections.map(sec => {
      let sectionCorrect = 0;
      let sectionAttempted = 0;
      
      sec.questions.forEach(q => {
        totalQuestions++;
        const ans = sec.answers[q.id];
        const wasAttempted = ans !== undefined;
        
        if (wasAttempted) {
          attemptedQuestions++;
          sectionAttempted++;
          if (q.type === 'coding') {
            if (typeof ans === 'object' && ans !== null) {
              const codingScore = ans.score !== undefined ? ans.score : (ans.passed ? 100 : 0);
              const frac = codingScore / 100;
              sectionCorrect += frac;
              correctAnswers += frac;
            } else if (typeof ans === 'string' && ans.trim().length > 0) {
              // Typed some code but didn't submit/run successfully, count as 0 correct
            }
          } else {
            if (ans === q.correct) {
              correctAnswers++;
              sectionCorrect++;
            }
          }
        }
      });
      
      // Calculate accuracy rate (correct out of attempted)
      const accuracyRate = sectionAttempted > 0 ? Math.round((sectionCorrect / sectionAttempted) * 100) : 0;
      
      return {
        name: sec.section.name,
        total: sec.questions.length,
        correct: sectionCorrect,
        attempted: sectionAttempted,
        unattempted: sec.questions.length - sectionAttempted,
        score: Math.round((sectionCorrect / sec.questions.length) * 100),
        accuracyRate,
      };
    });

    const unattemptedQuestions = totalQuestions - attemptedQuestions;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const accuracyRate = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;
    
    // Build TestAnalysisResult for AI engine
    const analysis: TestAnalysisResult = {
      sections: sectionResults.map(s => ({
        name: s.name,
        totalQuestions: s.total,
        attemptedQuestions: s.attempted,
        correctAnswers: s.correct,
        accuracyRate: s.accuracyRate,
        score: s.score,
      })),
      totalQuestions,
      attemptedQuestions,
      correctAnswers,
      accuracyRate,
      completionRate: totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0,
      overallScore: score,
      criticalWeaknesses: sectionResults.filter(s => s.score < 50).map(s => s.name),
      questionDetails: testState.sections.flatMap(sec => sec.questions.map(q => ({
        questionId: q.id,
        section: sec.section.name,
        questionText: q.question,
        options: q.options,
        correctAnswer: q.correct,
        userAnswer: sec.answers[q.id] ?? null,
        wasAttempted: sec.answers[q.id] !== undefined,
        wasCorrect: sec.answers[q.id] === q.correct,
        difficulty: q.difficulty || 'medium',
        explanation: q.explanation || '',
        skillTags: q.skillTags || [],
        timeSpent: (sec.answersWithTime.find(a => a.questionId === q.id)?.timeSpent) || 0,
        companyAskedIn: q.companyAskedIn || '',
      }))),
    };
    setTestAnalysis(analysis);

    // Always fetch AI recommendations after assessment, no threshold or blocking
    // Fetch ONLY real backend AI recommendations (no fallback, no local)
    try {
      const { generateRecommendations } = await import('@/api/recommendations');
      // Build clean payload, prevent NaN/undefined
      const backendRecs = await generateRecommendations(
        {
          totalQuestions: analysis.totalQuestions || 0,
          attemptedQuestions: analysis.attemptedQuestions || 0,
          correctAnswers: analysis.correctAnswers || 0,
          accuracyRate: analysis.accuracyRate || 0,
          overallScore: analysis.overallScore || 0,
          sections: (analysis.sections || []).map((s: any) => ({
            name: s.name || 'Unknown',
            totalQuestions: s.totalQuestions || 0,
            attemptedQuestions: s.attemptedQuestions || 0,
            correctAnswers: s.correctAnswers || 0,
            score: s.totalQuestions > 0 ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0
          })),
          questionDetails: analysis.questionDetails || []
        },
        user?.targetRole || 'Software Engineer',
        {
          name: user?.fullName || '',
          dreamCompanies: user?.preferredCompanies || [],
          knownTechnologies: user?.knownTechnologies || []
        }
      );
      console.log('✅ Backend real AI recommendations loaded:', backendRecs);
      localStorage.setItem('backendRecommendations', JSON.stringify(backendRecs));
      localStorage.setItem('testAnalysis', JSON.stringify(analysis));
      showSuccess('✅ Real AI recommendations generated from your test results!');
    } catch (backendErr) {
      console.error('Backend AI failed:', backendErr);
      showError('Backend AI temporarily unavailable');
    }

    // Calculate strengths and weaknesses based on section performance
    const sortedSections = [...sectionResults].sort((a, b) => b.score - a.score);
    const strengths = sortedSections
      .filter(s => s.score >= 60)
      .slice(0, 3)
      .map(s => s.name);
    const weaknesses = sortedSections
      .filter(s => s.score < 60)
      .slice(-3)
      .map(s => s.name);
    
    // Create skill ratings from section scores
    const skillRatings: Record<string, number> = {};
    sectionResults.forEach(s => {
      skillRatings[s.name] = s.score;
    });

    // Identify skill gaps (sections below 50%)
    const skillGaps = sectionResults
      .filter(s => s.score < 50)
      .map(s => s.name);

    setResults({
      totalQuestions,
      correctAnswers,
      attemptedQuestions,
      unattemptedQuestions,
      accuracyRate,
      score,
      sectionResults,
      violations: proctoring.state.violations,
    });

    // Submit to intelligent question API if in API mode
    if (testState.isApiMode && testState.testId) {
      try {
        const allAnswers: SubmitAnswer[] = testState.sections.flatMap(sec => sec.answersWithTime);
        const totalTimeSpent = testState.totalTime - testState.timeRemaining;

        const apiResult = await questionApi.submitTest({
          testId: testState.testId,
          answers: allAnswers,
          totalTimeSpent,
        });

        console.log('Test submitted to intelligent engine:', apiResult);
        
        if (apiResult.recommendations?.length > 0) {
          showSuccess(`Recommendations: ${apiResult.recommendations.slice(0, 2).join(', ')}`);
        }
      } catch (apiError) {
        console.log('Could not submit to question API:', apiError);
      }
    }

    // Save to backend with complete question details for answer review
    try {
      const token = localStorage.getItem('token');
      if (testState.sessionId && !testState.sessionId.startsWith('local_') && token) {
        // Prepare question details for backend storage
        const questionDetails: Record<string, Array<{
          questionId: string;
          questionText: string;
          options: string[];
          correctAnswer: number;
          selectedAnswer: number;
          isCorrect: boolean;
          isAttempted: boolean;
          difficulty: string;
          explanation: string;
        }>> = {};
        
        testState.sections.forEach((sec) => {
          questionDetails[sec.section.id] = sec.questions.map(q => ({
            questionId: q.id,
            questionText: q.question,
            options: q.options,
            correctAnswer: q.correct,
            selectedAnswer: sec.answers[q.id] ?? -1,
            isCorrect: sec.answers[q.id] === q.correct,
            isAttempted: sec.answers[q.id] !== undefined,
            difficulty: q.difficulty || 'medium',
            explanation: q.explanation || '',
          }));
        });
        
        await api.post(`/test/${testState.sessionId}/complete`, {
          sections: sectionResults.map((sr, idx) => ({
            sectionId: testState.sections[idx].section.id,
            sectionName: sr.name,
            questionsAttempted: sr.attempted,
            correctAnswers: sr.correct,
            score: sr.score,
            answers: testState.sections[idx].questions.map(q => ({
              questionId: q.id,
              selectedOption: testState.sections[idx].answers[q.id] ?? -1,
              isCorrect: testState.sections[idx].answers[q.id] === q.correct,
              correctAnswer: q.correct,
              questionText: q.question,
              options: q.options,
              explanation: q.explanation || '',
              difficulty: q.difficulty || 'medium',
            }))
          })),
          questionDetails
        }, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000
        });
      }
    } catch {
      console.log('Could not save to backend, results stored locally');
    }

    // Stop proctoring
    if (!practiceMode) {
      await proctoring.stopProctoring();
    }

    // Force exit fullscreen after test completion (applies to both practice and proctored modes)
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Failed to exit fullscreen manually after test completion:', e);
    }

    // Update user with all test results data
    updateUser({ 
      placementReadinessScore: Math.max(user?.placementReadinessScore || 0, score),
      strengths: strengths.length > 0 ? strengths : user?.strengths || [],
      weaknesses: weaknesses.length > 0 ? weaknesses : user?.weaknesses || [],
      skillGaps: skillGaps.length > 0 ? skillGaps : user?.skillGaps || [],
      skillRatings: { ...(user?.skillRatings || {}), ...skillRatings },
      testResults: {
        totalQuestions,
        correctAnswers,
        score,
        sectionResults,
        takenAt: new Date().toISOString(),
      },
      skillsMatchedScore: score,
    });

    setTestState(prev => ({ ...prev, status: 'completed' }));
    setShowResults(true);
    
    onComplete(score);
  };

  // --- Unified Layout System ---
  const renderAssessmentContent = () => {
    // Current section and question
    const currentSection = testState.sections[testState.currentSectionIndex];
    const currentQuestion = currentSection?.questions[testState.currentQuestionIndex];

  if (testState.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] selection:bg-slate-900 selection:text-white">
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[40px] p-20 border border-slate-200/80 overflow-hidden text-center max-w-lg w-full flex flex-col items-center shadow-xl shadow-slate-100">
          <ThinkingLoader 
            loadingText="Compiling Assessment Results" 
          />
          <p className="text-[14px]  font-medium text-slate-500 italic mt-6">Assembling a high-fidelity assessment from the core intelligence engine.</p>
        </div>
      </div>
    );
  }

  // Render setup/instructions
  if (testState.status === 'setup' && showInstructions) {
    return (
      <div className="space-y-10 selection:bg-slate-900 selection:text-white">
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-200/80 overflow-hidden group shadow-xl shadow-slate-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 md:mb-12 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
            </div>
            <div>
              <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.4em] text-indigo-600 mb-2">Diagnostic Unit</p>
              <h2 className="text-3xl md:text-4xl  font-[900] text-slate-800 uppercase tracking-tighter italic leading-none">Career Readiness Signal</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Protocol Domain</p>
              <p className="text-lg md:text-xl font-[900] text-slate-700 text-center uppercase italic tracking-tighter line-clamp-2 leading-tight">{testConfig.field}</p>
            </div>
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Target Role</p>
              <p className="text-lg md:text-xl font-[900] text-slate-700 text-center uppercase italic tracking-tighter line-clamp-2 leading-tight break-words">{testConfig.targetRole}</p>
            </div>
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Duration</p>
              <p className="text-lg md:text-xl font-[900] text-slate-700 text-center uppercase italic tracking-tighter leading-tight">{testConfig.totalTime} MIN</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <p className="text-[11px]  font-[900] uppercase tracking-[0.4em] text-slate-400">Operational Modules ({testConfig.sections.length})</p>
              <div className="h-[1px] flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testConfig.sections.map((section) => (
                <div key={section.id} className="flex items-center gap-4 p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors group/sec">
                  <span className="text-xl md:text-2xl opacity-80 grayscale group-hover/sec:grayscale-0 transition-all">{section.icon}</span>
                  <div>
                    <p className="text-[12px] md:text-[13px]  font-black text-slate-700 uppercase italic tracking-widest leading-tight">{section.name}</p>
                    <p className="text-[9px] md:text-[10px]  font-bold text-slate-400 uppercase tracking-[0.1em] mt-1">{testConfig.questionsPerSection} SIGNALS • {section.timeLimit} MIN</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4">
            <h3 className="text-xl md:text-2xl  font-[900] text-slate-800 uppercase tracking-tighter italic flex items-center gap-4">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-slate-400" /> Proctoring Integrity
            </h3>
            <p className="text-[9px] md:text-[10px]  font-black text-slate-400 uppercase tracking-[0.4em]">Active Protocol Required</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { icon: Camera, title: 'Visual ID Verification', desc: 'Continuous face mesh analysis', color: 'text-indigo-500' },
              { icon: Mic, title: 'Audio Fingerprinting', desc: 'Atmospheric noise monitoring', color: 'text-emerald-500' },
              { icon: Monitor, title: 'Terminal Guard', desc: 'Secure environment restriction', color: 'text-violet-500' },
              { icon: Maximize, title: 'Absolute Display', desc: 'Forced focal alignment', color: 'text-amber-500' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-[24px] md:rounded-[28px] bg-slate-50 border border-slate-200/60 group hover:bg-slate-100 transition-colors shadow-sm">
                <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <div>
                  <p className="text-[13px] md:text-[14px]  font-black text-slate-700 uppercase tracking-widest italic">{item.title}</p>
                  <p className="text-[9px] md:text-[10px]  font-bold text-slate-400 uppercase tracking-[0.1em]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[32px] bg-red-50 border border-red-100 mb-12">
            <div className="flex items-start gap-6">
              <AlertTriangle className="w-10 h-10 text-red-500/60 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[16px]  font-black text-red-600 uppercase tracking-widest italic mb-2">Zero Tolerance Policy</p>
                <p className="text-[14px]  font-medium text-slate-600 italic leading-relaxed">
                  System monitors all environmental signals. Three deviations will trigger automatic terminal termination. 
                  <span className="text-slate-800 font-bold"> Ensure all external hardware is configured.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-200">
            <motion.button 
              whileHover={{ x: -10 }}
              onClick={onBack}
              className="order-2 md:order-1 group flex items-center gap-3 text-[10px] md:text-[11px]  font-black text-slate-400 hover:text-slate-700 uppercase tracking-[0.4em] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Go Back
            </motion.button>
            <button 
              onClick={() => setShowInstructions(false)}
              className="order-1 md:order-2 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-[20px] md:rounded-[24px]  font-black uppercase tracking-[0.15em] md:tracking-[0.2em] italic text-[13px] md:text-[14px] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
            >
              Initialize Diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render permission request
  if (testState.status === 'setup' && !showInstructions) {
    return (
      <div className="space-y-10 selection:bg-slate-900 selection:text-white">
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-100">
          <div className="text-center py-8 md:py-12">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 md:mb-10 rounded-[28px] md:rounded-[32px] bg-slate-50 border border-slate-200 flex items-center justify-center group shadow-sm">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-slate-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-indigo-600 mb-4">Integrity Verification</p>
            <h2 className="text-3xl md:text-4xl  font-[900] text-slate-800 uppercase tracking-tighter italic mb-4 leading-none">Signal Authentication Required</h2>
            <p className="text-[14px] md:text-[16px]  font-medium text-slate-500 max-w-lg mx-auto leading-relaxed italic mb-8 md:mb-12">
              System initialization requires active sensory permissions. All diagnostic data is processed locally to ensure privacy.
            </p>
            
            <div className="flex items-center justify-center gap-10 mb-16">
              {[
                { icon: Camera, label: 'Visual' },
                { icon: Mic, label: 'Audio' },
                { icon: Monitor, label: 'Stream' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-[22px] bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 transition-all shadow-sm">
                    <item.icon className="w-7 h-7 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>
                  <span className="text-[10px]  font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowInstructions(true)}
                  className="px-8 py-5 rounded-[22px] border border-slate-200 text-[12px]  font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Return to Manual
                </motion.button>
                <button 
                  onClick={() => startTest(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-[24px]  font-black uppercase tracking-[0.2em] italic text-[14px] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg shadow-indigo-100"
                >
                  <Play className="w-5 h-5 fill-white stroke-none" /> Start Proctored Test
                </button>
              </div>
              <div className="w-full h-[1px] bg-slate-200 max-w-sm" />
              <div className="text-center">
                <p className="text-[10px]  font-black text-slate-400 uppercase tracking-[0.3em] mb-4 italic">Bypass Integrity Protocol:</p>
                <button 
                  onClick={() => startTest(true)}
                  className="group flex items-center gap-3 text-[12px]  font-black text-slate-500 hover:text-slate-800 uppercase tracking-[0.2em] transition-colors mx-auto"
                >
                  <BookOpen className="w-4 h-4 opacity-70 group-hover:opacity-100" /> Start in Practice Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render terminated state
  if (testState.status === 'terminated') {
    return (
      <div className="space-y-10 selection:bg-slate-900 selection:text-white">
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-red-200 overflow-hidden text-center shadow-xl shadow-slate-100">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 md:mb-10 rounded-[24px] md:rounded-[32px] bg-red-50 border border-red-200 flex items-center justify-center shadow-sm">
            <XCircle className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
          </div>
          <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-red-600 mb-4">Protocol Terminated</p>
          <h2 className="text-4xl md:text-5xl  font-[900] text-slate-850 uppercase tracking-tighter italic mb-6 leading-none">Integrity Failure</h2>
          <p className="text-[14px] md:text-[16px]  font-medium text-slate-500 max-w-lg mx-auto leading-relaxed italic mb-8 md:mb-12">
            The assessment session has been forcefully closed due to repeated integrity deviations. Standard diagnostic protocols were not maintained.
          </p>
          
          <div className="max-w-md mx-auto mb-12 space-y-3">
            {proctoring.state.violations.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-[24px] bg-red-50 border border-red-100 text-left group">
                <AlertTriangle className="w-5 h-5 text-red-500/60 group-hover:text-red-500 transition-colors" />
                <span className="text-[13px]  font-medium text-red-600/80 italic">{v.description}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleBack}
            className="px-10 py-5 rounded-[22px] border border-slate-200 text-[12px]  font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  // Render results
  if (testState.status === 'completed' && showResults && results) {
    return (
      <div className="space-y-12 selection:bg-slate-900 selection:text-white">
        {showAnswerReview && testAnalysis && (
          <AnswerReviewPanel
            questionDetails={testAnalysis.questionDetails}
            sections={testAnalysis.sections}
            onClose={() => setShowAnswerReview(false)}
          />
        )}
        
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-slate-200/80 overflow-hidden text-center group shadow-xl shadow-slate-100">
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-10"
            >
              <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-slate-100" />
              <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-indigo-650 shadow-[0_0_20px_rgba(79,70,229,0.2)]" style={{ clipPath: `inset(0 0 ${100 - results.score}% 0)` }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-6xl  font-[900] text-slate-805 italic tracking-tighter">{results.score}%</span>
                <span className="text-[8px] md:text-[10px]  font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Market Match</span>
              </div>
            </motion.div>
            
            <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-indigo-600 mb-4">Diagnostic Signal Captured</p>
            <h2 className="text-3xl md:text-5xl  font-[900] text-slate-800 uppercase tracking-tighter italic mb-8 md:mb-10 leading-none">Assessment Decoded</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
              {[
                { label: 'Signals Captured', val: `${results.attemptedQuestions}/${results.totalQuestions}`, color: 'text-slate-650' },
                { label: 'Truth Vector', val: results.correctAnswers, color: 'text-indigo-650' },
                { label: 'Gap Radius', val: results.unattemptedQuestions, color: 'text-slate-400' },
                { label: 'Precision Rate', val: `${results.accuracyRate}%`, color: 'text-slate-800' }
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-200/80 shadow-sm">
                  <p className="text-[10px]  font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                  <p className={`text-2xl  font-[900] italic tracking-tighter ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[40px] p-12 border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-100">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl  font-[900] text-slate-800 uppercase tracking-tighter italic flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-slate-400" /> Segment Analysis
            </h3>
            <button 
              onClick={() => setShowAnswerReview(true)}
              className="px-6 py-3 rounded-[18px] border border-slate-200 text-[11px]  font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all italic shadow-sm"
            >
              Review Signal Matrix
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.sectionResults.map((section, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-200/80 group hover:bg-slate-100 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-[12px] md:text-[13px]  font-black text-slate-600 uppercase italic tracking-widest leading-tight">{section.name}</span>
                  <span className="text-lg md:text-xl  font-[900] text-indigo-650 italic tracking-tighter">{section.score}%</span>
                </div>
                <div className="w-full h-[3px] bg-slate-200 rounded-full overflow-hidden mb-4 md:mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${section.score}%` }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full bg-indigo-600 opacity-80"
                  />
                </div>
                <div className="flex justify-between text-[10px]  font-black text-slate-400 uppercase tracking-widest">
                  <span>{section.correct} PASS</span>
                  <span>{section.attempted} TRIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-white/80 backdrop-blur-3xl rounded-[40px] p-10 border border-slate-200/80 shadow-xl shadow-slate-100">
            <h3 className="text-xl  font-[900] text-slate-800 uppercase tracking-widest italic flex items-center gap-4 mb-8">
              <TrendingUp className="w-6 h-6 text-emerald-500" /> Active Strengths
            </h3>
            <div className="space-y-4">
              {results.sectionResults.filter(s => s.score >= 60).slice(0, 4).map((section, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-[24px] bg-emerald-50/50 border border-emerald-100">
                  <span className="text-[14px]  font-black text-emerald-700 uppercase italic tracking-widest">{section.name}</span>
                  <span className="text-lg  font-[900] text-emerald-600 italic">+{section.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-white/80 backdrop-blur-3xl rounded-[40px] p-10 border border-slate-200/80 shadow-xl shadow-slate-100">
            <h3 className="text-xl  font-[900] text-slate-800 uppercase tracking-widest italic flex items-center gap-4 mb-8">
              <TrendingDown className="w-6 h-6 text-red-500" /> Signal Gaps
            </h3>
            <div className="space-y-4">
              {results.sectionResults.filter(s => s.score < 60).slice(0, 4).map((section, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-[24px] bg-red-50/50 border border-red-100">
                  <span className="text-[14px]  font-black text-red-700 uppercase italic tracking-widest">{section.name}</span>
                  <span className="text-lg  font-[900] text-red-600 italic">{section.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 pt-10">
          <button 
            onClick={handleBack}
            className="px-10 py-5 rounded-[22px] border border-slate-200 text-[12px]  font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          >
            Re-Initialize Diagnostic
          </button>
          <button 
            onClick={() => onComplete(results.score)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-[24px]  font-black uppercase tracking-[0.2em] italic text-[14px] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg shadow-indigo-100"
          >
            Access career dashboard <Award className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Render active test
  if (testState.status === 'active' && currentSection && currentQuestion) {
    return (
      <>
        {/* Full-Screen Blocking Warning Modal for Anti-Cheating */}
        {activeViolation && (
          <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl p-8 selection:bg-white selection:text-black">
            <div className="bg-white border border-red-200 rounded-[40px] p-12 max-w-xl text-center shadow-2xl">
               <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-8 animate-pulse opacity-85" />
               <p className="text-[11px]  font-[900] uppercase tracking-[0.5em] text-red-600 mb-2">Protocol Warning</p>
               <h2 className="text-4xl  font-[900] text-slate-800 uppercase tracking-tighter italic mb-6 leading-none">Integrity Violation</h2>
               <p className="text-[15px]  font-medium text-red-700 mb-8 italic px-6 py-4 bg-red-50 rounded-[24px] border border-red-100">
                 {activeViolation.description}
               </p>
               <p className="text-[14px]  font-medium text-slate-500 mb-10 leading-relaxed italic">
                 Deviation detected in environmental sensors. Repeated signals will result in automatic session termination.
               </p>
               <button 
                  onClick={() => {
                     setActiveViolation(null);
                     if (!document.fullscreenElement) {
                       document.documentElement.requestFullscreen().catch(() => {});
                     }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-[24px] text-[16px] uppercase tracking-[0.2em] italic transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-100"
               >
                 Acknowledge & Continue
               </button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
        {/* Proctoring video preview - only show when proctoring is active */}
        {!practiceMode && (
          <>
            <video 
              ref={videoRef} 
              autoPlay
              muted 
              playsInline
              className="fixed bottom-4 right-4 w-32 h-24 rounded-xl object-cover z-50 border-2 border-white/20"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}

        {/* Practice mode indicator */}
        {practiceMode && (
          <div className="fixed bottom-4 right-4 px-3 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 z-50">
            <span className="text-yellow-400 text-sm font-medium">📝 Practice Mode</span>
          </div>
        )}

        {/* Top bar with timer and warnings */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 md:p-6 rounded-[24px] md:rounded-[32px] bg-white/95 backdrop-blur-3xl border border-slate-200/80 sticky top-2 md:top-4 z-40 shadow-xl shadow-slate-100 gap-4 md:gap-8">
          <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-slate-50 border border-slate-200 rounded-[14px] md:rounded-[18px]">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
              </div>
              <TimerDisplay seconds={testState.timeRemaining} label="Session Clock" />
            </div>
            <div className="hidden md:block h-10 w-[1px] bg-slate-200" />
            <div className="flex flex-col text-right md:text-left">
                <span className="text-[8px] md:text-[9px]  font-black text-slate-450 uppercase tracking-[0.2em] italic">Active Module</span>
                <span className="text-slate-800 text-[12px] md:text-[16px]  font-black uppercase italic tracking-widest leading-none">{currentSection.section.name}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
            <TimerDisplay seconds={sectionTimeRemaining} label="Module Expiry" />
            {!practiceMode && (
              <div className="flex items-center gap-4 md:gap-6 pl-4 md:pl-8 border-l border-slate-200">
                {proctoring.state.warningCount > 0 && (
                  <div className="flex flex-col items-center">
                     <span className="text-[8px] md:text-[9px]  font-black text-red-500/60 uppercase mb-1">Alerts</span>
                     <span className="text-[12px] md:text-[14px]  font-black text-red-500 uppercase italic">{proctoring.state.warningCount}/3</span>
                  </div>
                )}
                <div className="flex gap-1.5 md:gap-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)] ${proctoring.state.cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)] ${proctoring.state.microphoneEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>
            )}
            {/* Back / Exit button — always visible during active test */}
            <button
              onClick={async () => {
                const confirmed = window.confirm(
                  'Are you sure you want to exit the assessment?\n\nYour progress will NOT be saved and you may need to retake the test.'
                );
                if (confirmed) {
                  await handleBack();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-red-550 hover:border-red-200 hover:text-red-655 transition-all shadow-sm"
              title="Exit Assessment"
            >
              <ChevronLeft className="w-3 h-3" /> Exit
            </button>
          </div>
        </div>

        {/* Section progress */}
        <div className="flex gap-2 px-2">
          {testState.sections.map((sec, idx) => (
            <div 
              key={sec.section.id}
              className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                idx < testState.currentSectionIndex ? 'bg-slate-400' :
                idx === testState.currentSectionIndex ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)]' :
                'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {currentQuestion.type === 'coding' ? (
          <CodingArea
            currentQuestion={currentQuestion}
            currentSection={currentSection}
            onAnswer={handleCodingAnswer}
            onNavigate={(idx: number) => setTestState(prev => ({ ...prev, currentQuestionIndex: idx }))}
            questionIndex={testState.currentQuestionIndex}
          />
        ) : (
          <QuestionArea
            currentQuestion={currentQuestion}
            currentSection={currentSection}
            onAnswer={handleAnswer}
            onNavigate={(idx: number) => setTestState(prev => ({ ...prev, currentQuestionIndex: idx }))}
            questionIndex={testState.currentQuestionIndex}
          />
        )}

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-10 border-t border-slate-200 gap-6">
            <button
               onClick={handlePrevQuestion}
               disabled={testState.currentQuestionIndex === 0}
               className="order-2 md:order-1 flex items-center gap-3 text-[10px] md:text-[11px]  font-black text-slate-400 hover:text-slate-700 uppercase tracking-[0.4em] transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" /> Previous Alpha
            </button>

            <button 
              onClick={() => {
                if (testState.currentQuestionIndex === currentSection.questions.length - 1) {
                  handleNextSection();
                } else {
                  handleNextQuestion();
                }
              }}
              className="order-1 md:order-2 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-[18px] md:rounded-[22px]  font-black uppercase tracking-[0.1em] md:tracking-[0.2em] italic text-[13px] md:text-[14px] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-indigo-100"
            >
              {testState.currentQuestionIndex === currentSection.questions.length - 1 ? (
                testState.currentSectionIndex === testState.sections.length - 1 ? (
                  <>Finalize Protocol <CheckCircle className="w-5 h-5" /></>
                ) : (
                  <>Next Diagnostic <ChevronRight className="w-5 h-5" /></>
                )
              ) : (
                <>Next Signal <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>

        {/* Section info */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-200/80 gap-4 shadow-sm">
          <p className="text-[10px] md:text-[12px]  font-black text-slate-400 uppercase tracking-[0.2em] italic text-center md:text-left">
            <span className="text-slate-700">
              {Object.keys(currentSection.answers).length}
            </span>
            /{currentSection.questions.length} Signals Captured in current module
          </p>
          <p className="text-[10px] md:text-[12px]  font-black text-slate-400 uppercase tracking-[0.2em] italic">
            Operational Unit {testState.currentSectionIndex + 1} <span className="text-slate-300">/ {testState.sections.length}</span>
          </p>
        </div>
      </>
    );
  }

  // Fallback for any unhandled status
  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh] selection:bg-slate-900 selection:text-white">
      <div className="relative bg-white/80 backdrop-blur-3xl rounded-[40px] p-20 border border-slate-200/80 overflow-hidden text-center max-w-lg w-full shadow-xl shadow-slate-100">
        <div className="w-24 h-24 mx-auto mb-10 rounded-[32px] bg-slate-50 border border-slate-200 flex items-center justify-center">
          <div className="w-8 h-8 bg-slate-400 rounded-full animate-pulse opacity-20" />
        </div>
        <p className="text-[11px]  font-[900] uppercase tracking-[0.6em] text-slate-400 mb-4">System Protocol</p>
        <h2 className="text-3xl  font-[900] text-slate-800 uppercase tracking-tighter italic mb-4">Initializing Diagnostic</h2>
        <p className="text-[14px]  font-medium text-slate-500 italic">Please wait while the diagnostic environment is calibrated.</p>
        <div className="mt-10 flex justify-center gap-2">
           <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
           <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
           <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden selection:bg-slate-900 selection:text-white">
      {/* Background Educational Video - Cinematic Tech Abstract (Signal Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-[0.03] mix-blend-multiply brightness-[1.1]"
        >
          <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_180444_a1a13b6a-9f4a-4a2c-8f1a-6a54f67e5005.mp4" 
              type="video/mp4" 
          />
        </video>
        {/* Subtle Multi-layered Ambient Glows - Signature Landing Style */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-slate-100/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-transparent to-slate-50/90 pointer-events-none" />
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[1px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 w-full h-full bg-slate-50 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <GridBeam className="absolute inset-0 opacity-40" />
        <GridPattern

          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 12],
            [15, 10],
            [10, 15],
          ]}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-30 pointer-events-none",
          )}
        />
      </div>

      {/* Primary Assessment Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:py-20 pointer-events-none">
        <div className="pointer-events-auto">
          {renderAssessmentContent()}
        </div>
      </div>
    </div>
  );
};

export default ProctoredAssessment;
