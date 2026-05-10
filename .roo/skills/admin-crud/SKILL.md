---
name: admin-crud
description: gunakan skill ini pada halaman admin di path /src/app/console
---

# Admin Crud

## Instructions

# Workflow: Admin CRUD Generation

**Description**: A step-by-step guide to building a new high-performance, premium Admin Management page with SSR and full CRUD capabilities.

---

## ⚠️ CSS/Tailwind Naming Convention

**PENTING**: Gunakan **variabel CSS langsung** dengan syntax `var(--variable-name)`, BUKAN naming convention Tailwind UI/Shadcn.

| ❌ SALAH (Tailwind UI/Shadcn) | ✅ BENAR (CSS Variables)         |
| ----------------------------- | -------------------------------- |
| `bg-background-paper`         | `bg-[var(--bg-paper)]`           |
| `text-muted-foreground`       | `text-[var(--text-secondary)]`   |
| `bg-primary`                  | `bg-[var(--primary-main)]`       |
| `text-primary-foreground`     | `text-[var(--primary-contrast)]` |
| `border-divider`              | `border-[var(--divider)]`        |
| `bg-success/10`               | `bg-[var(--success-main)]/10`    |
| `text-success`                | `text-[var(--success-contrast)]` |

**Referensi lengkap**: Lihat [`globals.css`](../../../src/app/[locale]/globals.css) bagian `@theme` untuk semua variabel yang tersedia.

---

## ⚠️ Import Path Standards (Case Sensitivity)

**PENTING**: Path import harus **konsisten dengan casing folder** untuk menghindari error di Vercel (Linux case-sensitive).

| ❌ SALAH                                        | ✅ BENAR                              |
| ----------------------------------------------- | ------------------------------------- |
| `import X from "../(Auth)/..."`                 | `import X from "../(auth)/..."`       |
| `import X from "@/app/[locale]/(guest)/Header"` | `import X from "@/components/header"` |

**Best Practice**:

1. Gunakan **folder shared** (`src/components/`) untuk komponen yang dipakai di multiple route groups
2. Hindari import lintas route groups `(guest)`, `(auth)`, `(console)` dengan path relatif
3. Gunakan **absolute import** dengan alias `@/` untuk konsistensi

---

## Step 1: Define Type Definitions

Create or update the types in `src/types/`.

1. Define the main Entity type (e.g., `Product`).
2. Define the Query type by extending `PaginationQuery`.
3. Ensure you have the necessary Role/Status string literals.

## Step 2: Implement API Functions

Add the functions to `src/lib/api.tsx`.

1. **GET**: Use `strategy: "admin"` to ensure fresh data.
   - Signature: `api.get<T>(endpoint, { strategy: "admin" }, token)`
2. **POST**: For creation (e.g., `/products`).
   - Signature: `api.post<T>(endpoint, data, undefined, token)` — ❌ no `strategy` param
3. **PUT**: For updates (e.g., `/products/:id`).
   - Signature: `api.put<T>(endpoint, body, undefined, token)` — ❌ no `strategy` param
4. **DELETE**: For removal.
   - Signature: `api.delete<T>(endpoint, undefined, token)`

⚠️ **Important**: Mutative methods (POST, PUT, PATCH, DELETE) do NOT support `strategy` parameter. They never use cache by default.

## Step 3: Create the Server Component (page.tsx)

1. Set `export const dynamic = "force-dynamic"`.
2. Extract `searchParams`.
3. Fetch data using the `token` from cookies.
4. Render the page title and the primary "New Entity" dialog button.
5. Pass initial data and query to the `Manager` client component.

## Step 4: Create the Client Manager (Manager.tsx)

1. Use `useState` for local search values.
2. Implement `updateQuery` to sync search/filters/pagination with the URL via `router.push`.
3. Render the table header with `SortableHeader`.
4. Render the table body with action buttons that trigger Dialogs.

## Step 5: Implement Dialog Components

Create separate files for `DialogCreate.tsx`, `DialogEdit.tsx`, `DialogDelete.tsx`.

1. Use `useRouter` for `router.refresh()`.
2. Implement `onSubmit` handlers using `FormData`.
3. Close the dialog programmatically using `document.getElementById(id).hidePopover()`.
4. Trigger `toast.success` on completion.

## Step 6: Verification

1. Verify that searching/filtering updates the URL.
2. Verify that `router.refresh()` correctly fetches fresh data (check Network tab for `_rsc` calls).
3. Verify that the UI remains responsive and beautiful across all viewports.

# Workflow: Admin CRUD Generation

**Description**: A step-by-step guide to building a new high-performance, premium Admin Management page with SSR and full CRUD capabilities.

---

## Step 1: Define Type Definitions

Create or update the types in `src/types/`.

1. Define the main Entity type (e.g., `Product`).
2. Define the Query type by extending `PaginationQuery`.
3. Ensure you have the necessary Role/Status string literals.

## Step 2: Implement API Functions

Add the functions to `src/lib/api.tsx`.

1. **GET**: Use `strategy: "admin"` to ensure fresh data.
2. **POST**: For creation (e.g., `/products`).
3. **PUT**: For updates (e.g., `/products/:id`).
4. **DELETE**: For removal.

## Step 3: Create the Server Component (page.tsx)

1. Set `export const dynamic = "force-dynamic"`.
2. Extract `searchParams`.
3. Fetch data using the `token` from cookies.
4. Render the page title and the primary "New Entity" dialog button.
5. Pass initial data and query to the `Manager` client component.

## Step 4: Create the Client Manager (Manager.tsx)

1. Use `useState` for local search values.
2. Implement `updateQuery` to sync search/filters/pagination with the URL via `router.push`.
3. Render the table header with `SortableHeader`.
4. Render the table body with action buttons that trigger Dialogs.

## Step 5: Implement Dialog Components

Create separate files for `DialogCreate.tsx`, `DialogEdit.tsx`, `DialogDelete.tsx`.

1. Use `useRouter` for `router.refresh()`.
2. Implement `onSubmit` handlers using `FormData`.
3. Close the dialog programmatically using `document.getElementById(id).hidePopover()`.
4. Trigger `toast.success` on completion.

## Step 6: Verification

1. Verify that searching/filtering updates the URL.
2. Verify that `router.refresh()` correctly fetches fresh data (check Network tab for `_rsc` calls).
3. Verify that the UI remains responsive and beautiful across all viewports.
