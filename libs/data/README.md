# Data Library

This library provides React components and utilities for data management in the SwissDev Tracker application.

## Components

### DataProvider

A React context provider that manages data state using useReducer. Provides CRUD operations for data items.

```tsx
import { DataProvider } from '@swissdev-tracker/data';

function App() {
  return <DataProvider>{/* Your app components */}</DataProvider>;
}
```

### DataList

A component for displaying a list of data items with optional actions.

```tsx
import { DataList, useData } from '@swissdev-tracker/data';

function MyComponent() {
  const { deleteItem } = useData();

  const handleDelete = (item) => {
    if (confirm(`Delete ${item.name}?`)) {
      deleteItem(item.id);
    }
  };

  return <DataList onEdit={(item) => console.log('Edit:', item)} onDelete={handleDelete} onItemClick={(item) => console.log('View:', item)} />;
}
```

### DataForm

A form component for creating and editing data items.

```tsx
import { DataForm } from '@swissdev-tracker/data';

function MyComponent() {
  const [editingItem, setEditingItem] = useState(null);

  return <DataForm item={editingItem} onSubmit={() => setEditingItem(null)} onCancel={() => setEditingItem(null)} />;
}
```

## Utilities

### Data Functions

- `formatDate(date)` - Format a date for display
- `formatDateTime(date)` - Format a date and time for display
- `generateId()` - Generate a unique ID
- `sortByDate(items, descending)` - Sort items by creation date
- `filterByName(items, searchTerm)` - Filter items by name
- `groupByProperty(items, property)` - Group items by a property

```tsx
import { formatDate, sortByDate, filterByName } from '@swissdev-tracker/data';

const formattedDate = formatDate(new Date());
const sortedItems = sortByDate(myItems);
const filteredItems = filterByName(myItems, 'search term');
```

## Types

### DataItem

```typescript
interface DataItem {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### DataState

```typescript
interface DataState {
  items: DataItem[];
  loading: boolean;
  error: string | null;
}
```

## Running unit tests

Run `nx test data` to execute the unit tests via [Vitest](https://vitest.dev/).
