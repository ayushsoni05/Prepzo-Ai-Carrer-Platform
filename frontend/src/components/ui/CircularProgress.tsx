import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: 'purple' | 'blue' | 'green' | 'red';
}

export const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  color = 'purple'
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colors = {
    purple: { from: '#6366F1', to: '#22D3EE' },
    blue: { from: '#38BDF8', to: '#2DD4BF' },
    green: { from: '#10B981', to: '#34D399' },
    red: { from: '#EF4444', to: '#F97316' },
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(148,163,184,0.22)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[color].from} />
            <stop offset="100%" stopColor={colors[color].to} />
          </linearGradient>
        </defs>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${color})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-[var(--text)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}%
        </motion.span>
        {label && (
          <span className="mt-1 text-xs text-[var(--text-muted)]">{label}</span>
        )}
      </div>
    </div>
  );
};

export const SkillBar = ({
  skill,
  level,
  delay = 0
}: {
  skill: string;
  level: number;
  delay?: number;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--text-soft)]">{skill}</span>
        <span className="text-[var(--primary)]">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[color:rgba(148,163,184,0.18)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
