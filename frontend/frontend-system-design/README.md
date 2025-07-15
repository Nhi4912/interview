# Frontend System Design: Complete Interview Guide

## Overview

Frontend system design interviews test your ability to architect scalable, maintainable web applications. This guide covers essential patterns, trade-offs, and real-world scenarios commonly asked at Big Tech companies in 2025.

## 🏗️ System Design Principles

### 1. Scalability Patterns

**Horizontal Scaling**
- Multiple frontend instances
- Load balancing
- CDN distribution
- Edge computing

**Vertical Scaling**
- Code splitting
- Lazy loading
- Resource optimization
- Bundle optimization

### 2. Reliability Patterns

**Error Handling**
- Error boundaries
- Graceful degradation
- Retry mechanisms
- Circuit breakers

**Monitoring**
- Performance metrics
- Error tracking
- User analytics
- Real-time alerts

### 3. Performance Patterns

**Loading Performance**
- Critical rendering path
- Resource prioritization
- Caching strategies
- Progressive loading

**Runtime Performance**
- Virtual scrolling
- Memoization
- Efficient re-renders
- Memory management

## 🌟 Core Architecture Patterns

### 1. Component Architecture

```typescript
// Component hierarchy design
interface ComponentArchitecture {
  // Layout components
  layout: {
    Header: React.ComponentType;
    Sidebar: React.ComponentType;
    Footer: React.ComponentType;
    Container: React.ComponentType;
  };
  
  // Feature components
  features: {
    UserProfile: React.ComponentType;
    ProductList: React.ComponentType;
    ShoppingCart: React.ComponentType;
  };
  
  // UI components
  ui: {
    Button: React.ComponentType;
    Modal: React.ComponentType;
    Input: React.ComponentType;
    Card: React.ComponentType;
  };
  
  // Utility components
  utils: {
    ErrorBoundary: React.ComponentType;
    LoadingSpinner: React.ComponentType;
    LazyWrapper: React.ComponentType;
  };
}

// Example implementation
const ComponentSystem = {
  // Container components handle state and logic
  containers: {
    ProductListContainer: ({ filters }) => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(false);
      
      const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
          const result = await productAPI.getProducts(filters);
          setProducts(result);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      }, [filters]);
      
      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
      
      return (
        <ProductListPresenter
          products={products}
          loading={loading}
          onRefresh={fetchProducts}
        />
      );
    }
  },
  
  // Presenter components handle UI rendering
  presenters: {
    ProductListPresenter: ({ products, loading, onRefresh }) => {
      if (loading) return <LoadingSpinner />;
      
      return (
        <div>
          <RefreshButton onClick={onRefresh} />
          <ProductGrid products={products} />
        </div>
      );
    }
  }
};
```

### 2. State Management Architecture

```typescript
// Layered state management
interface StateArchitecture {
  // Global state (App-wide)
  global: {
    user: UserState;
    theme: ThemeState;
    notifications: NotificationState;
  };
  
  // Feature state (Feature-specific)
  features: {
    products: ProductState;
    cart: CartState;
    checkout: CheckoutState;
  };
  
  // UI state (Component-specific)
  ui: {
    modals: ModalState;
    forms: FormState;
    navigation: NavigationState;
  };
  
  // Server state (Cached API data)
  server: {
    queries: QueryState;
    mutations: MutationState;
    cache: CacheState;
  };
}

// State normalization
interface NormalizedState {
  entities: {
    users: Record<string, User>;
    products: Record<string, Product>;
    orders: Record<string, Order>;
  };
  
  relationships: {
    userOrders: Record<string, string[]>;
    productCategories: Record<string, string[]>;
    orderItems: Record<string, string[]>;
  };
  
  ui: {
    currentUser: string | null;
    selectedProducts: string[];
    activeOrder: string | null;
  };
}

// State management implementation
class StateManager {
  private state: NormalizedState;
  private subscribers: Set<Function> = new Set();
  
  constructor(initialState: NormalizedState) {
    this.state = initialState;
  }
  
  subscribe(callback: Function) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  setState(updates: Partial<NormalizedState>) {
    this.state = { ...this.state, ...updates };
    this.subscribers.forEach(callback => callback(this.state));
  }
  
  getState(): NormalizedState {
    return this.state;
  }
  
  // Selectors
  getUser(id: string): User | null {
    return this.state.entities.users[id] || null;
  }
  
  getUserOrders(userId: string): Order[] {
    const orderIds = this.state.relationships.userOrders[userId] || [];
    return orderIds.map(id => this.state.entities.orders[id]).filter(Boolean);
  }
  
  // Actions
  addUser(user: User) {
    this.setState({
      entities: {
        ...this.state.entities,
        users: {
          ...this.state.entities.users,
          [user.id]: user
        }
      }
    });
  }
  
  setCurrentUser(userId: string) {
    this.setState({
      ui: {
        ...this.state.ui,
        currentUser: userId
      }
    });
  }
}
```

