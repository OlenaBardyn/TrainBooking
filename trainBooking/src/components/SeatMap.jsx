import './SeatMap.css'

function SeatMap({ selectedSeats, onSeatToggle, bookedSeats = [] }) {
  // Створюємо 2 ряди по 20 місць
  const rows = [
    { name: 'A', seats: Array.from({ length: 20 }, (_, i) => i + 1) },   // ряд A: місця 1-20
    { name: 'B', seats: Array.from({ length: 20 }, (_, i) => i + 1) }    // ряд B: місця 1-20
  ]

  const getSeatStatus = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`
    if (bookedSeats.includes(seatId)) return 'booked'
    if (selectedSeats.includes(seatId)) return 'selected'
    return 'free'
  }

  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`
    const status = getSeatStatus(row, seatNumber)
    
    if (status === 'booked') return // заброньовані місця не можна вибрати
    
    onSeatToggle(seatId)
  }

  return (
    <div className="seat-map">
      <div className="seat-legend">
        <span><span className="legend-free"></span> Вільні</span>
        <span><span className="legend-selected"></span> Обрані</span>
        <span><span className="legend-booked"></span> Заброньовані</span>
      </div>

      <div className="seats-container">
        {rows.map(row => (
          <div key={row.name} className="seat-row">
            <div className="row-label">{row.name}</div>
            <div className="seats">
              {row.seats.map(seatNumber => {
                const seatId = `${row.name}${seatNumber}`
                const status = getSeatStatus(row.name, seatNumber)
                return (
                  <button
                    key={seatId}
                    className={`seat ${status}`}
                    onClick={() => handleSeatClick(row.name, seatNumber)}
                  >
                    {seatNumber}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeatMap