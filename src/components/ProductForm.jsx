import { categories } from '../utils/productUtils';
import '../styles.css';

export const ProductForm = ({ 
    onSubmit, 
    inputText, 
    onInputChange, 
    selectedCategory, 
    onCategoryChange,
    isEditing 
}) => {
    return (
        <form onSubmit={onSubmit} className="form-container">
            <div className="input-group">
                <input
                    type="text"
                    value={inputText}
                    onChange={onInputChange}
                    placeholder="Produkt eingeben"
                    className="text-input"
                />
                <button type="submit" className="submit-button">
                    {isEditing ? '✎ Aktualisieren' : '➕ Hinzufügen'}
                </button>
            </div>
            
            <div className="category-buttons">
                {categories.map(category => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onCategoryChange(category)}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </form>
    );
};