### 3. Data Flow Architecture

```typescript
// Unidirectional data flow
interface DataFlowArchitecture {
  // Data sources
  sources: {
    api: APIClient;
    localStorage: LocalStorage;
    websocket: WebSocketClient;
    cache: CacheManager;
  };
  
  // Data transformation
  transforms: {
    normalizers: DataNormalizers;
    validators: DataValidators;
    serializers: DataSerializers;
  };
  
  // Data consumption
  consumers: {
    components: ReactComponents;
    hooks: CustomHooks;
    effects: SideEffects;
  };
}

// Data flow implementation
class DataFlowManager {
  private apiClient: APIClient;
  private cache: CacheManager;
  private normalizer: DataNormalizer;
  
  constructor(config: DataFlowConfig) {
    this.apiClient = new APIClient(config.apiUrl);
    this.cache = new CacheManager(config.cacheConfig);
    this.normalizer = new DataNormalizer();
  }
  
  async fetchData<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const cacheKey = this.generateCacheKey(endpoint, options);
    
    // Check cache first
    if (options.useCache !== false) {
      const cached = await this.cache.get<T>(cacheKey);
      if (cached && !this.cache.isExpired(cached)) {
        return cached.data;
      }
    }
    
    // Fetch from API
    const response = await this.apiClient.fetch(endpoint, options);
    
    // Transform data
    const normalizedData = this.normalizer.normalize(response);
    
    // Cache result
    if (options.useCache !== false) {
      await this.cache.set(cacheKey, normalizedData, options.ttl);
    }
    
    return normalizedData;
  }
  
  private generateCacheKey(endpoint: string, options: FetchOptions): string {
    return `${endpoint}:${JSON.stringify(options)}`;
  }
}

// Usage in components
function useDataFlow<T>(
  endpoint: string,
  options: FetchOptions = {}
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });
  
  const dataFlow = useContext(DataFlowContext);
  
  useEffect(() => {
    let cancelled = false;
    
    dataFlow.fetchData<T>(endpoint, options)
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({ data: null, loading: false, error });
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [endpoint, JSON.stringify(options)]);
  
  return state;
}
```

## 🎯 Real-World System Design Problems

### 1. Design a Social Media Feed

**Requirements:**
- Real-time updates
- Infinite scroll
- Content types: text, images, videos
- Engagement features: likes, comments, shares
- Personalization
- Mobile responsive

**Architecture:**

