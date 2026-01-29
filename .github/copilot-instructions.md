# Copilot Instructions for React Dashboard

## Architecture Overview

This is a React 18 + Vite dashboard application with Tailwind CSS. Component-driven architecture with clear separation of concerns:

- **Components**: Reusable UI elements in `src/components/` (Header, Sidebar, Card, Layout, ProtectedRoute, UserTable, UserAuditModal, BlockUserModal)
- **Pages**: Full-page views in `src/pages/` (Dashboard, Login, Users, NotFound)
- **Services**: API integration in `src/services/api.js` with axios and interceptors
- **Hooks**: Custom hooks in `src/hooks/` (useApi for data fetching, useAuth for authentication)
- **Context**: Global state in `src/context/` (AuthContext for user authentication)
- **Styles**: Tailwind CSS utility-first approach with custom color variables in `tailwind.config.js`
- **Routing**: React Router v6 for navigation with protected routes

## Key Development Workflows

### Setup & Installation
```bash
npm install                    # Install dependencies
npm run dev                    # Start Vite dev server (localhost:5173, auto-opens browser)
npm run build                  # Create production build (outputs to dist/)
npm run preview               # Preview production build locally
```

### Testing (Vitest)
```bash
npm test                       # Run test suite (watch mode by default)
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Generate coverage reports
```

### Code Quality
```bash
npm run lint                  # Run ESLint (checks .js, .jsx, .ts, .tsx)
npm run format               # Format code with Prettier (100 char line width)
```

## Project Conventions

### Component Structure
- **Functional components only**: Use React hooks (useState, useEffect, useCallback)
- **Component naming**: PascalCase (e.g., `Header`, `Sidebar`, `Card`)
- **File naming**: Match component name (e.g., `Header.jsx`)
- **Props destructuring**: Destructure props directly in function parameters
- **Custom hooks**: Prefix with `use` and place in `src/hooks/` (see `useApi` pattern)

### Styling Approach (Tailwind CSS)
- **Utility classes only**: Compose Tailwind utilities directly in className attribute
- **Custom colors**: Use theme colors from `tailwind.config.js` (primary, secondary, danger, warning)
- **Responsive**: Mobile-first with breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- **Spacing**: Use Tailwind spacing scale (gap, p, m, etc.)
- **Examples**: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">` for responsive grid
 (Axios)
- **Centralized**: All API calls in `src/services/api.js` organized by domain (usersService, dashboardService)
- **HTTP client**: Axios with request/response interceptors for auth tokens and error handling
- **Error handling**: Interceptors log errors; components handle with try-catch when calling services
- **Authentication**: Token stored in localStorage, auto-added to request headers via interceptor
- **Custom hook pattern**: `useApi(url)` hook returns `{ data, loading, error }` for async operations
- **Environment config**: API base URL from `.env.local` (`VITE_API_URL`)

### State Management Pattern
- **Global auth state**: AuthContext in `src/context/AuthContext.jsx` manages user login/logout
- **useAuth hook**: Custom hook to access auth state (user, loading, login, logout functions)
- **Protected routes**: ProtectedRoute component wraps routes requiring authentication
- **Local state**: Use useState for component-level state (forms, toggles, temporary UI state)
- **Session persistence**: User data stored in localStorage, restored on app reload
- **Data fetching**: Custom `useApi` hook encapsulates loading/error/data logic
- **Performance**: Memoize expensive computations and components

## Authentication Pattern

### AuthContext Setup
```javascript
// In src/context/AuthContext.jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Login/logout functions with localStorage persistence
  const login = async (email, password) => { /* ... */ };
  const logout = () => { /* clear localStorage and state */ };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Using Authentication in Components
```javascript
// In src/hooks/useAuth.js - access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// In any component:
const { user, login, logout } = useAuth();
if (user) return <p>Welcome, {user.name}</p>;
```

### Protected Routes
```javascript
// In src/components/ProtectedRoute.jsx - wrap routes
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  return children;
}

// Usage in App.jsx:
<Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
```

## Common Patterns & Examples

### Data Fetching with useApi Hook
```javascript
// In src/hooks/useApi.js - reusable pattern
export function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get(url).then(res => setData(res.data)).catch(err => setError(err.message));
  }, [url]);
  
  return { data, loading, error };
}

// Usage in components:
const MyComponent = () => {
  const { data, loading, error } = useApi('/api/users');
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data.name}</div>;
};
```

### Service Integration Pattern
```javascript
// In src/services/api.js - centralized API calls
export const usersService = {
  getAll: () => api.get('/users'),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
};

// In components - avoid direct axios calls:
const response = await usersService.getAll();
```

### Tailwind Grid Layouts
```jsx
// Responsive grid: 1 col mobile, 2 cols tablet, 4 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

### Conditional Rendering
- Simple: `{condition && <Component />}`
- Complex: Extract to separate component to avoid ternary nesting

## Integration Points

- **API Base URL**: `.env.local` → `VITE_API_URL` variable (see `.env.example`)
- **Authentication**: Token stored in localStorage, auto-injected via axios interceptor in `src/services/api.js`
- **Routing**: React Router in `src/App.jsx` - always wrap routes in `<Router>`
- **Sidebar Navigation**: Links defined in `src/components/Sidebar.jsx`, update to match new pages

## Before Creating New Code

1. Check `src/components/Card.jsx` or `Header.jsx` for reusable component patterns
2. For API calls: Add service method to appropriate category in `src/services/api.js` (usersService, dashboardService, etc.)
3. For data fetching in components: Use `useApi` hook or call service directly with try-catch
4. For new pages: Create in `src/pages/`, add route to `App.jsx`, add menu item to `Sidebar.jsx`
5. Run `npm run format && npm run lint` before committing

## Testing Expectations

- **Unit tests**: Test components, hooks, and utilities (Vitest + React Testing Library)
- **Test file location**: Colocate with source (e.g., `Card.test.jsx` next to `Card.jsx`)
- **Mocking**: Mock axios in API tests; use `vi.mock('src/services/api')`
- **Component tests**: Test user interactions and conditional renders, not implementation detailng
- Avoid inline ternaries for complex logic; extract to separate components
- Use `{condition && <Component />}` for simple boolean renders

## External Dependencies

Review `package.json` for current dependencies. Common patterns in dashboard projects:
- **React Router** (`react-router-dom`): Client-side routing
- **HTTP Client**: Axios or Fetch API for API calls
- **UI Library**: Material-UI, Chakra UI, or Shadcn/ui for components
- **State**: Redux Toolkit or Zustand for complex state
- **Charts**: Chart.js, Recharts, or Visx for data visualization

## Integration Points

- **API Endpoints**: Defined in `src/services/api.js` or `.env` configuration
- **Authentication**: Check `src/hooks/useAuth` or middleware for auth patterns
- **Environment Variables**: Use `.env.local` for local development, `.env.production` for builds

## Before Creating New Code

1. Check existing components in `src/components/` for similar implementations
2. Review `src/styles/` or component styling to match visual consistency
3. Verify API service patterns in `src/services/` before writing new fetch logic
4. Run `npm run lint` before committing to catch style violations early

## Testing Expectations

- **Unit tests**: Test individual components and utilities
- **Integration tests**: Test component interactions and data flows
- **Test file location**: Colocate with source files (e.g., `Component.test.jsx` next to `Component.jsx`)
- **Mocking**: Mock API calls and external dependencies in tests
