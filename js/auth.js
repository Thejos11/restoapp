// ============================================
// auth.js - Módulo de Autenticación
// ============================================
// Responsabilidades: login, logout, validación de sesión
// TODO: Reemplazar credenciales hardcodeadas con Firebase Auth
// TODO: Usar localStorage o sessionStorage para persistencia segura

export const AuthModule = (() => {
    let isLogged = false;
    
    // TODO: MALA PRÁCTICA - Estas credenciales NO deben estar en cliente
    // En producción, usar Firebase Auth o un backend seguro
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'admin';

    /**
     * Valida credenciales del usuario
     * @param {string} usuario - Usuario ingresado
     * @param {string} password - Contraseña ingresada
     * @returns {boolean} - true si las credenciales son válidas
     */
    const validarCredenciales = (usuario, password) => {
        // TODO: Implementar validación contra backend seguro
        return usuario === ADMIN_USER && password === ADMIN_PASS;
    };

    /**
     * Inicia sesión del usuario
     * @param {string} usuario - Usuario
     * @param {string} password - Contraseña
     * @param {Object} elementos - Objeto con referencias a elementos DOM
     * @returns {boolean} - true si el login fue exitoso
     */
    const login = (usuario, password, elementos = {}) => {
        if (validarCredenciales(usuario, password)) {
            isLogged = true;
            
            // Actualizar UI si se proporciona
            if (elementos.authMsg) {
                elementos.authMsg.textContent = 'Autenticado';
                elementos.authMsg.classList.add('success');
            }
            if (elementos.loginBtn) elementos.loginBtn.style.display = 'none';
            if (elementos.logoutBtn) elementos.logoutBtn.style.display = 'inline-block';
            if (elementos.productForm) elementos.productForm.classList.add('active');
            
            return true;
        } else {
            if (elementos.authMsg) {
                elementos.authMsg.textContent = 'Credenciales inválidas';
                elementos.authMsg.classList.remove('success');
            }
            return false;
        }
    };

    /**
     * Cierra la sesión del usuario
     * @param {Object} elementos - Objeto con referencias a elementos DOM
     */
    const logout = (elementos = {}) => {
        isLogged = false;
        
        if (elementos.authMsg) {
            elementos.authMsg.textContent = '';
            elementos.authMsg.classList.remove('success');
        }
        if (elementos.loginBtn) elementos.loginBtn.style.display = 'inline-block';
        if (elementos.logoutBtn) elementos.logoutBtn.style.display = 'none';
        if (elementos.productForm) elementos.productForm.classList.remove('active');
    };

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean}
     */
    const estaAutenticado = () => isLogged;

    return {
        login,
        logout,
        estaAutenticado,
        validarCredenciales
    };
})();
