# Update Summary

## What changed

- Expanded `PatternProps` in `src/component/form/Patterns.types.ts` to include:
  - `hook`
  - `woolType`
  - `woolColors`
  - `imageUrl`
  - `videoUrl`
  - `steps`

- Updated `src/component/form/PatternsForm.tsx` so the form now captures:
  - Title
  - Hook size
  - Wool type
  - Wool colors
  - Price
  - Description
  - Cover image upload
  - Tutorial video upload
  - Multiple pattern steps with both Row and Info blocks

- Converted `WritePatterns` in `src/component/form/WritePatterns.tsx` into a controlled component.
  - Parent form now manages the steps state.
  - Added callbacks for adding, updating, and deleting row/info items.

- Updated `src/component/patterns/DisplayPattern.tsx` to render:
  - image preview
  - video preview
  - pattern description
  - hook size, wool type, colors, price
  - row/info steps listed in the saved pattern

## Important React concepts used

- `useState`
  - Manages local component state in `PatternsForm`.
  - Stores input values such as title, price, wool colors, and media URLs.

- `useReducer`
  - Previously used in `WritePatterns` to manage an array of step items.
  - Helps when state updates are more complex than simple `useState` assignments.

- Controlled components
  - Inputs like `title`, `hook`, `woolType`, `woolColors`, and `price` are controlled by React state.
  - The displayed input value always comes from state, and changes are handled through `onChange`.

- Lifting state up
  - `PatternsForm` owns the full pattern state and passes step handlers into `WritePatterns`.
  - This makes the form the single source of truth for all pattern data.

- Component composition
  - `PatternsForm` uses child components like `WritePatterns`, `UploadMedia`, and `Label`.
  - Breaking UI into smaller pieces improves reuse and keeps each component focused.

- Callback props
  - `WritePatterns` receives `onAddItem`, `onUpdateItem`, and `onDeleteItem`.
  - Child components call these callbacks to update parent state.

- Conditional rendering
  - `DisplayPattern` shows placeholders if no image or video are uploaded.
  - It also renders steps only when they exist.

- `localStorage`
  - Used to save the full pattern payload locally.
  - Useful for simple persistence between page refreshes.

## How submission works now

- `Create Pattern` builds a payload from the full form state.
- The payload includes all pattern fields, step instructions, and media URLs.
- The form saves this payload to `localStorage` under the `pattern` key.

## Notes

- The current implementation stores uploaded media as browser object URLs for display.
- If you want file uploads to persist across refresh or send them to a backend, the upload logic can be extended to use `FormData` or a base64/data-url conversion step.
