import { isObject } from '../functions/validators'

type Vars = { [key: string]: string | number | Vars }
type Values = { [key: string]: string | number }

const mapVariables = (variables: Vars, prefix = '-'): Values => {
  const vars: Values = Object.keys(variables).reduce(
    (prev: Values, key: string) => {
      const value = variables[key]

      if (isObject<Vars>(value)) {
        return {
          ...prev,
          ...mapVariables(value, `${prefix}-${key}`),
        }
      }

      return {
        ...prev,
        [`${prefix}-${key}`]: value,
      }
    },
    {},
  )

  return vars
}

const toStringVariables = (vars: Values): string => {
  return Object.keys(vars)
    .reduce((prev: string[], key: string) => {
      const value = vars[key]

      return [...prev, `${key}: ${value};`]
    }, [])
    .join('\n')
}

const useCssVars = (vars: Vars): string => {
  const mapped = mapVariables(vars)
  return toStringVariables(mapped)
}

export const useCssVar = (name: string): string => {
  name = name.replaceAll('.', '-')
  return `var(--${name})`
}

export default useCssVars
