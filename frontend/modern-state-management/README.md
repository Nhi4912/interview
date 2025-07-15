# Modern State Management: Complete Interview Guide

## Overview

State management has evolved significantly in 2025. While Redux remains important, modern solutions like Zustand, Jotai, and TanStack Query have gained prominence. This guide covers the essential patterns and tools for Big Tech interviews.

## 🏪 Modern State Management Landscape

### State Management Categories

1. **Client State**: UI state, form data, navigation state
2. **Server State**: API data, cached responses, optimistic updates
3. **Global State**: User authentication, theme, app configuration
4. **Local State**: Component-specific state, temporary data

### Tool Selection Matrix

| Tool | Use Case | Complexity | Bundle Size | Learning Curve |
|------|----------|------------|-------------|----------------|
| useState/useReducer | Local state | Low | 0KB | Easy |
| Context API | Global state | Medium | 0KB | Medium |
| Zustand | Global state | Low | 2KB | Easy |
| Jotai | Atomic state | Medium | 5KB | Medium |
| Redux Toolkit | Complex state | High | 10KB | Hard |
| TanStack Query | Server state | Medium | 15KB | Medium |

## 🐻 Zustand: Simple State Management

### Basic Usage

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Basic store
interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const user = await authAPI.login(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null });
    // Clear other stores if needed
    useCartStore.getState().clearCart();
  },
  
  updateProfile: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updates } });
    }
  },
}));

// Usage in components
function UserProfile() {
  const { user, isLoading, error, updateProfile } = useUserStore();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please login</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => updateProfile({ name: 'New Name' })}>
        Update Name
      </button>
    </div>
  );
}
```

### Advanced Zustand Patterns

```typescript
// Store with actions as methods
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}));

// Store with computed values
interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  // Computed values
  filteredTodos: () => Todo[];
  completedCount: () => number;
  activeCount: () => number;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (text) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  
  setFilter: (filter) => set({ filter }),
  
  // Computed values as functions
  filteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  },
  
  completedCount: () => get().todos.filter(todo => todo.completed).length,
  activeCount: () => get().todos.filter(todo => !todo.completed).length,
}));

// Usage with computed values
function TodoList() {
  const { filteredTodos, completedCount, activeCount } = useTodoStore();
  
  return (
    <div>
      <div>Active: {activeCount()}, Completed: {completedCount()}</div>
      {filteredTodos().map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

### Zustand with Middleware

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Persist middleware
interface SettingsStore {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  updateTheme: (theme: 'light' | 'dark') => void;
  updateLanguage: (language: string) => void;
  updateNotifications: (notifications: Partial<{ email: boolean; push: boolean }>) => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    immer((set) => ({
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: false,
      },
      
      updateTheme: (theme) => set((state) => {
        state.theme = theme;
      }),
      
      updateLanguage: (language) => set((state) => {
        state.language = language;
      }),
      
      updateNotifications: (notifications) => set((state) => {
        Object.assign(state.notifications, notifications);
      }),
    })),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// DevTools middleware
const useDevStore = create<DevStore>()(
  devtools(
    (set, get) => ({
      // Store implementation
    }),
    {
      name: 'dev-store',
    }
  )
);

// Custom middleware
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('Previous state:', get());
      set(...args);
      console.log('New state:', get());
    },
    get,
    api
  );

const useLoggedStore = create<LoggedStore>()(
  logger((set, get) => ({
    // Store implementation
  }))
);
```

## ⚛️ Jotai: Atomic State Management

### Atoms and Derived State

```typescript
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Primitive atoms
const countAtom = atom(0);
const nameAtom = atom('John');
const isLoadingAtom = atom(false);

// Derived atoms
const doubleCountAtom = atom((get) => get(countAtom) * 2);
const uppercaseNameAtom = atom((get) => get(nameAtom).toUpperCase());

// Write-only atoms
const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});

const decrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) - 1);
});

// Async atoms
const userAtom = atom(null);
const userProfileAtom = atom(
  async (get) => {
    const user = get(userAtom);
    if (!user) return null;
    
    const response = await fetch(`/api/users/${user.id}/profile`);
    return response.json();
  }
);

