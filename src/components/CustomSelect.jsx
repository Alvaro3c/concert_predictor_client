import './CustomSelect.css'

function CustomSelect({ label, value, placeholder, onClick, disabled }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div
        className={`custom-select-trigger${disabled ? ' disabled' : ''}`}
        onClick={disabled ? undefined : onClick}
      >
        <span className={value ? 'select-value' : 'select-placeholder'}>
          {value || placeholder}
        </span>
      </div>
    </div>
  )
}

export default CustomSelect
