import { style, StyleRule } from '@vanilla-extract/css';

interface SprinklesFn {
  (...args: any): string;
  properties: Set<string>;
}

type SprinkledStyle<Sprinkles> = Omit<StyleRule, keyof Sprinkles> & Sprinkles;

/**
 * Composes Vanilla Extract sprinkles() and style() to be used together simultaneously
 *
 * If a property is configured with Sprinkles, you can only use Sprinkles-configured values
 * Otherwise, it's the same as style()
 */
export function batter<Sprinkles extends Parameters<SprinklesFn>>(
  sprinklesFn: SprinklesFn,
): (args: SprinkledStyle<Sprinkles>) => string {
  const sprinklesProperties = sprinklesFn.properties;

  function stylz(args: SprinkledStyle<Sprinkles>) {
    let sprinks: any = {};
    let base: any = {};
    for (const property in args) {
      if (sprinklesProperties.has(property)) {
        sprinks[property] = args[property];
      } else {
        base[property] = args[property];
      }
    }

    return style([base, sprinklesFn(sprinks)]);
  }

  return stylz;
}
