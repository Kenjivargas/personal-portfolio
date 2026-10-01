import { useState, useCallback } from 'react'
import { ToastContext } from './toastContextDef.js'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7)
    setToasts((prev) => [...prev, { id, message }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" aria-live="polite" role="status">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-notification" onClick={() => removeToast(toast.id)}>
            <span className="toast-icon">✓</span>
            <span className="toast-text">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
