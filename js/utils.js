// ============================================
// utils.js - Utilidades y Helpers
// ============================================
// Funciones auxiliares reutilizables

export const Utils = (() => {
    /**
     * Limpia un formulario
     * @param {Array} inputIds - IDs de los inputs a limpiar
     */
    const limpiarFormulario = (inputIds = []) => {
        inputIds.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                if (elem.tagName === 'INPUT' || elem.tagName === 'SELECT') {
                    elem.value = '';
                }
            }
        });
    };

    /**
     * Muestra un mensaje en un contenedor
     * @param {string} containerId - ID del contenedor del mensaje
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - 'error', 'success', 'info'
     */
    const mostrarMensaje = (containerId, mensaje, tipo = 'info') => {
        const container = document.getElementById(containerId);
        if (container) {
            container.textContent = mensaje;
            container.className = `alert ${tipo}`;
        }
    };

    /**
     * Valida que un valor sea un número positivo
     * @param {any} valor - Valor a validar
     * @returns {boolean}
     */
    const esNumeroPositivo = (valor) => {
        const num = Number(valor);
        return !isNaN(num) && num > 0;
    };

    /**
     * Valida una entrada de texto
     * @param {string} texto - Texto a validar
     * @returns {boolean}
     */
    const esTextoValido = (texto) => {
        return typeof texto === 'string' && texto.trim().length > 0;
    };

    /**
     * Formatea un número a moneda
     * @param {number} valor - Valor a formatear
     * @param {string} moneda - Símbolo de moneda (default: $)
     * @returns {string}
     */
    const formatoMoneda = (valor, moneda = '$') => {
        return `${moneda}${Number(valor).toFixed(2)}`;
    };

    /**
     * Retarda la ejecución (para promesas)
     * @param {number} ms - Milisegundos
     * @returns {Promise}
     */
    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return {
        limpiarFormulario,
        mostrarMensaje,
        esNumeroPositivo,
        esTextoValido,
        formatoMoneda,
        esperar
    };
})();
