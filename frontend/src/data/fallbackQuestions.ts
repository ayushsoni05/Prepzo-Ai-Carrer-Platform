/**
 * Fallback Question Bank for Assessment
 * Used when AI service (Ollama) is unavailable.
 * 6 sections × 20 questions = 120 questions total
 */

interface FallbackQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

interface FallbackSection {
  id: string;
  name: string;
  icon: string;
  timeLimit: number; // minutes
  questions: FallbackQuestion[];
}

// ────────────────────────────────────────────────────
// 1. DSA — Data Structures & Algorithms
// ────────────────────────────────────────────────────
const DSA_QUESTIONS: FallbackQuestion[] = [
  { id:"dsa1", question:"What is the time complexity of binary search on a sorted array?", options:["O(n)","O(n²)","O(log n)","O(1)"], correct:2, difficulty:"easy", explanation:"Binary search halves the space each step → O(log n)." },
  { id:"dsa2", question:"Which data structure follows LIFO (Last In First Out)?", options:["Queue","Linked List","Stack","Heap"], correct:2, difficulty:"easy", explanation:"Stack follows Last-In-First-Out ordering." },
  { id:"dsa3", question:"What is the worst-case time complexity of QuickSort?", options:["O(n log n)","O(n²)","O(n)","O(log n)"], correct:1, difficulty:"medium", explanation:"QuickSort degrades to O(n²) when pivot is always min/max." },
  { id:"dsa4", question:"Which traversal visits the root node first?", options:["Inorder","Preorder","Postorder","Level-order"], correct:1, difficulty:"easy", explanation:"Preorder traversal visits Root → Left → Right." },
  { id:"dsa5", question:"What data structure is used in BFS?", options:["Stack","Queue","Heap","Deque"], correct:1, difficulty:"easy", explanation:"BFS uses a Queue to explore nodes level by level." },
  { id:"dsa6", question:"Which sorting algorithm guarantees O(n log n) in all cases?", options:["Bubble Sort","Quick Sort","Merge Sort","Selection Sort"], correct:2, difficulty:"medium", explanation:"Merge Sort always divides and merges in O(n log n)." },
  { id:"dsa7", question:"What is the space complexity of an adjacency matrix for a graph with V vertices?", options:["O(V)","O(E)","O(V²)","O(V+E)"], correct:2, difficulty:"medium", explanation:"Adjacency matrix stores V×V entries." },
  { id:"dsa8", question:"In a min-heap, which element is at the root?", options:["Maximum element","Minimum element","Median element","Random element"], correct:1, difficulty:"easy", explanation:"Min-heap property: parent ≤ children, so root is minimum." },
  { id:"dsa9", question:"What is the average time complexity of hash table lookup?", options:["O(n)","O(log n)","O(1)","O(n log n)"], correct:2, difficulty:"easy", explanation:"Hash tables provide O(1) average-case lookup." },
  { id:"dsa10", question:"Which algorithm is used to find the shortest path in a weighted graph with non-negative edges?", options:["BFS","DFS","Dijkstra's","Bellman-Ford"], correct:2, difficulty:"medium", explanation:"Dijkstra's algorithm finds shortest paths with non-negative weights." },
  { id:"dsa11", question:"What is the maximum number of nodes at level L of a binary tree?", options:["L","2L","2^L","L²"], correct:2, difficulty:"medium", explanation:"At level L (starting from 0), max nodes = 2^L." },
  { id:"dsa12", question:"Dynamic Programming is primarily based on which principle?", options:["Divide and Conquer","Greedy Choice","Optimal Substructure","Brute Force"], correct:2, difficulty:"medium", explanation:"DP uses optimal substructure and overlapping subproblems." },
  { id:"dsa13", question:"Which data structure is most efficient for implementing LRU Cache?", options:["Array","Stack","HashMap + Doubly Linked List","Binary Tree"], correct:2, difficulty:"hard", explanation:"HashMap gives O(1) lookup, doubly linked list gives O(1) removal/insertion." },
  { id:"dsa14", question:"What is the time complexity of building a heap from an array?", options:["O(n log n)","O(n)","O(n²)","O(log n)"], correct:1, difficulty:"hard", explanation:"Bottom-up heapify runs in O(n) due to geometric series." },
  { id:"dsa15", question:"In a BST, what is the time complexity of search in the worst case?", options:["O(1)","O(log n)","O(n)","O(n log n)"], correct:2, difficulty:"medium", explanation:"A skewed BST degrades to a linked list → O(n)." },
  { id:"dsa16", question:"Which algorithm detects a cycle in a linked list using O(1) space?", options:["BFS","DFS","Floyd's Tortoise and Hare","Kruskal's"], correct:2, difficulty:"medium", explanation:"Floyd's algorithm uses two pointers: slow and fast." },
  { id:"dsa17", question:"What is the amortized time complexity of push in a dynamic array?", options:["O(n)","O(1)","O(log n)","O(n²)"], correct:1, difficulty:"hard", explanation:"Though occasional resize is O(n), amortized cost per push is O(1)." },
  { id:"dsa18", question:"Topological sort can be applied to which type of graph?", options:["Undirected cyclic","Directed acyclic (DAG)","Any directed graph","Weighted undirected"], correct:1, difficulty:"medium", explanation:"Topological ordering exists only for DAGs." },
  { id:"dsa19", question:"Which data structure supports prefix-based string search?", options:["Hash Map","BST","Trie","Stack"], correct:2, difficulty:"medium", explanation:"Tries store strings character by character for prefix search." },
  { id:"dsa20", question:"What is the time complexity of Kruskal's MST algorithm?", options:["O(V²)","O(E log E)","O(V+E)","O(E²)"], correct:1, difficulty:"hard", explanation:"Kruskal's sorts edges O(E log E) and uses union-find." },
];

