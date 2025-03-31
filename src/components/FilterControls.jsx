import '../styles.css';

export const FilterControls = ({ 
    currentFilter, 
    onFilterChange, 
    onClearAll 
}) => {
    return (
        <div className="filter-buttons">
            <button 
                onClick={() => onFilterChange('all')}
                className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
            >
                Alle
            </button>
            <button 
                onClick={() => onFilterChange('unchecked')}
                className={`filter-button ${currentFilter === 'unchecked' ? 'active' : ''}`}
            >
                Offen
            </button>
            <button 
                onClick={() => onFilterChange('checked')}
                className={`filter-button ${currentFilter === 'checked' ? 'active' : ''}`}
            >
                Fertig
            </button>
            <button 
                onClick={onClearAll}
                className="clear-button"
            >
                🗑️ Alle löschen
            </button>
        </div>
    );
};