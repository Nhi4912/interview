# Advanced Coding Challenges: Complete Interview Guide

## Overview

This section contains advanced coding challenges commonly asked in Big Tech frontend interviews. These problems test algorithmic thinking, system design, and practical implementation skills required for senior frontend engineers in 2025.

## 🎯 Challenge Categories

### 1. Data Structures & Algorithms
- Tree/Graph traversal for DOM manipulation
- Dynamic programming for optimization
- Sliding window for performance
- Two pointers for efficient searching

### 2. Frontend-Specific Algorithms
- Virtual scrolling implementation
- Debouncing and throttling
- Memoization and caching
- State management patterns

### 3. System Design Implementation
- Component architecture
- Real-time features
- Performance optimization
- Error handling

### 4. Advanced Patterns
- Higher-order components
- Render props with hooks
- Compound components
- State machines

## 🔧 Challenge 1: Implement Virtual Scrolling

**Problem:** Implement a virtual scrolling component that can efficiently render millions of items.

**Requirements:**
- Only render visible items
- Smooth scrolling experience
- Variable item heights
- Performance optimization

**Solution:**

```typescript
interface VirtualScrollProps {
  items: any[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  overscan?: number;
}

interface VirtualScrollState {
  scrollTop: number;
  startIndex: number;
  endIndex: number;
  visibleItems: any[];
}

class VirtualScrollManager {
  private itemHeights: Map<number, number> = new Map();
  private itemOffsets: Map<number, number> = new Map();
  private totalHeight: number = 0;

  constructor(
    private items: any[],
    private getItemHeight: (index: number) => number
  ) {
    this.calculateOffsets();
  }

  private calculateOffsets(): void {
    let offset = 0;
    
    for (let i = 0; i < this.items.length; i++) {
      this.itemOffsets.set(i, offset);
      const height = this.getItemHeight(i);
      this.itemHeights.set(i, height);
      offset += height;
    }
    
    this.totalHeight = offset;
  }

  getVisibleRange(scrollTop: number, containerHeight: number, overscan: number = 5): {
    startIndex: number;
    endIndex: number;
  } {
    const startIndex = Math.max(0, this.findStartIndex(scrollTop) - overscan);
    const endIndex = Math.min(
      this.items.length - 1,
      this.findEndIndex(scrollTop + containerHeight) + overscan
    );

    return { startIndex, endIndex };
  }

  private findStartIndex(scrollTop: number): number {
    let left = 0;
    let right = this.items.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const offset = this.itemOffsets.get(mid) || 0;

      if (offset < scrollTop) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  private findEndIndex(scrollBottom: number): number {
    let left = 0;
    let right = this.items.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      const offset = this.itemOffsets.get(mid) || 0;

      if (offset <= scrollBottom) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }

  getItemOffset(index: number): number {
    return this.itemOffsets.get(index) || 0;
  }

  getTotalHeight(): number {
    return this.totalHeight;
  }
}

function VirtualScroll({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}: VirtualScrollProps) {
  const [state, setState] = useState<VirtualScrollState>({
    scrollTop: 0,
    startIndex: 0,
    endIndex: 0,
    visibleItems: []
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollManager = useRef<VirtualScrollManager | null>(null);

  const getItemHeight = useCallback((index: number) => {
    return typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
  }, [itemHeight]);

  useEffect(() => {
    scrollManager.current = new VirtualScrollManager(items, getItemHeight);
    
    const { startIndex, endIndex } = scrollManager.current.getVisibleRange(
      0,
      containerHeight,
      overscan
    );
    
    setState({
      scrollTop: 0,
      startIndex,
      endIndex,
      visibleItems: items.slice(startIndex, endIndex + 1)
    });
  }, [items, getItemHeight, containerHeight, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    
    if (!scrollManager.current) return;

    const { startIndex, endIndex } = scrollManager.current.getVisibleRange(
      scrollTop,
      containerHeight,
      overscan
    );

    setState({
      scrollTop,
      startIndex,
      endIndex,
      visibleItems: items.slice(startIndex, endIndex + 1)
    });
  }, [items, containerHeight, overscan]);

  if (!scrollManager.current) return null;

  const totalHeight = scrollManager.current.getTotalHeight();
  const offsetY = scrollManager.current.getItemOffset(state.startIndex);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {state.visibleItems.map((item, index) => (
            <div
              key={state.startIndex + index}
              style={{
                height: getItemHeight(state.startIndex + index)
              }}
            >
              {renderItem(item, state.startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage
function App() {
  const items = Array.from({ length: 1000000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random() * 100
  }));

  return (
    <VirtualScroll
      items={items}
      itemHeight={50}
      containerHeight={600}
      renderItem={(item, index) => (
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <strong>{item.name}</strong> - {item.value.toFixed(2)}
        </div>
      )}
      overscan={10}
    />
  );
}
```

