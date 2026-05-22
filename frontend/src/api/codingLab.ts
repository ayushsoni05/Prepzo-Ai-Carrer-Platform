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
  };
  testCases: TestCase[];
}

export const codingProblems: CodingProblem[] = [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "description": "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.\\n\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\n\\nYou can return the answer in any order.",
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
      "javascript": "/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nfunction twoSum(nums, target) {\\n    \\n}",
      "python": "class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    vector<int> twoSum(vector<int>& nums, int target) {\\n        \\n    }\\n};"
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
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 35.6,
    "companyTags": [
      "Amazon",
      "Netflix",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-2",
    "title": "Detect Cycle in Graph 2",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 35.6,
    "companyTags": [
      "Google",
      "Stripe",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-3",
    "title": "Maximum Path Sum 3",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 68.6,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-4",
    "title": "Coin Change Variant 4",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 54,
    "companyTags": [
      "Airbnb",
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-5",
    "title": "Longest Increasing Subsequence 5",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 52.5,
    "companyTags": [
      "Microsoft",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-6",
    "title": "Merge Overlapping Intervals 6",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 41.2,
    "companyTags": [
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-7",
    "title": "Valid Parentheses Combination 7",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 40.9,
    "companyTags": [
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-8",
    "title": "Word Break 8",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 42.7,
    "companyTags": [
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-9",
    "title": "Kth Largest Element 9",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 68.2,
    "companyTags": [
      "Uber",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-10",
    "title": "Find the Missing Element in Array 10",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 52.6,
    "companyTags": [
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-11",
    "title": "Reverse a Substring 11",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 54.1,
    "companyTags": [
      "Google",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-12",
    "title": "Detect Cycle in Graph 12",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-13",
    "title": "Maximum Path Sum 13",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 37.6,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-14",
    "title": "Coin Change Variant 14",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 51.2,
    "companyTags": [
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-15",
    "title": "Longest Increasing Subsequence 15",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 30.4,
    "companyTags": [
      "Stripe",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-16",
    "title": "Merge Overlapping Intervals 16",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 50.8,
    "companyTags": [
      "Apple",
      "Netflix",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-17",
    "title": "Valid Parentheses Combination 17",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 32.3,
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-18",
    "title": "Word Break 18",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 60.9,
    "companyTags": [
      "Apple",
      "Google",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-19",
    "title": "Kth Largest Element 19",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 52.9,
    "companyTags": [
      "Tesla",
      "ByteDance",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-20",
    "title": "Find the Missing Element in Array 20",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 32.2,
    "companyTags": [
      "Airbnb",
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-21",
    "title": "Reverse a Substring 21",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 60.8,
    "companyTags": [
      "Apple",
      "Google",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-22",
    "title": "Detect Cycle in Graph 22",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 58.3,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-23",
    "title": "Maximum Path Sum 23",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 58.4,
    "companyTags": [
      "Uber",
      "Tesla",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-24",
    "title": "Coin Change Variant 24",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 47.5,
    "companyTags": [
      "Stripe",
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-25",
    "title": "Longest Increasing Subsequence 25",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 48.1,
    "companyTags": [
      "Microsoft",
      "Amazon",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-26",
    "title": "Merge Overlapping Intervals 26",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 44.3,
    "companyTags": [
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-27",
    "title": "Valid Parentheses Combination 27",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 48.7,
    "companyTags": [
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-28",
    "title": "Word Break 28",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 58.6,
    "companyTags": [
      "Amazon",
      "Meta",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-29",
    "title": "Kth Largest Element 29",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 35.3,
    "companyTags": [
      "Airbnb",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-30",
    "title": "Find the Missing Element in Array 30",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 59,
    "companyTags": [
      "Airbnb",
      "Tesla",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-31",
    "title": "Reverse a Substring 31",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 64.3,
    "companyTags": [
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-32",
    "title": "Detect Cycle in Graph 32",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 37.3,
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-33",
    "title": "Maximum Path Sum 33",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 50.1,
    "companyTags": [
      "Google",
      "Tesla",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-34",
    "title": "Coin Change Variant 34",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 63.3,
    "companyTags": [
      "Netflix",
      "Airbnb",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-35",
    "title": "Longest Increasing Subsequence 35",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 54,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-36",
    "title": "Merge Overlapping Intervals 36",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 61.7,
    "companyTags": [
      "Stripe",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-37",
    "title": "Valid Parentheses Combination 37",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 67.1,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-38",
    "title": "Word Break 38",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 32.3,
    "companyTags": [
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-39",
    "title": "Kth Largest Element 39",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 63,
    "companyTags": [
      "Uber",
      "Apple",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-40",
    "title": "Find the Missing Element in Array 40",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 40.5,
    "companyTags": [
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-41",
    "title": "Reverse a Substring 41",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 52.5,
    "companyTags": [
      "Amazon",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-42",
    "title": "Detect Cycle in Graph 42",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 68.7,
    "companyTags": [
      "Netflix",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-43",
    "title": "Maximum Path Sum 43",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 48.3,
    "companyTags": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-44",
    "title": "Coin Change Variant 44",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 46.2,
    "companyTags": [
      "Tesla",
      "Apple",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-45",
    "title": "Longest Increasing Subsequence 45",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 42.7,
    "companyTags": [
      "Amazon",
      "Meta",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-46",
    "title": "Merge Overlapping Intervals 46",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 31.6,
    "companyTags": [
      "Apple",
      "Uber",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-47",
    "title": "Valid Parentheses Combination 47",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 31.8,
    "companyTags": [
      "ByteDance",
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-48",
    "title": "Word Break 48",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 59,
    "companyTags": [
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-49",
    "title": "Kth Largest Element 49",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 67.6,
    "companyTags": [
      "Apple",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-50",
    "title": "Find the Missing Element in Array 50",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 32.4,
    "companyTags": [
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-51",
    "title": "Reverse a Substring 51",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 55.3,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-52",
    "title": "Detect Cycle in Graph 52",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 38.3,
    "companyTags": [
      "Uber",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-53",
    "title": "Maximum Path Sum 53",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 36.1,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-54",
    "title": "Coin Change Variant 54",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 42.2,
    "companyTags": [
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-55",
    "title": "Longest Increasing Subsequence 55",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 30.9,
    "companyTags": [
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-56",
    "title": "Merge Overlapping Intervals 56",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 48.5,
    "companyTags": [
      "Meta",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-57",
    "title": "Valid Parentheses Combination 57",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 31,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-58",
    "title": "Word Break 58",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 38.3,
    "companyTags": [
      "Amazon",
      "ByteDance",
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-59",
    "title": "Kth Largest Element 59",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 52.6,
    "companyTags": [
      "Apple",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-60",
    "title": "Find the Missing Element in Array 60",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 48.2,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-61",
    "title": "Reverse a Substring 61",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 30.4,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-62",
    "title": "Detect Cycle in Graph 62",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 46.6,
    "companyTags": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-63",
    "title": "Maximum Path Sum 63",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 49.4,
    "companyTags": [
      "Tesla",
      "Uber",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-64",
    "title": "Coin Change Variant 64",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 67.1,
    "companyTags": [
      "ByteDance",
      "Microsoft",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-65",
    "title": "Longest Increasing Subsequence 65",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 68.6,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-66",
    "title": "Merge Overlapping Intervals 66",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 69.5,
    "companyTags": [
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-67",
    "title": "Valid Parentheses Combination 67",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 36.9,
    "companyTags": [
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-68",
    "title": "Word Break 68",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 47.8,
    "companyTags": [
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-69",
    "title": "Kth Largest Element 69",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 35.5,
    "companyTags": [
      "Google",
      "Amazon",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-70",
    "title": "Find the Missing Element in Array 70",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 46.9,
    "companyTags": [
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-71",
    "title": "Reverse a Substring 71",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 49,
    "companyTags": [
      "Uber",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-72",
    "title": "Detect Cycle in Graph 72",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 66.5,
    "companyTags": [
      "Microsoft",
      "Meta",
      "ByteDance"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-73",
    "title": "Maximum Path Sum 73",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 42.7,
    "companyTags": [
      "Google",
      "Netflix",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-74",
    "title": "Coin Change Variant 74",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 33.6,
    "companyTags": [
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-75",
    "title": "Longest Increasing Subsequence 75",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 66.8,
    "companyTags": [
      "Netflix",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-76",
    "title": "Merge Overlapping Intervals 76",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 50.5,
    "companyTags": [
      "Netflix",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-77",
    "title": "Valid Parentheses Combination 77",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 43.3,
    "companyTags": [
      "Amazon",
      "Apple",
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-78",
    "title": "Word Break 78",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 33.9,
    "companyTags": [
      "Netflix",
      "Tesla",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-79",
    "title": "Kth Largest Element 79",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 62.8,
    "companyTags": [
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-80",
    "title": "Find the Missing Element in Array 80",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 59.3,
    "companyTags": [
      "Netflix",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-81",
    "title": "Reverse a Substring 81",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 55,
    "companyTags": [
      "Airbnb",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-82",
    "title": "Detect Cycle in Graph 82",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 62.1,
    "companyTags": [
      "Airbnb",
      "Tesla",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-83",
    "title": "Maximum Path Sum 83",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 44.5,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-84",
    "title": "Coin Change Variant 84",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 45.8,
    "companyTags": [
      "Meta",
      "Netflix",
      "Tesla"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-85",
    "title": "Longest Increasing Subsequence 85",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 59.1,
    "companyTags": [
      "Apple",
      "Microsoft"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-86",
    "title": "Merge Overlapping Intervals 86",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 45.4,
    "companyTags": [
      "Tesla",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-87",
    "title": "Valid Parentheses Combination 87",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 55.6,
    "companyTags": [
      "Apple",
      "Airbnb"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-88",
    "title": "Word Break 88",
    "description": "Given a string and a dictionary, determine if the string can be segmented.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 54.9,
    "companyTags": [
      "Netflix",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-89",
    "title": "Kth Largest Element 89",
    "description": "Find the kth largest element in an unsorted array.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Easy",
    "acceptanceRate": 35.7,
    "companyTags": [
      "Apple",
      "Uber",
      "Meta"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Sorting."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-90",
    "title": "Find the Missing Element in Array 90",
    "description": "Given an array of integers, find the missing element.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 59.3,
    "companyTags": [
      "Google",
      "Apple"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-91",
    "title": "Reverse a Substring 91",
    "description": "Given a string, reverse a specific substring within it.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "ByteDance",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Strings."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-92",
    "title": "Detect Cycle in Graph 92",
    "description": "Given a directed graph, determine if it contains a cycle.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 39,
    "companyTags": [
      "Meta",
      "Google"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Graphs."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-93",
    "title": "Maximum Path Sum 93",
    "description": "Find the maximum path sum in a binary tree.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 53.8,
    "companyTags": [
      "Netflix"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Trees."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-94",
    "title": "Coin Change Variant 94",
    "description": "Find the minimum number of coins to make a given amount.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 52.9,
    "companyTags": [
      "Uber"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-95",
    "title": "Longest Increasing Subsequence 95",
    "description": "Find the length of the longest strictly increasing subsequence.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 32.1,
    "companyTags": [
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Dynamic Programming."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-96",
    "title": "Merge Overlapping Intervals 96",
    "description": "Given a collection of intervals, merge all overlapping intervals.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Medium",
    "acceptanceRate": 58.5,
    "companyTags": [
      "Airbnb",
      "Netflix",
      "Stripe"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Arrays."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": "mock-problem-97",
    "title": "Valid Parentheses Combination 97",
    "description": "Given n pairs of parentheses, generate all valid combinations.\\n\\nConstraint: \\n- <code>1 <= N <= 10^5</code>\\n- Optimize your solution for time complexity.",
    "difficulty": "Hard",
    "acceptanceRate": 60,
    "companyTags": [
      "Google",
      "Amazon"
    ],
    "hints": [
      "Think about edge cases.",
      "Consider using a data structure suited for Backtracking."
    ],
    "starterCode": {
      "javascript": "/**\\n * @param {any} input\\n * @return {any}\\n */\\nfunction solve(input) {\\n    // Write your code here\\n    return input;\\n}",
      "python": "def solve(input):\\n    # Write your code here\\n    return input",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        // Write your code here\\n        return input;\\n    }\\n};"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6"
      },
      {
        "id": "tc2",
        "input": "[0]",
        "expectedOutput": "0"
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
