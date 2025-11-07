import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll();
      
      if (response.success) {
        setProducts(response.products);
      } else {
        setError('Error al cargar productos');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Error al cargar productos');
      // Fallback a productos vacíos
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refreshProducts
  };
};