// ────────────────────────────────────────────────────
// 2. DBMS — Database Management Systems
// ────────────────────────────────────────────────────
const DBMS_QUESTIONS: FallbackQuestion[] = [
  { id:"dbms1", question:"What does SQL stand for?", options:["Structured Query Language","Simple Query Language","Sequential Query Language","Standard Query Language"], correct:0, difficulty:"easy", explanation:"SQL = Structured Query Language." },
  { id:"dbms2", question:"Which normal form eliminates partial dependencies?", options:["1NF","2NF","3NF","BCNF"], correct:1, difficulty:"medium", explanation:"2NF removes partial dependencies on composite keys." },
  { id:"dbms3", question:"What does ACID stand for in database transactions?", options:["Atomicity, Consistency, Isolation, Durability","Advanced, Controlled, Integrated, Dynamic","Automated, Concurrent, Independent, Distributed","Association, Classification, Indexing, Decryption"], correct:0, difficulty:"easy", explanation:"ACID ensures reliable transactions." },
  { id:"dbms4", question:"Which type of JOIN returns only matching rows from both tables?", options:["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL OUTER JOIN"], correct:2, difficulty:"easy", explanation:"INNER JOIN returns rows with matches in both tables." },
  { id:"dbms5", question:"What is the purpose of an index in a database?", options:["Enforce constraints","Speed up queries","Normalize tables","Create backups"], correct:1, difficulty:"easy", explanation:"Indexes speed up data retrieval." },
  { id:"dbms6", question:"Which SQL statement is used to remove a table from the database?", options:["DELETE TABLE","REMOVE TABLE","DROP TABLE","ERASE TABLE"], correct:2, difficulty:"easy", explanation:"DROP TABLE removes the table structure and data." },
  { id:"dbms7", question:"What is the difference between DELETE and TRUNCATE?", options:["No difference","DELETE can have WHERE, TRUNCATE cannot","TRUNCATE can have WHERE, DELETE cannot","DELETE removes table, TRUNCATE removes rows"], correct:1, difficulty:"medium", explanation:"DELETE supports WHERE clause; TRUNCATE removes all rows faster." },
  { id:"dbms8", question:"What is a foreign key?", options:["A key from a foreign database","A primary key in another table referenced here","A key used for encryption","An index column"], correct:1, difficulty:"easy", explanation:"Foreign key references a primary key in another table." },
  { id:"dbms9", question:"Which of the following is NOT a type of database lock?", options:["Shared Lock","Exclusive Lock","Schema Lock","Format Lock"], correct:3, difficulty:"medium", explanation:"Format Lock doesn't exist; others are standard lock types." },
  { id:"dbms10", question:"What is normalization?", options:["Making data bigger","Organizing data to reduce redundancy","Encrypting data","Backing up data"], correct:1, difficulty:"easy", explanation:"Normalization organizes data to eliminate redundancy." },
  { id:"dbms11", question:"Which SQL aggregate function returns the number of rows?", options:["SUM()","AVG()","COUNT()","MAX()"], correct:2, difficulty:"easy", explanation:"COUNT() returns the number of rows." },
  { id:"dbms12", question:"What is a deadlock in DBMS?", options:["A crashed database","Two transactions waiting for each other forever","A failed query","A slow index"], correct:1, difficulty:"medium", explanation:"Deadlock: circular wait where transactions block each other." },
  { id:"dbms13", question:"Which indexing technique is most commonly used in RDBMS?", options:["Hash Index","Bitmap Index","B+ Tree","Linear Index"], correct:2, difficulty:"medium", explanation:"B+ Trees are the default index structure in most RDBMS." },
  { id:"dbms14", question:"What does a VIEW in SQL represent?", options:["A physical table","A virtual table based on a query","A stored procedure","A trigger"], correct:1, difficulty:"medium", explanation:"A VIEW is a virtual table defined by a SELECT query." },
  { id:"dbms15", question:"Which anomaly is prevented by 3NF?", options:["Insert anomaly only","Transitive dependency anomaly","All anomalies","Join anomaly"], correct:1, difficulty:"hard", explanation:"3NF eliminates transitive dependencies." },
  { id:"dbms16", question:"What is the difference between WHERE and HAVING?", options:["No difference","WHERE filters rows, HAVING filters groups","HAVING filters rows, WHERE filters groups","WHERE is faster"], correct:1, difficulty:"medium", explanation:"WHERE filters before grouping; HAVING filters after GROUP BY." },
  { id:"dbms17", question:"Which SQL clause is used to sort results?", options:["SORT BY","ORDER BY","GROUP BY","ARRANGE BY"], correct:1, difficulty:"easy", explanation:"ORDER BY sorts query results." },
  { id:"dbms18", question:"What is a stored procedure?", options:["A query saved in cache","A precompiled collection of SQL statements","A temporary table","An index type"], correct:1, difficulty:"medium", explanation:"Stored procedures are precompiled SQL code stored in the database." },
  { id:"dbms19", question:"What is sharding in databases?", options:["Deleting old data","Splitting data across multiple servers","Compressing data","Encrypting data"], correct:1, difficulty:"hard", explanation:"Sharding distributes data across multiple machines for scalability." },
  { id:"dbms20", question:"Which type of SQL command is GRANT?", options:["DDL","DML","DCL","TCL"], correct:2, difficulty:"medium", explanation:"GRANT is a Data Control Language (DCL) command." },
];

