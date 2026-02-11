# Bazzuca React Components

React component library for the Bazzuca social media management system. Built with TypeScript, React, and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/bazzuca-react.svg)](https://www.npmjs.com/package/bazzuca-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Client Management** - Manage multiple social media clients
- 🌐 **Social Network Integration** - Support for X, Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp, SMS, and Email
- 📅 **Post Scheduling** - Schedule posts with calendar view
- 📊 **Post Management** - Create, edit, and publish posts across multiple platforms
- 🎨 **Beautiful UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🔒 **Type-Safe** - Full TypeScript support
- ⚡ **Performance** - Optimized with React hooks and efficient state management

## Installation

```bash
npm install bazzuca-react
# or
yarn add bazzuca-react
# or
pnpm add bazzuca-react
```

### Peer Dependencies

Ensure you have these peer dependencies installed:

```bash
npm install react react-dom axios date-fns lucide-react
```

## Quick Start

### 1. Setup Provider

Wrap your app with the `BazzucaProvider`:

```tsx
import { BazzucaProvider } from 'bazzuca-react';
import 'bazzuca-react/styles';

function App() {
  return (
    <BazzucaProvider
      config={{
        apiUrl: 'https://api.yourdomain.com',
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${yourToken}`,
        },
        onError: (error) => {
          console.error('API Error:', error);
        },
      }}
    >
      <YourApp />
    </BazzucaProvider>
  );
}
```

### 2. Use Components

```tsx
import { ClientList, ClientModal, PostCalendar } from 'bazzuca-react';
import { useState } from 'react';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ClientList
        onEdit={(client) => console.log('Edit', client)}
        onCreate={() => setIsModalOpen(true)}
      />

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(client) => console.log('Saved', client)}
      />

      <PostCalendar
        month={12}
        year={2024}
        onPostClick={(post) => console.log('Post clicked', post)}
      />
    </div>
  );
}
```

## Components

### Client Components

#### ClientList

Display and manage clients.

```tsx
<ClientList
  onEdit={(client) => handleEdit(client)}
  onDelete={(clientId) => handleDelete(clientId)}
  onCreate={() => setModalOpen(true)}
  showCreateButton={true}
  className="my-4"
/>
```

**Props:**
- `onEdit?: (client: ClientInfo) => void` - Callback when edit is clicked
- `onDelete?: (clientId: number) => void` - Callback when delete is clicked
- `onCreate?: () => void` - Callback when create button is clicked
- `showCreateButton?: boolean` - Show/hide create button (default: true)
- `className?: string` - Additional CSS classes

#### ClientModal

Create or edit a client.

```tsx
<ClientModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  client={selectedClient} // undefined for new client
  onSave={(client) => handleSave(client)}
/>
```

**Props:**
- `isOpen: boolean` - Control modal visibility
- `onClose: () => void` - Callback when modal closes
- `client?: ClientInfo` - Client to edit (undefined for new)
- `onSave?: (client: ClientInfo) => void` - Callback when saved

### Social Network Components

#### SocialNetworkList

Display and manage social networks for a client.

```tsx
<SocialNetworkList
  clientId={selectedClientId}
  onEdit={(network) => handleEdit(network)}
  onDelete={(networkId) => handleDelete(networkId)}
  onCreate={() => setModalOpen(true)}
/>
```

#### SocialNetworkModal

Add or edit a social network.

```tsx
<SocialNetworkModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  clientId={clientId}
  network={selectedNetwork}
  onSave={(network) => handleSave(network)}
/>
```

### Post Components

#### PostList

Display posts in a table view.

```tsx
<PostList
  month={12}
  year={2024}
  clientId={selectedClientId}
  onEdit={(post) => handleEdit(post)}
  onPublish={(postId) => handlePublish(postId)}
  onView={(post) => handleView(post)}
/>
```

#### PostEditor

Create or edit a post.

```tsx
<PostEditor
  postId={postId} // undefined for new post
  initialData={{ clientId: 1, title: 'Draft post' }}
  onSave={(post) => handleSave(post)}
  onCancel={() => handleCancel()}
