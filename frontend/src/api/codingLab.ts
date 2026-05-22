export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  id: string;
  input: string; // JSON string format usually
  expectedOutput: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  companyTags: string[];
  acceptanceRate: number;
  description: string;
  hints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
  };
  testCases: TestCase[];
}

export const MOCK_PROBLEMS: CodingProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    companyTags: ['Amazon', 'Google', 'Meta', 'Apple'],
    acceptanceRate: 51.4,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
      'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x.',
      'Can we change our array into a hash table to perform faster lookups?'
    ],
    starterCode: {
      javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    \n}',
      python: 'def twoSum(nums, target):\n    """\n    :type nums: List[int]\n    :type target: int\n    :rtype: List[int]\n    """\n    pass',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};'
    },
    testCases: [
      { id: '1', input: '[ [2,7,11,15], 9 ]', expectedOutput: '[0,1]' },
      { id: '2', input: '[ [3,2,4], 6 ]', expectedOutput: '[1,2]' },
      { id: '3', input: '[ [3,3], 6 ]', expectedOutput: '[0,1]' }
    ]
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'ByteDance'],
    acceptanceRate: 51.1,
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Constraints:**
- \`k == lists.length\`
- \`0 <= k <= 10^4\`
- \`0 <= lists[i].length <= 500\``,
    hints: [
      'Think about using a Priority Queue (Min-Heap).',
      'If you place the head of every linked list into a Min-Heap, you can repeatedly extract the smallest element.',
      'Divide and Conquer can also work well here by merging lists in pairs.'
    ],
    starterCode: {
      javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nfunction mergeKLists(lists) {\n    \n}',
      python: '# Definition for singly-linked list.\n# class ListNode(object):\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution(object):\n    def mergeKLists(self, lists):\n        """\n        :type lists: List[ListNode]\n        :rtype: ListNode\n        """\n        pass',
      cpp: '/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};'
    },
    testCases: [
      { id: '1', input: '[ [[1,4,5],[1,3,4],[2,6]] ]', expectedOutput: '[1,1,2,3,4,4,5,6]' },
      { id: '2', input: '[ [] ]', expectedOutput: '[]' },
      { id: '3', input: '[ [[]] ]', expectedOutput: '[]' }
    ]
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
    acceptanceRate: 41.7,
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with **positive** size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    hints: [
      'To achieve O(1) time complexity for both get and put operations, you need to combine two data structures.',
      'A Hash Map gives you O(1) access to items. A Doubly Linked List allows O(1) removal and insertion of items.',
      'Keep the most recently used item at the head of the list, and the least recently used at the tail.'
    ],
    starterCode: {
      javascript: '/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    \n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    \n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    \n};\n',
      python: 'class LRUCache(object):\n    def __init__(self, capacity):\n        """\n        :type capacity: int\n        """\n        pass\n\n    def get(self, key):\n        """\n        :type key: int\n        :rtype: int\n        """\n        pass\n\n    def put(self, key, value):\n        """\n        :type key: int\n        :type value: int\n        :rtype: None\n        """\n        pass',
      cpp: 'class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    \n    int get(int key) {\n        \n    }\n    \n    void put(int key, int value) {\n        \n    }\n};'
    },
    testCases: [
      { id: '1', input: '[ ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]] ]', expectedOutput: '[null, null, null, 1, null, -1, null, -1, 3, 4]' }
    ]
  }
];

export const getCodingProblems = async (): Promise<CodingProblem[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PROBLEMS), 600));
};

export const getCodingProblemById = async (id: string): Promise<CodingProblem | undefined> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PROBLEMS.find(p => p.id === id)), 400));
};
