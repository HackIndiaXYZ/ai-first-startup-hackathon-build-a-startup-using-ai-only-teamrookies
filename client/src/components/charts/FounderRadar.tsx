import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { FounderDNA } from '../../types/index.js';

interface FounderRadarProps {
  dna: FounderDNA;
  height?: number;
}

export const FounderRadar: React.FC<FounderRadarProps> = ({ dna, height = 320 }) => {
  const chartData = [
    { subject: 'Technology', score: dna.radar.technology, fullMark: 100 },
    { subject: 'AI Native', score: dna.radar.ai, fullMark: 100 },
    { subject: 'Tech Depth', score: dna.radar.technicalDepth, fullMark: 100 },
    { subject: 'Execution', score: dna.radar.execution, fullMark: 100 },
    { subject: 'Scalability', score: dna.radar.scalability, fullMark: 100 },
    { subject: 'Risk Appetite', score: dna.radar.riskAppetite, fullMark: 100 },
    { subject: 'Business', score: dna.radar.business, fullMark: 100 },
    { subject: 'Design & UX', score: dna.radar.design, fullMark: 100 },
    { subject: 'Social Impact', score: dna.radar.socialImpact, fullMark: 100 },
  ];

  return (
    <div className="w-full flex items-center justify-center" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#1E293F" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Inter' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 9 }}
            stroke="#1E293F"
          />
          <Radar
            name="Founder DNA"
            dataKey="score"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
};
