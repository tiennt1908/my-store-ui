export const TIMER_UTILS = {
  sleep: (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