```typescript
interface SocialMediaFeedArchitecture {
  components: {
    FeedContainer: React.ComponentType;
    PostCard: React.ComponentType;
    InfiniteScroll: React.ComponentType;
    RealTimeUpdates: React.ComponentType;
  };
  
  state: {
    posts: Post[];
    user: User;
    feed: FeedState;
    engagement: EngagementState;
  };
  
  services: {
    feedAPI: FeedAPI;
    engagementAPI: EngagementAPI;
    websocket: WebSocketService;
    analytics: AnalyticsService;
  };
}

// Implementation
class SocialMediaFeed {
  private feedAPI: FeedAPI;
  private websocket: WebSocketService;
  private virtualizer: VirtualScrollManager;
  
  constructor(config: FeedConfig) {
    this.feedAPI = new FeedAPI(config.apiUrl);
    this.websocket = new WebSocketService(config.wsUrl);
    this.virtualizer = new VirtualScrollManager(config.virtualConfig);
  }
  
  async initializeFeed(userId: string): Promise<FeedState> {
    // Fetch initial posts
    const posts = await this.feedAPI.getUserFeed(userId, {
      limit: 20,
      offset: 0
    });
    
    // Set up real-time updates
    this.websocket.subscribe('feed_updates', (update) => {
      this.handleRealtimeUpdate(update);
    });
    
    return {
      posts,
      hasMore: posts.length === 20,
      loading: false,
      error: null
    };
  }
  
  async loadMorePosts(userId: string, offset: number): Promise<Post[]> {
    const posts = await this.feedAPI.getUserFeed(userId, {
      limit: 20,
      offset
    });
    
    return posts;
  }
  
  private handleRealtimeUpdate(update: FeedUpdate) {
    switch (update.type) {
      case 'NEW_POST':
        this.addNewPost(update.post);
        break;
      case 'POST_LIKED':
        this.updatePostEngagement(update.postId, 'likes', update.delta);
        break;
      case 'POST_COMMENTED':
        this.updatePostEngagement(update.postId, 'comments', update.delta);
        break;
    }
  }
}

// Feed component
function FeedContainer({ userId }: { userId: string }) {
  const [feedState, setFeedState] = useState<FeedState>({
    posts: [],
    hasMore: true,
    loading: true,
    error: null
  });
  
  const feed = useRef(new SocialMediaFeed({
    apiUrl: '/api',
    wsUrl: '/ws',
    virtualConfig: {
      itemHeight: 400,
      overscan: 5
    }
  }));
  
  useEffect(() => {
    feed.current.initializeFeed(userId)
      .then(setFeedState)
      .catch(error => setFeedState(prev => ({ ...prev, error, loading: false })));
  }, [userId]);
  
  const loadMore = useCallback(async () => {
    if (!feedState.hasMore || feedState.loading) return;
    
    setFeedState(prev => ({ ...prev, loading: true }));
    
    try {
      const newPosts = await feed.current.loadMorePosts(userId, feedState.posts.length);
      setFeedState(prev => ({
        ...prev,
        posts: [...prev.posts, ...newPosts],
        hasMore: newPosts.length === 20,
        loading: false
      }));
    } catch (error) {
      setFeedState(prev => ({ ...prev, error, loading: false }));
    }
  }, [userId, feedState.posts.length, feedState.hasMore, feedState.loading]);
  
  return (
    <div className="feed-container">
      <InfiniteScroll
        items={feedState.posts}
        renderItem={({ item, index }) => (
          <PostCard key={item.id} post={item} index={index} />
        )}
        onLoadMore={loadMore}
        hasMore={feedState.hasMore}
        loading={feedState.loading}
      />
    </div>
  );
}
```

### 2. Design a Code Editor

**Requirements:**
- Syntax highlighting
- Auto-completion
- Multi-file support
- Real-time collaboration
- Plugin system
- Performance optimization

**Architecture:**

