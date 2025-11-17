import { useState, useEffect, useCallback } from "react";
import { cartService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CART_KEY = "cart";

// Carrito local (para usuarios no autenticados)
const getCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar carrito al montar (local o del servidor)
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated()) {
        // Usuario autenticado: cargar desde servidor
        try {
          setLoading(true);
          const response = await cartService.getCart();
          
          if (response.success && response.cart) {
            // Transformar formato del backend al formato del frontend
            const transformedCart = response.cart.items.map(item => ({
              _id: item.product._id,
              name: item.product.name,
              price: item.unitPrice,
              quantity: item.quantity,
              image: item.product.image,
              description: item.product.description,
              categoryName: item.product.categoryName,
            }));
            setCart(transformedCart);

            // Sincronizar con localStorage
            localStorage.setItem(CART_KEY, JSON.stringify(transformedCart));
          }
        } catch (err) {
          console.error("Error al cargar carrito del servidor:", err);
          setCart([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Usuario no autenticado: limpiar carrito
        setCart([]);
        localStorage.removeItem(CART_KEY);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Ya no sincronizamos con localStorage para usuarios no autenticados
  // Los productos solo se guardan en el servidor cuando el usuario está autenticado


  // Agregar producto al carrito
  const addToCart = useCallback(async (product, quantity = 1) => {
    setError(null);
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated()) {
      setError("Por favor inicia sesión para agregar productos al carrito");
      throw new Error("Por favor inicia sesión para agregar productos al carrito");
    }
    
    // Usuario autenticado: enviar al servidor
    try {
      setLoading(true);
      const response = await cartService.addToCart(product._id, quantity);
      
      if (response.success && response.cart) {
        const transformedCart = response.cart.items.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.unitPrice,
          quantity: item.quantity,
          image: item.product.image,
          description: item.product.description,
          categoryName: item.product.categoryName,
        }));
        setCart(transformedCart);
        localStorage.setItem(CART_KEY, JSON.stringify(transformedCart));
      }
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      setError(err.message || "Error al agregar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Actualizar cantidad de un producto
  const updateQuantity = useCallback(async (productId, quantity) => {
    setError(null);
    
    if (isAuthenticated()) {
      // Usuario autenticado: enviar al servidor
      try {
        setLoading(true);
        const response = await cartService.updateCartItem(productId, quantity);
        
        if (response.success && response.cart) {
          const transformedCart = response.cart.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.unitPrice,
            quantity: item.quantity,
            image: item.product.image,
            description: item.product.description,
            categoryName: item.product.categoryName,
          }));
          setCart(transformedCart);
          localStorage.setItem(CART_KEY, JSON.stringify(transformedCart));
        }
      } catch (err) {
        console.error("Error al actualizar cantidad:", err);
        setError(err.message || "Error al actualizar producto");
      } finally {
        setLoading(false);
      }
    } else {
      // Usuario no autenticado: actualizar localStorage
      setCart(prev => prev.map(item => 
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  }, [isAuthenticated]);

  // Eliminar producto del carrito
  const removeFromCart = useCallback(async (productId) => {
    setError(null);
    
    if (isAuthenticated()) {
      // Usuario autenticado: enviar al servidor
      try {
        setLoading(true);
        const response = await cartService.removeFromCart(productId);
        
        if (response.success && response.cart) {
          const transformedCart = response.cart.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.unitPrice,
            quantity: item.quantity,
            image: item.product.image,
            description: item.product.description,
            categoryName: item.product.categoryName,
          }));
          setCart(transformedCart);
          localStorage.setItem(CART_KEY, JSON.stringify(transformedCart));
        }
      } catch (err) {
        console.error("Error al eliminar del carrito:", err);
        setError(err.message || "Error al eliminar producto");
      } finally {
        setLoading(false);
      }
    } else {
      // Usuario no autenticado: actualizar localStorage
      setCart(prev => prev.filter(item => item._id !== productId));
    }
  }, [isAuthenticated]);

  // Vaciar carrito
  const clearCart = useCallback(async () => {
    setError(null);
    
    if (isAuthenticated()) {
      // Usuario autenticado: enviar al servidor
      try {
        setLoading(true);
        await cartService.clearCart();
        setCart([]);
        localStorage.removeItem(CART_KEY);
      } catch (err) {
        console.error("Error al vaciar carrito:", err);
        setError(err.message || "Error al vaciar carrito");
      } finally {
        setLoading(false);
      }
    } else {
      // Usuario no autenticado: limpiar localStorage
      setCart([]);
      localStorage.removeItem(CART_KEY);
    }
  }, [isAuthenticated]);

  // Sincronizar carrito local con el servidor al hacer login
  const syncCartWithServer = useCallback(async () => {
    const localCart = getCartFromStorage();
    
    if (localCart.length > 0 && isAuthenticated()) {
      try {
        setLoading(true);
        // Agregar cada producto del carrito local al servidor
        for (const item of localCart) {
          await cartService.addToCart(item._id, item.quantity);
        }
        
        // Recargar carrito desde el servidor
        const response = await cartService.getCart();
        if (response.success && response.cart) {
          const transformedCart = response.cart.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.unitPrice,
            quantity: item.quantity,
            image: item.product.image,
            description: item.product.description,
            categoryName: item.product.categoryName,
          }));
          setCart(transformedCart);
          localStorage.setItem(CART_KEY, JSON.stringify(transformedCart));
        }
      } catch (err) {
        console.error("Error al sincronizar carrito:", err);
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated]);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    syncCartWithServer,
  };
}; 