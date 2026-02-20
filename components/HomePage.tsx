
import React from 'react';
import { ScienceTopic, TopicId } from '../types';

const TOPICS: ScienceTopic[] = [
  { id: 'atoms', title: 'Atoms & Molecules', description: 'Meet the tiny "characters" that build everything in the world!', icon: '🔬', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'plants', title: 'Shamba Science', description: 'Discover how plants use sunlight to make food for us.', icon: '🌱', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { id: 'body', title: 'The Human Body', description: 'Take a tour of your heart, lungs, and amazing brain!', icon: '🧠', color: 'text-violet-600', bgColor: 'bg-violet-50' },
  { id: 'weather', title: 'Sky & Seasons', description: 'Why does it rain? Learn about clouds and the Kenyan sun.', icon: '☁️', color: 'text-sky-600', bgColor: 'bg-sky-50' },
  { id: 'water', title: 'Water is Life', description: 'The journey of a water drop from the river to the sky.', icon: '💧', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  { id: 'force', title: 'Push & Pull', description: 'How things move, roll, and fly through the air!', icon: '⚽', color: 'text-slate-600', bgColor: 'bg-slate-100' },
  { id: 'energy', title: 'Bright Sparks', description: 'Learn about light, heat, and powering our homes.', icon: '💡', color: 'text-blue-500', bgColor: 'bg-blue-50' },
];

interface HomePageProps {
  onSelectTopic: (id: TopicId) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTopic }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center mb-10 md:mb-16 pt-6 md:pt-10">
        <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 md:mb-6">Karibu, Scientist! 👋</h2>
        <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
          The world is full of wonders. Which mystery would you like to solve today? Choose a topic to begin!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-2">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="group relative bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-md hover:shadow-xl border-2 border-transparent hover:border-blue-200 transition-all hover:-translate-y-1 text-left flex flex-col h-full"
          >
            <div className={`w-10 h-10 md:w-16 md:h-16 ${topic.bgColor} rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-6 group-hover:scale-110 transition-transform`}>
              {topic.icon}
            </div>
            <h3 className={`text-sm md:text-2xl font-bold mb-1 md:mb-3 leading-tight ${topic.color}`}>{topic.title}</h3>
            <p className="text-gray-500 text-[10px] md:text-sm leading-snug md:leading-relaxed flex-1">
              {topic.description}
            </p>
            <div className="mt-3 md:mt-6 flex items-center text-[8px] md:text-sm font-black uppercase tracking-widest text-gray-300 group-hover:text-blue-600 transition-colors">
              <span className="hidden xs:inline">Start</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {topic.id === 'atoms' && (
              <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-blue-100 text-blue-600 text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-full uppercase">Ready!</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 md:mt-16 bg-white p-6 md:p-8 rounded-2xl md:rounded-[3rem] shadow-sm border-2 border-dashed border-blue-50 flex flex-col md:flex-row items-center gap-4 md:gap-8 mx-2">
        <div className="bg-blue-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl shrink-0">🎁</div>
        <div className="text-center md:text-left">
          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Weekly Science Tip</h4>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed italic">
            "Science is not just in books; it is in the soil of our shambas and the wind in our hair. Use this app to guide your curiosity!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
