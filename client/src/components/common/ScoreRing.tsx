import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  animate?: boolean;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 130,
  strokeWidth = 10,
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#10B981'; // Emerald
    if (s >= 65) return '#06B6D4'; // Cyan
    if (s >= 45) return '#F59E0B'; // Amber
    return '#F43F5E';              // Rose
  };

  const strokeColor = getColor(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#172033"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold tracking-tight text-white font-mono">
            {Math.round(normalizedScore)}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            / 100
          </span>
        </div>
      </div>
      {label && <span className="mt-2 text-sm font-semibold text-slate-200">{label}</span>}
      {sublabel && <span className="text-xs text-slate-400">{sublabel}</span>}
    </div>
  );
};
