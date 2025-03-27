import { useState } from 'react';
import { ProductItem } from './ProductItem';
import '../styles.css';

export const CategorySection = ({ 
    category, 
    products, 
    onToggleCheck, 
    onEdit, 
    onDelete 
}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="category-section">
            <h2 
                onClick={() => setIsOpen(!isOpen)}
                className="category-header"
            >
                <span className="category-title">{category}</span>
                <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
            </h2>
            {isOpen && (
                <ul className="product-items">
                    {products.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onToggleCheck={onToggleCheck}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};