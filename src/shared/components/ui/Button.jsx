export default function Button({ href, variant = 'primary', size, className = '', children, ...props }) {
  const classes = ['button', `button--${variant}`, size && `button--${size}`, className].filter(Boolean).join(' ')

  if (href) {
    return <a className={classes} href={href} {...props}>{children}</a>
  }

  return <button className={classes} type="button" {...props}>{children}</button>
}
