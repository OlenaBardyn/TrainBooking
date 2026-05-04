import { useState } from 'react'
import { trains } from '../data/trains'
import TrainList from '../components/TrainList'
import './Home.css'

function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [filteredTrains, setFilteredTrains] = useState([])

  const swapCities = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    const filtered = trains.filter(train => {
      // Фільтр за містом "Звідки"
      if (from && train.from !== from) return false
      
      // Фільтр за містом "Куди"
      if (to && train.to !== to) return false
      
      // Фільтр за датою
      if (date) {
        // Перетворення дати з input (рррр-мм-дд) у дд.мм.рррр
        const formattedDate = date.split('-').reverse().join('.')
        if (train.date !== formattedDate) return false
      }
      
      return true
    })
    
    setFilteredTrains(filtered)

  }

  return (
    <div className="home">
      <header className="header">
        <h1 >Залізниця</h1>
      </header>

      <main className="main">
        <h1>Ласкаво просимо!</h1>
        
        <form className="search-form" onSubmit={handleSearch}>

          <div className="city-fields">
            <input 
              type="text" 
              placeholder="Звідки"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="city-input"
            />
            <button type="button" className="swap-button" onClick={swapCities}>
              ⇄
            </button>
            <input 
              type="text" 
              placeholder="Куди"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="city-input"
            />
          </div>

          <div className="date-field">
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input"
            />
          </div>

          <button type="submit" className="search-button">
            Знайти
          </button>
        </form>

        <TrainList trains={filteredTrains} />
      </main>
    </div>
  )
}

export default Home