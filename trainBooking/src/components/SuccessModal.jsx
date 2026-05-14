import './SuccessModal.css'

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Бронювання успішне!</h2>
        <p>Ваші місця успішно заброньовано. Приємної подорожі!</p>
        <button className="modal-btn" onClick={onClose}>
          Чудово
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;