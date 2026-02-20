
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, useNavigate, useLocation } from 'react-router-dom';
import { FIRST_20_ELEMENTS } from './constants';
import { ElementData, ViewType, TopicId } from './types';
import AtomModel from './components/AtomModel';
import AtomicTheory from './components/AtomicTheory';
import AtomicDIY from './components/AtomicDIY';
import HomePage from './components/HomePage';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const currentTopic = (params.get('topic') as TopicId | 'home') || 'home';
  const currentView = (params.get('view') as ViewType) || 'theory';

  const [selectedElement, setSelectedElement] = useState<ElementData>(FIRST_20_ELEMENTS[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSelectTopic = (id: TopicId | 'home') => {
    if (id === 'home') {
      navigate('/');
    } else {
      navigate(`/?topic=${id}&view=theory`);
    }
    window.scrollTo(0, 0); 
  };

  const handleSetView = (view: ViewType) => {
    navigate(`/?topic=${currentTopic}&view=${view}`);
  };

  const handleSelectElement = (el: ElementData) => {
    setSelectedElement(el);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        modelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const renderAtomsModule = () => {
    if (currentView === 'theory') {
      return (
        <div className="max-w-4xl mx-auto">
          <AtomicTheory />
        </div>
      );
    }
    if (currentView === 'diy') {
      return (
        <div className="max-w-4xl mx-auto">
          <AtomicDIY />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Periodic Grid Selection */}
        <div className="lg:col-span-5 order-1">
          <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-blue-50">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 p-1 rounded-lg">📋</span>
              Pick an Element
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {FIRST_20_ELEMENTS.map((el) => (
                <button
                  key={el.symbol}
                  onClick={() => handleSelectElement(el)}
                  className={`relative group aspect-square flex flex-col items-center justify-center rounded-2xl transition-all border-2 ${
                    selectedElement.atomicNumber === el.atomicNumber 
                      ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg scale-105 z-10' 
                      : 'border-transparent hover:border-gray-200 hover:scale-105 bg-gray-50'
                  }`}
                  style={{ backgroundColor: selectedElement.atomicNumber === el.atomicNumber ? 'white' : el.color + '40' }}
                >
                  <span className="text-xs text-gray-500 font-bold absolute top-1 left-1.5">{el.atomicNumber}</span>
                  <span className="text-xl font-bold text-gray-800">{el.symbol}</span>
                  <span className="text-[10px] text-gray-600 truncate px-1">{el.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visualization + Details Below */}
        <div 
          ref={modelRef} 
          className="lg:col-span-7 order-2 flex flex-col gap-6"
        >
          <div key={selectedElement.atomicNumber} className="animate-zoom-in space-y-6">
            <AtomModel element={selectedElement} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description Card */}
              <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-blue-50 border-t-blue-500 flex flex-col">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✨</span> About {selectedElement.name}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm flex-1">
                  {selectedElement.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Family</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                      {selectedElement.category}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Atomic Mass</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                      {selectedElement.massNumber} u
                    </span>
                  </div>
                </div>
              </div>

              {/* Usage Image Card */}
              <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-50 overflow-hidden flex flex-col group">
                <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black text-blue-600 tracking-widest text-[8px]">Science in Action</span>
                  <span className="text-xs font-bold text-blue-800">{selectedElement.usageLabel}</span>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={selectedElement.usageImage} 
                    alt={selectedElement.usageLabel} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <p className="absolute bottom-3 left-4 text-white font-bold text-sm shadow-sm">
                    {selectedElement.name} is used in...
                  </p>
                </div>
                <div className="p-4 bg-white flex-1 flex flex-col justify-center text-center">
                  <p className="text-xs text-gray-500 italic">
                    "Look around! You can find {selectedElement.name} in {selectedElement.usageLabel.toLowerCase()}."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholder = (title: string, icon: string) => (
    <div className="max-w-4xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-32 h-32 bg-white rounded-full shadow-xl border-8 border-blue-50 flex items-center justify-center text-6xl mx-auto mb-8 animate-bounce">
        {icon}
      </div>
      <h2 className="text-4xl font-black text-gray-800 mb-4">{title}</h2>
      <p className="text-xl text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
        Our teachers are busy preparing this module for you! It will be full of fun experiments and Kenyan science facts soon.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 flex flex-col bg-[#f0f9ff]">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-4 shadow-md mb-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => handleSelectTopic('home')}
              className="flex items-center gap-2 md:gap-3 text-left hover:opacity-90 transition-opacity"
            >
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-black leading-none tracking-tight">Integrated Science</h1>
              </div>
            </button>
          </div>
          
          {currentTopic === 'atoms' && (
            <nav className="flex bg-blue-700/50 p-1 rounded-2xl backdrop-blur-sm gap-1 overflow-x-auto no-scrollbar max-w-[60%] sm:max-w-none">
              <button 
                onClick={() => handleSetView('theory')}
                className={`px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'theory' ? 'bg-white text-blue-700 shadow-md' : 'text-blue-50 hover:bg-blue-600/50'}`}
              >
                Structure
              </button>
              <button 
                onClick={() => handleSetView('explorer')}
                className={`px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'explorer' ? 'bg-white text-blue-700 shadow-md' : 'text-blue-50 hover:bg-blue-600/50'}`}
              >
                Explorer
              </button>
              <button 
                onClick={() => handleSetView('diy')}
                className={`px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'diy' ? 'bg-white text-blue-700 shadow-md' : 'text-blue-50 hover:bg-blue-600/50'}`}
              >
                Build! 🔨
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 flex-1 w-full">
        {currentTopic === 'home' ? (
          <HomePage onSelectTopic={handleSelectTopic} />
        ) : currentTopic === 'atoms' ? (
          renderAtomsModule()
        ) : (
          renderPlaceholder(
            currentTopic === 'plants' ? 'Shamba Science' : 
            currentTopic === 'body' ? 'The Human Body' :
            currentTopic === 'weather' ? 'Sky & Seasons' :
            currentTopic === 'water' ? 'Water is Life' :
            currentTopic === 'force' ? 'Push & Pull' : 'Bright Sparks',
            currentTopic === 'plants' ? '🌱' : 
            currentTopic === 'body' ? '🧠' :
            currentTopic === 'weather' ? '☁️' :
            currentTopic === 'water' ? '💧' :
            currentTopic === 'force' ? '⚽' : '💡'
          )
        )}
      </main>

      {/* Floating UI Elements */}
      <div className="fixed bottom-0 right-0 p-6 z-50 flex flex-col gap-4 pointer-events-none">
        <button
          onClick={scrollToTop}
          className={`pointer-events-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 hover:bg-blue-700 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          title="Scroll to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-sm border-t border-blue-100/50 pt-8 pb-12">
        <div className="flex justify-center gap-6 mb-4">
          <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Privacy</span>
          <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Terms</span>
          <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Teacher Resources</span>
        </div>
        <p>© 2024 Integrated Science Academy - Kenya</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] font-black">Empowering the next generation of African Scientists</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
