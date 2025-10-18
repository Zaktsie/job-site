# Instructions for AI Agent

This document outlines best practices and conventions to follow when assisting with development in this project.

## Project Stack

*   **Framework:** Vue 3
*   **State Management:** Pinia
*   **Styling:** Tailwind CSS

---

# Vue 3, Pinia, and Tailwind CSS Best Practices

This document outlines best practices for developing with Vue 3, Pinia, and Tailwind CSS.

## Vue 3

*   **SFC (Single-File Components):** Always use Single-File Components for better organization and maintainability.
*   **`<script setup>`:** Use `<script setup>` for all new components. It's more concise and efficient.
*   **Composition API:** Embrace the Composition API to organize logic by feature. This is especially useful in large components.
*   **Reactivity:** Use `ref` for primitive types and `reactive` for objects.
*   **Props:** Use `defineProps` to declare props. For props that are objects or arrays, provide a default value using a factory function.
*   **Emits:** Use `defineEmits` to declare the events a component can emit.
*   **Component Naming:** Use PascalCase for component file names and when referencing them in templates (e.g., `<MyComponent />`).
*   **Slots:** Use slots for content distribution to create flexible and reusable components.
*   **Teleport:** Use `<Teleport>` to render content outside of the current component's DOM hierarchy, which is useful for modals, notifications, and popups.
*   **Suspense:** Use `<Suspense>` to handle async component loading gracefully.

## Pinia

*   **One Store per Feature:** Create a separate store for each feature or domain in your application (e.g., `userStore`, `productsStore`).
*   **State:** Keep your state as minimal as possible.
*   **Getters:** Use getters to compute derived state. Think of them as computed properties for your store.
*   **Actions:** Use actions to commit mutations. Actions can be asynchronous.
*   **Direct State Manipulation:** Avoid directly manipulating the state outside of actions, except in simple cases. For complex logic, always use an action.
*   **Naming Conventions:** Use a consistent naming convention for your stores, such as `use[Name]Store` (e.g., `useUserStore`).

## Tailwind CSS

*   **Utility-First:** Embrace the utility-first approach. Only extract components when you have a repeating pattern that can't be solved with utilities.
*   **`@apply`:** Use `@apply` sparingly. It's useful for creating custom component classes, but overusing it can lead to a CSS-in-JS-like situation, which might not be what you want from Tailwind.
*   **Configuration:** Customize your theme and variants in `tailwind.config.js`.
*   **PurgeCSS:** Make sure PurgeCSS is configured correctly to remove unused styles in your production builds.
*   **Variants:** Use variants to style elements in different states (e.g., `hover:`, `focus:`, `disabled:`).
*   **Plugins:** Use Tailwind CSS plugins to add new utilities or variants.
