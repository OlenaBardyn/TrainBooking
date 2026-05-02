import { useState } from 'react'
import './Home.css'

function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')

  const swapCities = () => {
    const swap = from
    setFrom(to)
    setTo(swap)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    alert(`пошук маршрутів буде згодом`)
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
      </main>
    </div>
  )
}

export default Home