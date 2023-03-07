import { create } from "zustand";

interface Biometrics {
  isEnabled: boolean;
  toggleEnable: (value: boolean) => void;
}

export const useBiometricsStore = create<Biometrics>(set => ({
  isEnabled: false,
  toggleEnable: (value: boolean) => set(() => ({ isEnabled: value })),
}));

// Selector
export const isEnabledSelector = (state: Biometrics) => state.isEnabled;

// Handler
export const toggleEnableHandler = (state: Biometrics) => state.toggleEnable;
