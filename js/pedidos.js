// ============================================
// pedidos.js - Módulo de Gestión de Pedidos
// ============================================
// Responsabilidades: calcular totales, validar datos, crear pedidos

export const PedidosModule = (() => {
    // IVA por defecto (19%)
    const IVA_RATE = 0.19;

    /**
     * Calcula el total de un pedido
     * @param {number} cantidad - Cantidad de items
     * @param {number} precioUnitario - Precio por unidad
     * @returns {Object} - { subtotal, iva, total }
     */
    const calcularTotal = (cantidad, precioUnitario) => {
        const subtotal = cantidad * precioUnitario;
        const iva = subtotal * IVA_RATE;
        const total = subtotal + iva;

        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            iva: parseFloat(iva.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    };

    /**
     * Valida los datos del pedido
     * @param {string} productoId - ID del producto seleccionado
     * @param {number} cantidad - Cantidad
     * @param {number} precio - Precio unitario
     * @returns {Object} - { valido: boolean, errores: Array }
     */
    const validarPedido = (productoId, cantidad, precio) => {
        const errores = [];

        // TODO: Mejorar validaciones - agregar más reglas
        if (!productoId || productoId === '') {
            errores.push('Debe seleccionar un producto');
        }
        if (!cantidad || Number(cantidad) <= 0) {
            errores.push('La cantidad debe ser mayor a 0');
        }
        if (!precio || Number(precio) <= 0) {
            errores.push('El precio debe ser mayor a 0');
        }

        return {
            valido: errores.length === 0,
            errores: errores
        };
    };

    /**
     * Procesa un pedido: valida, calcula y retorna datos
     * @param {string} productoId - ID del producto
     * @param {number} cantidad - Cantidad
     * @param {number} precio - Precio unitario
     * @returns {Object} - Datos del pedido procesado o null si hay errores
     */
    const procesarPedido = (productoId, cantidad, precio) => {
        // Convertir a números
        cantidad = Number(cantidad);
        precio = Number(precio);

        // Validar
        const validacion = validarPedido(productoId, cantidad, precio);
        if (!validacion.valido) {
            return null;
        }

        // Calcular
        const calculo = calcularTotal(cantidad, precio);

        return {
            productoId,
            cantidad,
            precio,
            ...calculo
        };
    };

    /**
     * Formatea un pedido para mostrar
     * @param {Object} pedido - Objeto del pedido
     * @returns {string} - HTML del pedido formateado
     */
    const formatearPedido = (pedido) => {
        if (!pedido) return '';
        
        return `
            <div class="pedido-item">
                <strong>Producto:</strong> ${pedido.productoId}<br>
                <strong>Cantidad:</strong> ${pedido.cantidad}<br>
                <strong>Precio Unit:</strong> $${pedido.precio.toFixed(2)}<br>
                <strong>Subtotal:</strong> $${pedido.subtotal}<br>
                <strong>IVA (19%):</strong> $${pedido.iva}<br>
                <strong style="color: #27ae60;">TOTAL: $${pedido.total}</strong>
            </div>
        `;
    };

    /**
     * Crea un producto en Firebase (requiere autenticación)
     * @param {string} nombre - Nombre del producto
     * @param {number} precio - Precio del producto
     * @returns {Promise} - Promesa de creación
     */
    const crearProducto = async (nombre, precio) => {
        // Validar entrada
        if (!nombre || nombre.trim() === '' || precio <= 0) {
            throw new Error('Datos inválidos: nombre y precio requeridos');
        }

        const url = 'https://resto-app-f709c-default-rtdb.firebaseio.com/menu.json';
        const body = {
            name: nombre.trim(),
            price: Number(precio)
        };

        try {
            // TODO: Agregar autenticación real y validación de permisos
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error('Error al crear producto en BD');
            
            const resultado = await response.json();
            return { exito: true, id: resultado.name, datos: body };
        } catch (error) {
            console.error('Error creando producto:', error);
            throw error;
        }
    };

    return {
        calcularTotal,
        validarPedido,
        procesarPedido,
        formatearPedido,
        crearProducto,
        IVA_RATE
    };
})();
