import { useNavigate } from 'react-router-dom'  
import './TrainCard.css'

function TrainCard({ train }) {
  const navigate = useNavigate() 

  const handleClick = () => {
    navigate(`/booking/${train.id}`)  
  }

  return (
    <div className="train-card" onClick={handleClick}>  
      <div className="train-number">{train.number}</div>
      <div className="train-route">{train.from} → {train.to}</div>
      <div className="train-date">{train.date}</div>
      <div className="train-time">{train.time}</div>
      <div className="train-duration">{train.duration}</div>
    </div>
  )
}

export default TrainCard