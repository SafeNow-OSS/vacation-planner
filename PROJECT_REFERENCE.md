# Project Reference for Vacation Planner

## Project Overview
The Vacation Planner project is a web application built using the following technologies:

- **Framework**: Next.js (v15.2.3)
- **CMS**: Payload CMS (v3.31.0)
- **Database**: Vercel Postgres (via `@payloadcms/db-vercel-postgres`)
- **Frontend**: React (v19.0.0) and React DOM (v19.0.0)
- **Styling**: CSS and SCSS
- **GraphQL**: GraphQL API support
- **Image Processing**: Sharp (v0.32.6)

## Project Structure
The project has the following key directories and files:

- **`docker-compose.yml`**: Configuration for Docker Compose.
- **`Dockerfile`**: Docker image setup.
- **`eslint.config.mjs`**: ESLint configuration.
- **`next.config.mjs`**: Next.js configuration.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript configuration.
- **`pages/`**: Contains API routes and frontend pages.
- **`src/`**: Main source directory containing the following:
  - **`payload-types.ts`**: Payload CMS type definitions.
  - **`payload.config.ts`**: Payload CMS configuration.
  - **`app/`**: Application-specific code:
    - **`frontend/`**: Frontend components and styles.
    - **`payload/`**: Payload CMS admin and API routes.
    - **`my-route/`**: Custom route implementation.
  - **`collections/`**: Payload CMS collections (e.g., `Media.ts`, `Users.ts`, `VacationRequests.ts`).
  - **`migrations/`**: Database migration files.

## Key Scripts
The `package.json` file defines the following scripts:

- **`dev`**: Start the development server.
- **`devsafe`**: Clean the `.next` directory and start the development server.
- **`build`**: Build the project for production.
- **`start`**: Start the production server.
- **`lint`**: Run ESLint for code linting.
- **`generate:importmap`**: Generate the import map for Payload CMS.
- **`generate:types`**: Generate TypeScript types for Payload CMS.
- **`payload`**: Run Payload CMS commands.

## Dependencies
### Production Dependencies
- `@payloadcms/next`: Payload CMS integration with Next.js.
- `@payloadcms/payload-cloud`: Payload CMS cloud utilities.
- `@payloadcms/richtext-lexical`: Rich text editor for Payload CMS.
- `@payloadcms/db-vercel-postgres`: Vercel Postgres database adapter.
- `graphql`: GraphQL support.
- `next`: Next.js framework.
- `payload`: Payload CMS.
- `react` and `react-dom`: React library.
- `sharp`: Image processing library.

### Development Dependencies
- `@eslint/eslintrc`: ESLint configuration utilities.
- `@types/node`: TypeScript types for Node.js.
- `@types/react` and `@types/react-dom`: TypeScript types for React.
- `eslint` and `eslint-config-next`: ESLint and Next.js-specific linting rules.
- `prettier`: Code formatting tool.
- `typescript`: TypeScript language support.

## Notes
- The project uses Node.js version `^18.20.2` or `>=20.9.0`.
- The `pnpm` package manager is recommended (v9 or higher).
- The `sharp` library is marked as a built dependency in `pnpm` configuration.

## Future Changes
This document can be used as a reference for making changes to the project, such as updating dependencies, modifying configurations, or adding new features.

## Deployment
The project is deployed to **Vercel**, leveraging its seamless integration with Next.js for hosting and serverless functions.
