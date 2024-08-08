export const CLONE_DEEP_UTILS = <T>(input: T): T => {
  return JSON.parse(JSON.stringify(input));
};
