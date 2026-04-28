# Admin CRUD Standards & Rules

Rules for maintaining consistency across administrative management interfaces (CRUD).

## 1. API & Data Fetching
- **No Caching**: All admin GET requests MUST use `strategy: "admin"` or `cache: "no-store"`.
- **HttpClient**: Always use the standardized `HttpClient` class. Do not use raw `fetch` for admin operations.
- **SSR by Default**: Table data should be fetched in a Server Component (`page.tsx`) to support SEO and initial load performance.
- **Token Handling**: Pass the `auth_token` from cookies to the API call when fetching server-side.

## 2. Type Safety
- **Query Objects**: Extend `PaginationQuery` for all listing APIs (e.g., `UserQuery`, `ProductQuery`).
- **Response Envelopes**: Always use `Response<T>` for single items and `ResponsePaginate<T>` for lists.
- **Enums**: Use string literal types (e.g., `UserRole`, `UserStatus`) instead of magic strings.

## 3. UI/UX Aesthetics (Premium Standard)
- **Glassmorphism**: Use `bg-background-paper/50 backdrop-blur-md` for toolbars and overlays.
- **Feedback**:
  - Always show loading states on buttons (e.g., "Saving...", "Purging...").
  - Use `toast.success` and `toastError` for API operation results.
  - Disable buttons while a request is `isPending`.
- **Interactions**:
  - Use `Ripple` component on all primary buttons.
  - Table rows should have a subtle hover effect (`hover:bg-primary-main/[0.02]`).
  - Use unique IDs for Dialogs (e.g., `id="edit-user-${id}"`) to prevent popover collisions.
- **Persistence**: Search, Pagination, and Filters MUST be synced with the URL search parameters to allow bookmarking and browser history support.

## 4. File Structure
- `page.tsx`: Server Component (Data Fetcher).
- `Manager.tsx`: Main Client Component (State & URL sync).
- `DialogCreate.tsx`, `DialogEdit.tsx`, etc.: Isolated dialog components for cleaner management.
