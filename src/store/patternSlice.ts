// Tab 2 - state & actions (Videos, Steps)

import { StateCreator } from "zustand";
import { FormData, VideoSection, StepsSection } from "./types";

export interface PatterSlice {
    formData : FormData;
    currentTab : number;
    seTab : (tabNum: number) => void;
    nextTab : () => void;
    prevTab : () => void;
}