// Usage in components
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const increment = useSetAtom(incrementAtom);
  const decrement = useSetAtom(decrementAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Complex Jotai Patterns

```typescript
// Atom families for dynamic state
import { atomFamily } from 'jotai/utils';

const todoAtomFamily = atomFamily((id: string) =>
  atom({
    id,
    text: '',
    completed: false,
  })
);

const todoIdsAtom = atom<string[]>([]);

// Derived atom for all todos
const allTodosAtom = atom((get) => {
  const ids = get(todoIdsAtom);
  return ids.map((id) => get(todoAtomFamily(id)));
});

// Actions
const addTodoAtom = atom(null, (get, set, text: string) => {
  const id = crypto.randomUUID();
  const newTodo = { id, text, completed: false };
  
  set(todoAtomFamily(id), newTodo);
  set(todoIdsAtom, [...get(todoIdsAtom), id]);
});

const removeTodoAtom = atom(null, (get, set, id: string) => {
  set(todoIdsAtom, get(todoIdsAtom).filter((todoId) => todoId !== id));
  // Note: todoAtomFamily(id) will be garbage collected
});

// Async operations with loading states
const postsAtom = atom<Post[]>([]);
const postsLoadingAtom = atom(false);
const postsErrorAtom = atom<string | null>(null);

const fetchPostsAtom = atom(null, async (get, set) => {
  set(postsLoadingAtom, true);
  set(postsErrorAtom, null);
  
  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    set(postsAtom, posts);
  } catch (error) {
    set(postsErrorAtom, error.message);
  } finally {
    set(postsLoadingAtom, false);
  }
});

// Usage
function PostList() {
  const posts = useAtomValue(postsAtom);
  const isLoading = useAtomValue(postsLoadingAtom);
  const error = useAtomValue(postsErrorAtom);
  const fetchPosts = useSetAtom(fetchPostsAtom);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## 🔄 TanStack Query: Server State Management

### Basic Queries and Mutations

```typescript
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  QueryClient,
  QueryClientProvider 
} from '@tanstack/react-query';

// Query client setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// API functions
const api = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch('/api/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },
  
  getPost: async (id: string): Promise<Post> => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },
  
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },
  
  updatePost: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },
  
  deletePost: async (id: string): Promise<void> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },
};

// Query hooks
function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
    staleTime: 5 * 60 * 1000,
  });
}

function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => api.getPost(id),
    enabled: !!id,
  });
}

// Mutation hooks
function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Optimistically update cache
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return [newPost];
        return [...old, newPost];
      });
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
}

function useUpdatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
      api.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Update specific post in cache
      queryClient.setQueryData(['posts', updatedPost.id], updatedPost);
      
      // Update posts list
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return [updatedPost];
        return old.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    },
  });
}

function useDeletePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deletePost,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ['posts', deletedId] });
      
      // Update posts list
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return [];
        return old.filter(post => post.id !== deletedId);
      });
    },
  });
}
```

### Advanced TanStack Query Patterns

```typescript
// Infinite queries for pagination
function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => 
      api.getPosts({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Dependent queries
function useUserPosts(userId: string) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
  });
  
  return useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: () => api.getUserPosts(userId),
    enabled: !!user,
  });
}

// Optimistic updates
function useOptimisticUpdatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
      api.updatePost(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts', id] });
      
      // Snapshot previous value
      const previousPost = queryClient.getQueryData(['posts', id]);
      
      // Optimistically update
      queryClient.setQueryData(['posts', id], (old: Post | undefined) => {
        if (!old) return undefined;
        return { ...old, ...data };
      });
      
      return { previousPost };
    },
    onError: (error, { id }, context) => {
      // Revert optimistic update
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', id], context.previousPost);
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
    },
  });
}

// Background sync
function useBackgroundSync() {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
        stale: true,
      });
    }, 30000); // Refetch every 30 seconds
    
    return () => clearInterval(interval);
  }, [queryClient]);
}

// Prefetching
function usePrefetchPost() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['posts', id],
      queryFn: () => api.getPost(id),
      staleTime: 10 * 60 * 1000,
    });
  };
}

