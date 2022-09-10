import { sprinkles, Sprinkles } from '../sprinkles.css';
import { batter, openBatter } from 'library';

// Will not allow sprinkle properties to accept non-sprinkle values
// If you configured "color" as a sprinkle property, it will not allow
// custom values
const strictStyle = batter<Sprinkles>(sprinkles);

// This allows you to use sprinkles if configured, or custom values
const style = openBatter<Sprinkles>(sprinkles);

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
  borderRadius: '30px',
  transition: 'transform 4s ease-in-out',
  ':hover': {
    cursor: 'default',
    transform: 'scale(1.5) rotate(360deg)',
  },
});
