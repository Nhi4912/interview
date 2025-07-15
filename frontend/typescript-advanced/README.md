# Advanced TypeScript for Frontend: Complete Interview Guide

## Overview

Advanced TypeScript skills are essential for Big Tech interviews in 2025. This guide covers complex type manipulation, utility types, and patterns that distinguish senior frontend engineers from junior developers.

## 🎯 Advanced Type System Concepts

### 1. Generic Constraints and Conditional Types

```typescript
// Basic generic constraint
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // ✅ Works
logLength([1, 2, 3]); // ✅ Works
logLength({ length: 5, name: "test" }); // ✅ Works
// logLength(123); // ❌ Error: number doesn't have length

// Advanced conditional types
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>; // false

// Conditional type with inference
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElementType<string[]>; // string
type NumberArrayElement = ArrayElementType<number[]>; // number
type NotArrayElement = ArrayElementType<string>; // never
```

### 2. Mapped Types and Template Literal Types

```typescript
// Advanced mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Template literal types
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// Result: "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// Advanced template literal patterns
type EventName<T extends string> = `on${Capitalize<T>}`;

type ButtonEvents = EventName<"click" | "hover" | "focus">;
// Result: "onClick" | "onHover" | "onFocus"

// CSS property types
type CSSProperties = {
  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];
};

// CSS-in-JS with template literals
type CSSValue = string | number;
type CSSProperty = `--${string}`;

type CSSVariables = {
  [K in CSSProperty]: CSSValue;
};

const theme: CSSVariables = {
  "--primary-color": "#3498db",
  "--font-size": "16px",
  "--border-radius": 4,
};
```

### 3. Utility Types for React

```typescript
// Advanced component prop types
interface BaseButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

// Polymorphic button component
type PolymorphicButtonProps<E extends React.ElementType> = {
  as?: E;
} & BaseButtonProps & 
  Omit<React.ComponentPropsWithoutRef<E>, keyof BaseButtonProps>;

function Button<E extends React.ElementType = 'button'>({
  as,
  variant,
  size,
  disabled,
  loading,
  ...props
}: PolymorphicButtonProps<E>) {
  const Component = as || 'button';
  
  return (
    <Component
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      {...props}
    />
  );
}

// Usage with full type safety
<Button variant="primary" size="large" onClick={() => {}}>
  Click me
</Button>

<Button 
  as="a" 
  href="https://example.com" 
  variant="secondary" 
  size="medium"
>
  Link button
</Button>
```

### 4. Advanced React Hook Types

```typescript
// Generic hook with constraints
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Advanced async hook type
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

function useAsync<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  dependencies: Args
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction(...dependencies);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}

// Usage
const { data, loading, error, refetch } = useAsync(
  fetchUserData,
  [userId, includeProfile]
);
```

### 5. Type-Safe Form Handling

```typescript
// Form schema definition
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Field validation types
type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
};

type FormValidation<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// Type-safe form hook
function useForm<T extends Record<string, any>>(
  initialValues: T,
  validation?: FormValidation<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = <K extends keyof T>(
    name: K,
    value: T[K]
  ) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const validateField = (name: keyof T) => {
    const rule = validation?.[name];
    const value = values[name];
    
    if (!rule) return;

    let error: string | null = null;

    if (rule.required && (!value || value === '')) {
      error = `${String(name)} is required`;
    } else if (rule.minLength && String(value).length < rule.minLength) {
      error = `${String(name)} must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && String(value).length > rule.maxLength) {
      error = `${String(name)} must be at most ${rule.maxLength} characters`;
    } else if (rule.pattern && !rule.pattern.test(String(value))) {
      error = `${String(name)} format is invalid`;
    } else if (rule.custom) {
      error = rule.custom(value);
    }

    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    Object.keys(values).forEach(key => {
      const fieldName = key as keyof T;
      validateField(fieldName);
    });

    return Object.keys(errors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}

// Usage with full type safety
const LoginComponent = () => {
  const { values, errors, touched, handleChange, handleBlur, validate } = useForm<LoginForm>(
    { email: '', password: '', rememberMe: false },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      password: {
        required: true,
        minLength: 8,
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, submit data
      console.log('Form data:', values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {touched.email && errors.email && <span>{errors.email}</span>}
      
      <input
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
      />
      {touched.password && errors.password && <span>{errors.password}</span>}
      
      <input
        type="checkbox"
        checked={values.rememberMe}
        onChange={(e) => handleChange('rememberMe', e.target.checked)}
      />
      
      <button type="submit">Login</button>
    </form>
  );
};
```

## 🔧 Advanced Patterns

### 1. Branded Types and Nominal Typing

```typescript
// Branded types for type safety
type Brand<T, K> = T & { __brand: K };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type Email = Brand<string, 'Email'>;

// Constructor functions
const createUserId = (id: string): UserId => id as UserId;
const createOrderId = (id: string): OrderId => id as OrderId;
const createEmail = (email: string): Email => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email format');
  }
  return email as Email;
};

