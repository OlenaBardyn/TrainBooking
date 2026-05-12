import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { trains } from '../data/trains'
import WagonSelector from '../components/WagonSelector'
import SeatMap from '../components/SeatMap' 
import './Booking.css'

function Booking() {
  const { trainId } = useParams()
  const train = trains.find(t => t.id === parseInt(trainId))
  
  const [selectedWagon, setSelectedWagon] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState([]) 

  // Приклад заброньованих місць (потім будуть з API)
  const bookedSeats = ['A5', 'A12', 'B8'] 

  const handleSeatToggle = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  if (!train) {
    return <div className="booking-error">Потяг не знайдено</div>
  }

  return (
    <div className="booking">
      <header className="booking-header">
        <h1>Бронювання квитків</h1>
      </header>

      <main className="booking-main">
        <div className="train-info">
          <h2>Потяг №{train.number}</h2>
          <p>{train.from} → {train.to}</p>
          <p>{train.date} | {train.time}</p>
        </div>

        <div className="booking-container">
          <div className="seats-section">
            <h3>Вибір місць</h3>
            
            <WagonSelector 
              selectedWagon={selectedWagon}
              onWagonChange={setSelectedWagon}
              totalWagons={5}
            />
            
            {/* Додано схему місць */}
            <SeatMap 
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
              bookedSeats={bookedSeats}
            />
            
            <p className="selected-info">
              Вибрано місць: {selectedSeats.length}
            </p>
          </div>

          <div className="form-section">
            <h3>Дані пасажира</h3>
            <p>Тут буде форма бронювання</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Booking