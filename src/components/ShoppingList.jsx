import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { categories, filterProducts, groupByCategory } from '../utils/productUtils';
import { ProductForm } from './ProductForm';
import { FilterControls } from './FilterControls';
import { CategorySection } from './CategorySection';
import { ShareModal } from './ShareModal';
import { ConfirmDialog } from './ConfirmDialog';
import '../styles.css';

export const ShoppingList = () => {
    const {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        clearProducts,
        shareProducts,
        loadSharedProducts
    } = useProducts();

    const [inputText, setInputText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Rest');
    const [filter, setFilter] = useState('all');
    const [editingProductId, setEditingProductId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareLink, setShareLink] = useState('');

    // Beim Laden auf Shared Data prüfen
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const compressed = params.get('s');
        
        if (compressed) {
            const success = loadSharedProducts(compressed);
            if (success) {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }, [loadSharedProducts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        if (editingProductId) {
            updateProduct(editingProductId, {
                name: inputText,
                category: selectedCategory
            });
            setEditingProductId(null);
        } else {
            addProduct({
                name: inputText,
                category: selectedCategory
            });
        }
        setInputText('');
    };

    const handleShareClick = async () => {
        try {
            const url = await shareProducts();
            
            if (navigator.share) {
                await navigator.share({
                    title: 'Einkaufsliste',
                    text: 'Meine Einkaufsliste',
                    url
                });
            } else {
                setShareLink(url);
                setShowShareModal(true);
                try {
                    await navigator.clipboard.writeText(url);
                } catch (err) {
                    const input = document.createElement('input');
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                }
            }
        } catch (error) {
            console.error('Fehler beim Teilen:', error);
        }
    };

    const filteredProducts = filterProducts(products, filter);
    const productsByCategory = groupByCategory(filteredProducts);

    return (
        <div className="shopping-list">
            <button onClick={handleShareClick} className="share-button">
                📤 Liste Teilen
            </button>

            {showShareModal && (
                <ShareModal 
                    shareLink={shareLink}
                    onClose={() => setShowShareModal(false)}
                />
            )}

            <ProductForm
                onSubmit={handleSubmit}
                inputText={inputText}
                onInputChange={(e) => setInputText(e.target.value)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                isEditing={!!editingProductId}
            />

            <FilterControls
                currentFilter={filter}
                onFilterChange={setFilter}
                onClearAll={() => setShowConfirmDialog(true)}
            />

            <div className="product-list">
                {categories.map(category => {
                    const categoryProducts = productsByCategory[category] || [];
                    if (categoryProducts.length === 0) return null;
                    
                    return (
                        <CategorySection
                            key={category}
                            category={category}
                            products={categoryProducts}
                            onToggleCheck={(id) => updateProduct(id, { checked: !products.find(p => p.id === id).checked })}
                            onEdit={(product) => {
                                setInputText(product.name);
                                setSelectedCategory(product.category);
                                setEditingProductId(product.id);
                            }}
                            onDelete={deleteProduct}
                        />
                    );
                })}
            </div>

            {showConfirmDialog && (
                <ConfirmDialog
                    message="Möchten Sie wirklich alle Produkte löschen?"
                    onConfirm={() => {
                        clearProducts();
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
        </div>
    );
};

export default ShoppingList;