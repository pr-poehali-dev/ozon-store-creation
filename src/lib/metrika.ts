type YmFn = (id: number, action: string, goal?: string) => void;

export const reachGoal = (goal: string) => {
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym === 'function') ym(101026698, 'reachGoal', goal);
};
