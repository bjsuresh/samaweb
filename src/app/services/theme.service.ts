import { Injectable } from '@angular/core';

export interface AccentTheme {
  name: string;
  accent: string;
  hover: string;
  rgb: string;
}

export const ACCENT_THEMES: AccentTheme[] = [
  { name: 'orange', accent: '#f97316', hover: '#ea6a10', rgb: '249, 115, 22' },
  { name: 'blue',   accent: '#3b82f6', hover: '#2563eb', rgb: '59, 130, 246' },
  { name: 'green',  accent: '#10b981', hover: '#059669', rgb: '16, 185, 129' },
  { name: 'purple', accent: '#8b5cf6', hover: '#7c3aed', rgb: '139, 92, 246' },
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'accentTheme';
  currentTheme = 'orange';

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.setTheme(saved || 'orange');
  }

  setTheme(name: string): void {
    const theme = ACCENT_THEMES.find(t => t.name === name);
    if (!theme) return;

    this.currentTheme = name;
    localStorage.setItem(this.STORAGE_KEY, name);

    // Remove all theme-* classes from body
    const body = document.body;
    ACCENT_THEMES.forEach(t => body.classList.remove(`theme-${t.name}`));
    body.classList.add(`theme-${name}`);
  }
}