// ────────────────────────────────────────────────────
// 3. OS — Operating Systems
// ────────────────────────────────────────────────────
const OS_QUESTIONS: FallbackQuestion[] = [
  { id:"os1", question:"What is the main function of an operating system?", options:["Run applications","Manage hardware resources","Connect to internet","Edit files"], correct:1, difficulty:"easy", explanation:"OS manages hardware and software resources." },
  { id:"os2", question:"What is the difference between a process and a thread?", options:["No difference","Process is heavier and has own memory space; thread shares memory","Thread is heavier","Process shares memory with others"], correct:1, difficulty:"medium", explanation:"Threads share the process's address space; processes have separate memory." },
  { id:"os3", question:"Which scheduling algorithm can cause starvation?", options:["Round Robin","FCFS","Shortest Job First (SJF)","Random scheduling"], correct:2, difficulty:"medium", explanation:"SJF can starve long jobs if short jobs keep arriving." },
  { id:"os4", question:"What is a deadlock?", options:["A fast process","A situation where processes wait for each other indefinitely","A memory overflow","A CPU cache miss"], correct:1, difficulty:"easy", explanation:"Deadlock: circular wait causing permanent blocking." },
  { id:"os5", question:"Which of the following is NOT a condition for deadlock?", options:["Mutual Exclusion","Hold and Wait","Preemption","Circular Wait"], correct:2, difficulty:"medium", explanation:"Preemption prevents deadlock; its absence is required." },
  { id:"os6", question:"What is virtual memory?", options:["Extra RAM","Disk space used as extended memory","Cloud storage","Deleted memory"], correct:1, difficulty:"easy", explanation:"Virtual memory uses disk to extend available memory." },
  { id:"os7", question:"What is a page fault?", options:["A hardware error","Requested page not in main memory","A disk error","A CPU failure"], correct:1, difficulty:"medium", explanation:"Page fault occurs when a referenced page isn't in RAM." },
  { id:"os8", question:"Which replacement algorithm is optimal but impractical?", options:["LRU","FIFO","Optimal (Bélády's)","Clock"], correct:2, difficulty:"medium", explanation:"Optimal algorithm requires future knowledge of page references." },
  { id:"os9", question:"What is a semaphore?", options:["A type of CPU","A synchronization primitive for processes","A memory unit","A file type"], correct:1, difficulty:"medium", explanation:"Semaphores control access to shared resources." },
  { id:"os10", question:"What is context switching?", options:["Switching displays","Saving and loading process state when switching processes","Changing OS","Rebooting"], correct:1, difficulty:"easy", explanation:"Context switch saves current process state and loads another." },
  { id:"os11", question:"What is thrashing?", options:["Fast processing","Excessive paging causing performance drop","Memory leak","CPU overclocking"], correct:1, difficulty:"hard", explanation:"Thrashing: system spends more time paging than executing." },
  { id:"os12", question:"Which CPU scheduling has the smallest average waiting time?", options:["FCFS","Round Robin","SJF (Non-preemptive)","SRTF (Preemptive SJF)"], correct:3, difficulty:"hard", explanation:"SRTF (Shortest Remaining Time First) minimizes average wait." },
  { id:"os13", question:"What does the fork() system call do?", options:["Deletes a process","Creates a new child process","Moves a process","Pauses a process"], correct:1, difficulty:"medium", explanation:"fork() creates a child process as a copy of the parent." },
  { id:"os14", question:"What is the Banker's Algorithm used for?", options:["Banking software","Deadlock avoidance","Memory allocation","File management"], correct:1, difficulty:"hard", explanation:"Banker's algorithm checks if resource allocation leads to safe state." },
  { id:"os15", question:"What is an inode in file systems?", options:["Input node","Data structure storing file metadata","Internet node","Memory block"], correct:1, difficulty:"medium", explanation:"Inodes store file metadata (permissions, size, pointers)." },
  { id:"os16", question:"What is the purpose of TLB (Translation Lookaside Buffer)?", options:["Store files","Cache page table entries for fast address translation","Network buffer","Disk cache"], correct:1, difficulty:"hard", explanation:"TLB caches recent virtual-to-physical address translations." },
  { id:"os17", question:"What is a mutex?", options:["A CPU core","A mutual exclusion lock","A memory type","A file format"], correct:1, difficulty:"easy", explanation:"Mutex ensures only one thread accesses a resource at a time." },
  { id:"os18", question:"Which memory allocation strategy causes external fragmentation?", options:["Paging","Segmentation","Both","Neither"], correct:1, difficulty:"medium", explanation:"Segmentation causes external fragmentation; paging causes internal." },
  { id:"os19", question:"What is the difference between preemptive and non-preemptive scheduling?", options:["No difference","Preemptive can interrupt running process; non-preemptive cannot","Non-preemptive is faster","Preemptive uses less CPU"], correct:1, difficulty:"medium", explanation:"Preemptive scheduling can forcibly switch processes." },
  { id:"os20", question:"What is a system call?", options:["A phone call","Interface between user program and OS kernel","A network request","A hardware interrupt"], correct:1, difficulty:"easy", explanation:"System calls provide services from the OS kernel." },
];

