// ============================================
// menu.js - Módulo de Gestión de Catálogo
// ============================================
// Responsabilidades: cargar catálogo, actualizar select, gestionar datos de productos
// TODO: Implementar caché local para reducir llamadas a Firebase

export const MenuModule = (() => {
    const MENU_URL = 'https://resto-app-f709c-default-rtdb.firebaseio.com/menu.json';
    let menuData = {};

    /**
     * Carga el menú desde Realtime Database
     * @param {string} selectId - ID del elemento select a llenar
     * @returns {Promise}
     */
    const cargarMenu = async (selectId = 'a') => {
        try {
            const response = await fetch(MENU_URL);
            if (!response.ok) throw new Error('Error al cargar menú');
            
            const data = await response.json();
            menuData = procesarDatos(data);
            
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">--Selecciona plato--</option>';
                Object.entries(menuData).forEach(([id, { name, price }]) => {
                    const opt = document.createElement('option');
                    opt.value = id;
                    opt.text = `${name} ($${price.toFixed(2)})`;
                    select.appendChild(opt);
                });
            }
            return menuData;
        } catch (error) {
            console.error('Error cargando menú:', error);
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">--Error cargando menú--</option>';
            }
            throw error;
        }
    };

    /**
     * Procesa los datos del menú (array u objeto)
     * @param {Array|Object} data - Datos crudos del menú
     * @returns {Object} - Menú procesado con estructura { id: { name, price } }
     */
    const procesarDatos = (data) => {
        const resultado = {};
        
        if (Array.isArray(data)) {
            data.forEach((item, idx) => {
                const id = item.id || idx;
                resultado[id] = {
                    name: item.name || `Plato ${id}`,
                    price: Number(item.price || item.precio || 0)
                };
            });
        } else if (typeof data === 'object' && data !== null) {
            Object.entries(data).forEach(([key, item]) => {
                resultado[key] = {
                    name: item.name || key,
                    price: Number(item.price || item.precio || 0)
                };
            });
        }
        return resultado;
    };

    /**
     * Obtiene el precio de un plato
     * @param {string|number} id - ID del plato
     * @returns {number} - Precio del plato
     */
    const obtenerPrecio = (id) => {
        return menuData[id]?.price || 0;
    };

    /**
     * Obtiene el nombre de un plato
     * @param {string|number} id - ID del plato
     * @returns {string} - Nombre del plato
     */
    const obtenerNombre = (id) => {
        return menuData[id]?.name || 'Producto desconocido';
    };

    /**
     * Retorna todo el menú
     * @returns {Object} - Menú completo
     */
    const obtenerMenuCompleto = () => menuData;

    return {
        cargarMenu,
        obtenerPrecio,
        obtenerNombre,
        obtenerMenuCompleto,
        procesarDatos
    };
})();
