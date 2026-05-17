import './ResultCard.css'

function ResultCard({ result }) {
  if (!result || typeof result !== 'object') return null

  const {
    tramo_predicho,
    probabilidades,
    explicacion,
    ultimo_concierto_conocido,
    gap_medio_historico_dias,
    total_visitas_registradas,
  } = result

  return (
    <div className="result-card">
      <p className="result-card__tramo">{tramo_predicho}</p>

      {explicacion && (
        <p className="result-card__explicacion">{explicacion}</p>
      )}

      {probabilidades && typeof probabilidades === 'object' && (
        <div className="result-card__probabilidades">
          <p className="result-card__section-title">Probabilidades</p>
          {Object.entries(probabilidades).map(([tramo, prob]) => (
            <div key={tramo} className="result-card__prob-row">
              <span className="result-card__prob-label">{tramo}</span>
              <div className="result-card__prob-bar-bg">
                <div
                  className="result-card__prob-bar"
                  style={{ width: `${Math.round(prob * 100)}%` }}
                />
              </div>
              <span className="result-card__prob-value">{Math.round(prob * 100)}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="result-card__stats">
        {ultimo_concierto_conocido && (
          <div className="result-card__stat">
            <span className="result-card__stat-label">Último concierto</span>
            <span className="result-card__stat-value">{ultimo_concierto_conocido}</span>
          </div>
        )}
        {gap_medio_historico_dias != null && (
          <div className="result-card__stat">
            <span className="result-card__stat-label">Intervalo medio histórico</span>
            <span className="result-card__stat-value">{gap_medio_historico_dias} días</span>
          </div>
        )}
        {total_visitas_registradas != null && (
          <div className="result-card__stat">
            <span className="result-card__stat-label">Visitas registradas</span>
            <span className="result-card__stat-value">{total_visitas_registradas}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultCard
