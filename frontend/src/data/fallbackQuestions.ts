/**
 * Fallback Question Bank for Assessment
 * Used when AI service (Ollama) is unavailable.
 * Supports multiple fields (CS, Electronics, Mechanical, Civil, Management).
 */

export interface FallbackQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface FallbackSection {
  id: string;
  name: string;
  icon: string;
  timeLimit: number; // minutes
  questions: FallbackQuestion[];
}

// ────────────────────────────────────────────────────
// 1. COMPUTER SCIENCE (DEFAULT)
// ────────────────────────────────────────────────────
const DSA_QUESTIONS: FallbackQuestion[] = [
  { id:"dsa1", question:"What is the time complexity of binary search on a sorted array?", options:["O(n)","O(n²)","O(log n)","O(1)"], correct:2, difficulty:"easy", explanation:"Binary search halves the space each step → O(log n)." },
  { id:"dsa2", question:"Which data structure follows LIFO (Last In First Out)?", options:["Queue","Linked List","Stack","Heap"], correct:2, difficulty:"easy", explanation:"Stack follows Last-In-First-Out ordering." },
  { id:"dsa3", question:"What is the worst-case time complexity of QuickSort?", options:["O(n log n)","O(n²)","O(n)","O(log n)"], correct:1, difficulty:"medium", explanation:"QuickSort degrades to O(n²) when pivot is always min/max." },
  { id:"dsa4", question:"Which traversal visits the root node first?", options:["Inorder","Preorder","Postorder","Level-order"], correct:1, difficulty:"easy", explanation:"Preorder traversal visits Root → Left → Right." },
  { id:"dsa5", question:"What data structure is used in BFS?", options:["Stack","Queue","Heap","Deque"], correct:1, difficulty:"easy", explanation:"BFS uses a Queue to explore nodes level by level." }
];

const DBMS_QUESTIONS: FallbackQuestion[] = [
  { id:"dbms1", question:"What does SQL stand for?", options:["Structured Query Language","Simple Query Language","Sequential Query Language","Standard Query Language"], correct:0, difficulty:"easy", explanation:"SQL = Structured Query Language." },
  { id:"dbms2", question:"Which normal form eliminates partial dependencies?", options:["1NF","2NF","3NF","BCNF"], correct:1, difficulty:"medium", explanation:"2NF removes partial dependencies on composite keys." }
];

// ────────────────────────────────────────────────────
// 2. ELECTRONICS & COMMUNICATION
// ────────────────────────────────────────────────────
const ELECTRONICS_CORES: FallbackQuestion[] = [
  { id:"elec1", question:"What is the unit of capacitance?", options:["Henry","Farad","Ohm","Tesla"], correct:1, difficulty:"easy", explanation:"Capacitance is measured in Farads (F)." },
  { id:"elec2", question:"Which logic gate is known as a Universal Gate?", options:["AND","OR","NAND","XOR"], correct:2, difficulty:"easy", explanation:"NAND and NOR are universal gates because any logic can be built from them." },
  { id:"elec3", question:"What is the relation between V, I, and R in Ohm's Law?", options:["V = I/R","I = V*R","V = I*R","R = V*I"], correct:2, difficulty:"easy", explanation:"V = IR is the standard form of Ohm's Law." },
  { id:"elec4", question:"Which semiconductor material is most commonly used in IC fabrication?", options:["Germanium","Silicon","Gallium Arsenide","Carbon"], correct:1, difficulty:"easy", explanation:"Silicon is the primary material for modern semiconductors." },
  { id:"elec5", question:"What is the purpose of a Schottky diode in electronics?", options:["High voltage rectification","Fast switching and low forward voltage drop","Constant voltage regulation","Light emission"], correct:1, difficulty:"medium", explanation:"Schottky diodes have low forward voltage and switch very fast." }
];

