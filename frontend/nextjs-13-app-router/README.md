# Next.js 13+ App Router: Complete Interview Guide

## Overview

Next.js 13 introduced the App Router, a complete paradigm shift from the Pages Router. This new routing system is built on React Server Components and provides powerful features for building modern web applications. Understanding the App Router is essential for Big Tech interviews in 2025.

## 🗂️ App Router Fundamentals

### File-based Routing Structure

```
app/
├── layout.js          # Root layout
├── page.js            # Home page
├── loading.js         # Loading UI
├── error.js           # Error UI
├── not-found.js       # 404 page
├── global-error.js    # Global error boundary
├── dashboard/
│   ├── layout.js      # Dashboard layout
│   ├── page.js        # Dashboard page
│   ├── settings/
│   │   └── page.js    # Dashboard settings
│   └── analytics/
│       ├── page.js    # Analytics overview
│       └── [id]/
│           └── page.js # Dynamic analytics page
├── blog/
│   ├── [...slug]/
│   │   └── page.js    # Catch-all routes
│   └── [id]/
│       ├── page.js    # Blog post
│       └── edit/
│           └── page.js # Edit post
└── api/
    ├── users/
    │   └── route.js   # API routes
    └── posts/
        └── [id]/
            └── route.js
```

### 1. Layouts and Templates

```javascript
// app/layout.js - Root Layout
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | MyApp',
    default: 'MyApp - Best App Ever'
  },
  description: 'A comprehensive web application',
  keywords: ['nextjs', 'react', 'app router'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  openGraph: {
    title: 'MyApp',
    description: 'A comprehensive web application',
    url: 'https://myapp.com',
    siteName: 'MyApp',
    images: [
      {
        url: 'https://myapp.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'MyApp'
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/blog">Blog</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 MyApp. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
```

```javascript
// app/dashboard/layout.js - Nested Layout
import { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />
      <div className="dashboard-content">
        <Suspense fallback={<div>Loading dashboard...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
```

### 2. Server and Client Components

```javascript
// app/page.js - Server Component
import { Suspense } from 'react';
import { getUserPosts, getRecommendations } from '@/lib/api';
import ClientCounter from './ClientCounter';
import PostList from './PostList';

// This is a Server Component by default
export default async function HomePage() {
  // Direct database/API calls
  const posts = await getUserPosts();
  const recommendations = await getRecommendations();
  
  return (
    <div>
      <h1>Welcome to MyApp</h1>
      
      {/* Server Component */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList posts={posts} />
      </Suspense>
      
      {/* Client Component */}
      <ClientCounter />
      
      {/* Server Component with async data */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <RecommendationList recommendations={recommendations} />
      </Suspense>
    </div>
  );
}

// Generate static metadata
export async function generateMetadata() {
  return {
    title: 'Home',
    description: 'Welcome to our amazing application'
  };
}
```

```javascript
// app/ClientCounter.js - Client Component
'use client';

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 3. Dynamic Routes and Params

```javascript
// app/blog/[slug]/page.js - Dynamic Route
import { notFound } from 'next/navigation';
import { getPost, getAllPosts } from '@/lib/api';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

```javascript
// app/blog/[...slug]/page.js - Catch-all Routes
export default function BlogCatchAll({ params }) {
  const { slug } = params;
  
  // slug is an array: /blog/2024/january/my-post
  // slug = ['2024', 'january', 'my-post']
  
  if (slug.length === 1) {
    return <CategoryPage category={slug[0]} />;
  }
  
  if (slug.length === 2) {
    return <YearCategoryPage year={slug[0]} category={slug[1]} />;
  }
  
  if (slug.length === 3) {
    return <BlogPost year={slug[0]} category={slug[1]} post={slug[2]} />;
  }
  
  return <div>Invalid blog URL</div>;
}
```

### 4. Loading and Error States

```javascript
// app/dashboard/loading.js - Loading UI
export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading dashboard...</p>
    </div>
  );
}
```

```javascript
// app/dashboard/error.js - Error UI
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
```

```javascript
// app/not-found.js - 404 Page
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
}
```

## 🚀 Advanced Features

### 1. Server Actions

