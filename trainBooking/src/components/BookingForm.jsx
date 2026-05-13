import { useState } from 'react'
import { saveBooking } from '../services/BookingService'
import './BookingForm.css'

function BookingForm({ trainId, selectedSeats, onRemoveSeat, totalPrice, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове"
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обов\'язковий'
    if (!formData.email.trim()) newErrors.email = 'Email обов\'язковий'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Невірний формат email'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    setIsSubmitting(true)

    // Проходимо по кожному вагону в обраних місцях
    for (let wagonNumber in selectedSeats) {
      const seatsArray = selectedSeats[wagonNumber]

      if (seatsArray.length > 0) {
        const booking = {
          trainId: trainId,
          wagon: Number(wagonNumber), 
          seats: seatsArray,       
          passenger: formData,
          totalPrice: totalPrice,
        }
        
        saveBooking(booking)
      }
    }

    setIsSubmitting(false)
    alert('✅ Бронювання успішне!')
    
    if (onSuccess) onSuccess()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }


  const seatsList = []
  for (let wagon in selectedSeats) {
    const seats = selectedSeats[wagon]
    for (let i = 0; i < seats.length; i++) {
      seatsList.push({ 
        wagon: Number(wagon), 
        seat: seats[i] 
      })
    }
  }

  return (
    <div className="booking-form">
      <h3>Обрані місця</h3>
      
      {seatsList.length === 0 ? (
        <p className="no-seats">Місця не обрані</p>
      ) : (
        <>
          {seatsList.map((item) => (
            <div key={`${item.wagon}-${item.seat}`} className="selected-item">
              <span>Вагон {item.wagon}, місце {item.seat}</span>
              <button onClick={() => onRemoveSeat(item.wagon, item.seat)}>✕</button>
            </div>
          ))}

          <div className="total-price">
            <span>Усього:</span>
            <span>{totalPrice} ₴</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ім'я"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Бронюємо...' : 'Забронювати'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default BookingForm