```typescript
interface CodeEditorArchitecture {
  core: {
    editor: EditorEngine;
    parser: SyntaxParser;
    tokenizer: Tokenizer;
    renderer: TextRenderer;
  };
  
  features: {
    autocomplete: AutocompleteEngine;
    collaboration: CollaborationManager;
    plugins: PluginManager;
    fileSystem: FileSystemManager;
  };
  
  ui: {
    editorView: EditorView;
    sidebar: FileExplorer;
    statusBar: StatusBar;
    commandPalette: CommandPalette;
  };
}

// Core editor implementation
class CodeEditor {
  private document: TextDocument;
  private cursor: CursorManager;
  private selection: SelectionManager;
  private history: HistoryManager;
  private renderer: TextRenderer;
  
  constructor(config: EditorConfig) {
    this.document = new TextDocument();
    this.cursor = new CursorManager();
    this.selection = new SelectionManager();
    this.history = new HistoryManager();
    this.renderer = new TextRenderer(config.theme);
  }
  
  insertText(text: string, position: Position): void {
    const operation = new InsertOperation(text, position);
    
    // Apply operation
    this.document.applyOperation(operation);
    
    // Update cursor
    this.cursor.moveTo({
      line: position.line,
      column: position.column + text.length
    });
    
    // Add to history
    this.history.push(operation);
    
    // Trigger re-render
    this.renderer.invalidateRange(
      position,
      this.cursor.getPosition()
    );
  }
  
  deleteText(from: Position, to: Position): void {
    const operation = new DeleteOperation(from, to);
    
    this.document.applyOperation(operation);
    this.cursor.moveTo(from);
    this.history.push(operation);
    this.renderer.invalidateRange(from, to);
  }
  
  undo(): void {
    const operation = this.history.undo();
    if (operation) {
      this.document.applyOperation(operation.inverse());
      this.renderer.invalidateAll();
    }
  }
  
  redo(): void {
    const operation = this.history.redo();
    if (operation) {
      this.document.applyOperation(operation);
      this.renderer.invalidateAll();
    }
  }
}

// Collaboration manager
class CollaborationManager {
  private operationalTransform: OperationalTransform;
  private websocket: WebSocketService;
  private clientId: string;
  
  constructor(config: CollaborationConfig) {
    this.operationalTransform = new OperationalTransform();
    this.websocket = new WebSocketService(config.wsUrl);
    this.clientId = config.clientId;
  }
  
  sendOperation(operation: Operation): void {
    const message = {
      type: 'operation',
      clientId: this.clientId,
      operation: operation.serialize(),
      timestamp: Date.now()
    };
    
    this.websocket.send(message);
  }
  
  handleRemoteOperation(message: CollaborationMessage): Operation {
    const remoteOperation = Operation.deserialize(message.operation);
    
    // Transform against local operations
    const transformedOperation = this.operationalTransform.transform(
      remoteOperation,
      this.getLocalOperations()
    );
    
    return transformedOperation;
  }
  
  private getLocalOperations(): Operation[] {
    // Get operations since last sync
    return this.history.getOperationsSince(this.lastSyncTimestamp);
  }
}

// Plugin system
class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private hooks: Map<string, Function[]> = new Map();
  
  register(plugin: Plugin): void {
    this.plugins.set(plugin.id, plugin);
    
    // Register plugin hooks
    plugin.hooks.forEach((hook, event) => {
      if (!this.hooks.has(event)) {
        this.hooks.set(event, []);
      }
      this.hooks.get(event)!.push(hook);
    });
  }
  
  emit(event: string, ...args: any[]): void {
    const hooks = this.hooks.get(event) || [];
    hooks.forEach(hook => hook(...args));
  }
  
  getPlugin(id: string): Plugin | null {
    return this.plugins.get(id) || null;
  }
}

// Usage
function CodeEditorComponent() {
  const [editor, setEditor] = useState<CodeEditor | null>(null);
  const [plugins, setPlugins] = useState<PluginManager | null>(null);
  
  useEffect(() => {
    const editorInstance = new CodeEditor({
      theme: 'dark',
      language: 'typescript',
      tabSize: 2
    });
    
    const pluginManager = new PluginManager();
    
    // Load plugins
    pluginManager.register(new SyntaxHighlightPlugin());
    pluginManager.register(new AutocompletePlugin());
    pluginManager.register(new GitPlugin());
    
    setEditor(editorInstance);
    setPlugins(pluginManager);
  }, []);
  
  return (
    <div className="code-editor">
      <div className="editor-header">
        <FileExplorer />
        <CommandPalette />
      </div>
      
      <div className="editor-body">
        <div className="editor-sidebar">
          <FileTree />
          <PluginPanel plugins={plugins} />
        </div>
        
        <div className="editor-main">
          <EditorView editor={editor} />
        </div>
      </div>
      
      <div className="editor-footer">
        <StatusBar editor={editor} />
      </div>
    </div>
  );
}
```

