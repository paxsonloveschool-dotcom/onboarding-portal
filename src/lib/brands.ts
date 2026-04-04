import { BrandConfig } from '@/types';

export const brands: Record<string, BrandConfig> = {
  hp: {
    name: 'HP Landscaping',
    slug: 'hp-landscaping',
    primaryColor: '#2d5016',
    secondaryColor: '#4a7c32',
    accentColor: '#8bc34a',
    bgGradient: 'from-green-900 via-green-800 to-emerald-700',
    logo: '🌿',
  },
  restore: {
    name: 'Restore',
    slug: 'restore',
    primaryColor: '#1a56db',
    secondaryColor: '#2563eb',
    accentColor: '#60a5fa',
    bgGradient: 'from-blue-900 via-blue-800 to-indigo-700',
    logo: '🔧',
  },
};

export function getBrandFromPath(path: string): BrandConfig | null {
  if (path.startsWith('/hp-landscaping')) return brands.hp;
  if (path.startsWith('/restore')) return brands.restore;
  return null;
}

export function getTeamFromPath(path: string): 'hp' | 'restore' | null {
  if (path.startsWith('/hp-landscaping')) return 'hp';
  if (path.startsWith('/restore')) return 'restore';
  return null;
}
