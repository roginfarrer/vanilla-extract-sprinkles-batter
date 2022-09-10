A little utility for authoring vanilla-extract `sprinkles()` and `style()` in the same object.

Instead of this:

```typescript
export const card = style([
  sprinkles({
    background: {
      lightMode: 'green-50',
      darkMode: 'gray-800',
    },
    borderRadius: {
      mobile: '4x',
      desktop: '5x',
    },
    padding: {
      mobile: '7x',
      desktop: '8x',
    },
  }),
  {
    transition: 'transform 4s ease-in-out',
    ':hover': {
      cursor: 'default',
      transform: 'scale(2) rotate(720deg)',
    },
  },
]);
```

You can do this:

```typescript
const style = batter<Sprinkles>(sprinkles);

export const card = style({
  // Can use sprinkles...
  color: {
    lightMode: 'green-700',
    darkMode: 'green-50',
  },
  background: {
    lightMode: 'green-50',
    darkMode: 'gray-800',
  },
  padding: {
    mobile: '7x',
    desktop: '8x',
  },
  // ...or regular styles
  transition: 'transform 4s ease-in-out',
  ':hover': {
    cursor: 'default',
    transform: 'scale(1.5) rotate(360deg)',
  },
});
```

## Installation

You can't, this hasn't been published. If there's interest, I can make it a real package. [Here's the source code.](https://github.com/roginfarrer/vanilla-extract-sprinkles-batter/blob/main/packages/library/src/strictBatter.ts)

## Batter?

Yeah, yeah it's a bad name. Not official or final or anything.
