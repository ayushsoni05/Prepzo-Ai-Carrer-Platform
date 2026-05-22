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
    "description": "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Hash Table"
    ],
    "hints": [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say <code>x</code>, we have to scan the entire array to find the next number <code>y</code> which is <code>value - x</code> where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "add-two-numbers",
    "title": "Add Two Numbers",
    "description": "<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum&nbsp;as a linked list.</p>\n\n<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg\" style=\"width: 483px; height: 342px;\" />\n<pre>\n<strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [7,0,8]\n<strong>Explanation:</strong> 342 + 465 = 807.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> l1 = [0], l2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>Output:</strong> [8,9,9,9,0,0,0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>It is guaranteed that the list represents a number that does not have leading zeros.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Linked List",
      "Math",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "description": "<p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <span data-keyword=\"substring-nonempty\"><strong>substring</strong></span> without duplicate characters.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;abcabcbb&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is &quot;abc&quot;, with the length of 3. Note that <code>&quot;bca&quot;</code> and <code>&quot;cab&quot;</code> are also correct answers.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;bbbbb&quot;\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The answer is &quot;b&quot;, with the length of 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;pwwkew&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is &quot;wke&quot;, with the length of 3.\nNotice that the answer must be a substring, &quot;pwke&quot; is a subsequence and not a substring.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "hints": [
      "Since maximum string size is at most 26, generate and check all possible substrings with length at most 26."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "description": "<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>\n\n<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,3], nums2 = [2]\n<strong>Output:</strong> 2.00000\n<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]\n<strong>Output:</strong> 2.50000\n<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>nums1.length == m</code></li>\n\t<li><code>nums2.length == n</code></li>\n\t<li><code>0 &lt;= m &lt;= 1000</code></li>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>1 &lt;= m + n &lt;= 2000</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "description": "<p>Given a string <code>s</code>, return <em>the longest</em> <span data-keyword=\"palindromic-string\"><em>palindromic</em></span> <span data-keyword=\"substring-nonempty\"><em>substring</em></span> in <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;babad&quot;\n<strong>Output:</strong> &quot;bab&quot;\n<strong>Explanation:</strong> &quot;aba&quot; is also a valid answer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cbbd&quot;\n<strong>Output:</strong> &quot;bb&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consist of only digits and English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 48,
    "companyTags": [
      "Two Pointers",
      "String",
      "Dynamic Programming"
    ],
    "hints": [
      "How can we reuse a previously computed palindrome to compute a larger palindrome?",
      "If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?",
      "Complexity based hint:</br>\r\nIf we use brute-force and check whether for every start and end position a substring is a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "zigzag-conversion",
    "title": "Zigzag Conversion",
    "description": "<p>The string <code>&quot;PAYPALISHIRING&quot;</code> is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)</p>\n\n<pre>\nP   A   H   N\nA P L S I I G\nY   I   R\n</pre>\n\n<p>And then read line by line: <code>&quot;PAHNAPLSIIGYIR&quot;</code></p>\n\n<p>Write the code that will take a string and make this conversion given a number of rows:</p>\n\n<pre>\nstring convert(string s, int numRows);\n</pre>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;PAYPALISHIRING&quot;, numRows = 3\n<strong>Output:</strong> &quot;PAHNAPLSIIGYIR&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;PAYPALISHIRING&quot;, numRows = 4\n<strong>Output:</strong> &quot;PINALSIGYAHRPI&quot;\n<strong>Explanation:</strong>\nP     I    N\nA   L S  I G\nY A   H R\nP     I\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;A&quot;, numRows = 1\n<strong>Output:</strong> &quot;A&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consists of English letters (lower-case and upper-case), <code>&#39;,&#39;</code> and <code>&#39;.&#39;</code>.</li>\n\t<li><code>1 &lt;= numRows &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-integer",
    "title": "Reverse Integer",
    "description": "<p>Given a signed 32-bit integer <code>x</code>, return <code>x</code><em> with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then return <code>0</code>.</p>\n\n<p><strong>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</strong></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 123\n<strong>Output:</strong> 321\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = -123\n<strong>Output:</strong> -321\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 120\n<strong>Output:</strong> 21\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 51,
    "companyTags": [
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "string-to-integer-atoi",
    "title": "String to Integer (atoi)",
    "description": "<p>Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer.</p>\n\n<p>The algorithm for <code>myAtoi(string s)</code> is as follows:</p>\n\n<ol>\n\t<li><strong>Whitespace</strong>: Ignore any leading whitespace (<code>&quot; &quot;</code>).</li>\n\t<li><strong>Signedness</strong>: Determine the sign by checking if the next character is <code>&#39;-&#39;</code> or <code>&#39;+&#39;</code>, assuming positivity if neither present.</li>\n\t<li><strong>Conversion</strong>: Read the integer by skipping leading zeros&nbsp;until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.</li>\n\t<li><strong>Rounding</strong>: If the integer is out of the 32-bit signed integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then round the integer to remain in the range. Specifically, integers less than <code>-2<sup>31</sup></code> should be rounded to <code>-2<sup>31</sup></code>, and integers greater than <code>2<sup>31</sup> - 1</code> should be rounded to <code>2<sup>31</sup> - 1</code>.</li>\n</ol>\n\n<p>Return the integer as the final result.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;42&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">42</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\nThe underlined characters are what is read in and the caret is the current reader position.\nStep 1: &quot;42&quot; (no characters read because there is no leading whitespace)\n         ^\nStep 2: &quot;42&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)\n         ^\nStep 3: &quot;<u>42</u>&quot; (&quot;42&quot; is read in)\n           ^\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot; -042&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">-42</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\nStep 1: &quot;<u>   </u>-042&quot; (leading whitespace is read and ignored)\n            ^\nStep 2: &quot;   <u>-</u>042&quot; (&#39;-&#39; is read, so the result should be negative)\n             ^\nStep 3: &quot;   -<u>042</u>&quot; (&quot;042&quot; is read in, leading zeros ignored in the result)\n               ^\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;1337c0d3&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1337</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\nStep 1: &quot;1337c0d3&quot; (no characters read because there is no leading whitespace)\n         ^\nStep 2: &quot;1337c0d3&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)\n         ^\nStep 3: &quot;<u>1337</u>c0d3&quot; (&quot;1337&quot; is read in; reading stops because the next character is a non-digit)\n             ^\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;0-1&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">0</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\nStep 1: &quot;0-1&quot; (no characters read because there is no leading whitespace)\n         ^\nStep 2: &quot;0-1&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)\n         ^\nStep 3: &quot;<u>0</u>-1&quot; (&quot;0&quot; is read in; reading stops because the next character is a non-digit)\n          ^\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 5:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;words and 987&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">0</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>Reading stops at the first non-digit character &#39;w&#39;.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 200</code></li>\n\t<li><code>s</code> consists of English letters (lower-case and upper-case), digits (<code>0-9</code>), <code>&#39; &#39;</code>, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, and <code>&#39;.&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 43,
    "companyTags": [
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "palindrome-number",
    "title": "Palindrome Number",
    "description": "<p>Given an integer <code>x</code>, return <code>true</code><em> if </em><code>x</code><em> is a </em><span data-keyword=\"palindrome-integer\"><em><strong>palindrome</strong></em></span><em>, and </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 121\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 121 reads as 121 from left to right and from right to left.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = -121\n<strong>Output:</strong> false\n<strong>Explanation:</strong> From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 10\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Reads 01 from right to left. Therefore it is not a palindrome.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it without converting the integer to a string?",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Math"
    ],
    "hints": [
      "Beware of overflow when you reverse the integer."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "regular-expression-matching",
    "title": "Regular Expression Matching",
    "description": "<p>Given an input string <code>s</code>&nbsp;and a pattern <code>p</code>, implement regular expression matching with support for <code>&#39;.&#39;</code> and <code>&#39;*&#39;</code> where:</p>\n\n<ul>\n\t<li><code>&#39;.&#39;</code> Matches any single character.​​​​</li>\n\t<li><code>&#39;*&#39;</code> Matches zero or more of the preceding element.</li>\n</ul>\n\n<p>Return a boolean indicating whether the matching covers the entire input string (not partial).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;a&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> &quot;a&quot; does not match the entire string &quot;aa&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;a*&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> &#39;*&#39; means zero or more of the preceding element, &#39;a&#39;. Therefore, by repeating &#39;a&#39; once, it becomes &quot;aa&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ab&quot;, p = &quot;.*&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> &quot;.*&quot; means &quot;zero or more (*) of any character (.)&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length&nbsp;&lt;= 20</code></li>\n\t<li><code>1 &lt;= p.length&nbsp;&lt;= 20</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n\t<li><code>p</code> contains only lowercase English letters, <code>&#39;.&#39;</code>, and&nbsp;<code>&#39;*&#39;</code>.</li>\n\t<li>It is guaranteed for each appearance of the character <code>&#39;*&#39;</code>, there will be a previous valid character to match.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 31,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "description": "<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n\n<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n\n<p>Return <em>the maximum amount of water a container can store</em>.</p>\n\n<p><strong>Notice</strong> that you may not slant the container.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg\" style=\"width: 600px; height: 287px;\" />\n<pre>\n<strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]\n<strong>Output:</strong> 49\n<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> height = [1,1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "hints": [
      "If you simulate the problem, it will be O(n^2) which is not efficient.",
      "Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.",
      "How can you calculate the amount of water at each step?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "integer-to-roman",
    "title": "Integer to Roman",
    "description": "<p>Seven different symbols represent Roman numerals with the following values:</p>\n\n<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Symbol</th>\n\t\t\t<th>Value</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>I</td>\n\t\t\t<td>1</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>V</td>\n\t\t\t<td>5</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>X</td>\n\t\t\t<td>10</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>L</td>\n\t\t\t<td>50</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>C</td>\n\t\t\t<td>100</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>D</td>\n\t\t\t<td>500</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>M</td>\n\t\t\t<td>1000</td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<p>Roman numerals are formed by appending&nbsp;the conversions of&nbsp;decimal place values&nbsp;from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:</p>\n\n<ul>\n\t<li>If the value does not start with 4 or&nbsp;9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.</li>\n\t<li>If the value starts with 4 or 9 use the&nbsp;<strong>subtractive form</strong>&nbsp;representing&nbsp;one symbol subtracted from the following symbol, for example,&nbsp;4 is 1 (<code>I</code>) less than 5 (<code>V</code>): <code>IV</code>&nbsp;and 9 is 1 (<code>I</code>) less than 10 (<code>X</code>): <code>IX</code>.&nbsp;Only the following subtractive forms are used: 4 (<code>IV</code>), 9 (<code>IX</code>),&nbsp;40 (<code>XL</code>), 90 (<code>XC</code>), 400 (<code>CD</code>) and 900 (<code>CM</code>).</li>\n\t<li>Only powers of 10 (<code>I</code>, <code>X</code>, <code>C</code>, <code>M</code>) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5&nbsp;(<code>V</code>), 50 (<code>L</code>), or 500 (<code>D</code>) multiple times. If you need to append a symbol&nbsp;4 times&nbsp;use the <strong>subtractive form</strong>.</li>\n</ul>\n\n<p>Given an integer, convert it to a Roman numeral.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">num = 3749</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;MMMDCCXLIX&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\n3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)\n 700 = DCC as 500 (D) + 100 (C) + 100 (C)\n  40 = XL as 10 (X) less of 50 (L)\n   9 = IX as 1 (I) less of 10 (X)\nNote: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">num = 58</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;LVIII&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\n50 = L\n 8 = VIII\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">num = 1994</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;MCMXCIV&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\n1000 = M\n 900 = CM\n  90 = XC\n   4 = IV\n</pre>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt;= 3999</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 36,
    "companyTags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "roman-to-integer",
    "title": "Roman to Integer",
    "description": "<p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n\n<pre>\n<strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n\n<p>For example,&nbsp;<code>2</code> is written as <code>II</code>&nbsp;in Roman numeral, just two ones added together. <code>12</code> is written as&nbsp;<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n\n<ul>\n\t<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.&nbsp;</li>\n\t<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.&nbsp;</li>\n\t<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n\n<p>Given a roman numeral, convert it to an integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;III&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;LVIII&quot;\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;MCMXCIV&quot;\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 15</code></li>\n\t<li><code>s</code> contains only&nbsp;the characters <code>(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)</code>.</li>\n\t<li>It is <strong>guaranteed</strong>&nbsp;that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "hints": [
      "Problem is simpler to solve by working the string from back to front and using a map."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-common-prefix",
    "title": "Longest Common Prefix",
    "description": "<p>Write a function to find the longest common prefix string amongst an array of strings.</p>\n\n<p>If there is no common prefix, return an empty string <code>&quot;&quot;</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]\n<strong>Output:</strong> &quot;fl&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]\n<strong>Output:</strong> &quot;&quot;\n<strong>Explanation:</strong> There is no common prefix among the input strings.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 200</code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 200</code></li>\n\t<li><code>strs[i]</code> consists of only lowercase English letters if it is non-empty.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 30,
    "companyTags": [
      "Array",
      "String",
      "Trie"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "3sum",
    "title": "3Sum",
    "description": "<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n\n<p>Notice that the solution set must not contain duplicate triplets.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,0,1,2,-1,-4]\n<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]\n<strong>Explanation:</strong> \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,1]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The only possible triplet does not sum up to 0.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,0]\n<strong>Output:</strong> [[0,0,0]]\n<strong>Explanation:</strong> The only possible triplet sums up to 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [
      "So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!",
      "For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "3sum-closest",
    "title": "3Sum Closest",
    "description": "<p>Given an integer array <code>nums</code> of length <code>n</code> and an integer <code>target</code>, find three integers at <strong>distinct indices</strong> in <code>nums</code> such that the sum is closest to <code>target</code>.</p>\n\n<p>Return <em>the sum of the three integers</em>.</p>\n\n<p>You may assume that each input would have exactly one solution.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,2,1,-4], target = 1\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,0], target = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The sum that is closest to the target is 0. (0 + 0 + 0 = 0).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 500</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "description": "<p>Given a string containing digits from <code>2-9</code> inclusive, return all possible letter combinations that the number could represent. Return the answer in <strong>any order</strong>.</p>\n\n<p>A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.</p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png\" style=\"width: 300px; height: 243px;\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = &quot;23&quot;\n<strong>Output:</strong> [&quot;ad&quot;,&quot;ae&quot;,&quot;af&quot;,&quot;bd&quot;,&quot;be&quot;,&quot;bf&quot;,&quot;cd&quot;,&quot;ce&quot;,&quot;cf&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = &quot;2&quot;\n<strong>Output:</strong> [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= digits.length &lt;= 4</code></li>\n\t<li><code>digits[i]</code> is a digit in the range <code>[&#39;2&#39;, &#39;9&#39;]</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 34,
    "companyTags": [
      "Hash Table",
      "String",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "4sum",
    "title": "4Sum",
    "description": "<p>Given an array <code>nums</code> of <code>n</code> integers, return <em>an array of all the <strong>unique</strong> quadruplets</em> <code>[nums[a], nums[b], nums[c], nums[d]]</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= a, b, c, d&nbsp;&lt; n</code></li>\n\t<li><code>a</code>, <code>b</code>, <code>c</code>, and <code>d</code> are <strong>distinct</strong>.</li>\n\t<li><code>nums[a] + nums[b] + nums[c] + nums[d] == target</code></li>\n</ul>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,-1,0,-2,2], target = 0\n<strong>Output:</strong> [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,2,2,2,2], target = 8\n<strong>Output:</strong> [[2,2,2,2]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 48,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "description": "<p>Given the <code>head</code> of a linked list, remove the <code>n<sup>th</sup></code> node from the end of the list and return its head.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], n = 2\n<strong>Output:</strong> [1,2,3,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [1], n = 1\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [1,2], n = 1\n<strong>Output:</strong> [1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>sz</code>.</li>\n\t<li><code>1 &lt;= sz &lt;= 30</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>1 &lt;= n &lt;= sz</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do this in one pass?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 49,
    "companyTags": [
      "Linked List",
      "Two Pointers"
    ],
    "hints": [
      "Maintain two pointers and update one with a delay of n steps."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "description": "<p>Given a string <code>s</code> containing just the characters <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, <code>&#39;{&#39;</code>, <code>&#39;}&#39;</code>, <code>&#39;[&#39;</code> and <code>&#39;]&#39;</code>, determine if the input string is valid.</p>\n\n<p>An input string is valid if:</p>\n\n<ol>\n\t<li>Open brackets must be closed by the same type of brackets.</li>\n\t<li>Open brackets must be closed in the correct order.</li>\n\t<li>Every close bracket has a corresponding open bracket of the same type.</li>\n</ol>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;()&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;()[]{}&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;(]&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;([])&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 5:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;([)]&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of parentheses only <code>&#39;()[]{}&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 49,
    "companyTags": [
      "String",
      "Stack"
    ],
    "hints": [
      "Use a stack of characters.",
      "When you encounter an opening bracket, push it to the top of the stack.",
      "When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "description": "<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>\n\n<p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>\n\n<p>Return <em>the head of the merged linked list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg\" style=\"width: 662px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4]\n<strong>Output:</strong> [1,1,2,3,4,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> list1 = [], list2 = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> list1 = [], list2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>Both <code>list1</code> and <code>list2</code> are sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "Linked List",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "description": "<p>Given <code>n</code> pairs of parentheses, write a function to <em>generate all combinations of well-formed parentheses</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> [\"()\"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "description": "<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>\n\n<p><em>Merge all the linked-lists into one sorted linked-list and return it.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>Output:</strong> [1,1,2,3,4,4,5,6]\n<strong>Explanation:</strong> The linked-lists are:\n[\n  1-&gt;4-&gt;5,\n  1-&gt;3-&gt;4,\n  2-&gt;6\n]\nmerging them into one sorted linked list:\n1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> lists = [[]]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>k == lists.length</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= lists[i][j] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>lists[i]</code> is sorted in <strong>ascending order</strong>.</li>\n\t<li>The sum of <code>lists[i].length</code> will not exceed <code>10<sup>4</sup></code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 67,
    "companyTags": [
      "Linked List",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "swap-nodes-in-pairs",
    "title": "Swap Nodes in Pairs",
    "description": "<p>Given a&nbsp;linked list, swap every two adjacent nodes and return its head. You must solve the problem without&nbsp;modifying the values in the list&#39;s nodes (i.e., only nodes themselves may be changed.)</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">head = [1,2,3,4]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[2,1,4,3]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg\" style=\"width: 422px; height: 222px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">head = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">head = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">head = [1,2,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[2,1,3]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the&nbsp;list&nbsp;is in the range <code>[0, 100]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 62,
    "companyTags": [
      "Linked List",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-nodes-in-k-group",
    "title": "Reverse Nodes in k-Group",
    "description": "<p>Given the <code>head</code> of a linked list, reverse the nodes of the list <code>k</code> at a time, and return <em>the modified list</em>.</p>\n\n<p><code>k</code> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <code>k</code> then left-out nodes, in the end, should remain as it is.</p>\n\n<p>You may not alter the values in the list&#39;s nodes, only nodes themselves may be changed.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [2,1,4,3,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], k = 3\n<strong>Output:</strong> [3,2,1,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>n</code>.</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you solve the problem in <code>O(1)</code> extra memory space?</p>\n",
    "difficulty": "Hard",
    "acceptanceRate": 39,
    "companyTags": [
      "Linked List",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "description": "<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove the duplicates <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a> such that each unique element appears only <strong>once</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>.</p>\n\n<p>Consider the number of <em>unique elements</em> in&nbsp;<code>nums</code> to be <code>k<strong>​​​​​​​</strong></code>​​​​​​​. <meta charset=\"UTF-8\" />After removing duplicates, return the number of unique elements&nbsp;<code>k</code>.</p>\n\n<p><meta charset=\"UTF-8\" />The first&nbsp;<code>k</code>&nbsp;elements of&nbsp;<code>nums</code>&nbsp;should contain the unique numbers in <strong>sorted order</strong>. The remaining elements beyond index&nbsp;<code>k - 1</code>&nbsp;can be ignored.</p>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i &lt; k; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong> 2, nums = [1,2,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]\n<strong>Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [
      "In this problem, the key point to focus on is the input array being sorted. As far as duplicate elements are concerned, what is their positioning in the array when the given array is sorted? Look at the image below for the answer. If we know the position of one of the elements, do we also know the positioning of all the duplicate elements?\r\n\r\n<br>\r\n<img src=\"https://assets.leetcode.com/uploads/2019/10/20/hint_rem_dup.png\" width=\"500\"/>",
      "We need to modify the array in-place and the size of the final array would potentially be smaller than the size of the input array. So, we ought to use a two-pointer approach here. One, that would keep track of the current element in the original array and another one for just the unique elements.",
      "Essentially, once an element is encountered, you simply need to <b>bypass</b> its duplicates and move on to the next unique element."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-element",
    "title": "Remove Element",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a>. The order of the elements may be changed. Then return <em>the number of elements in </em><code>nums</code><em> which are not equal to </em><code>val</code>.</p>\n\n<p>Consider the number of elements in <code>nums</code> which are not equal to <code>val</code> be <code>k</code>, to get accepted, you need to do the following things:</p>\n\n<ul>\n\t<li>Change the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the elements which are not equal to <code>val</code>. The remaining elements of <code>nums</code> are not important as well as the size of <code>nums</code>.</li>\n\t<li>Return <code>k</code>.</li>\n</ul>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>\nint[] nums = [...]; // Input array\nint val = ...; // Value to remove\nint[] expectedNums = [...]; // The expected answer with correct length.\n                            // It is sorted with no values equaling val.\n\nint k = removeElement(nums, val); // Calls your implementation\n\nassert k == expectedNums.length;\nsort(nums, 0, k); // Sort the first k elements of nums\nfor (int i = 0; i &lt; actualLength; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,2,3], val = 3\n<strong>Output:</strong> 2, nums = [2,2,_,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,2,2,3,0,4,2], val = 2\n<strong>Output:</strong> 5, nums = [0,1,4,0,3,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.\nNote that the five elements can be returned in any order.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 50</code></li>\n\t<li><code>0 &lt;= val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 51,
    "companyTags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [
      "The problem statement clearly asks us to modify the array in-place and it also says that the element beyond the new length of the array can be anything. Given an element, we need to remove all the occurrences of it from the array. We don't technically need to <b>remove</b> that element per se, right?",
      "We can move all the occurrences of this element to the end of the array. Use two pointers!\r\n<br><img src=\"https://assets.leetcode.com/uploads/2019/10/20/hint_remove_element.png\" width=\"500\"/>",
      "Yet another direction of thought is to consider the elements to be removed as non-existent. In a single pass, if we keep copying the visible elements in-place, that should also solve this problem for us."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-the-index-of-the-first-occurrence-in-a-string",
    "title": "Find the Index of the First Occurrence in a String",
    "description": "<p>Given two strings <code>needle</code> and <code>haystack</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or <code>-1</code> if <code>needle</code> is not part of <code>haystack</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> haystack = &quot;sadbutsad&quot;, needle = &quot;sad&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> &quot;sad&quot; occurs at index 0 and 6.\nThe first occurrence is at index 0, so we return 0.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> haystack = &quot;leetcode&quot;, needle = &quot;leeto&quot;\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> &quot;leeto&quot; did not occur in &quot;leetcode&quot;, so we return -1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>haystack</code> and <code>needle</code> consist of only lowercase English characters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 58,
    "companyTags": [
      "Two Pointers",
      "String",
      "String Matching"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "divide-two-integers",
    "title": "Divide Two Integers",
    "description": "<p>Given two integers <code>dividend</code> and <code>divisor</code>, divide two integers <strong>without</strong> using multiplication, division, and mod operator.</p>\n\n<p>The integer division should truncate toward zero, which means losing its fractional part. For example, <code>8.345</code> would be truncated to <code>8</code>, and <code>-2.7335</code> would be truncated to <code>-2</code>.</p>\n\n<p>Return <em>the <strong>quotient</strong> after dividing </em><code>dividend</code><em> by </em><code>divisor</code>.</p>\n\n<p><strong>Note: </strong>Assume we are dealing with an environment that could only store integers within the <strong>32-bit</strong> signed integer range: <code>[&minus;2<sup>31</sup>, 2<sup>31</sup> &minus; 1]</code>. For this problem, if the quotient is <strong>strictly greater than</strong> <code>2<sup>31</sup> - 1</code>, then return <code>2<sup>31</sup> - 1</code>, and if the quotient is <strong>strictly less than</strong> <code>-2<sup>31</sup></code>, then return <code>-2<sup>31</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> dividend = 10, divisor = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 10/3 = 3.33333.. which is truncated to 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> dividend = 7, divisor = -3\n<strong>Output:</strong> -2\n<strong>Explanation:</strong> 7/-3 = -2.33333.. which is truncated to -2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= dividend, divisor &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>divisor != 0</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 35,
    "companyTags": [
      "Math",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "substring-with-concatenation-of-all-words",
    "title": "Substring with Concatenation of All Words",
    "description": "<p>You are given a string <code>s</code> and an array of strings <code>words</code>. All the strings of <code>words</code> are of <strong>the same length</strong>.</p>\n\n<p>A <strong>concatenated string</strong> is a string that exactly contains all the strings of any permutation of <code>words</code> concatenated.</p>\n\n<ul>\n\t<li>For example, if <code>words = [&quot;ab&quot;,&quot;cd&quot;,&quot;ef&quot;]</code>, then <code>&quot;abcdef&quot;</code>, <code>&quot;abefcd&quot;</code>, <code>&quot;cdabef&quot;</code>, <code>&quot;cdefab&quot;</code>, <code>&quot;efabcd&quot;</code>, and <code>&quot;efcdab&quot;</code> are all concatenated strings. <code>&quot;acdbef&quot;</code> is not a concatenated string because it is not the concatenation of any permutation of <code>words</code>.</li>\n</ul>\n\n<p>Return an array of <em>the starting indices</em> of all the concatenated substrings in <code>s</code>. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;barfoothefoobarman&quot;, words = [&quot;foo&quot;,&quot;bar&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[0,9]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The substring starting at 0 is <code>&quot;barfoo&quot;</code>. It is the concatenation of <code>[&quot;bar&quot;,&quot;foo&quot;]</code> which is a permutation of <code>words</code>.<br />\nThe substring starting at 9 is <code>&quot;foobar&quot;</code>. It is the concatenation of <code>[&quot;foo&quot;,&quot;bar&quot;]</code> which is a permutation of <code>words</code>.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;wordgoodgoodgoodbestword&quot;, words = [&quot;word&quot;,&quot;good&quot;,&quot;best&quot;,&quot;word&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>There is no concatenated substring.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;barfoofoobarthefoobarman&quot;, words = [&quot;bar&quot;,&quot;foo&quot;,&quot;the&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[6,9,12]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The substring starting at 6 is <code>&quot;foobarthe&quot;</code>. It is the concatenation of <code>[&quot;foo&quot;,&quot;bar&quot;,&quot;the&quot;]</code>.<br />\nThe substring starting at 9 is <code>&quot;barthefoo&quot;</code>. It is the concatenation of <code>[&quot;bar&quot;,&quot;the&quot;,&quot;foo&quot;]</code>.<br />\nThe substring starting at 12 is <code>&quot;thefoobar&quot;</code>. It is the concatenation of <code>[&quot;the&quot;,&quot;foo&quot;,&quot;bar&quot;]</code>.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= words.length &lt;= 5000</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 30</code></li>\n\t<li><code>s</code> and <code>words[i]</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 43,
    "companyTags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "next-permutation",
    "title": "Next Permutation",
    "description": "<p>A <strong>permutation</strong> of an array of integers is an arrangement of its members into a sequence or linear order.</p>\n\n<ul>\n\t<li>For example, for <code>arr = [1,2,3]</code>, the following are all the permutations of <code>arr</code>: <code>[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]</code>.</li>\n</ul>\n\n<p>The <strong>next permutation</strong> of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the <strong>next permutation</strong> of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).</p>\n\n<ul>\n\t<li>For example, the next permutation of <code>arr = [1,2,3]</code> is <code>[1,3,2]</code>.</li>\n\t<li>Similarly, the next permutation of <code>arr = [2,3,1]</code> is <code>[3,1,2]</code>.</li>\n\t<li>While the next permutation of <code>arr = [3,2,1]</code> is <code>[1,2,3]</code> because <code>[3,2,1]</code> does not have a lexicographical larger rearrangement.</li>\n</ul>\n\n<p>Given an array of integers <code>nums</code>, <em>find the next permutation of</em> <code>nums</code>.</p>\n\n<p>The replacement must be <strong><a href=\"http://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in place</a></strong> and use only constant extra memory.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [1,3,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,1]\n<strong>Output:</strong> [1,2,3]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,5]\n<strong>Output:</strong> [1,5,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-valid-parentheses",
    "title": "Longest Valid Parentheses",
    "description": "<p>Given a string containing just the characters <code>&#39;(&#39;</code> and <code>&#39;)&#39;</code>, return <em>the length of the longest valid (well-formed) parentheses </em><span data-keyword=\"substring-nonempty\"><em>substring</em></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;(()&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The longest valid parentheses substring is &quot;()&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;)()())&quot;\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest valid parentheses substring is &quot;()()&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;&quot;\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s[i]</code> is <code>&#39;(&#39;</code>, or <code>&#39;)&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 50,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "description": "<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p>\n\n<p>Prior to being passed to your function, <code>nums</code> is <strong>possibly left rotated</strong> at an unknown index <code>k</code> (<code>1 &lt;= k &lt; nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be left rotated by&nbsp;<code>3</code>&nbsp;indices and become <code>[4,5,6,7,0,1,2]</code>.</p>\n\n<p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return <em>the index of </em><code>target</code><em> if it is in </em><code>nums</code><em>, or </em><code>-1</code><em> if it is not in </em><code>nums</code>.</p>\n\n<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 0\n<strong>Output:</strong> 4\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 3\n<strong>Output:</strong> -1\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1], target = 0\n<strong>Output:</strong> -1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>All values of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>nums</code> is an ascending array that is possibly rotated.</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-first-and-last-position-of-element-in-sorted-array",
    "title": "Find First and Last Position of Element in Sorted Array",
    "description": "<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p>\n\n<p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p>\n\n<p>You must&nbsp;write an algorithm with&nbsp;<code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 8\n<strong>Output:</strong> [3,4]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 6\n<strong>Output:</strong> [-1,-1]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [], target = 0\n<strong>Output:</strong> [-1,-1]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= nums[i]&nbsp;&lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums</code> is a non-decreasing array.</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target&nbsp;&lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-sudoku",
    "title": "Valid Sudoku",
    "description": "<p>Determine if a&nbsp;<code>9 x 9</code> Sudoku board&nbsp;is valid.&nbsp;Only the filled cells need to be validated&nbsp;<strong>according to the following rules</strong>:</p>\n\n<ol>\n\t<li>Each row&nbsp;must contain the&nbsp;digits&nbsp;<code>1-9</code> without repetition.</li>\n\t<li>Each column must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n\t<li>Each of the nine&nbsp;<code>3 x 3</code> sub-boxes of the grid must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n</ol>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li>\n\t<li>Only the filled cells need to be validated according to the mentioned&nbsp;rules.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png\" style=\"height:250px; width:250px\" />\n<pre>\n<strong>Input:</strong> board = \n[[&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]\n,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]\n,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]\n,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]\n,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = \n[[&quot;8&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]\n,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]\n,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]\n,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]\n,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]\n,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Same as Example 1, except with the <strong>5</strong> in the top left corner being modified to <strong>8</strong>. Since there are two 8&#39;s in the top left 3x3 sub-box, it is invalid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit <code>1-9</code> or <code>&#39;.&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 43,
    "companyTags": [
      "Array",
      "Hash Table",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sudoku-solver",
    "title": "Sudoku Solver",
    "description": "<p>Write a program to solve a Sudoku puzzle by filling the empty cells.</p>\n\n<p>A sudoku solution must satisfy <strong>all of the following rules</strong>:</p>\n\n<ol>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each of the 9 <code>3x3</code> sub-boxes of the grid.</li>\n</ol>\n\n<p>The <code>&#39;.&#39;</code> character indicates empty cells.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png\" style=\"height:250px; width:250px\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;],[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;],[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;],[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;],[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;],[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Output:</strong> [[&quot;5&quot;,&quot;3&quot;,&quot;4&quot;,&quot;6&quot;,&quot;7&quot;,&quot;8&quot;,&quot;9&quot;,&quot;1&quot;,&quot;2&quot;],[&quot;6&quot;,&quot;7&quot;,&quot;2&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;3&quot;,&quot;4&quot;,&quot;8&quot;],[&quot;1&quot;,&quot;9&quot;,&quot;8&quot;,&quot;3&quot;,&quot;4&quot;,&quot;2&quot;,&quot;5&quot;,&quot;6&quot;,&quot;7&quot;],[&quot;8&quot;,&quot;5&quot;,&quot;9&quot;,&quot;7&quot;,&quot;6&quot;,&quot;1&quot;,&quot;4&quot;,&quot;2&quot;,&quot;3&quot;],[&quot;4&quot;,&quot;2&quot;,&quot;6&quot;,&quot;8&quot;,&quot;5&quot;,&quot;3&quot;,&quot;7&quot;,&quot;9&quot;,&quot;1&quot;],[&quot;7&quot;,&quot;1&quot;,&quot;3&quot;,&quot;9&quot;,&quot;2&quot;,&quot;4&quot;,&quot;8&quot;,&quot;5&quot;,&quot;6&quot;],[&quot;9&quot;,&quot;6&quot;,&quot;1&quot;,&quot;5&quot;,&quot;3&quot;,&quot;7&quot;,&quot;2&quot;,&quot;8&quot;,&quot;4&quot;],[&quot;2&quot;,&quot;8&quot;,&quot;7&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;6&quot;,&quot;3&quot;,&quot;5&quot;],[&quot;3&quot;,&quot;4&quot;,&quot;5&quot;,&quot;2&quot;,&quot;8&quot;,&quot;6&quot;,&quot;1&quot;,&quot;7&quot;,&quot;9&quot;]]\n<strong>Explanation:</strong>&nbsp;The input board is shown above and the only valid solution is shown below:\n\n<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png\" style=\"height:250px; width:250px\" />\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit or <code>&#39;.&#39;</code>.</li>\n\t<li>It is <strong>guaranteed</strong> that the input board has only one solution.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 35,
    "companyTags": [
      "Array",
      "Hash Table",
      "Backtracking",
      "Matrix"
    ],
    "hints": [
      "For each cell, place a valid number and try solving for the remaining empty cells.",
      "If stuck, undo (backtrack) and try another valid number."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "count-and-say",
    "title": "Count and Say",
    "description": "<p>The <strong>count-and-say</strong> sequence is a sequence of digit strings defined by the recursive formula:</p>\n\n<ul>\n\t<li><code>countAndSay(1) = &quot;1&quot;</code></li>\n\t<li><code>countAndSay(n)</code> is the run-length encoding of <code>countAndSay(n - 1)</code>.</li>\n</ul>\n\n<p><a href=\"http://en.wikipedia.org/wiki/Run-length_encoding\" target=\"_blank\">Run-length encoding</a> (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string <code>&quot;3322251&quot;</code> we replace <code>&quot;33&quot;</code> with <code>&quot;23&quot;</code>, replace <code>&quot;222&quot;</code> with <code>&quot;32&quot;</code>, replace <code>&quot;5&quot;</code> with <code>&quot;15&quot;</code> and replace <code>&quot;1&quot;</code> with <code>&quot;11&quot;</code>. Thus the compressed string becomes <code>&quot;23321511&quot;</code>.</p>\n\n<p>Given a positive integer <code>n</code>, return <em>the </em><code>n<sup>th</sup></code><em> element of the <strong>count-and-say</strong> sequence</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 4</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;1211&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<pre>\ncountAndSay(1) = &quot;1&quot;\ncountAndSay(2) = RLE of &quot;1&quot; = &quot;11&quot;\ncountAndSay(3) = RLE of &quot;11&quot; = &quot;21&quot;\ncountAndSay(4) = RLE of &quot;21&quot; = &quot;1211&quot;\n</pre>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 1</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;1&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>This is the base case.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 30</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it iteratively?",
    "difficulty": "Medium",
    "acceptanceRate": 45,
    "companyTags": [
      "String"
    ],
    "hints": [
      "Create a helper function that maps an integer to pairs of its digits and their frequencies. For example, if you call this function with \"223314444411\", then it maps it to an array of pairs [[2,2], [3,2], [1,1], [4,5], [1, 2]].",
      "Create another helper function that takes the array of pairs and creates a new integer. For example, if you call this function with [[2,2], [3,2], [1,1], [4,5], [1, 2]], it should create \"22\"+\"23\"+\"11\"+\"54\"+\"21\" = \"2223115421\".",
      "Now, with the two helper functions, you can start with \"1\" and call the two functions alternatively n-1 times. The answer is the last integer you will obtain."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "combination-sum",
    "title": "Combination Sum",
    "description": "<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return <em>a list of all <strong>unique combinations</strong> of </em><code>candidates</code><em> where the chosen numbers sum to </em><code>target</code><em>.</em> You may return the combinations in <strong>any order</strong>.</p>\n\n<p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>. Two combinations are unique if the <span data-keyword=\"frequency-array\">frequency</span> of at least one of the chosen numbers is different.</p>\n\n<p>The test cases are generated such that the number of unique combinations that sum up to <code>target</code> is less than <code>150</code> combinations for the given input.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,6,7], target = 7\n<strong>Output:</strong> [[2,2,3],[7]]\n<strong>Explanation:</strong>\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,3,5], target = 8\n<strong>Output:</strong> [[2,2,2,2],[2,3,3],[3,5]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2], target = 1\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li>All elements of <code>candidates</code> are <strong>distinct</strong>.</li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "Array",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "combination-sum-ii",
    "title": "Combination Sum II",
    "description": "<p>Given a collection of candidate numbers (<code>candidates</code>) and a target number (<code>target</code>), find all unique combinations in <code>candidates</code>&nbsp;where the candidate numbers sum to <code>target</code>.</p>\n\n<p>Each number in <code>candidates</code>&nbsp;may only be used <strong>once</strong> in the combination.</p>\n\n<p><strong>Note:</strong>&nbsp;The solution set must not contain duplicate combinations.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [10,1,2,7,6,1,5], target = 8\n<strong>Output:</strong> \n[\n[1,1,6],\n[1,2,5],\n[1,7],\n[2,6]\n]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> candidates = [2,5,2,1,2], target = 5\n<strong>Output:</strong> \n[\n[1,2,2],\n[5]\n]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;candidates.length &lt;= 100</code></li>\n\t<li><code>1 &lt;=&nbsp;candidates[i] &lt;= 50</code></li>\n\t<li><code>1 &lt;= target &lt;= 30</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 48,
    "companyTags": [
      "Array",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "first-missing-positive",
    "title": "First Missing Positive",
    "description": "<p>Given an unsorted integer array <code>nums</code>. Return the <em>smallest positive integer</em> that is <em>not present</em> in <code>nums</code>.</p>\n\n<p>You must implement an algorithm that runs in <code>O(n)</code> time and uses <code>O(1)</code> auxiliary space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,0]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The numbers in the range [1,2] are all in the array.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,4,-1,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> 1 is in the array but 2 is missing.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,8,9,11,12]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The smallest positive integer 1 is missing.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Hash Table"
    ],
    "hints": [
      "Think about how you would solve the problem in non-constant space.  Can you apply that logic to the existing space?",
      "We don't care about duplicates or non-positive integers",
      "Remember that O(2n) = O(n)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "description": "<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png\" style=\"width: 412px; height: 161px;\" />\n<pre>\n<strong>Input:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> height = [4,2,0,3,2,5]\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 36,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "multiply-strings",
    "title": "Multiply Strings",
    "description": "<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code>, also represented as a string.</p>\n\n<p><strong>Note:</strong>&nbsp;You must not use any built-in BigInteger library or convert the inputs to integer directly.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> num1 = \"2\", num2 = \"3\"\n<strong>Output:</strong> \"6\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> num1 = \"123\", num2 = \"456\"\n<strong>Output:</strong> \"56088\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num1.length, num2.length &lt;= 200</code></li>\n\t<li><code>num1</code> and <code>num2</code> consist of digits only.</li>\n\t<li>Both <code>num1</code> and <code>num2</code>&nbsp;do not contain any leading zero, except the number <code>0</code> itself.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 34,
    "companyTags": [
      "Math",
      "String",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "wildcard-matching",
    "title": "Wildcard Matching",
    "description": "<p>Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>&#39;?&#39;</code> and <code>&#39;*&#39;</code> where:</p>\n\n<ul>\n\t<li><code>&#39;?&#39;</code> Matches any single character.</li>\n\t<li><code>&#39;*&#39;</code> Matches any sequence of characters (including the empty sequence).</li>\n</ul>\n\n<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;a&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> &quot;a&quot; does not match the entire string &quot;aa&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aa&quot;, p = &quot;*&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong>&nbsp;&#39;*&#39; matches any sequence.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cb&quot;, p = &quot;?a&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong>&nbsp;&#39;?&#39; matches &#39;c&#39;, but the second letter is &#39;a&#39;, which does not match &#39;b&#39;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n\t<li><code>p</code> contains only lowercase English letters, <code>&#39;?&#39;</code> or <code>&#39;*&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 68,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Greedy",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "description": "<p>You are given a <strong>0-indexed</strong> array of integers <code>nums</code> of length <code>n</code>. You are initially positioned at&nbsp;index 0.</p>\n\n<p>Each element <code>nums[i]</code> represents the maximum length of a forward jump from index <code>i</code>. In other words, if you are at index <code>i</code>, you can jump to any index <code>(i + j)</code>&nbsp;where:</p>\n\n<ul>\n\t<li><code>0 &lt;= j &lt;= nums[i]</code> and</li>\n\t<li><code>i + j &lt; n</code></li>\n</ul>\n\n<p>Return <em>the minimum number of jumps to reach index </em><code>n - 1</code>. The test cases are generated such that you can reach index&nbsp;<code>n - 1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,3,1,1,4]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,3,0,1,4]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>It&#39;s guaranteed that you can reach <code>nums[n - 1]</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 57,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "permutations",
    "title": "Permutations",
    "description": "<p>Given an array <code>nums</code> of distinct integers, return all the possible <span data-keyword=\"permutation-array\">permutations</span>. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> [[0,1],[1,0]]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 6</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>All the integers of <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "Array",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "permutations-ii",
    "title": "Permutations II",
    "description": "<p>Given a collection of numbers, <code>nums</code>,&nbsp;that might contain duplicates, return <em>all possible unique permutations <strong>in any order</strong>.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong>\n[[1,1,2],\n [1,2,1],\n [2,1,1]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 8</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Backtracking",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "rotate-image",
    "title": "Rotate Image",
    "description": "<p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90</strong> degrees (clockwise).</p>\n\n<p>You have to rotate the image <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a>, which means you have to modify the input 2D matrix directly. <strong>DO NOT</strong> allocate another 2D matrix and do the rotation.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg\" style=\"width: 500px; height: 188px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [[7,4,1],[8,5,2],[9,6,3]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg\" style=\"width: 500px; height: 201px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n<strong>Output:</strong> [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == matrix.length == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Math",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "group-anagrams",
    "title": "Group Anagrams",
    "description": "<p>Given an array of strings <code>strs</code>, group the <span data-keyword=\"anagram\">anagrams</span> together. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">strs = [&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[[&quot;bat&quot;],[&quot;nat&quot;,&quot;tan&quot;],[&quot;ate&quot;,&quot;eat&quot;,&quot;tea&quot;]]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<ul>\n\t<li>There is no string in strs that can be rearranged to form <code>&quot;bat&quot;</code>.</li>\n\t<li>The strings <code>&quot;nat&quot;</code> and <code>&quot;tan&quot;</code> are anagrams as they can be rearranged to form each other.</li>\n\t<li>The strings <code>&quot;ate&quot;</code>, <code>&quot;eat&quot;</code>, and <code>&quot;tea&quot;</code> are anagrams as they can be rearranged to form each other.</li>\n</ul>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">strs = [&quot;&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[[&quot;&quot;]]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">strs = [&quot;a&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[[&quot;a&quot;]]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code> consists of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Array",
      "Hash Table",
      "String",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "powx-n",
    "title": "Pow(x, n)",
    "description": "<p>Implement <a href=\"http://www.cplusplus.com/reference/valarray/pow/\" target=\"_blank\">pow(x, n)</a>, which calculates <code>x</code> raised to the power <code>n</code> (i.e., <code>x<sup>n</sup></code>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 2.00000, n = 10\n<strong>Output:</strong> 1024.00000\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 2.10000, n = 3\n<strong>Output:</strong> 9.26100\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 2.00000, n = -2\n<strong>Output:</strong> 0.25000\n<strong>Explanation:</strong> 2<sup>-2</sup> = 1/2<sup>2</sup> = 1/4 = 0.25\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-100.0 &lt; x &lt; 100.0</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup>-1</code></li>\n\t<li><code>n</code> is an integer.</li>\n\t<li>Either <code>x</code> is not zero or <code>n &gt; 0</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sup>n</sup> &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "Math",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "n-queens",
    "title": "N-Queens",
    "description": "<p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>\n\n<p>Given an integer <code>n</code>, return <em>all distinct solutions to the <strong>n-queens puzzle</strong></em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>Each solution contains a distinct board configuration of the n-queens&#39; placement, where <code>&#39;Q&#39;</code> and <code>&#39;.&#39;</code> both indicate a queen and an empty space, respectively.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/queens.jpg\" style=\"width: 600px; height: 268px;\" />\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> [[&quot;.Q..&quot;,&quot;...Q&quot;,&quot;Q...&quot;,&quot;..Q.&quot;],[&quot;..Q.&quot;,&quot;Q...&quot;,&quot;...Q&quot;,&quot;.Q..&quot;]]\n<strong>Explanation:</strong> There exist two distinct solutions to the 4-queens puzzle as shown above\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [[&quot;Q&quot;]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 33,
    "companyTags": [
      "Array",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "n-queens-ii",
    "title": "N-Queens II",
    "description": "<p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>\n\n<p>Given an integer <code>n</code>, return <em>the number of distinct solutions to the&nbsp;<strong>n-queens puzzle</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/queens.jpg\" style=\"width: 600px; height: 268px;\" />\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two distinct solutions to the 4-queens puzzle as shown.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 67,
    "companyTags": [
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximum-subarray",
    "title": "Maximum Subarray",
    "description": "<p>Given an integer array <code>nums</code>, find the <span data-keyword=\"subarray-nonempty\">subarray</span> with the largest sum, and return <em>its sum</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The subarray [4,-1,2,1] has the largest sum 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The subarray [1] has the largest sum 1.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [5,4,-1,7,8]\n<strong>Output:</strong> 23\n<strong>Explanation:</strong> The subarray [5,4,-1,7,8] has the largest sum 23.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution using the <strong>divide and conquer</strong> approach, which is more subtle.</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 69,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "spiral-matrix",
    "title": "Spiral Matrix",
    "description": "<p>Given an <code>m x n</code> <code>matrix</code>, return <em>all elements of the</em> <code>matrix</code> <em>in spiral order</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [1,2,3,6,9,8,7,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n<strong>Output:</strong> [1,2,3,4,8,12,11,10,9,5,6,7]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10</code></li>\n\t<li><code>-100 &lt;= matrix[i][j] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "hints": [
      "Well for some problems, the best way really is to come up with some algorithms for simulation. Basically, you need to simulate what the problem asks us to do.",
      "We go boundary by boundary and move inwards. That is the essential operation. First row, last column, last row, first column, and then we move inwards by 1 and repeat. That's all. That is all the simulation that we need.",
      "Think about when you want to switch the progress on one of the indexes. If you progress on i out of [i, j], you'll shift in the same column. Similarly, by changing values for j, you'd be shifting in the same row.\r\nAlso, keep track of the end of a boundary so that you can move inwards and then keep repeating. It's always best to simulate edge cases like a single column or a single row to see if anything breaks or not."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "jump-game",
    "title": "Jump Game",
    "description": "<p>You are given an integer array <code>nums</code>. You are initially positioned at the array&#39;s <strong>first index</strong>, and each element in the array represents your maximum jump length at that position.</p>\n\n<p>Return <code>true</code><em> if you can reach the last index, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,3,1,1,4]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Jump 1 step from index 0 to 1, then 3 steps to the last index.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,1,0,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "merge-intervals",
    "title": "Merge Intervals",
    "description": "<p>Given an array&nbsp;of <code>intervals</code>&nbsp;where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]\n<strong>Explanation:</strong> Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]\n<strong>Explanation:</strong> Intervals [1,4] and [4,5] are considered overlapping.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[4,7],[1,4]]\n<strong>Output:</strong> [[1,7]]\n<strong>Explanation:</strong> Intervals [1,4] and [4,7] are considered overlapping.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "description": "<p>You are given an array of non-overlapping intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> represent the start and the end of the <code>i<sup>th</sup></code> interval and <code>intervals</code> is sorted in ascending order by <code>start<sub>i</sub></code>. You are also given an interval <code>newInterval = [start, end]</code> that represents the start and end of another interval.</p>\n\n<p>Insert <code>newInterval</code> into <code>intervals</code> such that <code>intervals</code> is still sorted in ascending order by <code>start<sub>i</sub></code> and <code>intervals</code> still does not have any overlapping intervals (merge overlapping intervals if necessary).</p>\n\n<p>Return <code>intervals</code><em> after the insertion</em>.</p>\n\n<p><strong>Note</strong> that you don&#39;t need to modify <code>intervals</code> in-place. You can make a new array and return it.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,3],[6,9]], newInterval = [2,5]\n<strong>Output:</strong> [[1,5],[6,9]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\n<strong>Output:</strong> [[1,2],[3,10],[12,16]]\n<strong>Explanation:</strong> Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>5</sup></code></li>\n\t<li><code>intervals</code> is sorted by <code>start<sub>i</sub></code> in <strong>ascending</strong> order.</li>\n\t<li><code>newInterval.length == 2</code></li>\n\t<li><code>0 &lt;= start &lt;= end &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 43,
    "companyTags": [
      "Array"
    ],
    "hints": [
      "Intervals Array is sorted. Can you use Binary Search to find the correct position to insert the new Interval.?",
      "Can you try merging the overlapping intervals while inserting the new interval?",
      "This can be done by comparing the end of the last interval with the start of the new interval and vice versa."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "length-of-last-word",
    "title": "Length of Last Word",
    "description": "<p>Given a string <code>s</code> consisting of words and spaces, return <em>the length of the <strong>last</strong> word in the string.</em></p>\n\n<p>A <strong>word</strong> is a maximal <span data-keyword=\"substring-nonempty\">substring</span> consisting of non-space characters only.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;Hello World&quot;\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The last word is &quot;World&quot; with length 5.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;   fly me   to   the moon  &quot;\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The last word is &quot;moon&quot; with length 4.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;luffy is still joyboy&quot;\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The last word is &quot;joyboy&quot; with length 6.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of only English letters and spaces <code>&#39; &#39;</code>.</li>\n\t<li>There will be at least one word in <code>s</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "spiral-matrix-ii",
    "title": "Spiral Matrix II",
    "description": "<p>Given a positive integer <code>n</code>, generate an <code>n x n</code> <code>matrix</code> filled with elements from <code>1</code> to <code>n<sup>2</sup></code> in spiral order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> [[1,2,3],[8,9,4],[7,6,5]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "permutation-sequence",
    "title": "Permutation Sequence",
    "description": "<p>The set <code>[1, 2, 3, ...,&nbsp;n]</code> contains a total of <code>n!</code> unique permutations.</p>\n\n<p>By listing and labeling all of the permutations in order, we get the following sequence for <code>n = 3</code>:</p>\n\n<ol>\n\t<li><code>&quot;123&quot;</code></li>\n\t<li><code>&quot;132&quot;</code></li>\n\t<li><code>&quot;213&quot;</code></li>\n\t<li><code>&quot;231&quot;</code></li>\n\t<li><code>&quot;312&quot;</code></li>\n\t<li><code>&quot;321&quot;</code></li>\n</ol>\n\n<p>Given <code>n</code> and <code>k</code>, return the <code>k<sup>th</sup></code> permutation sequence.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 3, k = 3\n<strong>Output:</strong> \"213\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 4, k = 9\n<strong>Output:</strong> \"2314\"\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> n = 3, k = 1\n<strong>Output:</strong> \"123\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n\t<li><code>1 &lt;= k &lt;= n!</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 52,
    "companyTags": [
      "Math",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "rotate-list",
    "title": "Rotate List",
    "description": "<p>Given the <code>head</code> of a linked&nbsp;list, rotate the list to the right by <code>k</code> places.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg\" style=\"width: 450px; height: 191px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [4,5,1,2,3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg\" style=\"width: 305px; height: 350px;\" />\n<pre>\n<strong>Input:</strong> head = [0,1,2], k = 4\n<strong>Output:</strong> [2,0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 500]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>0 &lt;= k &lt;= 2 * 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "unique-paths",
    "title": "Unique Paths",
    "description": "<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n\n<p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n\n<p>The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img src=\"https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png\" style=\"width: 400px; height: 183px;\" />\n<pre>\n<strong>Input:</strong> m = 3, n = 7\n<strong>Output:</strong> 28\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> m = 3, n = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -&gt; Down -&gt; Down\n2. Down -&gt; Down -&gt; Right\n3. Down -&gt; Right -&gt; Down\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Combinatorics"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "unique-paths-ii",
    "title": "Unique Paths II",
    "description": "<p>You are given an <code>m x n</code> integer array <code>grid</code>. There is a robot initially located at the <b>top-left corner</b> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n\n<p>An obstacle and space are marked as <code>1</code> or <code>0</code> respectively in <code>grid</code>. A path that the robot takes cannot include <strong>any</strong> square that is an obstacle.</p>\n\n<p>Return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n\n<p>The testcases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There is one obstacle in the middle of the 3x3 grid above.\nThere are two ways to reach the bottom-right corner:\n1. Right -&gt; Right -&gt; Down -&gt; Down\n2. Down -&gt; Down -&gt; Right -&gt; Right\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg\" style=\"width: 162px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> obstacleGrid = [[0,1],[0,0]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == obstacleGrid.length</code></li>\n\t<li><code>n == obstacleGrid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>obstacleGrid[i][j]</code> is <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 36,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "hints": [
      "Use dynamic programming since, from each cell, you can move to the right or down.",
      "assume dp[i][j] is the number of unique paths to reach (i, j). dp[i][j] = dp[i][j -1] + dp[i - 1][j]. Be careful when you encounter an obstacle. set its value in dp to 0."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "description": "<p>Given a <code>m x n</code> <code>grid</code> filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p>\n\n<p><strong>Note:</strong> You can only move either down or right at any point in time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg\" style=\"width: 242px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> grid = [[1,3,1],[1,5,1],[4,2,1]]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Because the path 1 &rarr; 3 &rarr; 1 &rarr; 1 &rarr; 1 minimizes the sum.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [[1,2,3],[4,5,6]]\n<strong>Output:</strong> 12\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-number",
    "title": "Valid Number",
    "description": "<p>Given a string <code>s</code>, return whether <code>s</code> is a <strong>valid number</strong>.<br />\n<br />\nFor example, all the following are valid numbers: <code>&quot;2&quot;, &quot;0089&quot;, &quot;-0.1&quot;, &quot;+3.14&quot;, &quot;4.&quot;, &quot;-.9&quot;, &quot;2e10&quot;, &quot;-90E3&quot;, &quot;3e+7&quot;, &quot;+6e-1&quot;, &quot;53.5e93&quot;, &quot;-123.456e789&quot;</code>, while the following are not valid numbers: <code>&quot;abc&quot;, &quot;1a&quot;, &quot;1e&quot;, &quot;e3&quot;, &quot;99e2.5&quot;, &quot;--6&quot;, &quot;-+3&quot;, &quot;95a54e53&quot;</code>.</p>\n\n<p>Formally, a&nbsp;<strong>valid number</strong> is defined using one of the following definitions:</p>\n\n<ol>\n\t<li>An <strong>integer number</strong> followed by an <strong>optional exponent</strong>.</li>\n\t<li>A <strong>decimal number</strong> followed by an <strong>optional exponent</strong>.</li>\n</ol>\n\n<p>An <strong>integer number</strong> is defined with an <strong>optional sign</strong> <code>&#39;-&#39;</code> or <code>&#39;+&#39;</code> followed by <strong>digits</strong>.</p>\n\n<p>A <strong>decimal number</strong> is defined with an <strong>optional sign</strong> <code>&#39;-&#39;</code> or <code>&#39;+&#39;</code> followed by one of the following definitions:</p>\n\n<ol>\n\t<li><strong>Digits</strong> followed by a <strong>dot</strong> <code>&#39;.&#39;</code>.</li>\n\t<li><strong>Digits</strong> followed by a <strong>dot</strong> <code>&#39;.&#39;</code> followed by <strong>digits</strong>.</li>\n\t<li>A <strong>dot</strong> <code>&#39;.&#39;</code> followed by <strong>digits</strong>.</li>\n</ol>\n\n<p>An <strong>exponent</strong> is defined with an <strong>exponent notation</strong> <code>&#39;e&#39;</code> or <code>&#39;E&#39;</code> followed by an <strong>integer number</strong>.</p>\n\n<p>The <strong>digits</strong> are defined as one or more digits.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;0&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;e&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;.&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 20</code></li>\n\t<li><code>s</code> consists of only English letters (both uppercase and lowercase), digits (<code>0-9</code>), plus <code>&#39;+&#39;</code>, minus <code>&#39;-&#39;</code>, or dot <code>&#39;.&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 58,
    "companyTags": [
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "plus-one",
    "title": "Plus One",
    "description": "<p>You are given a <strong>large integer</strong> represented as an integer array <code>digits</code>, where each <code>digits[i]</code> is the <code>i<sup>th</sup></code> digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading <code>0</code>&#39;s.</p>\n\n<p>Increment the large integer by one and return <em>the resulting array of digits</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = [1,2,3]\n<strong>Output:</strong> [1,2,4]\n<strong>Explanation:</strong> The array represents the integer 123.\nIncrementing by one gives 123 + 1 = 124.\nThus, the result should be [1,2,4].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = [4,3,2,1]\n<strong>Output:</strong> [4,3,2,2]\n<strong>Explanation:</strong> The array represents the integer 4321.\nIncrementing by one gives 4321 + 1 = 4322.\nThus, the result should be [4,3,2,2].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> digits = [9]\n<strong>Output:</strong> [1,0]\n<strong>Explanation:</strong> The array represents the integer 9.\nIncrementing by one gives 9 + 1 = 10.\nThus, the result should be [1,0].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= digits.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= digits[i] &lt;= 9</code></li>\n\t<li><code>digits</code> does not contain any leading <code>0</code>&#39;s.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "add-binary",
    "title": "Add Binary",
    "description": "<p>Given two binary strings <code>a</code> and <code>b</code>, return <em>their sum as a binary string</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> a = \"11\", b = \"1\"\n<strong>Output:</strong> \"100\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> a = \"1010\", b = \"1011\"\n<strong>Output:</strong> \"10101\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= a.length, b.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>a</code> and <code>b</code> consist&nbsp;only of <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code> characters.</li>\n\t<li>Each string does not contain leading zeros except for the zero itself.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 42,
    "companyTags": [
      "Math",
      "String",
      "Bit Manipulation",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "text-justification",
    "title": "Text Justification",
    "description": "<p>Given an array of strings <code>words</code> and a width <code>maxWidth</code>, format the text such that each line has exactly <code>maxWidth</code> characters and is fully (left and right) justified.</p>\n\n<p>You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces <code>&#39; &#39;</code> when necessary so that each line has exactly <code>maxWidth</code> characters.</p>\n\n<p>Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.</p>\n\n<p>For the last line of text, it should be left-justified, and no extra space is inserted between words.</p>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>A word is defined as a character sequence consisting of non-space characters only.</li>\n\t<li>Each word&#39;s length is guaranteed to be greater than <code>0</code> and not exceed <code>maxWidth</code>.</li>\n\t<li>The input array <code>words</code> contains at least one word.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;This&quot;, &quot;is&quot;, &quot;an&quot;, &quot;example&quot;, &quot;of&quot;, &quot;text&quot;, &quot;justification.&quot;], maxWidth = 16\n<strong>Output:</strong>\n[\n&nbsp; &nbsp;&quot;This &nbsp; &nbsp;is &nbsp; &nbsp;an&quot;,\n&nbsp; &nbsp;&quot;example &nbsp;of text&quot;,\n&nbsp; &nbsp;&quot;justification. &nbsp;&quot;\n]</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;What&quot;,&quot;must&quot;,&quot;be&quot;,&quot;acknowledgment&quot;,&quot;shall&quot;,&quot;be&quot;], maxWidth = 16\n<strong>Output:</strong>\n[\n&nbsp; &quot;What &nbsp; must &nbsp; be&quot;,\n&nbsp; &quot;acknowledgment &nbsp;&quot;,\n&nbsp; &quot;shall be &nbsp; &nbsp; &nbsp; &nbsp;&quot;\n]\n<strong>Explanation:</strong> Note that the last line is &quot;shall be    &quot; instead of &quot;shall     be&quot;, because the last line must be left-justified instead of fully-justified.\nNote that the second line is also left-justified because it contains only one word.</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;Science&quot;,&quot;is&quot;,&quot;what&quot;,&quot;we&quot;,&quot;understand&quot;,&quot;well&quot;,&quot;enough&quot;,&quot;to&quot;,&quot;explain&quot;,&quot;to&quot;,&quot;a&quot;,&quot;computer.&quot;,&quot;Art&quot;,&quot;is&quot;,&quot;everything&quot;,&quot;else&quot;,&quot;we&quot;,&quot;do&quot;], maxWidth = 20\n<strong>Output:</strong>\n[\n&nbsp; &quot;Science &nbsp;is &nbsp;what we&quot;,\n  &quot;understand &nbsp; &nbsp; &nbsp;well&quot;,\n&nbsp; &quot;enough to explain to&quot;,\n&nbsp; &quot;a &nbsp;computer. &nbsp;Art is&quot;,\n&nbsp; &quot;everything &nbsp;else &nbsp;we&quot;,\n&nbsp; &quot;do &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&quot;\n]</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 20</code></li>\n\t<li><code>words[i]</code> consists of only English letters and symbols.</li>\n\t<li><code>1 &lt;= maxWidth &lt;= 100</code></li>\n\t<li><code>words[i].length &lt;= maxWidth</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "String",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sqrtx",
    "title": "Sqrt(x)",
    "description": "<p>Given a non-negative integer <code>x</code>, return <em>the square root of </em><code>x</code><em> rounded down to the nearest integer</em>. The returned integer should be <strong>non-negative</strong> as well.</p>\n\n<p>You <strong>must not use</strong> any built-in exponent function or operator.</p>\n\n<ul>\n\t<li>For example, do not use <code>pow(x, 0.5)</code> in c++ or <code>x ** 0.5</code> in python.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The square root of 4 is 2, so we return 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> x = 8\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 55,
    "companyTags": [
      "Math",
      "Binary Search"
    ],
    "hints": [
      "Try exploring all integers. (Credits: @annujoshi)",
      "Use the sorted property of integers to reduced the search space. (Credits: @annujoshi)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "description": "<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>\n\n<p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 45</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Memoization"
    ],
    "hints": [
      "To reach nth step, what could have been your previous steps? (Think about the step sizes)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "simplify-path",
    "title": "Simplify Path",
    "description": "<p>You are given an <em>absolute</em> path for a Unix-style file system, which always begins with a slash <code>&#39;/&#39;</code>. Your task is to transform this absolute path into its <strong>simplified canonical path</strong>.</p>\n\n<p>The <em>rules</em> of a Unix-style file system are as follows:</p>\n\n<ul>\n\t<li>A single period <code>&#39;.&#39;</code> represents the current directory.</li>\n\t<li>A double period <code>&#39;..&#39;</code> represents the previous/parent directory.</li>\n\t<li>Multiple consecutive slashes such as <code>&#39;//&#39;</code> and <code>&#39;///&#39;</code> are treated as a single slash <code>&#39;/&#39;</code>.</li>\n\t<li>Any sequence of periods that does <strong>not match</strong> the rules above should be treated as a <strong>valid directory or</strong> <strong>file </strong><strong>name</strong>. For example, <code>&#39;...&#39; </code>and <code>&#39;....&#39;</code> are valid directory or file names.</li>\n</ul>\n\n<p>The simplified canonical path should follow these <em>rules</em>:</p>\n\n<ul>\n\t<li>The path must start with a single slash <code>&#39;/&#39;</code>.</li>\n\t<li>Directories within the path must be separated by exactly one slash <code>&#39;/&#39;</code>.</li>\n\t<li>The path must not end with a slash <code>&#39;/&#39;</code>, unless it is the root directory.</li>\n\t<li>The path must not have any single or double periods (<code>&#39;.&#39;</code> and <code>&#39;..&#39;</code>) used to denote current or parent directories.</li>\n</ul>\n\n<p>Return the <strong>simplified canonical path</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">path = &quot;/home/&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;/home&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The trailing slash should be removed.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">path = &quot;/home//foo/&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;/home/foo&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>Multiple consecutive slashes are replaced by a single one.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">path = &quot;/home/user/Documents/../Pictures&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;/home/user/Pictures&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>A double period <code>&quot;..&quot;</code> refers to the directory up a level (the parent directory).</p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">path = &quot;/../&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;/&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>Going one level up from the root directory is not possible.</p>\n</div>\n\n<p><strong class=\"example\">Example 5:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">path = &quot;/.../a/../b/c/../d/./&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;/.../b/d&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><code>&quot;...&quot;</code> is a valid name for a directory in this problem.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= path.length &lt;= 3000</code></li>\n\t<li><code>path</code> consists of English letters, digits, period <code>&#39;.&#39;</code>, slash <code>&#39;/&#39;</code> or <code>&#39;_&#39;</code>.</li>\n\t<li><code>path</code> is a valid absolute Unix path.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "String",
      "Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "edit-distance",
    "title": "Edit Distance",
    "description": "<p>Given two strings <code>word1</code> and <code>word2</code>, return <em>the minimum number of operations required to convert <code>word1</code> to <code>word2</code></em>.</p>\n\n<p>You have the following three operations permitted on a word:</p>\n\n<ul>\n\t<li>Insert a character</li>\n\t<li>Delete a character</li>\n\t<li>Replace a character</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> word1 = &quot;horse&quot;, word2 = &quot;ros&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> \nhorse -&gt; rorse (replace &#39;h&#39; with &#39;r&#39;)\nrorse -&gt; rose (remove &#39;r&#39;)\nrose -&gt; ros (remove &#39;e&#39;)\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> word1 = &quot;intention&quot;, word2 = &quot;execution&quot;\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> \nintention -&gt; inention (remove &#39;t&#39;)\ninention -&gt; enention (replace &#39;i&#39; with &#39;e&#39;)\nenention -&gt; exention (replace &#39;n&#39; with &#39;x&#39;)\nexention -&gt; exection (replace &#39;n&#39; with &#39;c&#39;)\nexection -&gt; execution (insert &#39;u&#39;)\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>\n\t<li><code>word1</code> and <code>word2</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "description": "<p>Given an <code>m x n</code> integer matrix <code>matrix</code>, if an element is <code>0</code>, set its entire row and column to <code>0</code>&#39;s.</p>\n\n<p>You must do it <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in place</a>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg\" style=\"width: 450px; height: 169px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,1,1],[1,0,1],[1,1,1]]\n<strong>Output:</strong> [[1,0,1],[0,0,0],[1,0,1]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg\" style=\"width: 450px; height: 137px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\n<strong>Output:</strong> [[0,0,0,0],[0,4,5,0],[0,3,1,0]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[0].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= matrix[i][j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>A straightforward solution using <code>O(mn)</code> space is probably a bad idea.</li>\n\t<li>A simple improvement uses <code>O(m + n)</code> space, but still not the best solution.</li>\n\t<li>Could you devise a constant space solution?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Hash Table",
      "Matrix"
    ],
    "hints": [
      "If any cell of the matrix has a zero we can record its row and column number using additional memory.\r\nBut if you don't want to use extra memory then you can manipulate the array instead. i.e. simulating exactly what the question says.",
      "Setting cell values to zero on the fly while iterating might lead to discrepancies. What if you use some other integer value as your marker?\r\nThere is still a better approach for this problem with O(1) space.",
      "We could have used 2 sets to keep a record of rows/columns which need to be set to zero. But for an O(1) space solution, you can use one of the rows and and one of the columns to keep track of this information.",
      "We can use the first cell of every row and column as a flag. This flag would determine whether a row or column has been set to zero."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "description": "<p>You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties:</p>\n\n<ul>\n\t<li>Each row is sorted in non-decreasing order.</li>\n\t<li>The first integer of each row is greater than the last integer of the previous row.</li>\n</ul>\n\n<p>Given an integer <code>target</code>, return <code>true</code> <em>if</em> <code>target</code> <em>is in</em> <code>matrix</code> <em>or</em> <code>false</code> <em>otherwise</em>.</p>\n\n<p>You must write a solution in <code>O(log(m * n))</code> time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/05/mat.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j], target &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sort-colors",
    "title": "Sort Colors",
    "description": "<p>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong><a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a> </strong>so that objects of the same color are adjacent, with the colors in the order red, white, and blue.</p>\n\n<p>We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.</p>\n\n<p>You must solve this problem without using the library&#39;s sort function.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,0,2,1,1,0]\n<strong>Output:</strong> [0,0,1,1,2,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,0,1]\n<strong>Output:</strong> [0,1,2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>nums[i]</code> is either <code>0</code>, <code>1</code>, or <code>2</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong>&nbsp;Could you come up with a one-pass algorithm using only&nbsp;constant extra space?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [
      "A rather straight forward solution is a two-pass algorithm using counting sort.",
      "Iterate the array counting number of 0's, 1's, and 2's.",
      "Overwrite array with the total number of 0's, then 1's and followed by 2's."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-window-substring",
    "title": "Minimum Window Substring",
    "description": "<p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return <em>the <strong>minimum window</strong></em> <span data-keyword=\"substring-nonempty\"><strong><em>substring</em></strong></span><em> of </em><code>s</code><em> such that every character in </em><code>t</code><em> (<strong>including duplicates</strong>) is included in the window</em>. If there is no such substring, return <em>the empty string </em><code>&quot;&quot;</code>.</p>\n\n<p>The testcases will be generated such that the answer is <strong>unique</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ADOBECODEBANC&quot;, t = &quot;ABC&quot;\n<strong>Output:</strong> &quot;BANC&quot;\n<strong>Explanation:</strong> The minimum window substring &quot;BANC&quot; includes &#39;A&#39;, &#39;B&#39;, and &#39;C&#39; from string t.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a&quot;, t = &quot;a&quot;\n<strong>Output:</strong> &quot;a&quot;\n<strong>Explanation:</strong> The entire string s is the minimum window.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a&quot;, t = &quot;aa&quot;\n<strong>Output:</strong> &quot;&quot;\n<strong>Explanation:</strong> Both &#39;a&#39;s from t must be included in the window.\nSince the largest window of s only has one &#39;a&#39;, return empty string.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == s.length</code></li>\n\t<li><code>n == t.length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> and <code>t</code> consist of uppercase and lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you find an algorithm that runs in <code>O(m + n)</code> time?</p>\n",
    "difficulty": "Hard",
    "acceptanceRate": 49,
    "companyTags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "hints": [
      "Use two pointers to create a window of letters in s, which would have all the characters from t.",
      "Expand the right pointer until all the characters of t are covered.",
      "Once all the characters are covered, move the left pointer and ensure that all the characters are still covered to minimize the subarray size.",
      "Continue expanding the right and left pointers until you reach the end of s."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "combinations",
    "title": "Combinations",
    "description": "<p>Given two integers <code>n</code> and <code>k</code>, return <em>all possible combinations of</em> <code>k</code> <em>numbers chosen from the range</em> <code>[1, n]</code>.</p>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4, k = 2\n<strong>Output:</strong> [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]\n<strong>Explanation:</strong> There are 4 choose 2 = 6 total combinations.\nNote that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, k = 1\n<strong>Output:</strong> [[1]]\n<strong>Explanation:</strong> There is 1 choose 1 = 1 total combination.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>1 &lt;= k &lt;= n</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "subsets",
    "title": "Subsets",
    "description": "<p>Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible</em> <span data-keyword=\"subset\"><em>subsets</em></span> <em>(the power set)</em>.</p>\n\n<p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0]\n<strong>Output:</strong> [[],[0]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>All the numbers of&nbsp;<code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-search",
    "title": "Word Search",
    "description": "<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> <em>if</em> <code>word</code> <em>exists in the grid</em>.</p>\n\n<p>The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/word2.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCCED&quot;\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;SEE&quot;\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/15/word3.jpg\" style=\"width: 322px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCB&quot;\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n = board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 6</code></li>\n\t<li><code>1 &lt;= word.length &lt;= 15</code></li>\n\t<li><code>board</code> and <code>word</code> consists of only lowercase and uppercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you use search pruning to make your solution faster with a larger <code>board</code>?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "String",
      "Backtracking",
      "Depth-First Search",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-array-ii",
    "title": "Remove Duplicates from Sorted Array II",
    "description": "<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove some duplicates <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a> such that each unique element appears <strong>at most twice</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>.</p>\n\n<p>Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the <strong>first part</strong> of the array <code>nums</code>. More formally, if there are <code>k</code> elements after removing the duplicates, then the first <code>k</code> elements of <code>nums</code>&nbsp;should hold the final result. It does not matter what you leave beyond the first&nbsp;<code>k</code>&nbsp;elements.</p>\n\n<p>Return <code>k</code><em> after placing the final result in the first </em><code>k</code><em> slots of </em><code>nums</code>.</p>\n\n<p>Do <strong>not</strong> allocate extra space for another array. You must do this by <strong>modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a></strong> with O(1) extra memory.</p>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i &lt; k; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,1,2,2,3]\n<strong>Output:</strong> 5, nums = [1,1,2,2,3,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,1,1,1,1,2,3,3]\n<strong>Output:</strong> 7, nums = [0,0,1,1,2,3,3,_,_]\n<strong>Explanation:</strong> Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 57,
    "companyTags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "search-in-rotated-sorted-array-ii",
    "title": "Search in Rotated Sorted Array II",
    "description": "<p>There is an integer array <code>nums</code> sorted in non-decreasing order (not necessarily with <strong>distinct</strong> values).</p>\n\n<p>Before being passed to your function, <code>nums</code> is <strong>rotated</strong> at an unknown pivot index <code>k</code> (<code>0 &lt;= k &lt; nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,4,4,5,6,6,7]</code> might be rotated at pivot index <code>5</code> and become <code>[4,5,6,6,7,0,1,2,4,4]</code>.</p>\n\n<p>Given the array <code>nums</code> <strong>after</strong> the rotation and an integer <code>target</code>, return <code>true</code><em> if </em><code>target</code><em> is in </em><code>nums</code><em>, or </em><code>false</code><em> if it is not in </em><code>nums</code><em>.</em></p>\n\n<p>You must decrease the overall operation steps as much as possible.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [2,5,6,0,0,1,2], target = 0\n<strong>Output:</strong> true\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [2,5,6,0,0,1,2], target = 3\n<strong>Output:</strong> false\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> is guaranteed to be rotated at some pivot.</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> This problem is similar to&nbsp;<a href=\"/problems/search-in-rotated-sorted-array/description/\" target=\"_blank\">Search in Rotated Sorted Array</a>, but&nbsp;<code>nums</code> may contain <strong>duplicates</strong>. Would this affect the runtime complexity? How and why?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-list-ii",
    "title": "Remove Duplicates from Sorted List II",
    "description": "<p>Given the <code>head</code> of a sorted linked list, <em>delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list</em>. Return <em>the linked list <strong>sorted</strong> as well</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg\" style=\"width: 500px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,3,4,4,5]\n<strong>Output:</strong> [1,2,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg\" style=\"width: 500px; height: 205px;\" />\n<pre>\n<strong>Input:</strong> head = [1,1,1,2,3]\n<strong>Output:</strong> [2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 300]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>The list is guaranteed to be <strong>sorted</strong> in ascending order.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-list",
    "title": "Remove Duplicates from Sorted List",
    "description": "<p>Given the <code>head</code> of a sorted linked list, <em>delete all duplicates such that each element appears only once</em>. Return <em>the linked list <strong>sorted</strong> as well</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/list1.jpg\" style=\"width: 302px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> head = [1,1,2]\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/list2.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,1,2,3,3]\n<strong>Output:</strong> [1,2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 300]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>The list is guaranteed to be <strong>sorted</strong> in ascending order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 61,
    "companyTags": [
      "Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "description": "<p>Given an array of integers <code>heights</code> representing the histogram&#39;s bar height where the width of each bar is <code>1</code>, return <em>the area of the largest rectangle in the histogram</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg\" style=\"width: 522px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> heights = [2,1,5,6,2,3]\n<strong>Output:</strong> 10\n<strong>Explanation:</strong> The above is a histogram where width of each bar is 1.\nThe largest rectangle is shown in the red area, which has an area = 10 units.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg\" style=\"width: 202px; height: 362px;\" />\n<pre>\n<strong>Input:</strong> heights = [2,4]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= heights.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= heights[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 32,
    "companyTags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximal-rectangle",
    "title": "Maximal Rectangle",
    "description": "<p>Given a <code>rows x cols</code>&nbsp;binary <code>matrix</code> filled with <code>0</code>&#39;s and <code>1</code>&#39;s, find the largest rectangle containing only <code>1</code>&#39;s and return <em>its area</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg\" style=\"width: 402px; height: 322px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;]]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The maximal rectangle is shown in the above picture.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[&quot;0&quot;]]\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[&quot;1&quot;]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>rows == matrix.length</code></li>\n\t<li><code>cols == matrix[i].length</code></li>\n\t<li><code>1 &lt;= rows, cols &lt;= 200</code></li>\n\t<li><code>matrix[i][j]</code> is <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Stack",
      "Matrix",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "partition-list",
    "title": "Partition List",
    "description": "<p>Given the <code>head</code> of a linked list and a value <code>x</code>, partition it such that all nodes <strong>less than</strong> <code>x</code> come before nodes <strong>greater than or equal</strong> to <code>x</code>.</p>\n\n<p>You should <strong>preserve</strong> the original relative order of the nodes in each of the two partitions.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/04/partition.jpg\" style=\"width: 662px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,4,3,2,5,2], x = 3\n<strong>Output:</strong> [1,2,2,4,3,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [2,1], x = 2\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 200]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>-200 &lt;= x &lt;= 200</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "scramble-string",
    "title": "Scramble String",
    "description": "<p>We can scramble a string s to get a string t using the following algorithm:</p>\n\n<ol>\n\t<li>If the length of the string is 1, stop.</li>\n\t<li>If the length of the string is &gt; 1, do the following:\n\t<ul>\n\t\t<li>Split the string into two non-empty substrings at a random index, i.e., if the string is <code>s</code>, divide it to <code>x</code> and <code>y</code> where <code>s = x + y</code>.</li>\n\t\t<li><strong>Randomly</strong>&nbsp;decide to swap the two substrings or to keep them in the same order. i.e., after this step, <code>s</code> may become <code>s = x + y</code> or <code>s = y + x</code>.</li>\n\t\t<li>Apply step 1 recursively on each of the two substrings <code>x</code> and <code>y</code>.</li>\n\t</ul>\n\t</li>\n</ol>\n\n<p>Given two strings <code>s1</code> and <code>s2</code> of <strong>the same length</strong>, return <code>true</code> if <code>s2</code> is a scrambled string of <code>s1</code>, otherwise, return <code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s1 = &quot;great&quot;, s2 = &quot;rgeat&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> One possible scenario applied on s1 is:\n&quot;great&quot; --&gt; &quot;gr/eat&quot; // divide at random index.\n&quot;gr/eat&quot; --&gt; &quot;gr/eat&quot; // random decision is not to swap the two substrings and keep them in order.\n&quot;gr/eat&quot; --&gt; &quot;g/r / e/at&quot; // apply the same algorithm recursively on both substrings. divide at random index each of them.\n&quot;g/r / e/at&quot; --&gt; &quot;r/g / e/at&quot; // random decision was to swap the first substring and to keep the second substring in the same order.\n&quot;r/g / e/at&quot; --&gt; &quot;r/g / e/ a/t&quot; // again apply the algorithm recursively, divide &quot;at&quot; to &quot;a/t&quot;.\n&quot;r/g / e/ a/t&quot; --&gt; &quot;r/g / e/ a/t&quot; // random decision is to keep both substrings in the same order.\nThe algorithm stops now, and the result string is &quot;rgeat&quot; which is s2.\nAs one possible scenario led s1 to be scrambled to s2, we return true.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s1 = &quot;abcde&quot;, s2 = &quot;caebd&quot;\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s1 = &quot;a&quot;, s2 = &quot;a&quot;\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>s1.length == s2.length</code></li>\n\t<li><code>1 &lt;= s1.length &lt;= 30</code></li>\n\t<li><code>s1</code> and <code>s2</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 64,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "merge-sorted-array",
    "title": "Merge Sorted Array",
    "description": "<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in <strong>non-decreasing order</strong>, and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.</p>\n\n<p><strong>Merge</strong> <code>nums1</code> and <code>nums2</code> into a single array sorted in <strong>non-decreasing order</strong>.</p>\n\n<p>The final sorted array should not be returned by the function, but instead be <em>stored inside the array </em><code>nums1</code>. To accommodate this, <code>nums1</code> has a length of <code>m + n</code>, where the first <code>m</code> elements denote the elements that should be merged, and the last <code>n</code> elements are set to <code>0</code> and should be ignored. <code>nums2</code> has a length of <code>n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\n<strong>Output:</strong> [1,2,2,3,5,6]\n<strong>Explanation:</strong> The arrays we are merging are [1,2,3] and [2,5,6].\nThe result of the merge is [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6] with the underlined elements coming from nums1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1], m = 1, nums2 = [], n = 0\n<strong>Output:</strong> [1]\n<strong>Explanation:</strong> The arrays we are merging are [1] and [].\nThe result of the merge is [1].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1\n<strong>Output:</strong> [1]\n<strong>Explanation:</strong> The arrays we are merging are [] and [1].\nThe result of the merge is [1].\nNote that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>nums1.length == m + n</code></li>\n\t<li><code>nums2.length == n</code></li>\n\t<li><code>0 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>1 &lt;= m + n &lt;= 200</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>9</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up: </strong>Can you come up with an algorithm that runs in <code>O(m + n)</code> time?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [
      "You can easily solve this problem if you simply think about two elements at a time rather than two arrays. We know that each of the individual arrays is sorted. What we don't know is how they will intertwine. Can we take a local decision and arrive at an optimal solution?",
      "If you simply consider one element each at a time from the two arrays and make a decision and proceed accordingly, you will arrive at the optimal solution."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "gray-code",
    "title": "Gray Code",
    "description": "<p>An <strong>n-bit gray code sequence</strong> is a sequence of <code>2<sup>n</sup></code> integers where:</p>\n\n<ul>\n\t<li>Every integer is in the <strong>inclusive</strong> range <code>[0, 2<sup>n</sup> - 1]</code>,</li>\n\t<li>The first integer is <code>0</code>,</li>\n\t<li>An integer appears <strong>no more than once</strong> in the sequence,</li>\n\t<li>The binary representation of every pair of <strong>adjacent</strong> integers differs by <strong>exactly one bit</strong>, and</li>\n\t<li>The binary representation of the <strong>first</strong> and <strong>last</strong> integers differs by <strong>exactly one bit</strong>.</li>\n</ul>\n\n<p>Given an integer <code>n</code>, return <em>any valid <strong>n-bit gray code sequence</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> [0,1,3,2]\n<strong>Explanation:</strong>\nThe binary representation of [0,1,3,2] is [00,01,11,10].\n- 0<u>0</u> and 0<u>1</u> differ by one bit\n- <u>0</u>1 and <u>1</u>1 differ by one bit\n- 1<u>1</u> and 1<u>0</u> differ by one bit\n- <u>1</u>0 and <u>0</u>0 differ by one bit\n[0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].\n- <u>0</u>0 and <u>1</u>0 differ by one bit\n- 1<u>0</u> and 1<u>1</u> differ by one bit\n- <u>1</u>1 and <u>0</u>1 differ by one bit\n- 0<u>1</u> and 0<u>0</u> differ by one bit\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 16</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Math",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "subsets-ii",
    "title": "Subsets II",
    "description": "<p>Given an integer array <code>nums</code> that may contain duplicates, return <em>all possible</em> <span data-keyword=\"subset\"><em>subsets</em></span><em> (the power set)</em>.</p>\n\n<p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,2]\n<strong>Output:</strong> [[],[1],[1,2],[1,2,2],[2],[2,2]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0]\n<strong>Output:</strong> [[],[0]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 35,
    "companyTags": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "decode-ways",
    "title": "Decode Ways",
    "description": "<p>You have intercepted a secret message encoded as a string of numbers. The message is <strong>decoded</strong> via the following mapping:</p>\n\n<p><code>&quot;1&quot; -&gt; &#39;A&#39;<br />\n&quot;2&quot; -&gt; &#39;B&#39;<br />\n...<br />\n&quot;25&quot; -&gt; &#39;Y&#39;<br />\n&quot;26&quot; -&gt; &#39;Z&#39;</code></p>\n\n<p>However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes (<code>&quot;2&quot;</code> and <code>&quot;5&quot;</code> vs <code>&quot;25&quot;</code>).</p>\n\n<p>For example, <code>&quot;11106&quot;</code> can be decoded into:</p>\n\n<ul>\n\t<li><code>&quot;AAJF&quot;</code> with the grouping <code>(1, 1, 10, 6)</code></li>\n\t<li><code>&quot;KJF&quot;</code> with the grouping <code>(11, 10, 6)</code></li>\n\t<li>The grouping <code>(1, 11, 06)</code> is invalid because <code>&quot;06&quot;</code> is not a valid code (only <code>&quot;6&quot;</code> is valid).</li>\n</ul>\n\n<p>Note: there may be strings that are impossible to decode.<br />\n<br />\nGiven a string s containing only digits, return the <strong>number of ways</strong> to <strong>decode</strong> it. If the entire string cannot be decoded in any valid way, return <code>0</code>.</p>\n\n<p>The test cases are generated so that the answer fits in a <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;12&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">2</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;12&quot; could be decoded as &quot;AB&quot; (1 2) or &quot;L&quot; (12).</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;226&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">3</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;226&quot; could be decoded as &quot;BZ&quot; (2 26), &quot;VF&quot; (22 6), or &quot;BBF&quot; (2 2 6).</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;06&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">0</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>&quot;06&quot; cannot be mapped to &quot;F&quot; because of the leading zero (&quot;6&quot; is different from &quot;06&quot;). In this case, the string is not a valid encoding, so return 0.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 100</code></li>\n\t<li><code>s</code> contains only digits and may contain leading zero(s).</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 36,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-linked-list-ii",
    "title": "Reverse Linked List II",
    "description": "<p>Given the <code>head</code> of a singly linked list and two integers <code>left</code> and <code>right</code> where <code>left &lt;= right</code>, reverse the nodes of the list from position <code>left</code> to position <code>right</code>, and return <em>the reversed list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5], left = 2, right = 4\n<strong>Output:</strong> [1,4,3,2,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [5], left = 1, right = 1\n<strong>Output:</strong> [5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>n</code>.</li>\n\t<li><code>1 &lt;= n &lt;= 500</code></li>\n\t<li><code>-500 &lt;= Node.val &lt;= 500</code></li>\n\t<li><code>1 &lt;= left &lt;= right &lt;= n</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you do it in one pass?",
    "difficulty": "Medium",
    "acceptanceRate": 51,
    "companyTags": [
      "Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "restore-ip-addresses",
    "title": "Restore IP Addresses",
    "description": "<p>A <strong>valid IP address</strong> consists of exactly four integers separated by single dots. Each integer is between <code>0</code> and <code>255</code> (<strong>inclusive</strong>) and cannot have leading zeros.</p>\n\n<ul>\n\t<li>For example, <code>&quot;0.1.2.201&quot;</code> and <code>&quot;192.168.1.1&quot;</code> are <strong>valid</strong> IP addresses, but <code>&quot;0.011.255.245&quot;</code>, <code>&quot;192.168.1.312&quot;</code> and <code>&quot;192.168@1.1&quot;</code> are <strong>invalid</strong> IP addresses.</li>\n</ul>\n\n<p>Given a string <code>s</code> containing only digits, return <em>all possible valid IP addresses that can be formed by inserting dots into </em><code>s</code>. You are <strong>not</strong> allowed to reorder or remove any digits in <code>s</code>. You may return the valid IP addresses in <strong>any</strong> order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;25525511135&quot;\n<strong>Output:</strong> [&quot;255.255.11.135&quot;,&quot;255.255.111.35&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;0000&quot;\n<strong>Output:</strong> [&quot;0.0.0.0&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;101023&quot;\n<strong>Output:</strong> [&quot;1.0.10.23&quot;,&quot;1.0.102.3&quot;,&quot;10.1.0.23&quot;,&quot;10.10.2.3&quot;,&quot;101.0.2.3&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 20</code></li>\n\t<li><code>s</code> consists of digits only.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "String",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-inorder-traversal",
    "title": "Binary Tree Inorder Traversal",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the inorder traversal of its nodes&#39; values</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,null,2,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3,2]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png\" style=\"width: 200px; height: 264px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,4,5,null,8,null,null,6,7,9]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[4,2,6,5,7,1,3,9,8]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/tree_2.png\" style=\"width: 350px; height: 286px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Recursive solution is trivial, could you do it iteratively?",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Stack",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "unique-binary-search-trees-ii",
    "title": "Unique Binary Search Trees II",
    "description": "<p>Given an integer <code>n</code>, return <em>all the structurally unique <strong>BST&#39;</strong>s (binary search trees), which has exactly </em><code>n</code><em> nodes of unique values from</em> <code>1</code> <em>to</em> <code>n</code>. Return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg\" style=\"width: 600px; height: 148px;\" />\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Dynamic Programming",
      "Backtracking",
      "Tree",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "unique-binary-search-trees",
    "title": "Unique Binary Search Trees",
    "description": "<p>Given an integer <code>n</code>, return <em>the number of structurally unique <strong>BST&#39;</strong>s (binary search trees) which has exactly </em><code>n</code><em> nodes of unique values from</em> <code>1</code> <em>to</em> <code>n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg\" style=\"width: 600px; height: 148px;\" />\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 5\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 19</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Tree",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "interleaving-string",
    "title": "Interleaving String",
    "description": "<p>Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, find whether <code>s3</code> is formed by an <strong>interleaving</strong> of <code>s1</code> and <code>s2</code>.</p>\n\n<p>An <strong>interleaving</strong> of two strings <code>s</code> and <code>t</code> is a configuration where <code>s</code> and <code>t</code> are divided into <code>n</code> and <code>m</code> <span data-keyword=\"substring-nonempty\">substrings</span> respectively, such that:</p>\n\n<ul>\n\t<li><code>s = s<sub>1</sub> + s<sub>2</sub> + ... + s<sub>n</sub></code></li>\n\t<li><code>t = t<sub>1</sub> + t<sub>2</sub> + ... + t<sub>m</sub></code></li>\n\t<li><code>|n - m| &lt;= 1</code></li>\n\t<li>The <strong>interleaving</strong> is <code>s<sub>1</sub> + t<sub>1</sub> + s<sub>2</sub> + t<sub>2</sub> + s<sub>3</sub> + t<sub>3</sub> + ...</code> or <code>t<sub>1</sub> + s<sub>1</sub> + t<sub>2</sub> + s<sub>2</sub> + t<sub>3</sub> + s<sub>3</sub> + ...</code></li>\n</ul>\n\n<p><strong>Note:</strong> <code>a + b</code> is the concatenation of strings <code>a</code> and <code>b</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg\" style=\"width: 561px; height: 203px;\" />\n<pre>\n<strong>Input:</strong> s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbcbcac&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> One way to obtain s3 is:\nSplit s1 into s1 = &quot;aa&quot; + &quot;bc&quot; + &quot;c&quot;, and s2 into s2 = &quot;dbbc&quot; + &quot;a&quot;.\nInterleaving the two splits, we get &quot;aa&quot; + &quot;dbbc&quot; + &quot;bc&quot; + &quot;a&quot; + &quot;c&quot; = &quot;aadbbcbcac&quot;.\nSince s3 can be obtained by interleaving s1 and s2, we return true.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbbaccc&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Notice how it is impossible to interleave s2 with any other string to obtain s3.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s1 = &quot;&quot;, s2 = &quot;&quot;, s3 = &quot;&quot;\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s1.length, s2.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= s3.length &lt;= 200</code></li>\n\t<li><code>s1</code>, <code>s2</code>, and <code>s3</code> consist of lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you solve it using only <code>O(s2.length)</code> additional memory space?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "validate-binary-search-tree",
    "title": "Validate Binary Search Tree",
    "description": "<p>Given the <code>root</code> of a binary tree, <em>determine if it is a valid binary search tree (BST)</em>.</p>\n\n<p>A <strong>valid BST</strong> is defined as follows:</p>\n\n<ul>\n\t<li>The left <span data-keyword=\"subtree\">subtree</span> of a node contains only nodes with keys&nbsp;<strong>strictly less than</strong> the node&#39;s key.</li>\n\t<li>The right subtree of a node contains only nodes with keys <strong>strictly greater than</strong> the node&#39;s key.</li>\n\t<li>Both the left and right subtrees must also be binary search trees.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg\" style=\"width: 302px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg\" style=\"width: 422px; height: 292px;\" />\n<pre>\n<strong>Input:</strong> root = [5,1,4,null,null,3,6]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The root node&#39;s value is 5 but its right child&#39;s value is 4.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "recover-binary-search-tree",
    "title": "Recover Binary Search Tree",
    "description": "<p>You are given the <code>root</code> of a binary search tree (BST), where the values of <strong>exactly</strong> two nodes of the tree were swapped by mistake. <em>Recover the tree without changing its structure</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg\" style=\"width: 422px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [1,3,null,null,2]\n<strong>Output:</strong> [3,1,null,null,2]\n<strong>Explanation:</strong> 3 cannot be a left child of 1 because 3 &gt; 1. Swapping 1 and 3 makes the BST valid.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg\" style=\"width: 581px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,1,4,null,null,2]\n<strong>Output:</strong> [2,1,4,null,null,3]\n<strong>Explanation:</strong> 2 cannot be in the right subtree of 3 because 2 &lt; 3. Swapping 2 and 3 makes the BST valid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[2, 1000]</code>.</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> A solution using <code>O(n)</code> space is pretty straight-forward. Could you devise a constant <code>O(1)</code> space solution?",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "same-tree",
    "title": "Same Tree",
    "description": "<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p>\n\n<p>Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg\" style=\"width: 622px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2,3], q = [1,2,3]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg\" style=\"width: 382px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2], q = [1,null,2]\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg\" style=\"width: 622px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> p = [1,2,1], q = [1,1,2]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in both trees is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 52,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "symmetric-tree",
    "title": "Symmetric Tree",
    "description": "<p>Given the <code>root</code> of a binary tree, <em>check whether it is a mirror of itself</em> (i.e., symmetric around its center).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg\" style=\"width: 354px; height: 291px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,2,3,4,4,3]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg\" style=\"width: 308px; height: 258px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,2,null,3,null,3]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it both recursively and iteratively?",
    "difficulty": "Easy",
    "acceptanceRate": 66,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the level order traversal of its nodes&#39; values</em>. (i.e., from left to right, level by level).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[3],[9,20],[15,7]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Tree",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "Use a queue to perform BFS."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-zigzag-level-order-traversal",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the zigzag level order traversal of its nodes&#39; values</em>. (i.e., from left to right, then right to left for the next level and alternate between).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[3],[20,9],[15,7]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 49,
    "companyTags": [
      "Tree",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.</p>\n\n<p>A binary tree&#39;s <strong>maximum depth</strong>&nbsp;is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg\" style=\"width: 400px; height: 277px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,null,2]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "description": "<p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return <em>the binary tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n<strong>Output:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> preorder = [-1], inorder = [-1]\n<strong>Output:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= preorder.length &lt;= 3000</code></li>\n\t<li><code>inorder.length == preorder.length</code></li>\n\t<li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li>\n\t<li><code>preorder</code> and <code>inorder</code> consist of <strong>unique</strong> values.</li>\n\t<li>Each value of <code>inorder</code> also appears in <code>preorder</code>.</li>\n\t<li><code>preorder</code> is <strong>guaranteed</strong> to be the preorder traversal of the tree.</li>\n\t<li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "Array",
      "Hash Table",
      "Divide and Conquer",
      "Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "construct-binary-tree-from-inorder-and-postorder-traversal",
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "description": "<p>Given two integer arrays <code>inorder</code> and <code>postorder</code> where <code>inorder</code> is the inorder traversal of a binary tree and <code>postorder</code> is the postorder traversal of the same tree, construct and return <em>the binary tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]\n<strong>Output:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> inorder = [-1], postorder = [-1]\n<strong>Output:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= inorder.length &lt;= 3000</code></li>\n\t<li><code>postorder.length == inorder.length</code></li>\n\t<li><code>-3000 &lt;= inorder[i], postorder[i] &lt;= 3000</code></li>\n\t<li><code>inorder</code> and <code>postorder</code> consist of <strong>unique</strong> values.</li>\n\t<li>Each value of <code>postorder</code> also appears in <code>inorder</code>.</li>\n\t<li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li>\n\t<li><code>postorder</code> is <strong>guaranteed</strong> to be the postorder traversal of the tree.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Hash Table",
      "Divide and Conquer",
      "Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-level-order-traversal-ii",
    "title": "Binary Tree Level Order Traversal II",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the bottom-up level order traversal of its nodes&#39; values</em>. (i.e., from left to right, level by level from leaf to root).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[15,7],[9,20],[3]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "Tree",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "convert-sorted-array-to-binary-search-tree",
    "title": "Convert Sorted Array to Binary Search Tree",
    "description": "<p>Given an integer array <code>nums</code> where the elements are sorted in <strong>ascending order</strong>, convert <em>it to a </em><span data-keyword=\"height-balanced\"><strong><em>height-balanced</em></strong></span> <em>binary search tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg\" style=\"width: 302px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> nums = [-10,-3,0,5,9]\n<strong>Output:</strong> [0,-3,9,-10,null,5]\n<strong>Explanation:</strong> [0,-10,5,null,-3,null,9] is also accepted:\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg\" style=\"width: 302px; height: 222px;\" />\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/18/btree.jpg\" style=\"width: 342px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> nums = [1,3]\n<strong>Output:</strong> [3,1]\n<strong>Explanation:</strong> [1,null,3] and [3,1] are both height-balanced BSTs.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> is sorted in a <strong>strictly increasing</strong> order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Tree",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "convert-sorted-list-to-binary-search-tree",
    "title": "Convert Sorted List to Binary Search Tree",
    "description": "<p>Given the <code>head</code> of a singly linked list where elements are sorted in <strong>ascending order</strong>, convert <em>it to a </em><span data-keyword=\"height-balanced\"><strong><em>height-balanced</em></strong></span> <em>binary search tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/17/linked.jpg\" style=\"width: 500px; height: 388px;\" />\n<pre>\n<strong>Input:</strong> head = [-10,-3,0,5,9]\n<strong>Output:</strong> [0,-3,9,-10,null,5]\n<strong>Explanation:</strong> One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in <code>head</code> is in the range <code>[0, 2 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "Linked List",
      "Divide and Conquer",
      "Tree",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "description": "<p>Given a binary tree, determine if it is <span data-keyword=\"height-balanced\"><strong>height-balanced</strong></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg\" style=\"width: 342px; height: 221px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg\" style=\"width: 452px; height: 301px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,2,3,3,null,null,4,4]\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-depth-of-binary-tree",
    "title": "Minimum Depth of Binary Tree",
    "description": "<p>Given a binary tree, find its minimum depth.</p>\n\n<p>The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.</p>\n\n<p><strong>Note:</strong>&nbsp;A leaf is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg\" style=\"width: 432px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [2,null,3,null,4,null,5,null,6]\n<strong>Output:</strong> 5\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>5</sup>]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 52,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "path-sum",
    "title": "Path Sum",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a <strong>root-to-leaf</strong> path such that adding up all the values along the path equals <code>targetSum</code>.</p>\n\n<p>A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg\" style=\"width: 500px; height: 356px;\" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The root-to-leaf path with the target sum is shown.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are two root-to-leaf paths in the tree:\n(1 --&gt; 2): The sum is 3.\n(1 --&gt; 3): The sum is 4.\nThere is no root-to-leaf path with sum = 5.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [], targetSum = 0\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Since the tree is empty, there are no root-to-leaf paths.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "path-sum-ii",
    "title": "Path Sum II",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <em>all <strong>root-to-leaf</strong> paths where the sum of the node values in the path equals </em><code>targetSum</code><em>. Each path should be returned as a list of the node <strong>values</strong>, not node references</em>.</p>\n\n<p>A <strong>root-to-leaf</strong> path is a path starting from the root and ending at any leaf node. A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg\" style=\"width: 500px; height: 356px;\" />\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>Output:</strong> [[5,4,11,2],[5,8,4,5]]\n<strong>Explanation:</strong> There are two paths whose sum equals targetSum:\n5 + 4 + 11 + 2 = 22\n5 + 8 + 4 + 5 = 22\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg\" style=\"width: 212px; height: 181px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3], targetSum = 5\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,2], targetSum = 0\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 44,
    "companyTags": [
      "Backtracking",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "flatten-binary-tree-to-linked-list",
    "title": "Flatten Binary Tree to Linked List",
    "description": "<p>Given the <code>root</code> of a binary tree, flatten the tree into a &quot;linked list&quot;:</p>\n\n<ul>\n\t<li>The &quot;linked list&quot; should use the same <code>TreeNode</code> class where the <code>right</code> child pointer points to the next node in the list and the <code>left</code> child pointer is always <code>null</code>.</li>\n\t<li>The &quot;linked list&quot; should be in the same order as a <a href=\"https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR\" target=\"_blank\"><strong>pre-order</strong><strong> traversal</strong></a> of the binary tree.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg\" style=\"width: 500px; height: 226px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,5,3,4,null,6]\n<strong>Output:</strong> [1,null,2,null,3,null,4,null,5,null,6]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Can you flatten the tree in-place (with <code>O(1)</code> extra space)?",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Linked List",
      "Stack",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "If you notice carefully in the flattened tree, each node's right child points to the next node of a pre-order traversal."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "distinct-subsequences",
    "title": "Distinct Subsequences",
    "description": "<p>Given two strings s and t, return <i>the number of distinct</i> <b><i>subsequences</i></b><i> of </i>s<i> which equals </i>t.</p>\n\n<p>The test cases are generated so that the answer fits on a 32-bit signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;rabbbit&quot;, t = &quot;rabbit&quot;\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nAs shown below, there are 3 ways you can generate &quot;rabbit&quot; from s.\n<code><strong><u>rabb</u></strong>b<strong><u>it</u></strong></code>\n<code><strong><u>ra</u></strong>b<strong><u>bbit</u></strong></code>\n<code><strong><u>rab</u></strong>b<strong><u>bit</u></strong></code>\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;babgbag&quot;, t = &quot;bag&quot;\n<strong>Output:</strong> 5\n<strong>Explanation:</strong>\nAs shown below, there are 5 ways you can generate &quot;bag&quot; from s.\n<code><strong><u>ba</u></strong>b<u><strong>g</strong></u>bag</code>\n<code><strong><u>ba</u></strong>bgba<strong><u>g</u></strong></code>\n<code><u><strong>b</strong></u>abgb<strong><u>ag</u></strong></code>\n<code>ba<u><strong>b</strong></u>gb<u><strong>ag</strong></u></code>\n<code>babg<strong><u>bag</u></strong></code></pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, t.length &lt;= 1000</code></li>\n\t<li><code>s</code> and <code>t</code> consist of English letters.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 62,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "populating-next-right-pointers-in-each-node",
    "title": "Populating Next Right Pointers in Each Node",
    "description": "<p>You are given a <strong>perfect binary tree</strong> where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:</p>\n\n<pre>\nstruct Node {\n  int val;\n  Node *left;\n  Node *right;\n  Node *next;\n}\n</pre>\n\n<p>Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to <code>NULL</code>.</p>\n\n<p>Initially, all next pointers are set to <code>NULL</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/02/14/116_sample.png\" style=\"width: 500px; height: 171px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3,4,5,6,7]\n<strong>Output:</strong> [1,#,2,3,#,4,5,6,7,#]\n<strong>Explanation: </strong>Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with &#39;#&#39; signifying the end of each level.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 2<sup>12</sup> - 1]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong></p>\n\n<ul>\n\t<li>You may only use constant extra space.</li>\n\t<li>The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Linked List",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "populating-next-right-pointers-in-each-node-ii",
    "title": "Populating Next Right Pointers in Each Node II",
    "description": "<p>Given a binary tree</p>\n\n<pre>\nstruct Node {\n  int val;\n  Node *left;\n  Node *right;\n  Node *next;\n}\n</pre>\n\n<p>Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to <code>NULL</code>.</p>\n\n<p>Initially, all next pointers are set to <code>NULL</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/02/15/117_sample.png\" style=\"width: 500px; height: 171px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3,4,5,null,7]\n<strong>Output:</strong> [1,#,2,3,#,4,5,7,#]\n<strong>Explanation: </strong>Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with &#39;#&#39; signifying the end of each level.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 6000]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong></p>\n\n<ul>\n\t<li>You may only use constant extra space.</li>\n\t<li>The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Linked List",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "pascals-triangle",
    "title": "Pascal's Triangle",
    "description": "<p>Given an integer <code>numRows</code>, return the first numRows of <strong>Pascal&#39;s triangle</strong>.</p>\n\n<p>In <strong>Pascal&#39;s triangle</strong>, each number is the sum of the two numbers directly above it as shown:</p>\n<img alt=\"\" src=\"https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif\" style=\"height:240px; width:260px\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> numRows = 5\n<strong>Output:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> numRows = 1\n<strong>Output:</strong> [[1]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numRows &lt;= 30</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "pascals-triangle-ii",
    "title": "Pascal's Triangle II",
    "description": "<p>Given an integer <code>rowIndex</code>, return the <code>rowIndex<sup>th</sup></code> (<strong>0-indexed</strong>) row of the <strong>Pascal&#39;s triangle</strong>.</p>\n\n<p>In <strong>Pascal&#39;s triangle</strong>, each number is the sum of the two numbers directly above it as shown:</p>\n<img alt=\"\" src=\"https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif\" style=\"height:240px; width:260px\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> rowIndex = 3\n<strong>Output:</strong> [1,3,3,1]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> rowIndex = 0\n<strong>Output:</strong> [1]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> rowIndex = 1\n<strong>Output:</strong> [1,1]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= rowIndex &lt;= 33</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you optimize your algorithm to use only <code>O(rowIndex)</code> extra space?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "triangle",
    "title": "Triangle",
    "description": "<p>Given a <code>triangle</code> array, return <em>the minimum path sum from top to bottom</em>.</p>\n\n<p>For each step, you may move to an adjacent number of the row below. More formally, if you are on index <code>i</code> on the current row, you may move to either index <code>i</code> or index <code>i + 1</code> on the next row.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\n<strong>Output:</strong> 11\n<strong>Explanation:</strong> The triangle looks like:\n   <u>2</u>\n  <u>3</u> 4\n 6 <u>5</u> 7\n4 <u>1</u> 8 3\nThe minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> triangle = [[-10]]\n<strong>Output:</strong> -10\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= triangle.length &lt;= 200</code></li>\n\t<li><code>triangle[0].length == 1</code></li>\n\t<li><code>triangle[i].length == triangle[i - 1].length + 1</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= triangle[i][j] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you&nbsp;do this using only <code>O(n)</code> extra space, where <code>n</code> is the total number of rows in the triangle?",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>\n\n<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transactions are done and the max profit = 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock-ii",
    "title": "Best Time to Buy and Sell Stock II",
    "description": "<p>You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>On each day, you may decide to buy and/or sell the stock. You can only hold <strong>at most one</strong> share of the stock at any time. However, you can sell and buy the stock multiple times on the <strong>same day</strong>, ensuring you never hold more than one share of the stock.</p>\n\n<p>Find and return <em>the <strong>maximum</strong> profit you can achieve</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.\nThen buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.\nTotal profit is 4 + 3 = 7.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,4,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\nTotal profit is 4.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 45,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock-iii",
    "title": "Best Time to Buy and Sell Stock III",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>Find the maximum profit you can achieve. You may complete <strong>at most two transactions</strong>.</p>\n\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [3,3,5,0,0,3,1,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.\nThen buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,4,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\nNote that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transaction is done, i.e. max profit = 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 30,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-maximum-path-sum",
    "title": "Binary Tree Maximum Path Sum",
    "description": "<p>A <strong>path</strong> in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence <strong>at most once</strong>. Note that the path does not need to pass through the root.</p>\n\n<p>The <strong>path sum</strong> of a path is the sum of the node&#39;s values in the path.</p>\n\n<p>Given the <code>root</code> of a binary tree, return <em>the maximum <strong>path sum</strong> of any <strong>non-empty</strong> path</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg\" style=\"width: 322px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The optimal path is 2 -&gt; 1 -&gt; 3 with a path sum of 2 + 1 + 3 = 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg\" />\n<pre>\n<strong>Input:</strong> root = [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42\n<strong>Explanation:</strong> The optimal path is 15 -&gt; 20 -&gt; 7 with a path sum of 15 + 20 + 7 = 42.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 3 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 59,
    "companyTags": [
      "Dynamic Programming",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-palindrome",
    "title": "Valid Palindrome",
    "description": "<p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.</p>\n\n<p>Given a string <code>s</code>, return <code>true</code><em> if it is a <strong>palindrome</strong>, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;A man, a plan, a canal: Panama&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> &quot;amanaplanacanalpanama&quot; is a palindrome.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;race a car&quot;\n<strong>Output:</strong> false\n<strong>Explanation:</strong> &quot;raceacar&quot; is not a palindrome.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot; &quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> s is an empty string &quot;&quot; after removing non-alphanumeric characters.\nSince an empty string reads the same forward and backward, it is a palindrome.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists only of printable ASCII characters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 52,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-ladder-ii",
    "title": "Word Ladder II",
    "description": "<p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p>\n\n<ul>\n\t<li>Every adjacent pair of words differs by a single letter.</li>\n\t<li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>\n\t<li><code>s<sub>k</sub> == endWord</code></li>\n</ul>\n\n<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>all the <strong>shortest transformation sequences</strong> from</em> <code>beginWord</code> <em>to</em> <code>endWord</code><em>, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words </em><code>[beginWord, s<sub>1</sub>, s<sub>2</sub>, ..., s<sub>k</sub>]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n<strong>Output:</strong> [[&quot;hit&quot;,&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;cog&quot;],[&quot;hit&quot;,&quot;hot&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]]\n<strong>Explanation:</strong>&nbsp;There are 2 shortest transformation sequences:\n&quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; &quot;cog&quot;\n&quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;lot&quot; -&gt; &quot;log&quot; -&gt; &quot;cog&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= beginWord.length &lt;= 5</code></li>\n\t<li><code>endWord.length == beginWord.length</code></li>\n\t<li><code>1 &lt;= wordList.length &lt;= 500</code></li>\n\t<li><code>wordList[i].length == beginWord.length</code></li>\n\t<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>\n\t<li><code>beginWord != endWord</code></li>\n\t<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>\n\t<li>The <strong>sum</strong> of all shortest transformation sequences does not exceed <code>10<sup>5</sup></code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 53,
    "companyTags": [
      "Hash Table",
      "String",
      "Backtracking",
      "Breadth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-ladder",
    "title": "Word Ladder",
    "description": "<p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p>\n\n<ul>\n\t<li>Every adjacent pair of words differs by a single letter.</li>\n\t<li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>\n\t<li><code>s<sub>k</sub> == endWord</code></li>\n</ul>\n\n<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>the <strong>number of words</strong> in the <strong>shortest transformation sequence</strong> from</em> <code>beginWord</code> <em>to</em> <code>endWord</code><em>, or </em><code>0</code><em> if no such sequence exists.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> One shortest transformation sequence is &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; cog&quot;, which is 5 words long.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= beginWord.length &lt;= 10</code></li>\n\t<li><code>endWord.length == beginWord.length</code></li>\n\t<li><code>1 &lt;= wordList.length &lt;= 5000</code></li>\n\t<li><code>wordList[i].length == beginWord.length</code></li>\n\t<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>\n\t<li><code>beginWord != endWord</code></li>\n\t<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 35,
    "companyTags": [
      "Hash Table",
      "String",
      "Breadth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "description": "<p>Given an unsorted array of integers <code>nums</code>, return <em>the length of the longest consecutive elements sequence.</em></p>\n\n<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [100,4,200,1,3,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest consecutive elements sequence is <code>[1, 2, 3, 4]</code>. Therefore its length is 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,3,7,2,5,8,4,6,0,1]\n<strong>Output:</strong> 9\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,2]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 46,
    "companyTags": [
      "Array",
      "Hash Table",
      "Union-Find"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sum-root-to-leaf-numbers",
    "title": "Sum Root to Leaf Numbers",
    "description": "<p>You are given the <code>root</code> of a binary tree containing digits from <code>0</code> to <code>9</code> only.</p>\n\n<p>Each root-to-leaf path in the tree represents a number.</p>\n\n<ul>\n\t<li>For example, the root-to-leaf path <code>1 -&gt; 2 -&gt; 3</code> represents the number <code>123</code>.</li>\n</ul>\n\n<p>Return <em>the total sum of all root-to-leaf numbers</em>. Test cases are generated so that the answer will fit in a <strong>32-bit</strong> integer.</p>\n\n<p>A <strong>leaf</strong> node is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg\" style=\"width: 212px; height: 182px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> 25\n<strong>Explanation:</strong>\nThe root-to-leaf path <code>1-&gt;2</code> represents the number <code>12</code>.\nThe root-to-leaf path <code>1-&gt;3</code> represents the number <code>13</code>.\nTherefore, sum = 12 + 13 = <code>25</code>.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg\" style=\"width: 292px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [4,9,0,5,1]\n<strong>Output:</strong> 1026\n<strong>Explanation:</strong>\nThe root-to-leaf path <code>4-&gt;9-&gt;5</code> represents the number 495.\nThe root-to-leaf path <code>4-&gt;9-&gt;1</code> represents the number 491.\nThe root-to-leaf path <code>4-&gt;0</code> represents the number 40.\nTherefore, sum = 495 + 491 + 40 = <code>1026</code>.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>The depth of the tree will not exceed <code>10</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "surrounded-regions",
    "title": "Surrounded Regions",
    "description": "<p>You are given an <code>m x n</code> matrix <code>board</code> containing <strong>letters</strong> <code>&#39;X&#39;</code> and <code>&#39;O&#39;</code>, <strong>capture regions</strong> that are <strong>surrounded</strong>:</p>\n\n<ul>\n\t<li><strong>Connect</strong>: A cell is connected to adjacent cells horizontally or vertically.</li>\n\t<li><strong>Region</strong>: To form a region <strong>connect every</strong> <code>&#39;O&#39;</code> cell.</li>\n\t<li><strong>Surround</strong>: A region is surrounded if none of the <code>&#39;O&#39;</code> cells in that region are on the edge of the board. Such regions are <strong>completely enclosed </strong>by <code>&#39;X&#39;</code> cells.</li>\n</ul>\n\n<p>To capture a <strong>surrounded region</strong>, replace all <code>&#39;O&#39;</code>s with <code>&#39;X&#39;</code>s <strong>in-place</strong> within the original board. You do not need to return anything.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">board = [[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]</span></p>\n\n<p><strong>Explanation:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg\" style=\"width: 367px; height: 158px;\" />\n<p>In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">board = [[&quot;X&quot;]]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[[&quot;X&quot;]]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>board[i][j]</code> is <code>&#39;X&#39;</code> or <code>&#39;O&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 35,
    "companyTags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union-Find",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "palindrome-partitioning",
    "title": "Palindrome Partitioning",
    "description": "<p>Given a string <code>s</code>, partition <code>s</code> such that every <span data-keyword=\"substring-nonempty\">substring</span> of the partition is a <span data-keyword=\"palindrome-string\"><strong>palindrome</strong></span>. Return <em>all possible palindrome partitioning of </em><code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"aab\"\n<strong>Output:</strong> [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"a\"\n<strong>Output:</strong> [[\"a\"]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 16</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "palindrome-partitioning-ii",
    "title": "Palindrome Partitioning II",
    "description": "<p>Given a string <code>s</code>, partition <code>s</code> such that every <span data-keyword=\"substring-nonempty\">substring</span> of the partition is a <span data-keyword=\"palindrome-string\">palindrome</span>.</p>\n\n<p>Return <em>the <strong>minimum</strong> cuts needed for a palindrome partitioning of</em> <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aab&quot;\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The palindrome partitioning [&quot;aa&quot;,&quot;b&quot;] could be produced using 1 cut.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a&quot;\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ab&quot;\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 2000</code></li>\n\t<li><code>s</code> consists of lowercase English letters only.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 34,
    "companyTags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "clone-graph",
    "title": "Clone Graph",
    "description": "<p>Given a reference of a node in a <strong><a href=\"https://en.wikipedia.org/wiki/Connectivity_(graph_theory)#Connected_graph\" target=\"_blank\">connected</a></strong> undirected graph.</p>\n\n<p>Return a <a href=\"https://en.wikipedia.org/wiki/Object_copying#Deep_copy\" target=\"_blank\"><strong>deep copy</strong></a> (clone) of the graph.</p>\n\n<p>Each node in the graph contains a value (<code>int</code>) and a list (<code>List[Node]</code>) of its neighbors.</p>\n\n<pre>\nclass Node {\n    public int val;\n    public List&lt;Node&gt; neighbors;\n}\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>Test case format:</strong></p>\n\n<p>For simplicity, each node&#39;s value is the same as the node&#39;s index (1-indexed). For example, the first node with <code>val == 1</code>, the second node with <code>val == 2</code>, and so on. The graph is represented in the test case using an adjacency list.</p>\n\n<p><b>An adjacency list</b> is a collection of unordered <b>lists</b> used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.</p>\n\n<p>The given node will always be the first node with <code>val = 1</code>. You must return the <strong>copy of the given node</strong> as a reference to the cloned graph.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/11/04/133_clone_graph_question.png\" style=\"width: 454px; height: 500px;\" />\n<pre>\n<strong>Input:</strong> adjList = [[2,4],[1,3],[2,4],[1,3]]\n<strong>Output:</strong> [[2,4],[1,3],[2,4],[1,3]]\n<strong>Explanation:</strong> There are 4 nodes in the graph.\n1st node (val = 1)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n2nd node (val = 2)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n3rd node (val = 3)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n4th node (val = 4)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/01/07/graph.png\" style=\"width: 163px; height: 148px;\" />\n<pre>\n<strong>Input:</strong> adjList = [[]]\n<strong>Output:</strong> [[]]\n<strong>Explanation:</strong> Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> adjList = []\n<strong>Output:</strong> []\n<strong>Explanation:</strong> This an empty graph, it does not have any nodes.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the graph is in the range <code>[0, 100]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>Node.val</code> is unique for each node.</li>\n\t<li>There are no repeated edges and no self-loops in the graph.</li>\n\t<li>The Graph is connected and all nodes can be visited starting from the given node.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Hash Table",
      "Depth-First Search",
      "Breadth-First Search",
      "Graph Theory"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "gas-station",
    "title": "Gas Station",
    "description": "<p>There are <code>n</code> gas stations along a circular route, where the amount of gas at the <code>i<sup>th</sup></code> station is <code>gas[i]</code>.</p>\n\n<p>You have a car with an unlimited gas tank and it costs <code>cost[i]</code> of gas to travel from the <code>i<sup>th</sup></code> station to its next <code>(i + 1)<sup>th</sup></code> station. You begin the journey with an empty tank at one of the gas stations.</p>\n\n<p>Given two integer arrays <code>gas</code> and <code>cost</code>, return <em>the starting gas station&#39;s index if you can travel around the circuit once in the clockwise direction, otherwise return</em> <code>-1</code>. If there exists a solution, it is <strong>guaranteed</strong> to be <strong>unique</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> gas = [1,2,3,4,5], cost = [3,4,5,1,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nStart at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4\nTravel to station 4. Your tank = 4 - 1 + 5 = 8\nTravel to station 0. Your tank = 8 - 2 + 1 = 7\nTravel to station 1. Your tank = 7 - 3 + 2 = 6\nTravel to station 2. Your tank = 6 - 4 + 3 = 5\nTravel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.\nTherefore, return 3 as the starting index.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> gas = [2,3,4], cost = [3,4,3]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong>\nYou can&#39;t start at station 0 or 1, as there is not enough gas to travel to the next station.\nLet&#39;s start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4\nTravel to station 0. Your tank = 4 - 3 + 2 = 3\nTravel to station 1. Your tank = 3 - 3 + 3 = 3\nYou cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.\nTherefore, you can&#39;t travel around the circuit once no matter where you start.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == gas.length == cost.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= gas[i], cost[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>The input is generated such that the answer is unique.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "candy",
    "title": "Candy",
    "description": "<p>There are <code>n</code> children standing in a line. Each child is assigned a rating value given in the integer array <code>ratings</code>.</p>\n\n<p>You are giving candies to these children subjected to the following requirements:</p>\n\n<ul>\n\t<li>Each child must have at least one candy.</li>\n\t<li>Children with a higher rating get more candies than their neighbors.</li>\n</ul>\n\n<p>Return <em>the minimum number of candies you need to have to distribute the candies to the children</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> ratings = [1,0,2]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> You can allocate to the first, second and third child with 2, 1, 2 candies respectively.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> ratings = [1,2,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> You can allocate to the first, second and third child with 1, 2, 1 candies respectively.\nThe third child gets 1 candy because it satisfies the above two conditions.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == ratings.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= ratings[i] &lt;= 2 * 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 68,
    "companyTags": [
      "Array",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "single-number",
    "title": "Single Number",
    "description": "<p>Given a <strong>non-empty</strong>&nbsp;array of integers <code>nums</code>, every element appears <em>twice</em> except for one. Find that single one.</p>\n\n<p>You must&nbsp;implement a solution with a linear runtime complexity and use&nbsp;only constant&nbsp;extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [2,2,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [4,1,2,1,2]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">4</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li>Each element in the array appears twice except for one element which appears only once.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Bit Manipulation"
    ],
    "hints": [
      "Think about the XOR (^) operator's property."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "single-number-ii",
    "title": "Single Number II",
    "description": "<p>Given an integer array <code>nums</code> where&nbsp;every element appears <strong>three times</strong> except for one, which appears <strong>exactly once</strong>. <em>Find the single element and return it</em>.</p>\n\n<p>You must&nbsp;implement a solution with a linear runtime complexity and use&nbsp;only constant&nbsp;extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [2,2,3,2]\n<strong>Output:</strong> 3\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1,0,1,0,1,99]\n<strong>Output:</strong> 99\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>Each element in <code>nums</code> appears exactly <strong>three times</strong> except for one element which appears <strong>once</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "Array",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "copy-list-with-random-pointer",
    "title": "Copy List with Random Pointer",
    "description": "<p>A linked list of length <code>n</code> is given such that each node contains an additional random pointer, which could point to any node in the list, or <code>null</code>.</p>\n\n<p>Construct a <a href=\"https://en.wikipedia.org/wiki/Object_copying#Deep_copy\" target=\"_blank\"><strong>deep copy</strong></a> of the list. The deep copy should consist of exactly <code>n</code> <strong>brand new</strong> nodes, where each new node has its value set to the value of its corresponding original node. Both the <code>next</code> and <code>random</code> pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. <strong>None of the pointers in the new list should point to nodes in the original list</strong>.</p>\n\n<p>For example, if there are two nodes <code>X</code> and <code>Y</code> in the original list, where <code>X.random --&gt; Y</code>, then for the corresponding two nodes <code>x</code> and <code>y</code> in the copied list, <code>x.random --&gt; y</code>.</p>\n\n<p>Return <em>the head of the copied linked list</em>.</p>\n\n<p>The linked list is represented in the input/output as a list of <code>n</code> nodes. Each node is represented as a pair of <code>[val, random_index]</code> where:</p>\n\n<ul>\n\t<li><code>val</code>: an integer representing <code>Node.val</code></li>\n\t<li><code>random_index</code>: the index of the node (range from <code>0</code> to <code>n-1</code>) that the <code>random</code> pointer points to, or <code>null</code> if it does not point to any node.</li>\n</ul>\n\n<p>Your code will <strong>only</strong> be given the <code>head</code> of the original linked list.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/12/18/e1.png\" style=\"width: 700px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\n<strong>Output:</strong> [[7,null],[13,0],[11,4],[10,2],[1,0]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/12/18/e2.png\" style=\"width: 700px; height: 114px;\" />\n<pre>\n<strong>Input:</strong> head = [[1,1],[2,1]]\n<strong>Output:</strong> [[1,1],[2,1]]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<p><strong><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/12/18/e3.png\" style=\"width: 700px; height: 122px;\" /></strong></p>\n\n<pre>\n<strong>Input:</strong> head = [[3,null],[3,0],[3,null]]\n<strong>Output:</strong> [[3,null],[3,0],[3,null]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li><code>Node.random</code> is <code>null</code> or is pointing to some node in the linked list.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Hash Table",
      "Linked List"
    ],
    "hints": [
      "Just iterate the linked list and create copies of the nodes on the go. Since a node can be referenced from multiple nodes due to the random pointers, ensure you are not making multiple copies of the same node.",
      "You may want to use extra space to keep old_node ---> new_node mapping to prevent creating multiple copies of the same node.",
      "We can avoid using extra space for old_node ---> new_node mapping by tweaking the original linked list. Simply interweave the nodes of the old and copied list. For example:\r\nOld List: A --> B --> C --> D\r\nInterWeaved List: A --> A' --> B --> B' --> C --> C' --> D --> D'",
      "The interweaving is done using next</b> pointers and we can make use of interweaved structure to get the correct reference nodes for random</b> pointers."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-break",
    "title": "Word Break",
    "description": "<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>\n\n<p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;leetcode&quot;, wordDict = [&quot;leet&quot;,&quot;code&quot;]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Return true because &quot;leetcode&quot; can be segmented as &quot;leet code&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;applepenapple&quot;, wordDict = [&quot;apple&quot;,&quot;pen&quot;]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Return true because &quot;applepenapple&quot; can be segmented as &quot;apple pen apple&quot;.\nNote that you are allowed to reuse a dictionary word.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;catsandog&quot;, wordDict = [&quot;cats&quot;,&quot;dog&quot;,&quot;sand&quot;,&quot;and&quot;,&quot;cat&quot;]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li>\n\t<li><code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.</li>\n\t<li>All the strings of <code>wordDict</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Array",
      "Hash Table",
      "String",
      "Dynamic Programming",
      "Trie",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-break-ii",
    "title": "Word Break II",
    "description": "<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, add spaces in <code>s</code> to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in <strong>any order</strong>.</p>\n\n<p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;catsanddog&quot;, wordDict = [&quot;cat&quot;,&quot;cats&quot;,&quot;and&quot;,&quot;sand&quot;,&quot;dog&quot;]\n<strong>Output:</strong> [&quot;cats and dog&quot;,&quot;cat sand dog&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;pineapplepenapple&quot;, wordDict = [&quot;apple&quot;,&quot;pen&quot;,&quot;applepen&quot;,&quot;pine&quot;,&quot;pineapple&quot;]\n<strong>Output:</strong> [&quot;pine apple pen apple&quot;,&quot;pineapple pen apple&quot;,&quot;pine applepen apple&quot;]\n<strong>Explanation:</strong> Note that you are allowed to reuse a dictionary word.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;catsandog&quot;, wordDict = [&quot;cats&quot;,&quot;dog&quot;,&quot;sand&quot;,&quot;and&quot;,&quot;cat&quot;]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 20</code></li>\n\t<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= wordDict[i].length &lt;= 10</code></li>\n\t<li><code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.</li>\n\t<li>All the strings of <code>wordDict</code> are <strong>unique</strong>.</li>\n\t<li>Input is generated in a way that the length of the answer doesn&#39;t exceed&nbsp;10<sup>5</sup>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 44,
    "companyTags": [
      "Array",
      "Hash Table",
      "String",
      "Dynamic Programming",
      "Backtracking",
      "Trie",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "linked-list-cycle",
    "title": "Linked List Cycle",
    "description": "<p>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p>\n\n<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the&nbsp;<code>next</code>&nbsp;pointer. Internally, <code>pos</code>&nbsp;is used to denote the index of the node that&nbsp;tail&#39;s&nbsp;<code>next</code>&nbsp;pointer is connected to.&nbsp;<strong>Note that&nbsp;<code>pos</code>&nbsp;is not passed as a parameter</strong>.</p>\n\n<p>Return&nbsp;<code>true</code><em> if there is a cycle in the linked list</em>. Otherwise, return <code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png\" style=\"width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;\" />\n<pre>\n<strong>Input:</strong> head = [3,2,0,-4], pos = 1\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png\" style=\"width: 141px; height: 74px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2], pos = 0\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png\" style=\"width: 45px; height: 45px;\" />\n<pre>\n<strong>Input:</strong> head = [1], pos = -1\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no cycle in the linked list.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 64,
    "companyTags": [
      "Hash Table",
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "linked-list-cycle-ii",
    "title": "Linked List Cycle II",
    "description": "<p>Given the <code>head</code> of a linked list, return <em>the node where the cycle begins. If there is no cycle, return </em><code>null</code>.</p>\n\n<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the <code>next</code> pointer. Internally, <code>pos</code> is used to denote the index of the node that tail&#39;s <code>next</code> pointer is connected to (<strong>0-indexed</strong>). It is <code>-1</code> if there is no cycle. <strong>Note that</strong> <code>pos</code> <strong>is not passed as a parameter</strong>.</p>\n\n<p><strong>Do not modify</strong> the linked list.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png\" style=\"height: 145px; width: 450px;\" />\n<pre>\n<strong>Input:</strong> head = [3,2,0,-4], pos = 1\n<strong>Output:</strong> tail connects to node index 1\n<strong>Explanation:</strong> There is a cycle in the linked list, where tail connects to the second node.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png\" style=\"height: 105px; width: 201px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2], pos = 0\n<strong>Output:</strong> tail connects to node index 0\n<strong>Explanation:</strong> There is a cycle in the linked list, where tail connects to the first node.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png\" style=\"height: 65px; width: 65px;\" />\n<pre>\n<strong>Input:</strong> head = [1], pos = -1\n<strong>Output:</strong> no cycle\n<strong>Explanation:</strong> There is no cycle in the linked list.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 60,
    "companyTags": [
      "Hash Table",
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reorder-list",
    "title": "Reorder List",
    "description": "<p>You are given the head of a singly linked-list. The list can be represented as:</p>\n\n<pre>\nL<sub>0</sub> &rarr; L<sub>1</sub> &rarr; &hellip; &rarr; L<sub>n - 1</sub> &rarr; L<sub>n</sub>\n</pre>\n\n<p><em>Reorder the list to be on the following form:</em></p>\n\n<pre>\nL<sub>0</sub> &rarr; L<sub>n</sub> &rarr; L<sub>1</sub> &rarr; L<sub>n - 1</sub> &rarr; L<sub>2</sub> &rarr; L<sub>n - 2</sub> &rarr; &hellip;\n</pre>\n\n<p>You may not modify the values in the list&#39;s nodes. Only nodes themselves may be changed.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/04/reorder1linked-list.jpg\" style=\"width: 422px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4]\n<strong>Output:</strong> [1,4,2,3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/09/reorder2-linked-list.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [1,5,2,4,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[1, 5 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Linked List",
      "Two Pointers",
      "Stack",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-preorder-traversal",
    "title": "Binary Tree Preorder Traversal",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the preorder traversal of its nodes&#39; values</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,null,2,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2,3]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png\" style=\"width: 200px; height: 264px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,4,5,null,8,null,null,6,7,9]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2,4,5,6,7,3,8,9]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/tree_2.png\" style=\"width: 350px; height: 286px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Recursive solution is trivial, could you do it iteratively?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 49,
    "companyTags": [
      "Stack",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-postorder-traversal",
    "title": "Binary Tree Postorder Traversal",
    "description": "<p>Given the <code>root</code> of a&nbsp;binary tree, return <em>the postorder traversal of its nodes&#39; values</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,null,2,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[3,2,1]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png\" style=\"width: 200px; height: 264px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,4,5,null,8,null,null,6,7,9]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[4,6,7,5,2,9,8,3,1]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/08/29/tree_2.png\" style=\"width: 350px; height: 286px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Recursive solution is trivial, could you do it iteratively?",
    "difficulty": "Easy",
    "acceptanceRate": 33,
    "companyTags": [
      "Stack",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "description": "<p>Design a data structure that follows the constraints of a <strong><a href=\"https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU\" target=\"_blank\">Least Recently Used (LRU) cache</a></strong>.</p>\n\n<p>Implement the <code>LRUCache</code> class:</p>\n\n<ul>\n\t<li><code>LRUCache(int capacity)</code> Initialize the LRU cache with <strong>positive</strong> size <code>capacity</code>.</li>\n\t<li><code>int get(int key)</code> Return the value of the <code>key</code> if the key exists, otherwise return <code>-1</code>.</li>\n\t<li><code>void put(int key, int value)</code> Update the value of the <code>key</code> if the <code>key</code> exists. Otherwise, add the <code>key-value</code> pair to the cache. If the number of keys exceeds the <code>capacity</code> from this operation, <strong>evict</strong> the least recently used key.</li>\n</ul>\n\n<p>The functions <code>get</code> and <code>put</code> must each run in <code>O(1)</code> average time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;LRUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\n<strong>Output</strong>\n[null, null, null, 1, null, -1, null, -1, 3, 4]\n\n<strong>Explanation</strong>\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= capacity &lt;= 3000</code></li>\n\t<li><code>0 &lt;= key &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>\n\t<li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "Hash Table",
      "Linked List",
      "Design",
      "Doubly-Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "insertion-sort-list",
    "title": "Insertion Sort List",
    "description": "<p>Given the <code>head</code> of a singly linked list, sort the list using <strong>insertion sort</strong>, and return <em>the sorted list&#39;s head</em>.</p>\n\n<p>The steps of the <strong>insertion sort</strong> algorithm:</p>\n\n<ol>\n\t<li>Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.</li>\n\t<li>At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.</li>\n\t<li>It repeats until no input elements remain.</li>\n</ol>\n\n<p>The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.</p>\n<img alt=\"\" src=\"https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif\" style=\"height:180px; width:300px\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/04/sort1linked-list.jpg\" style=\"width: 422px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [4,2,1,3]\n<strong>Output:</strong> [1,2,3,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/04/sort2linked-list.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [-1,5,3,4,0]\n<strong>Output:</strong> [-1,0,3,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[1, 5000]</code>.</li>\n\t<li><code>-5000 &lt;= Node.val &lt;= 5000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "Linked List",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sort-list",
    "title": "Sort List",
    "description": "<p>Given the <code>head</code> of a linked list, return <em>the list after sorting it in <strong>ascending order</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg\" style=\"width: 450px; height: 194px;\" />\n<pre>\n<strong>Input:</strong> head = [4,2,1,3]\n<strong>Output:</strong> [1,2,3,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg\" style=\"width: 550px; height: 184px;\" />\n<pre>\n<strong>Input:</strong> head = [-1,5,3,4,0]\n<strong>Output:</strong> [-1,0,3,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 5 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Can you sort the linked list in <code>O(n logn)</code> time and <code>O(1)</code> memory (i.e. constant space)?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 44,
    "companyTags": [
      "Linked List",
      "Two Pointers",
      "Divide and Conquer",
      "Sorting",
      "Merge Sort"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "max-points-on-a-line",
    "title": "Max Points on a Line",
    "description": "<p>Given an array of <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents a point on the <strong>X-Y</strong> plane, return <em>the maximum number of points that lie on the same straight line</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,1],[2,2],[3,3]]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= points.length &lt;= 300</code></li>\n\t<li><code>points[i].length == 2</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n\t<li>All the <code>points</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math",
      "Geometry"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "description": "<p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in a <a href=\"http://en.wikipedia.org/wiki/Reverse_Polish_notation\" target=\"_blank\">Reverse Polish Notation</a>.</p>\n\n<p>Evaluate the expression. Return <em>an integer that represents the value of the expression</em>.</p>\n\n<p><strong>Note</strong> that:</p>\n\n<ul>\n\t<li>The valid operators are <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;*&#39;</code>, and <code>&#39;/&#39;</code>.</li>\n\t<li>Each operand may be an integer or another expression.</li>\n\t<li>The division between two integers always <strong>truncates toward zero</strong>.</li>\n\t<li>There will not be any division by zero.</li>\n\t<li>The input represents a valid arithmetic expression in a reverse polish notation.</li>\n\t<li>The answer and all the intermediate calculations can be represented in a <strong>32-bit</strong> integer.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;2&quot;,&quot;1&quot;,&quot;+&quot;,&quot;3&quot;,&quot;*&quot;]\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> ((2 + 1) * 3) = 9\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;4&quot;,&quot;13&quot;,&quot;5&quot;,&quot;/&quot;,&quot;+&quot;]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> (4 + (13 / 5)) = 6\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> tokens = [&quot;10&quot;,&quot;6&quot;,&quot;9&quot;,&quot;3&quot;,&quot;+&quot;,&quot;-11&quot;,&quot;*&quot;,&quot;/&quot;,&quot;*&quot;,&quot;17&quot;,&quot;+&quot;,&quot;5&quot;,&quot;+&quot;]\n<strong>Output:</strong> 22\n<strong>Explanation:</strong> ((10 * (6 / ((9 + 3) * -11))) + 17) + 5\n= ((10 * (6 / (12 * -11))) + 17) + 5\n= ((10 * (6 / -132)) + 17) + 5\n= ((10 * 0) + 17) + 5\n= (0 + 17) + 5\n= 17 + 5\n= 22\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= tokens.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>tokens[i]</code> is either an operator: <code>&quot;+&quot;</code>, <code>&quot;-&quot;</code>, <code>&quot;*&quot;</code>, or <code>&quot;/&quot;</code>, or an integer in the range <code>[-200, 200]</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 43,
    "companyTags": [
      "Array",
      "Math",
      "Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-words-in-a-string",
    "title": "Reverse Words in a String",
    "description": "<p>Given an input string <code>s</code>, reverse the order of the <strong>words</strong>.</p>\n\n<p>A <strong>word</strong> is defined as a sequence of non-space characters. The <strong>words</strong> in <code>s</code> will be separated by at least one space.</p>\n\n<p>Return <em>a string of the words in reverse order concatenated by a single space.</em></p>\n\n<p><b>Note</b> that <code>s</code> may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;the sky is blue&quot;\n<strong>Output:</strong> &quot;blue is sky the&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;  hello world  &quot;\n<strong>Output:</strong> &quot;world hello&quot;\n<strong>Explanation:</strong> Your reversed string should not contain leading or trailing spaces.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a good   example&quot;\n<strong>Output:</strong> &quot;example good a&quot;\n<strong>Explanation:</strong> You need to reduce multiple spaces between two words to a single space in the reversed string.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> contains English letters (upper-case and lower-case), digits, and spaces <code>&#39; &#39;</code>.</li>\n\t<li>There is <strong>at least one</strong> word in <code>s</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><b data-stringify-type=\"bold\">Follow-up:&nbsp;</b>If the string data type is mutable in your language, can&nbsp;you solve it&nbsp;<b data-stringify-type=\"bold\">in-place</b>&nbsp;with&nbsp;<code data-stringify-type=\"code\">O(1)</code>&nbsp;extra space?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximum-product-subarray",
    "title": "Maximum Product Subarray",
    "description": "<p>Given an integer array <code>nums</code>, find a <span data-keyword=\"subarray-nonempty\">subarray</span> that has the largest product, and return <em>the product</em>.</p>\n\n<p>The test cases are generated so that the answer will fit in a <strong>32-bit</strong> integer.</p>\n\n<p><strong>Note</strong> that the product of an array with a single element is the value of that element.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,3,-2,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> [2,3] has the largest product 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-2,0,-1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The result cannot be 2, because [-2,-1] is not a subarray.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>The product of any subarray of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "description": "<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times. For example, the array <code>nums = [0,1,2,4,5,6,7]</code> might become:</p>\n\n<ul>\n\t<li><code>[4,5,6,7,0,1,2]</code> if it was rotated <code>4</code> times.</li>\n\t<li><code>[0,1,2,4,5,6,7]</code> if it was rotated <code>7</code> times.</li>\n</ul>\n\n<p>Notice that <strong>rotating</strong> an array <code>[a[0], a[1], a[2], ..., a[n-1]]</code> 1 time results in the array <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>\n\n<p>Given the sorted rotated array <code>nums</code> of <strong>unique</strong> elements, return <em>the minimum element of this array</em>.</p>\n\n<p>You must write an algorithm that runs in&nbsp;<code>O(log n) time</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,4,5,1,2]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The original array was [1,2,3,4,5] rotated 3 times.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,5,6,7,0,1,2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [11,13,15,17]\n<strong>Output:</strong> 11\n<strong>Explanation:</strong> The original array was [11,13,15,17] and it was rotated 4 times. \n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5000</code></li>\n\t<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>\n\t<li>All the integers of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "Array was originally in ascending order. Now that the array is rotated, there would be a point in the array where there is a small deflection from the increasing sequence. eg. The array would be something like [4, 5, 6, 7, 0, 1, 2].",
      "You can divide the search space into two and see which direction to go.\r\nCan you think of an algorithm which has O(logN) search complexity?",
      "<ol>\r\n<li>All the elements to the left of inflection point > first element of the array.</li>\r\n<li>All the elements to the right of inflection point < first element of the array.</li>\r\n<ol>"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-minimum-in-rotated-sorted-array-ii",
    "title": "Find Minimum in Rotated Sorted Array II",
    "description": "<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times. For example, the array <code>nums = [0,1,4,4,5,6,7]</code> might become:</p>\n\n<ul>\n\t<li><code>[4,5,6,7,0,1,4]</code> if it was rotated <code>4</code> times.</li>\n\t<li><code>[0,1,4,4,5,6,7]</code> if it was rotated <code>7</code> times.</li>\n</ul>\n\n<p>Notice that <strong>rotating</strong> an array <code>[a[0], a[1], a[2], ..., a[n-1]]</code> 1 time results in the array <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>\n\n<p>Given the sorted rotated array <code>nums</code> that may contain <strong>duplicates</strong>, return <em>the minimum element of this array</em>.</p>\n\n<p>You must decrease the overall operation steps as much as possible.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,3,5]\n<strong>Output:</strong> 1\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [2,2,2,0,1]\n<strong>Output:</strong> 0\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5000</code></li>\n\t<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>\n\t<li><code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> This problem is similar to&nbsp;<a href=\"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/\" target=\"_blank\">Find Minimum in Rotated Sorted Array</a>, but&nbsp;<code>nums</code> may contain <strong>duplicates</strong>. Would this affect the runtime complexity? How and why?</p>\n\n<p>&nbsp;</p>\n",
    "difficulty": "Hard",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "min-stack",
    "title": "Min Stack",
    "description": "<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p>\n\n<p>Implement the <code>MinStack</code> class:</p>\n\n<ul>\n\t<li><code>MinStack()</code> initializes the stack object.</li>\n\t<li><code>void push(int val)</code> pushes the element <code>val</code> onto the stack.</li>\n\t<li><code>void pop()</code> removes the element on the top of the stack.</li>\n\t<li><code>int top()</code> gets the top element of the stack.</li>\n\t<li><code>int getMin()</code> retrieves the minimum element in the stack.</li>\n</ul>\n\n<p>You must implement a solution with <code>O(1)</code> time complexity for each function.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MinStack&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;getMin&quot;,&quot;pop&quot;,&quot;top&quot;,&quot;getMin&quot;]\n[[],[-2],[0],[-3],[],[],[],[]]\n\n<strong>Output</strong>\n[null,null,null,null,-3,null,0,-2]\n\n<strong>Explanation</strong>\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>Methods <code>pop</code>, <code>top</code> and <code>getMin</code> operations will always be called on <strong>non-empty</strong> stacks.</li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "Stack",
      "Design"
    ],
    "hints": [
      "Consider each node in the stack having a minimum value. (Credits to @aakarshmadhavan)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "intersection-of-two-linked-lists",
    "title": "Intersection of Two Linked Lists",
    "description": "<p>Given the heads of two singly linked-lists <code>headA</code> and <code>headB</code>, return <em>the node at which the two lists intersect</em>. If the two linked lists have no intersection at all, return <code>null</code>.</p>\n\n<p>For example, the following two linked lists begin to intersect at node <code>c1</code>:</p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_statement.png\" style=\"width: 500px; height: 162px;\" />\n<p>The test cases are generated such that there are no cycles anywhere in the entire linked structure.</p>\n\n<p><strong>Note</strong> that the linked lists must <strong>retain their original structure</strong> after the function returns.</p>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The inputs to the <strong>judge</strong> are given as follows (your program is <strong>not</strong> given these inputs):</p>\n\n<ul>\n\t<li><code>intersectVal</code> - The value of the node where the intersection occurs. This is <code>0</code> if there is no intersected node.</li>\n\t<li><code>listA</code> - The first linked list.</li>\n\t<li><code>listB</code> - The second linked list.</li>\n\t<li><code>skipA</code> - The number of nodes to skip ahead in <code>listA</code> (starting from the head) to get to the intersected node.</li>\n\t<li><code>skipB</code> - The number of nodes to skip ahead in <code>listB</code> (starting from the head) to get to the intersected node.</li>\n</ul>\n\n<p>The judge will then create the linked structure based on these inputs and pass the two heads, <code>headA</code> and <code>headB</code> to your program. If you correctly return the intersected node, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_example_1_1.png\" style=\"width: 500px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3\n<strong>Output:</strong> Intersected at &#39;8&#39;\n<strong>Explanation:</strong> The intersected node&#39;s value is 8 (note that this must not be 0 if the two lists intersect).\nFrom the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.\n- Note that the intersected node&#39;s value is not 1 because the nodes with value 1 in A and B (2<sup>nd</sup> node in A and 3<sup>rd</sup> node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3<sup>rd</sup> node in A and 4<sup>th</sup> node in B) point to the same location in memory.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_example_2.png\" style=\"width: 500px; height: 194px;\" />\n<pre>\n<strong>Input:</strong> intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1\n<strong>Output:</strong> Intersected at &#39;2&#39;\n<strong>Explanation:</strong> The intersected node&#39;s value is 2 (note that this must not be 0 if the two lists intersect).\nFrom the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/05/160_example_3.png\" style=\"width: 300px; height: 189px;\" />\n<pre>\n<strong>Input:</strong> intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2\n<strong>Output:</strong> No intersection\n<strong>Explanation:</strong> From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.\nExplanation: The two lists do not intersect, so return null.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes of <code>listA</code> is in the <code>m</code>.</li>\n\t<li>The number of nodes of <code>listB</code> is in the <code>n</code>.</li>\n\t<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= skipA &lt;= m</code></li>\n\t<li><code>0 &lt;= skipB &lt;= n</code></li>\n\t<li><code>intersectVal</code> is <code>0</code> if <code>listA</code> and <code>listB</code> do not intersect.</li>\n\t<li><code>intersectVal == listA[skipA] == listB[skipB]</code> if <code>listA</code> and <code>listB</code> intersect.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you write a solution that runs in <code>O(m + n)</code> time and use only <code>O(1)</code> memory?",
    "difficulty": "Easy",
    "acceptanceRate": 34,
    "companyTags": [
      "Hash Table",
      "Linked List",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-peak-element",
    "title": "Find Peak Element",
    "description": "<p>A peak element is an element that is strictly greater than its neighbors.</p>\n\n<p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any of the peaks</strong>.</p>\n\n<p>You may imagine that <code>nums[-1] = nums[n] = -&infin;</code>. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.</p>\n\n<p>You must write an algorithm that runs in <code>O(log n)</code> time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> 3 is a peak element and your function should return the index number 2.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,1,3,5,6,4]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>nums[i] != nums[i + 1]</code> for all valid <code>i</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "majority-element",
    "title": "Majority Element",
    "description": "<p>Given an array <code>nums</code> of size <code>n</code>, return <em>the majority element</em>.</p>\n\n<p>The majority element is the element that appears more than <code>&lfloor;n / 2&rfloor;</code> times. You may assume that the majority element always exists in the array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,3]\n<strong>Output:</strong> 3\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [2,2,1,1,1,2,2]\n<strong>Output:</strong> 2\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>The input is generated such that a majority element will exist in the array.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:</strong> Could you solve the problem in linear time and in <code>O(1)</code> space?",
    "difficulty": "Easy",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Hash Table",
      "Divide and Conquer",
      "Sorting",
      "Counting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "two-sum-ii-input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "description": "<p>Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong><em>sorted in non-decreasing order</em></strong>, find two numbers such that they add up to a specific <code>target</code> number. Let these two numbers be <code>numbers[index<sub>1</sub>]</code> and <code>numbers[index<sub>2</sub>]</code> where <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code>.</p>\n\n<p>Return<em> the indices of the two numbers&nbsp;</em><code>index<sub>1</sub></code><em> and </em><code>index<sub>2</sub></code><em>, <strong>each incremented by one,</strong> as an integer array </em><code>[index<sub>1</sub>, index<sub>2</sub>]</code><em> of length 2.</em></p>\n\n<p>The tests are generated such that there is <strong>exactly one solution</strong>. You <strong>may not</strong> use the same element twice.</p>\n\n<p>Your solution must use only constant extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>2</u>,<u>7</u>,11,15], target = 9\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of 2 and 7 is 9. Therefore, index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>2</u>,3,<u>4</u>], target = 6\n<strong>Output:</strong> [1,3]\n<strong>Explanation:</strong> The sum of 2 and 4 is 6. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 3. We return [1, 3].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> numbers = [<u>-1</u>,<u>0</u>], target = -1\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of -1 and 0 is -1. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= numbers.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= numbers[i] &lt;= 1000</code></li>\n\t<li><code>numbers</code> is sorted in <strong>non-decreasing order</strong>.</li>\n\t<li><code>-1000 &lt;= target &lt;= 1000</code></li>\n\t<li>The tests are generated such that there is <strong>exactly one solution</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "excel-sheet-column-title",
    "title": "Excel Sheet Column Title",
    "description": "<p>Given an integer <code>columnNumber</code>, return <em>its corresponding column title as it appears in an Excel sheet</em>.</p>\n\n<p>For example:</p>\n\n<pre>\nA -&gt; 1\nB -&gt; 2\nC -&gt; 3\n...\nZ -&gt; 26\nAA -&gt; 27\nAB -&gt; 28 \n...\n</pre>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnNumber = 1\n<strong>Output:</strong> &quot;A&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnNumber = 28\n<strong>Output:</strong> &quot;AB&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnNumber = 701\n<strong>Output:</strong> &quot;ZY&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= columnNumber &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 49,
    "companyTags": [
      "Math",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "excel-sheet-column-number",
    "title": "Excel Sheet Column Number",
    "description": "<p>Given a string <code>columnTitle</code> that represents the column title as appears in an Excel sheet, return <em>its corresponding column number</em>.</p>\n\n<p>For example:</p>\n\n<pre>\nA -&gt; 1\nB -&gt; 2\nC -&gt; 3\n...\nZ -&gt; 26\nAA -&gt; 27\nAB -&gt; 28 \n...\n</pre>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnTitle = &quot;A&quot;\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnTitle = &quot;AB&quot;\n<strong>Output:</strong> 28\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> columnTitle = &quot;ZY&quot;\n<strong>Output:</strong> 701\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= columnTitle.length &lt;= 7</code></li>\n\t<li><code>columnTitle</code> consists only of uppercase English letters.</li>\n\t<li><code>columnTitle</code> is in the range <code>[&quot;A&quot;, &quot;FXSHRXW&quot;]</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "Math",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "factorial-trailing-zeroes",
    "title": "Factorial Trailing Zeroes",
    "description": "<p>Given an integer <code>n</code>, return <em>the number of trailing zeroes in </em><code>n!</code>.</p>\n\n<p>Note that <code>n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> 3! = 6, no trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 5! = 120, one trailing zero.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you write a solution that works in logarithmic time complexity?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 67,
    "companyTags": [
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-search-tree-iterator",
    "title": "Binary Search Tree Iterator",
    "description": "<p>Implement the <code>BSTIterator</code> class that represents an iterator over the <strong><a href=\"https://en.wikipedia.org/wiki/Tree_traversal#In-order_(LNR)\" target=\"_blank\">in-order traversal</a></strong> of a binary search tree (BST):</p>\n\n<ul>\n\t<li><code>BSTIterator(TreeNode root)</code> Initializes an object of the <code>BSTIterator</code> class. The <code>root</code> of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.</li>\n\t<li><code>boolean hasNext()</code> Returns <code>true</code> if there exists a number in the traversal to the right of the pointer, otherwise returns <code>false</code>.</li>\n\t<li><code>int next()</code> Moves the pointer to the right, then returns the number at the pointer.</li>\n</ul>\n\n<p>Notice that by initializing the pointer to a non-existent smallest number, the first call to <code>next()</code> will return the smallest element in the BST.</p>\n\n<p>You may assume that <code>next()</code> calls will always be valid. That is, there will be at least a next number in the in-order traversal when <code>next()</code> is called.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/25/bst-tree.png\" style=\"width: 189px; height: 178px;\" />\n<pre>\n<strong>Input</strong>\n[&quot;BSTIterator&quot;, &quot;next&quot;, &quot;next&quot;, &quot;hasNext&quot;, &quot;next&quot;, &quot;hasNext&quot;, &quot;next&quot;, &quot;hasNext&quot;, &quot;next&quot;, &quot;hasNext&quot;]\n[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]\n<strong>Output</strong>\n[null, 3, 7, true, 9, true, 15, true, 20, false]\n\n<strong>Explanation</strong>\nBSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);\nbSTIterator.next();    // return 3\nbSTIterator.next();    // return 7\nbSTIterator.hasNext(); // return True\nbSTIterator.next();    // return 9\nbSTIterator.hasNext(); // return True\nbSTIterator.next();    // return 15\nbSTIterator.hasNext(); // return True\nbSTIterator.next();    // return 20\nbSTIterator.hasNext(); // return False\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>5</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>6</sup></code></li>\n\t<li>At most <code>10<sup>5</sup></code> calls will be made to <code>hasNext</code>, and <code>next</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>Could you implement <code>next()</code> and <code>hasNext()</code> to run in average <code>O(1)</code> time and use&nbsp;<code>O(h)</code> memory, where <code>h</code> is the height of the tree?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 30,
    "companyTags": [
      "Stack",
      "Tree",
      "Design",
      "Binary Search Tree",
      "Binary Tree",
      "Iterator"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "dungeon-game",
    "title": "Dungeon Game",
    "description": "<p>The demons had captured the princess and imprisoned her in <strong>the bottom-right corner</strong> of a <code>dungeon</code>. The <code>dungeon</code> consists of <code>m x n</code> rooms laid out in a 2D grid. Our valiant knight was initially positioned in <strong>the top-left room</strong> and must fight his way through <code>dungeon</code> to rescue the princess.</p>\n\n<p>The knight has an initial health point represented by a positive integer. If at any point his health point drops to <code>0</code> or below, he dies immediately.</p>\n\n<p>Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight&#39;s health (represented by positive integers).</p>\n\n<p>To reach the princess as quickly as possible, the knight decides to move only <strong>rightward</strong> or <strong>downward</strong> in each step.</p>\n\n<p>Return <em>the knight&#39;s minimum initial health so that he can rescue the princess</em>.</p>\n\n<p><strong>Note</strong> that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/13/dungeon-grid-1.jpg\" style=\"width: 253px; height: 253px;\" />\n<pre>\n<strong>Input:</strong> dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-&gt; RIGHT -&gt; DOWN -&gt; DOWN.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> dungeon = [[0]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == dungeon.length</code></li>\n\t<li><code>n == dungeon[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-1000 &lt;= dungeon[i][j] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 46,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "largest-number",
    "title": "Largest Number",
    "description": "<p>Given a list of non-negative integers <code>nums</code>, arrange them such that they form the largest number and return it.</p>\n\n<p>Since the result may be very large, so you need to return a string instead of an integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [10,2]\n<strong>Output:</strong> &quot;210&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,30,34,5,9]\n<strong>Output:</strong> &quot;9534330&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "String",
      "Greedy",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "repeated-dna-sequences",
    "title": "Repeated DNA Sequences",
    "description": "<p>The <strong>DNA sequence</strong> is composed of a series of nucleotides abbreviated as <code>&#39;A&#39;</code>, <code>&#39;C&#39;</code>, <code>&#39;G&#39;</code>, and <code>&#39;T&#39;</code>.</p>\n\n<ul>\n\t<li>For example, <code>&quot;ACGAATTCCG&quot;</code> is a <strong>DNA sequence</strong>.</li>\n</ul>\n\n<p>When studying <strong>DNA</strong>, it is useful to identify repeated sequences within the DNA.</p>\n\n<p>Given a string <code>s</code> that represents a <strong>DNA sequence</strong>, return all the <strong><code>10</code>-letter-long</strong> sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\n<strong>Output:</strong> [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"AAAAAAAAAAAAA\"\n<strong>Output:</strong> [\"AAAAAAAAAA\"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is either <code>&#39;A&#39;</code>, <code>&#39;C&#39;</code>, <code>&#39;G&#39;</code>, or <code>&#39;T&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Hash Table",
      "String",
      "Bit Manipulation",
      "Sliding Window",
      "Rolling Hash",
      "Hash Function"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "rotate-array",
    "title": "Rotate Array",
    "description": "<p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is non-negative.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,5,6,7], k = 3\n<strong>Output:</strong> [5,6,7,1,2,3,4]\n<strong>Explanation:</strong>\nrotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,-100,3,99], k = 2\n<strong>Output:</strong> [3,99,-1,-100]\n<strong>Explanation:</strong> \nrotate 1 steps to the right: [99,-1,-100,3]\nrotate 2 steps to the right: [3,99,-1,-100]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>Try to come up with as many solutions as you can. There are at least <strong>three</strong> different ways to solve this problem.</li>\n\t<li>Could you do it in-place with <code>O(1)</code> extra space?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 67,
    "companyTags": [
      "Array",
      "Math",
      "Two Pointers"
    ],
    "hints": [
      "The easiest solution would use additional memory and that is perfectly fine.",
      "The actual trick comes when trying to solve this problem without using any additional memory. This means you need to use the original array somehow to move the elements around. Now, we can place each element in its original location and shift all the elements around it to adjust as that would be too costly and most likely will time out on larger input arrays.",
      "One line of thought is based on reversing the array (or parts of it) to obtain the desired result. Think about how reversal might potentially help us out by using an example.",
      "The other line of thought is a tad bit complicated but essentially it builds on the idea of placing each element in its original position while keeping track of the element originally in that position. Basically, at every step, we place an element in its rightful position and keep track of the element already there or the one being overwritten in an additional variable. We can't do this in one linear pass and the idea here is based on <b>cyclic-dependencies</b> between elements."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-bits",
    "title": "Reverse Bits",
    "description": "<p>Reverse bits of a given 32 bits signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 43261596</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">964176192</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th>Integer</th>\n\t\t\t<th>Binary</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>43261596</td>\n\t\t\t<td>00000010100101000001111010011100</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>964176192</td>\n\t\t\t<td>00111001011110000010100101000000</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 2147483644</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1073741822</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th>Integer</th>\n\t\t\t<th>Binary</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>2147483644</td>\n\t\t\t<td>01111111111111111111111111111100</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>1073741822</td>\n\t\t\t<td>00111111111111111111111111111110</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 2<sup>31</sup> - 2</code></li>\n\t<li><code>n</code> is even.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> If this function is called many times, how would you optimize it?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 49,
    "companyTags": [
      "Divide and Conquer",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "description": "<p>Given a positive integer <code>n</code>, write a function that returns the number of <span data-keyword=\"set-bit\">set bits</span> in its binary representation (also known as the <a href=\"http://en.wikipedia.org/wiki/Hamming_weight\" target=\"_blank\">Hamming weight</a>).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 11</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">3</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>1011</strong> has a total of three set bits.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 128</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">1</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>10000000</strong> has a total of one set bit.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">n = 2147483645</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">30</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The input binary string <strong>1111111111111111111111111111101</strong> has a total of thirty set bits.</p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> If this function is called many times, how would you optimize it?",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Divide and Conquer",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "house-robber",
    "title": "House Robber",
    "description": "<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and <b>it will automatically contact the police if two adjacent houses were broken into on the same night</b>.</p>\n\n<p>Given an integer array <code>nums</code> representing the amount of money of each house, return <em>the maximum amount of money you can rob tonight <b>without alerting the police</b></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,9,3,1]\n<strong>Output:</strong> 12\n<strong>Explanation:</strong> Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 400</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "description": "<p>Given the <code>root</code> of a binary tree, imagine yourself standing on the <strong>right side</strong> of it, return <em>the values of the nodes you can see ordered from top to bottom</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,null,5,null,4]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3,4]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png\" style=\"width: 400px; height: 207px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,2,3,4,null,null,null,5]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3,4,5]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png\" style=\"width: 400px; height: 214px;\" /></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = [1,null,3]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,3]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 4:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">root = []</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 39,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "description": "<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>&#39;1&#39;</code>s (land) and <code>&#39;0&#39;</code>s (water), return <em>the number of islands</em>.</p>\n\n<p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [\n  [&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;0&quot;],\n  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;],\n  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],\n  [&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;]\n]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> grid = [\n  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],\n  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],\n  [&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;],\n  [&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;1&quot;]\n]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 300</code></li>\n\t<li><code>grid[i][j]</code> is <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union-Find",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "bitwise-and-of-numbers-range",
    "title": "Bitwise AND of Numbers Range",
    "description": "<p>Given two integers <code>left</code> and <code>right</code> that represent the range <code>[left, right]</code>, return <em>the bitwise AND of all numbers in this range, inclusive</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> left = 5, right = 7\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> left = 0, right = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> left = 1, right = 2147483647\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= left &lt;= right &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "happy-number",
    "title": "Happy Number",
    "description": "<p>Write an algorithm to determine if a number <code>n</code> is happy.</p>\n\n<p>A <strong>happy number</strong> is a number defined by the following process:</p>\n\n<ul>\n\t<li>Starting with any positive integer, replace the number by the sum of the squares of its digits.</li>\n\t<li>Repeat the process until the number equals 1 (where it will stay), or it <strong>loops endlessly in a cycle</strong> which does not include 1.</li>\n\t<li>Those numbers for which this process <strong>ends in 1</strong> are happy.</li>\n</ul>\n\n<p>Return <code>true</code> <em>if</em> <code>n</code> <em>is a happy number, and</em> <code>false</code> <em>if not</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 19\n<strong>Output:</strong> true\n<strong>Explanation:</strong>\n1<sup>2</sup> + 9<sup>2</sup> = 82\n8<sup>2</sup> + 2<sup>2</sup> = 68\n6<sup>2</sup> + 8<sup>2</sup> = 100\n1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 48,
    "companyTags": [
      "Hash Table",
      "Math",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-linked-list-elements",
    "title": "Remove Linked List Elements",
    "description": "<p>Given the <code>head</code> of a linked list and an integer <code>val</code>, remove all the nodes of the linked list that has <code>Node.val == val</code>, and return <em>the new head</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg\" style=\"width: 500px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,6,3,4,5,6], val = 6\n<strong>Output:</strong> [1,2,3,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [], val = 1\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = [7,7,7,7], val = 7\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 50</code></li>\n\t<li><code>0 &lt;= val &lt;= 50</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 65,
    "companyTags": [
      "Linked List",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "count-primes",
    "title": "Count Primes",
    "description": "<p>Given an integer <code>n</code>, return <em>the number of prime numbers that are strictly less than</em> <code>n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 10\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> There are 4 prime numbers less than 10, they are 2, 3, 5, 7.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 5 * 10<sup>6</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Math",
      "Enumeration",
      "Number Theory"
    ],
    "hints": [
      "Checking all the integers in the range [1, n - 1] is not efficient. Think about a better approach.",
      "Since most of the numbers are not primes, we need a fast approach to exclude the non-prime integers.",
      "Use Sieve of Eratosthenes."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "isomorphic-strings",
    "title": "Isomorphic Strings",
    "description": "<p>Given two strings <code>s</code> and <code>t</code>, <em>determine if they are isomorphic</em>.</p>\n\n<p>Two strings <code>s</code> and <code>t</code> are isomorphic if the characters in <code>s</code> can be replaced to get <code>t</code>.</p>\n\n<p>All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;egg&quot;, t = &quot;add&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The strings <code>s</code> and <code>t</code> can be made identical by:</p>\n\n<ul>\n\t<li>Mapping <code>&#39;e&#39;</code> to <code>&#39;a&#39;</code>.</li>\n\t<li>Mapping <code>&#39;g&#39;</code> to <code>&#39;d&#39;</code>.</li>\n</ul>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;f11&quot;, t = &quot;b23&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The strings <code>s</code> and <code>t</code> can not be made identical as <code>&#39;1&#39;</code> needs to be mapped to both <code>&#39;2&#39;</code> and <code>&#39;3&#39;</code>.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;paper&quot;, t = &quot;title&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>t.length == s.length</code></li>\n\t<li><code>s</code> and <code>t</code> consist of any valid ascii character.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 35,
    "companyTags": [
      "Hash Table",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-linked-list",
    "title": "Reverse Linked List",
    "description": "<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg\" style=\"width: 542px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [5,4,3,2,1]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg\" style=\"width: 182px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2]\n<strong>Output:</strong> [2,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>\n\t<li><code>-5000 &lt;= Node.val &lt;= 5000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> A linked list can be reversed either iteratively or recursively. Could you implement both?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Linked List",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>\n\n<ul>\n\t<li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>\n</ul>\n\n<p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph Theory",
      "Topological Sort"
    ],
    "hints": [
      "This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.",
      "<a href=\"https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/03Graphs.pdf\" target=\"_blank\">Topological Sort via DFS</a> - A great tutorial explaining the basic concepts of Topological Sort.",
      "Topological sort could also be done via <a href=\"http://en.wikipedia.org/wiki/Topological_sorting#Algorithms\" target=\"_blank\">BFS</a>."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "description": "<p>A <a href=\"https://en.wikipedia.org/wiki/Trie\" target=\"_blank\"><strong>trie</strong></a> (pronounced as &quot;try&quot;) or <strong>prefix tree</strong> is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.</p>\n\n<p>Implement the Trie class:</p>\n\n<ul>\n\t<li><code>Trie()</code> Initializes the trie object.</li>\n\t<li><code>void insert(String word)</code> Inserts the string <code>word</code> into the trie.</li>\n\t<li><code>boolean search(String word)</code> Returns <code>true</code> if the string <code>word</code> is in the trie (i.e., was inserted before), and <code>false</code> otherwise.</li>\n\t<li><code>boolean startsWith(String prefix)</code> Returns <code>true</code> if there is a previously inserted string <code>word</code> that has the prefix <code>prefix</code>, and <code>false</code> otherwise.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Trie&quot;, &quot;insert&quot;, &quot;search&quot;, &quot;search&quot;, &quot;startsWith&quot;, &quot;insert&quot;, &quot;search&quot;]\n[[], [&quot;apple&quot;], [&quot;apple&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;]]\n<strong>Output</strong>\n[null, null, true, false, true, null, true]\n\n<strong>Explanation</strong>\nTrie trie = new Trie();\ntrie.insert(&quot;apple&quot;);\ntrie.search(&quot;apple&quot;);   // return True\ntrie.search(&quot;app&quot;);     // return False\ntrie.startsWith(&quot;app&quot;); // return True\ntrie.insert(&quot;app&quot;);\ntrie.search(&quot;app&quot;);     // return True\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li>\n\t<li><code>word</code> and <code>prefix</code> consist only of lowercase English letters.</li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>insert</code>, <code>search</code>, and <code>startsWith</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Hash Table",
      "String",
      "Design",
      "Trie"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "description": "<p>Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return <em>the <strong>minimal length</strong> of a </em><span data-keyword=\"subarray-nonempty\"><em>subarray</em></span><em> whose sum is greater than or equal to</em> <code>target</code>. If there is no such subarray, return <code>0</code> instead.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 7, nums = [2,3,1,2,4,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The subarray [4,3] has the minimal length under the problem constraint.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 4, nums = [1,4,4]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> target = 11, nums = [1,1,1,1,1,1,1,1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution of which the time complexity is <code>O(n log(n))</code>.",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "Array",
      "Binary Search",
      "Sliding Window",
      "Prefix Sum"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "course-schedule-ii",
    "title": "Course Schedule II",
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>\n\n<ul>\n\t<li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>\n</ul>\n\n<p>Return <em>the ordering of courses you should take to finish all courses</em>. If there are many valid answers, return <strong>any</strong> of them. If it is impossible to finish all courses, return <strong>an empty array</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\n<strong>Output:</strong> [0,2,1,3]\n<strong>Explanation:</strong> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.\nSo one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> numCourses = 1, prerequisites = []\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= numCourses * (numCourses - 1)</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>\n\t<li>All the pairs <code>[a<sub>i</sub>, b<sub>i</sub>]</code> are <strong>distinct</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 44,
    "companyTags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph Theory",
      "Topological Sort"
    ],
    "hints": [
      "This problem is equivalent to finding the topological order in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.",
      "<a href=\"https://www.youtube.com/watch?v=ozso3xxkVGU\" target=\"_blank\">Topological Sort via DFS</a> - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.",
      "Topological sort could also be done via <a href=\"http://en.wikipedia.org/wiki/Topological_sorting#Algorithms\" target=\"_blank\">BFS</a>."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "design-add-and-search-words-data-structure",
    "title": "Design Add and Search Words Data Structure",
    "description": "<p>Design a data structure that supports adding new words and finding if a string matches any previously added string.</p>\n\n<p>Implement the <code>WordDictionary</code> class:</p>\n\n<ul>\n\t<li><code>WordDictionary()</code>&nbsp;Initializes the object.</li>\n\t<li><code>void addWord(word)</code> Adds <code>word</code> to the data structure, it can be matched later.</li>\n\t<li><code>bool search(word)</code>&nbsp;Returns <code>true</code> if there is any string in the data structure that matches <code>word</code>&nbsp;or <code>false</code> otherwise. <code>word</code> may contain dots <code>&#39;.&#39;</code> where dots can be matched with any letter.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;WordDictionary&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;]\n[[],[&quot;bad&quot;],[&quot;dad&quot;],[&quot;mad&quot;],[&quot;pad&quot;],[&quot;bad&quot;],[&quot;.ad&quot;],[&quot;b..&quot;]]\n<strong>Output</strong>\n[null,null,null,null,false,true,true,true]\n\n<strong>Explanation</strong>\nWordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord(&quot;bad&quot;);\nwordDictionary.addWord(&quot;dad&quot;);\nwordDictionary.addWord(&quot;mad&quot;);\nwordDictionary.search(&quot;pad&quot;); // return False\nwordDictionary.search(&quot;bad&quot;); // return True\nwordDictionary.search(&quot;.ad&quot;); // return True\nwordDictionary.search(&quot;b..&quot;); // return True\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length &lt;= 25</code></li>\n\t<li><code>word</code> in <code>addWord</code> consists of lowercase English letters.</li>\n\t<li><code>word</code> in <code>search</code> consist of <code>&#39;.&#39;</code> or lowercase English letters.</li>\n\t<li>There will be at most <code>2</code> dots in <code>word</code> for <code>search</code> queries.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>addWord</code> and <code>search</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "String",
      "Depth-First Search",
      "Design",
      "Trie"
    ],
    "hints": [
      "You should be familiar with how a Trie works. If not, please work on this problem: <a href=\"https://leetcode.com/problems/implement-trie-prefix-tree/\">Implement Trie (Prefix Tree)</a> first."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-search-ii",
    "title": "Word Search II",
    "description": "<p>Given an <code>m x n</code> <code>board</code>&nbsp;of characters and a list of strings <code>words</code>, return <em>all words on the board</em>.</p>\n\n<p>Each word must be constructed from letters of sequentially adjacent cells, where <strong>adjacent cells</strong> are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/07/search1.jpg\" style=\"width: 322px; height: 322px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;o&quot;,&quot;a&quot;,&quot;a&quot;,&quot;n&quot;],[&quot;e&quot;,&quot;t&quot;,&quot;a&quot;,&quot;e&quot;],[&quot;i&quot;,&quot;h&quot;,&quot;k&quot;,&quot;r&quot;],[&quot;i&quot;,&quot;f&quot;,&quot;l&quot;,&quot;v&quot;]], words = [&quot;oath&quot;,&quot;pea&quot;,&quot;eat&quot;,&quot;rain&quot;]\n<strong>Output:</strong> [&quot;eat&quot;,&quot;oath&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/07/search2.jpg\" style=\"width: 162px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;a&quot;,&quot;b&quot;],[&quot;c&quot;,&quot;d&quot;]], words = [&quot;abcb&quot;]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 12</code></li>\n\t<li><code>board[i][j]</code> is a lowercase English letter.</li>\n\t<li><code>1 &lt;= words.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 10</code></li>\n\t<li><code>words[i]</code> consists of lowercase English letters.</li>\n\t<li>All the strings of <code>words</code> are unique.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 38,
    "companyTags": [
      "Array",
      "String",
      "Backtracking",
      "Trie",
      "Matrix"
    ],
    "hints": [
      "You would need to optimize your backtracking to pass the larger test. Could you stop backtracking earlier?",
      "If the current candidate does not exist in all words&#39; prefix, you could stop backtracking immediately. What kind of data structure could answer such query efficiently? Does a hash table work? Why or why not? How about a Trie? If you would like to learn how to implement a basic trie, please work on this problem: <a href=\"https://leetcode.com/problems/implement-trie-prefix-tree/\">Implement Trie (Prefix Tree)</a> first."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "house-robber-ii",
    "title": "House Robber II",
    "description": "<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are <strong>arranged in a circle.</strong> That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and&nbsp;<b>it will automatically contact the police if two adjacent houses were broken into on the same night</b>.</p>\n\n<p>Given an integer array <code>nums</code> representing the amount of money of each house, return <em>the maximum amount of money you can rob tonight <strong>without alerting the police</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,3,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [
      "Since House[1] and House[n] are adjacent, they cannot be robbed together. Therefore, the problem becomes to rob either House[1]-House[n-1] or House[2]-House[n], depending on which choice offers more money. Now the problem has degenerated to the <a href =\"https://leetcode.com/problems/house-robber/description/\">House Robber</a>, which is already been solved."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "shortest-palindrome",
    "title": "Shortest Palindrome",
    "description": "<p>You are given a string <code>s</code>. You can convert <code>s</code> to a <span data-keyword=\"palindrome-string\">palindrome</span> by adding characters in front of it.</p>\n\n<p>Return <em>the shortest palindrome you can find by performing this transformation</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"aacecaaa\"\n<strong>Output:</strong> \"aaacecaaa\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"abcd\"\n<strong>Output:</strong> \"dcbabcd\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of lowercase English letters only.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 53,
    "companyTags": [
      "String",
      "Rolling Hash",
      "String Matching",
      "Hash Function"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>largest element in the array</em>.</p>\n\n<p>Note that it is the <code>k<sup>th</sup></code> largest element in the sorted order, not the <code>k<sup>th</sup></code> distinct element.</p>\n\n<p>Can you solve it without sorting?</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,1,5,6,4], k = 2\n<strong>Output:</strong> 5\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [3,2,3,1,2,4,5,5,6], k = 4\n<strong>Output:</strong> 4\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 62,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Sorting",
      "Heap (Priority Queue)",
      "Quickselect"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "combination-sum-iii",
    "title": "Combination Sum III",
    "description": "<p>Find all valid combinations of <code>k</code> numbers that sum up to <code>n</code> such that the following conditions are true:</p>\n\n<ul>\n\t<li>Only numbers <code>1</code> through <code>9</code> are used.</li>\n\t<li>Each number is used <strong>at most once</strong>.</li>\n</ul>\n\n<p>Return <em>a list of all possible valid combinations</em>. The list must not contain the same combination twice, and the combinations may be returned in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3, n = 7\n<strong>Output:</strong> [[1,2,4]]\n<strong>Explanation:</strong>\n1 + 2 + 4 = 7\nThere are no other valid combinations.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3, n = 9\n<strong>Output:</strong> [[1,2,6],[1,3,5],[2,3,4]]\n<strong>Explanation:</strong>\n1 + 2 + 6 = 9\n1 + 3 + 5 = 9\n2 + 3 + 4 = 9\nThere are no other valid combinations.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 4, n = 1\n<strong>Output:</strong> []\n<strong>Explanation:</strong> There are no valid combinations.\nUsing 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 &gt; 1, there are no valid combination.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= k &lt;= 9</code></li>\n\t<li><code>1 &lt;= n &lt;= 60</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "Array",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "contains-duplicate",
    "title": "Contains Duplicate",
    "description": "<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,2,3,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The element 1 occurs at the indices 0 and 3.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,2,3,4]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>All elements are distinct.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,1,1,3,3,4,3,2,4,2]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code> <em>if there are two <strong>distinct indices</strong> </em><code>i</code><em> and </em><code>j</code><em> in the array such that </em><code>nums[i] == nums[j]</code><em> and </em><code>abs(i - j) &lt;= k</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1], k = 3\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,1], k = 1\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1,2,3], k = 2\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 69,
    "companyTags": [
      "Array",
      "Hash Table",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "contains-duplicate-iii",
    "title": "Contains Duplicate III",
    "description": "<p>You are given an integer array <code>nums</code> and two integers <code>indexDiff</code> and <code>valueDiff</code>.</p>\n\n<p>Find a pair of indices <code>(i, j)</code> such that:</p>\n\n<ul>\n\t<li><code>i != j</code>,</li>\n\t<li><code>abs(i - j) &lt;= indexDiff</code>.</li>\n\t<li><code>abs(nums[i] - nums[j]) &lt;= valueDiff</code>, and</li>\n</ul>\n\n<p>Return <code>true</code><em> if such pair exists or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,1], indexDiff = 3, valueDiff = 0\n<strong>Output:</strong> true\n<strong>Explanation:</strong> We can choose (i, j) = (0, 3).\nWe satisfy the three conditions:\ni != j --&gt; 0 != 3\nabs(i - j) &lt;= indexDiff --&gt; abs(0 - 3) &lt;= 3\nabs(nums[i] - nums[j]) &lt;= valueDiff --&gt; abs(1 - 1) &lt;= 0\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3\n<strong>Output:</strong> false\n<strong>Explanation:</strong> After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>1 &lt;= indexDiff &lt;= nums.length</code></li>\n\t<li><code>0 &lt;= valueDiff &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Sliding Window",
      "Sorting",
      "Bucket Sort",
      "Ordered Set"
    ],
    "hints": [
      "Time complexity O(n logk)  - This will give an indication that sorting is involved for k elements.",
      "Use already existing state to evaluate next state  -  Like, a set of k sorted numbers are only needed to be tracked. When we are processing the next number in array, then we can utilize the existing sorted state and it is not necessary to sort next overlapping set of k numbers again."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximal-square",
    "title": "Maximal Square",
    "description": "<p>Given an <code>m x n</code> binary <code>matrix</code> filled with <code>0</code>&#39;s and <code>1</code>&#39;s, <em>find the largest square containing only</em> <code>1</code>&#39;s <em>and return its area</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg\" style=\"width: 400px; height: 319px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;]]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg\" style=\"width: 165px; height: 165px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[&quot;0&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;0&quot;]]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[&quot;0&quot;]]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 300</code></li>\n\t<li><code>matrix[i][j]</code> is <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "count-complete-tree-nodes",
    "title": "Count Complete Tree Nodes",
    "description": "<p>Given the <code>root</code> of a <strong>complete</strong> binary tree, return the number of the nodes in the tree.</p>\n\n<p>According to <strong><a href=\"http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees\" target=\"_blank\">Wikipedia</a></strong>, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between <code>1</code> and <code>2<sup>h</sup></code> nodes inclusive at the last level <code>h</code>.</p>\n\n<p>Design an algorithm that runs in less than&nbsp;<code data-stringify-type=\"code\">O(n)</code>&nbsp;time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/14/complete.jpg\" style=\"width: 372px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3,4,5,6]\n<strong>Output:</strong> 6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 5 * 10<sup>4</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li>The tree is guaranteed to be <strong>complete</strong>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 38,
    "companyTags": [
      "Binary Search",
      "Bit Manipulation",
      "Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "rectangle-area",
    "title": "Rectangle Area",
    "description": "<p>Given the coordinates of two <strong>rectilinear</strong> rectangles in a 2D plane, return <em>the total area covered by the two rectangles</em>.</p>\n\n<p>The first rectangle is defined by its <strong>bottom-left</strong> corner <code>(ax1, ay1)</code> and its <strong>top-right</strong> corner <code>(ax2, ay2)</code>.</p>\n\n<p>The second rectangle is defined by its <strong>bottom-left</strong> corner <code>(bx1, by1)</code> and its <strong>top-right</strong> corner <code>(bx2, by2)</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"Rectangle Area\" src=\"https://assets.leetcode.com/uploads/2021/05/08/rectangle-plane.png\" style=\"width: 700px; height: 365px;\" />\n<pre>\n<strong>Input:</strong> ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2\n<strong>Output:</strong> 45\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2\n<strong>Output:</strong> 16\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>4</sup> &lt;= ax1 &lt;= ax2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= ay1 &lt;= ay2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= bx1 &lt;= bx2 &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= by1 &lt;= by2 &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Math",
      "Geometry"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "basic-calculator",
    "title": "Basic Calculator",
    "description": "<p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it, and return <em>the result of the evaluation</em>.</p>\n\n<p><strong>Note:</strong> You are <strong>not</strong> allowed to use any built-in function which evaluates strings as mathematical expressions, such as <code>eval()</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;1 + 1&quot;\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot; 2-1 + 2 &quot;\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;(1+(4+5+2)-3)+(6+8)&quot;\n<strong>Output:</strong> 23\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of digits, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, and <code>&#39; &#39;</code>.</li>\n\t<li><code>s</code> represents a valid expression.</li>\n\t<li><code>&#39;+&#39;</code> is <strong>not</strong> used as a unary operation (i.e., <code>&quot;+1&quot;</code> and <code>&quot;+(2 + 3)&quot;</code> is invalid).</li>\n\t<li><code>&#39;-&#39;</code> could be used as a unary operation (i.e., <code>&quot;-1&quot;</code> and <code>&quot;-(2 + 3)&quot;</code> is valid).</li>\n\t<li>There will be no two consecutive operators in the input.</li>\n\t<li>Every number and running calculation will fit in a signed 32-bit integer.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 30,
    "companyTags": [
      "Math",
      "String",
      "Stack",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "description": "<p>Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (<code>push</code>, <code>top</code>, <code>pop</code>, and <code>empty</code>).</p>\n\n<p>Implement the <code>MyStack</code> class:</p>\n\n<ul>\n\t<li><code>void push(int x)</code> Pushes element x to the top of the stack.</li>\n\t<li><code>int pop()</code> Removes the element on the top of the stack and returns it.</li>\n\t<li><code>int top()</code> Returns the element on the top of the stack.</li>\n\t<li><code>boolean empty()</code> Returns <code>true</code> if the stack is empty, <code>false</code> otherwise.</li>\n</ul>\n\n<p><b>Notes:</b></p>\n\n<ul>\n\t<li>You must use <strong>only</strong> standard operations of a queue, which means that only <code>push to back</code>, <code>peek/pop from front</code>, <code>size</code> and <code>is empty</code> operations are valid.</li>\n\t<li>Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue&#39;s standard operations.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MyStack&quot;, &quot;push&quot;, &quot;push&quot;, &quot;top&quot;, &quot;pop&quot;, &quot;empty&quot;]\n[[], [1], [2], [], [], []]\n<strong>Output</strong>\n[null, null, null, 2, 2, false]\n\n<strong>Explanation</strong>\nMyStack myStack = new MyStack();\nmyStack.push(1);\nmyStack.push(2);\nmyStack.top(); // return 2\nmyStack.pop(); // return 2\nmyStack.empty(); // return False\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= x &lt;= 9</code></li>\n\t<li>At most <code>100</code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>empty</code>.</li>\n\t<li>All the calls to <code>pop</code> and <code>top</code> are valid.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you implement the stack using only one queue?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 36,
    "companyTags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "description": "<p>Given the <code>root</code> of a binary tree, invert the tree, and return <em>its root</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg\" style=\"width: 500px; height: 165px;\" />\n<pre>\n<strong>Input:</strong> root = [4,2,7,1,3,6,9]\n<strong>Output:</strong> [4,7,2,9,6,3,1]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg\" style=\"width: 500px; height: 120px;\" />\n<pre>\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> [2,3,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "basic-calculator-ii",
    "title": "Basic Calculator II",
    "description": "<p>Given a string <code>s</code> which represents an expression, <em>evaluate this expression and return its value</em>.&nbsp;</p>\n\n<p>The integer division should truncate toward zero.</p>\n\n<p>You may assume that the given expression is always valid. All intermediate results will be in the range of <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>.</p>\n\n<p><strong>Note:</strong> You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as <code>eval()</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"3+2*2\"\n<strong>Output:</strong> 7\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \" 3/2 \"\n<strong>Output:</strong> 1\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> s = \" 3+5 / 2 \"\n<strong>Output:</strong> 5\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of integers and operators <code>(&#39;+&#39;, &#39;-&#39;, &#39;*&#39;, &#39;/&#39;)</code> separated by some number of spaces.</li>\n\t<li><code>s</code> represents <strong>a valid expression</strong>.</li>\n\t<li>All the integers in the expression are non-negative integers in the range <code>[0, 2<sup>31</sup> - 1]</code>.</li>\n\t<li>The answer is <strong>guaranteed</strong> to fit in a <strong>32-bit integer</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Math",
      "String",
      "Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "summary-ranges",
    "title": "Summary Ranges",
    "description": "<p>You are given a <strong>sorted unique</strong> integer array <code>nums</code>.</p>\n\n<p>A <strong>range</strong> <code>[a,b]</code> is the set of all integers from <code>a</code> to <code>b</code> (inclusive).</p>\n\n<p>Return <em>the <strong>smallest sorted</strong> list of ranges that <strong>cover all the numbers in the array exactly</strong></em>. That is, each element of <code>nums</code> is covered by exactly one of the ranges, and there is no integer <code>x</code> such that <code>x</code> is in one of the ranges but not in <code>nums</code>.</p>\n\n<p>Each range <code>[a,b]</code> in the list should be output as:</p>\n\n<ul>\n\t<li><code>&quot;a-&gt;b&quot;</code> if <code>a != b</code></li>\n\t<li><code>&quot;a&quot;</code> if <code>a == b</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,2,4,5,7]\n<strong>Output:</strong> [&quot;0-&gt;2&quot;,&quot;4-&gt;5&quot;,&quot;7&quot;]\n<strong>Explanation:</strong> The ranges are:\n[0,2] --&gt; &quot;0-&gt;2&quot;\n[4,5] --&gt; &quot;4-&gt;5&quot;\n[7,7] --&gt; &quot;7&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,2,3,4,6,8,9]\n<strong>Output:</strong> [&quot;0&quot;,&quot;2-&gt;4&quot;,&quot;6&quot;,&quot;8-&gt;9&quot;]\n<strong>Explanation:</strong> The ranges are:\n[0,0] --&gt; &quot;0&quot;\n[2,4] --&gt; &quot;2-&gt;4&quot;\n[6,6] --&gt; &quot;6&quot;\n[8,9] --&gt; &quot;8-&gt;9&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 20</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>All the values of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>nums</code> is sorted in ascending order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 45,
    "companyTags": [
      "Array"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "majority-element-ii",
    "title": "Majority Element II",
    "description": "<p>Given an integer array of size <code>n</code>, find all elements that appear more than <code>&lfloor; n/3 &rfloor;</code> times.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,3]\n<strong>Output:</strong> [3]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1]\n<strong>Output:</strong> [1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2]\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you solve the problem in linear time and in <code>O(1)</code> space?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Hash Table",
      "Sorting",
      "Counting"
    ],
    "hints": [
      "Think about the possible number of elements that can appear more than ⌊ n/3 ⌋ times in the array.",
      "It can be at most two. Why?",
      "Consider using Boyer-Moore Voting Algorithm, which is efficient for finding elements that appear more than a certain threshold."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "description": "<p>Given the <code>root</code> of a binary search tree, and an integer <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>smallest value (<strong>1-indexed</strong>) of all the values of the nodes in the tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg\" style=\"width: 212px; height: 301px;\" />\n<pre>\n<strong>Input:</strong> root = [3,1,4,null,2], k = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg\" style=\"width: 382px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [5,3,6,2,4,null,null,1], k = 3\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is <code>n</code>.</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 68,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [
      "Try to utilize the property of a BST.",
      "Try in-order traversal. (Credits to @chan13)",
      "What if you could modify the BST node's structure?",
      "The optimal runtime complexity is O(height of BST)."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "power-of-two",
    "title": "Power of Two",
    "description": "<p>Given an integer <code>n</code>, return <em><code>true</code> if it is a power of two. Otherwise, return <code>false</code></em>.</p>\n\n<p>An integer <code>n</code> is a power of two, if there exists an integer <code>x</code> such that <code>n == 2<sup>x</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> true\n<strong>Explanation: </strong>2<sup>0</sup> = 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 16\n<strong>Output:</strong> true\n<strong>Explanation: </strong>2<sup>4</sup> = 16\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it without loops/recursion?",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Math",
      "Bit Manipulation",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "description": "<p>Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (<code>push</code>, <code>peek</code>, <code>pop</code>, and <code>empty</code>).</p>\n\n<p>Implement the <code>MyQueue</code> class:</p>\n\n<ul>\n\t<li><code>void push(int x)</code> Pushes element x to the back of the queue.</li>\n\t<li><code>int pop()</code> Removes the element from the front of the queue and returns it.</li>\n\t<li><code>int peek()</code> Returns the element at the front of the queue.</li>\n\t<li><code>boolean empty()</code> Returns <code>true</code> if the queue is empty, <code>false</code> otherwise.</li>\n</ul>\n\n<p><strong>Notes:</strong></p>\n\n<ul>\n\t<li>You must use <strong>only</strong> standard operations of a stack, which means only <code>push to top</code>, <code>peek/pop from top</code>, <code>size</code>, and <code>is empty</code> operations are valid.</li>\n\t<li>Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack&#39;s standard operations.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MyQueue&quot;, &quot;push&quot;, &quot;push&quot;, &quot;peek&quot;, &quot;pop&quot;, &quot;empty&quot;]\n[[], [1], [2], [], [], []]\n<strong>Output</strong>\n[null, null, null, 1, 1, false]\n\n<strong>Explanation</strong>\nMyQueue myQueue = new MyQueue();\nmyQueue.push(1); // queue is: [1]\nmyQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)\nmyQueue.peek(); // return 1\nmyQueue.pop(); // return 1, queue is [2]\nmyQueue.empty(); // return false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= x &lt;= 9</code></li>\n\t<li>At most <code>100</code>&nbsp;calls will be made to <code>push</code>, <code>pop</code>, <code>peek</code>, and <code>empty</code>.</li>\n\t<li>All the calls to <code>pop</code> and <code>peek</code> are valid.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you implement the queue such that each operation is <strong><a href=\"https://en.wikipedia.org/wiki/Amortized_analysis\" target=\"_blank\">amortized</a></strong> <code>O(1)</code> time complexity? In other words, performing <code>n</code> operations will take overall <code>O(n)</code> time even if one of those operations may take longer.</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 48,
    "companyTags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "number-of-digit-one",
    "title": "Number of Digit One",
    "description": "<p>Given an integer <code>n</code>, count <em>the total number of digit </em><code>1</code><em> appearing in all non-negative integers less than or equal to</em> <code>n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 13\n<strong>Output:</strong> 6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 67,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Recursion"
    ],
    "hints": [
      "Beware of overflow."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "palindrome-linked-list",
    "title": "Palindrome Linked List",
    "description": "<p>Given the <code>head</code> of a singly linked list, return <code>true</code><em> if it is a </em><span data-keyword=\"palindrome-sequence\"><em>palindrome</em></span><em> or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg\" style=\"width: 422px; height: 62px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,2,1]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg\" style=\"width: 182px; height: 62px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is in the range <code>[1, 10<sup>5</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you do it in <code>O(n)</code> time and <code>O(1)</code> space?",
    "difficulty": "Easy",
    "acceptanceRate": 32,
    "companyTags": [
      "Linked List",
      "Two Pointers",
      "Stack",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-search-tree",
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "description": "<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.</p>\n\n<p>According to the <a href=\"https://en.wikipedia.org/wiki/Lowest_common_ancestor\" target=\"_blank\">definition of LCA on Wikipedia</a>: &ldquo;The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants (where we allow <strong>a node to be a descendant of itself</strong>).&rdquo;</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The LCA of nodes 2 and 8 is 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [2,1], p = 2, q = 1\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[2, 10<sup>5</sup>]</code>.</li>\n\t<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>\n\t<li>All <code>Node.val</code> are <strong>unique</strong>.</li>\n\t<li><code>p != q</code></li>\n\t<li><code>p</code> and <code>q</code> will exist in the BST.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 69,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "description": "<p>Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.</p>\n\n<p>According to the <a href=\"https://en.wikipedia.org/wiki/Lowest_common_ancestor\" target=\"_blank\">definition of LCA on Wikipedia</a>: &ldquo;The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants (where we allow <b>a node to be a descendant of itself</b>).&rdquo;</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarytree.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The LCA of nodes 5 and 1 is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/12/14/binarytree.png\" style=\"width: 200px; height: 190px;\" />\n<pre>\n<strong>Input:</strong> root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,2], p = 1, q = 2\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[2, 10<sup>5</sup>]</code>.</li>\n\t<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>\n\t<li>All <code>Node.val</code> are <strong>unique</strong>.</li>\n\t<li><code>p != q</code></li>\n\t<li><code>p</code> and <code>q</code> will exist in the tree.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 59,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "delete-node-in-a-linked-list",
    "title": "Delete Node in a Linked List",
    "description": "<p>There is a singly-linked list <code>head</code> and we want to delete a node <code>node</code> in it.</p>\n\n<p>You are given the node to be deleted <code>node</code>. You will <strong>not be given access</strong> to the first node of <code>head</code>.</p>\n\n<p>All the values of the linked list are <strong>unique</strong>, and it is guaranteed that the given node <code>node</code> is not the last node in the linked list.</p>\n\n<p>Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:</p>\n\n<ul>\n\t<li>The value of the given node should not exist in the linked list.</li>\n\t<li>The number of nodes in the linked list should decrease by one.</li>\n\t<li>All the values before <code>node</code> should be in the same order.</li>\n\t<li>All the values after <code>node</code> should be in the same order.</li>\n</ul>\n\n<p><strong>Custom testing:</strong></p>\n\n<ul>\n\t<li>For the input, you should provide the entire linked list <code>head</code> and the node to be given <code>node</code>. <code>node</code> should not be the last node of the list and should be an actual node in the list.</li>\n\t<li>We will build the linked list and pass the node to your function.</li>\n\t<li>The output will be the entire list after calling your function.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/node1.jpg\" style=\"width: 400px; height: 286px;\" />\n<pre>\n<strong>Input:</strong> head = [4,5,1,9], node = 5\n<strong>Output:</strong> [4,1,9]\n<strong>Explanation: </strong>You are given the second node with value 5, the linked list should become 4 -&gt; 1 -&gt; 9 after calling your function.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/node2.jpg\" style=\"width: 400px; height: 315px;\" />\n<pre>\n<strong>Input:</strong> head = [4,5,1,9], node = 1\n<strong>Output:</strong> [4,5,9]\n<strong>Explanation: </strong>You are given the third node with value 1, the linked list should become 4 -&gt; 5 -&gt; 9 after calling your function.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of the nodes in the given list is in the range <code>[2, 1000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n\t<li>The value of each node in the list is <strong>unique</strong>.</li>\n\t<li>The <code>node</code> to be deleted is <strong>in the list</strong> and is <strong>not a tail</strong> node.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 40,
    "companyTags": [
      "Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "description": "<p>Given an integer array <code>nums</code>, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is equal to the product of all the elements of</em> <code>nums</code> <em>except</em> <code>nums[i]</code>.</p>\n\n<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>\n\n<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and without using the division operation.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> [24,12,8,6]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [-1,1,0,-3,3]\n<strong>Output:</strong> [0,0,9,0,0]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-30 &lt;= nums[i] &lt;= 30</code></li>\n\t<li>The input is generated such that <code>answer[i]</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong>&nbsp;Can you solve the problem in <code>O(1)</code>&nbsp;extra&nbsp;space complexity? (The output array <strong>does not</strong> count as extra space for space complexity analysis.)</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 69,
    "companyTags": [
      "Array",
      "Prefix Sum"
    ],
    "hints": [
      "Think how you can efficiently utilize prefix and suffix products to calculate the product of all elements except self for each index. Can you pre-compute the prefix and suffix products in linear time to avoid redundant calculations?",
      "Can you minimize additional space usage by reusing memory or modifying the input array to store intermediate results?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sliding-window-maximum",
    "title": "Sliding Window Maximum",
    "description": "<p>You are given an array of integers&nbsp;<code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>\n\n<p>Return <em>the max sliding window</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3\n<strong>Output:</strong> [3,3,5,5,6,7]\n<strong>Explanation:</strong> \nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       <strong>3</strong>\n 1 [3  -1  -3] 5  3  6  7       <strong>3</strong>\n 1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>\n 1  3  -1 [-3  5  3] 6  7       <strong>5</strong>\n 1  3  -1  -3 [5  3  6] 7       <strong>6</strong>\n 1  3  -1  -3  5 [3  6  7]      <strong>7</strong>\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1], k = 1\n<strong>Output:</strong> [1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= k &lt;= nums.length</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 43,
    "companyTags": [
      "Array",
      "Queue",
      "Sliding Window",
      "Heap (Priority Queue)",
      "Monotonic Queue"
    ],
    "hints": [
      "How about using a data structure such as deque (double-ended queue)?",
      "The queue size need not be the same as the window’s size.",
      "Remove redundant elements and the queue should store only elements that need to be considered."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "search-a-2d-matrix-ii",
    "title": "Search a 2D Matrix II",
    "description": "<p>Write an efficient algorithm that searches for a value <code>target</code> in an <code>m x n</code> integer matrix <code>matrix</code>. This matrix has the following properties:</p>\n\n<ul>\n\t<li>Integers in each row are sorted in ascending from left to right.</li>\n\t<li>Integers in each column are sorted in ascending from top to bottom.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/24/searchgrid2.jpg\" style=\"width: 300px; height: 300px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/24/searchgrid.jpg\" style=\"width: 300px; height: 300px;\" />\n<pre>\n<strong>Input:</strong> matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n, m &lt;= 300</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>\n\t<li>All the integers in each row are <strong>sorted</strong> in ascending order.</li>\n\t<li>All the integers in each column are <strong>sorted</strong> in ascending order.</li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 69,
    "companyTags": [
      "Array",
      "Binary Search",
      "Divide and Conquer",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "different-ways-to-add-parentheses",
    "title": "Different Ways to Add Parentheses",
    "description": "<p>Given a string <code>expression</code> of numbers and operators, return <em>all possible results from computing all the different possible ways to group numbers and operators</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed <code>10<sup>4</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;2-1-1&quot;\n<strong>Output:</strong> [0,2]\n<strong>Explanation:</strong>\n((2-1)-1) = 0 \n(2-(1-1)) = 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> expression = &quot;2*3-4*5&quot;\n<strong>Output:</strong> [-34,-14,-10,-10,10]\n<strong>Explanation:</strong>\n(2*(3-(4*5))) = -34 \n((2*3)-(4*5)) = -14 \n((2*(3-4))*5) = -10 \n(2*((3-4)*5)) = -10 \n(((2*3)-4)*5) = 10\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= expression.length &lt;= 20</code></li>\n\t<li><code>expression</code> consists of digits and the operator <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, and <code>&#39;*&#39;</code>.</li>\n\t<li>All the integer values in the input expression are in the range <code>[0, 99]</code>.</li>\n\t<li>The integer values in the input expression do not have a leading <code>&#39;-&#39;</code> or <code>&#39;+&#39;</code> denoting the sign.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Math",
      "String",
      "Dynamic Programming",
      "Recursion",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-anagram",
    "title": "Valid Anagram",
    "description": "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an <span data-keyword=\"anagram\">anagram</span> of <code>s</code>, and <code>false</code> otherwise.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;anagram&quot;, t = &quot;nagaram&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;rat&quot;, t = &quot;car&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, t.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> and <code>t</code> consist of lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if the inputs contain Unicode characters? How would you adapt your solution to such a case?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 42,
    "companyTags": [
      "Hash Table",
      "String",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-tree-paths",
    "title": "Binary Tree Paths",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>all root-to-leaf paths in <strong>any order</strong></em>.</p>\n\n<p>A <strong>leaf</strong> is a node with no children.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/12/paths-tree.jpg\" style=\"width: 207px; height: 293px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3,null,5]\n<strong>Output:</strong> [&quot;1-&gt;2-&gt;5&quot;,&quot;1-&gt;3&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [&quot;1&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 44,
    "companyTags": [
      "String",
      "Backtracking",
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "add-digits",
    "title": "Add Digits",
    "description": "<p>Given an integer <code>num</code>, repeatedly add all its digits until the result has only one digit, and return it.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 38\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The process is\n38 --&gt; 3 + 8 --&gt; 11\n11 --&gt; 1 + 1 --&gt; 2 \nSince 2 has only one digit, return it.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do it without any loop/recursion in <code>O(1)</code> runtime?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Math",
      "Simulation",
      "Number Theory"
    ],
    "hints": [
      "A naive implementation of the above process is trivial. Could you come up with other methods?",
      "What are all the possible results?",
      "How do they occur, periodically or randomly?",
      "You may find this <a href=\"https://en.wikipedia.org/wiki/Digital_root\" target=\"_blank\">Wikipedia article</a> useful."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "single-number-iii",
    "title": "Single Number III",
    "description": "<p>Given an integer array <code>nums</code>, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in <strong>any order</strong>.</p>\n\n<p>You must write an&nbsp;algorithm that runs in linear runtime complexity and uses&nbsp;only constant extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,1,3,2,5]\n<strong>Output:</strong> [3,5]\n<strong>Explanation: </strong> [5, 3] is also a valid answer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,0]\n<strong>Output:</strong> [-1,0]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> [1,0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>Each integer in <code>nums</code> will appear twice, only two integers will appear once.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "ugly-number",
    "title": "Ugly Number",
    "description": "<p>An <strong>ugly number</strong> is a <em>positive</em> integer which does not have a prime factor other than 2, 3, and 5.</p>\n\n<p>Given an integer <code>n</code>, return <code>true</code> <em>if</em> <code>n</code> <em>is an <strong>ugly number</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 6\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 6 = 2 &times; 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 1 has no prime factors.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 14\n<strong>Output:</strong> false\n<strong>Explanation:</strong> 14 is not ugly since it includes the prime factor 7.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 49,
    "companyTags": [
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "ugly-number-ii",
    "title": "Ugly Number II",
    "description": "<p>An <strong>ugly number</strong> is a positive integer whose prime factors are limited to <code>2</code>, <code>3</code>, and <code>5</code>.</p>\n\n<p>Given an integer <code>n</code>, return <em>the</em> <code>n<sup>th</sup></code> <em><strong>ugly number</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 10\n<strong>Output:</strong> 12\n<strong>Explanation:</strong> [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 1690</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "Hash Table",
      "Math",
      "Dynamic Programming",
      "Heap (Priority Queue)"
    ],
    "hints": [
      "The naive approach is to call <code>isUgly</code> for every number until you reach the n<sup>th</sup> one. Most numbers are <i>not</i> ugly. Try to focus your effort on generating only the ugly ones.",
      "An ugly number must be multiplied by either 2, 3, or 5 from a smaller ugly number.",
      "The key is how to maintain the order of the ugly numbers. Try a similar approach of merging from three sorted lists: L<sub>1</sub>, L<sub>2</sub>, and L<sub>3</sub>.",
      "Assume you have U<sub>k</sub>, the k<sup>th</sup> ugly number. Then U<sub>k+1</sub> must be Min(L<sub>1</sub> * 2, L<sub>2</sub> * 3, L<sub>3</sub> * 5)."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "missing-number",
    "title": "Missing Number",
    "description": "<p>Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return <em>the only number in the range that is missing from the array.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [3,0,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">2</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><code>n = 3</code> since there are 3 numbers, so all numbers are in the range <code>[0,3]</code>. 2 is the missing number in the range since it does not appear in <code>nums</code>.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [0,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">2</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><code>n = 2</code> since there are 2 numbers, so all numbers are in the range <code>[0,2]</code>. 2 is the missing number in the range since it does not appear in <code>nums</code>.</p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [9,6,4,2,3,5,7,0,1]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">8</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p><code>n = 9</code> since there are 9 numbers, so all numbers are in the range <code>[0,9]</code>. 8 is the missing number in the range since it does not appear in <code>nums</code>.</p>\n</div>\n\n<div class=\"simple-translate-system-theme\" id=\"simple-translate\">\n<div>\n<div class=\"simple-translate-button isShow\" style=\"background-image: url(&quot;moz-extension://8a9ffb6b-7e69-4e93-aae1-436a1448eff6/icons/512.png&quot;); height: 22px; width: 22px; top: 318px; left: 36px;\">&nbsp;</div>\n\n<div class=\"simple-translate-panel \" style=\"width: 300px; height: 200px; top: 0px; left: 0px; font-size: 13px;\">\n<div class=\"simple-translate-result-wrapper\" style=\"overflow: hidden;\">\n<div class=\"simple-translate-move\" draggable=\"true\">&nbsp;</div>\n\n<div class=\"simple-translate-result-contents\">\n<p class=\"simple-translate-result\" dir=\"auto\">&nbsp;</p>\n\n<p class=\"simple-translate-candidate\" dir=\"auto\">&nbsp;</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= n</code></li>\n\t<li>All the numbers of <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you implement a solution using only <code>O(1)</code> extra space complexity and <code>O(n)</code> runtime complexity?</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 43,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math",
      "Binary Search",
      "Bit Manipulation",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "integer-to-english-words",
    "title": "Integer to English Words",
    "description": "<p>Convert a non-negative integer <code>num</code> to its English words representation.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 123\n<strong>Output:</strong> &quot;One Hundred Twenty Three&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 12345\n<strong>Output:</strong> &quot;Twelve Thousand Three Hundred Forty Five&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 1234567\n<strong>Output:</strong> &quot;One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 60,
    "companyTags": [
      "Math",
      "String",
      "Recursion"
    ],
    "hints": [
      "Did you see a pattern in dividing the number into chunk of words? For example, 123 and 123000.",
      "Group the number by thousands (3 digits). You can write a helper function that takes a number less than 1000 and convert just that chunk to words.",
      "There are many edge cases. What are some good test cases? Does your code work with input such as 0? Or 1000010? (middle chunk is zero and should not be printed out)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "h-index",
    "title": "H-Index",
    "description": "<p>Given an array of integers <code>citations</code> where <code>citations[i]</code> is the number of citations a researcher received for their <code>i<sup>th</sup></code> paper, return <em>the researcher&#39;s h-index</em>.</p>\n\n<p>According to the <a href=\"https://en.wikipedia.org/wiki/H-index\" target=\"_blank\">definition of h-index on Wikipedia</a>: The h-index is defined as the maximum value of <code>h</code> such that the given researcher has published at least <code>h</code> papers that have each been cited at least <code>h</code> times.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> citations = [3,0,6,1,5]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.\nSince the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> citations = [1,3,1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == citations.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= citations[i] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "Sorting",
      "Counting Sort"
    ],
    "hints": [
      "An easy approach is to sort the array first.",
      "What are the possible values of h-index?",
      "A faster approach is to use extra space."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "h-index-ii",
    "title": "H-Index II",
    "description": "<p>Given an array of integers <code>citations</code> where <code>citations[i]</code> is the number of citations a researcher received for their <code>i<sup>th</sup></code> paper and <code>citations</code> is sorted in <strong>non-descending order</strong>, return <em>the researcher&#39;s h-index</em>.</p>\n\n<p>According to the <a href=\"https://en.wikipedia.org/wiki/H-index\" target=\"_blank\">definition of h-index on Wikipedia</a>: The h-index is defined as the maximum value of <code>h</code> such that the given researcher has published at least <code>h</code> papers that have each been cited at least <code>h</code> times.</p>\n\n<p>You must write an algorithm that runs in logarithmic time.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> citations = [0,1,3,5,6]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> [0,1,3,5,6] means the researcher has 5 papers in total and each of them had received 0, 1, 3, 5, 6 citations respectively.\nSince the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> citations = [1,2,100]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == citations.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= citations[i] &lt;= 1000</code></li>\n\t<li><code>citations</code> is sorted in <strong>ascending order</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 57,
    "companyTags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "Expected runtime complexity is in <i>O</i>(log <i>n</i>) and the input is sorted."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "first-bad-version",
    "title": "First Bad Version",
    "description": "<p>You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.</p>\n\n<p>Suppose you have <code>n</code> versions <code>[1, 2, ..., n]</code> and you want to find out the first bad one, which causes all the following ones to be bad.</p>\n\n<p>You are given an API <code>bool isBadVersion(version)</code> which returns whether <code>version</code> is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 5, bad = 4\n<strong>Output:</strong> 4\n<strong>Explanation:</strong>\ncall isBadVersion(3) -&gt; false\ncall isBadVersion(5)&nbsp;-&gt; true\ncall isBadVersion(4)&nbsp;-&gt; true\nThen 4 is the first bad version.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, bad = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= bad &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Binary Search",
      "Interactive"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "perfect-squares",
    "title": "Perfect Squares",
    "description": "<p>Given an integer <code>n</code>, return <em>the least number of perfect square numbers that sum to</em> <code>n</code>.</p>\n\n<p>A <strong>perfect square</strong> is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, <code>1</code>, <code>4</code>, <code>9</code>, and <code>16</code> are perfect squares while <code>3</code> and <code>11</code> are not.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 12\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 12 = 4 + 4 + 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 13\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> 13 = 4 + 9.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 48,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "move-zeroes",
    "title": "Move Zeroes",
    "description": "<p>Given an integer array <code>nums</code>, move all <code>0</code>&#39;s to the end of it while maintaining the relative order of the non-zero elements.</p>\n\n<p><strong>Note</strong> that you must do this in-place without making a copy of the array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1,0,3,12]\n<strong>Output:</strong> [1,3,12,0,0]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0]\n<strong>Output:</strong> [0]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you minimize the total number of operations done?",
    "difficulty": "Easy",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [
      "<b>In-place</b> means we should not be allocating any space for extra array. But we are allowed to modify the existing array. However, as a first step, try coming up with a solution that makes use of additional space. For this problem as well, first apply the idea discussed using an additional array and the in-place solution will pop up eventually.",
      "A <b>two-pointer</b> approach could be helpful here. The idea would be to have one pointer for iterating the array and another pointer that just works on the non-zero elements of the array."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "peeking-iterator",
    "title": "Peeking Iterator",
    "description": "<p>Design an iterator that supports the <code>peek</code> operation on an existing iterator in addition to the <code>hasNext</code> and the <code>next</code> operations.</p>\n\n<p>Implement the <code>PeekingIterator</code> class:</p>\n\n<ul>\n\t<li><code>PeekingIterator(Iterator&lt;int&gt; nums)</code> Initializes the object with the given integer iterator <code>iterator</code>.</li>\n\t<li><code>int next()</code> Returns the next element in the array and moves the pointer to the next element.</li>\n\t<li><code>boolean hasNext()</code> Returns <code>true</code> if there are still elements in the array.</li>\n\t<li><code>int peek()</code> Returns the next element in the array <strong>without</strong> moving the pointer.</li>\n</ul>\n\n<p><strong>Note:</strong> Each language may have a different implementation of the constructor and <code>Iterator</code>, but they all support the <code>int next()</code> and <code>boolean hasNext()</code> functions.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;PeekingIterator&quot;, &quot;next&quot;, &quot;peek&quot;, &quot;next&quot;, &quot;next&quot;, &quot;hasNext&quot;]\n[[[1, 2, 3]], [], [], [], [], []]\n<strong>Output</strong>\n[null, 1, 2, 2, 3, false]\n\n<strong>Explanation</strong>\nPeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [<u><strong>1</strong></u>,2,3]\npeekingIterator.next();    // return 1, the pointer moves to the next element [1,<u><strong>2</strong></u>,3].\npeekingIterator.peek();    // return 2, the pointer does not move [1,<u><strong>2</strong></u>,3].\npeekingIterator.next();    // return 2, the pointer moves to the next element [1,2,<u><strong>3</strong></u>]\npeekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]\npeekingIterator.hasNext(); // return False\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>All the calls to <code>next</code> and <code>peek</code> are valid.</li>\n\t<li>At most <code>1000</code> calls will be made to <code>next</code>, <code>hasNext</code>, and <code>peek</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> How would you extend your design to be generic and work with all types, not just integer?",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "Array",
      "Design",
      "Iterator"
    ],
    "hints": [
      "Think of \"looking ahead\". You want to cache the next element.",
      "Is one variable sufficient? Why or why not?",
      "Test your design with call order of <code>peek()</code> before <code>next()</code> vs <code>next()</code> before <code>peek()</code>.",
      "For a clean implementation, check out <a href=\"https://github.com/google/guava/blob/703ef758b8621cfbab16814f01ddcc5324bdea33/guava-gwt/src-super/com/google/common/collect/super/com/google/common/collect/Iterators.java#L1125\" target=\"_blank\">Google's guava library source code</a>."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-the-duplicate-number",
    "title": "Find the Duplicate Number",
    "description": "<p>Given an array of integers <code>nums</code> containing&nbsp;<code>n + 1</code> integers where each integer is in the range <code>[1, n]</code> inclusive.</p>\n\n<p>There is only <strong>one repeated number</strong> in <code>nums</code>, return <em>this&nbsp;repeated&nbsp;number</em>.</p>\n\n<p>You must solve the problem <strong>without</strong> modifying the array <code>nums</code>&nbsp;and using only constant extra space.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,4,2,2]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,3,4,2]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3,3,3,3]\n<strong>Output:</strong> 3</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums.length == n + 1</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= n</code></li>\n\t<li>All the integers in <code>nums</code> appear only <strong>once</strong> except for <strong>precisely one integer</strong> which appears <strong>two or more</strong> times.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><b>Follow up:</b></p>\n\n<ul>\n\t<li>How can we prove that at least one duplicate number must exist in <code>nums</code>?</li>\n\t<li>Can you solve the problem in linear runtime complexity?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Binary Search",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "game-of-life",
    "title": "Game of Life",
    "description": "<p>According to <a href=\"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life\" target=\"_blank\">Wikipedia&#39;s article</a>: &quot;The <b>Game of Life</b>, also known simply as <b>Life</b>, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.&quot;</p>\n\n<p>The board is made up of an <code>m x n</code> grid of cells, where each cell has an initial state: <b>live</b> (represented by a <code>1</code>) or <b>dead</b> (represented by a <code>0</code>). Each cell interacts with its <a href=\"https://en.wikipedia.org/wiki/Moore_neighborhood\" target=\"_blank\">eight neighbors</a> (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):</p>\n\n<ol>\n\t<li>Any live cell with fewer than two live neighbors dies as if caused by under-population.</li>\n\t<li>Any live cell with two or three live neighbors lives on to the next generation.</li>\n\t<li>Any live cell with more than three live neighbors dies, as if by over-population.</li>\n\t<li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>\n</ol>\n\n<p><span>The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the <code>m x n</code> grid <code>board</code>. In this process, births and deaths occur <strong>simultaneously</strong>.</span></p>\n\n<p><span>Given the current state of the <code>board</code>, <strong>update</strong> the <code>board</code> to reflect its next state.</span></p>\n\n<p><strong>Note</strong> that you do not need to return anything.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg\" style=\"width: 562px; height: 322px;\" />\n<pre>\n<strong>Input:</strong> board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]\n<strong>Output:</strong> [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg\" style=\"width: 402px; height: 162px;\" />\n<pre>\n<strong>Input:</strong> board = [[1,1],[1,0]]\n<strong>Output:</strong> [[1,1],[1,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 25</code></li>\n\t<li><code>board[i][j]</code> is <code>0</code> or <code>1</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.</li>\n\t<li>In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 30,
    "companyTags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "word-pattern",
    "title": "Word Pattern",
    "description": "<p>Given a <code>pattern</code> and a string <code>s</code>, find if <code>s</code>&nbsp;follows the same pattern.</p>\n\n<p>Here <b>follow</b> means a full match, such that there is a bijection between a letter in <code>pattern</code> and a <b>non-empty</b> word in <code>s</code>. Specifically:</p>\n\n<ul>\n\t<li>Each letter in <code>pattern</code> maps to <strong>exactly</strong> one unique word in <code>s</code>.</li>\n\t<li>Each unique word in <code>s</code> maps to <strong>exactly</strong> one letter in <code>pattern</code>.</li>\n\t<li>No two letters map to the same word, and no two words map to the same letter.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">pattern = &quot;abba&quot;, s = &quot;dog cat cat dog&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">true</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The bijection can be established as:</p>\n\n<ul>\n\t<li><code>&#39;a&#39;</code> maps to <code>&quot;dog&quot;</code>.</li>\n\t<li><code>&#39;b&#39;</code> maps to <code>&quot;cat&quot;</code>.</li>\n</ul>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">pattern = &quot;abba&quot;, s = &quot;dog cat cat fish&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">pattern = &quot;aaaa&quot;, s = &quot;dog cat cat dog&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">false</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= pattern.length &lt;= 300</code></li>\n\t<li><code>pattern</code> contains only lower-case English letters.</li>\n\t<li><code>1 &lt;= s.length &lt;= 3000</code></li>\n\t<li><code>s</code> contains only lowercase English letters and spaces <code>&#39; &#39;</code>.</li>\n\t<li><code>s</code> <strong>does not contain</strong> any leading or trailing spaces.</li>\n\t<li>All the words in <code>s</code> are separated by a <strong>single space</strong>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 37,
    "companyTags": [
      "Hash Table",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "nim-game",
    "title": "Nim Game",
    "description": "<p>You are playing the following Nim Game with your friend:</p>\n\n<ul>\n\t<li>Initially, there is a heap of stones on the table.</li>\n\t<li>You and your friend will alternate taking turns, and <strong>you go first</strong>.</li>\n\t<li>On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.</li>\n\t<li>The one who removes the last stone is the winner.</li>\n</ul>\n\n<p>Given <code>n</code>, the number of stones in the heap, return <code>true</code><em> if you can win the game assuming both you and your friend play optimally, otherwise return </em><code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> false\n<strong>Explanation:</strong> These are the possible outcomes:\n1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.\n2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.\n3. You remove 3 stones. Your friend removes the last stone. Your friend wins.\nIn all outcomes, your friend wins.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 42,
    "companyTags": [
      "Math",
      "Brainteaser",
      "Game Theory"
    ],
    "hints": [
      "If there are 5 stones in the heap, could you figure out a way to remove the stones such that you will always be the winner?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "description": "<p>The <strong>median</strong> is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.</p>\n\n<ul>\n\t<li>For example, for <code>arr = [2,3,4]</code>, the median is <code>3</code>.</li>\n\t<li>For example, for <code>arr = [2,3]</code>, the median is <code>(2 + 3) / 2 = 2.5</code>.</li>\n</ul>\n\n<p>Implement the MedianFinder class:</p>\n\n<ul>\n\t<li><code>MedianFinder()</code> initializes the <code>MedianFinder</code> object.</li>\n\t<li><code>void addNum(int num)</code> adds the integer <code>num</code> from the data stream to the data structure.</li>\n\t<li><code>double findMedian()</code> returns the median of all elements so far. Answers within <code>10<sup>-5</sup></code> of the actual answer will be accepted.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;MedianFinder&quot;, &quot;addNum&quot;, &quot;addNum&quot;, &quot;findMedian&quot;, &quot;addNum&quot;, &quot;findMedian&quot;]\n[[], [1], [2], [], [3], []]\n<strong>Output</strong>\n[null, null, null, 1.5, null, 2.0]\n\n<strong>Explanation</strong>\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>5</sup> &lt;= num &lt;= 10<sup>5</sup></code></li>\n\t<li>There will be at least one element in the data structure before calling <code>findMedian</code>.</li>\n\t<li>At most <code>5 * 10<sup>4</sup></code> calls will be made to <code>addNum</code> and <code>findMedian</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>If all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>\n\t<li>If <code>99%</code> of all integer numbers from the stream are in the range <code>[0, 100]</code>, how would you optimize your solution?</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 42,
    "companyTags": [
      "Two Pointers",
      "Design",
      "Sorting",
      "Heap (Priority Queue)",
      "Data Stream"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "serialize-and-deserialize-binary-tree",
    "title": "Serialize and Deserialize Binary Tree",
    "description": "<p>Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.</p>\n\n<p>Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.</p>\n\n<p><strong>Clarification:</strong> The input/output format is the same as <a href=\"https://support.leetcode.com/hc/en-us/articles/32442719377939-How-to-create-test-cases-on-LeetCode#h_01J5EGREAW3NAEJ14XC07GRW1A\" target=\"_blank\">how LeetCode serializes a binary tree</a>. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg\" style=\"width: 442px; height: 324px;\" />\n<pre>\n<strong>Input:</strong> root = [1,2,3,null,null,4,5]\n<strong>Output:</strong> [1,2,3,null,null,4,5]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 58,
    "companyTags": [
      "String",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Design",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "bulls-and-cows",
    "title": "Bulls and Cows",
    "description": "<p>You are playing the <strong><a href=\"https://en.wikipedia.org/wiki/Bulls_and_Cows\" target=\"_blank\">Bulls and Cows</a></strong> game with your friend.</p>\n\n<p>You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:</p>\n\n<ul>\n\t<li>The number of &quot;bulls&quot;, which are digits in the guess that are in the correct position.</li>\n\t<li>The number of &quot;cows&quot;, which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.</li>\n</ul>\n\n<p>Given the secret number <code>secret</code> and your friend&#39;s guess <code>guess</code>, return <em>the hint for your friend&#39;s guess</em>.</p>\n\n<p>The hint should be formatted as <code>&quot;xAyB&quot;</code>, where <code>x</code> is the number of bulls and <code>y</code> is the number of cows. Note that both <code>secret</code> and <code>guess</code> may contain duplicate digits.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> secret = &quot;1807&quot;, guess = &quot;7810&quot;\n<strong>Output:</strong> &quot;1A3B&quot;\n<strong>Explanation:</strong> Bulls are connected with a &#39;|&#39; and cows are underlined:\n&quot;1807&quot;\n  |\n&quot;<u>7</u>8<u>10</u>&quot;</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> secret = &quot;1123&quot;, guess = &quot;0111&quot;\n<strong>Output:</strong> &quot;1A1B&quot;\n<strong>Explanation:</strong> Bulls are connected with a &#39;|&#39; and cows are underlined:\n&quot;1123&quot;        &quot;1123&quot;\n  |      or     |\n&quot;01<u>1</u>1&quot;        &quot;011<u>1</u>&quot;\nNote that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= secret.length, guess.length &lt;= 1000</code></li>\n\t<li><code>secret.length == guess.length</code></li>\n\t<li><code>secret</code> and <code>guess</code> consist of digits only.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 47,
    "companyTags": [
      "Hash Table",
      "String",
      "Counting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the length of the longest <strong>strictly increasing </strong></em><span data-keyword=\"subsequence-array\"><em><strong>subsequence</strong></em></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,0,3,2,3]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,7,7,7,7,7,7]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><b>Follow up:</b>&nbsp;Can you come up with an algorithm that runs in&nbsp;<code>O(n log(n))</code> time complexity?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 48,
    "companyTags": [
      "Array",
      "Binary Search",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-invalid-parentheses",
    "title": "Remove Invalid Parentheses",
    "description": "<p>Given a string <code>s</code> that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.</p>\n\n<p>Return <em>a list of <strong>unique strings</strong> that are valid with the minimum number of removals</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;()())()&quot;\n<strong>Output:</strong> [&quot;(())()&quot;,&quot;()()()&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;(a)())()&quot;\n<strong>Output:</strong> [&quot;(a())()&quot;,&quot;(a)()()&quot;]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;)(&quot;\n<strong>Output:</strong> [&quot;&quot;]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 25</code></li>\n\t<li><code>s</code> consists of lowercase English letters and parentheses <code>&#39;(&#39;</code> and <code>&#39;)&#39;</code>.</li>\n\t<li>There will be at most <code>20</code> parentheses in <code>s</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 43,
    "companyTags": [
      "String",
      "Backtracking",
      "Breadth-First Search"
    ],
    "hints": [
      "Since we do not know which brackets can be removed, we try all the options! We can use recursion.",
      "In the recursion, for each bracket, we can either use it or remove it.",
      "Recursion will generate all the valid parentheses strings but we want the ones with the least number of parentheses deleted.",
      "We can count the number of invalid brackets to be deleted and only generate the valid strings in the recusrion."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "range-sum-query-immutable",
    "title": "Range Sum Query - Immutable",
    "description": "<p>Given an integer array <code>nums</code>, handle multiple queries of the following type:</p>\n\n<ol>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> where <code>left &lt;= right</code>.</li>\n</ol>\n\n<p>Implement the <code>NumArray</code> class:</p>\n\n<ul>\n\t<li><code>NumArray(int[] nums)</code> Initializes the object with the integer array <code>nums</code>.</li>\n\t<li><code>int sumRange(int left, int right)</code> Returns the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> (i.e. <code>nums[left] + nums[left + 1] + ... + nums[right]</code>).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;NumArray&quot;, &quot;sumRange&quot;, &quot;sumRange&quot;, &quot;sumRange&quot;]\n[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]\n<strong>Output</strong>\n[null, 1, -1, -3]\n\n<strong>Explanation</strong>\nNumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);\nnumArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1\nnumArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1\nnumArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= left &lt;= right &lt; nums.length</code></li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>sumRange</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Design",
      "Prefix Sum"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "range-sum-query-2d-immutable",
    "title": "Range Sum Query 2D - Immutable",
    "description": "<p>Given a 2D matrix <code>matrix</code>, handle multiple queries of the following type:</p>\n\n<ul>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>matrix</code> inside the rectangle defined by its <strong>upper left corner</strong> <code>(row1, col1)</code> and <strong>lower right corner</strong> <code>(row2, col2)</code>.</li>\n</ul>\n\n<p>Implement the <code>NumMatrix</code> class:</p>\n\n<ul>\n\t<li><code>NumMatrix(int[][] matrix)</code> Initializes the object with the integer matrix <code>matrix</code>.</li>\n\t<li><code>int sumRegion(int row1, int col1, int row2, int col2)</code> Returns the <strong>sum</strong> of the elements of <code>matrix</code> inside the rectangle defined by its <strong>upper left corner</strong> <code>(row1, col1)</code> and <strong>lower right corner</strong> <code>(row2, col2)</code>.</li>\n</ul>\n\n<p>You must design an algorithm where <code>sumRegion</code> works on <code>O(1)</code> time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/14/sum-grid.jpg\" style=\"width: 415px; height: 415px;\" />\n<pre>\n<strong>Input</strong>\n[&quot;NumMatrix&quot;, &quot;sumRegion&quot;, &quot;sumRegion&quot;, &quot;sumRegion&quot;]\n[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]\n<strong>Output</strong>\n[null, 8, 11, 12]\n\n<strong>Explanation</strong>\nNumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);\nnumMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)\nnumMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)\nnumMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= row1 &lt;= row2 &lt; m</code></li>\n\t<li><code>0 &lt;= col1 &lt;= col2 &lt; n</code></li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>sumRegion</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 59,
    "companyTags": [
      "Array",
      "Design",
      "Matrix",
      "Prefix Sum"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "range-sum-query-mutable",
    "title": "Range Sum Query - Mutable",
    "description": "<p>Given an integer array <code>nums</code>, handle multiple queries of the following types:</p>\n\n<ol>\n\t<li><strong>Update</strong> the value of an element in <code>nums</code>.</li>\n\t<li>Calculate the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> where <code>left &lt;= right</code>.</li>\n</ol>\n\n<p>Implement the <code>NumArray</code> class:</p>\n\n<ul>\n\t<li><code>NumArray(int[] nums)</code> Initializes the object with the integer array <code>nums</code>.</li>\n\t<li><code>void update(int index, int val)</code> <strong>Updates</strong> the value of <code>nums[index]</code> to be <code>val</code>.</li>\n\t<li><code>int sumRange(int left, int right)</code> Returns the <strong>sum</strong> of the elements of <code>nums</code> between indices <code>left</code> and <code>right</code> <strong>inclusive</strong> (i.e. <code>nums[left] + nums[left + 1] + ... + nums[right]</code>).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;NumArray&quot;, &quot;sumRange&quot;, &quot;update&quot;, &quot;sumRange&quot;]\n[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]\n<strong>Output</strong>\n[null, 9, null, 8]\n\n<strong>Explanation</strong>\nNumArray numArray = new NumArray([1, 3, 5]);\nnumArray.sumRange(0, 2); // return 1 + 3 + 5 = 9\nnumArray.update(1, 2);   // nums = [1, 2, 5]\nnumArray.sumRange(0, 2); // return 1 + 2 + 5 = 8\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>0 &lt;= index &lt; nums.length</code></li>\n\t<li><code>-100 &lt;= val &lt;= 100</code></li>\n\t<li><code>0 &lt;= left &lt;= right &lt; nums.length</code></li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>update</code> and <code>sumRange</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Design",
      "Binary Indexed Tree",
      "Segment Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "additive-number",
    "title": "Additive Number",
    "description": "<p>An <strong>additive number</strong> is a string whose digits can form an <strong>additive sequence</strong>.</p>\n\n<p>A valid <strong>additive sequence</strong> should contain <strong>at least</strong> three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.</p>\n\n<p>Given a string containing only digits, return <code>true</code> if it is an <strong>additive number</strong> or <code>false</code> otherwise.</p>\n\n<p><strong>Note:</strong> Numbers in the additive sequence <strong>cannot</strong> have leading zeros, so sequence <code>1, 2, 03</code> or <code>1, 02, 3</code> is invalid.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> &quot;112358&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \nThe digits can form an additive sequence: 1, 1, 2, 3, 5, 8. \n1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> &quot;199100199&quot;\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \nThe additive sequence is: 1, 99, 100, 199.&nbsp;\n1 + 99 = 100, 99 + 100 = 199\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num.length &lt;= 35</code></li>\n\t<li><code>num</code> consists only of digits.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> How would you handle overflow for very large input integers?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "String",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock-with-cooldown",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n\n<p>Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:</p>\n\n<ul>\n\t<li>After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).</li>\n</ul>\n\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1,2,3,0,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> transactions = [buy, sell, cooldown, buy, sell]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> prices = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= prices.length &lt;= 5000</code></li>\n\t<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-height-trees",
    "title": "Minimum Height Trees",
    "description": "<p>A tree is an undirected graph in which any two vertices are connected by&nbsp;<i>exactly</i>&nbsp;one path. In other words, any connected graph without simple cycles is a tree.</p>\n\n<p>Given a tree of <code>n</code> nodes&nbsp;labelled from <code>0</code> to <code>n - 1</code>, and an array of&nbsp;<code>n - 1</code>&nbsp;<code>edges</code> where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an undirected edge between the two nodes&nbsp;<code>a<sub>i</sub></code> and&nbsp;<code>b<sub>i</sub></code> in the tree,&nbsp;you can choose any node of the tree as the root. When you select a node <code>x</code> as the root, the result tree has height <code>h</code>. Among all possible rooted trees, those with minimum height (i.e. <code>min(h)</code>)&nbsp; are called <strong>minimum height trees</strong> (MHTs).</p>\n\n<p>Return <em>a list of all <strong>MHTs&#39;</strong> root labels</em>.&nbsp;You can return the answer in <strong>any order</strong>.</p>\n\n<p>The <strong>height</strong> of a rooted tree is the number of edges on the longest downward path between the root and a leaf.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/e1.jpg\" style=\"width: 800px; height: 213px;\" />\n<pre>\n<strong>Input:</strong> n = 4, edges = [[1,0],[1,2],[1,3]]\n<strong>Output:</strong> [1]\n<strong>Explanation:</strong> As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/01/e2.jpg\" style=\"width: 800px; height: 321px;\" />\n<pre>\n<strong>Input:</strong> n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]\n<strong>Output:</strong> [3,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>edges.length == n - 1</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>\n\t<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>\n\t<li>All the pairs <code>(a<sub>i</sub>, b<sub>i</sub>)</code> are distinct.</li>\n\t<li>The given input is <strong>guaranteed</strong> to be a tree and there will be <strong>no repeated</strong> edges.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph Theory",
      "Topological Sort"
    ],
    "hints": [
      "How many MHTs can a graph have at most?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "burst-balloons",
    "title": "Burst Balloons",
    "description": "<p>You are given <code>n</code> balloons, indexed from <code>0</code> to <code>n - 1</code>. Each balloon is painted with a number on it represented by an array <code>nums</code>. You are asked to burst all the balloons.</p>\n\n<p>If you burst the <code>i<sup>th</sup></code> balloon, you will get <code>nums[i - 1] * nums[i] * nums[i + 1]</code> coins. If <code>i - 1</code> or <code>i + 1</code> goes out of bounds of the array, then treat it as if there is a balloon with a <code>1</code> painted on it.</p>\n\n<p>Return <em>the maximum coins you can collect by bursting the balloons wisely</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,5,8]\n<strong>Output:</strong> 167\n<strong>Explanation:</strong>\nnums = [3,1,5,8] --&gt; [3,5,8] --&gt; [3,8] --&gt; [8] --&gt; []\ncoins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5]\n<strong>Output:</strong> 10\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "super-ugly-number",
    "title": "Super Ugly Number",
    "description": "<p>A <strong>super ugly number</strong> is a positive integer whose prime factors are in the array <code>primes</code>.</p>\n\n<p>Given an integer <code>n</code> and an array of integers <code>primes</code>, return <em>the</em> <code>n<sup>th</sup></code> <em><strong>super ugly number</strong></em>.</p>\n\n<p>The <code>n<sup>th</sup></code> <strong>super ugly number</strong> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 12, primes = [2,7,13,19]\n<strong>Output:</strong> 32\n<strong>Explanation:</strong> [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers given primes = [2,7,13,19].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, primes = [2,3,5]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 1 has no prime factors, therefore all of its prime factors are in the array primes = [2,3,5].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= primes.length &lt;= 100</code></li>\n\t<li><code>2 &lt;= primes[i] &lt;= 1000</code></li>\n\t<li><code>primes[i]</code> is <strong>guaranteed</strong> to be a prime number.</li>\n\t<li>All the values of <code>primes</code> are <strong>unique</strong> and sorted in <strong>ascending order</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Math",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "count-of-smaller-numbers-after-self",
    "title": "Count of Smaller Numbers After Self",
    "description": "<p>Given an integer array <code>nums</code>, return<em> an integer array </em><code>counts</code><em> where </em><code>counts[i]</code><em> is the number of smaller elements to the right of </em><code>nums[i]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [5,2,6,1]\n<strong>Output:</strong> [2,1,1,0]\n<strong>Explanation:</strong>\nTo the right of 5 there are <b>2</b> smaller elements (2 and 1).\nTo the right of 2 there is only <b>1</b> smaller element (1).\nTo the right of 6 there is <b>1</b> smaller element (1).\nTo the right of 1 there is <b>0</b> smaller element.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1]\n<strong>Output:</strong> [0]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,-1]\n<strong>Output:</strong> [0,0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 37,
    "companyTags": [
      "Array",
      "Binary Search",
      "Divide and Conquer",
      "Binary Indexed Tree",
      "Segment Tree",
      "Merge Sort",
      "Ordered Set"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-duplicate-letters",
    "title": "Remove Duplicate Letters",
    "description": "<p>Given a string <code>s</code>, remove duplicate letters so that every letter appears once and only once. You must make sure your result is <span data-keyword=\"lexicographically-smaller-string\"><strong>the smallest in lexicographical order</strong></span> among all possible results.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;bcabc&quot;\n<strong>Output:</strong> &quot;abc&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cbacdcbc&quot;\n<strong>Output:</strong> &quot;acdb&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 1081: <a href=\"https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/\" target=\"_blank\">https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/</a></p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "String",
      "Stack",
      "Greedy",
      "Monotonic Stack"
    ],
    "hints": [
      "Greedily try to add one missing character. How to check if adding some character will not cause problems ? Use bit-masks to check whether you will be able to complete the sub-sequence if you add the character at some index i."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximum-product-of-word-lengths",
    "title": "Maximum Product of Word Lengths",
    "description": "<p>Given a string array <code>words</code>, return <em>the maximum value of</em> <code>length(word[i]) * length(word[j])</code> <em>where the two words do not share common letters</em>. If no such two words exist, return <code>0</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;abcw&quot;,&quot;baz&quot;,&quot;foo&quot;,&quot;bar&quot;,&quot;xtfn&quot;,&quot;abcdef&quot;]\n<strong>Output:</strong> 16\n<strong>Explanation:</strong> The two words can be &quot;abcw&quot;, &quot;xtfn&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;a&quot;,&quot;ab&quot;,&quot;abc&quot;,&quot;d&quot;,&quot;cd&quot;,&quot;bcd&quot;,&quot;abcd&quot;]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The two words can be &quot;ab&quot;, &quot;cd&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> words = [&quot;a&quot;,&quot;aa&quot;,&quot;aaa&quot;,&quot;aaaa&quot;]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> No such pair of words.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= words.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 1000</code></li>\n\t<li><code>words[i]</code> consists only of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Array",
      "String",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "bulb-switcher",
    "title": "Bulb Switcher",
    "description": "<p>There are <code>n</code> bulbs that are initially off. You first turn on all the bulbs, then&nbsp;you turn off every second bulb.</p>\n\n<p>On the third round, you toggle every third bulb (turning on if it&#39;s off or turning off if it&#39;s on). For the <code>i<sup>th</sup></code> round, you toggle every <code>i</code> bulb. For the <code>n<sup>th</sup></code> round, you only toggle the last bulb.</p>\n\n<p>Return <em>the number of bulbs that are on after <code>n</code> rounds</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/11/05/bulb.jpg\" style=\"width: 421px; height: 321px;\" />\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> At first, the three bulbs are [off, off, off].\nAfter the first round, the three bulbs are [on, on, on].\nAfter the second round, the three bulbs are [on, off, on].\nAfter the third round, the three bulbs are [on, off, off]. \nSo you should return 1 because there is only one bulb is on.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "Math",
      "Brainteaser"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "description": "<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>\n\n<p>Return <em>the fewest number of coins that you need to make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.</p>\n\n<p>You may assume that you have an infinite number of each kind of coin.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [1,2,5], amount = 11\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 11 = 5 + 5 + 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [2], amount = 3\n<strong>Output:</strong> -1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> coins = [1], amount = 0\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 12</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= amount &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "wiggle-sort-ii",
    "title": "Wiggle Sort II",
    "description": "<p>Given an integer array <code>nums</code>, reorder it such that <code>nums[0] &lt; nums[1] &gt; nums[2] &lt; nums[3]...</code>.</p>\n\n<p>You may assume the input array always has a valid answer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,1,1,6,4]\n<strong>Output:</strong> [1,6,1,5,1,4]\n<strong>Explanation:</strong> [1,4,1,5,1,6] is also accepted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,2,2,3,1]\n<strong>Output:</strong> [2,3,1,3,1,2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 5000</code></li>\n\t<li>It is guaranteed that there will be an answer for the given input <code>nums</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow Up:</strong> Can you do it in <code>O(n)</code> time and/or <strong>in-place</strong> with <code>O(1)</code> extra space?",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Greedy",
      "Sorting",
      "Quickselect"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "odd-even-linked-list",
    "title": "Odd Even Linked List",
    "description": "<p>Given the <code>head</code> of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return <em>the reordered list</em>.</p>\n\n<p>The <strong>first</strong> node is considered <strong>odd</strong>, and the <strong>second</strong> node is <strong>even</strong>, and so on.</p>\n\n<p>Note that the relative order inside both the even and odd groups should remain as it was in the input.</p>\n\n<p>You must solve the problem&nbsp;in <code>O(1)</code>&nbsp;extra space complexity and <code>O(n)</code> time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg\" style=\"width: 300px; height: 123px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [1,3,5,2,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg\" style=\"width: 500px; height: 142px;\" />\n<pre>\n<strong>Input:</strong> head = [2,1,3,5,6,4,7]\n<strong>Output:</strong> [2,3,6,7,1,5,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the linked list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>6</sup> &lt;= Node.val &lt;= 10<sup>6</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 37,
    "companyTags": [
      "Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "count-of-range-sum",
    "title": "Count of Range Sum",
    "description": "<p>Given an integer array <code>nums</code> and two integers <code>lower</code> and <code>upper</code>, return <em>the number of range sums that lie in</em> <code>[lower, upper]</code> <em>inclusive</em>.</p>\n\n<p>Range sum <code>S(i, j)</code> is defined as the sum of the elements in <code>nums</code> between indices <code>i</code> and <code>j</code> inclusive, where <code>i &lt;= j</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-2,5,-1], lower = -2, upper = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0], lower = 0, upper = 0\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= lower &lt;= upper &lt;= 10<sup>5</sup></code></li>\n\t<li>The answer is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Binary Search",
      "Divide and Conquer",
      "Binary Indexed Tree",
      "Segment Tree",
      "Merge Sort",
      "Ordered Set"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "power-of-three",
    "title": "Power of Three",
    "description": "<p>Given an integer <code>n</code>, return <em><code>true</code> if it is a power of three. Otherwise, return <code>false</code></em>.</p>\n\n<p>An integer <code>n</code> is a power of three, if there exists an integer <code>x</code> such that <code>n == 3<sup>x</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 27\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 27 = 3<sup>3</sup>\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 0\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no x where 3<sup>x</sup> = 0.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = -1\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no x where 3<sup>x</sup> = (-1).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it without loops/recursion?",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Math",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "power-of-four",
    "title": "Power of Four",
    "description": "<p>Given an integer <code>n</code>, return <em><code>true</code> if it is a power of four. Otherwise, return <code>false</code></em>.</p>\n\n<p>An integer <code>n</code> is a power of four, if there exists an integer <code>x</code> such that <code>n == 4<sup>x</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 16\n<strong>Output:</strong> true\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 5\n<strong>Output:</strong> false\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> true\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it without loops/recursion?",
    "difficulty": "Easy",
    "acceptanceRate": 38,
    "companyTags": [
      "Math",
      "Bit Manipulation",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "integer-break",
    "title": "Integer Break",
    "description": "<p>Given an integer <code>n</code>, break it into the sum of <code>k</code> <strong>positive integers</strong>, where <code>k &gt;= 2</code>, and maximize the product of those integers.</p>\n\n<p>Return <em>the maximum product you can get</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 2 = 1 + 1, 1 &times; 1 = 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 10\n<strong>Output:</strong> 36\n<strong>Explanation:</strong> 10 = 3 + 3 + 4, 3 &times; 3 &times; 4 = 36.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= n &lt;= 58</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 56,
    "companyTags": [
      "Math",
      "Dynamic Programming"
    ],
    "hints": [
      "There is a simple O(n) solution to this problem.",
      "You may check the breaking results of <i>n</i> ranging from 7 to 10 to discover the regularities."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-string",
    "title": "Reverse String",
    "description": "<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>\n\n<p>You must do this by modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a> with <code>O(1)</code> extra memory.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\n<strong>Output:</strong> [\"o\",\"l\",\"l\",\"e\",\"h\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\n<strong>Output:</strong> [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is a <a href=\"https://en.wikipedia.org/wiki/ASCII#Printable_characters\" target=\"_blank\">printable ascii character</a>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 53,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-vowels-of-a-string",
    "title": "Reverse Vowels of a String",
    "description": "<p>Given a string <code>s</code>, reverse only all the vowels in the string and return it.</p>\n\n<p>The vowels are <code>&#39;a&#39;</code>, <code>&#39;e&#39;</code>, <code>&#39;i&#39;</code>, <code>&#39;o&#39;</code>, and <code>&#39;u&#39;</code>, and they can appear in both lower and upper cases, more than once.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;IceCreAm&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;AceCreIm&quot;</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The vowels in <code>s</code> are <code>[&#39;I&#39;, &#39;e&#39;, &#39;e&#39;, &#39;A&#39;]</code>. On reversing the vowels, s becomes <code>&quot;AceCreIm&quot;</code>.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;leetcode&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">&quot;leotcede&quot;</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consist of <strong>printable ASCII</strong> characters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 68,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k</code> <em>most frequent elements</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,1,1,2,2,3], k = 2</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1], k = 1</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">nums = [1,2,1,2,1,2,3,1,3,2], k = 2</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k</code> is in the range <code>[1, the number of unique elements in the array]</code>.</li>\n\t<li>It is <strong>guaranteed</strong> that the answer is <strong>unique</strong>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Your algorithm&#39;s time complexity must be better than <code>O(n log n)</code>, where n is the array&#39;s size.</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "Array",
      "Hash Table",
      "Divide and Conquer",
      "Sorting",
      "Heap (Priority Queue)",
      "Bucket Sort",
      "Counting",
      "Quickselect"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "intersection-of-two-arrays",
    "title": "Intersection of Two Arrays",
    "description": "<p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return <em>an array of their <span data-keyword=\"array-intersection\">intersection</span></em>. Each element in the result must be <strong>unique</strong> and you may return the result in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,2,2,1], nums2 = [2,2]\n<strong>Output:</strong> [2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [4,9,5], nums2 = [9,4,9,8,4]\n<strong>Output:</strong> [9,4]\n<strong>Explanation:</strong> [4,9] is also accepted.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length, nums2.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 42,
    "companyTags": [
      "Array",
      "Hash Table",
      "Two Pointers",
      "Binary Search",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "intersection-of-two-arrays-ii",
    "title": "Intersection of Two Arrays II",
    "description": "<p>Given two integer arrays <code>nums1</code> and <code>nums2</code>, return <em>an array of their intersection</em>. Each element in the result must appear as many times as it shows in both arrays and you may return the result in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,2,2,1], nums2 = [2,2]\n<strong>Output:</strong> [2,2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [4,9,5], nums2 = [9,4,9,8,4]\n<strong>Output:</strong> [4,9]\n<strong>Explanation:</strong> [9,4] is also accepted.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length, nums2.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>What if the given array is already sorted? How would you optimize your algorithm?</li>\n\t<li>What if <code>nums1</code>&#39;s size is small compared to <code>nums2</code>&#39;s size? Which algorithm is better?</li>\n\t<li>What if elements of <code>nums2</code> are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Hash Table",
      "Two Pointers",
      "Binary Search",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "data-stream-as-disjoint-intervals",
    "title": "Data Stream as Disjoint Intervals",
    "description": "<p>Given a data stream input of non-negative integers <code>a<sub>1</sub>, a<sub>2</sub>, ..., a<sub>n</sub></code>, summarize the numbers seen so far as a list of disjoint intervals.</p>\n\n<p>Implement the <code>SummaryRanges</code> class:</p>\n\n<ul>\n\t<li><code>SummaryRanges()</code> Initializes the object with an empty stream.</li>\n\t<li><code>void addNum(int value)</code> Adds the integer <code>value</code> to the stream.</li>\n\t<li><code>int[][] getIntervals()</code> Returns a summary of the integers in the stream currently as a list of disjoint intervals <code>[start<sub>i</sub>, end<sub>i</sub>]</code>. The answer should be sorted by <code>start<sub>i</sub></code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;SummaryRanges&quot;, &quot;addNum&quot;, &quot;getIntervals&quot;, &quot;addNum&quot;, &quot;getIntervals&quot;, &quot;addNum&quot;, &quot;getIntervals&quot;, &quot;addNum&quot;, &quot;getIntervals&quot;, &quot;addNum&quot;, &quot;getIntervals&quot;]\n[[], [1], [], [3], [], [7], [], [2], [], [6], []]\n<strong>Output</strong>\n[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]\n\n<strong>Explanation</strong>\nSummaryRanges summaryRanges = new SummaryRanges();\nsummaryRanges.addNum(1);      // arr = [1]\nsummaryRanges.getIntervals(); // return [[1, 1]]\nsummaryRanges.addNum(3);      // arr = [1, 3]\nsummaryRanges.getIntervals(); // return [[1, 1], [3, 3]]\nsummaryRanges.addNum(7);      // arr = [1, 3, 7]\nsummaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]\nsummaryRanges.addNum(2);      // arr = [1, 2, 3, 7]\nsummaryRanges.getIntervals(); // return [[1, 3], [7, 7]]\nsummaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]\nsummaryRanges.getIntervals(); // return [[1, 3], [6, 7]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= value &lt;= 10<sup>4</sup></code></li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>addNum</code> and <code>getIntervals</code>.</li>\n\t<li>At most <code>10<sup>2</sup></code>&nbsp;calls will be made to&nbsp;<code>getIntervals</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if there are lots of merges and the number of disjoint intervals is small compared to the size of the data stream?</p>\n",
    "difficulty": "Hard",
    "acceptanceRate": 69,
    "companyTags": [
      "Hash Table",
      "Binary Search",
      "Union-Find",
      "Design",
      "Data Stream",
      "Ordered Set"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "russian-doll-envelopes",
    "title": "Russian Doll Envelopes",
    "description": "<p>You are given a 2D array of integers <code>envelopes</code> where <code>envelopes[i] = [w<sub>i</sub>, h<sub>i</sub>]</code> represents the width and the height of an envelope.</p>\n\n<p>One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope&#39;s width and height.</p>\n\n<p>Return <em>the maximum number of envelopes you can Russian doll (i.e., put one inside the other)</em>.</p>\n\n<p><strong>Note:</strong> You cannot rotate an envelope.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> envelopes = [[5,4],[6,4],[6,7],[2,3]]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The maximum number of envelopes you can Russian doll is <code>3</code> ([2,3] =&gt; [5,4] =&gt; [6,7]).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> envelopes = [[1,1],[1,1],[1,1]]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= envelopes.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>envelopes[i].length == 2</code></li>\n\t<li><code>1 &lt;= w<sub>i</sub>, h<sub>i</sub> &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 40,
    "companyTags": [
      "Array",
      "Binary Search",
      "Dynamic Programming",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "design-twitter",
    "title": "Design Twitter",
    "description": "<p>Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the <code>10</code> most recent tweets in the user&#39;s news feed.</p>\n\n<p>Implement the <code>Twitter</code> class:</p>\n\n<ul>\n\t<li><code>Twitter()</code> Initializes your twitter object.</li>\n\t<li><code>void postTweet(int userId, int tweetId)</code> Composes a new tweet with ID <code>tweetId</code> by the user <code>userId</code>. Each call to this function will be made with a unique <code>tweetId</code>.</li>\n\t<li><code>List&lt;Integer&gt; getNewsFeed(int userId)</code> Retrieves the <code>10</code> most recent tweet IDs in the user&#39;s news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be <strong>ordered from most recent to least recent</strong>.</li>\n\t<li><code>void follow(int followerId, int followeeId)</code> The user with ID <code>followerId</code> started following the user with ID <code>followeeId</code>.</li>\n\t<li><code>void unfollow(int followerId, int followeeId)</code> The user with ID <code>followerId</code> started unfollowing the user with ID <code>followeeId</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Twitter&quot;, &quot;postTweet&quot;, &quot;getNewsFeed&quot;, &quot;follow&quot;, &quot;postTweet&quot;, &quot;getNewsFeed&quot;, &quot;unfollow&quot;, &quot;getNewsFeed&quot;]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]\n<strong>Output</strong>\n[null, null, [5], null, null, [6, 5], null, [5]]\n\n<strong>Explanation</strong>\nTwitter twitter = new Twitter();\ntwitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).\ntwitter.getNewsFeed(1);  // User 1&#39;s news feed should return a list with 1 tweet id -&gt; [5]. return [5]\ntwitter.follow(1, 2);    // User 1 follows user 2.\ntwitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).\ntwitter.getNewsFeed(1);  // User 1&#39;s news feed should return a list with 2 tweet ids -&gt; [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.\ntwitter.unfollow(1, 2);  // User 1 unfollows user 2.\ntwitter.getNewsFeed(1);  // User 1&#39;s news feed should return a list with 1 tweet id -&gt; [5], since user 1 is no longer following user 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= userId, followerId, followeeId &lt;= 500</code></li>\n\t<li><code>0 &lt;= tweetId &lt;= 10<sup>4</sup></code></li>\n\t<li>All the tweets have <strong>unique</strong> IDs.</li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>postTweet</code>, <code>getNewsFeed</code>, <code>follow</code>, and <code>unfollow</code>.</li>\n\t<li>A user cannot follow himself.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 30,
    "companyTags": [
      "Hash Table",
      "Linked List",
      "Design",
      "Heap (Priority Queue)"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-perfect-square",
    "title": "Valid Perfect Square",
    "description": "<p>Given a positive integer num, return <code>true</code> <em>if</em> <code>num</code> <em>is a perfect square or</em> <code>false</code> <em>otherwise</em>.</p>\n\n<p>A <strong>perfect square</strong> is an integer that is the square of an integer. In other words, it is the product of some integer with itself.</p>\n\n<p>You must not use any built-in library function, such as <code>sqrt</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 16\n<strong>Output:</strong> true\n<strong>Explanation:</strong> We return true because 4 * 4 = 16 and 4 is an integer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 14\n<strong>Output:</strong> false\n<strong>Explanation:</strong> We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Math",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "largest-divisible-subset",
    "title": "Largest Divisible Subset",
    "description": "<p>Given a set of <strong>distinct</strong> positive integers <code>nums</code>, return the largest subset <code>answer</code> such that every pair <code>(answer[i], answer[j])</code> of elements in this subset satisfies:</p>\n\n<ul>\n\t<li><code>answer[i] % answer[j] == 0</code>, or</li>\n\t<li><code>answer[j] % answer[i] == 0</code></li>\n</ul>\n\n<p>If there are multiple solutions, return any of them.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> [1,3] is also accepted.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,4,8]\n<strong>Output:</strong> [1,2,4,8]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 2 * 10<sup>9</sup></code></li>\n\t<li>All the integers in <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Math",
      "Dynamic Programming",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sum-of-two-integers",
    "title": "Sum of Two Integers",
    "description": "<p>Given two integers <code>a</code> and <code>b</code>, return <em>the sum of the two integers without using the operators</em> <code>+</code> <em>and</em> <code>-</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> a = 1, b = 2\n<strong>Output:</strong> 3\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> a = 2, b = 3\n<strong>Output:</strong> 5\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-1000 &lt;= a, b &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 62,
    "companyTags": [
      "Math",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "super-pow",
    "title": "Super Pow",
    "description": "<p>Your task is to calculate <code>a<sup>b</sup></code> mod <code>1337</code> where <code>a</code> is a positive integer and <code>b</code> is an extremely large positive integer given in the form of an array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> a = 2, b = [3]\n<strong>Output:</strong> 8\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> a = 2, b = [1,0]\n<strong>Output:</strong> 1024\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> a = 1, b = [4,3,3,8,5,2]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= a &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>1 &lt;= b.length &lt;= 2000</code></li>\n\t<li><code>0 &lt;= b[i] &lt;= 9</code></li>\n\t<li><code>b</code> does not contain leading zeros.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Math",
      "Divide and Conquer"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-k-pairs-with-smallest-sums",
    "title": "Find K Pairs with Smallest Sums",
    "description": "<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code> sorted in <strong>non-decreasing&nbsp;order</strong> and an integer <code>k</code>.</p>\n\n<p>Define a pair <code>(u, v)</code> which consists of one element from the first array and one element from the second array.</p>\n\n<p>Return <em>the</em> <code>k</code> <em>pairs</em> <code>(u<sub>1</sub>, v<sub>1</sub>), (u<sub>2</sub>, v<sub>2</sub>), ..., (u<sub>k</sub>, v<sub>k</sub>)</code> <em>with the smallest sums</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,7,11], nums2 = [2,4,6], k = 3\n<strong>Output:</strong> [[1,2],[1,4],[1,6]]\n<strong>Explanation:</strong> The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,1,2], nums2 = [1,2,3], k = 2\n<strong>Output:</strong> [[1,1],[1,1]]\n<strong>Explanation:</strong> The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums1</code> and <code>nums2</code> both are sorted in <strong>non-decreasing order</strong>.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k &lt;=&nbsp;nums1.length *&nbsp;nums2.length</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 46,
    "companyTags": [
      "Array",
      "Heap (Priority Queue)"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "guess-number-higher-or-lower",
    "title": "Guess Number Higher or Lower",
    "description": "<p>We are playing the Guess Game. The game is as follows:</p>\n\n<p>I pick a number from <code>1</code> to <code>n</code>. You have to guess which number I picked (the number I picked stays the same throughout the game).</p>\n\n<p>Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.</p>\n\n<p>You call a pre-defined API <code>int guess(int num)</code>, which returns three possible results:</p>\n\n<ul>\n\t<li><code>-1</code>: Your guess is higher than the number I picked (i.e. <code>num &gt; pick</code>).</li>\n\t<li><code>1</code>: Your guess is lower than the number I picked (i.e. <code>num &lt; pick</code>).</li>\n\t<li><code>0</code>: your guess is equal to the number I picked (i.e. <code>num == pick</code>).</li>\n</ul>\n\n<p>Return <em>the number that I picked</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 10, pick = 6\n<strong>Output:</strong> 6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, pick = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2, pick = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>1 &lt;= pick &lt;= n</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 34,
    "companyTags": [
      "Binary Search",
      "Interactive"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "guess-number-higher-or-lower-ii",
    "title": "Guess Number Higher or Lower II",
    "description": "<p>We are playing the Guessing Game. The game will work as follows:</p>\n\n<ol>\n\t<li>I pick a number between&nbsp;<code>1</code>&nbsp;and&nbsp;<code>n</code>.</li>\n\t<li>You guess a number.</li>\n\t<li>If you guess the right number, <strong>you win the game</strong>.</li>\n\t<li>If you guess the wrong number, then I will tell you whether the number I picked is <strong>higher or lower</strong>, and you will continue guessing.</li>\n\t<li>Every time you guess a wrong number&nbsp;<code>x</code>, you will pay&nbsp;<code>x</code>&nbsp;dollars. If you run out of money, <strong>you lose the game</strong>.</li>\n</ol>\n\n<p>Given a particular&nbsp;<code>n</code>, return&nbsp;<em>the minimum amount of money you need to&nbsp;<strong>guarantee a win regardless of what number I pick</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/09/10/graph.png\" style=\"width: 505px; height: 388px;\" />\n<pre>\n<strong>Input:</strong> n = 10\n<strong>Output:</strong> 16\n<strong>Explanation:</strong> The winning strategy is as follows:\n- The range is [1,10]. Guess 7.\n&nbsp;   - If this is my number, your total is $0. Otherwise, you pay $7.\n&nbsp;   - If my number is higher, the range is [8,10]. Guess 9.\n&nbsp;       - If this is my number, your total is $7. Otherwise, you pay $9.\n&nbsp;       - If my number is higher, it must be 10. Guess 10. Your total is $7 + $9 = $16.\n&nbsp;       - If my number is lower, it must be 8. Guess 8. Your total is $7 + $9 = $16.\n&nbsp;   - If my number is lower, the range is [1,6]. Guess 3.\n&nbsp;       - If this is my number, your total is $7. Otherwise, you pay $3.\n&nbsp;       - If my number is higher, the range is [4,6]. Guess 5.\n&nbsp;           - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $5.\n&nbsp;           - If my number is higher, it must be 6. Guess 6. Your total is $7 + $3 + $5 = $15.\n&nbsp;           - If my number is lower, it must be 4. Guess 4. Your total is $7 + $3 + $5 = $15.\n&nbsp;       - If my number is lower, the range is [1,2]. Guess 1.\n&nbsp;           - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $1.\n&nbsp;           - If my number is higher, it must be 2. Guess 2. Your total is $7 + $3 + $1 = $11.\nThe worst case in all these scenarios is that you pay $16. Hence, you only need $16 to guarantee a win.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong>&nbsp;There is only one possible number, so you can guess 1 and not have to pay anything.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>&nbsp;There are two possible numbers, 1 and 2.\n- Guess 1.\n&nbsp;   - If this is my number, your total is $0. Otherwise, you pay $1.\n&nbsp;   - If my number is higher, it must be 2. Guess 2. Your total is $1.\nThe worst case is that you pay $1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 37,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Game Theory"
    ],
    "hints": [
      "The best strategy to play the game is to minimize the maximum loss you could possibly face. Another strategy is to minimize the expected loss. Here, we are interested in the <b>first</b> scenario.",
      "Take a small example (n = 3). What do you end up paying in the worst case?",
      "Check out <a href=\"https://en.wikipedia.org/wiki/Minimax\">this article</a> if you're still stuck.",
      "The purely recursive implementation of minimax would be worthless for even a small n. You MUST use dynamic programming.",
      "As a follow-up, how would you modify your code to solve the problem of minimizing the expected loss, instead of the worst-case loss?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "wiggle-subsequence",
    "title": "Wiggle Subsequence",
    "description": "<p>A <strong>wiggle sequence</strong> is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with one element and a sequence with two non-equal elements are trivially wiggle sequences.</p>\n\n<ul>\n\t<li>For example, <code>[1, 7, 4, 9, 2, 5]</code> is a <strong>wiggle sequence</strong> because the differences <code>(6, -3, 5, -7, 3)</code> alternate between positive and negative.</li>\n\t<li>In contrast, <code>[1, 4, 7, 2, 5]</code> and <code>[1, 7, 4, 5, 5]</code> are not wiggle sequences. The first is not because its first two differences are positive, and the second is not because its last difference is zero.</li>\n</ul>\n\n<p>A <strong>subsequence</strong> is obtained by deleting some elements (possibly zero) from the original sequence, leaving the remaining elements in their original order.</p>\n\n<p>Given an integer array <code>nums</code>, return <em>the length of the longest <strong>wiggle subsequence</strong> of </em><code>nums</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,7,4,9,2,5]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,17,5,10,13,15,10,5,16,8]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> There are several subsequences that achieve this length.\nOne is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,5,6,7,8,9]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you solve this in <code>O(n)</code> time?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "combination-sum-iv",
    "title": "Combination Sum IV",
    "description": "<p>Given an array of <strong>distinct</strong> integers <code>nums</code> and a target integer <code>target</code>, return <em>the number of possible combinations that add up to</em>&nbsp;<code>target</code>.</p>\n\n<p>The test cases are generated so that the answer can fit in a <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3], target = 4\n<strong>Output:</strong> 7\n<strong>Explanation:</strong>\nThe possible combination ways are:\n(1, 1, 1, 1)\n(1, 1, 2)\n(1, 2, 1)\n(1, 3)\n(2, 1, 1)\n(2, 2)\n(3, 1)\nNote that different sequences are counted as different combinations.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [9], target = 3\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>All the elements of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>1 &lt;= target &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "kth-smallest-element-in-a-sorted-matrix",
    "title": "Kth Smallest Element in a Sorted Matrix",
    "description": "<p>Given an <code>n x n</code> <code>matrix</code> where each of the rows and columns is sorted in ascending order, return <em>the</em> <code>k<sup>th</sup></code> <em>smallest element in the matrix</em>.</p>\n\n<p>Note that it is the <code>k<sup>th</sup></code> smallest element <strong>in the sorted order</strong>, not the <code>k<sup>th</sup></code> <strong>distinct</strong> element.</p>\n\n<p>You must find a solution with a memory complexity better than <code>O(n<sup>2</sup>)</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8\n<strong>Output:</strong> 13\n<strong>Explanation:</strong> The elements in the matrix are [1,5,9,10,11,12,13,<u><strong>13</strong></u>,15], and the 8<sup>th</sup> smallest number is 13\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> matrix = [[-5]], k = 1\n<strong>Output:</strong> -5\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == matrix.length == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>\n\t<li>All the rows and columns of <code>matrix</code> are <strong>guaranteed</strong> to be sorted in <strong>non-decreasing order</strong>.</li>\n\t<li><code>1 &lt;= k &lt;= n<sup>2</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>Could you solve the problem with a constant memory (i.e., <code>O(1)</code> memory complexity)?</li>\n\t<li>Could you solve the problem in <code>O(n)</code> time complexity? The solution may be too advanced for an interview but you may find reading <a href=\"http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf\" target=\"_blank\">this paper</a> fun.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "Array",
      "Binary Search",
      "Sorting",
      "Heap (Priority Queue)",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "insert-delete-getrandom-o1",
    "title": "Insert Delete GetRandom O(1)",
    "description": "<p>Implement the <code>RandomizedSet</code> class:</p>\n\n<ul>\n\t<li><code>RandomizedSet()</code> Initializes the <code>RandomizedSet</code> object.</li>\n\t<li><code>bool insert(int val)</code> Inserts an item <code>val</code> into the set if not present. Returns <code>true</code> if the item was not present, <code>false</code> otherwise.</li>\n\t<li><code>bool remove(int val)</code> Removes an item <code>val</code> from the set if present. Returns <code>true</code> if the item was present, <code>false</code> otherwise.</li>\n\t<li><code>int getRandom()</code> Returns a random element from the current set of elements (it&#39;s guaranteed that at least one element exists when this method is called). Each element must have the <b>same probability</b> of being returned.</li>\n</ul>\n\n<p>You must implement the functions of the class such that each function works in&nbsp;<strong>average</strong>&nbsp;<code>O(1)</code>&nbsp;time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;RandomizedSet&quot;, &quot;insert&quot;, &quot;remove&quot;, &quot;insert&quot;, &quot;getRandom&quot;, &quot;remove&quot;, &quot;insert&quot;, &quot;getRandom&quot;]\n[[], [1], [2], [2], [], [1], [2], []]\n<strong>Output</strong>\n[null, true, false, true, 2, true, false, 2]\n\n<strong>Explanation</strong>\nRandomizedSet randomizedSet = new RandomizedSet();\nrandomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.\nrandomizedSet.remove(2); // Returns false as 2 does not exist in the set.\nrandomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].\nrandomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.\nrandomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].\nrandomizedSet.insert(2); // 2 was already in the set, so return false.\nrandomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>At most <code>2 *&nbsp;</code><code>10<sup>5</sup></code> calls will be made to <code>insert</code>, <code>remove</code>, and <code>getRandom</code>.</li>\n\t<li>There will be <strong>at least one</strong> element in the data structure when <code>getRandom</code> is called.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 39,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math",
      "Design",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "insert-delete-getrandom-o1-duplicates-allowed",
    "title": "Insert Delete GetRandom O(1) - Duplicates allowed",
    "description": "<p><code>RandomizedCollection</code> is a data structure that contains a collection of numbers, possibly duplicates (i.e., a multiset). It should support inserting and removing specific elements and also reporting a random element.</p>\n\n<p>Implement the <code>RandomizedCollection</code> class:</p>\n\n<ul>\n\t<li><code>RandomizedCollection()</code> Initializes the empty <code>RandomizedCollection</code> object.</li>\n\t<li><code>bool insert(int val)</code> Inserts an item <code>val</code> into the multiset, even if the item is already present. Returns <code>true</code> if the item is not present, <code>false</code> otherwise.</li>\n\t<li><code>bool remove(int val)</code> Removes an item <code>val</code> from the multiset if present. Returns <code>true</code> if the item is present, <code>false</code> otherwise. Note that if <code>val</code> has multiple occurrences in the multiset, we only remove one of them.</li>\n\t<li><code>int getRandom()</code> Returns a random element from the current multiset of elements. The probability of each element being returned is <strong>linearly related</strong> to the number of the same values the multiset contains.</li>\n</ul>\n\n<p>You must implement the functions of the class such that each function works on <strong>average</strong> <code>O(1)</code> time complexity.</p>\n\n<p><strong>Note:</strong> The test cases are generated such that <code>getRandom</code> will only be called if there is <strong>at least one</strong> item in the <code>RandomizedCollection</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;RandomizedCollection&quot;, &quot;insert&quot;, &quot;insert&quot;, &quot;insert&quot;, &quot;getRandom&quot;, &quot;remove&quot;, &quot;getRandom&quot;]\n[[], [1], [1], [2], [], [1], []]\n<strong>Output</strong>\n[null, true, false, true, 2, true, 1]\n\n<strong>Explanation</strong>\nRandomizedCollection randomizedCollection = new RandomizedCollection();\nrandomizedCollection.insert(1);   // return true since the collection does not contain 1.\n                                  // Inserts 1 into the collection.\nrandomizedCollection.insert(1);   // return false since the collection contains 1.\n                                  // Inserts another 1 into the collection. Collection now contains [1,1].\nrandomizedCollection.insert(2);   // return true since the collection does not contain 2.\n                                  // Inserts 2 into the collection. Collection now contains [1,1,2].\nrandomizedCollection.getRandom(); // getRandom should:\n                                  // - return 1 with probability 2/3, or\n                                  // - return 2 with probability 1/3.\nrandomizedCollection.remove(1);   // return true since the collection contains 1.\n                                  // Removes 1 from the collection. Collection now contains [1,2].\nrandomizedCollection.getRandom(); // getRandom should return 1 or 2, both equally likely.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= val &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li>At most <code>2 * 10<sup>5</sup></code> calls <strong>in total</strong> will be made to <code>insert</code>, <code>remove</code>, and <code>getRandom</code>.</li>\n\t<li>There will be <strong>at least one</strong> element in the data structure when <code>getRandom</code> is called.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math",
      "Design",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "linked-list-random-node",
    "title": "Linked List Random Node",
    "description": "<p>Given a singly linked list, return a random node&#39;s value from the linked list. Each node must have the <strong>same probability</strong> of being chosen.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(ListNode head)</code> Initializes the object with the head of the singly-linked list <code>head</code>.</li>\n\t<li><code>int getRandom()</code> Chooses a node randomly from the list and returns its value. All the nodes of the list should be equally likely to be chosen.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/16/getrand-linked-list.jpg\" style=\"width: 302px; height: 62px;\" />\n<pre>\n<strong>Input</strong>\n[&quot;Solution&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;, &quot;getRandom&quot;]\n[[[1, 2, 3]], [], [], [], [], []]\n<strong>Output</strong>\n[null, 1, 3, 2, 2, 3]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([1, 2, 3]);\nsolution.getRandom(); // return 1\nsolution.getRandom(); // return 3\nsolution.getRandom(); // return 2\nsolution.getRandom(); // return 2\nsolution.getRandom(); // return 3\n// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the linked list will be in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>getRandom</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>What if the linked list is extremely large and its length is unknown to you?</li>\n\t<li>Could you solve this efficiently without using extra space?</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Linked List",
      "Math",
      "Reservoir Sampling",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "ransom-note",
    "title": "Ransom Note",
    "description": "<p>Given two strings <code>ransomNote</code> and <code>magazine</code>, return <code>true</code><em> if </em><code>ransomNote</code><em> can be constructed by using the letters from </em><code>magazine</code><em> and </em><code>false</code><em> otherwise</em>.</p>\n\n<p>Each letter in <code>magazine</code> can only be used once in <code>ransomNote</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> ransomNote = \"a\", magazine = \"b\"\n<strong>Output:</strong> false\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> ransomNote = \"aa\", magazine = \"ab\"\n<strong>Output:</strong> false\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> ransomNote = \"aa\", magazine = \"aab\"\n<strong>Output:</strong> true\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= ransomNote.length, magazine.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>ransomNote</code> and <code>magazine</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 36,
    "companyTags": [
      "Hash Table",
      "String",
      "Counting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "shuffle-an-array",
    "title": "Shuffle an Array",
    "description": "<p>Given an integer array <code>nums</code>, design an algorithm to randomly shuffle the array. All permutations of the array should be <strong>equally likely</strong> as a result of the shuffling.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(int[] nums)</code> Initializes the object with the integer array <code>nums</code>.</li>\n\t<li><code>int[] reset()</code> Resets the array to its original configuration and returns it.</li>\n\t<li><code>int[] shuffle()</code> Returns a random shuffling of the array.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Solution&quot;, &quot;shuffle&quot;, &quot;reset&quot;, &quot;shuffle&quot;]\n[[[1, 2, 3]], [], [], []]\n<strong>Output</strong>\n[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([1, 2, 3]);\nsolution.shuffle();    // Shuffle the array [1,2,3] and return its result.\n                       // Any permutation of [1,2,3] must be equally likely to be returned.\n                       // Example: return [3, 1, 2]\nsolution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]\nsolution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]\n\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 50</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>\n\t<li>All the elements of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>reset</code> and <code>shuffle</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Array",
      "Math",
      "Design",
      "Randomized"
    ],
    "hints": [
      "The solution expects that we always use the original array to shuffle() else some of the test cases fail. (Credits; @snehasingh31)"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "mini-parser",
    "title": "Mini Parser",
    "description": "<p>Given a string s represents the serialization of a nested list, implement a parser to deserialize it and return <em>the deserialized</em> <code>NestedInteger</code>.</p>\n\n<p>Each element is either an integer or a list whose elements may also be integers or other lists.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;324&quot;\n<strong>Output:</strong> 324\n<strong>Explanation:</strong> You should return a NestedInteger object which contains a single integer 324.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;[123,[456,[789]]]&quot;\n<strong>Output:</strong> [123,[456,[789]]]\n<strong>Explanation:</strong> Return a NestedInteger object containing a nested list with 2 elements:\n1. An integer containing value 123.\n2. A nested list containing two elements:\n    i.  An integer containing value 456.\n    ii. A nested list with one element:\n         a. An integer containing value 789\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of digits, square brackets <code>&quot;[]&quot;</code>, negative sign <code>&#39;-&#39;</code>, and commas <code>&#39;,&#39;</code>.</li>\n\t<li><code>s</code> is the serialization of valid <code>NestedInteger</code>.</li>\n\t<li>All the values in the input are in the range <code>[-10<sup>6</sup>, 10<sup>6</sup>]</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "String",
      "Stack",
      "Depth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "lexicographical-numbers",
    "title": "Lexicographical Numbers",
    "description": "<p>Given an integer <code>n</code>, return all the numbers in the range <code>[1, n]</code> sorted in lexicographical order.</p>\n\n<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and uses <code>O(1)</code> extra space.&nbsp;</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 13\n<strong>Output:</strong> [1,10,11,12,13,2,3,4,5,6,7,8,9]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> [1,2]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Depth-First Search",
      "Trie"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "first-unique-character-in-a-string",
    "title": "First Unique Character in a String",
    "description": "<p>Given a string <code>s</code>, find the <strong>first</strong> non-repeating character in it and return its index. If it <strong>does not</strong> exist, return <code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;leetcode&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">0</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>The character <code>&#39;l&#39;</code> at index 0 is the first character that does not occur at any other index.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;loveleetcode&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">2</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">s = &quot;aabb&quot;</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">-1</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of only lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 56,
    "companyTags": [
      "Hash Table",
      "String",
      "Queue",
      "Counting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-absolute-file-path",
    "title": "Longest Absolute File Path",
    "description": "<p>Suppose we have a file system that stores both files and directories. An example of one system is represented in the following picture:</p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/mdir.jpg\" style=\"width: 681px; height: 322px;\" /></p>\n\n<p>Here, we have <code>dir</code> as the only directory in the root. <code>dir</code> contains two subdirectories, <code>subdir1</code> and <code>subdir2</code>. <code>subdir1</code> contains a file <code>file1.ext</code> and subdirectory <code>subsubdir1</code>. <code>subdir2</code> contains a subdirectory <code>subsubdir2</code>, which contains a file <code>file2.ext</code>.</p>\n\n<p>In text form, it looks like this (with ⟶ representing the tab character):</p>\n\n<pre>\ndir\n⟶ subdir1\n⟶ ⟶ file1.ext\n⟶ ⟶ subsubdir1\n⟶ subdir2\n⟶ ⟶ subsubdir2\n⟶ ⟶ ⟶ file2.ext\n</pre>\n\n<p>If we were to write this representation in code, it will look like this: <code>&quot;dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext&quot;</code>. Note that the <code>&#39;\\n&#39;</code> and <code>&#39;\\t&#39;</code> are the new-line and tab characters.</p>\n\n<p>Every file and directory has a unique <strong>absolute path</strong> in the file system, which is the order of directories that must be opened to reach the file/directory itself, all concatenated by <code>&#39;/&#39;s</code>. Using the above example, the <strong>absolute path</strong> to <code>file2.ext</code> is <code>&quot;dir/subdir2/subsubdir2/file2.ext&quot;</code>. Each directory name consists of letters, digits, and/or spaces. Each file name is of the form <code>name.extension</code>, where <code>name</code> and <code>extension</code> consist of letters, digits, and/or spaces.</p>\n\n<p>Given a string <code>input</code> representing the file system in the explained format, return <em>the length of the <strong>longest absolute path</strong> to a <strong>file</strong> in the abstracted file system</em>. If there is no file in the system, return <code>0</code>.</p>\n\n<p><strong>Note</strong> that the testcases are generated such that the file system is valid and no file or directory name has length 0.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/dir1.jpg\" style=\"width: 401px; height: 202px;\" />\n<pre>\n<strong>Input:</strong> input = &quot;dir\\n\\tsubdir1\\n\\tsubdir2\\n\\t\\tfile.ext&quot;\n<strong>Output:</strong> 20\n<strong>Explanation:</strong> We have only one file, and the absolute path is &quot;dir/subdir2/file.ext&quot; of length 20.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/28/dir2.jpg\" style=\"width: 641px; height: 322px;\" />\n<pre>\n<strong>Input:</strong> input = &quot;dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext&quot;\n<strong>Output:</strong> 32\n<strong>Explanation:</strong> We have two files:\n&quot;dir/subdir1/file1.ext&quot; of length 21\n&quot;dir/subdir2/subsubdir2/file2.ext&quot; of length 32.\nWe return 32 since it is the longest absolute path to a file.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> input = &quot;a&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> We do not have any files, just a single directory named &quot;a&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= input.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>input</code> may contain lowercase or uppercase English letters, a new line character <code>&#39;\\n&#39;</code>, a tab character <code>&#39;\\t&#39;</code>, a dot <code>&#39;.&#39;</code>, a space <code>&#39; &#39;</code>, and digits.</li>\n\t<li>All file and directory names have <strong>positive</strong> length.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "String",
      "Stack",
      "Depth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-the-difference",
    "title": "Find the Difference",
    "description": "<p>You are given two strings <code>s</code> and <code>t</code>.</p>\n\n<p>String <code>t</code> is generated by random shuffling string <code>s</code> and then add one more letter at a random position.</p>\n\n<p>Return the letter that was added to <code>t</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;abcd&quot;, t = &quot;abcde&quot;\n<strong>Output:</strong> &quot;e&quot;\n<strong>Explanation:</strong> &#39;e&#39; is the letter that was added.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;&quot;, t = &quot;y&quot;\n<strong>Output:</strong> &quot;y&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>t.length == s.length + 1</code></li>\n\t<li><code>s</code> and <code>t</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 60,
    "companyTags": [
      "Hash Table",
      "String",
      "Bit Manipulation",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "elimination-game",
    "title": "Elimination Game",
    "description": "<p>You have a list <code>arr</code> of all integers in the range <code>[1, n]</code> sorted in a strictly increasing order. Apply the following algorithm on <code>arr</code>:</p>\n\n<ul>\n\t<li>Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.</li>\n\t<li>Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.</li>\n\t<li>Keep repeating the steps again, alternating left to right and right to left, until a single number remains.</li>\n</ul>\n\n<p>Given the integer <code>n</code>, return <em>the last number that remains in</em> <code>arr</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 9\n<strong>Output:</strong> 6\n<strong>Explanation:</strong>\narr = [<u>1</u>, 2, <u>3</u>, 4, <u>5</u>, 6, <u>7</u>, 8, <u>9</u>]\narr = [2, <u>4</u>, 6, <u>8</u>]\narr = [<u>2</u>, 6]\narr = [6]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 33,
    "companyTags": [
      "Math",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "perfect-rectangle",
    "title": "Perfect Rectangle",
    "description": "<p>Given an array <code>rectangles</code> where <code>rectangles[i] = [x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub>]</code> represents an axis-aligned rectangle. The bottom-left point of the rectangle is <code>(x<sub>i</sub>, y<sub>i</sub>)</code> and the top-right point of it is <code>(a<sub>i</sub>, b<sub>i</sub>)</code>.</p>\n\n<p>Return <code>true</code> <em>if all the rectangles together form an exact cover of a rectangular region</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/27/perectrec1-plane.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> All 5 rectangles together form an exact cover of a rectangular region.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/27/perfectrec2-plane.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Because there is a gap between the two rectangular regions.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/27/perfecrrec4-plane.jpg\" style=\"width: 300px; height: 294px;\" />\n<pre>\n<strong>Input:</strong> rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Because two of the rectangles overlap with each other.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= rectangles.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>rectangles[i].length == 4</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= x<sub>i</sub> &lt; a<sub>i</sub> &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= y<sub>i</sub> &lt; b<sub>i</sub> &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 41,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math",
      "Geometry",
      "Sweep Line"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "is-subsequence",
    "title": "Is Subsequence",
    "description": "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code><em> if </em><code>s</code><em> is a <strong>subsequence</strong> of </em><code>t</code><em>, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>A <strong>subsequence</strong> of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., <code>&quot;ace&quot;</code> is a subsequence of <code>&quot;<u>a</u>b<u>c</u>d<u>e</u>&quot;</code> while <code>&quot;aec&quot;</code> is not).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"abc\", t = \"ahbgdc\"\n<strong>Output:</strong> true\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"axc\", t = \"ahbgdc\"\n<strong>Output:</strong> false\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= t.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> and <code>t</code> consist only of lowercase English letters.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Suppose there are lots of incoming <code>s</code>, say <code>s<sub>1</sub>, s<sub>2</sub>, ..., s<sub>k</sub></code> where <code>k &gt;= 10<sup>9</sup></code>, and you want to check one by one to see if <code>t</code> has its subsequence. In this scenario, how would you change your code?",
    "difficulty": "Easy",
    "acceptanceRate": 46,
    "companyTags": [
      "Two Pointers",
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "utf-8-validation",
    "title": "UTF-8 Validation",
    "description": "<p>Given an integer array <code>data</code> representing the data, return whether it is a valid <strong>UTF-8</strong> encoding (i.e. it translates to a sequence of valid UTF-8 encoded characters).</p>\n\n<p>A character in <strong>UTF8</strong> can be from <strong>1 to 4 bytes</strong> long, subjected to the following rules:</p>\n\n<ol>\n\t<li>For a <strong>1-byte</strong> character, the first bit is a <code>0</code>, followed by its Unicode code.</li>\n\t<li>For an <strong>n-bytes</strong> character, the first <code>n</code> bits are all one&#39;s, the <code>n + 1</code> bit is <code>0</code>, followed by <code>n - 1</code> bytes with the most significant <code>2</code> bits being <code>10</code>.</li>\n</ol>\n\n<p>This is how the UTF-8 encoding would work:</p>\n\n<pre>\n     Number of Bytes   |        UTF-8 Octet Sequence\n                       |              (binary)\n   --------------------+-----------------------------------------\n            1          |   0xxxxxxx\n            2          |   110xxxxx 10xxxxxx\n            3          |   1110xxxx 10xxxxxx 10xxxxxx\n            4          |   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\n</pre>\n\n<p><code>x</code> denotes a bit in the binary form of a byte that may be either <code>0</code> or <code>1</code>.</p>\n\n<p><strong>Note: </strong>The input is an array of integers. Only the <strong>least significant 8 bits</strong> of each integer is used to store the data. This means each integer represents only 1 byte of data.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> data = [197,130,1]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> data represents the octet sequence: 11000101 10000010 00000001.\nIt is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> data = [235,140,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> data represented the octet sequence: 11101011 10001100 00000100.\nThe first 3 bits are all one&#39;s and the 4th bit is 0 means it is a 3-bytes character.\nThe next byte is a continuation byte which starts with 10 and that&#39;s correct.\nBut the second continuation byte does not start with 10, so it is invalid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= data.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= data[i] &lt;= 255</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Bit Manipulation"
    ],
    "hints": [
      "Read the data integer by integer. When you read it, process the least significant 8 bits of it.",
      "Assume the next encoding is 1-byte data. If it is not 1-byte data, read the next integer and assume it is 2-bytes data.",
      "Similarly, if it is not 2-bytes data, try 3-bytes then 4-bytes. If you read four integers and it still does not match any pattern, return false."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "decode-string",
    "title": "Decode String",
    "description": "<p>Given an encoded string, return its decoded string.</p>\n\n<p>The encoding rule is: <code>k[encoded_string]</code>, where the <code>encoded_string</code> inside the square brackets is being repeated exactly <code>k</code> times. Note that <code>k</code> is guaranteed to be a positive integer.</p>\n\n<p>You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, <code>k</code>. For example, there will not be input like <code>3a</code> or <code>2[4]</code>.</p>\n\n<p>The test cases are generated so that the length of the output will never exceed <code>10<sup>5</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;3[a]2[bc]&quot;\n<strong>Output:</strong> &quot;aaabcbc&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;3[a2[c]]&quot;\n<strong>Output:</strong> &quot;accaccacc&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;2[abc]3[cd]ef&quot;\n<strong>Output:</strong> &quot;abcabccdcdcdef&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 30</code></li>\n\t<li><code>s</code> consists of lowercase English letters, digits, and square brackets <code>&#39;[]&#39;</code>.</li>\n\t<li><code>s</code> is guaranteed to be <strong>a valid</strong> input.</li>\n\t<li>All the integers in <code>s</code> are in the range <code>[1, 300]</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 69,
    "companyTags": [
      "String",
      "Stack",
      "Recursion"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-substring-with-at-least-k-repeating-characters",
    "title": "Longest Substring with At Least K Repeating Characters",
    "description": "<p>Given a string <code>s</code> and an integer <code>k</code>, return <em>the length of the longest substring of</em> <code>s</code> <em>such that the frequency of each character in this substring is greater than or equal to</em> <code>k</code>.</p>\n\n<p data-pm-slice=\"1 1 []\">if no such substring exists, return 0.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;aaabb&quot;, k = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The longest substring is &quot;aaa&quot;, as &#39;a&#39; is repeated 3 times.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ababbc&quot;, k = 2\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The longest substring is &quot;ababb&quot;, as &#39;a&#39; is repeated 2 times and &#39;b&#39; is repeated 3 times.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of only lowercase English letters.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Hash Table",
      "String",
      "Divide and Conquer",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "rotate-function",
    "title": "Rotate Function",
    "description": "<p>You are given an integer array <code>nums</code> of length <code>n</code>.</p>\n\n<p>Assume <code>arr<sub>k</sub></code> to be an array obtained by rotating <code>nums</code> by <code>k</code> positions clock-wise. We define the <strong>rotation function</strong> <code>F</code> on <code>nums</code> as follow:</p>\n\n<ul>\n\t<li><code>F(k) = 0 * arr<sub>k</sub>[0] + 1 * arr<sub>k</sub>[1] + ... + (n - 1) * arr<sub>k</sub>[n - 1].</code></li>\n</ul>\n\n<p>Return <em>the maximum value of</em> <code>F(0), F(1), ..., F(n-1)</code>.</p>\n\n<p>The test cases are generated so that the answer fits in a <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,3,2,6]\n<strong>Output:</strong> 26\n<strong>Explanation:</strong>\nF(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25\nF(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16\nF(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23\nF(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26\nSo the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [100]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Math",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "integer-replacement",
    "title": "Integer Replacement",
    "description": "<p>Given a positive integer <code>n</code>,&nbsp;you can apply one of the following&nbsp;operations:</p>\n\n<ol>\n\t<li>If <code>n</code> is even, replace <code>n</code> with <code>n / 2</code>.</li>\n\t<li>If <code>n</code> is odd, replace <code>n</code> with either <code>n + 1</code> or <code>n - 1</code>.</li>\n</ol>\n\n<p>Return <em>the minimum number of operations needed for</em> <code>n</code> <em>to become</em> <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 8\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 8 -&gt; 4 -&gt; 2 -&gt; 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 7\n<strong>Output:</strong> 4\n<strong>Explanation: </strong>7 -&gt; 8 -&gt; 4 -&gt; 2 -&gt; 1\nor 7 -&gt; 6 -&gt; 3 -&gt; 2 -&gt; 1\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 43,
    "companyTags": [
      "Dynamic Programming",
      "Greedy",
      "Bit Manipulation",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "random-pick-index",
    "title": "Random Pick Index",
    "description": "<p>Given an integer array <code>nums</code> with possible <strong>duplicates</strong>, randomly output the index of a given <code>target</code> number. You can assume that the given target number must exist in the array.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(int[] nums)</code> Initializes the object with the array <code>nums</code>.</li>\n\t<li><code>int pick(int target)</code> Picks a random index <code>i</code> from <code>nums</code> where <code>nums[i] == target</code>. If there are multiple valid i&#39;s, then each index should have an equal probability of returning.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Solution&quot;, &quot;pick&quot;, &quot;pick&quot;, &quot;pick&quot;]\n[[[1, 2, 3, 3, 3]], [3], [1], [3]]\n<strong>Output</strong>\n[null, 4, 0, 2]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([1, 2, 3, 3, 3]);\nsolution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.\nsolution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.\nsolution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>target</code> is an integer from <code>nums</code>.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>pick</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 52,
    "companyTags": [
      "Hash Table",
      "Math",
      "Reservoir Sampling",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "evaluate-division",
    "title": "Evaluate Division",
    "description": "<p>You are given an array of variable pairs <code>equations</code> and an array of real numbers <code>values</code>, where <code>equations[i] = [A<sub>i</sub>, B<sub>i</sub>]</code> and <code>values[i]</code> represent the equation <code>A<sub>i</sub> / B<sub>i</sub> = values[i]</code>. Each <code>A<sub>i</sub></code> or <code>B<sub>i</sub></code> is a string that represents a single variable.</p>\n\n<p>You are also given some <code>queries</code>, where <code>queries[j] = [C<sub>j</sub>, D<sub>j</sub>]</code> represents the <code>j<sup>th</sup></code> query where you must find the answer for <code>C<sub>j</sub> / D<sub>j</sub> = ?</code>.</p>\n\n<p>Return <em>the answers to all queries</em>. If a single answer cannot be determined, return <code>-1.0</code>.</p>\n\n<p><strong>Note:</strong> The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.</p>\n\n<p><strong>Note:&nbsp;</strong>The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;]], values = [2.0,3.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;e&quot;],[&quot;a&quot;,&quot;a&quot;],[&quot;x&quot;,&quot;x&quot;]]\n<strong>Output:</strong> [6.00000,0.50000,-1.00000,1.00000,-1.00000]\n<strong>Explanation:</strong> \nGiven: <em>a / b = 2.0</em>, <em>b / c = 3.0</em>\nqueries are: <em>a / c = ?</em>, <em>b / a = ?</em>, <em>a / e = ?</em>, <em>a / a = ?</em>, <em>x / x = ? </em>\nreturn: [6.0, 0.5, -1.0, 1.0, -1.0 ]\nnote: x is undefined =&gt; -1.0</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;],[&quot;bc&quot;,&quot;cd&quot;]], values = [1.5,2.5,5.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;c&quot;,&quot;b&quot;],[&quot;bc&quot;,&quot;cd&quot;],[&quot;cd&quot;,&quot;bc&quot;]]\n<strong>Output:</strong> [3.75000,0.40000,5.00000,0.20000]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> equations = [[&quot;a&quot;,&quot;b&quot;]], values = [0.5], queries = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;c&quot;],[&quot;x&quot;,&quot;y&quot;]]\n<strong>Output:</strong> [0.50000,2.00000,-1.00000,-1.00000]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= equations.length &lt;= 20</code></li>\n\t<li><code>equations[i].length == 2</code></li>\n\t<li><code>1 &lt;= A<sub>i</sub>.length, B<sub>i</sub>.length &lt;= 5</code></li>\n\t<li><code>values.length == equations.length</code></li>\n\t<li><code>0.0 &lt; values[i] &lt;= 20.0</code></li>\n\t<li><code>1 &lt;= queries.length &lt;= 20</code></li>\n\t<li><code>queries[i].length == 2</code></li>\n\t<li><code>1 &lt;= C<sub>j</sub>.length, D<sub>j</sub>.length &lt;= 5</code></li>\n\t<li><code>A<sub>i</sub>, B<sub>i</sub>, C<sub>j</sub>, D<sub>j</sub></code> consist of lower case English letters and digits.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "String",
      "Depth-First Search",
      "Breadth-First Search",
      "Union-Find",
      "Graph Theory",
      "Shortest Path"
    ],
    "hints": [
      "Do you recognize this as a graph problem?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "nth-digit",
    "title": "Nth Digit",
    "description": "<p>Given an integer <code>n</code>, return the <code>n<sup>th</sup></code> digit of the infinite integer sequence <code>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 11\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The 11<sup>th</sup> digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 35,
    "companyTags": [
      "Math",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "binary-watch",
    "title": "Binary Watch",
    "description": "<p>A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent&nbsp;the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.</p>\n\n<ul>\n\t<li>For example, the below binary watch reads <code>&quot;4:51&quot;</code>.</li>\n</ul>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/08/binarywatch.jpg\" style=\"width: 500px; height: 500px;\" /></p>\n\n<p>Given an integer <code>turnedOn</code> which represents the number of LEDs that are currently on (ignoring the PM), return <em>all possible times the watch could represent</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>The hour must not contain a leading zero.</p>\n\n<ul>\n\t<li>For example, <code>&quot;01:00&quot;</code> is not valid. It should be <code>&quot;1:00&quot;</code>.</li>\n</ul>\n\n<p>The minute must&nbsp;consist of two digits and may contain a leading zero.</p>\n\n<ul>\n\t<li>For example, <code>&quot;10:2&quot;</code> is not valid. It should be <code>&quot;10:02&quot;</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> turnedOn = 1\n<strong>Output:</strong> [\"0:01\",\"0:02\",\"0:04\",\"0:08\",\"0:16\",\"0:32\",\"1:00\",\"2:00\",\"4:00\",\"8:00\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> turnedOn = 9\n<strong>Output:</strong> []\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= turnedOn &lt;= 10</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 39,
    "companyTags": [
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [
      "Simplify by seeking for solutions that involve comparing set bit counts.",
      "Consider precomputing all possible times for comparison."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "remove-k-digits",
    "title": "Remove K Digits",
    "description": "<p>Given string num representing a non-negative integer <code>num</code>, and an integer <code>k</code>, return <em>the smallest possible integer after removing</em> <code>k</code> <em>digits from</em> <code>num</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = &quot;1432219&quot;, k = 3\n<strong>Output:</strong> &quot;1219&quot;\n<strong>Explanation:</strong> Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = &quot;10200&quot;, k = 1\n<strong>Output:</strong> &quot;200&quot;\n<strong>Explanation:</strong> Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = &quot;10&quot;, k = 2\n<strong>Output:</strong> &quot;0&quot;\n<strong>Explanation:</strong> Remove all the digits from the number and it is left with nothing which is 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= num.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>num</code> consists of only digits.</li>\n\t<li><code>num</code> does not have any leading zeros except for the zero itself.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "String",
      "Stack",
      "Greedy",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "frog-jump",
    "title": "Frog Jump",
    "description": "<p>A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.</p>\n\n<p>Given a list of <code>stones</code>&nbsp;positions (in units) in sorted <strong>ascending order</strong>, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be <code>1</code> unit.</p>\n\n<p>If the frog&#39;s last jump was <code>k</code> units, its next jump must be either <code>k - 1</code>, <code>k</code>, or <code>k + 1</code> units. The frog can only jump in the forward direction.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [0,1,3,5,6,8,12,17]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> stones = [0,1,2,3,4,8,9,11]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= stones.length &lt;= 2000</code></li>\n\t<li><code>0 &lt;= stones[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>stones[0] == 0</code></li>\n\t<li><code>stones</code>&nbsp;is sorted in a strictly increasing order.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 58,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sum-of-left-leaves",
    "title": "Sum of Left Leaves",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the sum of all left leaves.</em></p>\n\n<p>A <strong>leaf</strong> is a node with no children. A <strong>left leaf</strong> is a leaf that is the left child of another node.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg\" style=\"width: 277px; height: 302px;\" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 24\n<strong>Explanation:</strong> There are two left leaves in the binary tree, with values 9 and 15 respectively.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 51,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "convert-a-number-to-hexadecimal",
    "title": "Convert a Number to Hexadecimal",
    "description": "<p>Given a 32-bit integer <code>num</code>, return <em>a string representing its hexadecimal representation</em>. For negative integers, <a href=\"https://en.wikipedia.org/wiki/Two%27s_complement\" target=\"_blank\">two&rsquo;s complement</a> method is used.</p>\n\n<p>All the letters in the answer string should be lowercase characters, and there should not be any leading zeros in the answer except for the zero itself.</p>\n\n<p><strong>Note:&nbsp;</strong>You are not allowed to use any built-in library method to directly solve this problem.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> num = 26\n<strong>Output:</strong> \"1a\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> num = -1\n<strong>Output:</strong> \"ffffffff\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 39,
    "companyTags": [
      "Math",
      "String",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "queue-reconstruction-by-height",
    "title": "Queue Reconstruction by Height",
    "description": "<p>You are given an array of people, <code>people</code>, which are the attributes of some people in a queue (not necessarily in order). Each <code>people[i] = [h<sub>i</sub>, k<sub>i</sub>]</code> represents the <code>i<sup>th</sup></code> person of height <code>h<sub>i</sub></code> with <strong>exactly</strong> <code>k<sub>i</sub></code> other people in front who have a height greater than or equal to <code>h<sub>i</sub></code>.</p>\n\n<p>Reconstruct and return <em>the queue that is represented by the input array </em><code>people</code>. The returned queue should be formatted as an array <code>queue</code>, where <code>queue[j] = [h<sub>j</sub>, k<sub>j</sub>]</code> is the attributes of the <code>j<sup>th</sup></code> person in the queue (<code>queue[0]</code> is the person at the front of the queue).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\n<strong>Output:</strong> [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]\n<strong>Explanation:</strong>\nPerson 0 has height 5 with no other people taller or the same height in front.\nPerson 1 has height 7 with no other people taller or the same height in front.\nPerson 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.\nPerson 3 has height 6 with one person taller or the same height in front, which is person 1.\nPerson 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.\nPerson 5 has height 7 with one person taller or the same height in front, which is person 1.\nHence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]\n<strong>Output:</strong> [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= people.length &lt;= 2000</code></li>\n\t<li><code>0 &lt;= h<sub>i</sub> &lt;= 10<sup>6</sup></code></li>\n\t<li><code>0 &lt;= k<sub>i</sub> &lt; people.length</code></li>\n\t<li>It is guaranteed that the queue can be reconstructed.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 30,
    "companyTags": [
      "Array",
      "Binary Indexed Tree",
      "Segment Tree",
      "Sorting"
    ],
    "hints": [
      "What can you say about the position of the shortest person? </br>\r\nIf the position of the shortest person is <i>i</i>, how many people would be in front of the shortest person?",
      "Once you fix the position of the shortest person, what can you say about the position of the second shortest person?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "trapping-rain-water-ii",
    "title": "Trapping Rain Water II",
    "description": "<p>Given an <code>m x n</code> integer matrix <code>heightMap</code> representing the height of each unit cell in a 2D elevation map, return <em>the volume of water it can trap after raining</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/08/trap1-3d.jpg\" style=\"width: 361px; height: 321px;\" />\n<pre>\n<strong>Input:</strong> heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> After the rain, water is trapped between the blocks.\nWe have two small ponds 1 and 3 units trapped.\nThe total volume of water trapped is 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/08/trap2-3d.jpg\" style=\"width: 401px; height: 321px;\" />\n<pre>\n<strong>Input:</strong> heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]\n<strong>Output:</strong> 10\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == heightMap.length</code></li>\n\t<li><code>n == heightMap[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= heightMap[i][j] &lt;= 2 * 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 33,
    "companyTags": [
      "Array",
      "Breadth-First Search",
      "Heap (Priority Queue)",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "valid-word-abbreviation",
    "title": "Valid Word Abbreviation",
    "description": "Description not available.",
    "difficulty": "Easy",
    "acceptanceRate": 62,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-palindrome",
    "title": "Longest Palindrome",
    "description": "<p>Given a string <code>s</code> which consists of lowercase or uppercase letters, return the length of the <strong>longest <span data-keyword=\"palindrome-string\">palindrome</span></strong>&nbsp;that can be built with those letters.</p>\n\n<p>Letters are <strong>case sensitive</strong>, for example, <code>&quot;Aa&quot;</code> is not considered a palindrome.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;abccccdd&quot;\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> One longest palindrome that can be built is &quot;dccaccd&quot;, whose length is 7.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;a&quot;\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The longest palindrome that can be built is &quot;a&quot;, whose length is 1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 2000</code></li>\n\t<li><code>s</code> consists of lowercase <strong>and/or</strong> uppercase English&nbsp;letters only.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 31,
    "companyTags": [
      "Hash Table",
      "String",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "split-array-largest-sum",
    "title": "Split Array Largest Sum",
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, split <code>nums</code> into <code>k</code> non-empty subarrays such that the largest sum of any subarray is <strong>minimized</strong>.</p>\n\n<p>Return <em>the minimized largest sum of the split</em>.</p>\n\n<p>A <strong>subarray</strong> is a contiguous part of the array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [7,2,5,10,8], k = 2\n<strong>Output:</strong> 18\n<strong>Explanation:</strong> There are four ways to split nums into two subarrays.\nThe best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,5], k = 2\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> There are four ways to split nums into two subarrays.\nThe best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>\n\t<li><code>1 &lt;= k &lt;= min(50, nums.length)</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 44,
    "companyTags": [
      "Array",
      "Binary Search",
      "Dynamic Programming",
      "Greedy",
      "Prefix Sum"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "fizz-buzz",
    "title": "Fizz Buzz",
    "description": "<p>Given an integer <code>n</code>, return <em>a string array </em><code>answer</code><em> (<strong>1-indexed</strong>) where</em>:</p>\n\n<ul>\n\t<li><code>answer[i] == &quot;FizzBuzz&quot;</code> if <code>i</code> is divisible by <code>3</code> and <code>5</code>.</li>\n\t<li><code>answer[i] == &quot;Fizz&quot;</code> if <code>i</code> is divisible by <code>3</code>.</li>\n\t<li><code>answer[i] == &quot;Buzz&quot;</code> if <code>i</code> is divisible by <code>5</code>.</li>\n\t<li><code>answer[i] == i</code> (as a string) if none of the above conditions are true.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 3\n<strong>Output:</strong> [\"1\",\"2\",\"Fizz\"]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 5\n<strong>Output:</strong> [\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> n = 15\n<strong>Output:</strong> [\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\",\"Fizz\",\"7\",\"8\",\"Fizz\",\"Buzz\",\"11\",\"Fizz\",\"13\",\"14\",\"FizzBuzz\"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 37,
    "companyTags": [
      "Math",
      "String",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "arithmetic-slices",
    "title": "Arithmetic Slices",
    "description": "<p>An integer array is called arithmetic if it consists of <strong>at least three elements</strong> and if the difference between any two consecutive elements is the same.</p>\n\n<ul>\n\t<li>For example, <code>[1,3,5,7,9]</code>, <code>[7,7,7,7]</code>, and <code>[3,-1,-5,-9]</code> are arithmetic sequences.</li>\n</ul>\n\n<p>Given an integer array <code>nums</code>, return <em>the number of arithmetic <strong>subarrays</strong> of</em> <code>nums</code>.</p>\n\n<p>A <strong>subarray</strong> is a contiguous subsequence of the array.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "third-maximum-number",
    "title": "Third Maximum Number",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the <strong>third distinct maximum</strong> number in this array. If the third maximum does not exist, return the <strong>maximum</strong> number</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nThe first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nThe first distinct maximum is 2.\nThe second distinct maximum is 1.\nThe third distinct maximum does not exist, so the maximum (2) is returned instead.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,2,3,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong>\nThe first distinct maximum is 3.\nThe second distinct maximum is 2 (both 2&#39;s are counted together since they have the same value).\nThe third distinct maximum is 1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Can you find an <code>O(n)</code> solution?",
    "difficulty": "Easy",
    "acceptanceRate": 69,
    "companyTags": [
      "Array",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "add-strings",
    "title": "Add Strings",
    "description": "<p>Given two non-negative integers, <code>num1</code> and <code>num2</code> represented as string, return <em>the sum of</em> <code>num1</code> <em>and</em> <code>num2</code> <em>as a string</em>.</p>\n\n<p>You must solve the problem without using any built-in library for handling large integers (such as <code>BigInteger</code>). You must also not convert the inputs to integers directly.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num1 = &quot;11&quot;, num2 = &quot;123&quot;\n<strong>Output:</strong> &quot;134&quot;\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num1 = &quot;456&quot;, num2 = &quot;77&quot;\n<strong>Output:</strong> &quot;533&quot;\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> num1 = &quot;0&quot;, num2 = &quot;0&quot;\n<strong>Output:</strong> &quot;0&quot;\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num1.length, num2.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>num1</code> and <code>num2</code> consist of only digits.</li>\n\t<li><code>num1</code> and <code>num2</code> don&#39;t have any leading zeros except for the zero itself.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 40,
    "companyTags": [
      "Math",
      "String",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "partition-equal-subset-sum",
    "title": "Partition Equal Subset Sum",
    "description": "<p>Given an integer array <code>nums</code>, return <code>true</code> <em>if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,11,5]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The array can be partitioned as [1, 5, 5] and [11].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,5]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The array cannot be partitioned into equal sum subsets.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 51,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "pacific-atlantic-water-flow",
    "title": "Pacific Atlantic Water Flow",
    "description": "<p>There is an <code>m x n</code> rectangular island that borders both the <strong>Pacific Ocean</strong> and <strong>Atlantic Ocean</strong>. The <strong>Pacific Ocean</strong> touches the island&#39;s left and top edges, and the <strong>Atlantic Ocean</strong> touches the island&#39;s right and bottom edges.</p>\n\n<p>The island is partitioned into a grid of square cells. You are given an <code>m x n</code> integer matrix <code>heights</code> where <code>heights[r][c]</code> represents the <strong>height above sea level</strong> of the cell at coordinate <code>(r, c)</code>.</p>\n\n<p>The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell&#39;s height is <strong>less than or equal to</strong> the current cell&#39;s height. Water can flow from any cell adjacent to an ocean into the ocean.</p>\n\n<p>Return <em>a <strong>2D list</strong> of grid coordinates </em><code>result</code><em> where </em><code>result[i] = [r<sub>i</sub>, c<sub>i</sub>]</code><em> denotes that rain water can flow from cell </em><code>(r<sub>i</sub>, c<sub>i</sub>)</code><em> to <strong>both</strong> the Pacific and Atlantic oceans</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg\" style=\"width: 400px; height: 400px;\" />\n<pre>\n<strong>Input:</strong> heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\n<strong>Output:</strong> [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\n<strong>Explanation:</strong> The following cells can flow to the Pacific and Atlantic oceans, as shown below:\n[0,4]: [0,4] -&gt; Pacific Ocean \n&nbsp;      [0,4] -&gt; Atlantic Ocean\n[1,3]: [1,3] -&gt; [0,3] -&gt; Pacific Ocean \n&nbsp;      [1,3] -&gt; [1,4] -&gt; Atlantic Ocean\n[1,4]: [1,4] -&gt; [1,3] -&gt; [0,3] -&gt; Pacific Ocean \n&nbsp;      [1,4] -&gt; Atlantic Ocean\n[2,2]: [2,2] -&gt; [1,2] -&gt; [0,2] -&gt; Pacific Ocean \n&nbsp;      [2,2] -&gt; [2,3] -&gt; [2,4] -&gt; Atlantic Ocean\n[3,0]: [3,0] -&gt; Pacific Ocean \n&nbsp;      [3,0] -&gt; [4,0] -&gt; Atlantic Ocean\n[3,1]: [3,1] -&gt; [3,0] -&gt; Pacific Ocean \n&nbsp;      [3,1] -&gt; [4,1] -&gt; Atlantic Ocean\n[4,0]: [4,0] -&gt; Pacific Ocean \n       [4,0] -&gt; Atlantic Ocean\nNote that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> heights = [[1]]\n<strong>Output:</strong> [[0,0]]\n<strong>Explanation:</strong> The water can flow from the only cell to the Pacific and Atlantic oceans.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == heights.length</code></li>\n\t<li><code>n == heights[r].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= heights[r][c] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "battleships-in-a-board",
    "title": "Battleships in a Board",
    "description": "<p>Given an <code>m x n</code> matrix <code>board</code> where each cell is a battleship <code>&#39;X&#39;</code> or empty <code>&#39;.&#39;</code>, return <em>the number of the <strong>battleships</strong> on</em> <code>board</code>.</p>\n\n<p><strong>Battleships</strong> can only be placed horizontally or vertically on <code>board</code>. In other words, they can only be made of the shape <code>1 x k</code> (<code>1</code> row, <code>k</code> columns) or <code>k x 1</code> (<code>k</code> rows, <code>1</code> column), where <code>k</code> can be of any size. At least one horizontal or vertical cell separates between two battleships (i.e., there are no adjacent battleships).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img height=\"333\" src=\"https://assets.leetcode.com/uploads/2024/06/21/image.png\" width=\"333\" />\n<pre>\n<strong>Input:</strong> board = [[&quot;X&quot;,&quot;.&quot;,&quot;.&quot;,&quot;X&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;X&quot;],[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;X&quot;]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = [[&quot;.&quot;]]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>board[i][j]</code> is either <code>&#39;.&#39;</code> or <code>&#39;X&#39;</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do it in one-pass, using only <code>O(1)</code> extra memory and without modifying the values <code>board</code>?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Depth-First Search",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "strong-password-checker",
    "title": "Strong Password Checker",
    "description": "<p>A password is considered strong if the below conditions are all met:</p>\n\n<ul>\n\t<li>It has at least <code>6</code> characters and at most <code>20</code> characters.</li>\n\t<li>It contains at least <strong>one lowercase</strong> letter, at least <strong>one uppercase</strong> letter, and at least <strong>one digit</strong>.</li>\n\t<li>It does not contain three repeating characters in a row (i.e., <code>&quot;B<u><strong>aaa</strong></u>bb0&quot;</code> is weak, but <code>&quot;B<strong><u>aa</u></strong>b<u><strong>a</strong></u>0&quot;</code> is strong).</li>\n</ul>\n\n<p>Given a string <code>password</code>, return <em>the minimum number of steps required to make <code>password</code> strong. if <code>password</code> is already strong, return <code>0</code>.</em></p>\n\n<p>In one step, you can:</p>\n\n<ul>\n\t<li>Insert one character to <code>password</code>,</li>\n\t<li>Delete one character from <code>password</code>, or</li>\n\t<li>Replace one character of <code>password</code> with another character.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> password = \"a\"\n<strong>Output:</strong> 5\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> password = \"aA1\"\n<strong>Output:</strong> 3\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> password = \"1337C0d3\"\n<strong>Output:</strong> 0\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= password.length &lt;= 50</code></li>\n\t<li><code>password</code> consists of letters, digits, dot&nbsp;<code>&#39;.&#39;</code> or exclamation mark <code>&#39;!&#39;</code>.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 40,
    "companyTags": [
      "String",
      "Greedy",
      "Heap (Priority Queue)"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "maximum-xor-of-two-numbers-in-an-array",
    "title": "Maximum XOR of Two Numbers in an Array",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the maximum result of </em><code>nums[i] XOR nums[j]</code>, where <code>0 &lt;= i &lt;= j &lt; n</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,10,5,25,2,8]\n<strong>Output:</strong> 28\n<strong>Explanation:</strong> The maximum result is 5 XOR 25 = 28.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [14,70,53,83,49,91,36,80,92,51,66,70]\n<strong>Output:</strong> 127\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "Hash Table",
      "Bit Manipulation",
      "Trie"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reconstruct-original-digits-from-english",
    "title": "Reconstruct Original Digits from English",
    "description": "<p>Given a string <code>s</code> containing an out-of-order English representation of digits <code>0-9</code>, return <em>the digits in <strong>ascending</strong> order</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"owoztneoer\"\n<strong>Output:</strong> \"012\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"fviefuro\"\n<strong>Output:</strong> \"45\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is one of the characters <code>[&quot;e&quot;,&quot;g&quot;,&quot;f&quot;,&quot;i&quot;,&quot;h&quot;,&quot;o&quot;,&quot;n&quot;,&quot;s&quot;,&quot;r&quot;,&quot;u&quot;,&quot;t&quot;,&quot;w&quot;,&quot;v&quot;,&quot;x&quot;,&quot;z&quot;]</code>.</li>\n\t<li><code>s</code> is <strong>guaranteed</strong> to be valid.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "description": "<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p>\n\n<p>Return <em>the length of the longest substring containing the same letter you can get after performing the above operations</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;ABAB&quot;, k = 2\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the two &#39;A&#39;s with two &#39;B&#39;s or vice versa.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;AABABBA&quot;, k = 1\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the one &#39;A&#39; in the middle with &#39;B&#39; and form &quot;AABBBBA&quot;.\nThe substring &quot;BBBB&quot; has the longest repeating letters, which is 4.\nThere may exists other ways to achieve this answer too.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of only uppercase English letters.</li>\n\t<li><code>0 &lt;= k &lt;= s.length</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "construct-quad-tree",
    "title": "Construct Quad Tree",
    "description": "<p>Given a <code>n * n</code> matrix <code>grid</code> of <code>0&#39;s</code> and <code>1&#39;s</code> only. We want to represent <code>grid</code> with a Quad-Tree.</p>\n\n<p>Return <em>the root of the Quad-Tree representing </em><code>grid</code>.</p>\n\n<p>A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:</p>\n\n<ul>\n\t<li><code>val</code>: True if the node represents a grid of 1&#39;s or False if the node represents a grid of 0&#39;s. Notice that you can assign the <code>val</code> to True or False when <code>isLeaf</code> is False, and both are accepted in the answer.</li>\n\t<li><code>isLeaf</code>: True if the node is a leaf node on the tree or False if the node has four children.</li>\n</ul>\n\n<pre>\nclass Node {\n    public boolean val;\n    public boolean isLeaf;\n    public Node topLeft;\n    public Node topRight;\n    public Node bottomLeft;\n    public Node bottomRight;\n}</pre>\n\n<p>We can construct a Quad-Tree from a two-dimensional area using the following steps:</p>\n\n<ol>\n\t<li>If the current grid has the same value (i.e all <code>1&#39;s</code> or all <code>0&#39;s</code>) set <code>isLeaf</code> True and set <code>val</code> to the value of the grid and set the four children to Null and stop.</li>\n\t<li>If the current grid has different values, set <code>isLeaf</code> to False and set <code>val</code> to any value and divide the current grid into four sub-grids as shown in the photo.</li>\n\t<li>Recurse for each of the children with the proper sub-grid.</li>\n</ol>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/02/11/new_top.png\" style=\"width: 777px; height: 181px;\" />\n<p>If you want to know more about the Quad-Tree, you can refer to the <a href=\"https://en.wikipedia.org/wiki/Quadtree\">wiki</a>.</p>\n\n<p><strong>Quad-Tree format:</strong></p>\n\n<p>You don&#39;t need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where <code>null</code> signifies a path terminator where no node exists below.</p>\n\n<p>It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list <code>[isLeaf, val]</code>.</p>\n\n<p>If the value of <code>isLeaf</code> or <code>val</code> is True we represent it as <strong>1</strong> in the list <code>[isLeaf, val]</code> and if the value of <code>isLeaf</code> or <code>val</code> is False we represent it as <strong>0</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/02/11/grid1.png\" style=\"width: 777px; height: 99px;\" />\n<pre>\n<strong>Input:</strong> grid = [[0,1],[1,0]]\n<strong>Output:</strong> [[0,1],[1,0],[1,1],[1,1],[1,0]]\n<strong>Explanation:</strong> The explanation of this example is shown below:\nNotice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/02/12/e1tree.png\" style=\"width: 777px; height: 186px;\" />\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/02/12/e2mat.png\" style=\"width: 777px; height: 343px;\" /></p>\n\n<pre>\n<strong>Input:</strong> grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]\n<strong>Output:</strong> [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]\n<strong>Explanation:</strong> All values in the grid are not the same. We divide the grid into four sub-grids.\nThe topLeft, bottomLeft and bottomRight each has the same value.\nThe topRight have different values so we divide it into 4 sub-grids where each has the same value.\nExplanation is shown in the photo below:\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/02/12/e2tree.png\" style=\"width: 777px; height: 328px;\" />\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == grid.length == grid[i].length</code></li>\n\t<li><code>n == 2<sup>x</sup></code> where <code>0 &lt;= x &lt;= 6</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 67,
    "companyTags": [
      "Array",
      "Divide and Conquer",
      "Tree",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "n-ary-tree-level-order-traversal",
    "title": "N-ary Tree Level Order Traversal",
    "description": "<p>Given an n-ary tree, return the <em>level order</em> traversal of its nodes&#39; values.</p>\n\n<p><em>Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<p><img src=\"https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png\" style=\"width: 100%; max-width: 300px;\" /></p>\n\n<pre>\n<strong>Input:</strong> root = [1,null,3,2,4,null,5,6]\n<strong>Output:</strong> [[1],[3,2,4],[5,6]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<p><img alt=\"\" src=\"https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png\" style=\"width: 296px; height: 241px;\" /></p>\n\n<pre>\n<strong>Input:</strong> root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\n<strong>Output:</strong> [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The height of the n-ary tree is less than or equal to <code>1000</code></li>\n\t<li>The total number of nodes is between <code>[0, 10<sup>4</sup>]</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Tree",
      "Breadth-First Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "flatten-a-multilevel-doubly-linked-list",
    "title": "Flatten a Multilevel Doubly Linked List",
    "description": "<p>You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional <strong>child pointer</strong>. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a <strong>multilevel data structure</strong> as shown in the example below.</p>\n\n<p>Given the <code>head</code> of the first level of the list, <strong>flatten</strong> the list so that all the nodes appear in a single-level, doubly linked list. Let <code>curr</code> be a node with a child list. The nodes in the child list should appear <strong>after</strong> <code>curr</code> and <strong>before</strong> <code>curr.next</code> in the flattened list.</p>\n\n<p>Return <em>the </em><code>head</code><em> of the flattened list. The nodes in the list must have <strong>all</strong> of their child pointers set to </em><code>null</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/11/09/flatten11.jpg\" style=\"width: 700px; height: 339px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]\n<strong>Output:</strong> [1,2,3,7,8,11,12,9,10,4,5,6]\n<strong>Explanation:</strong> The multilevel linked list in the input is shown.\nAfter flattening the multilevel linked list it becomes:\n<img src=\"https://assets.leetcode.com/uploads/2021/11/09/flatten12.jpg\" style=\"width: 1000px; height: 69px;\" />\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/11/09/flatten2.1jpg\" style=\"width: 200px; height: 200px;\" />\n<pre>\n<strong>Input:</strong> head = [1,2,null,3]\n<strong>Output:</strong> [1,3,2]\n<strong>Explanation:</strong> The multilevel linked list in the input is shown.\nAfter flattening the multilevel linked list it becomes:\n<img src=\"https://assets.leetcode.com/uploads/2021/11/24/list.jpg\" style=\"width: 300px; height: 87px;\" />\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> head = []\n<strong>Output:</strong> []\n<strong>Explanation:</strong> There could be empty list in the input.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of Nodes will not exceed <code>1000</code>.</li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>How the multilevel linked list is represented in test cases:</strong></p>\n\n<p>We use the multilevel linked list from <strong>Example 1</strong> above:</p>\n\n<pre>\n 1---2---3---4---5---6--NULL\n         |\n         7---8---9---10--NULL\n             |\n             11--12--NULL</pre>\n\n<p>The serialization of each level is as follows:</p>\n\n<pre>\n[1,2,3,4,5,6,null]\n[7,8,9,10,null]\n[11,12,null]\n</pre>\n\n<p>To serialize all levels together, we will add nulls in each level to signify no node connects to the upper node of the previous level. The serialization becomes:</p>\n\n<pre>\n[1,    2,    3, 4, 5, 6, null]\n             |\n[null, null, 7,    8, 9, 10, null]\n                   |\n[            null, 11, 12, null]\n</pre>\n\n<p>Merging the serialization of each level and removing trailing nulls we obtain:</p>\n\n<pre>\n[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]\n</pre>\n",
    "difficulty": "Medium",
    "acceptanceRate": 35,
    "companyTags": [
      "Linked List",
      "Depth-First Search",
      "Doubly-Linked List"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-all-numbers-disappeared-in-an-array",
    "title": "Find All Numbers Disappeared in an Array",
    "description": "<p>Given an array <code>nums</code> of <code>n</code> integers where <code>nums[i]</code> is in the range <code>[1, n]</code>, return <em>an array of all the integers in the range</em> <code>[1, n]</code> <em>that do not appear in</em> <code>nums</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [4,3,2,7,8,2,3,1]\n<strong>Output:</strong> [5,6]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1]\n<strong>Output:</strong> [2]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= n</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do it without extra space and in <code>O(n)</code> runtime? You may assume the returned list does not count as extra space.</p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 36,
    "companyTags": [
      "Array",
      "Hash Table"
    ],
    "hints": [
      "This is a really easy problem if you decide to use additional memory. For those trying to write an initial solution using additional memory, think <b>counters!</b>",
      "However, the trick really is to not use any additional space than what is already available to use. Sometimes, multiple passes over the input array help find the solution. However, there's an interesting piece of information in this problem that makes it easy to re-use the input array itself for the solution.",
      "The problem specifies that the numbers in the array will be in the range [1, n] where n is the number of elements in the array. Can we use this information and modify the array in-place somehow to find what we need?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sort-characters-by-frequency",
    "title": "Sort Characters By Frequency",
    "description": "<p>Given a string <code>s</code>, sort it in <strong>decreasing order</strong> based on the <strong>frequency</strong> of the characters. The <strong>frequency</strong> of a character is the number of times it appears in the string.</p>\n\n<p>Return <em>the sorted string</em>. If there are multiple answers, return <em>any of them</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;tree&quot;\n<strong>Output:</strong> &quot;eert&quot;\n<strong>Explanation:</strong> &#39;e&#39; appears twice while &#39;r&#39; and &#39;t&#39; both appear once.\nSo &#39;e&#39; must appear before both &#39;r&#39; and &#39;t&#39;. Therefore &quot;eetr&quot; is also a valid answer.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cccaaa&quot;\n<strong>Output:</strong> &quot;aaaccc&quot;\n<strong>Explanation:</strong> Both &#39;c&#39; and &#39;a&#39; appear three times, so both &quot;cccaaa&quot; and &quot;aaaccc&quot; are valid answers.\nNote that &quot;cacaca&quot; is incorrect, as the same characters must be together.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;Aabb&quot;\n<strong>Output:</strong> &quot;bbAa&quot;\n<strong>Explanation:</strong> &quot;bbaA&quot; is also a valid answer, but &quot;Aabb&quot; is incorrect.\nNote that &#39;A&#39; and &#39;a&#39; are treated as two different characters.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of uppercase and lowercase English letters and digits.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 61,
    "companyTags": [
      "Hash Table",
      "String",
      "Sorting",
      "Heap (Priority Queue)",
      "Bucket Sort",
      "Counting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-number-of-arrows-to-burst-balloons",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "description": "<p>There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array <code>points</code> where <code>points[i] = [x<sub>start</sub>, x<sub>end</sub>]</code> denotes a balloon whose <strong>horizontal diameter</strong> stretches between <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code>. You do not know the exact y-coordinates of the balloons.</p>\n\n<p>Arrows can be shot up <strong>directly vertically</strong> (in the positive y-direction) from different points along the x-axis. A balloon with <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code> is <strong>burst</strong> by an arrow shot at <code>x</code> if <code>x<sub>start</sub> &lt;= x &lt;= x<sub>end</sub></code>. There is <strong>no limit</strong> to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.</p>\n\n<p>Given the array <code>points</code>, return <em>the <strong>minimum</strong> number of arrows that must be shot to burst all balloons</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[10,16],[2,8],[1,6],[7,12]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].\n- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[1,2],[3,4],[5,6],[7,8]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One arrow needs to be shot for each balloon for a total of 4 arrows.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[1,2],[2,3],[3,4],[4,5]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].\n- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= points.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>points[i].length == 2</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= x<sub>start</sub> &lt; x<sub>end</sub> &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Array",
      "Greedy",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "minimum-moves-to-equal-array-elements",
    "title": "Minimum Moves to Equal Array Elements",
    "description": "<p>Given an integer array <code>nums</code> of size <code>n</code>, return <em>the minimum number of moves required to make all array elements equal</em>.</p>\n\n<p>In one move, you can increment <code>n - 1</code> elements of the array by <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Only three moves are needed (remember each move increments two elements):\n[1,2,3]  =&gt;  [2,3,3]  =&gt;  [3,4,3]  =&gt;  [4,4,4]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>The answer is guaranteed to fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "4sum-ii",
    "title": "4Sum II",
    "description": "<p>Given four integer arrays <code>nums1</code>, <code>nums2</code>, <code>nums3</code>, and <code>nums4</code> all of length <code>n</code>, return the number of tuples <code>(i, j, k, l)</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= i, j, k, l &lt; n</code></li>\n\t<li><code>nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nThe two tuples are:\n1. (0, 0, 0, 1) -&gt; nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0\n2. (1, 1, 0, 0) -&gt; nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums1.length</code></li>\n\t<li><code>n == nums2.length</code></li>\n\t<li><code>n == nums3.length</code></li>\n\t<li><code>n == nums4.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n\t<li><code>-2<sup>28</sup> &lt;= nums1[i], nums2[i], nums3[i], nums4[i] &lt;= 2<sup>28</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Hash Table"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "assign-cookies",
    "title": "Assign Cookies",
    "description": "<p>Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.</p>\n\n<p>Each child <code>i</code> has a greed factor <code>g[i]</code>, which is the minimum size of a cookie that the child will be content with; and each cookie <code>j</code> has a size <code>s[j]</code>. If <code>s[j] &gt;= g[i]</code>, we can assign the cookie <code>j</code> to the child <code>i</code>, and the child <code>i</code> will be content. Your goal is to maximize the number of your content children and output the maximum number.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> g = [1,2,3], s = [1,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. \nAnd even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.\nYou need to output 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> g = [1,2], s = [1,2,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. \nYou have 3 cookies and their sizes are big enough to gratify all of the children, \nYou need to output 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= g.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= g[i], s[j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as <a href=\"https://leetcode.com/problems/maximum-matching-of-players-with-trainers/description/\" target=\"_blank\"> 2410: Maximum Matching of Players With Trainers.</a></p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 51,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Greedy",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "132-pattern",
    "title": "132 Pattern",
    "description": "<p>Given an array of <code>n</code> integers <code>nums</code>, a <strong>132 pattern</strong> is a subsequence of three integers <code>nums[i]</code>, <code>nums[j]</code> and <code>nums[k]</code> such that <code>i &lt; j &lt; k</code> and <code>nums[i] &lt; nums[k] &lt; nums[j]</code>.</p>\n\n<p>Return <code>true</code><em> if there is a <strong>132 pattern</strong> in </em><code>nums</code><em>, otherwise, return </em><code>false</code><em>.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no 132 pattern in the sequence.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,1,4,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a 132 pattern in the sequence: [1, 4, 2].\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,3,2,0]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 44,
    "companyTags": [
      "Array",
      "Binary Search",
      "Stack",
      "Monotonic Stack",
      "Ordered Set"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "circular-array-loop",
    "title": "Circular Array Loop",
    "description": "<p>You are playing a game involving a <strong>circular</strong> array of non-zero integers <code>nums</code>. Each <code>nums[i]</code> denotes the number of indices forward/backward you must move if you are located at index <code>i</code>:</p>\n\n<ul>\n\t<li>If <code>nums[i]</code> is positive, move <code>nums[i]</code> steps <strong>forward</strong>, and</li>\n\t<li>If <code>nums[i]</code> is negative, move <code>abs(nums[i])</code> steps <strong>backward</strong>.</li>\n</ul>\n\n<p>Since the array is <strong>circular</strong>, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.</p>\n\n<p>A <strong>cycle</strong> in the array consists of a sequence of indices <code>seq</code> of length <code>k</code> where:</p>\n\n<ul>\n\t<li>Following the movement rules above results in the repeating index sequence <code>seq[0] -&gt; seq[1] -&gt; ... -&gt; seq[k - 1] -&gt; seq[0] -&gt; ...</code></li>\n\t<li>Every <code>nums[seq[j]]</code> is either <strong>all positive</strong> or <strong>all negative</strong>.</li>\n\t<li><code>k &gt; 1</code></li>\n</ul>\n\n<p>Return <code>true</code><em> if there is a <strong>cycle</strong> in </em><code>nums</code><em>, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/09/01/img1.jpg\" style=\"width: 402px; height: 289px;\" />\n<pre>\n<strong>Input:</strong> nums = [2,-1,1,2,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nWe can see the cycle 0 --&gt; 2 --&gt; 3 --&gt; 0 --&gt; ..., and all of its nodes are white (jumping in the same direction).\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/09/01/img2.jpg\" style=\"width: 402px; height: 390px;\" />\n<pre>\n<strong>Input:</strong> nums = [-1,-2,-3,-4,-5,6]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nThe only cycle is of size 1, so we return false.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2022/09/01/img3.jpg\" style=\"width: 497px; height: 242px;\" />\n<pre>\n<strong>Input:</strong> nums = [1,-1,5,1,4]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nWe can see the cycle 0 --&gt; 1 --&gt; 0 --&gt; ..., and while it is of size &gt; 1, it has a node jumping forward and a node jumping backward, so <strong>it is not a cycle</strong>.\nWe can see the cycle 3 --&gt; 4 --&gt; 3 --&gt; ..., and all of its nodes are white (jumping in the same direction).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>nums[i] != 0</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you solve it in <code>O(n)</code> time complexity and <code>O(1)</code> extra space complexity?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 62,
    "companyTags": [
      "Array",
      "Hash Table",
      "Two Pointers"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "poor-pigs",
    "title": "Poor Pigs",
    "description": "<p>There are <code>buckets</code> buckets of liquid, where <strong>exactly one</strong> of the buckets is poisonous. To figure out which one is poisonous, you feed some number of (poor) pigs the liquid to see whether they will die or not. Unfortunately, you only have <code>minutesToTest</code> minutes to determine which bucket is poisonous.</p>\n\n<p>You can feed the pigs according to these steps:</p>\n\n<ol>\n\t<li>Choose some live pigs to feed.</li>\n\t<li>For each pig, choose which buckets to feed it. The pig will consume all the chosen buckets simultaneously and will take no time. Each pig can feed from any number of buckets, and each bucket can be fed from by any number of pigs.</li>\n\t<li>Wait for <code>minutesToDie</code> minutes. You may <strong>not</strong> feed any other pigs during this time.</li>\n\t<li>After <code>minutesToDie</code> minutes have passed, any pigs that have been fed the poisonous bucket will die, and all others will survive.</li>\n\t<li>Repeat this process until you run out of time.</li>\n</ol>\n\n<p>Given <code>buckets</code>, <code>minutesToDie</code>, and <code>minutesToTest</code>, return <em>the <strong>minimum</strong> number of pigs needed to figure out which bucket is poisonous within the allotted time</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> buckets = 4, minutesToDie = 15, minutesToTest = 15\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> We can determine the poisonous bucket as follows:\nAt time 0, feed the first pig buckets 1 and 2, and feed the second pig buckets 2 and 3.\nAt time 15, there are 4 possible outcomes:\n- If only the first pig dies, then bucket 1 must be poisonous.\n- If only the second pig dies, then bucket 3 must be poisonous.\n- If both pigs die, then bucket 2 must be poisonous.\n- If neither pig dies, then bucket 4 must be poisonous.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> buckets = 4, minutesToDie = 15, minutesToTest = 30\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> We can determine the poisonous bucket as follows:\nAt time 0, feed the first pig bucket 1, and feed the second pig bucket 2.\nAt time 15, there are 2 possible outcomes:\n- If either pig dies, then the poisonous bucket is the one it was fed.\n- If neither pig dies, then feed the first pig bucket 3, and feed the second pig bucket 4.\nAt time 30, one of the two pigs must die, and the poisonous bucket is the one it was fed.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= buckets &lt;= 1000</code></li>\n\t<li><code>1 &lt;=&nbsp;minutesToDie &lt;=&nbsp;minutesToTest &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 64,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Combinatorics"
    ],
    "hints": [
      "What if you only have one shot? Eg. 4 buckets, 15 mins to die, and 15 mins to test.",
      "How many states can we generate with x pigs and T tests?",
      "Find minimum <code>x</code> such that <code>(T+1)^x >= N</code>"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "description": "<p>Given an array of intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, return <em>the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping</em>.</p>\n\n<p><strong>Note</strong> that intervals which only touch at a point are <strong>non-overlapping</strong>. For example, <code>[1, 2]</code> and <code>[2, 3]</code> are non-overlapping.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[2,3],[3,4],[1,3]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> [1,3] can be removed and the rest of the intervals are non-overlapping.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[1,2],[1,2]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You need to remove two [1,2] to make the rest of the intervals non-overlapping.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2],[2,3]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> You don&#39;t need to remove any of the intervals since they&#39;re already non-overlapping.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>-5 * 10<sup>4</sup> &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 5 * 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Greedy",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-right-interval",
    "title": "Find Right Interval",
    "description": "<p>You are given an array of <code>intervals</code>, where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> and each <code>start<sub>i</sub></code> is <strong>unique</strong>.</p>\n\n<p>The <strong>right interval</strong> for an interval <code>i</code> is an interval <code>j</code> such that <code>start<sub>j</sub> &gt;= end<sub>i</sub></code> and <code>start<sub>j</sub></code> is <strong>minimized</strong>. Note that <code>i</code> may equal <code>j</code>.</p>\n\n<p>Return <em>an array of <strong>right interval</strong> indices for each interval <code>i</code></em>. If no <strong>right interval</strong> exists for interval <code>i</code>, then put <code>-1</code> at index <code>i</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,2]]\n<strong>Output:</strong> [-1]\n<strong>Explanation:</strong> There is only one interval in the collection, so it outputs -1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[3,4],[2,3],[1,2]]\n<strong>Output:</strong> [-1,0,1]\n<strong>Explanation:</strong> There is no right interval for [3,4].\nThe right interval for [2,3] is [3,4] since start<sub>0</sub> = 3 is the smallest start that is &gt;= end<sub>1</sub> = 3.\nThe right interval for [1,2] is [2,3] since start<sub>1</sub> = 2 is the smallest start that is &gt;= end<sub>2</sub> = 2.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> intervals = [[1,4],[2,3],[3,4]]\n<strong>Output:</strong> [-1,2,-1]\n<strong>Explanation:</strong> There is no right interval for [1,4] and [3,4].\nThe right interval for [2,3] is [3,4] since start<sub>2</sub> = 3 is the smallest start that is &gt;= end<sub>1</sub> = 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>6</sup></code></li>\n\t<li>The start point of each interval is <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 51,
    "companyTags": [
      "Array",
      "Binary Search",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "path-sum-iii",
    "title": "Path Sum III",
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <em>the number of paths where the sum of the values&nbsp;along the path equals</em>&nbsp;<code>targetSum</code>.</p>\n\n<p>The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg\" style=\"width: 450px; height: 386px;\" />\n<pre>\n<strong>Input:</strong> root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The paths that sum to 8 are shown.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 1000]</code>.</li>\n\t<li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-1000 &lt;= targetSum &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 45,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-all-anagrams-in-a-string",
    "title": "Find All Anagrams in a String",
    "description": "<p>Given two strings <code>s</code> and <code>p</code>, return an array of all the start indices of <code>p</code>&#39;s <span data-keyword=\"anagram\">anagrams</span> in <code>s</code>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;cbaebabacd&quot;, p = &quot;abc&quot;\n<strong>Output:</strong> [0,6]\n<strong>Explanation:</strong>\nThe substring with start index = 0 is &quot;cba&quot;, which is an anagram of &quot;abc&quot;.\nThe substring with start index = 6 is &quot;bac&quot;, which is an anagram of &quot;abc&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;abab&quot;, p = &quot;ab&quot;\n<strong>Output:</strong> [0,1,2]\n<strong>Explanation:</strong>\nThe substring with start index = 0 is &quot;ab&quot;, which is an anagram of &quot;ab&quot;.\nThe substring with start index = 1 is &quot;ba&quot;, which is an anagram of &quot;ab&quot;.\nThe substring with start index = 2 is &quot;ab&quot;, which is an anagram of &quot;ab&quot;.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, p.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> and <code>p</code> consist of lowercase English letters.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "k-th-smallest-in-lexicographical-order",
    "title": "K-th Smallest in Lexicographical Order",
    "description": "<p>Given two integers <code>n</code> and <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>lexicographically smallest integer in the range</em> <code>[1, n]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 13, k = 2\n<strong>Output:</strong> 10\n<strong>Explanation:</strong> The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1, k = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 44,
    "companyTags": [
      "Trie"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "arranging-coins",
    "title": "Arranging Coins",
    "description": "<p>You have <code>n</code> coins and you want to build a staircase with these coins. The staircase consists of <code>k</code> rows where the <code>i<sup>th</sup></code> row has exactly <code>i</code> coins. The last row of the staircase <strong>may be</strong> incomplete.</p>\n\n<p>Given the integer <code>n</code>, return <em>the number of <strong>complete rows</strong> of the staircase you will build</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/arrangecoins1-grid.jpg\" style=\"width: 253px; height: 253px;\" />\n<pre>\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Because the 3<sup>rd</sup> row is incomplete, we return 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/arrangecoins2-grid.jpg\" style=\"width: 333px; height: 333px;\" />\n<pre>\n<strong>Input:</strong> n = 8\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Because the 4<sup>th</sup> row is incomplete, we return 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 36,
    "companyTags": [
      "Math",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-all-duplicates-in-an-array",
    "title": "Find All Duplicates in an Array",
    "description": "<p>Given an integer array <code>nums</code> of length <code>n</code> where all the integers of <code>nums</code> are in the range <code>[1, n]</code> and each integer appears <strong>at most</strong> <strong>twice</strong>, return <em>an array of all the integers that appears <strong>twice</strong></em>.</p>\n\n<p>You must write an algorithm that runs in <code>O(n)</code> time and uses only <em>constant</em> auxiliary space, excluding the space needed to store the output</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [4,3,2,7,8,2,3,1]\n<strong>Output:</strong> [2,3]\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong> [1]\n</pre><p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1]\n<strong>Output:</strong> []\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= n</code></li>\n\t<li>Each element in <code>nums</code> appears <strong>once</strong> or <strong>twice</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "string-compression",
    "title": "String Compression",
    "description": "<p>Given an array of characters <code>chars</code>, compress it using the following algorithm:</p>\n\n<p>Begin with an empty string <code>s</code>. For each group of <strong>consecutive repeating characters</strong> in <code>chars</code>:</p>\n\n<ul>\n\t<li>If the group&#39;s length is <code>1</code>, append the character to <code>s</code>.</li>\n\t<li>Otherwise, append the character followed by the group&#39;s length.</li>\n</ul>\n\n<p>The compressed string <code>s</code> <strong>should not be returned separately</strong>, but instead, be stored <strong>in the input character array <code>chars</code></strong>. Note that group lengths that are <code>10</code> or longer will be split into multiple characters in <code>chars</code>.</p>\n\n<p>After you are done <strong>modifying the input array,</strong> return <em>the new length of the array</em>.</p>\n\n<p>You must write an algorithm that uses only constant extra space.</p>\n\n<p><strong>Note: </strong>The characters in the array beyond the returned length do not matter and should be ignored.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> chars = [&quot;a&quot;,&quot;a&quot;,&quot;b&quot;,&quot;b&quot;,&quot;c&quot;,&quot;c&quot;,&quot;c&quot;]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The groups are &quot;aa&quot;, &quot;bb&quot;, and &quot;ccc&quot;. This compresses to &quot;a2b2c3&quot;.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> chars = [&quot;a&quot;]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The only group is &quot;a&quot;, which remains uncompressed since it&#39;s a single character.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> chars = [&quot;a&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;,&quot;b&quot;]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The groups are &quot;a&quot; and &quot;bbbbbbbbbbbb&quot;. This compresses to &quot;ab12&quot;.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= chars.length &lt;= 2000</code></li>\n\t<li><code>chars[i]</code> is a lowercase English letter, uppercase English letter, digit, or symbol.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [
      "How do you know if you are at the end of a consecutive group of characters?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "add-two-numbers-ii",
    "title": "Add Two Numbers II",
    "description": "<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p>\n\n<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/sumii-linked-list.jpg\" style=\"width: 523px; height: 342px;\" />\n<pre>\n<strong>Input:</strong> l1 = [7,2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [7,8,0,7]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [8,0,7]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> l1 = [0], l2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>It is guaranteed that the list represents a number that does not have leading zeros.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong>&nbsp;Could you solve it without reversing the input lists?</p>\n",
    "difficulty": "Medium",
    "acceptanceRate": 31,
    "companyTags": [
      "Linked List",
      "Math",
      "Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "number-of-boomerangs",
    "title": "Number of Boomerangs",
    "description": "<p>You are given <code>n</code> <code>points</code> in the plane that are all <strong>distinct</strong>, where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>. A <strong>boomerang</strong> is a tuple of points <code>(i, j, k)</code> such that the distance between <code>i</code> and <code>j</code> equals the distance between <code>i</code> and <code>k</code> <strong>(the order of the tuple matters)</strong>.</p>\n\n<p>Return <em>the number of boomerangs</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[0,0],[1,0],[2,0]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[1,1],[2,2],[3,3]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> points = [[1,1]]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == points.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 500</code></li>\n\t<li><code>points[i].length == 2</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n\t<li>All the points are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 42,
    "companyTags": [
      "Array",
      "Hash Table",
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-largest-value-in-each-tree-row",
    "title": "Find Largest Value in Each Tree Row",
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>an array of the largest value in each row</em> of the tree <strong>(0-indexed)</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/21/largest_e1.jpg\" style=\"width: 300px; height: 172px;\" />\n<pre>\n<strong>Input:</strong> root = [1,3,2,5,3,null,9]\n<strong>Output:</strong> [1,3,9]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> [1,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree will be in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 46,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "matchsticks-to-square",
    "title": "Matchsticks to Square",
    "description": "<p>You are given an integer array <code>matchsticks</code> where <code>matchsticks[i]</code> is the length of the <code>i<sup>th</sup></code> matchstick. You want to use <strong>all the matchsticks</strong> to make one square. You <strong>should not break</strong> any stick, but you can link them up, and each matchstick must be used <strong>exactly one time</strong>.</p>\n\n<p>Return <code>true</code> if you can make this square and <code>false</code> otherwise.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/09/matchsticks1-grid.jpg\" style=\"width: 253px; height: 253px;\" />\n<pre>\n<strong>Input:</strong> matchsticks = [1,1,2,2,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> You can form a square with length 2, one side of the square came two sticks with length 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> matchsticks = [3,3,3,3,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> You cannot find a way to form a square with all the matchsticks.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= matchsticks.length &lt;= 15</code></li>\n\t<li><code>1 &lt;= matchsticks[i] &lt;= 10<sup>8</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 53,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Backtracking",
      "Bit Manipulation",
      "Bitmask"
    ],
    "hints": [
      "Treat the matchsticks as an array. Can we split the array into 4 equal parts?",
      "Every matchstick can belong to either of the 4 sides. We don't know which one. Maybe try out all options!",
      "For every matchstick, we have to try out each of the 4 options i.e. which side it can belong to. We can make use of recursion for this.",
      "We don't really need to keep track of which matchsticks belong to a particular side during recursion. We just need to keep track of the <b>length</b> of each of the 4 sides.",
      "When all matchsticks have been used we simply need to see the length of all 4 sides. If they're equal, we have a square on our hands!"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "ones-and-zeroes",
    "title": "Ones and Zeroes",
    "description": "<p>You are given an array of binary strings <code>strs</code> and two integers <code>m</code> and <code>n</code>.</p>\n\n<p>Return <em>the size of the largest subset of <code>strs</code> such that there are <strong>at most</strong> </em><code>m</code><em> </em><code>0</code><em>&#39;s and </em><code>n</code><em> </em><code>1</code><em>&#39;s in the subset</em>.</p>\n\n<p>A set <code>x</code> is a <strong>subset</strong> of a set <code>y</code> if all elements of <code>x</code> are also elements of <code>y</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;10&quot;,&quot;0001&quot;,&quot;111001&quot;,&quot;1&quot;,&quot;0&quot;], m = 5, n = 3\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The largest subset with at most 5 0&#39;s and 3 1&#39;s is {&quot;10&quot;, &quot;0001&quot;, &quot;1&quot;, &quot;0&quot;}, so the answer is 4.\nOther valid but smaller subsets include {&quot;0001&quot;, &quot;1&quot;} and {&quot;10&quot;, &quot;1&quot;, &quot;0&quot;}.\n{&quot;111001&quot;} is an invalid subset because it contains 4 1&#39;s, greater than the maximum of 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> strs = [&quot;10&quot;,&quot;0&quot;,&quot;1&quot;], m = 1, n = 1\n<strong>Output:</strong> 2\n<b>Explanation:</b> The largest subset is {&quot;0&quot;, &quot;1&quot;}, so the answer is 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 600</code></li>\n\t<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code> consists only of digits <code>&#39;0&#39;</code> and <code>&#39;1&#39;</code>.</li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "Array",
      "String",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "heaters",
    "title": "Heaters",
    "description": "<p>Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.</p>\n\n<p>Every house can be warmed, as long as the house is within the heater&#39;s warm radius range.&nbsp;</p>\n\n<p>Given the positions of <code>houses</code> and <code>heaters</code> on a horizontal line, return <em>the minimum radius standard of heaters&nbsp;so that those heaters could cover all houses.</em></p>\n\n<p><strong>Notice</strong> that&nbsp;all the <code>heaters</code> follow your radius standard, and the warm radius will be the same.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> houses = [1,2,3], heaters = [2]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> houses = [1,2,3,4], heaters = [1,4]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The two heaters were placed at positions 1 and 4. We need to use a radius 1 standard, then all the houses can be warmed.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> houses = [1,5], heaters = [2]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= houses.length, heaters.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= houses[i], heaters[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 41,
    "companyTags": [
      "Array",
      "Two Pointers",
      "Binary Search",
      "Sorting"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "number-complement",
    "title": "Number Complement",
    "description": "<p>The <strong>complement</strong> of an integer is the integer you get when you flip all the <code>0</code>&#39;s to <code>1</code>&#39;s and all the <code>1</code>&#39;s to <code>0</code>&#39;s in its binary representation.</p>\n\n<ul>\n\t<li>For example, The integer <code>5</code> is <code>&quot;101&quot;</code> in binary and its <strong>complement</strong> is <code>&quot;010&quot;</code> which is the integer <code>2</code>.</li>\n</ul>\n\n<p>Given an integer <code>num</code>, return <em>its complement</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 5\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt; 2<sup>31</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 1009: <a href=\"https://leetcode.com/problems/complement-of-base-10-integer/\" target=\"_blank\">https://leetcode.com/problems/complement-of-base-10-integer/</a></p>\n",
    "difficulty": "Easy",
    "acceptanceRate": 57,
    "companyTags": [
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "total-hamming-distance",
    "title": "Total Hamming Distance",
    "description": "<p>The <a href=\"https://en.wikipedia.org/wiki/Hamming_distance\" target=\"_blank\">Hamming distance</a> between two integers is the number of positions at which the corresponding bits are different.</p>\n\n<p>Given an integer array <code>nums</code>, return <em>the sum of <strong>Hamming distances</strong> between all the pairs of the integers in</em> <code>nums</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,14,2]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just\nshowing the four bits relevant in this case).\nThe answer will be:\nHammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,14,4]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>The answer for the given input will fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 38,
    "companyTags": [
      "Array",
      "Math",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "generate-random-point-in-a-circle",
    "title": "Generate Random Point in a Circle",
    "description": "<p>Given the radius and the position of the center of a circle, implement the function <code>randPoint</code> which generates a uniform random point inside the circle.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(double radius, double x_center, double y_center)</code> initializes the object with the radius of the circle <code>radius</code> and the position of the center <code>(x_center, y_center)</code>.</li>\n\t<li><code>randPoint()</code> returns a random point inside the circle. A point on the circumference of the circle is considered to be in the circle. The answer is returned as an array <code>[x, y]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input</strong>\n[&quot;Solution&quot;, &quot;randPoint&quot;, &quot;randPoint&quot;, &quot;randPoint&quot;]\n[[1.0, 0.0, 0.0], [], [], []]\n<strong>Output</strong>\n[null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution(1.0, 0.0, 0.0);\nsolution.randPoint(); // return [-0.02493, -0.38077]\nsolution.randPoint(); // return [0.82314, 0.38945]\nsolution.randPoint(); // return [0.36572, 0.17248]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;&nbsp;radius &lt;= 10<sup>8</sup></code></li>\n\t<li><code>-10<sup>7</sup> &lt;= x_center, y_center &lt;= 10<sup>7</sup></code></li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>randPoint</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 58,
    "companyTags": [
      "Math",
      "Geometry",
      "Rejection Sampling",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "largest-palindrome-product",
    "title": "Largest Palindrome Product",
    "description": "<p>Given an integer n, return <em>the <strong>largest palindromic integer</strong> that can be represented as the product of two <code>n</code>-digits integers</em>. Since the answer can be very large, return it <strong>modulo</strong> <code>1337</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 987\nExplanation: 99 x 91 = 9009, 9009 % 1337 = 987\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 33,
    "companyTags": [
      "Math",
      "Enumeration"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "sliding-window-median",
    "title": "Sliding Window Median",
    "description": "<p>The <strong>median</strong> is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.</p>\n\n<ul>\n\t<li>For examples, if <code>arr = [2,<u>3</u>,4]</code>, the median is <code>3</code>.</li>\n\t<li>For examples, if <code>arr = [1,<u>2,3</u>,4]</code>, the median is <code>(2 + 3) / 2 = 2.5</code>.</li>\n</ul>\n\n<p>You are given an integer array <code>nums</code> and an integer <code>k</code>. There is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>\n\n<p>Return <em>the median array for each window in the original array</em>. Answers within <code>10<sup>-5</sup></code> of the actual value will be accepted.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3\n<strong>Output:</strong> [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]\n<strong>Explanation:</strong> \nWindow position                Median\n---------------                -----\n[<strong>1  3  -1</strong>] -3  5  3  6  7        1\n 1 [<strong>3  -1  -3</strong>] 5  3  6  7       -1\n 1  3 [<strong>-1  -3  5</strong>] 3  6  7       -1\n 1  3  -1 [<strong>-3  5  3</strong>] 6  7        3\n 1  3  -1  -3 [<strong>5  3  6</strong>] 7        5\n 1  3  -1  -3  5 [<strong>3  6  7</strong>]       6\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,2,3,1,4,2], k = 3\n<strong>Output:</strong> [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 49,
    "companyTags": [
      "Array",
      "Hash Table",
      "Sliding Window",
      "Heap (Priority Queue)"
    ],
    "hints": [
      "The simplest of solutions comes from the basic idea of finding the median given a set of numbers. We know that by definition, a median is the center element (or an average of the two center elements). Given an unsorted list of numbers, how do we find the median element? If you know the answer to this question, can we extend this idea to every sliding window that we come across in the array?",
      "Is there a better way to do what we are doing in the above hint? Don't you think there is duplication of calculation being done there? Is there some sort of optimization that we can do to achieve the same result? This approach is merely a modification of the basic approach except that it simply reduces duplication of calculations once done.",
      "The third line of thought is also based on this same idea but achieving the result in a different way. We obviously need the window to be sorted for us to be able to find the median. Is there a data-structure out there that we can use (in one or more quantities) to obtain the median element extremely fast, say O(1) time while having the ability to perform the other operations fairly efficiently as well?"
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "magical-string",
    "title": "Magical String",
    "description": "<p>A magical string <code>s</code> consists of only <code>&#39;1&#39;</code> and <code>&#39;2&#39;</code> and obeys the following rule:</p>\n\n<ul>\n\t<li>Concatenating the sequence of lengths of its consecutive groups of identical characters <code>&#39;1&#39;</code> and <code>&#39;2&#39;</code> generates the string <code>s</code> itself.</li>\n</ul>\n\n<p>The first few elements of <code>s</code> is <code>s = &quot;1221121221221121122&hellip;&hellip;&quot;</code>. If we group the consecutive <code>1</code>&#39;s and <code>2</code>&#39;s in <code>s</code>, it will be <code>&quot;1 22 11 2 1 22 1 22 11 2 11 22 ......&quot;</code> and counting the occurrences of <code>1</code>&#39;s or <code>2</code>&#39;s in each group yields the sequence&nbsp;<code>&quot;1 2 2 1 1 2 1 2 2 1 2 2 ......&quot;</code>.</p>\n\n<p>You can see that concatenating the occurrence sequence gives us&nbsp;<code>s</code> itself.</p>\n\n<p>Given an integer <code>n</code>, return the number of <code>1</code>&#39;s in the first <code>n</code> number in the magical string <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 6\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The first 6 elements of magical string s is &quot;122112&quot; and it contains three 1&#39;s, so return 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Two Pointers",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "license-key-formatting",
    "title": "License Key Formatting",
    "description": "<p>You are given a license key represented as a string <code>s</code> that consists of only alphanumeric characters and dashes. The string is separated into <code>n + 1</code> groups by <code>n</code> dashes. You are also given an integer <code>k</code>.</p>\n\n<p>We want to reformat the string <code>s</code> such that each group contains exactly <code>k</code> characters, except for the first group, which could be shorter than <code>k</code> but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.</p>\n\n<p>Return <em>the reformatted license key</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;5F3Z-2e-9-w&quot;, k = 4\n<strong>Output:</strong> &quot;5F3Z-2E9W&quot;\n<strong>Explanation:</strong> The string s has been split into two parts, each part has 4 characters.\nNote that the two extra dashes are not needed and can be removed.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;2-5g-3-J&quot;, k = 2\n<strong>Output:</strong> &quot;2-5G-3J&quot;\n<strong>Explanation:</strong> The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of English letters, digits, and dashes <code>&#39;-&#39;</code>.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 33,
    "companyTags": [
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "smallest-good-base",
    "title": "Smallest Good Base",
    "description": "<p>Given an integer <code>n</code> represented as a string, return <em>the smallest <strong>good base</strong> of</em> <code>n</code>.</p>\n\n<p>We call <code>k &gt;= 2</code> a <strong>good base</strong> of <code>n</code>, if all digits of <code>n</code> base <code>k</code> are <code>1</code>&#39;s.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = &quot;13&quot;\n<strong>Output:</strong> &quot;3&quot;\n<strong>Explanation:</strong> 13 base 3 is 111.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = &quot;4681&quot;\n<strong>Output:</strong> &quot;8&quot;\n<strong>Explanation:</strong> 4681 base 8 is 11111.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = &quot;1000000000000000000&quot;\n<strong>Output:</strong> &quot;999999999999999999&quot;\n<strong>Explanation:</strong> 1000000000000000000 base 999999999999999999 is 11.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n</code> is an integer in the range <code>[3, 10<sup>18</sup>]</code>.</li>\n\t<li><code>n</code> does not contain any leading zeros.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 36,
    "companyTags": [
      "Math",
      "Binary Search"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-permutation",
    "title": "Find Permutation",
    "description": "Description not available.",
    "difficulty": "Medium",
    "acceptanceRate": 55,
    "companyTags": [
      "Array",
      "String",
      "Stack",
      "Greedy"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "max-consecutive-ones",
    "title": "Max Consecutive Ones",
    "description": "<p>Given a binary array <code>nums</code>, return <em>the maximum number of consecutive </em><code>1</code><em>&#39;s in the array</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,0,1,1,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,0,1,1,0,1]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums[i]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 41,
    "companyTags": [
      "Array"
    ],
    "hints": [
      "You need to think about two things as far as any window is concerned. One is the starting point for the window. How do you detect that a new window of 1s has started? The next part is detecting the ending point for this window.\r\n\r\nHow do you detect the ending point for an existing window? If you figure these two things out, you will be able to detect the windows of consecutive ones. All that remains afterward is to find the longest such window and return the size."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "predict-the-winner",
    "title": "Predict the Winner",
    "description": "<p>You are given an integer array <code>nums</code>. Two players are playing a game with this array: player 1 and player 2.</p>\n\n<p>Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of <code>0</code>. At each turn, the player takes one of the numbers from either end of the array (i.e., <code>nums[0]</code> or <code>nums[nums.length - 1]</code>) which reduces the size of the array by <code>1</code>. The player adds the chosen number to their score. The game ends when there are no more elements in the array.</p>\n\n<p>Return <code>true</code> if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return <code>true</code>. You may assume that both players are playing optimally.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,2]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Initially, player 1 can choose between 1 and 2. \nIf he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). \nSo, final score of player 1 is 1 + 2 = 3, and player 2 is 5. \nHence, player 1 will never be the winner and you need to return false.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,5,233,7]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Player 1 first chooses 1. Then player 2 has to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.\nFinally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 20</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 64,
    "companyTags": [
      "Array",
      "Math",
      "Dynamic Programming",
      "Recursion",
      "Game Theory"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "max-consecutive-ones-ii",
    "title": "Max Consecutive Ones II",
    "description": "Description not available.",
    "difficulty": "Medium",
    "acceptanceRate": 60,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Sliding Window"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "zuma-game",
    "title": "Zuma Game",
    "description": "<p>You are playing a variation of the game Zuma.</p>\n\n<p>In this variation of Zuma, there is a <strong>single row</strong> of colored balls on a board, where each ball can be colored red <code>&#39;R&#39;</code>, yellow <code>&#39;Y&#39;</code>, blue <code>&#39;B&#39;</code>, green <code>&#39;G&#39;</code>, or white <code>&#39;W&#39;</code>. You also have several colored balls in your hand.</p>\n\n<p>Your goal is to <strong>clear all</strong> of the balls from the board. On each turn:</p>\n\n<ul>\n\t<li>Pick <strong>any</strong> ball from your hand and insert it in between two balls in the row or on either end of the row.</li>\n\t<li>If there is a group of <strong>three or more consecutive balls</strong> of the <strong>same color</strong>, remove the group of balls from the board.\n\t<ul>\n\t\t<li>If this removal causes more groups of three or more of the same color to form, then continue removing each group until there are none left.</li>\n\t</ul>\n\t</li>\n\t<li>If there are no more balls on the board, then you win the game.</li>\n\t<li>Repeat this process until you either win or do not have any more balls in your hand.</li>\n</ul>\n\n<p>Given a string <code>board</code>, representing the row of balls on the board, and a string <code>hand</code>, representing the balls in your hand, return <em>the <strong>minimum</strong> number of balls you have to insert to clear all the balls from the board. If you cannot clear all the balls from the board using the balls in your hand, return </em><code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = &quot;WRRBBW&quot;, hand = &quot;RB&quot;\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> It is impossible to clear all the balls. The best you can do is:\n- Insert &#39;R&#39; so the board becomes WRR<u>R</u>BBW. W<u>RRR</u>BBW -&gt; WBBW.\n- Insert &#39;B&#39; so the board becomes WBB<u>B</u>W. W<u>BBB</u>W -&gt; WW.\nThere are still balls remaining on the board, and you are out of balls to insert.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = &quot;WWRRBBWW&quot;, hand = &quot;WRBRW&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> To make the board empty:\n- Insert &#39;R&#39; so the board becomes WWRR<u>R</u>BBWW. WW<u>RRR</u>BBWW -&gt; WWBBWW.\n- Insert &#39;B&#39; so the board becomes WWBB<u>B</u>WW. WW<u>BBB</u>WW -&gt; <u>WWWW</u> -&gt; empty.\n2 balls from your hand were needed to clear the board.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> board = &quot;G&quot;, hand = &quot;GGGGG&quot;\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> To make the board empty:\n- Insert &#39;G&#39; so the board becomes G<u>G</u>.\n- Insert &#39;G&#39; so the board becomes GG<u>G</u>. <u>GGG</u> -&gt; empty.\n2 balls from your hand were needed to clear the board.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= board.length &lt;= 16</code></li>\n\t<li><code>1 &lt;= hand.length &lt;= 5</code></li>\n\t<li><code>board</code> and <code>hand</code> consist of the characters <code>&#39;R&#39;</code>, <code>&#39;Y&#39;</code>, <code>&#39;B&#39;</code>, <code>&#39;G&#39;</code>, and <code>&#39;W&#39;</code>.</li>\n\t<li>The initial row of balls on the board will <strong>not</strong> have any groups of three or more consecutive balls of the same color.</li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 49,
    "companyTags": [
      "String",
      "Dynamic Programming",
      "Stack",
      "Breadth-First Search",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "robot-room-cleaner",
    "title": "Robot Room Cleaner",
    "description": "Description not available.",
    "difficulty": "Hard",
    "acceptanceRate": 52,
    "companyTags": [
      "Backtracking",
      "Interactive"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "the-maze",
    "title": "The Maze",
    "description": "Description not available.",
    "difficulty": "Medium",
    "acceptanceRate": 65,
    "companyTags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Matrix"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "non-decreasing-subsequences",
    "title": "Non-decreasing Subsequences",
    "description": "<p>Given an integer array <code>nums</code>, return <em>all the different possible non-decreasing subsequences of the given array with at least two elements</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,6,7,7]\n<strong>Output:</strong> [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [4,4,3,2,1]\n<strong>Output:</strong> [[4,4]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 15</code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 50,
    "companyTags": [
      "Array",
      "Hash Table",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "construct-the-rectangle",
    "title": "Construct the Rectangle",
    "description": "<p>A web developer needs to know how to design a web page&#39;s size. So, given a specific rectangular web page&rsquo;s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:</p>\n\n<ol>\n\t<li>The area of the rectangular web page you designed must equal to the given target area.</li>\n\t<li>The width <code>W</code> should not be larger than the length <code>L</code>, which means <code>L &gt;= W</code>.</li>\n\t<li>The difference between length <code>L</code> and width <code>W</code> should be as small as possible.</li>\n</ol>\n\n<p>Return <em>an array <code>[L, W]</code> where <code>L</code> and <code>W</code> are the length and width of the&nbsp;web page you designed in sequence.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> area = 4\n<strong>Output:</strong> [2,2]\n<strong>Explanation:</strong> The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1]. \nBut according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> area = 37\n<strong>Output:</strong> [37,1]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> area = 122122\n<strong>Output:</strong> [427,286]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= area &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 44,
    "companyTags": [
      "Math"
    ],
    "hints": [
      "The W is always less than or equal to the square root of the area, so we start searching at sqrt(area) till we find the result."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "reverse-pairs",
    "title": "Reverse Pairs",
    "description": "<p>Given an integer array <code>nums</code>, return <em>the number of <strong>reverse pairs</strong> in the array</em>.</p>\n\n<p>A <strong>reverse pair</strong> is a pair <code>(i, j)</code> where:</p>\n\n<ul>\n\t<li><code>0 &lt;= i &lt; j &lt; nums.length</code> and</li>\n\t<li><code>nums[i] &gt; 2 * nums[j]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,3,2,3,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 3, nums[4] = 1, 3 &gt; 2 * 1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,4,3,5,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 4, nums[4] = 1, 4 &gt; 2 * 1\n(2, 4) --&gt; nums[2] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 5, nums[4] = 1, 5 &gt; 2 * 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 47,
    "companyTags": [
      "Array",
      "Binary Search",
      "Divide and Conquer",
      "Binary Indexed Tree",
      "Segment Tree",
      "Merge Sort",
      "Ordered Set"
    ],
    "hints": [
      "Use the merge-sort technique.",
      "Divide the array into two parts and sort them.",
      "For each integer in the first part, count the number of integers that satisfy the condition from the second part. Use the pointer to help you in the counting process."
    ],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "target-sum",
    "title": "Target Sum",
    "description": "<p>You are given an integer array <code>nums</code> and an integer <code>target</code>.</p>\n\n<p>You want to build an <strong>expression</strong> out of nums by adding one of the symbols <code>&#39;+&#39;</code> and <code>&#39;-&#39;</code> before each integer in nums and then concatenate all the integers.</p>\n\n<ul>\n\t<li>For example, if <code>nums = [2, 1]</code>, you can add a <code>&#39;+&#39;</code> before <code>2</code> and a <code>&#39;-&#39;</code> before <code>1</code> and concatenate them to build the expression <code>&quot;+2-1&quot;</code>.</li>\n</ul>\n\n<p>Return the number of different <strong>expressions</strong> that you can build, which evaluates to <code>target</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,1,1,1,1], target = 3\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> There are 5 ways to assign symbols to make the sum of nums be target 3.\n-1 + 1 + 1 + 1 + 1 = 3\n+1 - 1 + 1 + 1 + 1 = 3\n+1 + 1 - 1 + 1 + 1 = 3\n+1 + 1 + 1 - 1 + 1 = 3\n+1 + 1 + 1 + 1 - 1 = 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1], target = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 20</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>0 &lt;= sum(nums[i]) &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= target &lt;= 1000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 32,
    "companyTags": [
      "Array",
      "Dynamic Programming",
      "Backtracking"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "teemo-attacking",
    "title": "Teemo Attacking",
    "description": "<p>Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly <code>duration</code> seconds. More formally, an attack at second <code>t</code> will mean Ashe is poisoned during the <strong>inclusive</strong> time interval <code>[t, t + duration - 1]</code>. If Teemo attacks again <strong>before</strong> the poison effect ends, the timer for it is <strong>reset</strong>, and the poison effect will end <code>duration</code> seconds after the new attack.</p>\n\n<p>You are given a <strong>non-decreasing</strong> integer array <code>timeSeries</code>, where <code>timeSeries[i]</code> denotes that Teemo attacks Ashe at second <code>timeSeries[i]</code>, and an integer <code>duration</code>.</p>\n\n<p>Return <em>the <strong>total</strong> number of seconds that Ashe is poisoned</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> timeSeries = [1,4], duration = 2\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Teemo&#39;s attacks on Ashe go as follows:\n- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.\n- At second 4, Teemo attacks, and Ashe is poisoned for seconds 4 and 5.\nAshe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in total.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> timeSeries = [1,2], duration = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Teemo&#39;s attacks on Ashe go as follows:\n- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.\n- At second 2 however, Teemo attacks again and resets the poison timer. Ashe is poisoned for seconds 2 and 3.\nAshe is poisoned for seconds 1, 2, and 3, which is 3 seconds in total.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= timeSeries.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= timeSeries[i], duration &lt;= 10<sup>7</sup></code></li>\n\t<li><code>timeSeries</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 45,
    "companyTags": [
      "Array",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "next-greater-element-i",
    "title": "Next Greater Element I",
    "description": "<p>The <strong>next greater element</strong> of some element <code>x</code> in an array is the <strong>first greater</strong> element that is <strong>to the right</strong> of <code>x</code> in the same array.</p>\n\n<p>You are given two <strong>distinct 0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code>, where <code>nums1</code> is a subset of <code>nums2</code>.</p>\n\n<p>For each <code>0 &lt;= i &lt; nums1.length</code>, find the index <code>j</code> such that <code>nums1[i] == nums2[j]</code> and determine the <strong>next greater element</strong> of <code>nums2[j]</code> in <code>nums2</code>. If there is no next greater element, then the answer for this query is <code>-1</code>.</p>\n\n<p>Return <em>an array </em><code>ans</code><em> of length </em><code>nums1.length</code><em> such that </em><code>ans[i]</code><em> is the <strong>next greater element</strong> as described above.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [4,1,2], nums2 = [1,3,4,2]\n<strong>Output:</strong> [-1,3,-1]\n<strong>Explanation:</strong> The next greater element for each value of nums1 is as follows:\n- 4 is underlined in nums2 = [1,3,<u>4</u>,2]. There is no next greater element, so the answer is -1.\n- 1 is underlined in nums2 = [<u>1</u>,3,4,2]. The next greater element is 3.\n- 2 is underlined in nums2 = [1,3,4,<u>2</u>]. There is no next greater element, so the answer is -1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums1 = [2,4], nums2 = [1,2,3,4]\n<strong>Output:</strong> [3,-1]\n<strong>Explanation:</strong> The next greater element for each value of nums1 is as follows:\n- 2 is underlined in nums2 = [1,<u>2</u>,3,4]. The next greater element is 3.\n- 4 is underlined in nums2 = [1,2,3,<u>4</u>]. There is no next greater element, so the answer is -1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>All integers in <code>nums1</code> and <code>nums2</code> are <strong>unique</strong>.</li>\n\t<li>All the integers of <code>nums1</code> also appear in <code>nums2</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you find an <code>O(nums1.length + nums2.length)</code> solution?",
    "difficulty": "Easy",
    "acceptanceRate": 61,
    "companyTags": [
      "Array",
      "Hash Table",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "random-point-in-non-overlapping-rectangles",
    "title": "Random Point in Non-overlapping Rectangles",
    "description": "<p>You are given an array of non-overlapping axis-aligned rectangles <code>rects</code> where <code>rects[i] = [a<sub>i</sub>, b<sub>i</sub>, x<sub>i</sub>, y<sub>i</sub>]</code> indicates that <code>(a<sub>i</sub>, b<sub>i</sub>)</code> is the bottom-left corner point of the <code>i<sup>th</sup></code> rectangle and <code>(x<sub>i</sub>, y<sub>i</sub>)</code> is the top-right corner point of the <code>i<sup>th</sup></code> rectangle. Design an algorithm to pick a random integer point inside the space covered by one of the given rectangles. A point on the perimeter of a rectangle is included in the space covered by the rectangle.</p>\n\n<p>Any integer point inside the space covered by one of the given rectangles should be equally likely to be returned.</p>\n\n<p><strong>Note</strong> that an integer point is a point that has integer coordinates.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(int[][] rects)</code> Initializes the object with the given rectangles <code>rects</code>.</li>\n\t<li><code>int[] pick()</code> Returns a random integer point <code>[u, v]</code> inside the space covered by one of the given rectangles.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/07/24/lc-pickrandomrec.jpg\" style=\"width: 419px; height: 539px;\" />\n<pre>\n<strong>Input</strong>\n[&quot;Solution&quot;, &quot;pick&quot;, &quot;pick&quot;, &quot;pick&quot;, &quot;pick&quot;, &quot;pick&quot;]\n[[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]\n<strong>Output</strong>\n[null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);\nsolution.pick(); // return [1, -2]\nsolution.pick(); // return [1, -1]\nsolution.pick(); // return [-1, -2]\nsolution.pick(); // return [-2, -2]\nsolution.pick(); // return [0, 0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= rects.length &lt;= 100</code></li>\n\t<li><code>rects[i].length == 4</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= a<sub>i</sub> &lt; x<sub>i</sub> &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= b<sub>i</sub> &lt; y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>\n\t<li><code>x<sub>i</sub> - a<sub>i</sub> &lt;= 2000</code></li>\n\t<li><code>y<sub>i</sub> - b<sub>i</sub> &lt;= 2000</code></li>\n\t<li>All the rectangles do not overlap.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>pick</code>.</li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 49,
    "companyTags": [
      "Array",
      "Math",
      "Binary Search",
      "Reservoir Sampling",
      "Prefix Sum",
      "Ordered Set",
      "Randomized"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "diagonal-traverse",
    "title": "Diagonal Traverse",
    "description": "<p>Given an <code>m x n</code> matrix <code>mat</code>, return <em>an array of all the elements of the array in a diagonal order</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/04/10/diag1-grid.jpg\" style=\"width: 334px; height: 334px;\" />\n<pre>\n<strong>Input:</strong> mat = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [1,2,4,7,5,3,6,8,9]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> mat = [[1,2],[3,4]]\n<strong>Output:</strong> [1,2,3,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= mat[i][j] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 54,
    "companyTags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "keyboard-row",
    "title": "Keyboard Row",
    "description": "<p>Given an array of strings <code>words</code>, return <em>the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below</em>.</p>\n\n<p><strong>Note</strong> that the strings are <strong>case-insensitive</strong>, both lowercased and uppercased of the same letter are treated as if they are at the same row.</p>\n\n<p>In the <strong>American keyboard</strong>:</p>\n\n<ul>\n\t<li>the first row consists of the characters <code>&quot;qwertyuiop&quot;</code>,</li>\n\t<li>the second row consists of the characters <code>&quot;asdfghjkl&quot;</code>, and</li>\n\t<li>the third row consists of the characters <code>&quot;zxcvbnm&quot;</code>.</li>\n</ul>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2018/10/12/keyboard.png\" style=\"width: 800px; max-width: 600px; height: 267px;\" />\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">words = [&quot;Hello&quot;,&quot;Alaska&quot;,&quot;Dad&quot;,&quot;Peace&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[&quot;Alaska&quot;,&quot;Dad&quot;]</span></p>\n\n<p><strong>Explanation:</strong></p>\n\n<p>Both <code>&quot;a&quot;</code> and <code>&quot;A&quot;</code> are in the 2nd row of the American keyboard due to case insensitivity.</p>\n</div>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">words = [&quot;omk&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[]</span></p>\n</div>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>Input:</strong> <span class=\"example-io\">words = [&quot;adsdf&quot;,&quot;sfd&quot;]</span></p>\n\n<p><strong>Output:</strong> <span class=\"example-io\">[&quot;adsdf&quot;,&quot;sfd&quot;]</span></p>\n</div>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 20</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 100</code></li>\n\t<li><code>words[i]</code> consists of English letters (both lowercase and uppercase).&nbsp;</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 31,
    "companyTags": [
      "Array",
      "Hash Table",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "find-mode-in-binary-search-tree",
    "title": "Find Mode in Binary Search Tree",
    "description": "<p>Given the <code>root</code> of a binary search tree (BST) with duplicates, return <em>all the <a href=\"https://en.wikipedia.org/wiki/Mode_(statistics)\" target=\"_blank\">mode(s)</a> (i.e., the most frequently occurred element) in it</em>.</p>\n\n<p>If the tree has more than one mode, return them in <strong>any order</strong>.</p>\n\n<p>Assume a BST is defined as follows:</p>\n\n<ul>\n\t<li>The left subtree of a node contains only nodes with keys <strong>less than or equal to</strong> the node&#39;s key.</li>\n\t<li>The right subtree of a node contains only nodes with keys <strong>greater than or equal to</strong> the node&#39;s key.</li>\n\t<li>Both the left and right subtrees must also be binary search trees.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2021/03/11/mode-tree.jpg\" style=\"width: 142px; height: 222px;\" />\n<pre>\n<strong>Input:</strong> root = [1,null,2,2]\n<strong>Output:</strong> [2]\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> root = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).",
    "difficulty": "Easy",
    "acceptanceRate": 42,
    "companyTags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree",
      "Binary Tree"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "ipo",
    "title": "IPO",
    "description": "<p>Suppose LeetCode will start its <strong>IPO</strong> soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the <strong>IPO</strong>. Since it has limited resources, it can only finish at most <code>k</code> distinct projects before the <strong>IPO</strong>. Help LeetCode design the best way to maximize its total capital after finishing at most <code>k</code> distinct projects.</p>\n\n<p>You are given <code>n</code> projects where the <code>i<sup>th</sup></code> project has a pure profit <code>profits[i]</code> and a minimum capital of <code>capital[i]</code> is needed to start it.</p>\n\n<p>Initially, you have <code>w</code> capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.</p>\n\n<p>Pick a list of <strong>at most</strong> <code>k</code> distinct projects from given projects to <strong>maximize your final capital</strong>, and return <em>the final maximized capital</em>.</p>\n\n<p>The answer is guaranteed to fit in a 32-bit signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Since your initial capital is 0, you can only start the project indexed 0.\nAfter finishing it you will obtain profit 1 and your capital becomes 1.\nWith capital 1, you can either start the project indexed 1 or the project indexed 2.\nSince you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.\nTherefore, output the final maximized capital, which is 0 + 1 + 3 = 4.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]\n<strong>Output:</strong> 6\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= w &lt;= 10<sup>9</sup></code></li>\n\t<li><code>n == profits.length</code></li>\n\t<li><code>n == capital.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= profits[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= capital[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Hard",
    "acceptanceRate": 31,
    "companyTags": [
      "Array",
      "Greedy",
      "Sorting",
      "Heap (Priority Queue)"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "next-greater-element-ii",
    "title": "Next Greater Element II",
    "description": "<p>Given a circular integer array <code>nums</code> (i.e., the next element of <code>nums[nums.length - 1]</code> is <code>nums[0]</code>), return <em>the <strong>next greater number</strong> for every element in</em> <code>nums</code>.</p>\n\n<p>The <strong>next greater number</strong> of a number <code>x</code> is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn&#39;t exist, return <code>-1</code> for this number.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,1]\n<strong>Output:</strong> [2,-1,2]\nExplanation: The first 1&#39;s next greater number is 2; \nThe number 2 can&#39;t find next greater number. \nThe second 1&#39;s next greater number needs to search circularly, which is also 2.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [1,2,3,4,3]\n<strong>Output:</strong> [2,3,4,-1,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "base-7",
    "title": "Base 7",
    "description": "<p>Given an integer <code>num</code>, return <em>a string of its <strong>base 7</strong> representation</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> num = 100\n<strong>Output:</strong> \"202\"\n</pre><p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> num = -7\n<strong>Output:</strong> \"-10\"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>7</sup> &lt;= num &lt;= 10<sup>7</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 52,
    "companyTags": [
      "Math",
      "String"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "relative-ranks",
    "title": "Relative Ranks",
    "description": "<p>You are given an integer array <code>score</code> of size <code>n</code>, where <code>score[i]</code> is the score of the <code>i<sup>th</sup></code> athlete in a competition. All the scores are guaranteed to be <strong>unique</strong>.</p>\n\n<p>The athletes are <strong>placed</strong> based on their scores, where the <code>1<sup>st</sup></code> place athlete has the highest score, the <code>2<sup>nd</sup></code> place athlete has the <code>2<sup>nd</sup></code> highest score, and so on. The placement of each athlete determines their rank:</p>\n\n<ul>\n\t<li>The <code>1<sup>st</sup></code> place athlete&#39;s rank is <code>&quot;Gold Medal&quot;</code>.</li>\n\t<li>The <code>2<sup>nd</sup></code> place athlete&#39;s rank is <code>&quot;Silver Medal&quot;</code>.</li>\n\t<li>The <code>3<sup>rd</sup></code> place athlete&#39;s rank is <code>&quot;Bronze Medal&quot;</code>.</li>\n\t<li>For the <code>4<sup>th</sup></code> place to the <code>n<sup>th</sup></code> place athlete, their rank is their placement number (i.e., the <code>x<sup>th</sup></code> place athlete&#39;s rank is <code>&quot;x&quot;</code>).</li>\n</ul>\n\n<p>Return an array <code>answer</code> of size <code>n</code> where <code>answer[i]</code> is the <strong>rank</strong> of the <code>i<sup>th</sup></code> athlete.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> score = [5,4,3,2,1]\n<strong>Output:</strong> [&quot;Gold Medal&quot;,&quot;Silver Medal&quot;,&quot;Bronze Medal&quot;,&quot;4&quot;,&quot;5&quot;]\n<strong>Explanation:</strong> The placements are [1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>, 4<sup>th</sup>, 5<sup>th</sup>].</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> score = [10,3,8,9,4]\n<strong>Output:</strong> [&quot;Gold Medal&quot;,&quot;5&quot;,&quot;Bronze Medal&quot;,&quot;Silver Medal&quot;,&quot;4&quot;]\n<strong>Explanation:</strong> The placements are [1<sup>st</sup>, 5<sup>th</sup>, 3<sup>rd</sup>, 2<sup>nd</sup>, 4<sup>th</sup>].\n\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == score.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= score[i] &lt;= 10<sup>6</sup></code></li>\n\t<li>All the values in <code>score</code> are <strong>unique</strong>.</li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 63,
    "companyTags": [
      "Array",
      "Sorting",
      "Heap (Priority Queue)"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "perfect-number",
    "title": "Perfect Number",
    "description": "<p>A <a href=\"https://en.wikipedia.org/wiki/Perfect_number\" target=\"_blank\"><strong>perfect number</strong></a> is a <strong>positive integer</strong> that is equal to the sum of its <strong>positive divisors</strong>, excluding the number itself. A <strong>divisor</strong> of an integer <code>x</code> is an integer that can divide <code>x</code> evenly.</p>\n\n<p>Given an integer <code>n</code>, return <code>true</code><em> if </em><code>n</code><em> is a perfect number, otherwise return </em><code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 28\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 28 = 1 + 2 + 4 + 7 + 14\n1, 2, 4, 7, and 14 are all divisors of 28.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> num = 7\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt;= 10<sup>8</sup></code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 59,
    "companyTags": [
      "Math"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "fibonacci-number",
    "title": "Fibonacci Number",
    "description": "<p>The <b>Fibonacci numbers</b>, commonly denoted <code>F(n)</code> form a sequence, called the <b>Fibonacci sequence</b>, such that each number is the sum of the two preceding ones, starting from <code>0</code> and <code>1</code>. That is,</p>\n\n<pre>\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n &gt; 1.\n</pre>\n\n<p>Given <code>n</code>, calculate <code>F(n)</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> F(2) = F(1) + F(0) = 1 + 0 = 1.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> F(3) = F(2) + F(1) = 1 + 1 = 2.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> F(4) = F(3) + F(2) = 2 + 1 = 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 30</code></li>\n</ul>\n",
    "difficulty": "Easy",
    "acceptanceRate": 64,
    "companyTags": [
      "Math",
      "Dynamic Programming",
      "Recursion",
      "Memoization"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
      }
    ]
  },
  {
    "id": "coin-change-ii",
    "title": "Coin Change II",
    "description": "<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>\n\n<p>Return <em>the number of combinations that make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>0</code>.</p>\n\n<p>You may assume that you have an infinite number of each kind of coin.</p>\n\n<p>The answer is <strong>guaranteed</strong> to fit into a signed <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 5, coins = [1,2,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> there are four ways to make up the amount:\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 3, coins = [2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> the amount of 3 cannot be made up just with coins of 2.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> amount = 10, coins = [10]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 5000</code></li>\n\t<li>All the values of <code>coins</code> are <strong>unique</strong>.</li>\n\t<li><code>0 &lt;= amount &lt;= 5000</code></li>\n</ul>\n",
    "difficulty": "Medium",
    "acceptanceRate": 66,
    "companyTags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [],
    "starterCode": {
      "javascript": "/**\\n * Write your JavaScript solution here.\\n */\\nfunction solve(input) {\\n    \\n}",
      "python": "class Solution:\\n    def solve(self, input):\\n        pass",
      "cpp": "class Solution {\\npublic:\\n    int solve(int input) {\\n        return 0;\\n    }\\n};",
      "java": "class Solution {\\n    public int solve(int input) {\\n        return 0;\\n    }\\n}"
    },
    "testCases": [
      {
        "id": "tc1",
        "input": "sample_input",
        "expectedOutput": "sample_output"
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
