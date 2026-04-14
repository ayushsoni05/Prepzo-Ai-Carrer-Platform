# Prepzo AI Career Platform - Security Implementation Guide

## Overview

This document details the enterprise-grade security implementation for the Prepzo AI Career Platform. The security measures cover authentication, authorization, API protection, database security, file upload security, proctoring security, and AI API protection.

---

## 1. Authentication Security

### 1.1 JWT Access + Refresh Token System

**Configuration:** `backend/src/config/security.config.js`

| Token Type | Expiry | Storage | Purpose |
|------------|--------|---------|---------|
| Access Token | 15 minutes | HTTP-only cookie | API authentication |
| Refresh Token | 7 days | HTTP-only cookie + MongoDB | Token refresh |

**Features:**
- Token rotation on refresh (old token invalidated)
- Token family tracking to detect token theft
- Secure cookie flags: `httpOnly`, `secure`, `sameSite: 'strict'`
- Automatic token refresh via axios interceptor

**Files:**
- `backend/src/middleware/auth.middleware.js` - Token generation and verification
- `backend/src/models/RefreshToken.model.js` - Refresh token storage

### 1.2 Password Security

**Configuration:**
- Salt rounds: 12 (bcrypt)
- Password history: 5 previous passwords
- Account lockout: 5 failed attempts

**8-Parameter Strong Password Rule:**
| Parameter | Requirement |
|-----------|-------------|
| Minimum length | 8 characters |
| Maximum length | 128 characters |
| Uppercase | At least 1 |
| Lowercase | At least 1 |
| Numbers | At least 1 |
| Special characters | At least 1 (@$!%*?&) |
| No spaces | Enforced |
| Not common password | Checked against list |

**Files:**
- `backend/src/utils/passwordSecurity.js` - Password validation
- `backend/src/validators/schemas.js` - Zod validation schemas

### 1.3 Email Verification

**OTP Configuration:**
- Length: 6 digits
- Expiry: 10 minutes
- Max attempts: 3
- Resend delay: 60 seconds

**Files:**
- `backend/src/models/OTP.model.js` - OTP management

### 1.4 Account Lockout

| Failed Attempts | Lockout Duration |
|-----------------|------------------|
| 5 | 5 minutes |
| 10 | 30 minutes |
| 15+ | 24 hours |

---

## 2. Role-Based Authorization

### 2.1 User Roles

| Role | Permissions |
|------|-------------|
| student | Basic access, own data |
| admin | User management, analytics |
| superadmin | Full system access |

### 2.2 Authorization Middleware

**Files:**
- `backend/src/middleware/authorization.middleware.js`

**Usage:**
```javascript
// Require specific role
router.get('/admin/users', protect, requireRole('admin'), handler);

// Require specific permission
router.delete('/user/:id', protect, requirePermission('delete_user'), handler);

// Prevent IDOR (Insecure Direct Object Reference)
router.put('/user/:id', protect, preventIDOR('id'), handler);
```

---

## 3. Backend API Security

### 3.1 Security Headers (Helmet)

**Configuration:** `backend/src/middleware/security.middleware.js`

| Header | Value |
|--------|-------|
| Content-Security-Policy | Strict CSP |
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| Strict-Transport-Security | max-age=31536000 |
| Referrer-Policy | strict-origin-when-cross-origin |

### 3.2 Rate Limiting

**Configuration:** `backend/src/middleware/rateLimit.middleware.js`

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 15 minutes |
| Authentication | 5 requests | 15 minutes |
| Registration | 3 requests | 1 hour |
| AI Endpoints | 10 requests | 1 minute |
| File Upload | 10 requests | 1 hour |

### 3.3 Input Validation (Zod)

**Files:**
- `backend/src/validators/schemas.js`

**Validated Endpoints:**
- POST /auth/register
- POST /auth/login
- POST /auth/change-password
- PUT /users/profile

### 3.4 CORS Configuration

```javascript
{
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-CSRF-Token'],
  maxAge: 86400
}
```

### 3.5 NoSQL Injection Prevention

All request inputs are sanitized to remove MongoDB operators:
- `$gt`, `$lt`, `$ne`, `$regex`, etc.

### 3.6 XSS Prevention

- Input sanitization removes `<script>` tags and event handlers
- Output encoding in responses
- CSP headers prevent inline scripts

---

## 4. Database Security

### 4.1 Mongoose Security

- Strict schema validation
- Index optimization for queries
- TTL indexes for automatic data expiration

### 4.2 Field-Level Encryption

**Files:**
- `backend/src/utils/encryption.js`

**Algorithm:** AES-256-GCM

**Encrypted Fields:**
- Proctoring recordings paths
- Device fingerprints
- Sensitive user data

### 4.3 Password Hashing

- Algorithm: bcrypt
- Salt rounds: 12
- Automatic hashing on save

---

## 5. File Upload Security

### 5.1 Configuration

**Files:**
- `backend/src/routes/upload.routes.js`

| Setting | Value |
|---------|-------|
| Max file size | 5 MB |
| Allowed types | PDF, DOC, DOCX |
| Files per request | 1 |

### 5.2 Security Features