### 3. Design a Real-time Chat Application

**Requirements:**
- Multiple chat rooms
- Real-time messaging
- File sharing
- User presence
- Message history
- Mobile responsive

**Architecture:**

```typescript
interface ChatAppArchitecture {
  communication: {
    websocket: WebSocketManager;
    messageQueue: MessageQueue;
    presence: PresenceManager;
    notifications: NotificationManager;
  };
  
  state: {
    rooms: Room[];
    messages: Message[];
    users: User[];
    typing: TypingState;
  };
  
  ui: {
    chatWindow: ChatWindow;
    messageList: MessageList;
    messageInput: MessageInput;
    userList: UserList;
  };
}

// Real-time communication
class ChatManager {
  private websocket: WebSocketManager;
  private messageQueue: MessageQueue;
  private presence: PresenceManager;
  
  constructor(config: ChatConfig) {
    this.websocket = new WebSocketManager(config.wsUrl);
    this.messageQueue = new MessageQueue();
    this.presence = new PresenceManager();
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    this.websocket.on('message', this.handleMessage.bind(this));
    this.websocket.on('typing', this.handleTyping.bind(this));
    this.websocket.on('presence', this.handlePresence.bind(this));
    this.websocket.on('disconnect', this.handleDisconnect.bind(this));
  }
  
  sendMessage(roomId: string, content: string): void {
    const message: Message = {
      id: crypto.randomUUID(),
      roomId,
      content,
      senderId: this.getCurrentUserId(),
      timestamp: new Date(),
      type: 'text'
    };
    
    // Add to queue for offline support
    this.messageQueue.add(message);
    
    // Send via websocket
    this.websocket.send('message', message);
  }
  
  sendTyping(roomId: string, isTyping: boolean): void {
    this.websocket.send('typing', {
      roomId,
      userId: this.getCurrentUserId(),
      isTyping
    });
  }
  
  joinRoom(roomId: string): void {
    this.websocket.send('join_room', { roomId });
    this.presence.joinRoom(roomId);
  }
  
  leaveRoom(roomId: string): void {
    this.websocket.send('leave_room', { roomId });
    this.presence.leaveRoom(roomId);
  }
  
  private handleMessage(message: Message): void {
    // Update message store
    this.messageQueue.markSent(message.id);
    
    // Trigger UI update
    this.emit('message_received', message);
    
    // Show notification if not in focus
    if (!document.hasFocus()) {
      this.showNotification(message);
    }
  }
  
  private handleTyping(data: TypingEvent): void {
    this.emit('typing_changed', data);
  }
  
  private handlePresence(data: PresenceEvent): void {
    this.presence.updateUser(data.userId, data.status);
    this.emit('presence_changed', data);
  }
  
  private handleDisconnect(): void {
    // Attempt reconnection
    this.reconnect();
  }
  
  private reconnect(): void {
    // Implement exponential backoff
    setTimeout(() => {
      this.websocket.connect();
    }, this.calculateBackoffDelay());
  }
}

// Message queue for offline support
class MessageQueue {
  private queue: Message[] = [];
  private storage: LocalStorage;
  
  constructor() {
    this.storage = new LocalStorage('chat_queue');
    this.loadFromStorage();
  }
  
  add(message: Message): void {
    this.queue.push(message);
    this.saveToStorage();
  }
  
  markSent(messageId: string): void {
    this.queue = this.queue.filter(msg => msg.id !== messageId);
    this.saveToStorage();
  }
  
  getPendingMessages(): Message[] {
    return [...this.queue];
  }
  
  private loadFromStorage(): void {
    const stored = this.storage.getItem('messages');
    if (stored) {
      this.queue = JSON.parse(stored);
    }
  }
  
  private saveToStorage(): void {
    this.storage.setItem('messages', JSON.stringify(this.queue));
  }
}

// Chat component
function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<TypingState>({});
  const [users, setUsers] = useState<User[]>([]);
  
  const chatManager = useRef(new ChatManager({
    wsUrl: '/ws',
    userId: 'current-user-id'
  }));
  
  useEffect(() => {
    const manager = chatManager.current;
    
    manager.on('message_received', (message: Message) => {
      if (message.roomId === roomId) {
        setMessages(prev => [...prev, message]);
      }
    });
    
    manager.on('typing_changed', (data: TypingEvent) => {
      if (data.roomId === roomId) {
        setTyping(prev => ({
          ...prev,
          [data.userId]: data.isTyping
        }));
      }
    });
    
    manager.on('presence_changed', (data: PresenceEvent) => {
      setUsers(prev => prev.map(user => 
        user.id === data.userId 
          ? { ...user, status: data.status }
          : user
      ));
    });
    
    // Join room
    manager.joinRoom(roomId);
    
    return () => {
      manager.leaveRoom(roomId);
    };
  }, [roomId]);
  
  const handleSendMessage = useCallback((content: string) => {
    chatManager.current.sendMessage(roomId, content);
  }, [roomId]);
  
  const handleTyping = useCallback((isTyping: boolean) => {
    chatManager.current.sendTyping(roomId, isTyping);
  }, [roomId]);
  
  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Room: {roomId}</h2>
        <UserList users={users} />
      </div>
      
      <div className="chat-messages">
        <MessageList messages={messages} />
        <TypingIndicator typing={typing} />
      </div>
      
      <div className="chat-input">
        <MessageInput
          onSend={handleSendMessage}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
}
```

