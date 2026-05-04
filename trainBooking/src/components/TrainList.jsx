import TrainCard from './TrainCard'
import './TrainList.css'

function TrainList({ trains }) {
  if (trains.length === 0) {
    return <div className="no-results">Рейсів не знайдено</div>
  }

  return (
    <div className="train-list">
      <div className="train-list-header">
        <div>Номер потяга</div>
        <div>Маршрут</div>
        <div>Дата</div>
        <div>Час відпр.</div>
        <div>Тривалість</div>
      </div>
    
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  )
}

export default TrainList