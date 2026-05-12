import { useParams } from 'react-router-dom'
import { trains } from '../data/trains'
import './Booking.css'

function Booking() {
  const { trainId } = useParams()
  
  // Знаходимо потяг за id
  const train = trains.find(t => t.id === parseInt(trainId))
  
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
            <p>Тут буде схема вагонів та місць</p>
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