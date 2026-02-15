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

No Tailwind or other CSS framework is required. The component uses plain CSS with BEM-style class names (e.g. `overflow-container`, `overflow-container__inner`, `overflow-container__indicator--left`). Import the default styles once in your app, or override with your own CSS via `className` / `containerClassName` / `horizontalIndicatorClassName` / `verticalIndicatorClassName`.

## Usage

### 1. Import the default styles (once)

```tsx
import "react-scroll-indicators/styles";
```

### 2. Use the component

```tsx
import { OverflowContainer } from "react-scroll-indicators";
import "react-scroll-indicators/styles";

function MyComponent() {
  return (
    <OverflowContainer style={{ maxWidth: "28rem", height: "12rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </OverflowContainer>
  );
}
```

### With vertical scroll

```tsx
<OverflowContainer
  verticalScrollIndicators
  horizontalScrollIndicators={false}
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
| `hideHorizontalScrollbar` | `boolean` | `false` | Hide horizontal scrollbar (scroll still works) |
| `hideVerticalScrollbar` | `boolean` | `false` | Hide vertical scrollbar (scroll still works) |

All standard `div` HTML attributes are also supported (e.g. `style`, `aria-*`).

### Accessibility

The scroll area has `role="region"` and `aria-label="Scrollable content"`. The gradient indicators are decorative and hidden from assistive tech. The inner content is focusable and can be scrolled with keyboard (arrow keys, Page Up/Down) when focused.

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

## Browser support

Works in modern browsers that support **ResizeObserver** (all current Chrome, Firefox, Safari, Edge). In frameworks like **Next.js**, use the component in a client boundary (e.g. `"use client"`); the built package already includes this.

## License

MIT
