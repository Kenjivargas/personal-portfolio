export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `button button--${variant} ${className}`.trim()

  if (href) {
    return <a className={classes} href={href} {...props}>{children}</a>
  }

  return <button className={classes} type="button" {...props}>{children}</button>
}
