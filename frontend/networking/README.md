# Networking Interview Preparation

## Core Concepts

### HTTP Fundamentals

- **HTTP Methods**: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- **Status Codes**: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error)
- **Headers**: Request/Response headers, content negotiation, caching
- **Request/Response Cycle**: How HTTP communication works
- **Stateless Nature**: Each request is independent

### HTTPS & Security

- **SSL/TLS**: Encryption protocols
- **Certificates**: Digital certificates and validation
- **Mixed Content**: HTTP/HTTPS security issues
- **CORS**: Cross-Origin Resource Sharing
- **Security Headers**: CSP, HSTS, X-Frame-Options

### Web APIs

- **REST APIs**: Representational State Transfer
- **GraphQL**: Query language for APIs
- **WebSockets**: Real-time bidirectional communication
- **Server-Sent Events**: One-way real-time updates
- **gRPC**: High-performance RPC framework

## Advanced Topics

### Network Performance

- **HTTP/2**: Multiplexing, server push, header compression
- **HTTP/3**: QUIC protocol, improved performance
- **CDN**: Content Delivery Networks
- **Caching Strategies**: Browser, CDN, application caching
- **Compression**: Gzip, Brotli, compression optimization

### Browser Networking

- **Connection Limits**: Browser connection pooling
- **Resource Hints**: Preload, prefetch, preconnect
- **Service Workers**: Offline capabilities, caching
- **Progressive Web Apps**: Network-independent apps

## Common Interview Questions & Answers

### HTTP Questions

**Q: Explain the difference between HTTP and HTTPS.**
A:

- **HTTP**: Unencrypted, data sent in plain text, vulnerable to interception
- **HTTPS**: Encrypted using SSL/TLS, secure communication, requires certificate
- **Ports**: HTTP uses port 80, HTTPS uses port 443
- **Security**: HTTPS provides confidentiality, integrity, and authentication

**Q: What are the main HTTP methods and when would you use each?**
A:

- **GET**: Retrieve data (idempotent, cacheable)
- **POST**: Create new resource (not idempotent, not cacheable)
- **PUT**: Update entire resource (idempotent)
- **PATCH**: Partial update (not idempotent)
- **DELETE**: Remove resource (idempotent)
- **HEAD**: Get headers only (idempotent, cacheable)
- **OPTIONS**: Get allowed methods

**Q: Explain HTTP status codes 200, 201, 400, 401, 403, 404, 500.**
A:

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Client error in request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### CORS Questions

**Q: What is CORS and why is it needed?**
A: CORS (Cross-Origin Resource Sharing) is a security feature that controls which domains can access resources from your domain. It prevents malicious websites from making requests to your API on behalf of users.

**Q: How do you handle CORS in a web application?**
A:

```javascript
// Server-side (Node.js/Express)
app.use(
  cors({
    origin: ["https://yourdomain.com", "https://app.yourdomain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Client-side
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Include cookies
  body: JSON.stringify(data),
});
```

### WebSocket Questions

**Q: When would you use WebSockets instead of HTTP?**
A: Use WebSockets for:

- Real-time applications (chat, gaming, live updates)
- Bidirectional communication
- Low-latency requirements
- Persistent connections
- Server push notifications

**Q: How do you implement a WebSocket connection?**
A:

```javascript
// Client-side
const socket = new WebSocket("wss://api.example.com/ws");

socket.onopen = function (event) {
  console.log("Connected to WebSocket");
  socket.send(JSON.stringify({ type: "join", room: "chat" }));
};

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};

socket.onclose = function (event) {
  console.log("Disconnected from WebSocket");
};

// Server-side (Node.js with ws library)
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);
    // Handle message
    ws.send(JSON.stringify({ type: "response", data: "processed" }));
  });
});
```

## Advanced Interview Questions

**Q: How does HTTP/2 improve performance over HTTP/1.1?**
A: HTTP/2 improvements:

- **Multiplexing**: Multiple requests over single connection
- **Server Push**: Server can push resources proactively
- **Header Compression**: HPACK compression for headers
- **Binary Protocol**: More efficient than text-based HTTP/1.1
- **Stream Prioritization**: Prioritize important resources

**Q: Explain the difference between REST and GraphQL.**
A:
**REST**:

- Multiple endpoints for different resources
- Over-fetching/under-fetching issues
- Stateless, cacheable
- Simple to implement

