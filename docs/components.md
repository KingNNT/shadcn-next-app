# Components Guide

This guide covers the component architecture, usage patterns, and examples for the Kingnnt.org Next.js application.

## Component Architecture

### Component Categories

1. **UI Components** (`components/ui/`) - shadcn/ui base components
2. **Feature Components** (`components/`) - Application-specific components
3. **Layout Components** - Page layouts and structure
4. **Page Components** (`app/`) - Route-specific components

## shadcn/ui Components

### Available Components

The application uses the following shadcn/ui components:

- **Button** - Interactive buttons with variants
- **Card** - Content containers with header/content sections
- **Dropdown Menu** - Accessible dropdown menus
- **Input** - Form input fields

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Examples
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
```

### Component Examples

#### Button Component

```typescript
// components/ui/button.tsx
import { Button } from "@/components/ui/button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

#### Card Component

```typescript
// components/ui/card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

#### Dropdown Menu Component

```typescript
// components/ui/dropdown-menu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Custom Components

### Theme Components

#### ThemeProvider

```typescript
// components/theme-provider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

#### ModeToggle

```typescript
// components/mode-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Layout Components

#### Navigation Component

```typescript
// components/navigation.tsx
import { ModeToggle } from "@/components/mode-toggle";

export function Navigation() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold">Kingnnt.org</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
```

#### Footer Component

```typescript
// components/footer.tsx
export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto text-center py-4">
        <p className="text-muted-foreground">
          © 2025 Kingnnt.org. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

## Component Development Patterns

### 1. Component Props Pattern

```typescript
// Define clear interfaces for props
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{user.email}</p>
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <Button onClick={() => onEdit(user.id)} variant="outline">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={() => onDelete(user.id)} variant="destructive">
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. Compound Component Pattern

```typescript
// components/data-table.tsx
interface DataTableProps {
  children: React.ReactNode;
}

export function DataTable({ children }: DataTableProps) {
  return <div className="rounded-md border">{children}</div>;
}

DataTable.Header = function DataTableHeader({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <div className="border-b bg-muted/50 p-4">{children}</div>;
};

DataTable.Body = function DataTableBody({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <div className="p-4">{children}</div>;
};

// Usage
<DataTable>
  <DataTable.Header>
    <h2>Users</h2>
  </DataTable.Header>
  <DataTable.Body>
    {users.map(user => (
      <UserCard key={user.id} user={user} />
    ))}
  </DataTable.Body>
</DataTable>
```

### 3. Render Props Pattern

```typescript
// components/data-fetcher.tsx
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
      <div>
        {users?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }}
</DataFetcher>
```

## Styling Patterns

### 1. Conditional Styling

```typescript
// Using clsx for conditional classes
import { clsx } from "clsx";

interface AlertProps {
  variant?: "default" | "destructive" | "warning";
  children: React.ReactNode;
}

export function Alert({ variant = "default", children }: AlertProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border p-4",
        {
          "border-border bg-background": variant === "default",
          "border-destructive bg-destructive/10": variant === "destructive",
          "border-yellow-500 bg-yellow-50": variant === "warning",
        }
      )}
    >
      {children}
    </div>
  );
}
```

### 2. Responsive Design

```typescript
// components/responsive-grid.tsx
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function ResponsiveGrid({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3, xl: 4 } 
}: ResponsiveGridProps) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        `grid-cols-${cols.sm || 1}`,
        `md:grid-cols-${cols.md || 2}`,
        `lg:grid-cols-${cols.lg || 3}`,
        `xl:grid-cols-${cols.xl || 4}`
      )}
    >
      {children}
    </div>
  );
}
```

## Component Testing

### Unit Testing Components

```typescript
// __tests__/components/user-card.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { UserCard } from "@/components/user-card";

const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
};

describe("UserCard", () => {
  it("renders user information", () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith("1");
  });
});
```

### Integration Testing

```typescript
// __tests__/components/user-list.test.tsx
import { render, screen } from "@testing-library/react";
import { UserList } from "@/components/user-list";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

describe("UserList", () => {
  it("renders all users", () => {
    render(<UserList users={mockUsers} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
```

## Accessibility Guidelines

### 1. Semantic HTML

```typescript
// Use proper semantic elements
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="border rounded-lg p-4">
      <header>
        <h2 className="text-xl font-semibold">{article.title}</h2>
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString()}
        </time>
      </header>
      <p className="mt-2">{article.excerpt}</p>
    </article>
  );
}
```

### 2. ARIA Attributes

```typescript
// components/modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          {title}
        </h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

### 3. Keyboard Navigation

```typescript
// components/dropdown.tsx
export function Dropdown({ items }: { items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => 
        prev < items.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : items.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        // Handle selection
      }
    }
  };

  return (
    <div
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Dropdown implementation */}
    </div>
  );
}
```

## Performance Optimization

### 1. Component Memoization

```typescript
// components/expensive-component.tsx
import { memo, useMemo } from "react";

interface ExpensiveComponentProps {
  data: any[];
  filter: string;
}

export const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
  filter,
}: ExpensiveComponentProps) {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <div>
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```

### 2. Lazy Loading

```typescript
// components/lazy-image.tsx
import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={clsx(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
```