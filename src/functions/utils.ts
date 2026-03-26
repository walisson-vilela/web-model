/**
 * Creates a debounced function that delays invoking the provided function
 * until 'ms' milliseconds have elapsed since the last time it was invoked.
 *
 * @param fn The function to debounce.
 * @param ms The number of milliseconds to delay.
 * @returns A new, debounced function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  ms: number = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    // Clear any previous pending timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, ms)
  }
}
