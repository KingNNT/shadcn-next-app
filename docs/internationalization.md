# Internationalization (i18n) Guide

This guide covers the internationalization implementation and best practices for the Kingnnt.org Next.js application.

## Overview

The application implements locale-based routing using Next.js 15 App Router with dynamic `[locale]` segments. This approach provides:

- **SEO-friendly URLs** with locale prefixes
- **Automatic locale detection** based on cookies and browser preferences
- **Middleware-driven routing** for locale handling
- **Type-safe locale management** with TypeScript enums

## Architecture

### Route Structure

```
app/
├── [locale]/              # Dynamic locale segment
│   └── (public)/         # Route group (doesn't affect URL)
│       └── home/         # Page routes
│           └── page.tsx  # Page component
├── globals.css
├── layout.tsx            # Root layout
└── favicon.ico
```

### URL Patterns

```
/                    → Redirects to /en/home (or preferred locale)
/en/home            → English home page
/vi/home            → Vietnamese home page
/en/about           → English about page
/vi/about           → Vietnamese about page
```

## Locale Configuration

### Supported Locales

```typescript
// enums/locale.enum.ts
export enum LocaleSupport {
  EN = "en",
  VI = "vi",
}

// Usage in components
import { LocaleSupport } from "@/enums";
```

### Middleware Configuration

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { LocaleSupport } from "./enums";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const search = url.search;

  const SUPPORTED_LOCALES = [LocaleSupport.EN, LocaleSupport.VI];
  const DEFAULT_LOCALE = LocaleSupport.EN;

  // Redirect root to home page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Check if locale is in URL
  const pathSegments = pathname.split("/");
  const hasLocale = SUPPORTED_LOCALES.includes(
    pathSegments[1] as LocaleSupport,
  );

  if (!hasLocale) {
    // Get locale from cookies or use default
    const cookies = request.cookies;
    const savedLocale = cookies.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;

    // Redirect with locale prefix
    const newUrl = new URL(`/${savedLocale}${pathname}${search}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*),,
  ],
};
```

## Component Implementation

### Page Components with Locale

```typescript
// app/[locale]/(public)/home/page.tsx
import { LocaleSupport } from "@/enums";

interface HomePageProps {
  params: {
    locale: LocaleSupport;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  return (
    <div>
      <h1>
        {locale === LocaleSupport.EN ? "Welcome" : "Chào mừng"}
      </h1>
      <p>
        {locale === LocaleSupport.EN
          ? "Welcome to our website"
          : "Chào mừng đến với trang web của chúng tôi"}
      </p>
    </div>
  );
}
```

### Layout with Locale Context

```typescript
// app/[locale]/layout.tsx
import { LocaleSupport } from "@/enums";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: LocaleSupport;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <div data-locale={locale}>
          {children}
        </div>
      </body>
    </html>
  );
}
```

## Translation Management

### Simple Translation Object

```typescript
// lib/translations.ts
export const translations = {
  [LocaleSupport.EN]: {
    common: {
      home: "Home",
      about: "About",
      contact: "Contact",
      welcome: "Welcome",
    },
    navigation: {
      title: "Kingnnt.org",
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    pages: {
      home: {
        title: "Welcome to Kingnnt.org",
        description: "Kingnnt.org is a coding services organization.",
      },
    },
  },
  [LocaleSupport.VI]: {
    common: {
      home: "Trang chủ",
      about: "Giới thiệu",
      contact: "Liên hệ",
      welcome: "Chào mừng",
    },
    navigation: {
      title: "Kingnnt.org",
      home: "Trang chủ",
      about: "Giới thiệu",
      contact: "Liên hệ",
    },
    pages: {
      home: {
        title: "Chào mừng đến với Kingnnt.org",
        description: "Kingnnt.org là tổ chức cung cấp dịch vụ lập trình.",
      },
    },
  },
};

// Translation utility function
export function t(
  locale: LocaleSupport,
  key: string,
  defaultValue?: string
): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || defaultValue || key;
}
```

### Using Translations in Components

```typescript
// components/navigation.tsx
import { LocaleSupport } from "@/enums";
import { t } from "@/lib/translations";

interface NavigationProps {
  locale: LocaleSupport;
}

export function Navigation({ locale }: NavigationProps) {
  return (
    <nav>
      <h1>{t(locale, "navigation.title")}</h1>
      <ul>
        <li>
          <a href={`/${locale}/home`}>
            {t(locale, "navigation.home")}
          </a>
        </li>
        <li>
          <a href={`/${locale}/about`}>
            {t(locale, "navigation.about")}
          </a>
        </li>
        <li>
          <a href={`/${locale}/contact`}>
            {t(locale, "navigation.contact")}
          </a>
        </li>
      </ul>
    </nav>
  );
}
```

## Advanced Translation Patterns

### Translation Hook

```typescript
// hooks/use-translations.ts
import { LocaleSupport } from "@/enums";
import { t } from "@/lib/translations";

export function useTranslations(locale: LocaleSupport) {
  return {
    t: (key: string, defaultValue?: string) => t(locale, key, defaultValue),
    locale,
  };
}

// Usage in components
export function MyComponent({ locale }: { locale: LocaleSupport }) {
  const { t } = useTranslations(locale);

  return (
    <div>
      <h1>{t("pages.home.title")}</h1>
      <p>{t("pages.home.description")}</p>
    </div>
  );
}
```

### Pluralization Support

```typescript
// lib/translations.ts
export function plural(
  locale: LocaleSupport,
  count: number,
  key: string
): string {
  const pluralKey = count === 1 ? `${key}.one` : `${key}.other`;
  return t(locale, pluralKey).replace("{{count}}", count.toString());
}

// Translation object with plurals
export const translations = {
  [LocaleSupport.EN]: {
    items: {
      one: "{{count}} item",
      other: "{{count}} items",
    },
  },
  [LocaleSupport.VI]: {
    items: {
      one: "{{count}} mục",
      other: "{{count}} mục",
    },
  },
};
```

### Date and Number Formatting

```typescript
// lib/formatters.ts
export function formatDate(
  date: Date,
  locale: LocaleSupport,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatNumber(
  number: number,
  locale: LocaleSupport,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

export function formatCurrency(
  amount: number,
  locale: LocaleSupport,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// Usage
const date = new Date();
const formattedDate = formatDate(date, LocaleSupport.EN, {
  year: "numeric",
  month: "long",
  day: "numeric",
});
```

## Locale Switching

### Locale Switcher Component

```typescript
// components/locale-switcher.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { LocaleSupport } from "@/enums";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocaleSwitcherProps {
  currentLocale: LocaleSupport;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: LocaleSupport) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
    
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Set cookie for future visits
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Navigate to new path
    router.push(newPath);
  };

  const localeNames = {
    [LocaleSupport.EN]: "English",
    [LocaleSupport.VI]: "Tiếng Việt",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {localeNames[currentLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(LocaleSupport).map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Navigation with Locale

```typescript
// components/navigation.tsx
import { LocaleSupport } from "@/enums";
import { LocaleSwitcher } from "./locale-switcher";

interface NavigationProps {
  locale: LocaleSupport;
}

export function Navigation({ locale }: NavigationProps) {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex space-x-4">
        <a href={`/${locale}/home`}>Home</a>
        <a href={`/${locale}/about`}>About</a>
        <a href={`/${locale}/contact`}>Contact</a>
      </div>
      <LocaleSwitcher currentLocale={locale} />
    </nav>
  );
}
```

## SEO Optimization

### Meta Tags for Locales

```typescript
// app/[locale]/(public)/home/page.tsx
import { Metadata } from "next";
import { LocaleSupport } from "@/enums";

interface HomePageProps {
  params: {
    locale: LocaleSupport;
  };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = params;

  const titles = {
    [LocaleSupport.EN]: "Welcome to Kingnnt.org",
    [LocaleSupport.VI]: "Chào mừng đến với Kingnnt.org",
  };

  const descriptions = {
    [LocaleSupport.EN]: "Kingnnt.org provides professional coding services",
    [LocaleSupport.VI]: "Kingnnt.org cung cấp dịch vụ lập trình chuyên nghiệp",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `/${locale}/home`,
      languages: {
        en: "/en/home",
        vi: "/vi/home",
      },
    },
  };
}

