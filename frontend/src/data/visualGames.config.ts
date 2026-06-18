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
    description: 'API Gateway Flow. Route networking packets, balance loads, and manage CDN caches.',
    levels: [
      {
        id: 'cs-1',
        name: 'Level 1 (Easy): Route Balancer',
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
            '1. Click the database nodes to ensure connectivity.',
            '2. Adjust the Routing Weight slider to exactly 0.50.'
          ],
          sliderLabel: 'Routing Weight (DB_A vs DB_B)',
          sliderMin: 0,
          sliderMax: 1
        }
      },
      {
        id: 'cs-2',
        name: 'Level 2 (Medium): Bandwidth Cap',
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
        }
      },
      {
        id: 'cs-3',
        name: 'Level 3 (Hard): CDN Caching Route',
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
        }
      }
    ]
  },
  {
    id: 'finance',
    title: 'Business & Finance',
    iconName: 'TrendingUp',
    colorClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
    description: 'Portfolio Frontier. Rebalance assets visually to match risk targets and hedge volatility.',
    levels: [
      {
        id: 'finance-1',
        name: 'Level 1 (Easy): Balanced Yield',
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
        }
      },
      {
        id: 'finance-2',
        name: 'Level 2 (Medium): Volatility Shield',
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
        }
      },
      {
        id: 'finance-3',
        name: 'Level 3 (Hard): Sharpe Optimization',
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
        }
      }
    ]
  },
  {
    id: 'me',
    title: 'Mechanical Engineering',
    iconName: 'Settings',
    colorClass: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
    description: 'Gear Torque Sync. Interlock compound gears to balance output RPM and rotational speed.',
    levels: [
      {
        id: 'me-1',
        name: 'Level 1 (Easy): Speed Linkage',
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
        }
      },
      {
        id: 'me-2',
        name: 'Level 2 (Medium): Direction Reversal',
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
        }
      },
      {
        id: 'me-3',
        name: 'Level 3 (Hard): Differential compound',
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
        }
      }
    ]
  },
  {
    id: 'ee',
    title: 'Electrical Engineering',
    iconName: 'Cpu',
    colorClass: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-400',
    description: 'Logic Circuit Assembler. Place logic IC chips to complete binary truth tables and half-adders.',
    levels: [
      {
        id: 'ee-1',
        name: 'Level 1 (Easy): Light the Path',
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
        }
      },
      {
        id: 'ee-2',
        name: 'Level 2 (Medium): Boolean Solver',
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
        }
      },
      {
        id: 'ee-3',
        name: 'Level 3 (Hard): Half-Adder Logic',
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
        }
      }
    ]
  },
  {
    id: 'biotech',
    title: 'Healthcare & Biotech',
    iconName: 'Dna',
    colorClass: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-400',
    description: 'Protein Recombination. Rotate antibodies and adjust concentration sliders to bind viral cell receptors.',
    levels: [
      {
        id: 'biotech-1',
        name: 'Level 1 (Easy): Receptor Lock',
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
        }
      },
      {
        id: 'biotech-2',
        name: 'Level 2 (Medium): Active Groove Match',
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
        }
      },
      {
        id: 'biotech-3',
        name: 'Level 3 (Hard): Allosteric Inhibitor',
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
        }
      }
    ]
  }
];