// ────────────────────────────────────────────────────
// 4. CN — Computer Networks
// ────────────────────────────────────────────────────
const CN_QUESTIONS: FallbackQuestion[] = [
  { id:"cn1", question:"How many layers are in the OSI model?", options:["5","6","7","4"], correct:2, difficulty:"easy", explanation:"OSI model has 7 layers." },
  { id:"cn2", question:"Which protocol is connection-oriented?", options:["UDP","TCP","ICMP","ARP"], correct:1, difficulty:"easy", explanation:"TCP establishes connections before data transfer." },
  { id:"cn3", question:"What port does HTTP use by default?", options:["443","21","80","22"], correct:2, difficulty:"easy", explanation:"HTTP uses port 80; HTTPS uses 443." },
  { id:"cn4", question:"What does DNS stand for?", options:["Domain Name System","Data Network Service","Digital Node System","Dynamic Network Service"], correct:0, difficulty:"easy", explanation:"DNS translates domain names to IP addresses." },
  { id:"cn5", question:"Which layer of the OSI model handles routing?", options:["Data Link","Transport","Network","Application"], correct:2, difficulty:"easy", explanation:"Network layer (Layer 3) handles routing." },
  { id:"cn6", question:"What is the difference between TCP and UDP?", options:["No difference","TCP is reliable and connection-oriented; UDP is unreliable and connectionless","UDP is more reliable","TCP is faster"], correct:1, difficulty:"medium", explanation:"TCP guarantees delivery; UDP prioritizes speed." },
  { id:"cn7", question:"What is a subnet mask used for?", options:["Hide IP address","Divide IP address into network and host parts","Encrypt data","Speed up routing"], correct:1, difficulty:"medium", explanation:"Subnet mask separates network and host portions." },
  { id:"cn8", question:"Which device operates at the Data Link layer?", options:["Router","Hub","Switch","Gateway"], correct:2, difficulty:"medium", explanation:"Switches forward frames using MAC addresses (Layer 2)." },
  { id:"cn9", question:"What is ARP?", options:["Application Routing Protocol","Address Resolution Protocol","Automated Response Protocol","Active Relay Protocol"], correct:1, difficulty:"medium", explanation:"ARP resolves IP addresses to MAC addresses." },
  { id:"cn10", question:"What does HTTPS add over HTTP?", options:["Speed","TLS/SSL encryption","Compression","Caching"], correct:1, difficulty:"easy", explanation:"HTTPS = HTTP + TLS/SSL security layer." },
  { id:"cn11", question:"What is NAT?", options:["Network Attachment Terminal","Network Address Translation","Node Access Technology","None of the above"], correct:1, difficulty:"medium", explanation:"NAT maps private IPs to public IPs for internet access." },
  { id:"cn12", question:"Which protocol is used for email sending?", options:["POP3","IMAP","SMTP","FTP"], correct:2, difficulty:"easy", explanation:"SMTP (Simple Mail Transfer Protocol) sends emails." },
  { id:"cn13", question:"What is a VLAN?", options:["Very Large Area Network","Virtual Local Area Network","Verified LAN","Variable LAN"], correct:1, difficulty:"medium", explanation:"VLAN logically segments a network at Layer 2." },
  { id:"cn14", question:"What is the maximum data in a single TCP segment governed by?", options:["MSS","MTU","Window size","All of the above"], correct:3, difficulty:"hard", explanation:"All three factors affect maximum TCP segment data." },
  { id:"cn15", question:"What does a firewall do?", options:["Increases speed","Filters incoming and outgoing network traffic","Stores data","Assigns IP addresses"], correct:1, difficulty:"easy", explanation:"Firewalls filter traffic based on security rules." },
  { id:"cn16", question:"Which routing protocol uses distance-vector algorithm?", options:["OSPF","RIP","BGP","IS-IS"], correct:1, difficulty:"hard", explanation:"RIP uses Bellman-Ford distance-vector algorithm." },
  { id:"cn17", question:"What is CIDR notation?", options:["A file format","IP address with prefix length (e.g., /24)","A protocol","A security standard"], correct:1, difficulty:"medium", explanation:"CIDR notation specifies IP address and routing prefix." },
  { id:"cn18", question:"What is the 3-way handshake in TCP?", options:["GET-POST-PUT","SYN → SYN-ACK → ACK","ACK → SYN → FIN","REQUEST → RESPONSE → CLOSE"], correct:1, difficulty:"medium", explanation:"TCP establishes connection with SYN, SYN-ACK, ACK." },
  { id:"cn19", question:"Which protocol provides IP addresses automatically?", options:["DNS","ARP","DHCP","SNMP"], correct:2, difficulty:"easy", explanation:"DHCP dynamically assigns IP addresses to devices." },
  { id:"cn20", question:"What is a CDN?", options:["Central Data Node","Content Delivery Network","Cached DNS","None"], correct:1, difficulty:"medium", explanation:"CDN distributes content across servers for faster delivery." },
];

