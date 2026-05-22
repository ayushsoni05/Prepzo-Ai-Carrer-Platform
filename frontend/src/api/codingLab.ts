export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptanceRate: number;
  companyTags: string[];
  hints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases: TestCase[];
}

export const codingProblems: CodingProblem[] = [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "description": "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.\n<br/><br/>\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n<br/><br/>\nYou can return the answer in any order.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>2 <= nums.length <= 10<sup>4</sup></code></li>\n  <li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>\n  <li><code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code></li>\n  <li><strong>Only one valid answer exists.</strong></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 51.2,
    "companyTags": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "hints": [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Try to use a hash map to store the elements you have seen so far."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    \n}",
      "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[2,7,11,15], 9]",
        "expectedOutput": "[0,1]"
      },
      {
        "id": "tc2",
        "input": "[[3,2,4], 6]",
        "expectedOutput": "[1,2]"
      },
      {
        "id": "tc3",
        "input": "[[3,3], 6]",
        "expectedOutput": "[0,1]"
      }
    ]
  },
  {
    "id": "mock-problem-1",
    "title": "Reverse a Substring 1",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 36.7,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-2",
    "title": "Detect Cycle in Graph 2",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 30.9,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-3",
    "title": "Maximum Path Sum 3",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 33.9,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-4",
    "title": "Coin Change Variant 4",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 53.2,
    "companyTags": [
      "Uber",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-5",
    "title": "Longest Increasing Subsequence 5",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 35,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-6",
    "title": "Merge Overlapping Intervals 6",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 54,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-7",
    "title": "Valid Parentheses Combination 7",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 60.8,
    "companyTags": [
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-8",
    "title": "Word Break 8",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 35.9,
    "companyTags": [
      "Apple",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-9",
    "title": "Kth Largest Element 9",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 49.1,
    "companyTags": [
      "Apple",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-10",
    "title": "Find the Missing Element in Array 10",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 56.5,
    "companyTags": [
      "Apple",
      "Microsoft",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-11",
    "title": "Reverse a Substring 11",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 30.1,
    "companyTags": [
      "Amazon",
      "Apple",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-12",
    "title": "Detect Cycle in Graph 12",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 49.8,
    "companyTags": [
      "Meta",
      "Tesla",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-13",
    "title": "Maximum Path Sum 13",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 30.2,
    "companyTags": [
      "Google",
      "Airbnb",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-14",
    "title": "Coin Change Variant 14",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 62.3,
    "companyTags": [
      "Apple",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-15",
    "title": "Longest Increasing Subsequence 15",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 32.7,
    "companyTags": [
      "Netflix",
      "Apple",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-16",
    "title": "Merge Overlapping Intervals 16",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 46.5,
    "companyTags": [
      "Uber",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-17",
    "title": "Valid Parentheses Combination 17",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 32.7,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-18",
    "title": "Word Break 18",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 37.7,
    "companyTags": [
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-19",
    "title": "Kth Largest Element 19",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 42.7,
    "companyTags": [
      "Airbnb",
      "Tesla",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-20",
    "title": "Find the Missing Element in Array 20",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 34.7,
    "companyTags": [
      "Google",
      "Apple",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-21",
    "title": "Reverse a Substring 21",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 56,
    "companyTags": [
      "Apple",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-22",
    "title": "Detect Cycle in Graph 22",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 45.7,
    "companyTags": [
      "Apple",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-23",
    "title": "Maximum Path Sum 23",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 54.4,
    "companyTags": [
      "Stripe",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-24",
    "title": "Coin Change Variant 24",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 50,
    "companyTags": [
      "Amazon",
      "Google",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-25",
    "title": "Longest Increasing Subsequence 25",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 39.9,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-26",
    "title": "Merge Overlapping Intervals 26",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 43.5,
    "companyTags": [
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-27",
    "title": "Valid Parentheses Combination 27",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 33,
    "companyTags": [
      "Uber",
      "Airbnb",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-28",
    "title": "Word Break 28",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 50.8,
    "companyTags": [
      "Amazon",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-29",
    "title": "Kth Largest Element 29",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 67.3,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-30",
    "title": "Find the Missing Element in Array 30",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 49.4,
    "companyTags": [
      "Apple",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-31",
    "title": "Reverse a Substring 31",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 45.7,
    "companyTags": [
      "Apple",
      "Netflix",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-32",
    "title": "Detect Cycle in Graph 32",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 67.1,
    "companyTags": [
      "Google",
      "Amazon",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-33",
    "title": "Maximum Path Sum 33",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 41.8,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-34",
    "title": "Coin Change Variant 34",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 36.1,
    "companyTags": [
      "Microsoft",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-35",
    "title": "Longest Increasing Subsequence 35",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 37.8,
    "companyTags": [
      "Apple",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-36",
    "title": "Merge Overlapping Intervals 36",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "ByteDance",
      "Google",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-37",
    "title": "Valid Parentheses Combination 37",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 66.8,
    "companyTags": [
      "Google",
      "Microsoft",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-38",
    "title": "Word Break 38",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 42.7,
    "companyTags": [
      "Uber",
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-39",
    "title": "Kth Largest Element 39",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 46.1,
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-40",
    "title": "Find the Missing Element in Array 40",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 31.2,
    "companyTags": [
      "Apple",
      "Stripe",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-41",
    "title": "Reverse a Substring 41",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 39.2,
    "companyTags": [
      "Meta",
      "Microsoft",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-42",
    "title": "Detect Cycle in Graph 42",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 66.2,
    "companyTags": [
      "Tesla",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-43",
    "title": "Maximum Path Sum 43",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Google",
      "Uber",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-44",
    "title": "Coin Change Variant 44",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 32.1,
    "companyTags": [
      "Airbnb",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-45",
    "title": "Longest Increasing Subsequence 45",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 64.7,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-46",
    "title": "Merge Overlapping Intervals 46",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 39.9,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-47",
    "title": "Valid Parentheses Combination 47",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 39.3,
    "companyTags": [
      "Meta",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-48",
    "title": "Word Break 48",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 50.5,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-49",
    "title": "Kth Largest Element 49",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 45.1,
    "companyTags": [
      "Tesla",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-50",
    "title": "Find the Missing Element in Array 50",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 61.2,
    "companyTags": [
      "Microsoft",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-51",
    "title": "Reverse a Substring 51",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 41.7,
    "companyTags": [
      "Apple",
      "Microsoft",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-52",
    "title": "Detect Cycle in Graph 52",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 32.8,
    "companyTags": [
      "Airbnb",
      "Netflix",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-53",
    "title": "Maximum Path Sum 53",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 32.1,
    "companyTags": [
      "Apple",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-54",
    "title": "Coin Change Variant 54",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Google",
      "Amazon",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-55",
    "title": "Longest Increasing Subsequence 55",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 55.6,
    "companyTags": [
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-56",
    "title": "Merge Overlapping Intervals 56",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 54.9,
    "companyTags": [
      "Stripe",
      "Airbnb",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-57",
    "title": "Valid Parentheses Combination 57",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-58",
    "title": "Word Break 58",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 36.5,
    "companyTags": [
      "Uber",
      "Tesla",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-59",
    "title": "Kth Largest Element 59",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 40.1,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-60",
    "title": "Find the Missing Element in Array 60",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 30.7,
    "companyTags": [
      "Uber",
      "ByteDance",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-61",
    "title": "Reverse a Substring 61",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 44.9,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-62",
    "title": "Detect Cycle in Graph 62",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 41.8,
    "companyTags": [
      "ByteDance",
      "Airbnb",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-63",
    "title": "Maximum Path Sum 63",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 36.4,
    "companyTags": [
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-64",
    "title": "Coin Change Variant 64",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 65,
    "companyTags": [
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-65",
    "title": "Longest Increasing Subsequence 65",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 36.9,
    "companyTags": [
      "Microsoft",
      "Google",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-66",
    "title": "Merge Overlapping Intervals 66",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 37.9,
    "companyTags": [
      "Google",
      "Stripe",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-67",
    "title": "Valid Parentheses Combination 67",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 61.3,
    "companyTags": [
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-68",
    "title": "Word Break 68",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 35.8,
    "companyTags": [
      "Tesla",
      "Meta",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-69",
    "title": "Kth Largest Element 69",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 62.9,
    "companyTags": [
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-70",
    "title": "Find the Missing Element in Array 70",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 54.5,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-71",
    "title": "Reverse a Substring 71",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 69.8,
    "companyTags": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-72",
    "title": "Detect Cycle in Graph 72",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 43.7,
    "companyTags": [
      "Netflix",
      "Amazon",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-73",
    "title": "Maximum Path Sum 73",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Google",
      "Apple",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-74",
    "title": "Coin Change Variant 74",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 39.5,
    "companyTags": [
      "Google",
      "Amazon",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-75",
    "title": "Longest Increasing Subsequence 75",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 36,
    "companyTags": [
      "Tesla",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-76",
    "title": "Merge Overlapping Intervals 76",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 34.4,
    "companyTags": [
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-77",
    "title": "Valid Parentheses Combination 77",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 62.7,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-78",
    "title": "Word Break 78",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 51.5,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-79",
    "title": "Kth Largest Element 79",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 43.9,
    "companyTags": [
      "Google",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-80",
    "title": "Find the Missing Element in Array 80",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 45.3,
    "companyTags": [
      "Stripe",
      "Airbnb",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-81",
    "title": "Reverse a Substring 81",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 52.6,
    "companyTags": [
      "Meta",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-82",
    "title": "Detect Cycle in Graph 82",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 39.6,
    "companyTags": [
      "Meta",
      "Amazon",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-83",
    "title": "Maximum Path Sum 83",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 40.1,
    "companyTags": [
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-84",
    "title": "Coin Change Variant 84",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 62.1,
    "companyTags": [
      "ByteDance",
      "Uber",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-85",
    "title": "Longest Increasing Subsequence 85",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 30.4,
    "companyTags": [
      "Google",
      "Stripe",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-86",
    "title": "Merge Overlapping Intervals 86",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 59.9,
    "companyTags": [
      "Amazon",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-87",
    "title": "Valid Parentheses Combination 87",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 68.8,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  },
  {
    "id": "mock-problem-88",
    "title": "Word Break 88",
    "description": "Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"leetcode\", [\"leet\",\"code\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"applepenapple\", [\"apple\",\"pen\"]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 300</code></li><li><code>1 <= wordDict.length <= 1000</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 55.7,
    "companyTags": [
      "Netflix",
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"leetcode\", [\"leet\",\"code\"]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[\"applepenapple\", [\"apple\",\"pen\"]]",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": "mock-problem-89",
    "title": "Kth Largest Element 89",
    "description": "Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,2,1,5,6,4], 2\n<strong>Output:</strong> 5</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [3,2,3,1,2,4,5,5,6], 4\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= k <= nums.length <= 10^5</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 54.3,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,2,1,5,6,4], 2]",
        "expectedOutput": "5"
      },
      {
        "id": "tc2",
        "input": "[[3,2,3,1,2,4,5,5,6], 4]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-90",
    "title": "Find the Missing Element in Array 90",
    "description": "Given an array containing <code>n</code> distinct numbers taken from <code>0, 1, 2, ..., n</code>, find the one that is missing from the array.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [3,0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1]\n<strong>Output:</strong> 2</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>n == nums.length</code></li><li><code>1 <= n <= 10^4</code></li><li><code>0 <= nums[i] <= n</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 45.9,
    "companyTags": [
      "Microsoft",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[3,0,1]]",
        "expectedOutput": "2"
      },
      {
        "id": "tc2",
        "input": "[[0,1]]",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": "mock-problem-91",
    "title": "Reverse a Substring 91",
    "description": "Given a string <code>s</code>, reverse a specific substring within it and return the modified string.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> \"abcdef\", 1, 3\n<strong>Output:</strong> \"adcbef\"</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> \"hello\", 0, 4\n<strong>Output:</strong> \"olleh\"</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= s.length <= 10^5</code></li><li><code>s</code> consists of printable ASCII characters.</li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 38,
    "companyTags": [
      "ByteDance",
      "Tesla",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[\"abcdef\", 1, 3]",
        "expectedOutput": "\"adcbef\""
      },
      {
        "id": "tc2",
        "input": "[\"hello\", 0, 4]",
        "expectedOutput": "\"olleh\""
      }
    ]
  },
  {
    "id": "mock-problem-92",
    "title": "Detect Cycle in Graph 92",
    "description": "Given a directed graph, determine if it contains a cycle. Return <code>true</code> if there is a cycle, otherwise <code>false</code>.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,0]]\n<strong>Output:</strong> true</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[0,1],[1,2],[2,3]]\n<strong>Output:</strong> false</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= numNodes <= 10^4</code></li><li><code>0 <= edges.length <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 36.5,
    "companyTags": [
      "ByteDance",
      "Apple",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[0,1],[1,2],[2,0]]]",
        "expectedOutput": "true"
      },
      {
        "id": "tc2",
        "input": "[[[0,1],[1,2],[2,3]]]",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": "mock-problem-93",
    "title": "Maximum Path Sum 93",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,3]\n<strong>Output:</strong> 6</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 <= Node.val <= 1000</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 31.1,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,3]]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[[-10,9,20,null,null,15,7]]",
        "expectedOutput": "42"
      }
    ]
  },
  {
    "id": "mock-problem-94",
    "title": "Coin Change Variant 94",
    "description": "You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [1,2,5], 11\n<strong>Output:</strong> 3</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [2], 3\n<strong>Output:</strong> -1</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= coins.length <= 12</code></li><li><code>1 <= coins[i] <= 2^31 - 1</code></li><li><code>0 <= amount <= 10^4</code></li>\n</ul>",
    "difficulty": "Hard",
    "acceptanceRate": 48.7,
    "companyTags": [
      "Amazon",
      "Apple",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[1,2,5], 11]",
        "expectedOutput": "3"
      },
      {
        "id": "tc2",
        "input": "[[2], 3]",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": "mock-problem-95",
    "title": "Longest Increasing Subsequence 95",
    "description": "Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [0,1,0,3,2,3]\n<strong>Output:</strong> 4</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= nums.length <= 2500</code></li><li><code>-10^4 <= nums[i] <= 10^4</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 66.6,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[10,9,2,5,3,7,101,18]]",
        "expectedOutput": "4"
      },
      {
        "id": "tc2",
        "input": "[[0,1,0,3,2,3]]",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": "mock-problem-96",
    "title": "Merge Overlapping Intervals 96",
    "description": "Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= intervals.length <= 10^4</code></li><li><code>intervals[i].length == 2</code></li>\n</ul>",
    "difficulty": "Easy",
    "acceptanceRate": 33.9,
    "companyTags": [
      "ByteDance",
      "Apple",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[[[1,3],[2,6],[8,10],[15,18]]]",
        "expectedOutput": "[[1,6],[8,10],[15,18]]"
      },
      {
        "id": "tc2",
        "input": "[[[1,4],[4,5]]]",
        "expectedOutput": "[[1,5]]"
      }
    ]
  },
  {
    "id": "mock-problem-97",
    "title": "Valid Parentheses Combination 97",
    "description": "Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n<br/><br/>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]</pre>\n\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> 1\n<strong>Output:</strong> [\"()\"]</pre>\n\n<p><strong>Constraints:</strong></p>\n<ul>\n  <li><code>1 <= n <= 8</code></li>\n</ul>",
    "difficulty": "Medium",
    "acceptanceRate": 41.7,
    "companyTags": [
      "Tesla",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nfunction solve(input) {\n    // Write your code here\n    return input;\n}",
      "python": "def solve(input):\n    # Write your code here\n    return input",
      "cpp": "class Solution {\npublic:\n    int solve(int input) {\n        // Write your code here\n        return input;\n    }\n};",
      "java": "class Solution {\n    public int solve(int input) {\n        // Write your code here\n        return input;\n    }\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[3]",
        "expectedOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "id": "tc2",
        "input": "[1]",
        "expectedOutput": "[\"()\"]"
      }
    ]
  }
];

export const getCodingProblems = async (): Promise<CodingProblem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(codingProblems), 500);
  });
};

export const getCodingProblemById = async (id: string): Promise<CodingProblem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(codingProblems.find(p => p.id === id));
    }, 300);
  });
};
