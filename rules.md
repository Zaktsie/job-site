# Project Rules

This document outlines the rules and conventions to be followed in this project.

## General

*   **Code Style:** Follow the established code style. Use the provided linting tools to enforce it.
*   **Testing:** Write tests for all new features and bug fixes.
*   **Commit Messages:** Follow the conventional commit format for commit messages.

## Vue

*   **Component Size:** Keep components small and focused on a single responsibility.
*   **Props:** Use props for passing data down to child components.
*   **Events:** Use events to send data up to parent components.

## Pinia

*   **Actions:** All state changes should be done through actions.
*   **Getters:** Use getters for computed state.

## Tailwind CSS

*   **Theme:** Use the values from the theme file (`tailwind.config.js`) whenever possible.
*   **Custom CSS:** Avoid writing custom CSS. If you need to, use the `@apply` directive in a CSS file.
