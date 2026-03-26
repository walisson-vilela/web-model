export const resolveLimits = (
  minSelected?: number,
  maxSelected?: number,
): { min?: number; max?: number; enabled: boolean; error?: string } => {
  const min =
    typeof minSelected === 'number' && minSelected >= 0 ? minSelected : undefined
  const max =
    typeof maxSelected === 'number' && maxSelected >= 0 ? maxSelected : undefined

  const enabled = min !== undefined || max !== undefined

  if (!enabled) {
    return { enabled }
  }

  if (min !== undefined && max !== undefined && min > max) {
    return {
      enabled: false,
      error: 'minSelected cannot be greater than maxSelected',
    }
  }

  return { min, max, enabled }
}

export type Limits = ReturnType<typeof resolveLimits>
