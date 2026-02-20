
import React, { useState } from 'react';
import { getVibeCheckQuestion } from '../services/geminiService';
import SpeechButton from './SpeechButton';

interface DIYStep {
  id: number;
  title: string;
  instruction: string;
  tip: string;
  icon: string;
  color: string;
}

const DIY_STEPS: DIYStep[] = [
  {
    id: 1,
    title: "Check the Table",
    instruction: "Look at your Periodic Table. Check the 'Proton count' for your chosen element.",
    tip: "Hydrogen has 1, Carbon has 6, and Oxygen has 8!",
    icon: "📋",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    title: "Make the Boma",
    instruction: "Roll your clay or dough into a firm 'Nucleus' ball for the center.",
    tip: "Make it big enough to hold all your protons and neutrons!",
    icon: "🏺",
    color: "bg-orange-50 text-orange-600"
  },
  {
    id: 3,
    title: "Add the Bosses",
    instruction: "Press your Maize seeds (Protons) and Beans (Neutrons) into the ball.",
    tip: "Space them out so they stick well into the clay.",
    icon: "🌽",
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    id: 4,
    title: "Create the Orbits",
    instruction: "Make circles around the ball with stiff wire, vine, or even string.",
    tip: "The first orbit is small, the second one is bigger.",
    icon: "⭕",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    id: 5,
    title: "Place the Runners",
    instruction: "Glue your Bottle Caps or Buttons onto the circular orbits.",
    tip: "Remember: Electrons love to stay in their own tracks!",
    icon: "🔘",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    id: 6,
    title: "Show and Tell",
    instruction: "Display your masterpiece in class and explain your atom to friends!",
    tip: "Tell everyone what element you built and why it's important.",
    icon: "👨‍🏫",
    color: "bg-rose-50 text-rose-600"
  }
];

const AtomicDIY: React.FC = () => {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const startVibeCheck = async () => {
    setLoading(true);
    setFeedback(null);
    const data = await getVibeCheckQuestion("Protons, Neutrons and Electrons");
    setQuiz(data);
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (index === quiz.correctIndex) {
      setFeedback("🎉 Mazee, you nailed it! Top marks! 🇰🇪");
    } else {
      setFeedback("Keep trying! Even Einstein made mistakes. Check the theory again! 💡");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border-4 border-orange-50 overflow-hidden">
        <div className="bg-orange-500 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Tuunde Atom! (Let's Build)</h2>
            <p className="text-orange-50 text-lg opacity-90 max-w-xl">
              No expensive lab kits needed. We use what we have at home to make science real! 🌍
            </p>
          </div>
          <div className="flex flex-col items-center">
            <SpeechButton 
              text="Let's build an atom! You don't need expensive lab kits. We will use clay, maize seeds, and bottle caps. Follow the steps below!"
              className="text-orange-500 bg-white hover:bg-orange-50 shadow-lg scale-125 mb-2"
            />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Listen to Intro</span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Build Your Atom Step-by-Step</h3>
            <p className="text-gray-500">Follow these illustrative steps to create your own model.</p>
          </div>

          {/* Instructional Cards with Illustrative Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
            {DIY_STEPS.map((step) => (
              <div key={step.id} className="group bg-white rounded-3xl border-2 border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col overflow-hidden">
                <div className={`h-40 flex items-center justify-center ${step.color.split(' ')[0]} group-hover:scale-105 transition-transform duration-500`}>
                  <div className="text-7xl drop-shadow-lg">{step.icon}</div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur-sm text-orange-600 rounded-full flex items-center justify-center font-black shadow-sm text-sm border border-orange-100">
                    {step.id}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-gray-900 font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                    {step.instruction}
                  </p>
                  <div className="mt-auto pt-4 border-t border-orange-50">
                    <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-xl border border-orange-100">
                      <span className="text-orange-500 text-sm mt-0.5">💡</span>
                      <p className="text-xs text-orange-800 font-bold italic">
                        {step.tip}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <SpeechButton text={`${step.title}. ${step.instruction}. Teacher tip: ${step.tip}`} className="text-orange-400 p-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vibe Check Section */}
      <div className="bg-orange-600 rounded-[3rem] shadow-xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start gap-4">
              Vibe Check! ✅
              {quiz && <SpeechButton text={quiz.question} className="text-white hover:bg-white/20 bg-white/10 p-2 rounded-xl" />}
            </h2>
            <p className="text-orange-100 text-lg italic opacity-90 tracking-wide">Test your scientist brain with Mr. Science!</p>
          </div>
          {!quiz && (
            <button 
              onClick={startVibeCheck}
              disabled={loading}
              className="bg-white text-orange-600 px-10 py-4 rounded-[2rem] font-black shadow-2xl hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 text-lg"
            >
              {loading ? "Waking up the teacher..." : "Start Quiz"}
            </button>
          )}
        </div>

        {quiz && (
          <div className="mt-12 bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-md animate-in fade-in zoom-in duration-500 border border-white/20">
            <h3 className="text-2xl font-bold mb-8 leading-tight">{quiz.question}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quiz.options.map((option: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-white/20 hover:bg-white/30 text-left p-6 rounded-2xl font-bold transition-all border border-white/10 active:scale-95 group relative pr-16"
                >
                  <span className="inline-block w-10 h-10 bg-orange-500 rounded-xl text-center leading-10 mr-4 font-black shadow-inner">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <SpeechButton text={option} className="text-white bg-black/20" />
                  </div>
                </button>
              ))}
            </div>
            
            {feedback && (
              <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-white/30 animate-bounce text-center text-orange-600 font-black shadow-xl relative text-xl">
                {feedback}
                <SpeechButton text={feedback} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 hover:bg-orange-50" />
              </div>
            )}
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={startVibeCheck}
                className="text-orange-100 font-bold hover:text-white underline underline-offset-8 flex items-center gap-2 group"
              >
                Next Question 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtomicDIY;