## 🔧 Challenge 2: Build a State Machine

**Problem:** Implement a finite state machine for managing complex UI states.

**Requirements:**
- Define states and transitions
- Handle side effects
- Type safety
- Event handling

**Solution:**

```typescript
interface StateMachineConfig<TState, TEvent> {
  id: string;
  initial: TState;
  states: {
    [K in TState]: {
      on?: {
        [E in TEvent]?: {
          target: TState;
          actions?: Array<(context: any, event: EventObject<E>) => void>;
          guard?: (context: any, event: EventObject<E>) => boolean;
        };
      };
      entry?: Array<(context: any) => void>;
      exit?: Array<(context: any) => void>;
    };
  };
  context?: any;
}

interface EventObject<T> {
  type: T;
  payload?: any;
}

interface StateMachineState<TState> {
  value: TState;
  context: any;
  changed: boolean;
}

class StateMachine<TState extends string, TEvent extends string> {
  private config: StateMachineConfig<TState, TEvent>;
  private currentState: TState;
  private context: any;
  private listeners: Set<(state: StateMachineState<TState>) => void> = new Set();

  constructor(config: StateMachineConfig<TState, TEvent>) {
    this.config = config;
    this.currentState = config.initial;
    this.context = config.context || {};
    
    // Execute initial state entry actions
    this.executeEntryActions(this.currentState);
  }

  send(event: EventObject<TEvent>): StateMachineState<TState> {
    const currentStateConfig = this.config.states[this.currentState];
    const transition = currentStateConfig.on?.[event.type];

    if (!transition) {
      return {
        value: this.currentState,
        context: this.context,
        changed: false
      };
    }

    // Check guard condition
    if (transition.guard && !transition.guard(this.context, event)) {
      return {
        value: this.currentState,
        context: this.context,
        changed: false
      };
    }

    // Execute exit actions
    this.executeExitActions(this.currentState);

    // Execute transition actions
    if (transition.actions) {
      transition.actions.forEach(action => action(this.context, event));
    }

    // Update state
    const previousState = this.currentState;
    this.currentState = transition.target;

    // Execute entry actions
    this.executeEntryActions(this.currentState);

    const newState = {
      value: this.currentState,
      context: this.context,
      changed: previousState !== this.currentState
    };

    // Notify listeners
    this.listeners.forEach(listener => listener(newState));

    return newState;
  }

  private executeEntryActions(state: TState): void {
    const stateConfig = this.config.states[state];
    if (stateConfig.entry) {
      stateConfig.entry.forEach(action => action(this.context));
    }
  }

  private executeExitActions(state: TState): void {
    const stateConfig = this.config.states[state];
    if (stateConfig.exit) {
      stateConfig.exit.forEach(action => action(this.context));
    }
  }

  subscribe(listener: (state: StateMachineState<TState>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): StateMachineState<TState> {
    return {
      value: this.currentState,
      context: this.context,
      changed: false
    };
  }
}

// React hook for state machine
function useStateMachine<TState extends string, TEvent extends string>(
  config: StateMachineConfig<TState, TEvent>
) {
  const [state, setState] = useState<StateMachineState<TState>>({
    value: config.initial,
    context: config.context || {},
    changed: false
  });

  const machine = useRef<StateMachine<TState, TEvent>>();

  useEffect(() => {
    machine.current = new StateMachine(config);
    
    const unsubscribe = machine.current.subscribe(setState);
    
    // Set initial state
    setState(machine.current.getState());
    
    return unsubscribe;
  }, []);

  const send = useCallback((event: EventObject<TEvent>) => {
    if (machine.current) {
      machine.current.send(event);
    }
  }, []);

  return [state, send] as const;
}

// Example: Login form state machine
type LoginState = 'idle' | 'submitting' | 'success' | 'error';
type LoginEvent = 'SUBMIT' | 'SUCCESS' | 'ERROR' | 'RETRY';

const loginMachineConfig: StateMachineConfig<LoginState, LoginEvent> = {
  id: 'login',
  initial: 'idle',
  context: {
    errorMessage: '',
    attempts: 0
  },
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'submitting',
          actions: [(context) => {
            context.attempts += 1;
            context.errorMessage = '';
          }]
        }
      }
    },
    submitting: {
      entry: [(context) => {
        console.log('Submitting login...');
      }],
      on: {
        SUCCESS: {
          target: 'success',
          actions: [(context) => {
            console.log('Login successful!');
          }]
        },
        ERROR: {
          target: 'error',
          actions: [(context, event) => {
            context.errorMessage = event.payload?.message || 'Login failed';
          }]
        }
      }
    },
    success: {
      entry: [(context) => {
        console.log('Redirecting to dashboard...');
      }]
    },
    error: {
      on: {
        RETRY: {
          target: 'idle',
          guard: (context) => context.attempts < 3
        },
        SUBMIT: {
          target: 'submitting',
          guard: (context) => context.attempts < 3
        }
      }
    }
  }
};

function LoginForm() {
  const [state, send] = useStateMachine(loginMachineConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    send({ type: 'SUBMIT' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (Math.random() > 0.5) {
        send({ type: 'SUCCESS' });
      } else {
        send({ 
          type: 'ERROR',
          payload: { message: 'Invalid credentials' }
        });
      }
    } catch (error) {
      send({ 
        type: 'ERROR',
        payload: { message: 'Network error' }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      
      <button 
        type="submit" 
        disabled={state.value === 'submitting'}
      >
        {state.value === 'submitting' ? 'Logging in...' : 'Login'}
      </button>
      
      {state.value === 'error' && (
        <div style={{ color: 'red' }}>
          {state.context.errorMessage}
          <button onClick={() => send({ type: 'RETRY' })}>
            Retry
          </button>
        </div>
      )}
      
      {state.value === 'success' && (
        <div style={{ color: 'green' }}>
          Login successful! Redirecting...
        </div>
      )}
      
      <div>
        Attempts: {state.context.attempts}
      </div>
    </form>
  );
}
```

