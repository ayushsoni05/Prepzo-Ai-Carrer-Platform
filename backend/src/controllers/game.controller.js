import { asyncHandler } from '../middleware/error.middleware.js';
import TriviaQuestion from '../models/TriviaQuestion.model.js';
import GameStats from '../models/GameStats.model.js';

// Default CS questions to seed if the database is empty
const DEFAULT_QUESTIONS = [
  // ==================== COMPUTER SCIENCE (30) ====================
  // --- EASY (10) ---
  {
    question: "Which of the following is not a valid state in a process life cycle?",
    options: ["New", "Running", "Waiting", "Compiled"],
    correctAnswer: 3,
    category: "OS",
    difficulty: "Easy",
    explanation: "The standard states of a process are New, Ready, Running, Waiting, and Terminated. Compiled is not a process state."
  },
  {
    question: "What does ACID stand for in DBMS?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Completeness, Integrity, Durability",
      "Access, Control, Index, Data",
      "Atomicity, Concurrency, Isolation, Distribution"
    ],
    correctAnswer: 0,
    category: "DBMS",
    difficulty: "Easy",
    explanation: "ACID properties ensure transaction reliability: Atomicity (all or nothing), Consistency (preserves database rules), Isolation (independent transactions), and Durability (saved permanently)."
  },
  {
    question: "Which of the following joins returns all rows from both tables even if there is no match?",
    options: ["Inner Join", "Left Join", "Right Join", "Full Outer Join"],
    correctAnswer: 3,
    category: "DBMS",
    difficulty: "Easy",
    explanation: "A Full Outer Join returns all records when there is a match in either left or right table records."
  },
  {
    question: "Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its superclass?",
    options: ["Method Overloading", "Method Overriding", "Encapsulation", "Polymorphism"],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Easy",
    explanation: "Method Overriding is dynamic polymorphism where a subclass overrides a superclass method implementation."
  },
  {
    question: "Which keyword is used to prevent inheritance of a class in Java?",
    options: ["static", "abstract", "final", "private"],
    correctAnswer: 2,
    category: "OOPs",
    difficulty: "Easy",
    explanation: "In Java, declaring a class as 'final' prevents it from being subclassed / inherited."
  },
  {
    question: "Which layer of the OSI model is responsible for routing packets?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Easy",
    explanation: "The Network Layer handles packet routing, logical addressing (IP), and forwarding."
  },
  {
    question: "Which port is commonly used for secure web traffic (HTTPS)?",
    options: ["21", "80", "443", "8080"],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Easy",
    explanation: "Port 443 is the default port for secure HTTPS web traffic, while port 80 is used for unencrypted HTTP traffic."
  },
  {
    question: "What is the primary function of a CPU?",
    options: [
      "Executing instructions and processing data",
      "Storing data permanently",
      "Rendering high-end graphics",
      "Managing cooling fans speed"
    ],
    correctAnswer: 0,
    category: "General",
    difficulty: "Easy",
    explanation: "The CPU (Central Processing Unit) executes instruction code and processes operations. Memory and GPU handle storage and graphics."
  },
  {
    question: "Which data structure operates on a Last In First Out (LIFO) basis?",
    options: ["Queue", "Stack", "Graph", "Tree"],
    correctAnswer: 1,
    category: "General",
    difficulty: "Easy",
    explanation: "A Stack operates on a LIFO basis (the last item added is the first one removed). A Queue is First In First Out (FIFO)."
  },
  {
    question: "What is the HTML tag used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<link>"],
    correctAnswer: 2,
    category: "General",
    difficulty: "Easy",
    explanation: "The <style> tag is used to write CSS rules internally within an HTML page. <link> is for external sheets."
  },
  // --- MEDIUM (10) ---
  {
    question: "What is thrashing in an Operating System?",
    options: ["High CPU utilization", "Excessive page swapping activity", "Deadlock state", "Cache coherence problem"],
    correctAnswer: 1,
    category: "OS",
    difficulty: "Medium",
    explanation: "Thrashing occurs when a virtual memory system spends more time swapping pages in and out of secondary storage than executing actual processes."
  },
  {
    question: "Which CPU scheduling algorithm can lead to starvation?",
    options: ["Round Robin", "First Come First Served", "Shortest Job First", "FIFO"],
    correctAnswer: 2,
    category: "OS",
    difficulty: "Medium",
    explanation: "Shortest Job First scheduling can cause starvation for longer jobs if shorter jobs constantly arrive at the queue."
  },
  {
    question: "Which normal form handles transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 2,
    category: "DBMS",
    difficulty: "Medium",
    explanation: "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key."
  },
  {
    question: "What is a virtual function in C++?",
    options: [
      "A function that cannot be modified",
      "A function defined in a base class and overridden by a derived class",
      "A function with no body",
      "A private utility function"
    ],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Medium",
    explanation: "A virtual function is used to ensure dynamic binding, where the overridden function in the derived class is called at runtime."
  },
  {
    question: "What is the primary function of the Address Resolution Protocol (ARP)?",
    options: [
      "Map IP address to MAC address",
      "Resolve domain names to IP addresses",
      "Establish secure TCP connection",
      "Route packets across subnets"
    ],
    correctAnswer: 0,
    category: "Networks",
    difficulty: "Medium",
    explanation: "ARP maps a dynamic Internet Protocol (IP) address to a permanent physical machine (MAC) address in a local network."
  },
  {
    question: "Which memory management scheme suffers from external fragmentation?",
    options: ["Segmentation", "Paging", "Virtual Memory", "Cache Mapping"],
    correctAnswer: 0,
    category: "OS",
    difficulty: "Medium",
    explanation: "Segmentation allocates variable-sized memory segments, leading to external fragmentation. Paging divides memory into fixed pages, avoiding this."
  },
  {
    question: "What is the purpose of an index in a database?",
    options: [
      "To encrypt stored records",
      "To speed up data retrieval operations",
      "To eliminate all duplicate values",
      "To enforce foreign key relationships"
    ],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Medium",
    explanation: "An index is a data structure that allows database engines to find rows quickly without performing a full-table scan."
  },
  {
    question: "Which type of inheritance is not directly supported in Java?",
    options: ["Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance", "Hierarchical Inheritance"],
    correctAnswer: 2,
    category: "OOPs",
    difficulty: "Medium",
    explanation: "Java does not support Multiple Inheritance with classes to avoid diamond problems, though it is supported through interfaces."
  },
  {
    question: "Which protocol is used to dynamically assign IP addresses to hosts on a network?",
    options: ["DHCP", "DNS", "FTP", "SMTP"],
    correctAnswer: 0,
    category: "Networks",
    difficulty: "Medium",
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, and gateways to clients."
  },
  {
    question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    category: "General",
    difficulty: "Medium",
    explanation: "Searching in a balanced BST takes logarithmic time, O(log n), because half the tree is eliminated at each decision step."
  },
  // --- HARD (10) ---
  {
    question: "What is the primary difference between a process and a thread?",
    options: [
      "Threads share the same memory space; processes have independent memory spaces",
      "Processes share the same memory space; threads have independent memory spaces",
      "Threads run on CPU; processes run on disk",
      "Processes can be multi-tasked; threads cannot"
    ],
    correctAnswer: 0,
    category: "OS",
    difficulty: "Hard",
    explanation: "A process has its own address space, file descriptors, and security context. Threads run within a process and share its address space."
  },
  {
    question: "What does the CAP Theorem state about distributed databases?",
    options: [
      "It is impossible to guarantee Consistency, Access, and Performance simultaneously",
      "A distributed system can only provide two of: Consistency, Availability, and Partition Tolerance",
      "Database structures must maintain Concurrency, Auditing, and Privacy",
      "Every database transaction must adhere to Complexity, Availability, and Portability"
    ],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Hard",
    explanation: "CAP Theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance."
  },
  {
    question: "In object-oriented design, what does the Liskov Substitution Principle (LSP) declare?",
    options: [
      "Objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior",
      "A class should only have a single reason to change",
      "Subclasses must hide all parent fields",
      "High-level modules should not depend on low-level modules"
    ],
    correctAnswer: 0,
    category: "OOPs",
    difficulty: "Hard",
    explanation: "LSP states that derived classes must be completely substitutable for their base classes, ensuring polymorphic correctness."
  },
  {
    question: "Which TCP congestion control phase occurs immediately after receiving three duplicate ACKs?",
    options: ["Slow Start", "Fast Recovery and Fast Retransmit", "Congestion Avoidance", "Timeout Phase"],
    correctAnswer: 1,
    category: "Networks",
    difficulty: "Hard",
    explanation: "Three duplicate ACKs suggest a packet was lost but network flow is active. TCP triggers Fast Retransmit and enters Fast Recovery, avoiding Slow Start."
  },
  {
    question: "What is the main goal of the Banker's Algorithm in an Operating System?",
    options: [
      "To optimize virtual memory allocations",
      "To assign priorities to system threads",
      "To safely allocate resources and prevent deadlocks",
      "To schedule disk read/write requests"
    ],
    correctAnswer: 2,
    category: "OS",
    difficulty: "Hard",
    explanation: "The Banker's Algorithm is a deadlock avoidance algorithm that checks if allocating resources leaves the system in a safe state."
  },
  {
    question: "Which indexing structure is most optimal for range-based queries in relational databases?",
    options: ["Hash Indexing", "B+ Tree Indexing", "Inverted Indexing", "Bitmap Indexing"],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Hard",
    explanation: "B+ Trees store records in sorted leaf nodes linked sequentially, making range queries (e.g. BETWEEN A AND B) extremely efficient."
  },
  {
    question: "What is the primary security vulnerability of the standard Diffie-Hellman key exchange without authentication?",
    options: [
      "Distributed Denial of Service",
      "SQL Query Injection",
      "Man-in-the-Middle Attack",
      "Stack Buffer Overflow"
    ],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Hard",
    explanation: "Diffie-Hellman establishes keys between anonymous parties. Without authentication, an active eavesdropper can intercept and negotiate keys with both sides."
  },
  {
    question: "In multi-threaded Java applications, what does the volatile keyword guarantee?",
    options: [
      "Thread lock exclusion on the variable block",
      "Ensures variable read/write operations bypass CPU caches and go directly to main memory",
      "Forces variables to remain immutable",
      "Converts a variable to thread-local storage"
    ],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Hard",
    explanation: "Volatile guarantees memory visibility. Changes to a volatile variable are immediately visible to all threads by forcing direct memory syncs."
  },
  {
    question: "What is the time complexity of the Floyd-Warshall algorithm for all-pairs shortest paths?",
    options: ["O(V log V)", "O(V^2)", "O(V^3)", "O(E log V)"],
    correctAnswer: 2,
    category: "General",
    difficulty: "Hard",
    explanation: "Floyd-Warshall uses three nested loops over the set of vertices V, yielding a time complexity of O(V^3)."
  },
  {
    question: "Which of the following is true about a compiler compared to an interpreter?",
    options: [
      "A compiler translates the entire source code to machine code before execution; an interpreter translates it line-by-line during runtime",
      "An interpreter produces a standalone executable file; a compiler does not",
      "A compiler executes programs faster initially than an interpreter",
      "Interpreted programs generally use less memory than compiled programs"
    ],
    correctAnswer: 0,
    category: "General",
    difficulty: "Hard",
    explanation: "Compilers convert high-level code into executable machine binaries beforehand. Interpreters evaluate source code sequentially on-the-fly."
  },

  // ==================== BUSINESS & FINANCE (15) ====================
  // --- EASY (5) ---
  {
    question: "What is the primary goal of portfolio diversification in finance?",
    options: ["To maximize portfolio volatility", "To reduce overall risk by spreading investments", "To eliminate capital gain taxes", "To guarantee double digit returns"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Easy",
    explanation: "Diversification spreads investments across various asset classes to lower the overall portfolio risk."
  },
  {
    question: "Which financial statement reports a firm's assets, liabilities, and equity at a specific point in time?",
    options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Retained Earnings statement"],
    correctAnswer: 2,
    category: "Business & Finance",
    difficulty: "Easy",
    explanation: "A Balance Sheet provides a financial snapshot of assets, liabilities, and owner's equity at a single point in time."
  },
  {
    question: "What does a high price-to-earnings (P/E) ratio typically suggest about a stock?",
    options: ["The stock is severely undervalued", "Investors expect high future earnings growth", "The company is facing bankruptcy", "The dividend yield will double"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Easy",
    explanation: "A high P/E ratio indicates that investors are willing to pay a premium because they expect strong earnings growth in the future."
  },
  {
    question: "What does liquidity represent in financial markets?",
    options: ["The total cash a firm holds in bank accounts", "The ease with which an asset can be converted into cash", "The total debt of a corporation", "The volatility index of stocks"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Easy",
    explanation: "Liquidity is the speed and ease with which an asset can be sold and converted into cash without affecting its market price."
  },
  {
    question: "What is inflation defined as?",
    options: ["The decrease in overall prices", "The rate at which the purchasing power of currency falls", "An increase in bank interest rates", "A stock market crash indicator"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Easy",
    explanation: "Inflation is the general increase in prices and fall in the purchasing value of money over time."
  },
  // --- MEDIUM (5) ---
  {
    question: "In corporate finance, what is the primary purpose of calculating Net Present Value (NPV)?",
    options: ["To calculate corporate tax liability", "To evaluate the profitability of a project investment", "To find stock price target", "To audit quarterly cash flows"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Medium",
    explanation: "NPV determines the present value of future cash flows minus initial investment, helping firms decide whether to greenlight projects."
  },
  {
    question: "What does the Sharpe Ratio measure?",
    options: ["Total absolute return of a portfolio", "Risk-adjusted return of an investment portfolio", "The leverage ratio of a commercial bank", "The dividend payout frequency"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Medium",
    explanation: "The Sharpe Ratio calculates the average excess return earned per unit of volatility or total risk."
  },
  {
    question: "What is a major difference between a future contract and an option contract?",
    options: ["Futures are traded on exchanges, options are not", "Futures oblige both parties to execute the trade, options give the buyer the right but not obligation", "Options are always cheaper", "Futures expire daily, options do not"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Medium",
    explanation: "Futures bind both buyer and seller to transaction execution at expiration. Options give the buyer a choice, while the seller is obligated if exercised."
  },
  {
    question: "Which of the following describes systemic risk?",
    options: ["Risk unique to a single company", "Risk inherent to the entire market or market segment", "Risk of software crash at exchange", "Risk of corporate audit failure"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Medium",
    explanation: "Systemic risk (or market risk) affects the entire financial system and cannot be diversified away."
  },
  {
    question: "What is the primary role of a central bank?",
    options: ["Provide personal loans to citizens", "Control money supply, interest rates, and manage inflation", "Underwrite stock IPOs", "Audit corporate tax filings"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Medium",
    explanation: "Central banks (like the Fed or RBI) manage monetary policy, stabilize currency, and act as lenders of last resort."
  },
  // --- HARD (5) ---
  {
    question: "According to Modern Portfolio Theory (MPT), what represents the 'Efficient Frontier'?",
    options: ["Portfolios that maximize risk for a given yield", "Portfolios that offer the highest expected return for a defined level of risk", "A list of risk-free asset classes", "The boundary of global interest rate swaps"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Hard",
    explanation: "The Efficient Frontier is a set of optimal portfolios that offer the maximum expected return for a defined level of risk."
  },
  {
    question: "What is the Black-Scholes model used for?",
    options: ["Valuing corporate real estate properties", "Pricing option contracts on financial markets", "Calculating debt default probabilities", "Evaluating company merger synergies"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Hard",
    explanation: "The Black-Scholes-Merton model is a mathematical formula used to estimate the theoretical price of European options."
  },
  {
    question: "What happens to bond prices when interest rates rise?",
    options: ["Bond prices rise proportionally", "Bond prices fall", "Bond prices remain completely unchanged", "Bond yields fall to zero"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Hard",
    explanation: "Bond prices share an inverse relationship with interest rates. When interest rates rise, existing bonds with lower coupon rates become less attractive, dropping their price."
  },
  {
    question: "In quantitative finance, what does 'Beta' represent?",
    options: ["The alpha growth rate of stock earnings", "The volatility of a stock relative to the overall market", "The debt-to-equity leverage ratio", "The probability of asset liquidation"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Hard",
    explanation: "Beta measures the systematic risk or sensitivity of an individual security or portfolio relative to movements in the benchmark market index."
  },
  {
    question: "What is a credit default swap (CDS)?",
    options: ["A low-interest personal credit card line", "A financial derivative that acts as insurance against borrower default", "An agreement to exchange floating interest rates", "A government credit rating index"],
    correctAnswer: 1,
    category: "Business & Finance",
    difficulty: "Hard",
    explanation: "A CDS is a credit derivative contract that allows an investor to swap or offset their credit risk with another investor."
  },

  // ==================== MECHANICAL ENGINEERING (15) ====================
  // --- EASY (5) ---
  {
    question: "Which law states that stress is directly proportional to strain within the elastic limit?",
    options: ["Newton's First Law", "Hooke's Law", "Pascal's Law", "Boyle's Law"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Easy",
    explanation: "Hooke's Law states that for relatively small deformations of an object, the displacement or size of the deformation is directly proportional to the deforming force or load."
  },
  {
    question: "What is the primary function of a flywheel in an engine?",
    options: ["To cool down engine pistons", "To store rotational energy and smooth out torque fluctuations", "To steer the transmission wheels", "To measure fuel level consumption"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Easy",
    explanation: "A flywheel stores kinetic energy during power strokes and delivers it back during other strokes, smoothing out rotational speed variation."
  },
  {
    question: "Which mechanical device is used to change the direction or magnitude of a force?",
    options: ["Piston", "Simple Machine (e.g. Lever, Pulley)", "Condenser", "Radiator"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Easy",
    explanation: "Simple machines (like levers, pulleys, and wedges) modify force magnitude or direction to make work easier."
  },
  {
    question: "What is torque defined as?",
    options: ["The rate of linear motion", "The rotational equivalent of linear force", "The friction inside a cylinder", "The pressure of steam exhaust"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Easy",
    explanation: "Torque is a measure of the force that can cause an object to rotate about an axis."
  },
  {
    question: "What is the unit of power in the SI system?",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Easy",
    explanation: "Power is the rate of doing work. In SI units, it is measured in Watts (Joules per second)."
  },
  // --- MEDIUM (5) ---
  {
    question: "What is the difference between a thermodynamic closed system and an open system?",
    options: ["Closed systems can exchange heat but not mass; open systems can exchange both", "Closed systems exchange mass but not heat", "Closed systems cannot exchange anything", "Open systems exchange only mass"],
    correctAnswer: 0,
    category: "Mechanical Engineering",
    difficulty: "Medium",
    explanation: "A closed system exchanges energy (heat/work) with surroundings but its mass remains constant. A open system exchanges both energy and mass."
  },
  {
    question: "What is the main purpose of adding gearing trains in machinery?",
    options: ["To eliminate lubricating friction", "To alter speed, torque, or direction of power transmission", "To cool the drive shaft axle", "To measure pressure thresholds"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Medium",
    explanation: "Gears mesh together to transmit power, allowing designers to trade rotational speed for torque or change shaft rotation directions."
  },
  {
    question: "What does viscosity measure in a fluid?",
    options: ["Fluid compressibility", "A fluid's resistance to gradual deformation by shear or tensile stress", "Surface tension density", "Boiling point temperature"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Medium",
    explanation: "Viscosity is a measure of a fluid's thickness or resistance to flow (internal friction)."
  },
  {
    question: "Which thermodynamic cycle is used as the standard of comparison for steam power plants?",
    options: ["Otto Cycle", "Rankine Cycle", "Carnot Cycle", "Diesel Cycle"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Medium",
    explanation: "The Rankine cycle is the idealized thermodynamic cycle that models steam turbine power systems."
  },
  {
    question: "What is the purpose of a Governor in an engine?",
    options: ["To measure engine oil temperature", "To maintain constant speed regardless of load changes", "To spark the combustion chamber", "To balance wheel alignments"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Medium",
    explanation: "A governor is a device used to measure and regulate the speed of a machine, keeping it constant despite changing loads."
  },
  // --- HARD (5) ---
  {
    question: "What is the difference between regenerative braking and conventional braking?",
    options: ["Regenerative brakes use friction pads to dissipate heat", "Regenerative brakes capture kinetic energy and convert it to stored energy", "Conventional brakes do not slow down wheels", "Regenerative brakes only work on steam engines"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Hard",
    explanation: "Regenerative brakes reverse the electric motor to slow down the vehicle, converting kinetic energy into electricity to recharge battery banks."
  },
  {
    question: "Which dimensionless number represents the ratio of inertial forces to viscous forces in fluid mechanics?",
    options: ["Nusselt Number", "Reynolds Number", "Prandtl Number", "Mach Number"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Hard",
    explanation: "The Reynolds number (Re) helps predict flow patterns (laminar vs turbulent) by comparing fluid inertia to internal viscous friction."
  },
  {
    question: "What causes cavitation in hydraulic pumps?",
    options: ["High fluid viscosity", "Vapor bubble formation and collapse due to local pressure drops", "Mechanical gear misalignment", "Excessive engine oil lubrication"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Hard",
    explanation: "Cavitation occurs when local pressure falls below vapor pressure, forming bubbles that collapse violently and erode metal impellers."
  },
  {
    question: "In mechanical design, what does the 'Endurance Limit' of a material define?",
    options: ["Maximum stress a material can withstand before static rupture", "Stress level below which a material can withstand infinite fatigue cycles", "The temperature threshold of thermal expansion", "The hardness index of a surface treatment"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Hard",
    explanation: "The endurance limit (or fatigue limit) is the stress level below which a material can be subjected to cyclic loading indefinitely without failure."
  },
  {
    question: "What is the primary function of a condenser in a Rankine steam cycle?",
    options: ["To superheat steam before entering the turbine", "To reject heat and condense exhaust steam back into liquid water", "To pump liquid water into the boiler", "To separate impurities from steam flow"],
    correctAnswer: 1,
    category: "Mechanical Engineering",
    difficulty: "Hard",
    explanation: "The condenser cools low-pressure turbine exhaust steam, converting it back to water so the pump can cycle it back to the boiler."
  },

  // ==================== ELECTRICAL ENGINEERING (15) ====================
  // --- EASY (5) ---
  {
    question: "What is Ohm's Law?",
    options: ["V = I^2 * R", "V = I * R", "P = V * I", "I = V^2 / R"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Easy",
    explanation: "Ohm's law states that current (I) is directly proportional to voltage (V) and inversely proportional to resistance (R), written as V = I * R."
  },
  {
    question: "Which component stores electrical energy in an electrostatic field?",
    options: ["Inductor", "Capacitor", "Resistor", "Diode"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Easy",
    explanation: "A capacitor stores charge on conductive plates separated by a dielectric, creating an electrostatic field."
  },
  {
    question: "What is the unit of electrical resistance?",
    options: ["Farad", "Ohm", "Henry", "Ampere"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Easy",
    explanation: "Electrical resistance is measured in Ohms. Farad is for capacitance, Henry for inductance."
  },
  {
    question: "What is the primary function of a transformer?",
    options: ["Convert AC voltage to DC voltage", "Change the voltage level of an AC signal", "Store electrical energy permanently", "Measure active power consumption"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Easy",
    explanation: "Transformers use electromagnetic induction to step up or step down AC voltage levels while maintaining power constant."
  },
  {
    question: "Which logic gate outputs high (1) only when all its inputs are low (0)?",
    options: ["AND", "NOR", "OR", "XOR"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Easy",
    explanation: "A NOR gate is a NOT-OR gate. It outputs high only when the OR gate output is low, which happens when all inputs are 0."
  },
  // --- MEDIUM (5) ---
  {
    question: "What does Kirchhoff's Current Law (KCL) state?",
    options: ["Total voltage drop in a loop is zero", "The sum of currents entering a node equals the sum of currents leaving it", "Current is inversely proportional to temperature", "Current cannot flow through magnetic cores"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Medium",
    explanation: "KCL is based on the conservation of charge: total charge entering any junction node must equal total charge exiting it."
  },
  {
    question: "What is the frequency of standard AC power grids in most of North America?",
    options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Medium",
    explanation: "North America operates its power grid at 60 Hz. Much of Europe and Asia uses 50 Hz."
  },
  {
    question: "Which semiconductor device allows current to flow in only one direction?",
    options: ["Transistor", "Diode", "Capacitor", "Transformer"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Medium",
    explanation: "A diode is a P-N junction device that allows electric current to pass in forward bias while blocking it in reverse bias."
  },
  {
    question: "What represents the power factor in an AC circuit?",
    options: ["Ratio of resistance to inductance", "Ratio of real power to apparent power", "Product of voltage and current", "Frequency of voltage oscillations"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Medium",
    explanation: "Power factor is the cosine of the phase difference between current and voltage, representing the ratio of active power (W) to apparent power (VA)."
  },
  {
    question: "What is the purpose of an operational amplifier (Op-Amp)?",
    options: ["Rectify alternating current", "Amplify weak electrical signals with high input impedance", "Protect against lightning EMP surges", "Step down grid transmission voltage"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Medium",
    explanation: "Op-Amps are high-gain differential DC amplifiers used to filter, buffer, and amplify analog signals."
  },
  // --- HARD (5) ---
  {
    question: "Which equation represents Faraday's Law of Electromagnetic Induction?",
    options: ["V = L * di/dt", "e = -dPhi/dt", "P = I^2 * R", "F = q * E"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Hard",
    explanation: "Faraday's law states that induced electromotive force (e) is proportional to the time rate of change of magnetic flux (Phi)."
  },
  {
    question: "What makes a synchronous motor different from an induction motor?",
    options: ["Synchronous motors run at speed directly proportional to load", "Synchronous motors rotate at the exact synchronous speed of the stator field", "Induction motors do not use AC power", "Synchronous motors do not require magnetic fields"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Hard",
    explanation: "Synchronous motors turn at synchronous speed in lockstep with grid frequency. Induction motors run slightly slower (slip speed) to induce rotor currents."
  },
  {
    question: "What does a Boolean half-adder compute?",
    options: ["Decimal division remainders", "Binary addition of two bits, yielding SUM and CARRY", "Voltage impedance factors", "AC phase angle vectors"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Hard",
    explanation: "A half-adder uses XOR gates to compute the binary sum bit (SUM) and AND gates to compute the overflow carry bit (CARRY)."
  },
  {
    question: "Which phenomenon describes the concentration of AC current density near the outer surface of a conductor?",
    options: ["Proximity Effect", "Skin Effect", "Corona Discharge", "Hall Effect"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Hard",
    explanation: "Skin effect is the tendency of AC to flow near the outer surface of a wire, increasing its effective resistance at high frequencies."
  },
  {
    question: "What is the purpose of using a snubber circuit in power electronics?",
    options: ["To boost high-frequency signal gains", "To suppress voltage spikes caused by inductive switching", "To convert DC back into clean AC", "To isolate digital logic rails"],
    correctAnswer: 1,
    category: "Electrical Engineering",
    difficulty: "Hard",
    explanation: "Snubbers (often RC networks) protect semiconductor switches by absorbing voltage transients during inductive turn-offs."
  },

  // ==================== HEALTHCARE & BIOTECH (15) ====================
  // --- EASY (5) ---
  {
    question: "What is the basic unit of life in all living organisms?",
    options: ["Atom", "Cell", "Molecule", "Organ"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Easy",
    explanation: "The cell is the basic structural, functional, and biological unit of all known organisms."
  },
  {
    question: "Which molecule stores genetic information in cells?",
    options: ["RNA", "DNA", "Protein", "Glucose"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Easy",
    explanation: "DNA (Deoxyribonucleic acid) is the hereditary material in humans and almost all other organisms."
  },
  {
    question: "What is a vaccine?",
    options: ["A treatment that cures active bacterial infections", "A biological preparation that provides active acquired immunity to a specific disease", "A high-dose vitamin supplement", "An antibiotic chemical compound"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Easy",
    explanation: "Vaccines train the immune system to recognize and fight pathogens by introducing weakened or inactive antigens."
  },
  {
    question: "Which organ in the human body is primarily responsible for filtering blood and producing urine?",
    options: ["Liver", "Kidneys", "Lungs", "Heart"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Easy",
    explanation: "The kidneys filter waste products and excess fluid from the bloodstream, excreting them as urine."
  },
  {
    question: "What is the primary role of red blood cells?",
    options: ["Fight bacterial pathogens", "Transport oxygen from lungs to the rest of the body", "Form blood clots to stop bleeding", "Produce insulin hormones"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Easy",
    explanation: "Red blood cells contain hemoglobin, a protein that binds oxygen and distributes it to tissues."
  },
  // --- MEDIUM (5) ---
  {
    question: "What is PCR (Polymerase Chain Reaction) used for in biotechnology?",
    options: ["Measuring blood pressure fluctuations", "Amplifying specific DNA sequences to make millions of copies", "Synthesizing glucose sugars", "Sterilizing surgical equipment"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Medium",
    explanation: "PCR is a core lab technique used to amplify small segments of DNA for analysis, cloning, or forensics."
  },
  {
    question: "What is the primary function of insulin in the human body?",
    options: ["Increase stomach acidity", "Regulate blood glucose levels by helping cells absorb sugar", "Trigger blood clot formations", "Synthesize peptide chains"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Medium",
    explanation: "Insulin is a hormone produced by the pancreas that allows cells to take in glucose from the blood to use as energy."
  },
  {
    question: "What represents the 'allosteric site' of an enzyme?",
    options: ["The primary cleft where substrates bind to react", "A secondary pocket away from the active site that regulates enzyme activity", "The nuclear wall receptor", "The peptide chain tail"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Medium",
    explanation: "The allosteric site is a regulatory site on an enzyme where molecules can bind, altering the enzyme shape and affecting activity at the active site."
  },
  {
    question: "What is recombinant DNA technology?",
    options: ["Breeding animals of different species", "Combining DNA molecules from two different species in a lab", "Extracting pure protein from blood", "Sequencing viral genomes by PCR"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Medium",
    explanation: "Recombinant DNA involves splicing together genetic material from different sources to create novel sequences, often used to manufacture insulin or growth hormones."
  },
  {
    question: "What is the main goal of Phase I clinical trials?",
    options: ["Prove drug efficacy in large patient cohorts", "Evaluate safety, establish dosage ranges, and identify side effects in a small group of healthy volunteers", "Compare the drug against existing placebos", "Get final FDA marketing approval"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Medium",
    explanation: "Phase I trials focus primarily on safety, tolerability, and pharmacokinetics in a small group of healthy volunteers before testing efficacy."
  },
  // --- HARD (5) ---
  {
    question: "What describes 'steric hindrance' in molecular docking?",
    options: ["The magnetic pull between charged atoms", "The prevention of chemical reactions due to spatial crowding of atoms", "The thermal speed of peptide folding", "The cell wall permeability rate"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Hard",
    explanation: "Steric hindrance occurs when the size of atoms within a molecule prevents chemical groups from aligning or binding due to spatial overlap."
  },
  {
    question: "What is CRISPR-Cas9?",
    options: ["A clinical thermometer model", "A genome editing tool that allows precise modifications to DNA", "A high-dose drug delivery capsule", "A virus classification system"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Hard",
    explanation: "CRISPR-Cas9 is a molecular technology adapted from bacterial immune systems that uses guide RNA to direct Cas9 enzymes to cut and edit specific DNA sequences."
  },
  {
    question: "Which molecule acts as the primary molecular energy currency in cellular metabolism?",
    options: ["DNA", "ATP (Adenosine Triphosphate)", "NADH", "Glucagon"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Hard",
    explanation: "ATP stores and transports chemical energy within cells, driving metabolic processes like muscle contraction and protein synthesis."
  },
  {
    question: "What occurs during translation in molecular biology?",
    options: ["DNA is copied into messenger RNA", "Ribosomes read mRNA sequences to synthesize specific amino acid peptide chains", "Peptides are broken down into glucose", "Viruses mutate their lipid casings"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Hard",
    explanation: "Translation is the process where ribosomes synthesize proteins using the genetic instruction codes carried by mRNA. Transcription is DNA-to-mRNA."
  },
  {
    question: "What is monoclonal antibody therapy?",
    options: ["A vaccine that stimulates polyclonal T-cells", "Lab-made proteins designed to bind specific targets (like cancer cells or virus spikes)", "A treatment using natural herbal antibodies", "A form of gene splicing inside bone marrow"],
    correctAnswer: 1,
    category: "Healthcare & Biotech",
    difficulty: "Hard",
    explanation: "Monoclonal antibodies are clone antibodies engineered in laboratories to bind to specific disease antigens, neutralizing them or marking them for immune destruction."
  }
];

// Helper to seed questions if empty or incomplete
const seedQuestionsIfNeeded = async () => {
  const count = await TriviaQuestion.countDocuments();
  if (count < 90) {
    console.log('🌱 Seeding/Resetting default CS Trivia Questions to match new Who Wants to Be a Millionaire suite...');
    await TriviaQuestion.deleteMany({});
    await TriviaQuestion.insertMany(DEFAULT_QUESTIONS);
  }
};

/**
 * @desc    Get random trivia questions sorted progressively by difficulty
 * @route   GET /api/games/trivia/questions
 * @access  Private
 */
export const getTriviaQuestions = asyncHandler(async (req, res) => {
  await seedQuestionsIfNeeded();
  
  const { category, limit = 15 } = req.query;
  const matchStage = {};
  
  if (category) {
    if (category === 'Computer Science') {
      matchStage.category = { $in: ['Computer Science', 'OS', 'DBMS', 'OOPs', 'Networks', 'General'] };
    } else {
      matchStage.category = category;
    }
  }

  const parsedLimit = parseInt(limit);

  if (parsedLimit === 15) {
    // Millionaire progression: 5 Easy, 5 Medium, 5 Hard
    const easyQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Easy' } },
      { $sample: { size: 5 } }
    ]);
    const mediumQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Medium' } },
      { $sample: { size: 5 } }
    ]);
    const hardQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Hard' } },
      { $sample: { size: 5 } }
    ]);

    const orderedQuestions = [...easyQs, ...mediumQs, ...hardQs];

    return res.status(200).json({
      success: true,
      data: orderedQuestions,
    });
  }

  const questions = await TriviaQuestion.aggregate([
    { $match: matchStage },
    { $sample: { size: parsedLimit } }
  ]);

  res.status(200).json({
    success: true,
    data: questions,
  });
});

/**
 * @desc    Get user's game stats
 * @route   GET /api/games/stats
 * @access  Private
 */
export const getMyGameStats = asyncHandler(async (req, res) => {
  let stats = await GameStats.findOne({ user: req.user._id });
  if (!stats) {
    stats = await GameStats.create({ user: req.user._id });
  }

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * @desc    Report trivia game outcome (Who Wants to Be a Millionaire)
 * @route   POST /api/games/trivia/report
 * @access  Private
 */
export const reportTriviaOutcome = asyncHandler(async (req, res) => {
  const { score, cashedOut } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP according to progressive Millionaire ladder
  let earnedXp = 5; // Default minor participation XP

  if (score === 15) {
    earnedXp = 500; // Grand prize
  } else if (cashedOut) {
    // Map of score-to-XP payouts when player cashes out safely
    const cashOutXpMap = {
      14: 400, 13: 300, 12: 250, 11: 200,
      10: 150, 9: 120, 8: 100, 7: 80, 6: 60,
      5: 50, 4: 40, 3: 30, 2: 20, 1: 10, 0: 0
    };
    earnedXp = cashOutXpMap[score] || 5;
  } else {
    // Player failed a question - drop to last safe milestone
    if (score >= 10) {
      earnedXp = 150; // Milestone 2 safe haven
    } else if (score >= 5) {
      earnedXp = 50;  // Milestone 1 safe haven
    } else {
      earnedXp = 5;   // Pre-milestone 1 failure
    }
  }

  stats.xp += earnedXp;
  stats.trivia.played += 1;

  // Deem a score >= 10 (clearing Milestone 2) as a "Won" match for trivia stats
  if (score >= 10 || score === 15) {
    stats.trivia.won += 1;
  }

  if (score > stats.trivia.highScore) {
    stats.trivia.highScore = score;
  }

  // Award Trivia Master badge
  if (stats.trivia.won >= 5 && !stats.badges.includes('Trivia Master')) {
    stats.badges.push('Trivia Master');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Report regex invaders score
 * @route   POST /api/games/regex/report
 * @access  Private
 */
export const reportRegexOutcome = asyncHandler(async (req, res) => {
  const { score, level } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP (20 per level reached, + score/10)
  const earnedXp = Math.round((level * 20) + (score / 10));
  stats.xp += earnedXp;

  // Update stats
  stats.regexInvaders.played += 1;
  if (score > stats.regexInvaders.highScore) {
    stats.regexInvaders.highScore = score;
  }
  if (level > stats.regexInvaders.maxLevelReached) {
    stats.regexInvaders.maxLevelReached = level;
  }

  // Award badges
  if (stats.regexInvaders.maxLevelReached >= 5 && !stats.badges.includes('Regex Commander')) {
    stats.badges.push('Regex Commander');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Get total game leaderboard
 * @route   GET /api/games/leaderboard
 * @access  Private
 */
export const getGameLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await GameStats.find()
    .populate('user', 'fullName avatar targetRole')
    .sort({ xp: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

/**
 * @desc    Report code golf game outcome
 * @route   POST /api/games/golf/report
 * @access  Private
 */
export const reportCodeGolfOutcome = asyncHandler(async (req, res) => {
  const { charCount, passed } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  let earnedXp = 5; // Consolation XP for playing
  if (passed) {
    // Shorter code yields more XP, minimum 15 XP + 40 XP pass bonus
    earnedXp = Math.max(15, Math.round(120 - charCount)) + 40;
    stats.xp += earnedXp;

    stats.codeGolf.played += 1;
    if (charCount < stats.codeGolf.shortestChar) {
      stats.codeGolf.shortestChar = charCount;
    }

    // Award Golf Champion badge if they solved it in <= 60 characters
    if (stats.codeGolf.shortestChar <= 60 && !stats.badges.includes('Golf Champion')) {
      stats.badges.push('Golf Champion');
    }
  } else {
    stats.xp += earnedXp;
    stats.codeGolf.played += 1;
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Report cyber defense patches outcome
 * @route   POST /api/games/cyber/report
 * @access  Private
 */
export const reportCyberDefenseOutcome = asyncHandler(async (req, res) => {
  const { patches } = req.body; // Number of successful patches (e.g. 0 to 3)
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // 40 XP per successful patch, plus 10 consolation XP if played but 0 patches
  const earnedXp = patches > 0 ? (patches * 40) : 10;
  stats.xp += earnedXp;

  stats.cyberDefense.played += 1;
  stats.cyberDefense.successfulPatches += patches;

  // Award Certified Secure Coder badge if they accumulated 6 successful patches
  if (stats.cyberDefense.successfulPatches >= 6 && !stats.badges.includes('Certified Secure Coder')) {
    stats.badges.push('Certified Secure Coder');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});
