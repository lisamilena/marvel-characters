# Marvel characters App

Built with **Next.js**.

## Getting Started

### Initial Setup

#### Volta

This project uses [Volta](https://volta.sh/) for JavaScript tooling management.

Once **Volta** is installed, it will automatically read the configuration from [package.json](package.json) and install the required dependencies.

#### ESLint and Prettier

For code consistency, this project use **ESLint** and **Prettier** to enforce formatting and coding style rules. 

#### Husky and Commitlint

This project use **Husky** to enforce pre-commit checks (e.g., running the linter), so ensure it is correctly configured on your machine.

Husky will run:
	•	Run `eslint` on staged files before committing and block the commit if any rules fail.
	•	Skip pre-commit type checks with `tsc` since it runs at the project level and would slow down commits. Instead, type checking is handled during the build process.

Additionally, we follow the **Conventional Commits** convention, which is enforced by **Husky**. Please follow this format when committing code:

##### Commit Message Format:

```
type(Ticket): short message in lowercase

optional detailed description if needed
```

```bash
# Example
feat(XXX-9999): fix typo in translations
```

### Running the app

Running the development server:

```bash
yarn dev
```

## Folder structure

That paradigm organizes all related components, stores, labels, and tests together, making it easier to manage and modify each feature.

A concrete example:

```
src/
├── app/
│   ├── ...
│   ├── (group)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ...
│   └── header/
│       ├── header-component.tsx
│       ├── header-component.test.ts
│       └── header.module.css
├── hocs/
│   ├── ...
│   └── with-layout.tsx
├── hooks/
├── i18n/
├── store/
│   ├── root-reducer.ts
│   └── store.ts
├── utils/
├── types/
├── services/
├── providers/
└── middleware.ts
```

Most notable directories:

- **React components:**
  - **Shared/ Components:** Components that aren’t tied to a single feature (e.g. layout components like header-component.tsx) live here
    - [`/src/components/`](/src/components/)
- **Hooks:**
  - **Reusable (and domain-related) hooks:**
    - [`/src/hooks/`](/src/hooks/)
- **HOCs:**
  - **Reusable (and domain-related) HOCs:**
    - [`/src/hocs/`](/src/hocs/)
- **Internationalization:** While *feature-specific translations should reside in their respective feature folder*, localize JSON translation files are located here.
  - **Internationalization config and Translations JSONs:**
    - [`/src/i18n/`](/src/i18n/)
- **Next.js routing:**
  - **App router:**
    - [`/src/app/`](/src/app/)
- **Store:**
	- **Global Client Store:** This is where global state management is handled. Feature-specific stores should remain within their respective feature folders.
  	- [`/src/store/`](/src/store/)
- **API/Services (data access, api calls, etc.):**
  - [`/src/service/`](/src/service/)
- **Utils/Libs:** For helper functions or libraries used across multiple features. For feature-specific utilities, keep them within the respective feature folder.
  - [`/src/utils/`](/src/utils/)
- **Types:** For globally shared type definitions. If a type is specific to a feature, include it in that feature’s folder instead.
  - [`/src/types/`](/src/types/)
- **Providers:** For globally shared providers using at app root level. We have a AppProviders component to get all them together on layouts.
  - [`/src/providers/`](/src/types/)
- **Test:** This folder is for test utilities and configuration. **No test files should be placed here**.
  - [`/src/test/`](/src/test/)
	- Good examples of files to include: test helpers, global mocks, and any shared testing utilities.
	- For more details on setting up the test environment, refer to `src/test/react-test-utils.tsx`.


## Tech Stack

**marvel-characters-app** is built using a modern and scalable stack optimized for performance, accessibility, and developer experience.

- **[Next.js 15](https://nextjs.org/)** – React framework with the App Router, used for server-side rendering (SSR), static site generation (SSG), and API routes.
- **[@tanstack/react-query](https://tanstack.com/query/latest/)** – Manages server state efficiently with automatic caching, background updates, and request deduplication.
  - **Usage:** Used for fetching and caching API data across the application.
- **[next-intl](https://next-intl-docs.vercel.app/)** – Internationalization solution tailored for Next.js, supporting both client and server components.
  - **Usage:** Manages translations using JSON files in ICU format, synchronized via Lokalize.
- **[nuqs](https://nuqs.47ng.com)** – Type-safe search params state manager for React.
  - **Usage:** Syncs state with the URL for better navigation and deep linking.
- **[react-aria-components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html)** – Provides accessible UI primitives following WAI-ARIA guidelines.
  - **Usage:** Used for accessible components with minimal customization effort.
- **[tailwindcss](https://tailwindcss.com/)** – A utility-first CSS framework for rapid UI development.
  - **Usage:** Applied for styling and layout, with component-based design.
- **[vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** – Testing stack for unit and integration tests.
  - **Usage:** Ensures component and business logic correctness with fast, modern testing utilities.

## Scripts

The package.json file includes several useful scripts for day-to-day tasks. The most important ones are:

### Running the development server:
```bash
yarn dev
```

### Running the app in production mode locally:
```bash
yarn serve:prod
```

### Running tests:
```bash
yarn test
```

> The following scripts should run automatically if your editor and Husky are properly configured. However, they are listed here for reference in case you need to run them manually.

### Checking for linting errors:
```bash
yarn lint
```

### Fixing linting errors:
```bash
yarn lint:fix
```

### Formatting files with Prettier:
```bash
yarn format
```

### Running TypeScript type checks:
```bash
yarn types:check
```