// Usage in components
function PostList() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfinitePosts();
  const prefetchPost = usePrefetchPost();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.posts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => prefetchPost(post.id)}
            >
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          Load More
        </button>
      )}
    </div>
  );
}
```

## 🔄 Redux Toolkit: Modern Redux

### Modern Redux with RTK

```typescript
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { setCurrentPost, clearCurrentPost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;

// Store configuration
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    // other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage in components
function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(state => state.posts);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### RTK Query for API State

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API slice
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<Post, CreatePostData>({
      query: (data) => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { id: string; data: UpdatePostData }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;

// Usage
function PostList() {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  
  return (
    <div>
      <button onClick={() => createPost({ title: 'New Post', content: 'Content' })}>
        Create Post
      </button>
      {posts?.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## 🔥 Common Interview Questions

### Q1: When would you choose Zustand over Redux?

**Answer:**
Choose Zustand when you need:
- Simple global state management
- Minimal boilerplate
- TypeScript-first approach
- Small bundle size
- Easy learning curve

Choose Redux when you need:
- Complex state logic
- Time-travel debugging
- Predictable state updates
- Large team collaboration
- Extensive ecosystem

**Example:**
```typescript
// Zustand - Simple and direct
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Redux - More structured
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});
```

### Q2: How do you handle optimistic updates?

**Answer:**
Optimistic updates improve UX by immediately updating the UI before server confirmation:

```typescript
// With TanStack Query
function useOptimisticLike() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => api.likePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });
      
      const previousPost = queryClient.getQueryData(['posts', postId]);
      
      queryClient.setQueryData(['posts', postId], (old: Post | undefined) => {
        if (!old) return undefined;
        return { ...old, likes: old.likes + 1, isLiked: true };
      });
      
      return { previousPost };
    },
    onError: (error, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', postId], context.previousPost);
      }
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });
}

// With Zustand
const usePostStore = create((set, get) => ({
  posts: [],
  likePost: async (postId: string) => {
    // Optimistic update
    set((state) => ({
      posts: state.posts.map(post =>
        post.id === postId 
          ? { ...post, likes: post.likes + 1, isLiked: true }
          : post
      )
    }));
    
    try {
      await api.likePost(postId);
    } catch (error) {
      // Revert on error
      set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId 
            ? { ...post, likes: post.likes - 1, isLiked: false }
            : post
        )
      }));
    }
  },
}));
```

### Q3: How do you handle complex derived state?

**Answer:**
Use different approaches based on your state management choice:

```typescript
// With Jotai atoms
const postsAtom = atom<Post[]>([]);
const filterAtom = atom('all');
const searchAtom = atom('');

const filteredPostsAtom = atom((get) => {
  const posts = get(postsAtom);
  const filter = get(filterAtom);
  const search = get(searchAtom);
  
  return posts
    .filter(post => {
      if (filter === 'published') return post.published;
      if (filter === 'draft') return !post.published;
      return true;
    })
    .filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase())
    );
});

// With Zustand and computed values
const usePostStore = create((set, get) => ({
  posts: [],
  filter: 'all',
  search: '',
  
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
  
  getFilteredPosts: () => {
    const { posts, filter, search } = get();
    return posts
      .filter(post => {
        if (filter === 'published') return post.published;
        if (filter === 'draft') return !post.published;
        return true;
      })
      .filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );
  },
}));

// With Redux selectors
const selectPosts = (state: RootState) => state.posts.posts;
const selectFilter = (state: RootState) => state.posts.filter;
const selectSearch = (state: RootState) => state.posts.search;

const selectFilteredPosts = createSelector(
  [selectPosts, selectFilter, selectSearch],
  (posts, filter, search) => {
    return posts
      .filter(post => {
        if (filter === 'published') return post.published;
        if (filter === 'draft') return !post.published;
        return true;
      })
      .filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );
  }
);
```

### Q4: How do you handle error boundaries with async state?

**Answer:**
Implement proper error handling across different layers:

```typescript
// Error boundary component
class AsyncErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Async error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <this.props.fallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}

// Error handling in state management
const useAsyncStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,
  
  fetchData: async () => {
    set({ loading: true, error: null });
    
    try {
      const data = await api.fetchData();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      // Optionally throw to trigger error boundary
      throw error;
    }
  },
  
  resetError: () => set({ error: null }),
}));

// Usage with error boundary
function App() {
  return (
    <AsyncErrorBoundary fallback={ErrorFallback}>
      <DataComponent />
    </AsyncErrorBoundary>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={() => window.location.reload()}>
        Reload page
      </button>
    </div>
  );
}
```

### Q5: How do you implement offline support in state management?

**Answer:**
Implement offline support with local storage and sync mechanisms:

```typescript
// Offline-aware store
const useOfflineStore = create(
  persist(
    (set, get) => ({
      data: [],
      pendingActions: [],
      isOnline: navigator.onLine,
      
      addItem: (item) => {
        if (get().isOnline) {
          // Online: send to server immediately
          api.createItem(item)
            .then(() => {
              set((state) => ({ data: [...state.data, item] }));
            })
            .catch(() => {
              // Add to pending actions on failure
              set((state) => ({
                pendingActions: [...state.pendingActions, { type: 'CREATE', item }]
              }));
            });
        } else {
          // Offline: add to pending actions
          set((state) => ({
            data: [...state.data, item],
            pendingActions: [...state.pendingActions, { type: 'CREATE', item }]
          }));
        }
      },
      
      syncPendingActions: async () => {
        const { pendingActions } = get();
        
        for (const action of pendingActions) {
          try {
            switch (action.type) {
              case 'CREATE':
                await api.createItem(action.item);
                break;
              case 'UPDATE':
                await api.updateItem(action.item.id, action.item);
                break;
              case 'DELETE':
                await api.deleteItem(action.item.id);
                break;
            }
          } catch (error) {
            console.error('Failed to sync action:', action, error);
          }
        }
        
        set({ pendingActions: [] });
      },
      
      setOnlineStatus: (isOnline) => {
        set({ isOnline });
        if (isOnline) {
          get().syncPendingActions();
        }
      },
    }),
    {
      name: 'offline-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Hook to handle online/offline status
function useOnlineStatus() {
  const setOnlineStatus = useOfflineStore((state) => state.setOnlineStatus);
  
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);
}
```

This comprehensive guide covers modern state management approaches essential for Big Tech interviews in 2025. Understanding when to use each tool and pattern demonstrates senior-level architectural thinking.