- **MIME type validation** - Checks Content-Type header
- **Extension validation** - Verifies extension matches MIME
- **Magic byte verification** - Reads file header bytes
- **Secure filename generation** - Random UUID + timestamp
- **Blocked extensions** - .exe, .js, .php, etc.
- **Rate limiting** - 10 uploads per hour
- **Audit logging** - All uploads logged

### 5.3 File Storage

- Files stored outside web root
- Unique filenames prevent path traversal
- Old files deleted on replacement

---

## 6. Proctoring Security

### 6.1 Data Protection

**Files:**
- `backend/src/models/ProctoringSession.model.js`

| Feature | Implementation |
|---------|----------------|
| Consent tracking | IP, timestamp, user agent |
| Recording encryption | AES-256-GCM |
| Auto-delete | 30 days TTL index |
| Violation logging | Categorized and timestamped |

### 6.2 Integrity Scoring

Proctoring sessions calculate an integrity score (0-100):
- Deduct 15 points per critical violation
- Deduct 5 points per warning
- Deduct 10-15 points for integrity flag failures

### 6.3 Privacy Features

- User consent required before recording
- Data retention limited to 30 days
- Encrypted storage for recordings
- Admin-only access to session data

---

## 7. AI API Security

### 7.1 Protection Middleware

**Files:**
- `backend/src/middleware/aiSecurity.middleware.js`

**Features:**
- Rate limiting per user
- Request validation
- Prompt injection detection
- API key protection
- Usage logging

### 7.2 Prompt Injection Prevention

Blocked patterns:
- "ignore previous instructions"
- "disregard all instructions"
- "you are now a different AI"
- "bypass restrictions"

### 7.3 API Key Protection

- Keys never exposed to client
- Response sanitization removes leaked keys
- Audit logging of all AI requests

---

## 8. Frontend Security

### 8.1 HTTP-Only Cookie Authentication

**Files:**
- `frontend/src/api/axios.ts`

**Features:**
- `withCredentials: true` for cookie handling
- Automatic token refresh on 401
- CSRF token in headers
- Request ID for tracing

### 8.2 Token Refresh Flow

```
1. Request fails with 401
2. Queue subsequent requests
3. Call /auth/refresh
4. Retry all queued requests
5. If refresh fails, redirect to login
```

### 8.3 State Management

**Files:**
- `frontend/src/store/authStore.ts`

**Features:**
- Non-sensitive data persisted
- Session management
- Email verification support
- Password change support

---

## 9. Audit Logging

### 9.1 Logged Events

**Files:**
- `backend/src/models/AuditLog.model.js`

| Category | Events |
|----------|--------|
| auth | login_success, login_failed, logout, token_refresh |
| security | rate_limit_exceeded, brute_force_detected, injection_attempt |
| data | profile_update, file_upload, file_delete |
| admin | user_role_change, user_status_change |
| ai | ai_api_request, ai_rate_limit_exceeded |

### 9.2 Log Fields

- User ID and email
- Action and category
- Severity (low, medium, high, critical)
- IP address and user agent
- Timestamp
- Custom metadata

---

## 10. Environment Variables

**Required Environment Variables:**

```env
# Server
NODE_ENV=production
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/prepzo

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Encryption
ENCRYPTION_KEY=your-32-byte-encryption-key-here

# CORS
FRONTEND_URL=https://your-domain.com

# Email (for OTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

---

## 11. Security Checklist

### Pre-Deployment

- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique secrets (32+ characters)
- [ ] Enable HTTPS only
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting in reverse proxy
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Set up log aggregation
- [ ] Enable HTTPS redirect
- [ ] Test all security middleware

### Post-Deployment

- [ ] Monitor audit logs regularly
- [ ] Review rate limit violations
- [ ] Check for failed login attempts
- [ ] Rotate secrets periodically
- [ ] Update dependencies
- [ ] Perform security audits

---

## 12. API Endpoints

### Authentication Endpoints

| Method | Endpoint | Rate Limit | Description |
|--------|----------|------------|-------------|
| POST | /auth/register | 3/hour | User registration |
| POST | /auth/login | 5/15min | User login |
| POST | /auth/refresh | 10/min | Token refresh |
| POST | /auth/logout | - | Single device logout |
| POST | /auth/logout-all | - | All devices logout |
| POST | /auth/verify-email | 5/15min | Email OTP verification |
| POST | /auth/resend-otp | 3/hour | Resend verification OTP |
| POST | /auth/forgot-password | 3/hour | Request password reset |
| POST | /auth/reset-password | 3/hour | Reset password with token |
| POST | /auth/change-password | 3/hour | Change password |
| GET | /auth/me | - | Get current user |
| GET | /auth/sessions | - | Get active sessions |

---

## 13. Troubleshooting

### Common Issues

**1. CORS Errors**
- Verify `FRONTEND_URL` matches your domain
- Check that credentials are enabled on both ends

**2. Token Refresh Loops**
- Clear cookies and localStorage
- Check refresh token is valid in database

**3. Rate Limiting Too Strict**
- Adjust limits in `security.config.js`
- Check for multiple users behind same IP

**4. File Upload Failures**
- Verify file is under 5MB
- Check MIME type is allowed
- Ensure magic bytes match

---

## 14. Security Updates Log

| Date | Version | Changes |
|------|---------|---------|
| 2024-01 | 1.0.0 | Initial security implementation |

---

## Contact

For security concerns or vulnerability reports, contact: security@prepzo.com
