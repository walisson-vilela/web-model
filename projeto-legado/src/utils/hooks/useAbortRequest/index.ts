import { useEffect, useState } from 'react'

const useAbortRequest = () => {
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  useEffect(() => {
    return () => {
      // abort upload
      if (!abortController) return
      abortController.abort()
    }
  }, [abortController])

  const startRequest = () => {
    const cancelToken = new AbortController()
    setAbortController(cancelToken)
    return cancelToken
  }

  const abortRequest = () => {
    setAbortController(null)
  }

  return {
    startRequest,
    abortRequest,
  }
}

export default useAbortRequest