```javascript
// app/posts/actions.js - Server Actions
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Validation
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  
  try {
    // Create post in database
    const post = await db.post.create({
      data: { title, content }
    });
    
    // Revalidate the posts page
    revalidatePath('/posts');
    
    // Redirect to new post
    redirect(`/posts/${post.id}`);
  } catch (error) {
    return { error: 'Failed to create post' };
  }
}

export async function updatePost(id, formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.post.update({
    where: { id },
    data: { title, content }
  });
  
  revalidatePath(`/posts/${id}`);
}

export async function deletePost(id) {
  await db.post.delete({
    where: { id }
  });
  
  revalidatePath('/posts');
  redirect('/posts');
}
```

```javascript
// app/posts/create/page.js - Using Server Actions
import { createPost } from '../actions';

export default function CreatePost() {
  return (
    <form action={createPost}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>
      
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required />
      </div>
      
      <button type="submit">Create Post</button>
    </form>
  );
}
```

### 2. Streaming and Suspense

```javascript
// app/dashboard/page.js - Streaming Components
import { Suspense } from 'react';
import UserStats from './UserStats';
import RecentActivity from './RecentActivity';
import Analytics from './Analytics';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Fast loading component */}
      <Suspense fallback={<UserStatsSkeleton />}>
        <UserStats />
      </Suspense>
      
      {/* Medium loading component */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
      
      {/* Slow loading component */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
    </div>
  );
}
```

```javascript
// app/dashboard/UserStats.js - Async Server Component
import { getUserStats } from '@/lib/api';

export default async function UserStats() {
  // This will stream when data is available
  const stats = await getUserStats();
  
  return (
    <div className="user-stats">
      <div className="stat">
        <h3>Total Posts</h3>
        <p>{stats.totalPosts}</p>
      </div>
      <div className="stat">
        <h3>Views</h3>
        <p>{stats.totalViews}</p>
      </div>
      <div className="stat">
        <h3>Followers</h3>
        <p>{stats.followers}</p>
      </div>
    </div>
  );
}
```

### 3. Route Handlers (API Routes)

```javascript
// app/api/posts/route.js - API Route
import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/api';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    
    const posts = await getPosts({
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const post = await createPost(body);
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

```javascript
// app/api/posts/[id]/route.js - Dynamic API Route
import { NextResponse } from 'next/server';
import { getPost, updatePost, deletePost } from '@/lib/api';

