import '../styles.css';

export const ConfirmDialog = ({ 
    message, 
    onConfirm, 
    onCancel 
}) => {
    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="confirm-dialog-buttons">
                    <button 
                        onClick={onConfirm}
                        className="confirm-button"
                    >
                        Löschen
                    </button>
                    <button
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>
    );
};