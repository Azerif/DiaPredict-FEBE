# Routes Directory

This directory contains route components for handling authentication and navigation logic.

## Components

### ProtectedRoute.jsx
- **Purpose**: Protects routes that require user authentication
- **Usage**: Wraps around pages that need login (home, dashboard, history, education)
- **Behavior**: 
  - Shows loading spinner while checking authentication
  - Redirects to login if user is not authenticated
  - Renders protected content if user is authenticated

### PublicRoute.jsx
- **Purpose**: Handles public routes that should redirect authenticated users
- **Usage**: Wraps around login/register pages
- **Behavior**:
  - Redirects to home if user is already logged in
  - Renders public content if user is not authenticated

## Export
All route components are exported through `index.js` for clean imports:
```javascript
import { ProtectedRoute, PublicRoute } from './routes';
```
