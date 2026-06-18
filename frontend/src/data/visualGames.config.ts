export interface VisualPuzzleLevel {
  id: string;
  name: string;
  objective: string;
  hint: string;
  initialState: any;
  validation: (state: any) => boolean;
  layoutInfo: {
    type: 'network' | 'finance' | 'mechanical' | 'electrical' | 'biotech';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    instructions: string[];
    sliderLabel?: string;
    sliderMin?: number;
    sliderMax?: number;
    options?: string[];
  };
  character: {
    name: string;
    avatar: string;
    dialogue: string;
    hintText: string;
  };
  countdown: number; // in seconds
  sabotageRate?: number; // millisecond interval, e.g. 10000 for 10s
}

export interface DomainDeck {
  id: string;
  title: string;
  iconName: string;
  colorClass: string;
  description: string;
  levels: VisualPuzzleLevel[];
}

export const VISUAL_PUZZLE_DECKS: DomainDeck[] = [
  {
    id: 'cs',
    title: 'Computer Science',
    iconName: 'Server',
    colorClass: 'from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-400',
    description: 'API Gateway Flow. Defend server clusters against active DDoS sieges.',
    levels: [
      {
        id: 'cs-1',
        name: 'Level 1: Route Balancer',
        objective: 'Set the load balancing weight slider to exactly 50% (0.50) to split API requests equally between the two online databases.',
        hint: 'Slide the weight value to exactly 0.50.',
        initialState: {
          connectedTo: 'db-a',
          sliderVal: 0.0,
        },
        validation: (state) => state.connectedTo === 'db-a' && Math.abs(state.sliderVal - 0.5) < 0.05,
        layoutInfo: {
          type: 'network',
          difficulty: 'Easy',
          instructions: [
            '1. Ensure Gateway routing is active.',
            '2. Adjust the Routing Weight slider to exactly 0.50.'
          ],
          sliderLabel: 'Routing Weight (DB_A vs DB_B)',
          sliderMin: 0,
          sliderMax: 1
        },
        character: {
          name: 'Agent Sarah',
          avatar: '👩‍💻',
          dialogue: 'We are under a minor scanning sweep! Set the balancer load weight to exactly 50/50 split (0.50) so our intrusion detection logs can sync correctly.',
          hintText: 'Adjust the load balancer slider to 0.50. This splits requests equally, preventing logs from dropping out.'
        },
        countdown: 60
      },
      {
        id: 'cs-2',
        name: 'Level 2: Bandwidth Overload',
        objective: 'Database A is hitting a bandwidth threshold! Route traffic to BOTH databases, and set the slider to 0.20 (20% to A, 80% to B) to prevent DB A from crashing.',
        hint: 'Toggle Gateway routing to "both" databases and slide the load value to 0.20.',
        initialState: {
          connectedTo: 'db-a',
          sliderVal: 0.5,
        },
        validation: (state) => state.connectedTo === 'both' && Math.abs(state.sliderVal - 0.2) < 0.05,
        layoutInfo: {
          type: 'network',
          difficulty: 'Medium',
          instructions: [
            '1. Click Gateway connector to target "Both" databases.',
            '2. Set the Routing slider to 0.20 to offload traffic from DB A.'
          ],
          sliderLabel: 'Load Distribution to DB_A',
          sliderMin: 0,
          sliderMax: 1
        },
        character: {
          name: 'Agent Sarah',
          avatar: '👩‍💻',
          dialogue: 'Alert! DB A is reaching thermal limits due to a sudden bandwidth spike. Distribute the route to BOTH targets, and throttle DB A to exactly 20% (0.20) load!',
          hintText: 'First click "Split Both" under routing options, then slide the load ratio to 0.20 to protect DB A.'
        },
        countdown: 45,
        sabotageRate: 15000 // hacker sabotage every 15 seconds
      },
      {
        id: 'cs-3',
        name: 'Level 3: CDN Caching Route',
        objective: 'High-latency alert! Route traffic directly to the CDN cache node, and set the cache routing slider to 75% (0.75) to maintain response latency under 100ms.',
        hint: 'Select the CDN node as the active route and set the cache slider to 0.75.',
        initialState: {
          connectedTo: 'both',
          sliderVal: 0.2,
        },
        validation: (state) => state.connectedTo === 'cdn' && Math.abs(state.sliderVal - 0.75) < 0.05,
        layoutInfo: {
          type: 'network',
          difficulty: 'Hard',
          instructions: [
            '1. Route traffic directly to the CDN node.',
            '2. Adjust the cache routing weight slider to 0.75.'
          ],
          sliderLabel: 'CDN Cache hit ratio',
          sliderMin: 0,
          sliderMax: 1
        },
        character: {
          name: 'Agent Sarah',
          avatar: '👩‍💻',
          dialogue: 'They have initiated a full DDoS! The primary database grid is melting. Route everything directly to the CDN_CACHE, and tune the cache hit ratio to exactly 75% (0.75) to absorb the traffic!',
          hintText: 'Click "CDN Route" to isolate databases, then adjust the cache ratio slider to exactly 0.75.'
        },
        countdown: 30,
        sabotageRate: 10000
      }
    ]
  },
  {
    id: 'finance',
    title: 'Business & Finance',
    iconName: 'TrendingUp',
    colorClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
    description: 'Portfolio Frontier. Rebalance assets visually to hedge against sudden market crashes.',
    levels: [
      {
        id: 'finance-1',
        name: 'Level 1: Balanced Yield',
        objective: 'Rebalance the asset sliders. Set Equity to 50% and Bonds to 50% to target a balanced return with moderate risk.',
        hint: 'Set Equity (Stocks) slider to 50% and Bonds slider to 50%.',
        initialState: {
          equity: 10,
          bonds: 90
        },
        validation: (state) => Math.abs(state.equity - 50) < 2 && Math.abs(state.bonds - 50) < 2,
        layoutInfo: {
          type: 'finance',
          difficulty: 'Easy',
          instructions: [
            '1. Move the Stocks slider to 50%.',
            '2. Move the Bonds slider to 50%.'
          ]
        },
        character: {
          name: 'Marcus Sterling',
          avatar: '💼',
          dialogue: 'The market index is experiencing minor variance. Adjust allocations to exactly 50% Equity and 50% Bonds to lock in a stable balanced yield.',
          hintText: 'Bring Stocks allocation slider to 50%, and shift Bonds to 50%. This balances default risks.'
        },
        countdown: 60
      },
      {
        id: 'finance-2',
        name: 'Level 2: Volatility Shield',
        objective: 'Market crash imminent! Move Bonds to 0% and rebalance by setting Equity to 40% and Gold allocation to 60% as a safe haven shield.',
        hint: 'Drop Bonds to 0% and Gold allocation to 60%.',
        initialState: {
          equity: 50,
          gold: 0,
          bonds: 50
        },
        validation: (state) => Math.abs(state.equity - 40) < 2 && Math.abs(state.gold - 60) < 2 && state.bonds === 0,
        layoutInfo: {
          type: 'finance',
          difficulty: 'Medium',
          instructions: [
            '1. Drop Bonds to 0% to avoid default risk.',
            '2. Adjust Equity to 40% and Gold to 60%.'
          ]
        },
        character: {
          name: 'Marcus Sterling',
          avatar: '💼',
          dialogue: 'Emergency briefing! Tech stocks are crashing and bond yields are diving. Wipe out Bonds completely (0%), and hedge capital by putting 40% in Equity and 60% in Gold!',
          hintText: 'Gold behaves as a buffer during downturns. Rebalance allocations to 40% Stocks, 60% Gold, and 0% Bonds.'
        },
        countdown: 45
      },
      {
        id: 'finance-3',
        name: 'Level 3: Sharpe Optimization',
        objective: 'Optimize the Sharpe Ratio tangency on the Efficient Frontier. Adjust the sliders to exactly 70% Equity, 15% Gold, and 15% Bonds.',
        hint: 'Rebalance allocations: Equity=70%, Gold=15%, Bonds=15%.',
        initialState: {
          equity: 40,
          gold: 30,
          bonds: 30
        },
        validation: (state) => Math.abs(state.equity - 70) < 2 && Math.abs(state.gold - 15) < 2 && Math.abs(state.bonds - 15) < 2,
        layoutInfo: {
          type: 'finance',
          difficulty: 'Hard',
          instructions: [
            '1. Target maximum return/risk ratio.',
            '2. Allocate Stocks to 70% and split the remainder equally between Gold and Bonds.'
          ]
        },
        character: {
          name: 'Marcus Sterling',
          avatar: '💼',
          dialogue: 'We need to pitch our hedging model to investors. Maximize the Sharpe Ratio by finding the tangency point. Set Equity to 70%, and divide the rest equally between Gold and Bonds!',
          hintText: 'Adjust allocations to Stocks = 70%, Gold = 15%, and Bonds = 15% to optimize return volatility.'
        },
        countdown: 30
      }
    ]
  },
  {
    id: 'me',
    title: 'Mechanical Engineering',
    iconName: 'Settings',
    colorClass: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
    description: 'Gear Torque Sync. Prevent a steam explosion by aligning reactor coolant gear trains.',
    levels: [
      {
        id: 'me-1',
        name: 'Level 1: Speed Linkage',
        objective: 'Select the Medium gear (24T) from the toolbox on the left and place it onto the center peg to bridge the motor transmission.',
        hint: 'Tap the Medium Gear and verify it locks onto the central peg shaft.',
        initialState: {
          gearPlaced: false,
          gearSize: ''
        },
        validation: (state) => state.gearPlaced && state.gearSize === 'medium',
        layoutInfo: {
          type: 'mechanical',
          difficulty: 'Easy',
          instructions: [
            '1. Select the 24T Medium Gear from the inventory.',
            '2. Place it on the central peg to complete the linkage.'
          ]
        },
        character: {
          name: 'Elena Rostova',
          avatar: '🔧',
          dialogue: 'We have lost power to the primary cooling valve! Quick, complete the linkage between the motor shaft and output gear. Tap the 24T Medium gear in our toolbox.',
          hintText: 'Click the 24T (Medium) Gear in the inventory to snap it onto the center shaft.'
        },
        countdown: 60
      },
      {
        id: 'me-2',
        name: 'Level 2: Direction Reversal',
        objective: 'The output conveyor must spin Counter-Clockwise (CCW). Place both Peg 1 (Medium gear) and Peg 2 (Small gear) to reverse output rotation.',
        hint: 'Click on both Peg 1 and Peg 2 to insert the required interlocking gear set.',
        initialState: {
          pegsOccupied: [] as string[]
        },
        validation: (state) => state.pegsOccupied.includes('peg-1') && state.pegsOccupied.includes('peg-2'),
        layoutInfo: {
          type: 'mechanical',
          difficulty: 'Medium',
          instructions: [
            '1. An even number of linkages reverses torque direction.',
            '2. Occupy both Peg 1 and Peg 2.'
          ]
        },
        character: {
          name: 'Elena Rostova',
          avatar: '🔧',
          dialogue: 'Warning! The pressure release valve is jammed clockwise. We need it to rotate COUNTER-CLOCKWISE to release pressure! Complete the linkage by placing gears on both Peg 1 and Peg 2.',
          hintText: 'Tap on both Peg 1 and Peg 2 in the visual board to snap gears in place, reversing the output spin.'
        },
        countdown: 45
      },
      {
        id: 'me-3',
        name: 'Level 3: Differential compound',
        objective: 'Compound alignment! Fit all three pegs (Peg 1, Peg 2, Peg 3) with compound gear wheels to shift high input engine speed to low drive torque.',
        hint: 'Occupy all three pegs (Peg 1, Peg 2, Peg 3) to configure the compound gear train.',
        initialState: {
          pegsOccupied: [] as string[]
        },
        validation: (state) => state.pegsOccupied.includes('peg-1') && state.pegsOccupied.includes('peg-2') && state.pegsOccupied.includes('peg-3'),
        layoutInfo: {
          type: 'mechanical',
          difficulty: 'Hard',
          instructions: [
            '1. Bridge the transmission gaps using a compound layout.',
            '2. Place gears on all three peg shafts.'
          ]
        },
        character: {
          name: 'Elena Rostova',
          avatar: '🔧',
          dialogue: 'Pressure is entering red status! If we do not release steam now, the shell casing will rupture. Complete the compound gear train by placing gears on all three peg shafts (Peg 1, 2, and 3)!',
          hintText: 'Activate gears on Peg 1, Peg 2, and Peg 3. This matches compound gear linkages to open the primary release hatch.'
        },
        countdown: 30
      }
    ]
  },
  {
    id: 'ee',
    title: 'Electrical Engineering',
    iconName: 'Cpu',
    colorClass: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-400',
    description: 'Logic Circuit Assembler. Restore military bunker grid switches and Half-Adder logic chips.',
    levels: [
      {
        id: 'ee-1',
        name: 'Level 1: Light the Path',
        objective: 'Drag the AND logic gate into the circuit board socket to complete the connection between the high input rails and the indicator LED.',
        hint: 'Select the AND gate from the inventory.',
        initialState: {
          gateType: '',
          inputA: true,
          inputB: true
        },
        validation: (state) => state.gateType === 'AND',
        layoutInfo: {
          type: 'electrical',
          difficulty: 'Easy',
          instructions: [
            '1. Both input generators are active.',
            '2. Slot the AND gate into the central socket.'
          ]
        },
        character: {
          name: 'Commander Vance',
          avatar: '🎖️',
          dialogue: 'An EMP blast just knocked out our communication link! We need to route emergency power to the indicator LED. Set the central logic gate to AND.',
          hintText: 'Click the AND gate chip in the inventory. Since both input generators are outputting high (1), AND will compute true.'
        },
        countdown: 60
      },
      {
        id: 'ee-2',
        name: 'Level 2: Boolean Solver',
        objective: 'Complete the dual-gate socket circuit. Place an OR gate in Socket A and a NOT gate in Socket B to solve the path: A OR (NOT B).',
        hint: 'Set gateType to "OR" and gateType2 to "NOT".',
        initialState: {
          gateType: '',
          gateType2: '',
          inputA: true,
          inputB: false
        },
        validation: (state) => state.gateType === 'OR' && state.gateType2 === 'NOT',
        layoutInfo: {
          type: 'electrical',
          difficulty: 'Medium',
          instructions: [
            '1. Select the OR gate for Socket A.',
            '2. Select the NOT gate for Socket B.'
          ]
        },
        character: {
          name: 'Commander Vance',
          avatar: '🎖️',
          dialogue: 'Generator B is short-circuiting! We must ignore it. Drop an OR gate in Socket A and a NOT gate in Socket B to route generator voltage safely around the blowout.',
          hintText: 'Choose OR for Socket A and NOT for Socket B. This satisfies the Boolean check A OR (NOT B) and lights the alert indicator.'
        },
        countdown: 45,
        sabotageRate: 15000
      },
      {
        id: 'ee-3',
        name: 'Level 3: Half-Adder Logic',
        objective: 'Complete the Sum and Carry registers of the Half-Adder. Drop an XOR gate in Socket A (Sum) and an AND gate in Socket B (Carry).',
        hint: 'Set gateType to "XOR" and gateType2 to "AND" to build the half-adder logic blocks.',
        initialState: {
          gateType: '',
          gateType2: '',
          inputA: true,
          inputB: true
        },
        validation: (state) => state.gateType === 'XOR' && state.gateType2 === 'AND',
        layoutInfo: {
          type: 'electrical',
          difficulty: 'Hard',
          instructions: [
            '1. Slot XOR gate in Socket A to compute binary SUM.',
            '2. Slot AND gate in Socket B to compute binary CARRY.'
          ]
        },
        character: {
          name: 'Commander Vance',
          avatar: '🎖️',
          dialogue: 'We have lost the life-support adder chip! Reconstruct a binary Half-Adder. Place an XOR gate in Socket A (SUM) and an AND gate in Socket B (CARRY) immediately!',
          hintText: 'Half-Adders require XOR logic for binary addition (SUM) and AND logic to calculate carryoverflow bits. Assign Socket A = XOR, Socket B = AND.'
        },
        countdown: 30,
        sabotageRate: 12000
      }
    ]
  },
  {
    id: 'biotech',
    title: 'Healthcare & Biotech',
    iconName: 'Dna',
    colorClass: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-400',
    description: 'Protein Recombination. Neutralize outbreak virus spikes through steric molecular docking.',
    levels: [
      {
        id: 'biotech-1',
        name: 'Level 1: Receptor Lock',
        objective: 'Rotate the peptide molecule using the angle dial to exactly 180 degrees to dock with the active site of the viral receptor.',
        hint: 'Rotate the dial until the angle is 180 degrees.',
        initialState: {
          rotation: 0
        },
        validation: (state) => Math.abs(state.rotation - 180) < 8,
        layoutInfo: {
          type: 'biotech',
          difficulty: 'Easy',
          instructions: [
            '1. Rotate the antibody molecule using the angle dial.',
            '2. Set the rotation to exactly 180 degrees.'
          ],
          sliderLabel: 'Peptide rotation angle (°)',
          sliderMin: 0,
          sliderMax: 360
        },
        character: {
          name: 'Dr. Clara Vance',
          avatar: '🧬',
          dialogue: 'A weaponized pathogen is mutating! Rotate the peptide antibody to exactly 180 degrees so its charge binds with the negative viral receptor cleft.',
          hintText: 'Slide the rotation dial to 180°. This lines up the positive/negative charges for secure molecular snapping.'
        },
        countdown: 60
      },
      {
        id: 'biotech-2',
        name: 'Level 2: Active Groove Match',
        objective: 'Rotate the antibody to 90 degrees to fit the hydrophobic grooves, and adjust the Concentration density slider to exactly 75%.',
        hint: 'Set the rotation angle to 90° and the density slider to 75%.',
        initialState: {
          rotation: 0,
          density: 20
        },
        validation: (state) => Math.abs(state.rotation - 90) < 8 && Math.abs(state.density - 75) < 5,
        layoutInfo: {
          type: 'biotech',
          difficulty: 'Medium',
          instructions: [
            '1. Rotate the antibody to 90 degrees.',
            '2. Adjust the concentration density to exactly 75%.'
          ],
          sliderLabel: 'Concentration Density (%)',
          sliderMin: 10,
          sliderMax: 100
        },
        character: {
          name: 'Dr. Clara Vance',
          avatar: '🧬',
          dialogue: 'Pathogen spike proteins are mutating! Rotate the antibody to 90 degrees to slide into the lateral cellular groove, and increase density to 75% to trigger binding!',
          hintText: 'Line up the rotation at 90° and push the Concentration slider to 75%. This exceeds the binding activation threshold.'
        },
        countdown: 45
      },
      {
        id: 'biotech-3',
        name: 'Level 3: Allosteric Inhibitor',
        objective: 'Dock the inhibitor. Rotate the molecule to 270 degrees, set concentration to 90%, and adjust molecular scale to exactly 50% to fit allosteric site.',
        hint: 'Align properties: Rotation=270°, Density=90%, Scale=50%.',
        initialState: {
          rotation: 0,
          density: 30,
          scale: 100
        },
        validation: (state) => Math.abs(state.rotation - 270) < 8 && Math.abs(state.density - 90) < 5 && Math.abs(state.scale - 50) < 5,
        layoutInfo: {
          type: 'biotech',
          difficulty: 'Hard',
          instructions: [
            '1. Rotate the inhibitor molecule to 270 degrees.',
            '2. Set density to 90% and shrink molecular scale to 50%.'
          ],
          sliderLabel: 'Inhibitor scale size (%)',
          sliderMin: 20,
          sliderMax: 100
        },
        character: {
          name: 'Dr. Clara Vance',
          avatar: '🧬',
          dialogue: 'Total infection threat! We must block the allosteric site. Rotate the inhibitor molecule to 270 degrees, set concentration to 90%, and shrink the scale to 50% to seal the pocket!',
          hintText: 'Align the values: Rotation = 270°, Concentration = 90%, and Scale = 50% to complete docking and lock down the pathogen.'
        },
        countdown: 30
      }
    ]
  }
];
