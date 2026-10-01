import { useId } from 'react'

export default function TextField({ label, helperText, error, id, className = '', ...props }) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  return (
    <div className={`text-field ${className}`.trim()}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      />
      {error ? <p id={errorId} className="text-field__error">{error}</p> : null}
      {!error && helperText ? <p id={helperId} className="text-field__helper">{helperText}</p> : null}
    </div>
  )
}
