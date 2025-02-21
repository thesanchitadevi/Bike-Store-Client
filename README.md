# Bike Store Client

A modern e-commerce frontend application for a bike store built with React, Redux, and TypeScript. This client provides a seamless user experience for browsing products, managing cart items, and handling checkouts.

## Features

- Browse and filter bikes by category/price
- Product details page with image gallery
- Shopping cart management (add/remove/update quantities)
- Responsive UI with mobile-first design
- Error handling with Sonner toast notifications
- Redux-based state management
- Type-safe codebase with TypeScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bike-store-client.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

src/
├── assets/ # Static assets (images, fonts)
├── components/ # Reusable components
│ ├── layout/ # App layout components (Nav, Footer etc)
│ └── ui/ # UI components (buttons, cards)
├── pages/ # Route-based page components
├── redux/
│ ├── api/ # API service definitions
│ ├── features/ # Redux feature slices
│ ├── hooks # Custom Redux hooks
│ └── store # Redux store configuration
├── routes/ # Application routing configuration
├── types/ # TypeScript type declarations
├── utils/ # Utility functions/helpers

### Available Scripts

`npm run dev`: Start development server

`npm run build`: Create production build

## Key Dependencies

- React + TypeScript

- Redux Toolkit
- React Router
- Sonner (Toast notifications)
- Tailwind CSS (or other styling solution)

## State Management

The application uses Redux Toolkit for state management with API service layers. Key Redux components:

`redux/store.ts`: Central Redux store

`redux/features/`: Contains cart/products slices

`redux/api/`: API service definitions

`redux/hooks.ts` Custom hooks for Redux interaction

## Conclusion

The Bike Store Client is a modern e-commerce frontend that delivers an intuitive shopping experience for bike enthusiasts. Built with React, Redux Toolkit, and TypeScript.
