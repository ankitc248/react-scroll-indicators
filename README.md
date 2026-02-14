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

If you use Tailwind CSS, the default indicator styles use Tailwind utility classes. You can override them with `indicatorClassName` or your own CSS.

## Usage

```tsx
import { OverflowContainer } from "react-scroll-indicators";

function MyComponent() {
  return (
    <OverflowContainer className="max-w-md h-48">
      <div className="flex gap-4">
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
  className="h-64 w-64"
>
  <div className="flex flex-col gap-2">{/* tall content */}</div>
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
| `indicatorClassName` | `string` | — | Override indicator styles |
| `scrollOnHover` | `boolean` | `true` | Scroll when hovering over indicators |

All standard `div` HTML attributes are also supported (e.g. `style`, `aria-*`).

## Build

```bash
npm install
npm run build
```

Output is in `dist/` (ESM + CJS + types).

## License

MIT
