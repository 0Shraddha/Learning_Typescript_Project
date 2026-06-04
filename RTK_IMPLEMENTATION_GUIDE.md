# Redux Toolkit (RTK) Implementation Guide for Beginners

## Table of Contents
1. [What's the Problem?](#whats-the-problem)
2. [RTK Basics](#rtk-basics)
3. [RTK Query Explained](#rtk-query-explained)
4. [Current Project Setup Issues](#current-project-setup-issues)
5. [Step-by-Step Fix](#step-by-step-fix)
6. [Best Practices](#best-practices)

---

## What's the Problem?

Your project has the **infrastructure set up correctly** but the **components aren't using it**. Here's what's wrong:

### ❌ Current Issues:

1. **RTK Query Configured But Not Used**
   - You have `patternApi` with endpoints (`getPatterns`, `createPattern`)
   - But components use `useState` instead of RTK hooks
   - The store is set up but disconnected from UI

2. **No Real Data Flow**
   - PatternList.tsx has hardcoded mock data
   - PatternsForm.tsx uses local state without integrating with RTK mutations
   - Components don't import or use `useGetPatternsQuery` or `useCreatePatternMutation`

3. **Missing Connection**
   - Provider wraps the app correctly ✅
   - Store is configured correctly ✅
   - But components fetch/save data locally instead of through Redux ❌

### Example of the Problem:
```typescript
// ❌ WRONG - PatternList.tsx currently does this:
export const PatternList = () => {
    return (
        <CardComponent title="Strawberry Keychain" count={24} />
        // Hardcoded data, never fetches from store!
    )
}

// ✅ SHOULD do this:
import { useGetPatternsQuery } from '../features/patternSlice/patternSlice';

export const PatternList = () => {
    const { data: patterns, isLoading } = useGetPatternsQuery();
    
    return patterns?.map(p => <CardComponent title={p.title} />)
}
```

---

## RTK Basics

### What is Redux Toolkit?

Redux Toolkit (RTK) is a library that simplifies Redux state management. It provides tools for:
- Creating actions and reducers (createSlice)
- Making API calls (createApi/RTK Query)
- Managing caching automatically

### Why Use RTK?

| Without RTK | With RTK |
|------------|----------|
| 500+ lines of boilerplate | ~50 lines to start |
| Manual caching | Automatic caching |
| Manual loading states | Built-in loading/error states |
| Complex async logic | Simple hooks |

---

## RTK Query Explained

### What is RTK Query?

RTK Query is a data-fetching and caching solution built into Redux Toolkit. It:
- Automatically fetches data from APIs
- Caches results automatically
- Invalidates cache when data changes
- Provides hooks for components to use

### Three Main Concepts:

#### 1. **createApi** - Define your API
```typescript
// Define what endpoints you have
export const patternApi = createApi({
    reducerPath: 'patternApi',           // Unique identifier
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:3000" // Your API base URL
    }),
    tagTypes: ['Patterns'],              // Cache tags for invalidation
    endpoints: (builder) => ({
        // Your endpoints go here
    })
});
```

#### 2. **Endpoints** - Define operations (queries & mutations)

**Query** = Fetch data (GET request)
```typescript
getPatterns: builder.query<Pattern[], void>({
    query: () => "/patterns",           // Endpoint path
    providesTags: ['Patterns']         // Provides cache tag
}),
```

**Mutation** = Modify data (POST, PUT, DELETE)
```typescript
createPattern: builder.mutation<Pattern, CreatePatternRequest>({
    query: (pattern) => ({
        url: "/patterns",
        method: "POST",
        body: pattern
    }),
    invalidatesTags: ['Patterns']      // Invalidate cache after mutation
}),
```

#### 3. **Hooks** - Use in components
```typescript
// Automatically generated from endpoints
export const { useGetPatternsQuery, useCreatePatternMutation } = patternApi;
```

---

## Current Project Setup Issues

### Your Current Files:

#### ✅ `store.ts` - CORRECT
```typescript
export const store = configureStore({
    reducer: {
        [patternApi.reducerPath]: patternApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(patternApi.middleware),
});
```
This tells Redux: "Use patternApi reducer and middleware"

#### ✅ `patternSlice.ts` - CORRECT
All endpoints are properly defined with correct types.

#### ✅ `index.tsx` - CORRECT
```typescript
<Provider store={store}>
    <App />
</Provider>
```
This provides the store to all components.

#### ❌ `PatternList.tsx` - WRONG
- Doesn't import RTK hooks
- Doesn't call `useGetPatternsQuery()`
- Uses hardcoded data instead

#### ❌ `PatternsForm.tsx` - WRONG
- Doesn't import `useCreatePatternMutation`
- Doesn't dispatch to store on submit
- Only uses local state

---

## Step-by-Step Fix

### Step 1: Update PatternList.tsx

**Before:**
```typescript
export const PatternList = () => {
    return (
        <CardComponent title="Strawberry Keychain" count={24} />
        // Hardcoded data
    )
}
```

**After:**
```typescript
import { useGetPatternsQuery } from "../features/patternSlice/patternSlice";
import { Info } from "../component/about/Info";
import { CardComponent } from "../component/card/CardComponent";

export const PatternList = () => {
    // ✨ Hook into RTK Query - automatically fetches data!
    const { data: patterns, isLoading, error } = useGetPatternsQuery();

    if (isLoading) return <div>Loading patterns...</div>;
    if (error) return <div>Error loading patterns</div>;

    return (
        <>
            <Info name="My Pattern List" bio="" styles={{ 
                margin: 0, 
                color: "palevioletred", 
                fontSize: '1rem', 
                textAlign: 'center' 
            }} />
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "24px",
                padding: "20px 50px",
            }}>
                {/* Map over real data from store */}
                {patterns?.map((pattern) => (
                    <CardComponent 
                        key={pattern.id}
                        title={pattern.title} 
                        count={pattern.steps?.length || 0} 
                    />
                ))}
            </div>
        </>
    );
}
```

### Step 2: Update PatternsForm.tsx

**Key Changes:**
1. Import `useCreatePatternMutation`
2. Call the hook to get mutation function
3. Use mutation function on form submit
4. Handle success/error states

```typescript
import { useCreatePatternMutation } from '../features/patternSlice/patternSlice';

export const PatternsForm = () => {
    // ✨ Get the mutation function and its states
    const [createPattern, { isLoading, error, isSuccess }] = useCreatePatternMutation();

    const [pattern, setPattern] = useState<PatternProps>({
        title: "",
        patterns: "",
        description: "",
        price: 0,
        hook: "",
        woolType: "",
        woolColors: "",
        imageUrl: "",
        videoUrl: "",
        steps: [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Remove fields not in Pattern interface
        const { price, patterns: _, ...patternToSave } = pattern;
        
        try {
            // ✨ Call the RTK mutation
            await createPattern(patternToSave).unwrap();
            alert("Pattern created successfully!");
            // Reset form
            setPattern({
                title: "",
                patterns: "",
                description: "",
                price: 0,
                hook: "",
                woolType: "",
                woolColors: "",
                imageUrl: "",
                videoUrl: "",
                steps: [],
            });
        } catch (err) {
            console.error("Failed to create pattern:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Your form fields... */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Pattern"}
            </button>
            {isSuccess && <p style={{ color: "green" }}>Pattern created!</p>}
            {error && <p style={{ color: "red" }}>Error creating pattern</p>}
        </form>
    );
}
```

### Step 3: How the Data Flow Works Now

```
User interacts with UI
        ↓
Component uses RTK hook (useCreatePatternMutation)
        ↓
Hook calls API via RTK Query
        ↓
Store receives response
        ↓
Cache is updated automatically
        ↓
Components re-render with new data
        ↓
UI shows updated data
```

---

## Key Concepts Explained

### Hook Types:

#### 1. **useGetPatternsQuery()** - For fetching data
```typescript
const { 
    data,           // The actual data from API
    isLoading,      // true while fetching
    error,          // Error object if failed
    isFetching,     // true if currently fetching (different from isLoading)
    refetch         // Function to manually refetch
} = useGetPatternsQuery();
```

#### 2. **useCreatePatternMutation()** - For modifying data
```typescript
const [createPattern, { 
    isLoading,      // true while request is pending
    error,          // Error object if failed
    isSuccess,      // true after successful mutation
    data            // Response data from API
}] = useCreatePatternMutation();

// Use it like this:
createPattern(newPattern)
    .unwrap()       // Convert to Promise
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### Cache Invalidation:

When you update data, you need to tell RTK to refetch stale data:

```typescript
createPattern: builder.mutation<Pattern, CreatePatternRequest>({
    query: (pattern) => ({
        url: "/patterns",
        method: "POST",
        body: pattern
    }),
    invalidatesTags: ['Patterns']  // ← After mutation succeeds, 
                                    //   invalidate Patterns cache
                                    //   so useGetPatternsQuery refetches
}),
```

---

## Best Practices

### ✅ DO:

1. **Use hooks for data fetching**
   ```typescript
   const { data } = useGetPatternsQuery();
   ```

2. **Check loading/error states**
   ```typescript
   if (isLoading) return <Spinner />;
   if (error) return <ErrorMessage />;
   ```

3. **Use invalidatesTags for mutations**
   ```typescript
   invalidatesTags: ['Patterns']  // Triggers refetch of related queries
   ```

4. **Handle async with .unwrap()**
   ```typescript
   await createPattern(data).unwrap();
   ```

### ❌ DON'T:

1. **Don't mix local state and RTK**
   ```typescript
   // ❌ BAD - Confused data sources
   const [patterns, setPatterns] = useState();
   const { data: patternsFromStore } = useGetPatternsQuery();
   ```

2. **Don't forget middleware in store**
   ```typescript
   // ❌ BAD - API won't work
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
   
   // ✅ GOOD
   middleware: (getDefaultMiddleware) => 
       getDefaultMiddleware().concat(patternApi.middleware)
   ```

3. **Don't manually cache manage**
   ```typescript
   // ❌ BAD - RTK does this automatically
   localStorage.setItem('patterns', JSON.stringify(data));
   
   // ✅ GOOD - RTK handles it
   const { data } = useGetPatternsQuery();
   ```

---

## Troubleshooting

### Q: Why isn't data showing?
**A:** Check:
1. Is the component using the RTK hook? → Import and call it
2. Is middleware added to store? → Check store.ts
3. Is Provider wrapping the app? → Check index.tsx
4. Is the API running? → Check baseUrl in patternSlice.ts

### Q: Data doesn't update after mutation?
**A:** Check:
1. Does mutation have `invalidatesTags`? → Add it
2. Does query have matching `providesTags`? → Make sure they match
3. Are tag names consistent? → Use exact same string

### Q: Getting "hooks can only be called inside components"?
**A:** You're calling the hook in a non-component file:
```typescript
// ❌ WRONG - This is NOT a React component
const data = useGetPatternsQuery();

// ✅ RIGHT - This IS a React component
function MyComponent() {
    const data = useGetPatternsQuery();
    return <div>{data}</div>;
}
```

---

## Summary

| Component | Purpose | Status |
|-----------|---------|--------|
| store.ts | Configure Redux store | ✅ Correct |
| patternSlice.ts | Define API & endpoints | ✅ Correct |
| index.tsx | Provide store to app | ✅ Correct |
| PatternList.tsx | Use RTK hooks | ❌ Needs update |
| PatternsForm.tsx | Dispatch mutations | ❌ Needs update |

**The fix:** Import RTK hooks in components and use them instead of local state!

---

## Quick Reference

```typescript
// In any component:

// For fetching:
import { useGetPatternsQuery } from '../features/patternSlice/patternSlice';
const { data: patterns } = useGetPatternsQuery();

// For creating:
import { useCreatePatternMutation } from '../features/patternSlice/patternSlice';
const [createPattern] = useCreatePatternMutation();
await createPattern(newPattern).unwrap();

// For updating:
// Add to patternSlice.ts:
updatePattern: builder.mutation<Pattern, Pattern>({
    query: (pattern) => ({
        url: `/patterns/${pattern.id}`,
        method: "PUT",
        body: pattern
    }),
    invalidatesTags: ['Patterns']
}),

// For deleting:
// Add to patternSlice.ts:
deletePattern: builder.mutation<void, number>({
    query: (id) => ({
        url: `/patterns/${id}`,
        method: "DELETE"
    }),
    invalidatesTags: ['Patterns']
}),
```

