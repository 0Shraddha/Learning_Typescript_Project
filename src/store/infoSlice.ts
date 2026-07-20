// Tab 1 - state & actions (Details)

import { StateCreator } from 'zustand';
import { FormData, Materials } from './types'; // Assuming types are imported

export interface InfoSlice {
  formData: FormData;
  currentTab: number;
  setTab: (tabNum: number) => void;
  nextTab: () => void;
  prevTab: () => void;
  updateField: (field: keyof Omit<FormData, 'materials' | 'pattern'>, value: string) => void;
  updateMaterialField: (field: keyof Materials, value: string | string[]) => void;
}

const initialState: FormData = {
  title: "", description: "", coverImage: "",
  materials: { hook: "", woolType: "", woolColors: "" },
  pattern: { videos: [], steps: [] },
};

// We use StateCreator here. Notice the pure JavaScript object spreading instead of mutations.
export const createInfoSlice: StateCreator<InfoSlice, [], [], InfoSlice> = (set) => ({
  formData: initialState,
  currentTab: 1,

  setTab: (tabNum) => set({ currentTab: tabNum }),

  nextTab: () =>
    set((state) => ({
      currentTab: Math.min(state.currentTab + 1, 3),
    })),

  prevTab: () =>
    set((state) => ({
      currentTab: Math.max(state.currentTab - 1, 1),
    })),

  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  updateMaterialField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        materials: {
          ...state.formData.materials,
          [field]: value,
        },
      },
    })),
});