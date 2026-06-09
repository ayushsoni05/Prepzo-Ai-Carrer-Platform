export const generateTranspiledPayload = (language: string, code: string, testCases: any[]) => {
  const inputsArrayStr = JSON.stringify(testCases.map(tc => tc.input));

  if (language === 'javascript') {
    let fnName = "solve";
    let paramsStr = "";
    const fnMatch = code.match(/(?:function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\))|(?:(?:var|let|const)\s+([a-zA-Z0-9_]+)\s*=\s*(?:function)?\s*\(([^)]*)\))/);
    
    if (fnMatch) {
      fnName = fnMatch[1] || fnMatch[3];
      paramsStr = fnMatch[2] || fnMatch[4];
    }

    const isAssignment = testCases.some(tc => tc.input.includes('='));

    return `
${code}
const inputs = ${inputsArrayStr};
for (const input of inputs) {
  console.log("---SPLIT---");
  try {
    let res;
    ${isAssignment ? `
      eval("var " + input + ";");
      res = ${fnName}(${paramsStr});
    ` : `
      res = ${fnName}(input);
    `}
    console.log(typeof res === 'object' ? JSON.stringify(res) : String(res));
  } catch(e) {
    console.log("Error: " + e.message);
  }
}
`;
  }

  if (language === 'python') {
    const pyInputsStr = inputsArrayStr.replace(/'/g, "\\'");
    return `
import json
import inspect
from typing import *

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

${code}

inputs = json.loads('${pyInputsStr}')
try:
    sol = Solution()
except:
    sol = None

for inp in inputs:
    print("---SPLIT---")
    try:
        local_vars = {}
        exec(inp, globals(), local_vars)
        
        if sol:
            methods = [m for m in dir(sol) if not m.startswith('__') and callable(getattr(sol, m))]
            if methods:
                method_name = methods[0]
                method = getattr(sol, method_name)
                sig = inspect.signature(method)
                kwargs = {}
                for k in sig.parameters:
                    if k in local_vars:
                        kwargs[k] = local_vars[k]
                res = method(**kwargs)
            else:
                res = None
        else:
            res = solve(inp)
            
        print(json.dumps(res) if isinstance(res, (dict, list, bool)) else str(res))
    except Exception as e:
        print("Error:", str(e))
`;
  }

  if (language === 'java') {
    const javaInputs = testCases.map(tc => `"${tc.input.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(', ');
    const sanitizedCode = code.replace(/public\s+class\s+Solution/, 'class Solution');

    const sigMatch = code.match(/public\s+(?:[\w\[\]<>\s,\?]+?)\s+(\w+)\s*\((.*?)\)\s*\{/s);
    if (!sigMatch) {
      return `
import java.util.*;
${sanitizedCode}
public class Main {
    public static void main(String[] args) {
        String[] inputs = { ${javaInputs} };
        Solution sol = new Solution();
        for (String inp : inputs) {
            System.out.println("---SPLIT---");
            try {
                System.out.println(sol.solve(inp));
            } catch(Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}
`;
    }

    const fnName = sigMatch[1];
    const paramsRaw = sigMatch[2];
    
    const paramsRegex = /([\w\[\]<>]+)\s+(\w+)/g;
    const params: any[] = [];
    let pMatch;
    while((pMatch = paramsRegex.exec(paramsRaw)) !== null) {
      params.push({ type: pMatch[1], name: pMatch[2] });
    }

    const javaTestcases = testCases.map(tc => {
      const regex = /(\w+)\s*=\s*(.*?)(?=\s*,\s*\w+\s*=|$)/g;
      let match;
      const vars: Record<string, string> = {};
      while((match = regex.exec(tc.input)) !== null) {
        vars[match[1]] = match[2];
      }
      
      let declarations = [];
      let methodArgs = [];
      
      for (const p of params) {
        const valStr = vars[p.name];
        if (!valStr) {
          declarations.push(`// Error: Missing variable ${p.name}`);
          continue;
        }
        
        let javaDeclaration = "";
        if (p.type === 'int') {
          javaDeclaration = `int ${p.name} = ${valStr};`;
        } else if (p.type === 'String') {
          javaDeclaration = `String ${p.name} = ${valStr};`;
        } else if (p.type === 'int[]') {
          javaDeclaration = `int[] ${p.name} = new int[]{${valStr.substring(1, valStr.length-1)}};`;
        } else if (p.type === 'int[][]') {
          const arrContent = valStr.substring(1, valStr.length-1).replace(/\[/g, '{').replace(/\]/g, '}');
          javaDeclaration = `int[][] ${p.name} = new int[][]{${arrContent}};`;
        } else if (p.type === 'boolean') {
          javaDeclaration = `boolean ${p.name} = ${valStr};`;
        } else if (p.type === 'double') {
          javaDeclaration = `double ${p.name} = ${valStr};`;
        } else if (p.type === 'ListNode') {
          javaDeclaration = `ListNode ${p.name} = buildList(new int[]{${valStr.substring(1, valStr.length-1)}});`;
        } else {
          javaDeclaration = `${p.type} ${p.name} = ${valStr};`;
        }
        
        declarations.push(javaDeclaration);
        methodArgs.push(p.name);
      }
      
      return `
        System.out.println("---SPLIT---");
        {
            ${declarations.join('\n            ')}
            Object res = sol.${fnName}(${methodArgs.join(', ')});
            System.out.println(res instanceof int[] ? Arrays.toString((int[])res) : (res instanceof int[][] ? Arrays.deepToString((int[][])res) : String.valueOf(res)));
        }
      `;
    });

    return `
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

${sanitizedCode}

public class Main {
    public static ListNode buildList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        try {
            ${javaTestcases.join('\n')}
        } catch(Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
`;
  }

  if (language === 'cpp') {
    const sigMatch = code.match(/(?:(?:vector<\w+>|int|string|void|bool|double|float|long|short)\s+)(\w+)\s*\((.*?)\)\s*\{/s);
    if (!sigMatch) {
      const cppInputs = testCases.map(tc => `R"DELIM(${tc.input})DELIM"`).join(', ');
      return `
#include <iostream>
#include <string>
#include <vector>
using namespace std;
${code}
int main() {
    vector<string> inputs = { ${cppInputs} };
    Solution sol;
    for (const string& inp : inputs) {
        cout << "---SPLIT---\n";
        try {
            cout << sol.solve(inp) << "\n";
        } catch(...) {
            cout << "Error\n";
        }
    }
    return 0;
}
`;
    }

    const fnName = sigMatch[1];
    const paramsRaw = sigMatch[2];
    
    const paramsRegex = /([\w<>\[\]]+)\s*&?\s+(\w+)/g;
    const params: any[] = [];
    let pMatch;
    while((pMatch = paramsRegex.exec(paramsRaw)) !== null) {
      params.push({ type: pMatch[1], name: pMatch[2] });
    }

    const cppTestcases = testCases.map(tc => {
      const regex = /(\w+)\s*=\s*(.*?)(?=\s*,\s*\w+\s*=|$)/g;
      let match;
      const vars: Record<string, string> = {};
      while((match = regex.exec(tc.input)) !== null) {
        vars[match[1]] = match[2];
      }
      
      let declarations = [];
      let methodArgs = [];
      
      for (const p of params) {
        const valStr = vars[p.name];
        if (!valStr) continue;
        
        let declaration = "";
        if (p.type === 'int') {
          declaration = `int ${p.name} = ${valStr};`;
        } else if (p.type === 'string') {
          declaration = `string ${p.name} = ${valStr};`;
        } else if (p.type === 'vector<int>') {
          const arrContent = valStr.substring(1, valStr.length-1).replace(/\[/g, '{').replace(/\]/g, '}');
          declaration = `vector<int> ${p.name} = {${arrContent}};`;
        } else if (p.type === 'vector<vector<int>>') {
          const arrContent = valStr.substring(1, valStr.length-1).replace(/\[/g, '{').replace(/\]/g, '}');
          declaration = `vector<vector<int>> ${p.name} = {${arrContent}};`;
        } else {
          declaration = `${p.type} ${p.name} = ${valStr};`;
        }
        
        declarations.push(declaration);
        methodArgs.push(p.name);
      }
      
      return `
        cout << "---SPLIT---\n";
        {
            ${declarations.join('\n            ')}
            auto res = sol.${fnName}(${methodArgs.join(', ')});
            cout << printRes(res) << "\n";
        }
      `;
    });

    return `
#include <iostream>
#include <string>
#include <vector>
using namespace std;

string printRes(bool res) { return res ? "true" : "false"; }
string printRes(int res) { return to_string(res); }
string printRes(double res) { return to_string(res); }
string printRes(string res) { return res; }
string printRes(const vector<int>& res) {
    string s = "[";
    for(size_t i=0; i<res.size(); ++i) {
        s += to_string(res[i]);
        if(i < res.size()-1) s += ",";
    }
    s += "]";
    return s;
}

${code}

int main() {
    Solution sol;
    ${cppTestcases.join('\n')}
    return 0;
}
`;
  }

  return "";
};
