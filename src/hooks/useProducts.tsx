import { useEffect, useState } from 'react';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                const result = await response.json();
                setProducts(result);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return {
        products,
        loading,
    };
};