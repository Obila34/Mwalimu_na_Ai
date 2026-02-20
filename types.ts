
export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  massNumber: number;
  category: string;
  configuration: number[];
  color: string;
  description: string;
  usageImage: string;
  usageLabel: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ViewType = 'home' | 'explorer' | 'theory' | 'diy';

export type TopicId = 'atoms' | 'plants' | 'body' | 'weather' | 'water' | 'force' | 'energy';

export interface ScienceTopic {
  id: TopicId;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}