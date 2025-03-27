import '../styles.css';

export const ShareModal = ({ shareLink, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="share-modal">
                <h3>Teilen-Link</h3>
                <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="share-link-input"
                    onClick={(e) => e.target.select()}
                />
                <button
                    onClick={onClose}
                    className="modal-close-button"
                >
                    Schließen
                </button>
                <p className="mobile-hint">Tippe lange auf den Link zum Kopieren</p>
            </div>
        </div>
    );
};