# react-scroll-indicators

A small React library that provides **OverflowContainer** — a scrollable container with hover-activated gradient indicators when content overflows. Supports horizontal and vertical scrolling.

## Install

```bash
npm install react-scroll-indicators
# or
pnpm add react-scroll-indicators
# or
yarn add react-scroll-indicators
```

## Peer dependencies

- `react` (>=17)
- `react-dom` (>=17)

No Tailwind or other CSS framework is required. The component uses plain CSS with BEM-style class names (e.g. `overflow-container`, `overflow-container__inner`, `overflow-container__indicator--left`). Default styles are included when you import the component; you can override with your own CSS via `className` / `containerClassName` / `horizontalIndicatorClassName` / `verticalIndicatorClassName`.

## Usage

### 1. Import and use the component

Styles are loaded automatically with the component. One import is enough:

```tsx
import { OverflowContainer } from "react-scroll-indicators";

function MyComponent() {
  return (
    <OverflowContainer className="max-w-md h-48" style={{ maxWidth: "28rem", height: "12rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </OverflowContainer>
  );
}
```

### As a copyable component (shadcn-style)

You can use the component file directly so it lives in your codebase and you can edit it:

**Option A – Import the source file** (your bundler compiles it):

```tsx
import OverflowContainer from "react-scroll-indicators/OverflowContainer";
```

**Option B – Copy the file into your project** (e.g. `components/ui/OverflowContainer.tsx`):

1. Copy from: `node_modules/react-scroll-indicators/src/OverflowContainer.tsx`
2. Paste into your project (e.g. `components/ui/OverflowContainer.tsx`).
3. Import from that path. The component only depends on `react`; you can keep or replace the small `cn()` helper.

### With vertical scroll

```tsx
<OverflowContainer
  verticalScrollIndicators
  horizontalScrollIndicators={false}
  className="my-container"
  style={{ height: "16rem", width: "16rem" }}
>
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>{/* tall content */}</div>
</OverflowContainer>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content inside the scroll area |
| `className` | `string` | — | Outer wrapper class |
| `containerClassName` | `string` | — | Inner scroll container class |
| `scrollSpeed` | `number` | `10` | Scroll interval in ms (lower = faster) |
| `scrollDistance` | `number` | `10` | Pixels to scroll per tick |
| `scrollEndPadding` | `number` | `10` | Padding from end before stopping |
| `showScrollIndicators` | `boolean` | `true` | Show gradient indicators |
| `horizontalScrollIndicators` | `boolean` | `true` | Show left/right indicators |
| `verticalScrollIndicators` | `boolean` | `false` | Show top/bottom indicators |
| `horizontalIndicatorClassName` | `string` | — | Override horizontal (left/right) indicator styles |
| `verticalIndicatorClassName` | `string` | — | Override vertical (up/down) indicator styles |
| `scrollOnHover` | `boolean` | `true` | Scroll when hovering over indicators |

All standard `div` HTML attributes are also supported (e.g. `style`, `aria-*`).

### Class names (for custom CSS)

If you skip the default styles and style the component yourself, use these class names:

| Class | Element |
|-------|--------|
| `overflow-container` | Outer wrapper |
| `overflow-container__inner` | Scrollable content area |
| `overflow-container__indicators` | Layer that holds the indicator overlays |
| `overflow-container__indicator` | Base class for each indicator |
| `overflow-container__indicator--left` | Left edge indicator |
| `overflow-container__indicator--right` | Right edge indicator |
| `overflow-container__indicator--up` | Top edge indicator |
| `overflow-container__indicator--down` | Bottom edge indicator |

## Build

```bash
npm install
npm run build
```

Output is in `dist/` (ESM + CJS + types).

## License

MIT
