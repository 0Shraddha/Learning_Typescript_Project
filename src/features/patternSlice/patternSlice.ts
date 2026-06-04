// 1. Fixed import: swapped 'createSlice' for 'createApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/query';

export interface Pattern {
    id: number;
    title: string;
    description: string;
    hook: string;
    woolType: string;
    woolColors: string;
    imageUrl: string;
    videoUrl: string;
    steps: { id?: number; type: 'row' | 'info'; text: string }[];
}

// Omit 'id' for the creation payload since the database usually generates it
export type CreatePatternRequest = Omit<Pattern, 'id'>;

// 2. Fixed function: changed 'createSlice' to 'createApi'
export const patternApi = createApi({
    reducerPath: 'patternApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    // 3. Fixed typo: 'tagTYpes' changed to 'tagTypes', and aligned string case with providesTags
    tagTypes: ['Patterns'], 
    endpoints: (builder: EndpointBuilder<any, 'Patterns', 'patternApi'>) => ({

        getPatterns: builder.query<Pattern[], void>({
            query: () => "/patterns",
            providesTags: ['Patterns']
        }),

        // 4. Fixed: Added types to builder.mutation<ReturnType, ArgumentType>
        createPattern: builder.mutation<Pattern, CreatePatternRequest>({
            query: (pattern) => ({
                url: "/patterns",
                method: "POST",
                body: pattern // 'pattern' is now fully typed as CreatePatternRequest
            }),
            invalidatesTags: ['Patterns']
        })

    })
});

// 5. Fixed exports: updated hook name to match 'getPatterns' endpoint pluralization
export const { useGetPatternsQuery, useCreatePatternMutation } = patternApi;