// ────────────────────────────────────────────────────
// 5. OOPS — Object-Oriented Programming
// ────────────────────────────────────────────────────
const OOPS_QUESTIONS: FallbackQuestion[] = [
  { id:"oop1", question:"What are the four pillars of OOP?", options:["Arrays, Loops, Functions, Variables","Encapsulation, Abstraction, Inheritance, Polymorphism","HTML, CSS, JS, SQL","Process, Thread, Memory, IO"], correct:1, difficulty:"easy", explanation:"The four OOP pillars: Encapsulation, Abstraction, Inheritance, Polymorphism." },
  { id:"oop2", question:"What is encapsulation?", options:["Hiding internal state and requiring methods for access","Inheriting from a parent","Creating multiple forms","Removing classes"], correct:0, difficulty:"easy", explanation:"Encapsulation bundles data with methods and restricts direct access." },
  { id:"oop3", question:"What is polymorphism?", options:["One class only","Many forms — same interface, different implementations","Loop optimization","Memory management"], correct:1, difficulty:"easy", explanation:"Polymorphism lets objects respond differently to the same method." },
  { id:"oop4", question:"What is the difference between method overloading and overriding?", options:["No difference","Overloading: same name different params; Overriding: child redefines parent method","Overloading is in child class","Overriding changes parameter types"], correct:1, difficulty:"medium", explanation:"Overloading = same name, different signatures. Overriding = child redefines parent method." },
  { id:"oop5", question:"What is an abstract class?", options:["A class that cannot be instantiated and may have abstract methods","A class with no methods","A final class","A static class"], correct:0, difficulty:"medium", explanation:"Abstract classes define incomplete functionality for subclasses." },
  { id:"oop6", question:"Which SOLID principle states a class should have one reason to change?", options:["Open/Closed","Liskov Substitution","Single Responsibility","Dependency Inversion"], correct:2, difficulty:"medium", explanation:"SRP: a class should have only one responsibility." },
  { id:"oop7", question:"What is an interface?", options:["A UI element","A contract specifying methods a class must implement","A variable type","A loop structure"], correct:1, difficulty:"easy", explanation:"Interface defines method signatures without implementation." },
  { id:"oop8", question:"What is the Singleton design pattern?", options:["Multiple instances","Exactly one instance of a class","No instances","Random instances"], correct:1, difficulty:"medium", explanation:"Singleton ensures only one instance exists." },
  { id:"oop9", question:"What is composition in OOP?", options:["A class containing objects of other classes","Inheriting from two classes","Overloading operators","Using static methods"], correct:0, difficulty:"medium", explanation:"Composition uses 'has-a' relationships instead of 'is-a'." },
  { id:"oop10", question:"What is the diamond problem?", options:["Database issue","Ambiguity in multiple inheritance when two parents have same method","Memory leak","A sorting problem"], correct:1, difficulty:"hard", explanation:"Diamond problem: ambiguity when class inherits from two classes with same method." },
  { id:"oop11", question:"What is the Factory design pattern?", options:["Builds factories","Creates objects without specifying exact class","Destroys objects","None"], correct:1, difficulty:"medium", explanation:"Factory pattern delegates instantiation to subclasses/methods." },
  { id:"oop12", question:"What does the 'super' keyword do?", options:["Makes class abstract","Calls parent class constructor or method","Deletes an object","Creates a subclass"], correct:1, difficulty:"easy", explanation:"super references the parent class methods/constructor." },
  { id:"oop13", question:"What is late binding (dynamic dispatch)?", options:["Compiling early","Method resolved at runtime, not compile time","Memory allocation","Threading"], correct:1, difficulty:"hard", explanation:"Late binding resolves method calls at runtime for polymorphism." },
  { id:"oop14", question:"What is the Open/Closed Principle?", options:["Open to changes, closed to testing","Open for extension, closed for modification","Always open source","Close unused classes"], correct:1, difficulty:"medium", explanation:"OCP: extend behavior without modifying existing code." },
  { id:"oop15", question:"What is the Observer design pattern?", options:["Watching files","One-to-many dependency where observers are notified of state changes","Logging pattern","Error handling"], correct:1, difficulty:"hard", explanation:"Observer: subjects notify observers on state changes." },
  { id:"oop16", question:"What is constructor overloading?", options:["Multiple constructors with different parameters","Only one constructor","Deleting constructors","Renaming constructors"], correct:0, difficulty:"easy", explanation:"Constructor overloading: multiple constructors with different signatures." },
  { id:"oop17", question:"What is the Liskov Substitution Principle?", options:["Child can replace parent without breaking behavior","Parent replaces child","No inheritance allowed","Use interfaces only"], correct:0, difficulty:"hard", explanation:"LSP: subtypes must be substitutable for their base types." },
  { id:"oop18", question:"What is multiple inheritance?", options:["A class inheriting from multiple classes","Multiple objects","Nested classes","Sequential inheritance"], correct:0, difficulty:"medium", explanation:"Multiple inheritance: class extends more than one parent class." },
  { id:"oop19", question:"What is the difference between abstract class and interface?", options:["No difference","Abstract class can have implementations; interface (traditionally) cannot","Interface has constructors","Abstract class has no methods"], correct:1, difficulty:"medium", explanation:"Abstract classes can have method bodies; interfaces define contracts." },
  { id:"oop20", question:"What is Dependency Injection?", options:["Injecting SQL","Providing dependencies externally rather than creating them inside the class","A security vulnerability","Memory injection"], correct:1, difficulty:"hard", explanation:"DI provides dependencies from outside, improving testability." },
];

