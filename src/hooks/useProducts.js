import { useState, useEffect } from 'react';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { toMinimalProducts, fromMinimalProducts } from '../utils/productUtils';

export const useProducts = () => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('shoppingListProducts');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    useEffect(() => {
        localStorage.setItem('shoppingListProducts', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        setProducts([...products, {
            id: Date.now(),
            ...product,
            checked: false
        }]);
    };

    const updateProduct = (id, updates) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, ...updates } : product
        ));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const clearProducts = () => {
        setProducts([]);
    };

    const shareProducts = async () => {
        const minimalProducts = toMinimalProducts(products);
        const jsonStr = JSON.stringify(minimalProducts);
        const compressed = compressToEncodedURIComponent(jsonStr);
        const baseUrl = window.location.href.split('?')[0];
        return `${baseUrl}?s=${compressed}`;
    };

    const loadSharedProducts = (compressed) => {
        try {
            const jsonStr = decompressFromEncodedURIComponent(compressed);
            if (jsonStr) {
                const minimalProducts = JSON.parse(jsonStr);
                const fullProducts = fromMinimalProducts(minimalProducts);
                setProducts(fullProducts);
                return true;
            }
        } catch (error) {
            console.error('Fehler beim Dekodieren:', error);
            return false;
        }
    };

    return {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        clearProducts,
        shareProducts,
        loadSharedProducts
    };
};