/>
```

#### PostViewer

View post details.

```tsx
<PostViewer
  postId={postId}
  onEdit={(post) => handleEdit(post)}
  onPublish={(postId) => handlePublish(postId)}
  onBack={() => goBack()}
/>
```

#### PostCalendar

Calendar view of scheduled posts.

```tsx
<PostCalendar
  month={12}
  year={2024}
  clientId={clientId}
  onPostClick={(post) => handlePostClick(post)}
/>
```

## Custom Hooks

### useClients

Manage clients with CRUD operations.

```tsx
import { useClients } from 'bazzuca-react';

function MyComponent() {
  const {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refreshClients,
  } = useClients();

  // Use clients data
}
```

### useSocialNetworks

Manage social networks for a client.

```tsx
import { useSocialNetworks } from 'bazzuca-react';

function MyComponent({ clientId }) {
  const {
    networks,
    loading,
    error,
    createNetwork,
    updateNetwork,
    deleteNetwork,
  } = useSocialNetworks(clientId);
}
```

### usePosts

Manage posts.

```tsx
import { usePosts } from 'bazzuca-react';

function MyComponent() {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    publishPost,
  } = usePosts(12, 2024); // month, year
}
```

## API Services

Direct API access for advanced use cases:

```tsx
import { useBazzuca } from 'bazzuca-react';

function MyComponent() {
  const { clientApi, socialNetworkApi, postApi } = useBazzuca();

  // Direct API calls
  const clients = await clientApi.listClients();
  const networks = await socialNetworkApi.listByClient(clientId);
  const posts = await postApi.listPostsByUser(month, year);
}
```

## Type Definitions

### Core Types

```typescript
interface ClientInfo {
  clientId: number;
  userId: number;
  name: string;
  socialNetworks: SocialNetworkEnum[];
}

interface SocialNetworkInfo {
  networkId: number;
  clientId: number;
  network: SocialNetworkEnum;
  url: string;
  user: string;
  password: string;
}

interface PostInfo {
  postId: number;
  networkId: number;
  clientId: number;
  scheduleDate: string;
  postType: PostTypeEnum;
  mediaUrl: string;
  title: string;
  status: PostStatusEnum;
  description: string;
  socialNetwork?: SocialNetworkInfo;
  client?: ClientInfo;
}
```

### Enums

```typescript
enum SocialNetworkEnum {
  X = 1,
  Instagram = 2,
  Facebook = 3,
  LinkedIn = 4,
  TikTok = 5,
  YouTube = 6,
  WhatsApp = 7,
  SMS = 8,
  Email = 9,
}

enum PostTypeEnum {
  Post = 1,
  Story = 2,
  Reel = 3,
}

enum PostStatusEnum {
  Draft = 1,
  Scheduled = 2,
  ScheduledOnNetwork = 3,
  Posted = 4,
  Canceled = 5,
}
```

## Styling

The package includes Tailwind CSS styles. Import them in your app:

```tsx
import 'bazzuca-react/styles';
```

Make sure your Tailwind config includes the package:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/bazzuca-react/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of config
};
```

## Configuration

### BazzucaConfig

```typescript
interface BazzucaConfig {
  apiUrl: string;              // Base API URL
  timeout?: number;            // Request timeout (default: 30000ms)
  headers?: Record<string, string>; // Custom headers (e.g., Authorization)
  onError?: (error: Error) => void; // Global error handler
}
```

### Authentication

Pass authentication tokens via headers:

```tsx
<BazzucaProvider
  config={{
    apiUrl: 'https://api.yourdomain.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }}
>
  {children}
</BazzucaProvider>
```

## Advanced Usage

### Custom Error Handling

```tsx
<BazzucaProvider
  config={{
    apiUrl: API_URL,
    onError: (error) => {
      // Custom error handling
      toast.error(error.message);
      logErrorToService(error);
    },
  }}
>
  {children}
</BazzucaProvider>
```

### Context Access

```tsx
import { useBazzuca } from 'bazzuca-react';

function MyComponent() {
  const {
    config,
    isLoading,
    error,
    setError,
    selectedClient,
    setSelectedClient,
  } = useBazzuca();

  return <div>{/* Your component */}</div>;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Rodrigo Landim

## Support

For issues and questions, please open an issue on the GitHub repository.
