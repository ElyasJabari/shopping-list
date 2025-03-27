import '../styles.css';

export const ProductItem = ({ product, onToggleCheck, onEdit, onDelete }) => {
    return (
        <li className="product-item">
            <label className="checkbox-container">
                <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => onToggleCheck(product.id)}
                    className="checkbox-input"
                />
                <span className="checkmark"></span>
            </label>
            <span className={`product-name ${product.checked ? 'checked' : ''}`}>
                {product.name}
            </span>
            <div className="product-actions">
                <div className="dropdown">
                    <button className="dots">⋯</button>
                    <div className="dropdown-menu">
                        <button 
                            className="dropdown-item"
                            onClick={() => onEdit(product)}
                        >
                            Bearbeiten
                        </button>
                        <button 
                            className="dropdown-item delete"
                            onClick={() => onDelete(product.id)}
                        >
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};