## 🔧 Challenge 3: Implement Drag and Drop

**Problem:** Create a flexible drag and drop system with multi-directional support.

**Requirements:**
- Touch and mouse support
- Visual feedback
- Collision detection
- Smooth animations

**Solution:**

```typescript
interface DragDropConfig {
  dragHandle?: string;
  dragClass?: string;
  dropClass?: string;
  ghostClass?: string;
  onDragStart?: (item: DragItem) => void;
  onDragEnd?: (item: DragItem) => void;
  onDrop?: (item: DragItem, target: DropTarget) => void;
}

interface DragItem {
  id: string;
  element: HTMLElement;
  data: any;
  originalPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
}

interface DropTarget {
  id: string;
  element: HTMLElement;
  accepts: string[];
  bounds: DOMRect;
}

class DragDropManager {
  private config: DragDropConfig;
  private dragItem: DragItem | null = null;
  private dropTargets: Map<string, DropTarget> = new Map();
  private ghost: HTMLElement | null = null;
  private startPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(config: DragDropConfig = {}) {
    this.config = config;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  registerDragItem(element: HTMLElement, data: any): void {
    element.setAttribute('data-draggable', 'true');
    element.style.cursor = 'grab';
  }

  registerDropTarget(id: string, element: HTMLElement, accepts: string[] = []): void {
    this.dropTargets.set(id, {
      id,
      element,
      accepts,
      bounds: element.getBoundingClientRect()
    });
  }

  private handleMouseDown(e: MouseEvent): void {
    this.startDrag(e, e.clientX, e.clientY);
  }

  private handleTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      this.startDrag(e, touch.clientX, touch.clientY);
    }
  }

  private startDrag(e: Event, x: number, y: number): void {
    const target = e.target as HTMLElement;
    const draggableElement = target.closest('[data-draggable="true"]') as HTMLElement;
    
    if (!draggableElement) return;

    e.preventDefault();

    this.startPosition = { x, y };
    const rect = draggableElement.getBoundingClientRect();
    
    this.dragItem = {
      id: draggableElement.id || crypto.randomUUID(),
      element: draggableElement,
      data: draggableElement.dataset,
      originalPosition: { x: rect.left, y: rect.top },
      currentPosition: { x: rect.left, y: rect.top }
    };

    this.createGhost(draggableElement);
    
    draggableElement.style.cursor = 'grabbing';
    if (this.config.dragClass) {
      draggableElement.classList.add(this.config.dragClass);
    }

    this.config.onDragStart?.(this.dragItem);
  }

  private handleMouseMove(e: MouseEvent): void {
    this.updateDrag(e.clientX, e.clientY);
  }

  private handleTouchMove(e: TouchEvent): void {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      this.updateDrag(touch.clientX, touch.clientY);
    }
  }

  private updateDrag(x: number, y: number): void {
    if (!this.dragItem || !this.ghost) return;

    const deltaX = x - this.startPosition.x;
    const deltaY = y - this.startPosition.y;

    this.dragItem.currentPosition = {
      x: this.dragItem.originalPosition.x + deltaX,
      y: this.dragItem.originalPosition.y + deltaY
    };

    this.ghost.style.left = `${this.dragItem.currentPosition.x}px`;
    this.ghost.style.top = `${this.dragItem.currentPosition.y}px`;

    this.updateDropTargets(x, y);
  }

  private updateDropTargets(x: number, y: number): void {
    this.dropTargets.forEach(target => {
      const rect = target.element.getBoundingClientRect();
      const isOver = (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );

      if (isOver) {
        if (this.config.dropClass) {
          target.element.classList.add(this.config.dropClass);
        }
      } else {
        if (this.config.dropClass) {
          target.element.classList.remove(this.config.dropClass);
        }
      }
    });
  }

  private handleMouseUp(e: MouseEvent): void {
    this.endDrag(e.clientX, e.clientY);
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      this.endDrag(touch.clientX, touch.clientY);
    }
  }

  private endDrag(x: number, y: number): void {
    if (!this.dragItem) return;

    const dropTarget = this.findDropTarget(x, y);
    
    if (dropTarget) {
      this.config.onDrop?.(this.dragItem, dropTarget);
    }

    this.cleanup();
    this.config.onDragEnd?.(this.dragItem);
    this.dragItem = null;
  }

  private findDropTarget(x: number, y: number): DropTarget | null {
    for (const [id, target] of this.dropTargets) {
      const rect = target.element.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return target;
      }
    }
    return null;
  }

  private createGhost(element: HTMLElement): void {
    this.ghost = element.cloneNode(true) as HTMLElement;
    this.ghost.style.position = 'fixed';
    this.ghost.style.pointerEvents = 'none';
    this.ghost.style.opacity = '0.8';
    this.ghost.style.zIndex = '9999';
    
    if (this.config.ghostClass) {
      this.ghost.classList.add(this.config.ghostClass);
    }
    
    document.body.appendChild(this.ghost);
  }

  private cleanup(): void {
    if (this.ghost) {
      document.body.removeChild(this.ghost);
      this.ghost = null;
    }

    if (this.dragItem) {
      this.dragItem.element.style.cursor = 'grab';
      if (this.config.dragClass) {
        this.dragItem.element.classList.remove(this.config.dragClass);
      }
    }

    this.dropTargets.forEach(target => {
      if (this.config.dropClass) {
        target.element.classList.remove(this.config.dropClass);
      }
    });
  }
}

// React hook for drag and drop
function useDragDrop(config: DragDropConfig = {}) {
  const manager = useRef<DragDropManager>();

  useEffect(() => {
    manager.current = new DragDropManager(config);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const registerDragItem = useCallback((element: HTMLElement, data: any) => {
    manager.current?.registerDragItem(element, data);
  }, []);

  const registerDropTarget = useCallback((id: string, element: HTMLElement, accepts: string[] = []) => {
    manager.current?.registerDropTarget(id, element, accepts);
  }, []);

  return {
    registerDragItem,
    registerDropTarget
  };
}

// Example usage
function KanbanBoard() {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', items: ['Task 1', 'Task 2'] },
    { id: 'doing', title: 'Doing', items: ['Task 3'] },
    { id: 'done', title: 'Done', items: ['Task 4'] }
  ]);

  const { registerDragItem, registerDropTarget } = useDragDrop({
    onDrop: (item, target) => {
      const sourceColumnId = item.data.column;
      const targetColumnId = target.id;
      const taskId = item.data.task;

      if (sourceColumnId !== targetColumnId) {
        setColumns(prev => prev.map(col => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              items: col.items.filter(item => item !== taskId)
            };
          }
          if (col.id === targetColumnId) {
            return {
              ...col,
              items: [...col.items, taskId]
            };
          }
          return col;
        }));
      }
    }
  });

  const taskRef = useCallback((element: HTMLElement, columnId: string, taskId: string) => {
    if (element) {
      registerDragItem(element, { column: columnId, task: taskId });
    }
  }, [registerDragItem]);

  const columnRef = useCallback((element: HTMLElement, columnId: string) => {
    if (element) {
      registerDropTarget(columnId, element);
    }
  }, [registerDropTarget]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {columns.map(column => (
        <div
          key={column.id}
          ref={(el) => el && columnRef(el, column.id)}
          style={{
            flex: 1,
            minHeight: '500px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}
        >
          <h3>{column.title}</h3>
          {column.items.map(task => (
            <div
              key={task}
              ref={(el) => el && taskRef(el, column.id, task)}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: 'white',
                borderRadius: '4px',
                cursor: 'grab'
              }}
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Challenge 4: Build a Custom Hook Library

**Problem:** Create a comprehensive custom hook library with TypeScript support.

**Requirements:**
- Type safety
- Reusability
- Performance optimization
- Error handling

**Solution:**

```typescript
// useAsync - Advanced async state management
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface AsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: AsyncOptions = {}
): AsyncState<T> & {
  execute: () => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
    } catch (error) {
      const err = error as Error;
      setState({ data: null, loading: false, error: err });
      options.onError?.(err);
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute]);

  return { ...state, execute, reset };
}

