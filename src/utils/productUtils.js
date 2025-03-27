export const categories = ['Obst', 'Gemüse', 'Milchprodukte', 'Rest'];

export const toMinimalProducts = (products) => {
    return products.map(p => [
        p.name[0],
        p.name.slice(1),
        p.category[0], 
        p.checked ? 1 : 0
    ]);
};

export const fromMinimalProducts = (minimalProducts) => {
    return minimalProducts.map(m => ({
        id: Date.now() + Math.random(),
        name: m[0] + m[1],
        category: categories.find(c => c[0] === m[2]) || 'Rest',
        checked: !!m[3]
    }));
};

export const filterProducts = (products, filter) => {
    return products.filter(product => {
        if (filter === 'checked') return product.checked;
        if (filter === 'unchecked') return !product.checked;
        return true;
    });
};

export const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
    }, {});
};