// ────────────────────────────────────────────────────
// 6. Aptitude — Logical & Quantitative Reasoning
// ────────────────────────────────────────────────────
const APTITUDE_QUESTIONS: FallbackQuestion[] = [
  { id:"apt1", question:"If a train travels 120 km in 2 hours, what is its speed?", options:["50 km/h","60 km/h","80 km/h","100 km/h"], correct:1, difficulty:"easy", explanation:"Speed = Distance/Time = 120/2 = 60 km/h." },
  { id:"apt2", question:"What comes next: 2, 6, 12, 20, 30, ?", options:["40","42","44","36"], correct:1, difficulty:"medium", explanation:"Differences: 4,6,8,10 → next diff=12 → 30+12=42." },
  { id:"apt3", question:"A can do a job in 10 days, B in 15 days. Together how many days?", options:["5","6","7","8"], correct:1, difficulty:"medium", explanation:"Rate A=1/10, B=1/15. Together 1/10+1/15=1/6. So 6 days." },
  { id:"apt4", question:"If 5x + 3 = 28, what is x?", options:["3","4","5","6"], correct:2, difficulty:"easy", explanation:"5x = 25, x = 5." },
  { id:"apt5", question:"A shopkeeper sells at 20% profit. Cost is ₹500. Selling price?", options:["₹550","₹600","₹700","₹650"], correct:1, difficulty:"easy", explanation:"SP = 500 + 20% of 500 = 500 + 100 = ₹600." },
  { id:"apt6", question:"How many ways can 5 people sit in a row?", options:["25","60","120","24"], correct:2, difficulty:"medium", explanation:"5! = 5×4×3×2×1 = 120." },
  { id:"apt7", question:"The probability of getting a head in a fair coin toss is?", options:["1","0","1/2","1/4"], correct:2, difficulty:"easy", explanation:"Fair coin: P(Head) = 1/2." },
  { id:"apt8", question:"If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls?", options:["15","20","25","10"], correct:1, difficulty:"easy", explanation:"3:2, boys=30 → each unit = 10 → girls = 2×10 = 20." },
  { id:"apt9", question:"A clock shows 3:15. What is the angle between the hands?", options:["0°","7.5°","22.5°","90°"], correct:1, difficulty:"hard", explanation:"At 3:15, minute=90°, hour=97.5°. Angle = 7.5°." },
  { id:"apt10", question:"What is 15% of 200?", options:["25","30","35","20"], correct:1, difficulty:"easy", explanation:"15% of 200 = 0.15 × 200 = 30." },
  { id:"apt11", question:"Complete the series: A, C, F, J, ?", options:["N","O","P","M"], correct:1, difficulty:"medium", explanation:"Gaps: +2, +3, +4, +5 → J+5=O." },
  { id:"apt12", question:"Two pipes fill a tank in 6 and 8 hours. Together how long?", options:["3 hrs 26 min","2 hrs","4 hrs","3 hrs"], correct:0, difficulty:"medium", explanation:"Rate = 1/6+1/8 = 7/24. Time = 24/7 ≈ 3 hrs 26 min." },
  { id:"apt13", question:"A number is increased by 20% then decreased by 20%. Net change?", options:["No change","-4%","+4%","-2%"], correct:1, difficulty:"medium", explanation:"100→120→96. Net change = -4%." },
  { id:"apt14", question:"If all Zips are Zaps, all Zaps are Zops. Are all Zips Zops?", options:["Yes","No","Cannot determine","Maybe"], correct:0, difficulty:"easy", explanation:"Zips ⊂ Zaps ⊂ Zops, so all Zips are Zops." },
  { id:"apt15", question:"Average of 5, 10, 15, 20, 25 is?", options:["12","15","18","20"], correct:1, difficulty:"easy", explanation:"Sum=75, Count=5, Average=75/5=15." },
  { id:"apt16", question:"A car takes 4 hours at 60 km/h. Time at 80 km/h?", options:["2 hrs","3 hrs","4 hrs","5 hrs"], correct:1, difficulty:"medium", explanation:"Distance = 240 km. At 80 km/h, time = 240/80 = 3 hrs." },
  { id:"apt17", question:"In how many ways can you choose 3 from 5 items?", options:["5","10","15","20"], correct:1, difficulty:"medium", explanation:"C(5,3) = 5!/(3!×2!) = 10." },
  { id:"apt18", question:"Compound interest on ₹1000 at 10% for 2 years?", options:["₹200","₹210","₹220","₹250"], correct:1, difficulty:"medium", explanation:"CI = 1000×(1.1²-1) = 1000×0.21 = ₹210." },
  { id:"apt19", question:"If SEND=9567, MORE=1085, what is MONEY?", options:["10652","10562","10625","10256"], correct:0, difficulty:"hard", explanation:"Classic cryptarithmetic: SEND+MORE=MONEY=10652." },
  { id:"apt20", question:"A boat's speed in still water is 10 km/h, stream speed 2 km/h. Upstream speed?", options:["12 km/h","8 km/h","10 km/h","6 km/h"], correct:1, difficulty:"easy", explanation:"Upstream = boat - stream = 10-2 = 8 km/h." },
];

// ────────────────────────────────────────────────────
// Export all sections
// ────────────────────────────────────────────────────

export const FALLBACK_SECTIONS: FallbackSection[] = [
  { id: "dsa",     name: "DSA",                icon: "🌳", timeLimit: 25, questions: DSA_QUESTIONS },
  { id: "dbms",    name: "DBMS",               icon: "🗄️", timeLimit: 25, questions: DBMS_QUESTIONS },
  { id: "os",      name: "Operating Systems",   icon: "⚙️", timeLimit: 25, questions: OS_QUESTIONS },
  { id: "cn",      name: "Computer Networks",   icon: "🌐", timeLimit: 25, questions: CN_QUESTIONS },
  { id: "oops",    name: "OOPS",               icon: "🔷", timeLimit: 25, questions: OOPS_QUESTIONS },
  { id: "aptitude",name: "Aptitude",            icon: "🧮", timeLimit: 25, questions: APTITUDE_QUESTIONS },
];

export default FALLBACK_SECTIONS;
