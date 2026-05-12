import './WagonSelector.css'

function WagonSelector({ selectedWagon, onWagonChange, totalWagons }) {
  // Створюємо масив номерів вагонів (1, 2, 3, ...)
  const wagonNumbers = Array.from({ length: totalWagons }, (_, i) => i + 1)

  return (
    <div className="wagon-selector">
      <label className="wagon-label">Виберіть вагон:</label>
      <div className="wagon-buttons">
        {wagonNumbers.map(number => (
          <button
            key={number}
            type="button"
            className={`wagon-button ${selectedWagon === number ? 'active' : ''}`}
            onClick={() => onWagonChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default WagonSelector