export const values = Object.values.bind(Object);
export const keys = Object.keys.bind(Object);
export const freeze = Object.freeze.bind(Object);
export const getPrototypeOf = Object.getPrototypeOf.bind(Object);
export const getOwnPropertyNames = Object.getOwnPropertyNames.bind(Object);
export const getProtoConstructor = (val: any) =>
	getPrototypeOf(val).constructor;
export const hasOwnProps = (props: string[]) => (obj: any) =>
	props.every((prop) => obj.hasOwnProperty(prop));