**GraphQL**:

- Single endpoint for all data
- Precise data fetching
- Strong typing system
- Introspection capabilities

**Q: How would you implement request caching in a frontend application?**
A:

{% raw %}
```javascript
class RequestCache {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutes
  }

  async get(url, options = {}) {
    const key = this.generateKey(url, options);
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.maxAge) {
      return cached.data;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  generateKey(url, options) {
    return `${url}-${JSON.stringify(options)}`;
  }

  clear() {
    this.cache.clear();
  }
}
```
{% endraw %}

## Practical Problems & Solutions

### Problem 1: Implement a Retry Mechanism

**Challenge**: Create a function that retries failed HTTP requests with exponential backoff.

{% raw %}
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Usage
try {
  const response = await fetchWithRetry("https://api.example.com/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: "test" }),
  });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error("Request failed after retries:", error);
}
```
{% endraw %}

### Problem 2: Create a Request Queue

**Challenge**: Implement a queue system to limit concurrent requests and prevent overwhelming the server.

```javascript
class RequestQueue {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        requestFn,
        resolve,
        reject,
      });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { requestFn, resolve, reject } = this.queue.shift();

    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }

  getStats() {
    return {
      running: this.running,
      queued: this.queue.length,
      maxConcurrent: this.maxConcurrent,
    };
  }
}

// Usage
const queue = new RequestQueue(2);

// Add requests to queue
const promises = [
  queue.add(() => fetch("https://api.example.com/data1")),
  queue.add(() => fetch("https://api.example.com/data2")),
  queue.add(() => fetch("https://api.example.com/data3")),
  queue.add(() => fetch("https://api.example.com/data4")),
];

const results = await Promise.all(promises);
console.log("All requests completed");
```

### Problem 3: Implement Request/Response Interceptors

**Challenge**: Create a system to intercept and modify HTTP requests and responses.

{% raw %}
```javascript
class HttpClient {
  constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async request(url, options = {}) {
    // Apply request interceptors
    let modifiedOptions = { ...options };
    for (const interceptor of this.requestInterceptors) {
      modifiedOptions = await interceptor(url, modifiedOptions);
    }

    // Make the request
    let response = await fetch(url, modifiedOptions);

    // Apply response interceptors
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    return response;
  }

  async get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  }
}

// Usage
const client = new HttpClient();

// Add authentication interceptor
client.addRequestInterceptor(async (url, options) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return options;
});

// Add error handling interceptor
client.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response;
});

// Use the client
try {
  const response = await client.get("https://api.example.com/user");
  const user = await response.json();
  console.log(user);
} catch (error) {
  console.error("Request failed:", error);
}
```
{% endraw %}

### Problem 4: Create a WebSocket Manager

**Challenge**: Build a WebSocket manager that handles reconnection, message queuing, and event handling.

```javascript
class WebSocketManager {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      reconnectAttempts: 5,
      reconnectInterval: 1000,
      heartbeatInterval: 30000,
      ...options
    };

    this.socket = null;
    this.reconnectCount = 0;
    this.messageQueue = [];
    this.eventListeners = new Map();
    this.isConnecting = false;
    this.heartbeatTimer = null;
  }

  connect() {
    if (this.isConnecting || this.socket?.readyState === WebSocket.OPEN) {
      return;
    }

    this.isConnecting = true;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.isConnecting = false;
      this.reconnectCount = 0;
      this.startHeartbeat();
      this.flushMessageQueue();
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      this.stopHeartbeat();
      this.emit('disconnect', event);

      if (!event.wasClean && this.reconnectCount < this.options.reconnectAttempts) {
        this.scheduleReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnect');
    }
  }

  send(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      this.messageQueue.push(data);
    }
  }

  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  off(event, callback) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  private handleMessage(data) {
    if (data.type === 'pong') {
      // Heartbeat response
      return;
    }

    this.emit('message', data);
    this.emit(data.type, data);
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.send(message);
    }
  }

  private scheduleReconnect() {
    this.reconnectCount++;
    const delay = this.options.reconnectInterval * Math.pow(2, this.reconnectCount - 1);

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.options.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

// Usage
const ws = new WebSocketManager('wss://api.example.com/ws');

ws.on('connect', () => {
  console.log('Connected to WebSocket');
});

ws.on('message', (data) => {
  console.log('Received message:', data);
});

ws.on('chat', (data) => {
  console.log('Chat message:', data.message);
});

ws.on('disconnect', () => {
  console.log('Disconnected from WebSocket');
});

ws.connect();

// Send a message
ws.send({ type: 'chat', message: 'Hello, world!' });
```

### Problem 5: Implement API Rate Limiting

**Challenge**: Create a client-side rate limiter to prevent exceeding API rate limits.

{% raw %}
```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async throttle(requestFn) {
    const now = Date.now();

    // Remove expired requests
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
    return requestFn();
  }

  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );
    return this.maxRequests - this.requests.length;
  }
}

