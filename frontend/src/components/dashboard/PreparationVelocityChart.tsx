import { TrendingUp } from 'lucide-react';

interface PreparationVelocityChartProps {
  score?: number;
}

export function PreparationVelocityChart({ score = 68 }: PreparationVelocityChartProps) {
  // Generate slightly dynamic activity based on user score
  const baseValue = Math.round(score * 0.8);
  const points = [
    Math.round(baseValue * 0.4),
    Math.round(baseValue * 0.7),
    Math.round(baseValue * 0.5),
    Math.round(baseValue * 1.1),
    Math.round(baseValue * 0.9),
    Math.round(baseValue * 1.3),
    Math.round(baseValue * 1.6),
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const width = 500;
  const height = 100;
  const paddingX = 30;
  const paddingY = 15;
  const maxVal = Math.max(...points, 120);

  const pointsCoords = points.map((p, idx) => {
    const x = paddingX + (idx * (width - 2 * paddingX)) / (points.length - 1);
    const y = height - paddingY - (p * (height - 2 * paddingY)) / maxVal;
    return { x, y, value: p };
  });

  const linePath = pointsCoords.reduce((acc, c, idx) => {
    return idx === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
  }, '');

  const areaPath = `${linePath} L ${pointsCoords[pointsCoords.length - 1].x} ${height} L ${pointsCoords[0].x} ${height} Z`;

  return (
    <div className="mt-8 pt-6 border-t border-white/5 font-rubik">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Consistency Metric</p>
          </div>
          <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Preparation Velocity</p>
        </div>
        <div className="flex items-center gap-4 text-[9px] font-bold text-white/40 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> 
            Interviews
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5ed29c] shadow-[0_0_8px_rgba(94,210,156,0.5)]" /> 
            Code Practice
          </div>
          <div className="flex items-center gap-1.5 text-[#5ed29c]">
            <TrendingUp size={10} />
            +{points[6] - points[5]}% Speed
          </div>
        </div>
      </div>

      <div className="relative w-full h-[150px] flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-3xl p-4 overflow-hidden group/chart transition-all duration-300 hover:border-white/10">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
          <div className="w-full h-px bg-white/10" />
          <div className="w-full h-px bg-white/10" />
          <div className="w-full h-px bg-white/10" />
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[90px] overflow-visible z-10 relative">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#5ed29c" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path d={areaPath} fill="url(#chartGrad)" />

          {/* Connected line path */}
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Node Coordinates */}
          {pointsCoords.map((c, idx) => (
            <g key={idx} className="group/node cursor-pointer">
              <circle
                cx={c.x}
                cy={c.y}
                r="3.5"
                fill="#0a0c10"
                stroke={idx === 6 ? '#5ed29c' : '#8b5cf6'}
                strokeWidth="2"
                className="transition-all duration-300 group-hover/node:r-5 group-hover/node:stroke-white"
              />
              <circle
                cx={c.x}
                cy={c.y}
                r="8"
                fill={idx === 6 ? '#5ed29c' : '#8b5cf6'}
                className="opacity-0 group-hover/node:opacity-10 transition-all duration-300 animate-ping"
              />
              {/* Tooltip on Node Hover */}
              <foreignObject x={c.x - 20} y={c.y - 25} width="40" height="20" className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black border border-white/10 rounded px-1 text-[8px] font-black text-white text-center shadow-lg">
                  {c.value}pt
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        {/* Calendar X-Axis Labels */}
        <div className="flex justify-between px-3 mt-2 text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
          {days.map(d => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
