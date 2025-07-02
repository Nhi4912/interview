# Networking Interview Preparation Guide

## Table of Contents

- [Core Concepts](#core-concepts)
- [Common Interview Questions](#common-interview-questions)
- [Advanced Topics](#advanced-topics)
- [Security](#security)
- [Performance](#performance)
- [Practice Problems](#practice-problems)

## Core Concepts

### HTTP Fundamentals

#### 1. HTTP Protocol

**Definition**: HyperText Transfer Protocol is the foundation of data communication on the World Wide Web.

**Key Characteristics**:

- Stateless protocol
- Request-response model
- Text-based protocol
- Client-server architecture

#### 2. HTTP Methods

**Definition**: Different types of requests that can be made to a server.

**Common Methods**:

- **GET**: Retrieve data (safe, idempotent)
- **POST**: Submit data (not safe, not idempotent)
- **PUT**: Replace resource (not safe, idempotent)
- **PATCH**: Partial update (not safe, not idempotent)
- **DELETE**: Remove resource (not safe, idempotent)
- **HEAD**: Get headers only (safe, idempotent)
- **OPTIONS**: Get allowed methods (safe, idempotent)

#### 3. HTTP Status Codes

**Definition**: Three-digit codes that indicate the result of an HTTP request.

**Categories**:

- **1xx (Informational)**: Request received, continuing process
- **2xx (Success)**: Request successfully received, understood, and accepted
- **3xx (Redirection)**: Further action needed to complete request
- **4xx (Client Error)**: Request contains bad syntax or cannot be fulfilled
- **5xx (Server Error)**: Server failed to fulfill valid request

**Common Status Codes**:

- 200 OK
- 201 Created
- 204 No Content
- 301 Moved Permanently
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

### Web APIs and Communication

#### 1. REST APIs

**Definition**: Representational State Transfer is an architectural style for designing networked applications.

**Principles**:

- Stateless
- Client-server separation
- Cacheable
- Uniform interface
- Layered system
- Code on demand (optional)

#### 2. GraphQL

**Definition**: Query language and runtime for APIs that provides a complete description of the data.

**Key Features**:

- Single endpoint
- Strong typing
- Introspection
- Real-time updates with subscriptions
- Over-fetching and under-fetching prevention

#### 3. WebSockets

**Definition**: Protocol providing full-duplex communication channels over a single TCP connection.

**Characteristics**:

- Bidirectional communication
- Real-time data transfer
- Lower latency than HTTP polling
- Persistent connection

## Common Interview Questions

### HTTP Questions

#### Q1: Explain the difference between HTTP/1.1 and HTTP/2

**Answer**:
**HTTP/1.1**:

- Single request per connection (with keep-alive)
- Head-of-line blocking
- Text-based protocol
- No header compression

**HTTP/2**:

- Multiplexed requests over single connection
- Binary protocol
- Header compression (HPACK)
- Server push capability
- Stream prioritization

#### Q2: What is CORS and how does it work?

**Answer**:
CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to different domains.

**How it works**:

1. Browser sends preflight OPTIONS request for complex requests
2. Server responds with CORS headers
3. Browser allows/denies the actual request based on CORS policy

**Common Headers**:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Credentials`

#### Q3: Explain the difference between cookies and localStorage

**Answer**:
**Cookies**:

- Sent with every HTTP request
- Limited size (~4KB)
- Can be httpOnly (not accessible via JavaScript)
- Can be secure (HTTPS only)
- Can have expiration dates

**localStorage**:

- Only accessible via JavaScript
- Larger storage capacity (~5-10MB)
- Never expires (until cleared)
- Same-origin policy
- No automatic transmission

#### Q4: What is the difference between GET and POST?

**Answer**:
**GET**:

- Used for retrieving data
- Parameters in URL
- Limited data size
- Cacheable
- Bookmarkable
- Idempotent

**POST**:

- Used for submitting data
- Parameters in request body
- Unlimited data size
- Not cacheable
- Not bookmarkable
- Not idempotent

### Advanced Questions

#### Q1: How does HTTPS work?

**Answer**:
HTTPS (HTTP Secure) uses TLS/SSL encryption:

1. **Handshake**: Client and server agree on encryption parameters
2. **Certificate Verification**: Client verifies server's identity
3. **Key Exchange**: Shared secret key is established
4. **Encrypted Communication**: All data is encrypted using the shared key

**Benefits**:

- Data confidentiality
- Data integrity
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