// Type-safe functions
function fetchUser(id: UserId): Promise<User> {
  // Implementation
}

function fetchOrder(id: OrderId): Promise<Order> {
  // Implementation
}

function sendEmail(to: Email, subject: string, body: string): Promise<void> {
  // Implementation
}

// Usage with compile-time safety
const userId = createUserId('user-123');
const orderId = createOrderId('order-456');
const email = createEmail('user@example.com');

fetchUser(userId); // ✅ Works
fetchOrder(orderId); // ✅ Works
sendEmail(email, 'Hello', 'World'); // ✅ Works

// fetchUser(orderId); // ❌ Type error!
// fetchOrder(userId); // ❌ Type error!
```

### 2. Builder Pattern with TypeScript

```typescript
// Type-safe builder pattern
interface QueryBuilder<T> {
  select: <K extends keyof T>(fields: K[]) => QueryBuilder<Pick<T, K>>;
  where: (condition: Partial<T>) => QueryBuilder<T>;
  orderBy: <K extends keyof T>(field: K, direction: 'asc' | 'desc') => QueryBuilder<T>;
  limit: (count: number) => QueryBuilder<T>;
  build: () => Query<T>;
}

interface Query<T> {
  fields?: (keyof T)[];
  conditions?: Partial<T>;
  order?: { field: keyof T; direction: 'asc' | 'desc' };
  limit?: number;
}

class TypeSafeQueryBuilder<T> implements QueryBuilder<T> {
  private query: Query<T> = {};

  select<K extends keyof T>(fields: K[]): QueryBuilder<Pick<T, K>> {
    this.query.fields = fields;
    return this as any;
  }

  where(condition: Partial<T>): QueryBuilder<T> {
    this.query.conditions = condition;
    return this;
  }

  orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc'): QueryBuilder<T> {
    this.query.order = { field, direction };
    return this;
  }

  limit(count: number): QueryBuilder<T> {
    this.query.limit = count;
    return this;
  }

  build(): Query<T> {
    return { ...this.query };
  }
}

// Usage with type safety
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const userQuery = new TypeSafeQueryBuilder<User>()
  .select(['id', 'name', 'email']) // Only these fields available in result
  .where({ age: 25 })
  .orderBy('name', 'asc')
  .limit(10)
  .build();

// userQuery is typed as Query<Pick<User, 'id' | 'name' | 'email'>>
```

### 3. Event System with TypeScript

```typescript
// Type-safe event system
type EventMap = {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string; duration: number };
  'order:created': { orderId: string; amount: number; userId: string };
  'order:cancelled': { orderId: string; reason: string };
};

type EventHandler<T> = (data: T) => void;

class TypeSafeEventEmitter {
  private listeners: {
    [K in keyof EventMap]?: EventHandler<EventMap[K]>[];
  } = {};

  on<K extends keyof EventMap>(
    event: K,
    handler: EventHandler<EventMap[K]>
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  off<K extends keyof EventMap>(
    event: K,
    handler: EventHandler<EventMap[K]>
  ): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event]!.filter(h => h !== handler);
    }
  }

  emit<K extends keyof EventMap>(
    event: K,
    data: EventMap[K]
  ): void {
    if (this.listeners[event]) {
      this.listeners[event]!.forEach(handler => handler(data));
    }
  }
}

// Usage with full type safety
const eventEmitter = new TypeSafeEventEmitter();

