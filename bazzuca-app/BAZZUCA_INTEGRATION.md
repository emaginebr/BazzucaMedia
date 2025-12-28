# BazzucaMedia Integration - bazzuca-app

This document describes the integration of the `bazzuca-react` package into the `bazzuca-app` application.

## 📦 Package Installation

The `bazzuca-react` package was installed using the `--legacy-peer-deps` flag due to React version conflicts:

```bash
npm install bazzuca-react --legacy-peer-deps
```

## ⚙️ Configuration

### Environment Variables

Added to `.env`:
```env
VITE_BAZZUCA_API_URL=http://localhost:5000
```

Added to `.env.example`:
```env
VITE_BAZZUCA_API_URL=http://localhost:5000
```

### Routes Configuration

Added to `src/lib/constants.ts`:
```typescript
// BazzucaMedia Routes
CLIENTS: '/clients',
POSTS: '/posts',
POSTS_NEW: '/posts/new',
POSTS_EDIT: (id: number) => `/posts/edit/${id}`,
POSTS_VIEW: (id: number) => `/posts/view/${id}`,
CALENDAR: '/calendar',
```

## 🔧 App Configuration

### Provider Setup

Updated `src/App.tsx` to include the `BazzucaMediaProvider`:

```typescript
import { BazzucaMediaProvider } from 'bazzuca-react';
import 'bazzuca-react/styles';

// Inside component:
<BazzucaMediaProvider
  config={{
    apiUrl: import.meta.env.VITE_BAZZUCA_API_URL,
  }}
>
  {/* Application content */}
</BazzucaMediaProvider>
```

### Routing

Added protected routes for all BazzucaMedia pages:
- `/clients` - ClientsPage
- `/posts` - PostsPage
- `/posts/new` - PostEditPage (create mode)
- `/posts/edit/:id` - PostEditPage (edit mode)
- `/posts/view/:id` - PostViewPage
- `/calendar` - CalendarPage

## 📄 Pages Created

### 1. ClientsPage (`src/pages/ClientsPage.tsx`)
- Lists all clients using `ClientList` component
- Opens `ClientModal` for create/edit operations
- Integrates with `useClients` hook for data management

### 2. PostsPage (`src/pages/PostsPage.tsx`)
- Displays posts in list or calendar view
- Filters by client and month/year
- Uses `PostList` and `PostCalendar` components
- Navigation to create, edit, and view post pages

### 3. PostEditPage (`src/pages/PostEditPage.tsx`)
- Creates and edits posts using `PostEditor` component
- Handles save and cancel operations
- Redirects to posts list after saving

### 4. PostViewPage (`src/pages/PostViewPage.tsx`)
- Displays post details using `PostViewer` component
- Allows editing and publishing posts
- Shows all post information including media

### 5. CalendarPage (`src/pages/CalendarPage.tsx`)
- Full-screen calendar view using `PostCalendar` component
- Month navigation with previous/next controls
- Client filtering
- Click on posts to view details

## 🎨 Navigation

Updated `src/components/Navbar.tsx` to include BazzucaMedia dropdown menu:

```typescript
<div className="relative" ref={bazzucaMenuRef}>
  <button onClick={() => setBazzucaMenuOpen(!bazzucaMenuOpen)}>
    <MessageSquare className="w-4 h-4" />
    BazzucaMedia
    <ChevronDown />
  </button>
  
  {bazzucaMenuOpen && (
    <div className="dropdown-menu">
      <Link to={ROUTES.CLIENTS}>
        <Users className="w-4 h-4" />
        Clients
      </Link>
      <Link to={ROUTES.POSTS}>
        <MessageSquare className="w-4 h-4" />
        Posts
      </Link>
      <Link to={ROUTES.CALENDAR}>
        <Calendar className="w-4 h-4" />
        Calendar
      </Link>
    </div>
  )}
</div>
```

## 🎯 Features Available

### Client Management
- ✅ List all clients
- ✅ Create new clients
- ✅ Edit existing clients
- ✅ Delete clients
- ✅ View client details

### Social Network Management
- ✅ List networks per client (via ClientList)
- ✅ Create new social networks
- ✅ Edit existing networks
- ✅ Delete networks

### Post Management
- ✅ List posts with filters
- ✅ Create new posts
- ✅ Edit existing posts
- ✅ View post details
- ✅ Publish posts
- ✅ Schedule posts
- ✅ Calendar view
- ✅ Upload media (images/videos)
- ✅ Multiple social networks per post

## 🚀 Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Notes

- All pages follow the existing app pattern (NAuth/NNews structure)
- Protected routes require authentication
- Toast notifications for user feedback
- Dark mode support included
- Responsive design for all screen sizes
- TypeScript strict mode compliant

## 🔗 Dependencies

Main dependencies added with bazzuca-react:
- `axios` - HTTP client
- `date-fns` - Date manipulation
- `lucide-react` - Icons
- `@radix-ui/*` - UI primitives (from shadcn/ui)

## ✅ Integration Checklist

- [x] Package installed
- [x] Environment variables configured
- [x] Provider added to App.tsx
- [x] Routes configured
- [x] All pages created
- [x] Navigation menu updated
- [x] TypeScript errors resolved
- [x] Development server running
- [x] No compilation errors

## 🎉 Result

The BazzucaMedia social media management system is now fully integrated into the bazzuca-app, following the same patterns as the existing NAuth and NNews modules. All features are accessible through the navigation menu and fully functional.
