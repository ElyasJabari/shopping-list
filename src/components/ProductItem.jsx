import { useState, useRef, useEffect } from 'react';
import '../styles.css';

export const ProductItem = ({ product, onToggleCheck, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const editInputRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editedName.trim()) {
            onEdit({ ...product, name: editedName });
        }
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(product.name);
        setDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

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
            
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="inline-edit-form">
                    <input
                        ref={editInputRef}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="inline-edit-input"
                        onBlur={handleEditSubmit}
                        onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
                    />
                </form>
            ) : (
                <span className={`product-name ${product.checked ? 'checked' : ''}`}>
                    {product.name}
                </span>
            )}
            
            <div className="product-actions" ref={dropdownRef}>
                <div className="dropdown">
                    <button 
                        className="dots" 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        ⋯
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button 
                                className="dropdown-item"
                                onClick={handleEditClick}
                            >
                                Bearbeiten
                            </button>
                            <button 
                                className="dropdown-item delete"
                                onClick={() => {
                                    onDelete(product.id);
                                    setDropdownOpen(false);
                                }}
                            >
                                Löschen
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};