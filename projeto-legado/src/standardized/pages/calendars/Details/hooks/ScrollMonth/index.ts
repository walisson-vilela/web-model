import { useEffect, useState } from 'react'

const useScrollMonth = (
  month: number,
  divisor: number,
  dependencies: unknown[],
) => {
  const [body, setBody] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!body || month === null) return
    const index = Math.floor(month / divisor)
    const row = body.childNodes[index] as HTMLDivElement
    if (!row) return
    row.scrollIntoView()
  }, [body, month, divisor, ...dependencies])

  return setBody
}

export default useScrollMonth
