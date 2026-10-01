import { useContext } from 'react'
import { ToastContext } from './toastContextDef.js'

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    return { showToast: (msg) => console.log('Toast:', msg) }
  }
  return context
}
