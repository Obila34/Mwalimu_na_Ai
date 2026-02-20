
import React, { useState, useRef, useEffect } from 'react';
import { askScienceFact } from '../services/geminiService';
import { ChatMessage, ElementData } from '../types';
import SpeechButton from './SpeechButton';

interface ScienceChatProps {
  selectedElement: ElementData;
}

const ScienceChat: React.FC<ScienceChatProps> = ({ selectedElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const answer = await askScienceFact(selectedElement.name, input);
    const aiMsg: ChatMessage = { role: 'model', text: answer || 'I am sorry, I am resting. Ask again later!' };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-4 border-indigo-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-indigo-600 p-4 text-white font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">👨‍🔬</span>
              <span className="text-sm">Mr. Science: {selectedElement.name}</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-indigo-50/20">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p className="italic text-sm">"Hi! I am your science teacher. Ask me anything about {selectedElement.name}!"</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm relative group ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-indigo-100'
                }`}>
                  <p className="text-xs sm:text-sm">{msg.text}</p>
                  {msg.role === 'model' && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full shadow-md">
                      <SpeechButton text={msg.text} className="text-indigo-600 p-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 rounded-2xl p-3 rounded-tl-none border border-indigo-100 animate-pulse">
                  <p className="text-xs">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-indigo-100 flex gap-2 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-gray-200 rotate-90 opacity-0 pointer-events-none' : 'bg-indigo-600 text-white'
        }`}
      >
        <span className="relative">
          👨‍🔬
          {!isOpen && messages.length === 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-700 border-2 border-white"></span>
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default ScienceChat;