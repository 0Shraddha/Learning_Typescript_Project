import { configureStore } from '@reduxjs/toolkit';
import {patternApi} from '../src/features/patternSlice/patternSlice'; // Adjust path as needed

export const store = configureStore({
    reducer: {
        // Use the dynamic reducerPath dynamically so it matches 'patternApi'
        [patternApi.reducerPath]: patternApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, and polling
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(patternApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;