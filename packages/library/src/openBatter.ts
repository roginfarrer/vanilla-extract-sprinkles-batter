import { style, StyleRule } from '@vanilla-extract/css';

interface SprinklesFn {
  (...args: any): string;
  properties: Set<string>;
}

type SprinkledStyle<Sprinkles> = {
  [Property in keyof StyleRule]?: Property extends keyof Sprinkles
    ? StyleRule[Property] | Sprinkles[Property]
    : StyleRule[Property];
};

/**
 * Composes Vanilla Extract sprinkles() and style() to be used together simultaneously
 *
 * Allows you to use sprinkles if configured, or otherwise fallback to regular style()
 */
export function openBatter<Sprinkles extends Parameters<SprinklesFn>>(
  sprinklesFn: SprinklesFn,
): (args: SprinkledStyle<Sprinkles>) => string {
  const sprinklesProperties = sprinklesFn.properties;

  function stylz(args: SprinkledStyle<Sprinkles>) {
    let sprinks: any = {};
    let base: any = {};
    for (const property in args) {
      if (sprinklesProperties.has(property)) {
        try {
          // This is not good, it's probably creating styles with each call
          // TODO: find a better way to check if the value is valid
          if (sprinklesFn({ [property]: args[property] })) {
            sprinks[property] = args[property];
          }
        } catch (e) {
          base[property] = args[property];
        }
      } else {
        base[property] = args[property];
      }
    }

    return style([base, sprinklesFn(sprinks)]);
  }

  return stylz;
}
