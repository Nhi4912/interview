# Comprehensive Testing Guide: Frontend Interview Preparation

## Overview

Testing is crucial for frontend development at Big Tech companies. This guide covers unit testing, integration testing, E2E testing, and advanced testing patterns with practical examples.

## 🎯 Testing Pyramid

### Unit Tests (70%)
- Component testing
- Function testing
- Hook testing
- Utility testing

### Integration Tests (20%)
- API integration
- Component integration
- State management integration
- Third-party service integration

### E2E Tests (10%)
- User journey testing
- Cross-browser testing
- Performance testing
- Accessibility testing

## 🔧 Unit Testing with Jest and React Testing Library

### Basic Component Testing

```typescript
// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'primary',
  children,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${loading ? 'loading' : ''}`}
      data-testid="button"
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state correctly', () => {
    render(<Button onClick={() => {}} loading>Click me</Button>);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant class', () => {
    render(<Button onClick={() => {}} variant="secondary">Click me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Advanced Component Testing

```typescript
// SearchInput.tsx
import React, { useState, useEffect, useCallback } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  initialValue?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  useEffect(() => {
    if (debouncedQuery !== initialValue) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, initialValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <div className="search-input">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid="search-input"
      />
      {query && (
        <button
          onClick={handleClear}
          className="clear-button"
          data-testid="clear-button"
        >
          Clear
        </button>
      )}
    </div>
  );
};

// SearchInput.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

// Mock timers
jest.useFakeTimers();

describe('SearchInput Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders with initial value', () => {
    render(<SearchInput onSearch={() => {}} initialValue="test" />);
    
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('calls onSearch with debounced value', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<SearchInput onSearch={handleSearch} debounceMs={300} />);
    
    const input = screen.getByTestId('search-input');
    await user.type(input, 'test query');
    
    // Should not call immediately
    expect(handleSearch).not.toHaveBeenCalled();
    
    // Fast forward time
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });
  });

  it('cancels previous debounce on new input', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<SearchInput onSearch={handleSearch} debounceMs={300} />);
    
    const input = screen.getByTestId('search-input');
    
    // Type first query
    await user.type(input, 'first');
    jest.advanceTimersByTime(100);
    
    // Type second query before debounce completes
    await user.type(input, ' second');
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledWith('first second');
    });
  });

  it('shows clear button when there is text', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<SearchInput onSearch={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    
    // Clear button should not be visible initially
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
    
    await user.type(input, 'test');
    
    // Clear button should be visible now
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<SearchInput onSearch={() => {}} />);
    
    const input = screen.getByTestId('search-input');
    
    await user.type(input, 'test');
    
    const clearButton = screen.getByTestId('clear-button');
    await user.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
  });
});
```

### Custom Hook Testing

```typescript
// useLocalStorage.ts
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage:', error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('returns stored value when localStorage has data', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('sets value in localStorage and state', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
  });

  it('removes value from localStorage and resets to initial', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[2]();
    });
    
    expect(result.current[0]).toBe('default');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('handles JSON parse errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error reading localStorage:',
      expect.any(SyntaxError)
    );
    
    consoleSpy.mockRestore();
  });
});
```

### Testing Async Operations

```typescript
// useAsync.ts
import { useState, useCallback, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & { execute: () => Promise<void>; reset: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

// useAsync.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync Hook', () => {
  it('sets loading to true initially when immediate is true', () => {
    const asyncFn = jest.fn().mockResolvedValue('test-data');
    
    const { result } = renderHook(() => useAsync(asyncFn, true));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('sets data when async function resolves', async () => {
    const asyncFn = jest.fn().mockResolvedValue('test-data');
    
    const { result } = renderHook(() => useAsync(asyncFn, true));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe('test-data');
      expect(result.current.error).toBe(null);
    });
  });

  it('sets error when async function rejects', async () => {
    const error = new Error('Test error');
    const asyncFn = jest.fn().mockRejectedValue(error);
    
    const { result } = renderHook(() => useAsync(asyncFn, true));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(error);
    });
  });

  it('does not execute immediately when immediate is false', () => {
    const asyncFn = jest.fn().mockResolvedValue('test-data');
    
    const { result } = renderHook(() => useAsync(asyncFn, false));
    
    expect(result.current.loading).toBe(false);
    expect(asyncFn).not.toHaveBeenCalled();
  });

  it('executes when execute is called manually', async () => {
    const asyncFn = jest.fn().mockResolvedValue('test-data');
    
    const { result } = renderHook(() => useAsync(asyncFn, false));
    
    act(() => {
      result.current.execute();
    });
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe('test-data');
    });
  });

  it('resets state when reset is called', async () => {
    const asyncFn = jest.fn().mockResolvedValue('test-data');
    
    const { result } = renderHook(() => useAsync(asyncFn, true));
    
    await waitFor(() => {
      expect(result.current.data).toBe('test-data');
    });
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
```

## 🔗 Integration Testing

### API Integration Testing

```typescript
// apiClient.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    return response.json();
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// UserComponent.tsx
import React from 'react';
import { useAsync } from './useAsync';
import { ApiClient } from './apiClient';

interface UserComponentProps {
  userId: string;
  apiClient: ApiClient;
}

export const UserComponent: React.FC<UserComponentProps> = ({ userId, apiClient }) => {
  const { data: user, loading, error } = useAsync(() => apiClient.getUser(userId));

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error.message}</div>;
  if (!user) return <div data-testid="no-user">No user found</div>;

  return (
    <div data-testid="user-info">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// UserComponent.integration.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserComponent } from './UserComponent';
import { ApiClient } from './apiClient';

const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    
    if (id === '1') {
      return res(
        ctx.json({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        })
      );
    }
    
    return res(ctx.status(404));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserComponent Integration Tests', () => {
  const apiClient = new ApiClient('/api');

  it('displays user information when API call succeeds', async () => {
    render(<UserComponent userId="1" apiClient={apiClient} />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByTestId('user-info')).toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('displays error when API call fails', async () => {
    render(<UserComponent userId="999" apiClient={apiClient} />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Failed to fetch user/)).toBeInTheDocument();
  });

  it('handles network errors gracefully', async () => {
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );
    
    render(<UserComponent userId="1" apiClient={apiClient} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});
```

### State Management Integration Testing

```typescript
// store.ts
import { create } from 'zustand';
import { ApiClient } from './apiClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  addUser: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      
      const newUser = await response.json();
      set(state => ({ 
        users: [...state.users, newUser], 
        loading: false 
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));

// UserList.tsx
import React, { useEffect } from 'react';
import { useUserStore } from './store';

export const UserList: React.FC = () => {
  const { users, loading, error, fetchUsers, clearError } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div data-testid="loading">Loading users...</div>;
  if (error) {
    return (
      <div data-testid="error">
        Error: {error}
        <button onClick={clearError}>Clear Error</button>
      </div>
    );
  }

  return (
    <div data-testid="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} data-testid={`user-${user.id}`}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// UserList.integration.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserList } from './UserList';
import { useUserStore } from './store';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  // Reset Zustand store
  useUserStore.setState({
    users: [],
    loading: false,
    error: null,
  });
});
afterAll(() => server.close());

describe('UserList Integration Tests', () => {
  it('fetches and displays users on mount', async () => {
    render(<UserList />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('user-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-2')).toBeInTheDocument();
    expect(screen.getByText('John Doe - john@example.com')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Failed to fetch users/)).toBeInTheDocument();
  });

  it('clears error when clear button is clicked', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    const user = userEvent.setup();
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Clear Error'));
    
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});
```

## 🌐 End-to-End Testing with Playwright

### Basic E2E Tests

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  });

  test('invalid credentials show error message', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });

  test('form validation works correctly', async ({ page }) => {
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
  });

  test('remember me checkbox persists login', async ({ page, context }) => {
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.check('[data-testid="remember-me"]');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    
    // Close and reopen browser
    await page.close();
    const newPage = await context.newPage();
    await newPage.goto('/');
    
    // Should still be logged in
    await expect(newPage).toHaveURL('/dashboard');
  });
});
```

### Advanced E2E Testing

```typescript
// e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'admin123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to users page
    await page.click('[data-testid="users-nav"]');
    await expect(page).toHaveURL('/users');
  });

  test('can create a new user', async ({ page }) => {
    await page.click('[data-testid="add-user-button"]');
    
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();
    
    await page.fill('[data-testid="user-name-input"]', 'John Doe');
    await page.fill('[data-testid="user-email-input"]', 'john@example.com');
    await page.selectOption('[data-testid="user-role-select"]', 'user');
    
    await page.click('[data-testid="save-user-button"]');
    
    await expect(page.locator('[data-testid="user-modal"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    
    // Check if user appears in the list
    await expect(page.locator('[data-testid="user-john@example.com"]')).toBeVisible();
  });

  test('can edit existing user', async ({ page }) => {
    // Find first user in the list
    const firstUser = page.locator('[data-testid^="user-"]').first();
    await firstUser.locator('[data-testid="edit-user-button"]').click();
    
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();
    
    // Change the name
    await page.fill('[data-testid="user-name-input"]', 'Updated Name');
    await page.click('[data-testid="save-user-button"]');
    
    await expect(page.locator('[data-testid="user-modal"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('can delete user with confirmation', async ({ page }) => {
    const firstUser = page.locator('[data-testid^="user-"]').first();
    const userEmail = await firstUser.getAttribute('data-testid');
    
    await firstUser.locator('[data-testid="delete-user-button"]').click();
    
    await expect(page.locator('[data-testid="confirmation-modal"]')).toBeVisible();
    await page.click('[data-testid="confirm-delete-button"]');
    
    await expect(page.locator('[data-testid="confirmation-modal"]')).not.toBeVisible();
    await expect(page.locator(`[data-testid="${userEmail}"]`)).not.toBeVisible();
  });

  test('search functionality works correctly', async ({ page }) => {
    await page.fill('[data-testid="search-input"]', 'john');
    
    // Wait for search to complete
    await page.waitForTimeout(500);
    
    // Only users with 'john' in name or email should be visible
    const visibleUsers = page.locator('[data-testid^="user-"]:visible');
    await expect(visibleUsers).toHaveCount(1);
  });

  test('pagination works correctly', async ({ page }) => {
    // Assume there are multiple pages of users
    const nextButton = page.locator('[data-testid="next-page-button"]');
    
    if (await nextButton.isVisible()) {
      await nextButton.click();
      
      await expect(page.locator('[data-testid="page-indicator"]')).toContainText('Page 2');
      
      // Go back to first page
      await page.click('[data-testid="prev-page-button"]');
      await expect(page.locator('[data-testid="page-indicator"]')).toContainText('Page 1');
    }
  });
});
```

### Performance Testing with Playwright

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('page load performance is acceptable', async ({ page }) => {
    const start = Date.now();
    
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - start;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics = {};
          
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.lcp = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              metrics.fid = entry.processingStart - entry.startTime;
            }
          });
          
          resolve(metrics);
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        
        // Simulate user interaction for FID
        document.body.click();
        
        setTimeout(() => resolve(metrics), 5000);
      });
    });
    
    // LCP should be less than 2.5 seconds
    expect(metrics.lcp).toBeLessThan(2500);
  });

  test('virtual scrolling performance', async ({ page }) => {
    await page.goto('/large-list');
    
    // Measure initial render time
    const start = performance.now();
    await page.waitForSelector('[data-testid="virtual-list"]');
    const initialRender = performance.now() - start;
    
    expect(initialRender).toBeLessThan(100);
    
    // Measure scroll performance
    const scrollStart = performance.now();
    
    await page.evaluate(() => {
      const list = document.querySelector('[data-testid="virtual-list"]');
      list.scrollTop = 5000;
    });
    
    await page.waitForTimeout(16); // Wait for next frame
    const scrollTime = performance.now() - scrollStart;
    
    expect(scrollTime).toBeLessThan(16); // Should be within one frame
  });
});
```

## 🔧 Test Utilities and Helpers

### Custom Testing Utilities

```typescript
// test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';

// Custom render function with providers
function customRender(
  ui: React.ReactElement,
  options: RenderOptions & {
    queryClient?: QueryClient;
    initialRoute?: string;
  } = {}
) {
  const { queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  }), initialRoute = '/', ...renderOptions } = options;

  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock functions
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
};

export const mockApiResponse = <T>(data: T, delay = 0) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const mockApiError = (message: string, delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
};

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: Math.random().toString(36),
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createMockUsers = (count = 3) => {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: index.toString(),
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    })
  );
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
```

### Performance Testing Utilities

```typescript
// performance-utils.ts
export function measureRenderTime(
  renderFunction: () => void,
  iterations = 100
): number {
  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    renderFunction();
    const end = performance.now();
    times.push(end - start);
  }
  
  return times.reduce((sum, time) => sum + time, 0) / times.length;
}

export function measureMemoryUsage(
  testFunction: () => void
): { before: number; after: number; diff: number } {
  const getMemoryUsage = () => {
    if (performance.memory) {
      return performance.memory.usedJSHeapSize;
    }
    return 0;
  };
  
  const before = getMemoryUsage();
  testFunction();
  const after = getMemoryUsage();
  
  return {
    before,
    after,
    diff: after - before,
  };
}

export function expectNoMemoryLeaks(
  testFunction: () => void,
  threshold = 1024 * 1024 // 1MB
): void {
  const { diff } = measureMemoryUsage(testFunction);
  
  if (diff > threshold) {
    throw new Error(`Memory leak detected: ${diff} bytes increase`);
  }
}
```

## 🎯 Testing Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
describe('Component', () => {
  it('should do something', () => {
    // Arrange
    const props = { value: 'test' };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

### 2. Testing User Interactions

```typescript
it('handles user interactions correctly', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await user.click(screen.getByRole('button'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 3. Testing Accessibility

```typescript
it('is accessible', async () => {
  const { container } = render(<MyComponent />);
  
  // Check for accessibility violations
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  
  // Check for proper ARIA attributes
  expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Save');
});
```

### 4. Testing Error Boundaries

```typescript
it('catches and displays errors', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

This comprehensive testing guide covers all aspects of frontend testing essential for Big Tech interviews. It demonstrates proficiency in unit testing, integration testing, E2E testing, and performance testing - all crucial skills for senior frontend engineers.