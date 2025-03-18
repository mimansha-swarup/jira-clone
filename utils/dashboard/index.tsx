export const getValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr: Record<string, any>[],
  key: string,
  compare: string
) => {
  return arr.filter((task) => task?.[key] === compare).length;
};
