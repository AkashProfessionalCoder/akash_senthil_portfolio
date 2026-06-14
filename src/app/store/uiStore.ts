import { create } from 'zustand'

interface UIState {
  isTerminalOpen: boolean;
  activeSection: string;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTerminalOpen: false,
  activeSection: 'hero',
  setTerminalOpen: (open) => set({ isTerminalOpen: open }),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}))
