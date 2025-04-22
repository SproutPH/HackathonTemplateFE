# Sprout Hackaton FE Template

This template provides a starting point for developing Sprout Hackaton FE applications with Vite, incorporating the sprout design system, best practices and modern tooling.

## Technology Stack

This project utilizes the following core technologies:

- **Framework:** [Vue 3](https://vuejs.org/) - A progressive JavaScript framework for building user interfaces, chosen for its performance and developer experience.
- **Build Tool:** [Vite](https://vitejs.dev/) - A modern frontend build tool providing extremely fast hot module replacement (HMR) and optimized production builds.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript, improving code quality, maintainability, and developer productivity.
- **Routing:** [Vue Router](https://router.vuejs.org/) - The official router for Vue.js, enabling navigation and view management in single-page applications.
- **State Management:** [Pinia](https://pinia.vuejs.org/) - The recommended state management library for Vue 3, offering a simple and type-safe way to manage application state.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs directly in your markup.
- **UI Components:** [Sprout Design System](https://jolly-rock-0e7e9fa00.5.azurestaticapps.net/) - Provides pre-built, reusable UI components adhering to the Sprout design language.
- **Utility Functions:** [VueUse](https://vueuse.org/) - A collection of essential Composition API utilities for Vue 3, simplifying common tasks and improving code reuse.
- **HTTP Client:** [Axios](https://axios-http.com/) - A promise-based HTTP client for making requests to backend services from the browser or Node.js.
- **Authentication:** [Keycloak JS](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter) - Facilitates integration with Keycloak for secure user authentication and authorization.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended, currently v20.x)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