export async function GET(request, { params }) {
  try {
    const post = await getPost(params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const post = await updatePost(params.id, body);
    
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await deletePost(params.id);
    
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
```

### 4. Middleware

```javascript
// middleware.js - Root level middleware
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token || !await verifyAuth(token)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Redirect authenticated users from login page
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## 🎯 Caching and Performance

### 1. Data Caching Strategies

```javascript
// app/posts/page.js - Different caching strategies
import { unstable_cache } from 'next/cache';

// Cache with revalidation
const getCachedPosts = unstable_cache(
  async () => {
    const posts = await fetchPosts();
    return posts;
  },
  ['posts'],
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ['posts']
  }
);

// Static generation
export const revalidate = 3600; // Revalidate every hour

export default async function PostsPage() {
  const posts = await getCachedPosts();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### 2. Route Segment Config

```javascript
// app/dashboard/page.js - Route configuration
export const dynamic = 'force-dynamic'; // Always dynamic
export const revalidate = 0; // No caching
export const fetchCache = 'force-no-store'; // No fetch caching
export const runtime = 'edge'; // Edge runtime

export default async function Dashboard() {
  const data = await fetchDashboardData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### 3. Parallel and Sequential Data Fetching

```javascript
// app/user/[id]/page.js - Optimized data fetching
import { Suspense } from 'react';

async function getUserData(id) {
  // Parallel requests
  const [user, posts, followers] = await Promise.all([
    fetchUser(id),
    fetchUserPosts(id),
    fetchUserFollowers(id)
  ]);
  
  return { user, posts, followers };
}

export default async function UserProfile({ params }) {
  const { user, posts, followers } = await getUserData(params.id);
  
  return (
    <div>
      <header>
        <h1>{user.name}</h1>
        <p>{followers.length} followers</p>
      </header>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts posts={posts} />
      </Suspense>
    </div>
  );
}
```

## 🔥 Common Interview Questions

### Q1: What are the main differences between Pages Router and App Router?

**Answer:**
The App Router is a complete paradigm shift from Pages Router:

| Feature | Pages Router | App Router |
|---------|-------------|------------|
| File structure | `pages/` directory | `app/` directory |
| Routing | File-based | Folder-based |
| Layouts | Manual with `_app.js` | Built-in nested layouts |
| Data fetching | `getServerSideProps`, `getStaticProps` | Server Components, `fetch()` |
| Loading states | Manual | Built-in `loading.js` |
| Error handling | Manual | Built-in `error.js` |
| API routes | `pages/api/` | `app/api/` with route handlers |
| Metadata | Manual head tags | Built-in metadata API |
| Server Components | Not supported | First-class support |

**Example:**
```javascript
// Pages Router
// pages/posts/[id].js
export async function getServerSideProps({ params }) {
  const post = await fetchPost(params.id);
  return { props: { post } };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}

// App Router
// app/posts/[id]/page.js
export default async function Post({ params }) {
  const post = await fetchPost(params.id);
  return <div>{post.title}</div>;
}
```

### Q2: How do Server Actions work in Next.js 13?

**Answer:**
Server Actions allow you to run server-side code directly from client components without creating API routes.

**Key features:**
- Run on the server
- Can be called from forms or event handlers
- Automatic serialization and deserialization
- Built-in CSRF protection
- Progressive enhancement

**Example:**
```javascript
// Server Action
'use server';

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  const user = await db.user.create({
    data: { name, email }
  });
  
  revalidatePath('/users');
  return { success: true, user };
}

// Client Component
'use client';

import { createUser } from './actions';

export default function CreateUserForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit">Create User</button>
    </form>
  );
}
```

### Q3: How does caching work in the App Router?

**Answer:**
Next.js 13+ has multiple caching layers:

1. **Request Memoization**: Automatic deduplication of identical requests
2. **Data Cache**: Persistent cache for fetch requests
3. **Full Route Cache**: Cached rendered routes
4. **Router Cache**: Client-side route cache

**Example:**
```javascript
// Data caching with fetch
export default async function Posts() {
  // This request is cached by default
  const posts = await fetch('https://api.example.com/posts');
  
  // This request is not cached
  const realtime = await fetch('https://api.example.com/realtime', {
    cache: 'no-store'
  });
  
  // This request is cached for 1 hour
  const hourly = await fetch('https://api.example.com/hourly', {
    next: { revalidate: 3600 }
  });
  
  return <div>Posts content</div>;
}
```

### Q4: When should you use Server Components vs Client Components?

**Answer:**

**Use Server Components when:**
- Fetching data from APIs/databases
- Accessing backend resources
- Keeping sensitive information on server
- Reducing client-side bundle size

**Use Client Components when:**
- Using state and effects
- Handling user interactions
- Using browser APIs
- Using third-party libraries that need DOM

**Example:**
```javascript
// Server Component - Good for data fetching
export default async function ProductList() {
  const products = await fetchProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component - Good for interactivity
'use client';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
```

### Q5: How do you handle dynamic metadata in App Router?

**Answer:**
Use the `generateMetadata` function to create dynamic metadata based on route parameters.

**Example:**
```javascript
// app/posts/[id]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function Post({ params }) {
  const post = await fetchPost(params.id);
  return <article>{post.content}</article>;
}
```

## 🎯 Advanced Implementation Patterns

### 1. Parallel Routes and Intercepting Routes

```javascript
// app/@modal/(.)photo/[id]/page.js - Intercepting route
import Modal from '@/components/Modal';
import PhotoDetails from '@/components/PhotoDetails';

export default function PhotoModal({ params }) {
  return (
    <Modal>
      <PhotoDetails id={params.id} />
    </Modal>
  );
}

// app/@modal/default.js - Default parallel route
export default function Default() {
  return null;
}

// app/layout.js - Layout with parallel routes
export default function Layout({ children, modal }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
```

### 2. Route Groups and Private Folders

```javascript
// app/(auth)/login/page.js - Route group
export default function Login() {
  return <div>Login page</div>;
}

// app/(auth)/register/page.js
export default function Register() {
  return <div>Register page</div>;
}

// app/(auth)/layout.js - Shared layout for auth pages
export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-form">
        {children}
      </div>
    </div>
  );
}
```

### 3. Advanced Error Handling

```javascript
// app/global-error.js - Global error boundary
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong globally!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

// app/dashboard/error.js - Nested error boundary
'use client';

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Dashboard error:', error);
  }, [error]);
  
  return (
    <div>
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

This comprehensive guide covers the essential Next.js 13+ App Router features crucial for Big Tech interviews in 2025. The App Router represents a significant evolution in how we build Next.js applications, with Server Components, streaming, and enhanced developer experience at its core.