# Product Management App

A modern, responsive **Next.js** application for managing products. Users can browse, search, create, edit, view details, and delete products. The app emphasizes polished UI/UX, client-side validation, and clean code architecture.

---

## Demo

- **Live demo:** [Product Management App](https://product-management-app-meraj.vercel.app/)

---

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Library:** React
- **State Management:** Redux Toolkit, React Redux, Redux Persist
- **Styling & UI Components:** Tailwind CSS, shadcn/ui
- **Data Fetching / API:** Axios, React Query
- **Notifications:** React Toastify
- **Icons:** Lucide React
- **Utilities:** clsx, class-variance-authority, tailwind-merge

---

## Features

### Authentication

- Login with email via `POST /auth` to receive JWT
- JWT stored in Redux Toolkit and sent with API requests
- Logout functionality

### Products

- List products with **pagination**
- **Real-time search** by product name
- **Delete product** with confirmation dialog
- Cache data with updates after create/edit/delete

### Create & Edit Products

- Unified form for **create and edit** flows
- Form fields:
  - Name (required, min length 3)
  - Description (required, min length 10)
  - Price (required, number > 0)
  - Category (required)
  - Image URL (required, valid URL)
- Inline **validation messages** and error handling

### Product Details

- Full product info display
- Actions: **Edit**, **Delete**

### UX / UI

- Modern, visually consistent design
- Responsive layout for mobile and desktop
- Loading & error states for network operations
- Smooth user flows for CRUD operations

---

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shamsad-alam-meraj/product-management-app.git
cd product-management-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```
