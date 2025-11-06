# Dynamic Route Implementation for Facebook Sharing

## Problem Solved
Facebook's Open Graph scraper was redirecting URLs with query parameters (`?name=`) to the base URL, causing personalized invitations to lose the guest name when shared.

## Solution
Implemented path-based dynamic routing: `https://wedding.nasfong.site/[name]`

## Structure

```
app/
├── page.tsx                    # Homepage (no personalization)
├── HomeContent.tsx             # Shared UI component
├── [name]/
│   └── page.tsx               # Personalized invitation page
└── invitation/
    └── page.tsx               # Full invitation page
```

## URL Examples

### Old Approach (Query Parameters - Unreliable for Facebook)
```
https://wedding.nasfong.site/?name=លោក%20សុខ%20សំណាង
```
❌ Facebook might strip query parameters or cache incorrectly

### New Approach (Path Parameters - Guaranteed for Facebook)
```
https://wedding.nasfong.site/លោក-សុខ-សំណាង
https://wedding.nasfong.site/%E1%9E%9B%E1%9F%84%E1%9E%80-%E1%9E%9F%E1%9E%BB%E1%9E%81-%E1%9E%9F%E1%9F%86%E1%9E%8E%E1%9E%B6%E1%9E%84
```
✅ Each guest gets a unique URL path that Facebook will respect

## How It Works

### 1. Dynamic Route: `app/[name]/page.tsx`
- Accepts any name in the URL path
- Generates unique Open Graph metadata per guest
- Server-side rendering ensures Facebook sees correct meta tags

### 2. Metadata Generation
```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const clientName = decodeURIComponent(name);
  const fullUrl = `https://wedding.nasfong.site/${encodeURIComponent(name)}`;
  
  return {
    title: `Wedding Invitation for ${clientName}`,
    openGraph: {
      url: fullUrl,  // Unique URL per guest
      // ...
    },
  };
}
```

### 3. Component Reuse
`HomeContent.tsx` accepts an optional `nameFromPath` prop:
```tsx
export default function HomeContent({ nameFromPath }: HomeContentProps = {}) {
  const clientName = nameFromPath || searchParams.get('name');
  // Works with both path-based and query-based routing
}
```

## Testing

### Local Development
```bash
npm run dev

# Visit these URLs:
# http://localhost:3000/                          # Generic invitation
# http://localhost:3000/លោក-សុខ-សំណាង              # Personalized (Khmer)
# http://localhost:3000/Mr-John-Doe              # Personalized (English)
```

### View Meta Tags
```bash
curl -s http://localhost:3000/លោក-សុខ | grep -i "og:url"
# Should show: <meta property="og:url" content="https://wedding.nasfong.site/លោក-សុខ">
```

## Facebook Debugging

1. **Clear Facebook Cache**
   ```
   https://developers.facebook.com/tools/debug/
   ```

2. **Test URL**
   ```
   https://wedding.nasfong.site/%E1%9E%9B%E1%9F%84%E1%9E%80-%E1%9E%9F%E1%9E%BB%E1%9E%81
   ```

3. **Verify**
   - Check that `og:url` shows the full path with the name
   - Share on Facebook/Messenger
   - Confirm preview displays without redirecting to base URL

## Deployment

```bash
# Build both Docker images
make build-all

# Push to registry
make push-all

# Deploy to production
make deploy
```

## Benefits

1. ✅ **Guaranteed Facebook Compatibility**: Path parameters are never stripped
2. ✅ **SEO Friendly**: Better URL structure for search engines
3. ✅ **Unique URLs**: Each guest has a distinct, shareable link
4. ✅ **Server-Side Rendering**: Meta tags generated before Facebook scrapes
5. ✅ **Backward Compatible**: Query parameters (`?name=`) still work

## URL Encoding

Khmer characters are automatically URL-encoded:
- `លោក សុខ សំណាង` → `%E1%9E%9B%E1%9F%84%E1%9E%80-%E1%9E%9F%E1%9E%BB%E1%9E%81-%E1%9F%86%E1%9E%8E%E1%9E%B6%E1%9E%84`
- Spaces can be replaced with `-` or `%20`
- Browser will display the decoded version in the address bar

## Next.js Build Output

```
Route (app)
┌ ƒ /              # Homepage (dynamic)
├ ƒ /[name]        # Personalized page (dynamic)
└ ƒ /invitation    # Full invitation (dynamic)

ƒ = Dynamic (server-rendered on demand)
```

All routes are server-rendered to ensure Facebook's crawler sees the correct metadata on every request.