eventEmitter.on('user:login', (data) => {
  // data is typed as { userId: string; timestamp: Date }
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

eventEmitter.on('order:created', (data) => {
  // data is typed as { orderId: string; amount: number; userId: string }
  console.log(`Order ${data.orderId} created for $${data.amount}`);
});

// Type-safe emission
eventEmitter.emit('user:login', {
  userId: 'user-123',
  timestamp: new Date(),
});

// eventEmitter.emit('user:login', { userId: 'user-123' }); // ❌ Type error!
```

### 4. Type-Safe Redux with TypeScript

```typescript
// Action types
interface LoginAction {
  type: 'LOGIN';
  payload: { userId: string; token: string };
}

interface LogoutAction {
  type: 'LOGOUT';
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

type UserAction = LoginAction | LogoutAction | SetLoadingAction;

// State type
interface UserState {
  userId: string | null;
  token: string | null;
  loading: boolean;
}

// Action creators with type safety
const userActions = {
  login: (userId: string, token: string): LoginAction => ({
    type: 'LOGIN',
    payload: { userId, token },
  }),
  logout: (): LogoutAction => ({
    type: 'LOGOUT',
  }),
  setLoading: (loading: boolean): SetLoadingAction => ({
    type: 'SET_LOADING',
    payload: loading,
  }),
};

// Type-safe reducer
function userReducer(
  state: UserState = { userId: null, token: null, loading: false },
  action: UserAction
): UserState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        token: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

// Type-safe selector
type RootState = {
  user: UserState;
};

const selectUser = (state: RootState) => state.user;
const selectIsLoggedIn = (state: RootState) => state.user.userId !== null;
const selectIsLoading = (state: RootState) => state.user.loading;

// React hook with type safety
function useUser() {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const login = (userId: string, token: string) => {
    dispatch(userActions.login(userId, token));
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  const setLoading = (loading: boolean) => {
    dispatch(userActions.setLoading(loading));
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    setLoading,
  };
}
```

## 🔥 Common Interview Questions

### Q1: What's the difference between `type` and `interface` in TypeScript?

**Answer:**
Both `type` and `interface` can define object shapes, but they have different capabilities:

**Interfaces:**
- Can be extended and merged
- Better for object-oriented programming
- Can only define object shapes

**Types:**
- More flexible (unions, intersections, primitives)
- Cannot be reopened or merged
- Better for functional programming

**Examples:**
```typescript
// Interface extension
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Interface merging
interface Window {
  title: string;
}

interface Window {
  name: string;
}
// Window now has both title and name

// Type aliases are more flexible
type StringOrNumber = string | number;
type EventHandler<T> = (event: T) => void;

// Type intersections
type Dog = Animal & {
  breed: string;
};

// Conditional types (only possible with type)
type IsString<T> = T extends string ? true : false;
```

### Q2: How do you create a type-safe API client?

**Answer:**
Create a type-safe API client using generics and method overloads:

```typescript
// API response types
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// API client with type safety
class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T, U = any>(
    endpoint: string, 
    data: U
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async put<T, U = any>(
    endpoint: string, 
    data: U
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

// Usage with full type safety
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

const apiClient = new ApiClient('https://api.example.com');

// Type-safe API calls
const getUsersResponse = await apiClient.get<User[]>('/users');
const createUserResponse = await apiClient.post<User, CreateUserRequest>(
  '/users',
  { name: 'John', email: 'john@example.com' }
);
```

### Q3: How do you implement a type-safe state management solution?

**Answer:**
Here's a complete type-safe state management solution:

```typescript
// State definition
interface AppState {
  user: UserState;
  posts: PostState;
  ui: UIState;
}

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

// Action types
type Action = 
  | { type: 'USER_LOGIN_START' }
  | { type: 'USER_LOGIN_SUCCESS'; payload: User }
  | { type: 'USER_LOGIN_ERROR'; payload: string }
  | { type: 'POSTS_FETCH_START' }
  | { type: 'POSTS_FETCH_SUCCESS'; payload: Post[] }
  | { type: 'POSTS_FETCH_ERROR'; payload: string }
  | { type: 'UI_TOGGLE_THEME' }
  | { type: 'UI_TOGGLE_SIDEBAR' };

// Type-safe reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return {
        ...state,
        user: { ...state.user, loading: true, error: null },
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: {
          currentUser: action.payload,
          loading: false,
          error: null,
        },
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.payload,
        },
      };
    case 'UI_TOGGLE_THEME':
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'light' ? 'dark' : 'light',
        },
      };
    default:
      return state;
  }
}

// Type-safe context and provider
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Type-safe hook
function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

// Selector hooks
function useUser() {
  const { state } = useAppState();
  return state.user;
}

function usePosts() {
  const { state } = useAppState();
  return state.posts;
}