// useDebounce - Advanced debouncing with cancellation
function useDebounce<T>(
  value: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {}
): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCallTime = useRef<number>();

  const { leading = false, trailing = true, maxWait } = options;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const now = Date.now();
    
    if (leading && !lastCallTime.current) {
      setDebouncedValue(value);
      lastCallTime.current = now;
    }

    cancel();

    const updateValue = () => {
      if (trailing) {
        setDebouncedValue(value);
      }
      lastCallTime.current = now;
    };

    timeoutRef.current = setTimeout(updateValue, delay);

    if (maxWait && lastCallTime.current) {
      const timeSinceLastCall = now - lastCallTime.current;
      if (timeSinceLastCall >= maxWait) {
        updateValue();
      } else {
        maxTimeoutRef.current = setTimeout(updateValue, maxWait - timeSinceLastCall);
      }
    }

    return cancel;
  }, [value, delay, leading, trailing, maxWait, cancel]);

  return [debouncedValue, cancel];
}

// useLocalStorage - Advanced local storage with serialization
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    serializer?: {
      stringify: (value: T) => string;
      parse: (value: string) => T;
    };
    onError?: (error: Error) => void;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const serializer = options.serializer || JSON;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? serializer.parse(item) : initialValue;
    } catch (error) {
      options.onError?.(error as Error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serializer.stringify(valueToStore));
    } catch (error) {
      options.onError?.(error as Error);
    }
  }, [key, storedValue, serializer, options.onError]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      options.onError?.(error as Error);
    }
  }, [key, initialValue, options.onError]);

  return [storedValue, setValue, removeValue];
}

