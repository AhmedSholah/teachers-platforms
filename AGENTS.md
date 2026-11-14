# Agent Guidelines & Development Standards

This document establishes the architectural and styling standards for all AI agents and contributors working on this repository.

---

## 1. Core Directives

### 1.1 Nuxt UI Components Only

- **Always use Nuxt UI components** for all user interface elements across the application.
- **Do not** introduce secondary UI component libraries (e.g., Vuetify, PrimeVue, Element Plus, Radix/Shadcn ports).
- **Do not** craft custom primitive controls with raw HTML when an equivalent Nuxt UI component exists.
- Use Nuxt UI components for:
  - **Buttons & Actions:** `UButton`, `UButtonGroup`, `UDropdownMenu`
  - **Form Controls:** `UInput`, `UTextarea`, `USelect`, `USelectMenu`, `UCheckbox`, `URadioGroup`, `USwitch`, `UFormField` / `UFormGroup`, `UForm`
  - **Layout & Surfaces:** `UContainer`, `UCard`, `UPage`
  - **Feedback & State:** `UBadge`, `UAlert`, `UProgress`, `USkeleton`, `UTooltip`
  - **Navigation:** `UNavigationMenu`, `UBreadcrumb`, `UPagination`, `UTabs`
  - **Overlays & Dialogs:** `UModal`, `USlideover`, `UPopover`
  - **Data Display:** `UTable`, `UAvatar`, `UAccordion`
  - **Icons:** `UIcon` (leveraging Nuxt UI's icon integration)

### 1.2 Tailwind CSS for Styling

- **Exclusively use Tailwind CSS utility classes** for all layout, spacing, typography, colors, borders, and visual styling.
- **Strictly avoid inline styles:** Do not use `style="..."` attributes (e.g. `style="display: flex; gap: 16px;"`). Use Tailwind classes (e.g. `class="flex gap-4"`).
- **Avoid custom `<style>` blocks:** Do not write vanilla CSS inside `<style>` blocks unless strictly necessary for third-party library integrations (such as TipTap rich text editor rendered content).
- **RTL (Right-to-Left) First:** The application default language is Arabic (`dir="rtl"`). Always ensure designs support RTL correctly:
  - Prefer Tailwind logical spacing and positioning utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) over physical left/right classes where directional alignment matters.
  - Test layouts in RTL orientation.

### 1.3 Nuxt Icon for Icons

- **Always use Nuxt Icon (`UIcon` / `<Icon>`)** for all iconography across the application.
- **Strictly avoid inline raw SVG elements (`<svg>...</svg>`)** or third-party icon font libraries (FontAwesome, Material Icons).
- Use Iconify collection identifiers (e.g., `i-lucide-*`, `i-heroicons-*`).
- Control icon sizing and coloring using Tailwind CSS utility classes (e.g., `class="w-5 h-5 text-blue-600"`) or component props (`size`, `color`).

### 1.4 Dashboard Shell, Navbar & Toolbar (Nuxt Dashboard Template Structure)

- **Nuxt UI Dashboard Primitives:**
  - The teacher dashboard shell uses `UDashboardGroup` and `UDashboardSidebar` (collapsible and resizable) in [teacher-dashboard.vue](file:///C:/Users/Admin/Desktop/Projects/teachers-platforms/app/pages/teacher-dashboard.vue), with `UDashboardSearch` (`⌘K`) and `NotificationsSlideover`.
  - Every dashboard page wraps its content in `UDashboardPanel` with `<template #header>` containing `UDashboardNavbar` (sidebar collapse toggle, page title `<h1>`, and right-side action buttons) and optional `UDashboardToolbar` (filters, date pickers, period selectors, or horizontal `UNavigationMenu` sub-tabs).
  - Do not use legacy `UBreadcrumb` headers or `DashboardActionBar` on teacher dashboard pages; place primary page actions in `UDashboardNavbar` `#right` and contextual filters/tabs in `UDashboardToolbar`.

---

## 2. Component & Code Conventions

- **Vue 3 `<script setup lang="ts">`:** Always use `<script setup lang="ts">` with TypeScript.
- **Nuxt Auto-Imports:** Leverage Nuxt's auto-import capabilities for Vue composables (`ref`, `computed`, `reactive`, `watch`), Nuxt utilities (`useHead`, `useRoute`, `useRouter`, `navigateTo`), and Nuxt UI components without redundant manual imports.
- **Responsive Design:** Build mobile-responsive layouts using Tailwind's standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
- **Clean Architecture:** Keep pages clean by extracting reusable UI patterns into components under `app/components/` and business logic into composables under `app/composables/`.