// Action creators
function useUserActions() {
  const { dispatch } = useAppState();

  return {
    loginStart: () => dispatch({ type: 'USER_LOGIN_START' }),
    loginSuccess: (user: User) => dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user }),
    loginError: (error: string) => dispatch({ type: 'USER_LOGIN_ERROR', payload: error }),
  };
}
```

### Q4: How do you handle deeply nested optional properties?

**Answer:**
Use utility types and optional chaining:

```typescript
// Utility type for deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Complex nested structure
interface User {
  id: string;
  profile: {
    name: string;
    avatar: string;
    settings: {
      theme: 'light' | 'dark';
      notifications: {
        email: boolean;
        push: boolean;
        preferences: {
          marketing: boolean;
          updates: boolean;
        };
      };
    };
  };
  addresses: {
    home: {
      street: string;
      city: string;
      country: string;
    };
    work?: {
      street: string;
      city: string;
      country: string;
    };
  };
}

// Safe property access
function getUserNotificationPreference(
  user: DeepPartial<User>,
  type: 'marketing' | 'updates'
): boolean {
  return user.profile?.settings?.notifications?.preferences?.[type] ?? false;
}

// Type-safe deep update
function updateUserSettings(
  user: User,
  updates: DeepPartial<User['profile']['settings']>
): User {
  return {
    ...user,
    profile: {
      ...user.profile,
      settings: {
        ...user.profile.settings,
        ...updates,
        notifications: {
          ...user.profile.settings.notifications,
          ...updates.notifications,
          preferences: {
            ...user.profile.settings.notifications.preferences,
            ...updates.notifications?.preferences,
          },
        },
      },
    },
  };
}

// Usage
const user: User = {
  id: '1',
  profile: {
    name: 'John Doe',
    avatar: 'avatar.jpg',
    settings: {
      theme: 'light',
      notifications: {
        email: true,
        push: false,
        preferences: {
          marketing: false,
          updates: true,
        },
      },
    },
  },
  addresses: {
    home: {
      street: '123 Main St',
      city: 'New York',
      country: 'USA',
    },
  },
};

const updatedUser = updateUserSettings(user, {
  theme: 'dark',
  notifications: {
    email: false,
    preferences: {
      marketing: true,
    },
  },
});
```

### Q5: How do you create a type-safe routing system?

**Answer:**
Create a type-safe routing system using template literals and mapped types:

```typescript
// Route definitions
type Routes = {
  '/': {};
  '/users': { search?: string; page?: number };
  '/users/:id': { id: string };
  '/users/:id/posts': { id: string; category?: string };
  '/posts/:postId/comments/:commentId': { postId: string; commentId: string };
};

// Extract path parameters
type PathParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & PathParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? { [K in Param]: string }
  : {};

// Type-safe route builder
class TypeSafeRouter<T extends Record<string, any>> {
  private routes: T;

  constructor(routes: T) {
    this.routes = routes;
  }

  navigate<K extends keyof T>(
    route: K,
    params: PathParams<K extends string ? K : never>,
    query?: T[K]
  ): string {
    let path = route as string;
    
    // Replace path parameters
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });

    // Add query parameters
    if (query && Object.keys(query).length > 0) {
      const queryString = new URLSearchParams(query).toString();
      path += `?${queryString}`;
    }

    return path;
  }

  match<K extends keyof T>(
    route: K,
    pathname: string
  ): { params: PathParams<K extends string ? K : never>; query: T[K] } | null {
    // Implementation for matching routes
    // This is a simplified version
    const routePattern = route as string;
    const pathParts = pathname.split('/');
    const routeParts = routePattern.split('/');

    if (pathParts.length !== routeParts.length) {
      return null;
    }

    const params: any = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(':')) {
        params[routePart.slice(1)] = pathPart;
      } else if (routePart !== pathPart) {
        return null;
      }
    }

    return { params, query: {} as T[K] };
  }
}

// Usage with full type safety
const router = new TypeSafeRouter<Routes>({
  '/': {},
  '/users': { search: '', page: 1 },
  '/users/:id': { id: '' },
  '/users/:id/posts': { id: '', category: '' },
  '/posts/:postId/comments/:commentId': { postId: '', commentId: '' },
});

// Type-safe navigation
const userPath = router.navigate('/users/:id', { id: '123' });
const userPostsPath = router.navigate('/users/:id/posts', { id: '123' }, { category: 'tech' });
const commentsPath = router.navigate('/posts/:postId/comments/:commentId', {
  postId: '456',
  commentId: '789',
});

// Type-safe route matching
const match = router.match('/users/:id', '/users/123');
if (match) {
  console.log(match.params.id); // Type is string
}
```

This comprehensive guide covers advanced TypeScript concepts essential for Big Tech interviews in 2025. The type system's power lies in catching errors at compile time while providing excellent developer experience through IntelliSense and refactoring tools.