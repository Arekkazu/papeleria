import axios from 'axios';

// URL base del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Configuración de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para enviar cookies
});

// Servicios de descuentos
export const discountService = {
  // Crear descuento desde Dragon Ball API
  createFromDragonBall: async (discountData) => {
    try {
      const response = await api.post('/discounts/dragonball', discountData);
      return response.data;
    } catch (error) {
      console.error('Error al crear descuento:', error);
      throw error.response?.data || error;
    }
  },

  // Obtener todos los descuentos activos
  getActive: async () => {
    try {
      const response = await api.get('/discounts/active');
      return response.data;
    } catch (error) {
      console.error('Error al obtener descuentos:', error);
      throw error.response?.data || error;
    }
  },

  // Validar un código de descuento
  validate: async (code) => {
    try {
      const response = await api.post('/discounts/validate', { code });
      return response.data;
    } catch (error) {
      console.error('Error al validar descuento:', error);
      throw error.response?.data || error;
    }
  },

  // Obtener descuento por código
  getByCode: async (code) => {
    try {
      const response = await api.get(`/discounts/code/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener descuento:', error);
      throw error.response?.data || error;
    }
  },
};

// Servicios de productos
export const productService = {
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error.response?.data || error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error.response?.data || error;
    }
  },
};

// Servicios de carrito
export const cartService = {
  // Obtener carrito del usuario autenticado
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      throw error.response?.data || error;
    }
  },

  // Agregar producto al carrito
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      throw error.response?.data || error;
    }
  },

  // Actualizar cantidad de un producto
  updateCartItem: async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/item/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
      throw error.response?.data || error;
    }
  },

  // Eliminar producto del carrito (cantidad = 0)
  removeFromCart: async (productId) => {
    try {
      const response = await api.put(`/cart/item/${productId}`, { quantity: 0 });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error.response?.data || error;
    }
  },

  // Vaciar carrito completamente
  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear');
      return response.data;
    } catch (error) {
      console.error('Error al limpiar carrito:', error);
      throw error.response?.data || error;
    }
  },

  // Aplicar código de descuento
  applyDiscount: async (discountCode) => {
    try {
      const response = await api.post('/cart/apply-discount', { discountCode });
      return response.data;
    } catch (error) {
      console.error('Error al aplicar descuento:', error);
      throw error.response?.data || error;
    }
  },

  // Remover descuento
  removeDiscount: async () => {
    try {
      const response = await api.delete('/cart/remove-discount');
      return response.data;
    } catch (error) {
      console.error('Error al remover descuento:', error);
      throw error.response?.data || error;
    }
  },

  // Finalizar compra (checkout)
  checkout: async () => {
    try {
      const response = await api.post('/cart/checkout');
      return response.data;
    } catch (error) {
      console.error('Error al completar compra:', error);
      throw error.response?.data || error;
    }
  },
};

// Servicios de autenticación
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error.response?.data || error;
    }
  },

  verifyAuth: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      throw error.response?.data || error;
    }
  },
};

// Servicios de administración
export const adminService = {
  // Dashboard
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error.response?.data || error;
    }
  },

  // Usuarios
  getUsers: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/admin/users', {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error.response?.data || error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error.response?.data || error;
    }
  },

  updateUserRole: async (userId, roleId) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, { roleId });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      throw error.response?.data || error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error.response?.data || error;
    }
  },

  // Productos
  getProductsAdmin: async (page = 1, limit = 10, category = '', search = '') => {
    try {
      const response = await api.get('/admin/products', {
        params: { page, limit, category, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error.response?.data || error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error.response?.data || error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/admin/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error.response?.data || error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error.response?.data || error;
    }
  },

  // Categorías
  getCategoriesAdmin: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/admin/categories', {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error.response?.data || error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/admin/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error.response?.data || error;
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error.response?.data || error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/admin/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error.response?.data || error;
    }
  },

  // Proveedores
  getSuppliersAdmin: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/admin/suppliers', {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      throw error.response?.data || error;
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await api.post('/admin/suppliers', supplierData);
      return response.data;
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      throw error.response?.data || error;
    }
  },

  updateSupplier: async (supplierId, supplierData) => {
    try {
      const response = await api.put(`/admin/suppliers/${supplierId}`, supplierData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
      throw error.response?.data || error;
    }
  },

  deleteSupplier: async (supplierId) => {
    try {
      const response = await api.delete(`/admin/suppliers/${supplierId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      throw error.response?.data || error;
    }
  },
};

export default api;