## 🔥 Common Interview Questions

### Q1: How would you architect a dashboard with real-time updates?

**Answer:**
Design a scalable dashboard with WebSocket connections, efficient state management, and optimized rendering:

```typescript
interface DashboardArchitecture {
  dataLayer: {
    websocket: WebSocketManager;
    cache: DataCache;
    api: APIClient;
  };
  
  stateLayer: {
    metrics: MetricsState;
    widgets: WidgetState;
    layout: LayoutState;
  };
  
  uiLayer: {
    dashboard: DashboardContainer;
    widgets: WidgetComponents;
    charts: ChartComponents;
  };
}

class DashboardManager {
  private websocket: WebSocketManager;
  private cache: DataCache;
  private updateQueue: UpdateQueue;
  
  constructor(config: DashboardConfig) {
    this.websocket = new WebSocketManager(config.wsUrl);
    this.cache = new DataCache();
    this.updateQueue = new UpdateQueue();
    
    this.setupRealtimeUpdates();
  }
  
  private setupRealtimeUpdates(): void {
    this.websocket.on('metric_update', (update) => {
      this.updateQueue.add(update);
    });
    
    // Batch updates for performance
    setInterval(() => {
      this.processBatchedUpdates();
    }, 100);
  }
  
  private processBatchedUpdates(): void {
    const updates = this.updateQueue.flush();
    if (updates.length > 0) {
      this.cache.batchUpdate(updates);
      this.emit('dashboard_updated', updates);
    }
  }
}
```

### Q2: How do you handle micro-frontend architecture?

**Answer:**
Implement micro-frontend architecture with module federation, shared state, and independent deployments:

