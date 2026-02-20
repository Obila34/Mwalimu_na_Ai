
import React from 'react';
import { ElementData } from '../types';

interface AtomModelProps {
  element: ElementData;
}

const AtomModel: React.FC<AtomModelProps> = ({ element }) => {
  const { configuration, atomicNumber, massNumber } = element;
  const neutrons = massNumber - atomicNumber;

  // Constants for SVG
  const size = 400;
  const center = size / 2;
  const shellRadii = [50, 85, 120, 155];

  return (
    <div className="relative flex flex-col items-center bg-white p-4 rounded-3xl shadow-lg border-4 border-emerald-100">
      <h3 className="text-2xl font-bold text-emerald-800 mb-4">{element.name} ({element.symbol})</h3>
      
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full h-auto">
        {/* Nucleus */}
        <circle cx={center} cy={center} r="25" fill="#ef4444" className="opacity-80" />
        <text 
          x={center} 
          y={center + 5} 
          textAnchor="middle" 
          fill="white" 
          fontSize="10" 
          fontWeight="bold"
        >
          {atomicNumber}P {neutrons}N
        </text>

        {/* Shells and Electrons */}
        {configuration.map((count, shellIndex) => {
          const radius = shellRadii[shellIndex];
          return (
            <g key={`shell-${shellIndex}`}>
              {/* Shell Orbit */}
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke="#d1d5db" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
              
              {/* Electrons */}
              <g className="orbit" style={{ 
                transformOrigin: `${center}px ${center}px`,
                animationDuration: `${10 + shellIndex * 5}s`
              }}>
                {Array.from({ length: count }).map((_, electronIndex) => {
                  const angle = (electronIndex / count) * 2 * Math.PI;
                  const ex = center + radius * Math.cos(angle);
                  const ey = center + radius * Math.sin(angle);
                  return (
                    <circle 
                      key={`electron-${shellIndex}-${electronIndex}`}
                      cx={ex}
                      cy={ey}
                      r="6"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </g>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
        <div className="bg-emerald-50 p-2 rounded-xl">
          <p className="text-xs text-emerald-600 uppercase font-bold">Protons</p>
          <p className="text-xl font-bold text-emerald-900">{atomicNumber}</p>
        </div>
        <div className="bg-amber-50 p-2 rounded-xl">
          <p className="text-xs text-amber-600 uppercase font-bold">Neutrons</p>
          <p className="text-xl font-bold text-amber-900">{neutrons}</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-xl">
          <p className="text-xs text-blue-600 uppercase font-bold">Electrons</p>
          <p className="text-xl font-bold text-blue-900">{atomicNumber}</p>
        </div>
        <div className="bg-purple-50 p-2 rounded-xl">
          <p className="text-xs text-purple-600 uppercase font-bold">Shells</p>
          <p className="text-xl font-bold text-purple-900">{configuration.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AtomModel;
