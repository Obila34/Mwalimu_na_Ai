
import React, { useState } from 'react';
import SpeechButton from './SpeechButton';

type ParticleType = 'nucleus' | 'proton' | 'neutron' | 'electron';

const AtomicTheory: React.FC = () => {
  const [activeParticle, setActiveParticle] = useState<ParticleType | null>(null);

  const particleData: Record<ParticleType, { title: string; subtitle: string; color: string; textColor: string; borderColor: string; description: string; analogy: string }> = {
    nucleus: {
      title: 'Nucleus',
      subtitle: 'The "Boma"',
      color: 'bg-blue-900',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-200',
      description: 'In the very center of the atom is the Nucleus. This is the heart of the home. Inside the Boma, two friends live together: Protons and Neutrons. It is the heavy center that keeps everything in place.',
      analogy: 'Think of the Boma as the home where the main characters live and stay safe.'
    },
    proton: {
      title: 'Proton',
      subtitle: 'The "Bosses" (+)',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      description: 'These are the "Bosses." They have a Positive (+) charge and they live inside the Nucleus. They decide which element the atom is. The number of protons tell us which element it is.',
      analogy: 'The identity card of the atom that tells us its family name.'
    },
    neutron: {
      title: 'Neutron',
      subtitle: 'The "Keepers of Peace" (0)',
      color: 'bg-indigo-400',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-100',
      description: 'These are the "Keepers of Peace." They have No charge (0). They just sit with the Protons to keep the center stable and heavy, ensuring the Boma stays peaceful.',
      analogy: 'The calm friends who make sure everyone in the Boma stays together.'
    },
    electron: {
      title: 'Electron',
      subtitle: 'The "Runners" (-)',
      color: 'bg-sky-500',
      textColor: 'text-sky-700',
      borderColor: 'border-sky-200',
      description: 'The high-energy kids! They are very small and have a Negative (-) charge. They zoom around the Boma in circles called Energy Levels.',
      analogy: 'Like fast bees buzzing so quickly they look like a blue mist around the hive.'
    }
  };

  const introText = "Everything in Kenya and the whole world is made up of atoms! They are so tiny that you can't even see them but your football, the maize in the shamba, and even the air you breathe is made of billions of these tiny atoms.";

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-50 overflow-hidden animate-in fade-in duration-700">
      <div className="bg-blue-600 p-8 text-white relative">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
              <span>🔬</span> What is an Atom?
            </h2>
            <p className="text-blue-50 text-lg leading-relaxed max-w-2xl">
              Everything in Kenya and the whole world is made up of <strong>atoms</strong>! They are so tiny that you can't even see them but your football, the maize in the shamba, and even the air you breathe is made of billions of these tiny atoms.
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm border border-white/30 flex flex-col items-center gap-1">
            <SpeechButton text={introText} className="text-white scale-125" />
            <span className="text-[10px] font-bold uppercase opacity-80">Read All</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-b border-blue-100 px-8 py-5">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-black text-blue-300 uppercase tracking-[0.25em] ml-1">Explore the particles:</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {(['nucleus', 'proton', 'neutron', 'electron'] as const).map(p => (
              <button
                key={p}
                onClick={() => setActiveParticle(p)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm capitalize transition-all whitespace-nowrap active:scale-95 ${
                  activeParticle === p 
                  ? `${particleData[p].color} text-white shadow-md ring-2 ring-offset-2 ring-blue-100` 
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative flex justify-center py-12 bg-blue-50/30 rounded-[3rem] border-4 border-dashed border-blue-100 shadow-inner">
            <svg width="320" height="320" viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="110" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 6" className={activeParticle === 'electron' ? 'stroke-blue-400 stroke-[4px] opacity-100' : 'opacity-40'} />
              <circle cx="160" cy="160" r="70" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 6" className={activeParticle === 'electron' ? 'stroke-blue-400 stroke-[4px] opacity-100' : 'opacity-40'} />
              
              <circle 
                cx="160" 
                cy="160" 
                r="48" 
                fill={activeParticle === 'nucleus' || activeParticle === 'proton' || activeParticle === 'neutron' ? '#dbeafe' : '#f8fafc'} 
                className="cursor-pointer transition-colors duration-300 hover:fill-blue-100"
                onClick={() => setActiveParticle('nucleus')}
              />
              <text x="160" y="140" textAnchor="middle" fontSize="11" className="fill-blue-300 font-bold uppercase tracking-widest pointer-events-none">Boma</text>

              <circle cx="154" cy="154" r="14" fill="#3b82f6" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'proton' ? 'ring-4 ring-blue-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('proton'); }} />
              <circle cx="168" cy="168" r="14" fill="#3b82f6" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'proton' ? 'ring-4 ring-blue-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('proton'); }} />
              <circle cx="168" cy="150" r="14" fill="#818cf8" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'neutron' ? 'ring-4 ring-indigo-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('neutron'); }} />
              <circle cx="148" cy="168" r="14" fill="#818cf8" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'neutron' ? 'ring-4 ring-indigo-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('neutron'); }} />

              <g className="orbit" style={{ transformOrigin: '160px 160px', animationDuration: '6s' }}>
                <circle cx="50" cy="160" r="10" fill="#0ea5e9" stroke="white" strokeWidth="2" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'electron' ? 'ring-4 ring-sky-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('electron'); }} />
              </g>
              <g className="orbit" style={{ transformOrigin: '160px 160px', animationDuration: '9s', animationDirection: 'reverse' }}>
                <circle cx="230" cy="160" r="10" fill="#0ea5e9" stroke="white" strokeWidth="2" className={`cursor-pointer transition-transform hover:scale-110 shadow-sm ${activeParticle === 'electron' ? 'ring-4 ring-sky-300 scale-125' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveParticle('electron'); }} />
              </g>
            </svg>
          </div>
        </div>

        <div className="flex flex-col h-full justify-center">
          {activeParticle ? (
            <div className={`p-8 rounded-[2.5rem] border-l-[12px] ${particleData[activeParticle].borderColor} bg-blue-50/50 animate-in fade-in slide-in-from-right-8 duration-500 shadow-sm relative group`}>
              <div className="absolute top-6 right-6">
                <SpeechButton 
                  text={`${particleData[activeParticle].title}. ${particleData[activeParticle].subtitle}. ${particleData[activeParticle].description}. ${particleData[activeParticle].analogy}`} 
                  className={`${particleData[activeParticle].textColor} hover:bg-blue-100 bg-white shadow-sm p-3`}
                />
              </div>
              <div className="mb-4">
                <h3 className={`text-2xl font-black ${particleData[activeParticle].textColor} uppercase tracking-tight`}>
                  {particleData[activeParticle].title}
                </h3>
                <p className="text-blue-300 font-bold text-sm tracking-wide">
                  {particleData[activeParticle].subtitle}
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 text-lg pr-8">
                {particleData[activeParticle].description}
              </p>
              <div className="bg-white p-5 rounded-2xl border-2 border-blue-50 shadow-inner flex items-start gap-3">
                <span className="text-2xl mt-1">💡</span>
                <p className="text-base font-medium text-slate-600 italic leading-snug">
                  {particleData[activeParticle].analogy}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center text-center animate-pulse">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-3xl">🔎</div>
              <p className="text-blue-800 font-bold text-lg mb-2">Discover the Secret World</p>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Choose a particle from the menu above to see how everything is built!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 bg-blue-50/30 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-blue-100">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100 flex gap-4 items-center group transition-all hover:shadow-md">
          <div className="bg-blue-500 text-white min-w-[56px] h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg">🏟️</div>
          <div className="flex-1">
            <h4 className="font-bold text-blue-900 mb-1 text-sm uppercase tracking-tight">STADIUM FACT:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If the Nucleus was a ball in a stadium, the Electrons would be buzzing around the top seats!
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100 flex gap-4 items-center group transition-all hover:shadow-md">
          <div className="bg-indigo-400 text-white min-w-[56px] h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg">⚡</div>
          <div className="flex-1">
            <h4 className="font-bold text-indigo-900 mb-1 text-sm uppercase tracking-tight">ENERGY LEVELS:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Electrons stay in their lanes unless they get a massive burst of energy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomicTheory;