import { useEffect, useState } from 'react'

export function useRemoteResource(load) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({ status: 'loading', data: null, error: null })

  useEffect(() => {
    let active = true
    Promise.resolve()
      .then(load)
      .then((data) => {
        if (active) setState({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (active) setState({ status: 'error', data: null, error })
      })

    return () => {
      active = false
    }
  }, [load, attempt])

  const retry = () => {
    setState({ status: 'loading', data: null, error: null })
    setAttempt((current) => current + 1)
  }

  return { ...state, retry }
}