// useIntersectionObserver - Advanced intersection observer
interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [
  (node: Element | null) => void,
  IntersectionObserverEntry | undefined,
  () => void
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [element, setElement] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver>();

  const { root, rootMargin, threshold, freezeOnceVisible } = options;

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        
        if (freezeOnceVisible && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [element, root, rootMargin, threshold, freezeOnceVisible]);

  return [setElement, entry, disconnect];
}

// useEventListener - Advanced event listener with cleanup
function useEventListener<T extends Event>(
  eventType: string,
  listener: (event: T) => void,
  element: Element | Window | Document = window,
  options: boolean | AddEventListenerOptions = {}
): void {
  const savedListener = useRef<(event: T) => void>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const eventListener = (event: Event) => {
      savedListener.current?.(event as T);
    };

    element.addEventListener(eventType, eventListener, options);

    return () => {
      element.removeEventListener(eventType, eventListener, options);
    };
  }, [eventType, element, options]);
}

// useMediaQuery - Advanced media query hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);
    
    // Use deprecated addListener for better browser support
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    } else {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      } else {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}

// useWindowSize - Advanced window size hook
interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  return windowSize;
}

// Example usage of custom hooks
function ExampleComponent() {
  // Async data fetching
  const { data, loading, error, execute } = useAsync(
    () => fetch('/api/data').then(res => res.json()),
    [],
    {
      onSuccess: (data) => console.log('Data loaded:', data),
      onError: (error) => console.error('Error:', error)
    }
  );

  // Debounced search
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Local storage
  const [settings, setSettings] = useLocalStorage('app-settings', {
    theme: 'light',
    notifications: true
  });

  // Intersection observer for lazy loading
  const [imageRef, imageEntry] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  // Media query
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Window size
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Custom Hooks Example</h1>
      
      <div>
        <h2>Async Data</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        <button onClick={execute}>Refetch</button>
      </div>

      <div>
        <h2>Debounced Search</h2>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <p>Debounced: {debouncedSearchTerm}</p>
      </div>

      <div>
        <h2>Settings</h2>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: e.target.checked
            }))}
          />
          Notifications
        </label>
      </div>

      <div>
        <h2>Lazy Image</h2>
        <div ref={imageRef} style={{ height: '200px', border: '1px solid #ccc' }}>
          {imageEntry?.isIntersecting && (
            <img src="https://via.placeholder.com/300x200" alt="Lazy loaded" />
          )}
        </div>
      </div>

      <div>
        <h2>Responsive Info</h2>
        <p>Mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p>Window Size: {width} x {height}</p>
      </div>
    </div>
  );
}
```

This comprehensive guide covers advanced coding challenges that demonstrate senior-level frontend engineering skills. These patterns are commonly tested in Big Tech interviews and represent real-world scenarios you'll encounter in production applications.