// Usage
const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

async function makeApiCall(endpoint) {
  return rateLimiter.throttle(async () => {
    const response = await fetch(`https://api.example.com/${endpoint}`);
    return response.json();
  });
}

// Make multiple API calls
const promises = [
  makeApiCall("users"),
  makeApiCall("posts"),
  makeApiCall("comments"),
  // ... more calls
];

const results = await Promise.all(promises);
console.log("API calls completed");
```
{% endraw %}

## Network Optimization Techniques

### Resource Hints

```html
<!-- Preload critical resources -->
<link rel="preload" href="/critical.css" as="style" />
<link rel="preload" href="/main.js" as="script" />

<!-- Prefetch non-critical resources -->
<link rel="prefetch" href="/next-page.js" />

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.example.com" />
```

### Service Worker Caching

```javascript
// Service Worker for caching
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/styles/main.css",
        "/scripts/main.js",
        "/images/logo.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### HTTP/2 Server Push

```javascript
// Server-side (Node.js with http2)
const http2 = require("http2");
const fs = require("fs");

const server = http2.createSecureServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
});

server.on("stream", (stream, headers) => {
  if (headers[":path"] === "/") {
    // Push critical resources
    stream.pushStream(
      { ":path": "/styles/critical.css" },
      (err, pushStream) => {
        pushStream.respondWithFile("/styles/critical.css");
      }
    );

    stream.pushStream({ ":path": "/scripts/main.js" }, (err, pushStream) => {
      pushStream.respondWithFile("/scripts/main.js");
    });

    stream.respondWithFile("/index.html");
  }
});
```

## Best Practices

### Security

- Always use HTTPS in production
- Implement proper CORS policies
- Validate and sanitize all inputs
- Use security headers (CSP, HSTS, etc.)
- Implement rate limiting
- Use authentication tokens

### Performance

- Minimize HTTP requests
- Use CDNs for static assets
- Implement proper caching strategies
- Compress responses (Gzip/Brotli)
- Use HTTP/2 when possible
- Optimize images and assets

### Error Handling

- Implement proper error boundaries
- Use exponential backoff for retries
- Provide meaningful error messages
- Log errors for debugging
- Handle network timeouts

## Resources

### Documentation

- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [MDN Web Docs - WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [HTTP/2 Specification](https://http2.github.io/http2-spec/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### Tools

- [Postman](https://www.postman.com/) - API testing
- [WebSocket King](https://websocketking.com/) - WebSocket testing
- [HTTP/2 Test](https://tools.keycdn.com/http2-test) - HTTP/2 support check
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL/TLS testing

### Practice Platforms

- [HTTPbin](https://httpbin.org/) - HTTP testing
- [WebSocket Echo Test](https://www.websocket.org/echo.html)
- [REST API Testing](https://jsonplaceholder.typicode.com/)

---

_This guide covers essential networking concepts for frontend interviews, including practical problems and advanced techniques commonly asked at Big Tech companies._

- Server authentication
- Protection against man-in-the-middle attacks

#### Q2: Explain the difference between TCP and UDP

**Answer**:
**TCP (Transmission Control Protocol)**:

- Connection-oriented
- Reliable delivery
- Ordered delivery
- Error checking
- Flow control
- Used for: HTTP, HTTPS, FTP, SMTP

**UDP (User Datagram Protocol)**:

- Connectionless
- Unreliable delivery
- No ordering guarantee
- No flow control
- Lower overhead
- Used for: DNS, DHCP, streaming, gaming

#### Q3: What is a CDN and how does it work?

**Answer**:
CDN (Content Delivery Network) is a distributed network of servers that deliver content based on geographic location.

**How it works**:

1. User requests content
2. DNS resolves to nearest CDN server
3. CDN server serves cached content
4. If not cached, fetches from origin server

**Benefits**:

- Reduced latency
- Reduced bandwidth costs
- Improved availability
- DDoS protection

#### Q4: Explain the difference between REST and GraphQL

**Answer**:
**REST**:

- Multiple endpoints
- Fixed data structure
- Over-fetching/under-fetching possible
- Stateless
- Cacheable

**GraphQL**:

- Single endpoint
- Flexible queries
- Precise data fetching
- Strong typing
- Introspection

## Advanced Topics

### Modern Web Protocols

#### 1. HTTP/3

**Definition**: Latest HTTP version using QUIC protocol over UDP.

**Features**:

- Multiplexing without head-of-line blocking
- Connection migration
- 0-RTT handshake
- Better performance on unreliable networks

#### 2. WebRTC

**Definition**: Web Real-Time Communication for peer-to-peer communication.

**Use Cases**:

- Video/audio calling
- File sharing
- Screen sharing
- Gaming

#### 3. Server-Sent Events (SSE)

**Definition**: Technology for pushing data from server to client over HTTP.

**Characteristics**:

- One-way communication (server to client)
- Automatic reconnection
- Built-in event types
- Simple implementation

### API Design Patterns

#### 1. RESTful Design

**Principles**:

- Use nouns, not verbs in URLs
- Use HTTP methods appropriately
- Return appropriate status codes
- Use plural nouns for collections
- Implement proper error handling

**Example**:

```
GET /api/users          # Get all users
GET /api/users/123      # Get specific user
POST /api/users         # Create user
PUT /api/users/123      # Update user
DELETE /api/users/123   # Delete user
```

#### 2. GraphQL Schema Design

**Best Practices**:

- Use descriptive field names
- Implement proper pagination
- Use input types for mutations
- Implement proper error handling
- Use fragments for reusable fields

## Security

### Common Security Issues

#### 1. XSS (Cross-Site Scripting)

**Definition**: Attack where malicious scripts are injected into trusted websites.

**Prevention**:

- Input validation and sanitization
- Output encoding
- Content Security Policy (CSP)
- HttpOnly cookies

#### 2. CSRF (Cross-Site Request Forgery)

**Definition**: Attack that forces users to perform unwanted actions.

**Prevention**:

- CSRF tokens
- SameSite cookie attribute
- Custom headers
- Double submit cookies

#### 3. SQL Injection

**Definition**: Attack where malicious SQL code is inserted into queries.

**Prevention**:

- Parameterized queries
- Input validation
- Least privilege principle
- ORM usage

### Authentication & Authorization

#### 1. JWT (JSON Web Tokens)

**Definition**: Compact, URL-safe means of representing claims between parties.

**Structure**:

- Header (algorithm, token type)
- Payload (claims)
- Signature (verification)

**Best Practices**:

- Keep tokens small
- Set appropriate expiration
- Use HTTPS
- Validate on server side

#### 2. OAuth 2.0

**Definition**: Authorization framework for third-party applications.

**Flows**:

- Authorization Code
- Implicit
- Client Credentials
- Resource Owner Password

## Performance

### Optimization Techniques

#### 1. HTTP/2 Optimization

- Use server push for critical resources
- Minimize round trips
- Optimize header compression
- Use appropriate stream prioritization

#### 2. Caching Strategies

- Browser caching
- CDN caching
- Application-level caching
- Database caching

#### 3. Compression

- Gzip compression
- Brotli compression
- Image optimization
- Minification

## Practice Problems

### Problem 1: Design a REST API

Design a REST API for a social media platform with users, posts, and comments.

### Problem 2: Implement Authentication

Build a JWT-based authentication system with refresh tokens.

### Problem 3: Create a Real-time Chat

Implement a WebSocket-based chat application with rooms and private messages.

### Problem 4: Design a CDN Strategy

Plan a CDN implementation for a global e-commerce platform.

### Problem 5: Build a GraphQL API

Create a GraphQL API for a blog platform with nested queries and mutations.

### Problem 6: Implement CORS

Set up proper CORS configuration for a multi-domain application.

### Problem 7: Design a Rate Limiting System

Implement rate limiting for API endpoints with different tiers.

### Problem 8: Create a WebRTC Application

Build a peer-to-peer video calling application using WebRTC.

---

_This guide covers essential networking concepts for frontend interviews at Big Tech companies. Focus on understanding HTTP fundamentals, security best practices, and modern web protocols._
