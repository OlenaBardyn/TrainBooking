import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { trains } from '../data/trains'
import { getBookedSeatsByTrain } from '../services/BookingService'
import SeatMap from '../components/SeatMap'
import BookingForm from '../components/BookingForm'
import './Booking.css'

function Booking() {
  const { trainId } = useParams()
  const train = trains.find(t => t.id === parseInt(trainId))
  
  const [selectedSeats, setSelectedSeats] = useState({})
  const [bookedSeatsMap, setBookedSeatsMap] = useState({}) 
  const wagons = [1, 2, 3, 4, 5]
  const seatPrice = train.price

  useEffect(() => {
    if (train) {
      const booked = getBookedSeatsByTrain(train.id)
      setBookedSeatsMap(booked)
    }
  }, [train])

  const handleSeatToggle = (wagon, seat) => {
    // Перевіряємо, чи місце вже заброньоване іншими
    const seatsInWagon = bookedSeatsMap[wagon] || []
    let isAlreadyBooked = false
    
    for (let i = 0; i < seatsInWagon.length; i++) {
      if (seatsInWagon[i] === seat) {
        isAlreadyBooked = true
        break
      }
    }

    if (isAlreadyBooked) return

    // Логіка вибору/скасування місця
    setSelectedSeats(prev => {
      const current = prev[wagon] || []
      
      // Перевіряємо, чи ми вже вибрали це місце (щоб прибрати його)
      let index = -1
      for (let i = 0; i < current.length; i++) {
        if (current[i] === seat) {
          index = i
          break
        }
      }

      if (index !== -1) {
        // Якщо місце вже в списку — видаляємо його
        const newSeats = []
        for (let i = 0; i < current.length; i++) {
          if (i !== index) newSeats.push(current[i])
        }
        return { ...prev, [wagon]: newSeats }
      } else {
        // Якщо місця немає — додаємо
        return { ...prev, [wagon]: [...current, seat] }
      }
    })
  }

  const handleRemoveSeat = (wagon, seat) => {
    setSelectedSeats(prev => {
      const current = prev[wagon] || []
      const newSeats = []
      for (let i = 0; i < current.length; i++) {
        if (current[i] !== seat) {
          newSeats.push(current[i])
        }
      }
      return { ...prev, [wagon]: newSeats }
    })
  }

  const handleBookingSuccess = () => {
    // Оновлюємо дані з бази після успішного бронювання
    const updatedBooked = getBookedSeatsByTrain(train.id)
    setBookedSeatsMap(updatedBooked)
    // Очищуємо вибір
    setSelectedSeats({})
  }

  let totalSelectedCount = 0
  for (let wagonKey in selectedSeats) {
    const seatsArray = selectedSeats[wagonKey]
    totalSelectedCount = totalSelectedCount + seatsArray.length
  }
  const totalPrice = totalSelectedCount * seatPrice


  if (!train) return <div>Потяг не знайдено</div>

  return (
    <div className="booking">
      <div className="booking-container">
        <div className="seats-section">
          {wagons.map(wagon => (
            <SeatMap
              key={wagon}
              wagonNumber={wagon}
              selectedSeats={selectedSeats[wagon] || []}
              bookedSeats={bookedSeatsMap[wagon] || []}
              onSeatToggle={(seat) => handleSeatToggle(wagon, seat)}
            />
          ))}
        </div>
        <div className="form-section">
          <BookingForm
            trainId={train.id}
            selectedSeats={selectedSeats}
            onRemoveSeat={handleRemoveSeat}
            totalPrice={totalPrice}
            onSuccess={handleBookingSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export default Booking