```typescript
interface MicrofrontendArchitecture {
  shell: {
    router: MicrofrontendRouter;
    orchestrator: AppOrchestrator;
    stateManager: SharedStateManager;
  };
  
  microfrontends: {
    products: ProductMicrofrontend;
    orders: OrderMicrofrontend;
    users: UserMicrofrontend;
  };
  
  shared: {
    components: SharedComponents;
    services: SharedServices;
    utils: SharedUtils;
  };
}

class MicrofrontendManager {
  private loader: MicrofrontendLoader;
  private communicator: MicrofrontendCommunicator;
  
  constructor() {
    this.loader = new MicrofrontendLoader();
    this.communicator = new MicrofrontendCommunicator();
  }
  
  async loadMicrofrontend(name: string): Promise<MicrofrontendModule> {
    const module = await this.loader.load(name);
    
    // Initialize communication
    this.communicator.register(name, module);
    
    return module;
  }
  
  sendMessage(target: string, message: any): void {
    this.communicator.send(target, message);
  }
}
```

### Q3: How do you implement offline-first architecture?

**Answer:**
Design offline-first with local storage, sync mechanisms, and conflict resolution:

```typescript
interface OfflineArchitecture {
  storage: {
    local: LocalStorageManager;
    indexed: IndexedDBManager;
    cache: CacheManager;
  };
  
  sync: {
    synchronizer: DataSynchronizer;
    conflictResolver: ConflictResolver;
    queue: SyncQueue;
  };
  
  state: {
    offline: OfflineState;
    sync: SyncState;
    conflicts: ConflictState;
  };
}

class OfflineManager {
  private storage: LocalStorageManager;
  private sync: DataSynchronizer;
  private conflicts: ConflictResolver;
  
  constructor() {
    this.storage = new LocalStorageManager();
    this.sync = new DataSynchronizer();
    this.conflicts = new ConflictResolver();
  }
  
  async saveData(key: string, data: any): Promise<void> {
    // Save locally immediately
    await this.storage.set(key, data);
    
    // Queue for sync when online
    this.sync.queueForSync(key, data);
  }
  
  async getData(key: string): Promise<any> {
    return await this.storage.get(key);
  }
  
  async syncWhenOnline(): Promise<void> {
    if (navigator.onLine) {
      await this.sync.syncAll();
    }
  }
}
```

### Q4: How do you optimize performance for large datasets?

**Answer:**
Implement virtualization, pagination, and efficient rendering:

```typescript
interface LargeDatasetArchitecture {
  virtualization: {
    virtualScroller: VirtualScrollManager;
    itemRenderer: ItemRenderer;
    bufferManager: BufferManager;
  };
  
  pagination: {
    paginationManager: PaginationManager;
    prefetcher: DataPrefetcher;
    cache: ResultCache;
  };
  
  optimization: {
    memoization: MemoizationManager;
    bundling: DataBundler;
    compression: DataCompressor;
  };
}

class LargeDatasetManager {
  private virtualScroller: VirtualScrollManager;
  private cache: ResultCache;
  private prefetcher: DataPrefetcher;
  
  constructor(config: DatasetConfig) {
    this.virtualScroller = new VirtualScrollManager(config.itemHeight);
    this.cache = new ResultCache();
    this.prefetcher = new DataPrefetcher();
  }
  
  renderLargeList(items: any[], containerHeight: number): VirtualizedList {
    return this.virtualScroller.render(items, containerHeight);
  }
  
  async loadPage(page: number): Promise<any[]> {
    const cached = this.cache.get(page);
    if (cached) return cached;
    
    const data = await this.fetchPage(page);
    this.cache.set(page, data);
    
    // Prefetch next pages
    this.prefetcher.prefetchPages([page + 1, page + 2]);
    
    return data;
  }
}
```

This comprehensive guide covers essential frontend system design patterns and real-world scenarios commonly encountered in Big Tech interviews. The key is demonstrating architectural thinking, understanding trade-offs, and providing scalable solutions.