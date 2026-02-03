# Next.js Demo Project

A simple Next.js application demonstrating list and detail pages with API integration using Axios.

## Features

- ✅ Next.js 15+ with App Router
- ✅ TypeScript for type safety
- ✅ Axios for API calls
- ✅ Server-side data fetching
- ✅ Dynamic routing for detail pages
- ✅ Clean, beginner-friendly code

## Project Structure

```
Next-radio-liff/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page (landing)
│   ├── list/
│   │   └── page.tsx        # List page (all posts)
│   └── detail/
│       └── [id]/
│           └── page.tsx    # Detail page (single post)
├── lib/
│   ├── axios.ts            # Axios instance configuration
│   └── api.ts              # API functions
├── types/
│   └── item.ts             # TypeScript interfaces
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Pages

- **Home (`/`)**: Landing page with link to posts list
- **List (`/list`)**: Displays all posts from JSONPlaceholder API
- **Detail (`/detail/[id]`)**: Shows individual post details

## API

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock API:

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post by ID

## Key Concepts

### Server Components

All pages use React Server Components for optimal performance:
- Data fetching happens on the server
- No client-side JavaScript needed for data loading
- Automatic request deduplication

### Dynamic Routes

The detail page uses Next.js dynamic routes:
- `[id]` folder creates a dynamic route parameter
- Access via `params.id` in the component

### Axios Configuration

- Centralized axios instance in `lib/axios.ts`
- Base URL configured once
- Easy to add interceptors or authentication

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)
# Netko-radio-liff
