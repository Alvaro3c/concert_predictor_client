import { useState, useEffect, useRef } from 'react'
import './SelectionOverlay.css'

const TRANSITION_MS = 350

function SelectionOverlay({ title, options, selectedValue, searchPlaceholder, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [noResults, setNoResults] = useState(false)
  const searchRef = useRef(null)
  const optionRefs = useRef({})
  const timers = useRef({})

  useEffect(() => {
    const t = setTimeout(() => searchRef.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      Object.values(timers.current).forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    let visibleCount = 0

    options.forEach(opt => {
      const el = optionRefs.current[opt]
      if (!el) return
      const matches = q === '' || opt.toLowerCase().includes(q)
      const hidden = el.style.display === 'none'

      if (!matches && !hidden) {
        clearTimeout(timers.current[opt])
        el.classList.add('hiding')
        timers.current[opt] = setTimeout(() => {
          el.style.display = 'none'
          el.classList.remove('hiding')
        }, TRANSITION_MS)
      } else if (matches && hidden) {
        clearTimeout(timers.current[opt])
        el.classList.add('entering')
        el.style.display = 'flex'
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.classList.remove('entering')
        }))
        visibleCount++
      } else if (matches) {
        visibleCount++
      }
    })

    setNoResults(visibleCount === 0 && q !== '')
  }, [query, options])

  return (
    <div className="fullscreen-overlay">
      <div className="overlay-content">
        <h2 className="overlay-title">{title}</h2>
        <div className="search-container">
          <input
            ref={searchRef}
            type="text"
            className="search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="grid-container">
          {options.map(opt => (
            <div
              key={opt}
              ref={el => { optionRefs.current[opt] = el }}
              className={`grid-option${opt === selectedValue ? ' selected' : ''}`}
              data-value={opt}
              onClick={() => onSelect(opt)}
            >
              {opt}
            </div>
          ))}
          <div className={`no-results${noResults ? ' visible' : ''}`}>
            No se encontraron resultados
          </div>
        </div>
        <button type="button" className="back-btn" onClick={onClose}>
          ← Volver atrás
        </button>
      </div>
    </div>
  )
}

export default SelectionOverlay
