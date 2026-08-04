export default function FormField({ label, as = "input", className = "", ...props }) {
  const Tag = as
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <Tag className="field" {...props} />
    </div>
  )
}
