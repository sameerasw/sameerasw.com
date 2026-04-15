export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  icon?: string;
}

export const PRODUCTS: Record<string, ProductConfig> = {
  airsync: {
    id: 'airsync',
    name: 'AirSync',
    description: 'Bridge the gap between Android and macOS.',
    accentColor: '#4affbd',
  },
  essentials: {
    id: 'essentials',
    name: 'Essentials',
    description: 'Essential tools for your workflow.',
    accentColor: '#ff6b6b',
  },
};

export const DOCS_PATH = 'content/docs';
