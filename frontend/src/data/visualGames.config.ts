export interface VisualPuzzleLevel {
  id: string;
  name: string;
  objective: string;
  hint: string;
  initialState: any;
  validation: (state: any) => boolean;
  layoutInfo: {
    type: 'network' | 'finance' | 'mechanical' | 'electrical' | 'biotech';
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
    description: 'API Gateway Flow. Connect network nodes and adjust routing weights visually.',
    levels: [
      {
        id: 'cs-1',
        name: 'Level 1: Route Balancer',
        objective: 'Drag the network cable from the Gateway (left) to Database A (top right). Then set the load balancing weight slider to 50% (0.50) to split requests.',
        hint: 'Use the connector handle on the Gateway node, drag it to Database A, and slide the weight to exactly 0.50.',
        initialState: {
          connectedTo: '', // 'db-a' or 'db-b' or 'both'
          sliderVal: 0.0,
        },
        validation: (state) => state.connectedTo === 'db-a' && Math.abs(state.sliderVal - 0.5) < 0.05,
        layoutInfo: {
          type: 'network',
          instructions: [
            '1. Click and drag the glowing plug from the API Gateway.',
            '2. Drop it onto the port of Database A.',
            '3. Adjust the Routing Weight slider to 0.50.'
          ],
          sliderLabel: 'Routing Weight (Database A vs B)',
          sliderMin: 0,
          sliderMax: 1
        }
      },
      {
        id: 'cs-2',
        name: 'Level 2: Active Failover',
        objective: 'Database A is experiencing a critical outage! Reroute the network cable to Database B (bottom right) and move the weight slider to 1.0 (100% to Database B).',
        hint: 'Drag the cable connector to Database B, and adjust the weight slider to 1.0.',
        initialState: {
          connectedTo: 'db-a',
          sliderVal: 0.5,
        },
        validation: (state) => state.connectedTo === 'db-b' && Math.abs(state.sliderVal - 1.0) < 0.05,
        layoutInfo: {
          type: 'network',
          instructions: [
            '1. Database A is offline (Red alert).',
            '2. Drag the network connector to Database B.',
            '3. Set the Routing Weight slider to 1.0 to isolate Database A.'
          ],
          sliderLabel: 'Failover Weight to Database B',
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
    description: 'Portfolio Frontier. Rebalance assets visually to match risk targets.',
    levels: [
      {
        id: 'finance-1',
        name: 'Level 1: Balanced Yield',
        objective: 'Rebalance the portfolio using the allocation sliders. Set Equity to 50% and Bonds to 50% to target a balanced return with moderate risk.',
        hint: 'Move both sliders until Equity (Stocks) is 50% and Bonds is 50%.',
        initialState: {
          equity: 10,
          bonds: 90
        },
        validation: (state) => Math.abs(state.equity - 50) < 2 && Math.abs(state.bonds - 50) < 2,
        layoutInfo: {
          type: 'finance',
          instructions: [
            '1. A balanced portfolio mitigates equity drawdown.',
            '2. Rebalance Stocks to 50% using the left slider.',
            '3. Rebalance Bonds to 50% using the right slider.'
          ]
        }
      },
      {
        id: 'finance-2',
        name: 'Level 2: Inflation Shield',
        objective: 'Adjust your allocations to combat inflation. Allocate 80% to Equity and 20% to Gold, keeping Bonds at 0% to form an aggressive growth shield.',
        hint: 'Set Equity (Stocks) slider to 80% and Gold slider to 20%.',
        initialState: {
          equity: 40,
          gold: 10,
          bonds: 50
        },
        validation: (state) => Math.abs(state.equity - 80) < 2 && Math.abs(state.gold - 20) < 2 && state.bonds === 0,
        layoutInfo: {
          type: 'finance',
          instructions: [
            '1. Under high inflation, fixed-income yields erode.',
            '2. Drop Bonds to 0%.',
            '3. Adjust Stocks to 80% and Gold to 20%.'
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
    description: 'Gear Torque Sync. Interlock gears of different radii to balance output RPM.',
    levels: [
      {
        id: 'me-1',
        name: 'Level 1: Speed Multiplier',
        objective: 'Place the medium-sized Idler Gear (drag from the toolbox) onto the center peg shaft to bridge the Motor Gear and the Output Conveyor belt.',
        hint: 'Drag the 24-tooth gear from the gear box on the left and snap it onto the center peg socket.',
        initialState: {
          gearPlaced: false,
          gearSize: '' // 'small', 'medium', 'large'
        },
        validation: (state) => state.gearPlaced && state.gearSize === 'medium',
        layoutInfo: {
          type: 'mechanical',
          instructions: [
            '1. The driving motor spin cannot reach the output conveyor because of spacing.',
            '2. Select the Medium Gear (24T) from the toolbox.',
            '3. Drag and snap it onto the center shaft peg.'
          ]
        }
      },
      {
        id: 'me-2',
        name: 'Level 2: Direction Reversal',
        objective: 'conveyor needs to rotate Counter-Clockwise (CCW). Place two gears (Medium and Small) sequentially to reverse output rotational direction.',
        hint: 'Drag both gears from the toolbox and lock them onto Shaft Peg 1 and Shaft Peg 2.',
        initialState: {
          pegsOccupied: [] as string[] // contains 'peg-1', 'peg-2'
        },
        validation: (state) => state.pegsOccupied.includes('peg-1') && state.pegsOccupied.includes('peg-2'),
        layoutInfo: {
          type: 'mechanical',
          instructions: [
            '1. An odd number of gear contacts maintains spin direction; an even number reverses it.',
            '2. Place a gear on Peg 1.',
            '3. Place another gear on Peg 2 to bridge the transmission and reverse the direction.'
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
    description: 'Logic Circuit Assembler. Complete binary logic paths to activate terminal indicators.',
    levels: [
      {
        id: 'ee-1',
        name: 'Level 1: Logic Gates',
        objective: 'Complete the circuit path. Drag the AND logic gate from the components inventory and place it into the socket bay to light the green LED.',
        hint: 'The AND gate outputs true only when both input signals are active (1). Drag it to the socket.',
        initialState: {
          gateType: '', // 'AND', 'OR', 'XOR'
          inputA: true,
          inputB: true
        },
        validation: (state) => state.gateType === 'AND',
        layoutInfo: {
          type: 'electrical',
          instructions: [
            '1. Input A is High (1), Input B is High (1).',
            '2. Drag the AND Gate into the socket.',
            '3. The LED will illuminate green.'
          ]
        }
      },
      {
        id: 'ee-2',
        name: 'Level 2: Backup Power OR',
        objective: 'Ensure the LED alarm turns on if EITHER of the generator inputs is active. Select and drop the OR gate into the socket bay.',
        hint: 'An OR gate outputs high (1) if at least one of its inputs is high.',
        initialState: {
          gateType: '',
          inputA: true,
          inputB: false
        },
        validation: (state) => state.gateType === 'OR',
        layoutInfo: {
          type: 'electrical',
          instructions: [
            '1. Input A is High (1) but Input B is Low (0).',
            '2. We need an OR gate to pass the voltage to the LED.',
            '3. Drag and drop the OR gate block.'
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
    description: 'Protein Recombination. Rotate peptide bonds to bind viral active sites.',
    levels: [
      {
        id: 'biotech-1',
        name: 'Level 1: Receptor Lock',
        objective: 'Rotate the antibody peptide structure using the angle dial to exactly 180 degrees. This aligns the positive electrostatic nodes with the virus negative receptors.',
        hint: 'Use the dial slider or buttons to set the rotation to exactly 180 degrees (±5 degrees).',
        initialState: {
          rotation: 0
        },
        validation: (state) => Math.abs(state.rotation - 180) < 8,
        layoutInfo: {
          type: 'biotech',
          instructions: [
            '1. Receptor alignment depends on steric complementation.',
            '2. Rotate the antibody molecule using the rotation dial.',
            '3. Lock it at 180° for ionic charge attraction.'
          ],
          sliderLabel: 'Steric Rotation Angle (Degrees)',
          sliderMin: 0,
          sliderMax: 360
        }
      },
      {
        id: 'biotech-2',
        name: 'Level 2: Peptide Matcher',
        objective: 'Rotate the molecule to 90 degrees to align the hydrophobic binding grooves and slide the peptide density level to 75% to bind the active pocket.',
        hint: 'Set the rotation angle to 90 degrees, and set the peptide density slider to 75%.',
        initialState: {
          rotation: 0,
          density: 20
        },
        validation: (state) => Math.abs(state.rotation - 90) < 8 && Math.abs(state.density - 75) < 5,
        layoutInfo: {
          type: 'biotech',
          instructions: [
            '1. Set rotation to 90° to fit inside the cell groove.',
            '2. Slide the concentration density to 75% to overcome binding energy thresholds.'
          ],
          sliderLabel: 'Concentration Density (%)',
          sliderMin: 10,
          sliderMax: 100
        }
      }
    ]
  }
];
