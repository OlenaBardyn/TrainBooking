import './TrainCard.css'
function TrainCard({ train }) {
  return (
    <div className="train-card">
      <div className="train-number">{train.number}</div>
      <div className="train-route">{train.from} → {train.to}</div>
      <div className="train-date">{train.date}</div>
      <div className="train-time">{train.time}</div>
      <div className="train-duration">{train.duration}</div>
    </div>
  )
}

export default TrainCard