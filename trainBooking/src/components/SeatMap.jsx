import './SeatMap.css'

function SeatMap({ wagonNumber, selectedSeats, bookedSeats = [], onSeatToggle }) {
  const upperSeats = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
  const lowerSeats = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]

  const getSeatClass = (seat) => {
    if (bookedSeats.includes(seat)) return 'seat booked'
    if (selectedSeats.includes(seat)) return 'seat selected'
    return 'seat'
  }

  const handleClick = (seat) => {
    if (bookedSeats.includes(seat)) return
    onSeatToggle(seat)
  }

  return (
    <div className="seat-map">
      <div className="wagon-title">Вагон {wagonNumber}</div>
      <div className="seats-container">
        <div className="seat-row">
          {upperSeats.map(seat => (
            <button
              key={seat}
              className={getSeatClass(seat)}
              onClick={() => handleClick(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
        <div className="seat-row">
          {lowerSeats.map(seat => (
            <button
              key={seat}
              className={getSeatClass(seat)}
              onClick={() => handleClick(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeatMap