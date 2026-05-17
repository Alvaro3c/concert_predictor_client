import './ResultCard.css'

function ResultCard({ result }) {
  return (
    <div className="result-card">
      <p className="result-card__text">{result}</p>
    </div>
  )
}

export default ResultCard
