/**
 * see {@link Object.values}
 */
export const values = Object.values.bind(Object);

/**
 * see {@link Object.keys}
 */
export const keys = Object.keys.bind(Object);

/**
 * see {@link Object.entries}
 */
export const entries = Object.entries.bind(Object);

/**
 * see {@link Object.fromEntries}
 */
export const fromEntries = Object.fromEntries.bind(Object);

/**
 * see {@link Object.freeze}
 */
export const freeze = Object.freeze.bind(Object);

/**
 * see {@link Object.getPrototypeOf}
 */
export const getPrototypeOf = Object.getPrototypeOf.bind(Object);

/**
 * see {@link Object.getOwnPropertyNames}
 */
export const getOwnPropertyNames = Object.getOwnPropertyNames.bind(Object);

export const getProtoConstructor = (val: any) =>
  getPrototypeOf(val).constructor;

export const hasOwnProps = (props: string[]) => (obj: any) =>
  props.every((prop) => Object.prototype.hasOwnProperty.call(obj, prop));
