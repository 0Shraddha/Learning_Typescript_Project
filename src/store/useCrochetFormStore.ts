import {create} from "zustand";
import { InfoSlice, createInfoSlice } from "./infoSlice";

type StoreState = InfoSlice;

export const useCrochetFormStore = create <StoreState>((set,get,store) => ({
    ...createInfoSlice(set,get,store),

})
)