const EMBEDDED_QUESTIONS: FallbackQuestion[] = [
  { id:"emb1", question:"Which register in 8051 is used to point to the stack?", options:["DPTR","PC","SP","PSW"], correct:2, difficulty:"medium", explanation:"SP (Stack Pointer) tracks the stack top in 8051." },
  { id:"emb2", question:"What does RTOS stand for?", options:["Real Time Operating System","Ready To Operate System","Robotic Technology OS","Reference Task OS"], correct:0, difficulty:"easy", explanation:"RTOS is a Real Time Operating System used for deterministic tasks." }
];

// ────────────────────────────────────────────────────
// 3. MECHANICAL ENGINEERING
// ────────────────────────────────────────────────────
const MECH_CORES: FallbackQuestion[] = [
  { id:"mech1", question:"What is the primary law used in thermodynamics for conservation of energy?", options:["First Law","Second Law","Third Law","Zeroth Law"], correct:0, difficulty:"easy", explanation:"The First Law states that energy cannot be created or destroyed." },
  { id:"mech2", question:"Which engine cycle is considered the most efficient for heat engines?", options:["Diesel Cycle","Otto Cycle","Carnot Cycle","Rankine Cycle"], correct:2, difficulty:"medium", explanation:"The Carnot cycle is the theoretical limit for heat engine efficiency." }
];

// ────────────────────────────────────────────────────
// 4. APTITUDE (Shared across all fields)
// ────────────────────────────────────────────────────
const APTITUDE_QUESTIONS: FallbackQuestion[] = [
  { id:"apt1", question:"If a train travels 120 km in 2 hours, what is its speed?", options:["50 km/h","60 km/h","80 km/h","100 km/h"], correct:1, difficulty:"easy", explanation:"Speed = Distance/Time = 120/2 = 60 km/h." },
  { id:"apt2", question:"What comes next: 2, 6, 12, 20, 30, ?", options:["40","42","44","36"], correct:1, difficulty:"medium", explanation:"Differences: 4,6,8,10 → next diff=12 → 30+12=42." }
];

// ────────────────────────────────────────────────────
// SECTION DEFINITIONS
// ────────────────────────────────────────────────────

export const CS_FALLBACK_SECTIONS: FallbackSection[] = [
  { id: "dsa",     name: "DSA",                icon: "🌳", timeLimit: 25, questions: DSA_QUESTIONS },
  { id: "dbms",    name: "DBMS",               icon: "🗄️", timeLimit: 25, questions: DBMS_QUESTIONS },
  { id: "aptitude",name: "Aptitude",            icon: "🧮", timeLimit: 20, questions: APTITUDE_QUESTIONS },
];

export const ELECTRICAL_FALLBACK_SECTIONS: FallbackSection[] = [
  { id: "circuits",  name: "Circuits & Systems", icon: "⚡", timeLimit: 25, questions: ELECTRONICS_CORES },
  { id: "embedded",  name: "Embedded Systems",   icon: "📟", timeLimit: 25, questions: EMBEDDED_QUESTIONS },
  { id: "aptitude",  name: "Aptitude",            icon: "🧮", timeLimit: 20, questions: APTITUDE_QUESTIONS },
];

export const MECHANICAL_FALLBACK_SECTIONS: FallbackSection[] = [
  { id: "thermo",    name: "Thermodynamics",    icon: "🔥", timeLimit: 25, questions: MECH_CORES },
  { id: "machines",  name: "Machine Design",     icon: "⚙️", timeLimit: 25, questions: MECH_CORES }, // Reusing for demo
  { id: "aptitude",  name: "Aptitude",            icon: "🧮", timeLimit: 20, questions: APTITUDE_QUESTIONS },
];

export const getFallbackByField = (field: string): FallbackSection[] => {
  const f = field.toLowerCase();
  if (f.includes('electronics') || f.includes('electrical') || f.includes('ece') || f.includes('eee')) {
    return ELECTRICAL_FALLBACK_SECTIONS;
  }
  if (f.includes('mechanical')) {
    return MECHANICAL_FALLBACK_SECTIONS;
  }
  // Default to CS
  return CS_FALLBACK_SECTIONS;
};

export default CS_FALLBACK_SECTIONS;
