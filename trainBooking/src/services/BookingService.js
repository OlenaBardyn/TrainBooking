const s_key = 'train_bookings'

export const getBookings = () => {
  const data = localStorage.getItem(s_key)
  if (!data) return []
  return JSON.parse(data)
}

export const saveBooking = (booking) => {
  const bookings = getBookings()
  const newBooking = {
    id: Date.now(),
    ...booking
  }
  bookings.push(newBooking)
  localStorage.setItem(s_key, JSON.stringify(bookings))
  return newBooking
}

export const getBookedSeatsByTrain = (trainId) => {
  const bookings = getBookings()
  const result = {}
  
  bookings.forEach(booking => {
    if (booking.trainId === trainId) {
      if (!result[booking.wagon]) {
        result[booking.wagon] = []
      }
      // Перевіряємо, чи booking.seats є масивом
      if (Array.isArray(booking.seats)) {
        result[booking.wagon] = [...result[booking.wagon], ...booking.seats]
      } else if (typeof booking.seats === 'number') {
        result[booking.wagon].push(booking.seats)
      }
    }
  })
  
  return result
}