export default function HomePage({ params }: HomePageProps) {
  // Component implementation
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { LocaleSupport } from "@/enums";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kingnnt.org";
  const locales = Object.values(LocaleSupport);
  const routes = ["home", "about", "contact"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "home" ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
```

## Testing Internationalization

### Testing Locale Routes

```typescript
// __tests__/middleware.test.ts
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

describe("Middleware", () => {
  it("redirects root to home page", async () => {
    const request = new NextRequest("http://localhost:3000/");
    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/home");
  });

  it("adds locale prefix when missing", async () => {
    const request = new NextRequest("http://localhost:3000/home");
    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/en/home");
  });
});
```

### Testing Localized Components

```typescript
// __tests__/components/navigation.test.tsx
import { render, screen } from "@testing-library/react";
import { Navigation } from "@/components/navigation";
import { LocaleSupport } from "@/enums";

describe("Navigation", () => {
  it("renders navigation in English", () => {
    render(<Navigation locale={LocaleSupport.EN} />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders navigation in Vietnamese", () => {
    render(<Navigation locale={LocaleSupport.VI} />);
    
    expect(screen.getByText("Trang chủ")).toBeInTheDocument();
    expect(screen.getByText("Giới thiệu")).toBeInTheDocument();
    expect(screen.getByText("Liên hệ")).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Consistent Locale Handling

```typescript
// Always pass locale down to components
<Navigation locale={locale} />
<Footer locale={locale} />
<LocaleSwitcher currentLocale={locale} />
```

### 2. Fallback Translations

```typescript
// Always provide fallback values
const title = t(locale, "pages.home.title", "Welcome");
```

### 3. TypeScript Integration

```typescript
// Define translation keys as types
type TranslationKey = "common.home" | "common.about" | "common.contact";

export function t(
  locale: LocaleSupport,
  key: TranslationKey,
  defaultValue?: string
): string {
  // Implementation
}
```

### 4. Performance Considerations

```typescript
// Load translations dynamically for large applications
export async function loadTranslations(locale: LocaleSupport) {
  const translations = await import(`@/translations/${locale}.json`);
  return translations.default;
}
```

## Future Enhancements

### 1. Advanced i18n Library Integration

Consider integrating libraries like:
- **react-i18next** for more advanced features
- **next-intl** for Next.js specific optimizations
- **FormatJS** for comprehensive formatting

### 2. Translation Management

- **Translation Management System** (TMS) integration
- **Automated translation workflows**
- **Translation key extraction** from code
- **Translation validation** and testing

### 3. Advanced Features

- **Right-to-left (RTL) support** for Arabic/Hebrew
- **Locale-specific fonts** and typography
- **Cultural adaptations** beyond language
- **Region-specific content** and pricing