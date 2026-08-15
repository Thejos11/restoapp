# ComputeShop - Sistema de Gestión de Pedidos para Tienda de Computación

**Taller de Refactorización y Uso de IA**

## Resumen

**ComputeShop** es una plataforma de gestión de pedidos para una tienda de componentes y equipos de computación.
- **Proyecto base (legacy):** [index-legacy.html](index-legacy.html) — Código monolítico con malas prácticas intencionales
- **Versión refactorizada:** Estructura MPA modular, mantenible y escalable
- **Firebase:** Conectado a https://resto-app-f709c-default-rtdb.firebaseio.com/menu.json
- **Productos:** Procesadores, RAM, SSD, Tarjetas Gráficas, Fuentes de Poder, etc.

## Objetivo del Taller

- **Refactorización:** Transformar un código monolítico legacy en una **MPA (Multiple Page Application)** moderna, modular y mantenible.
- **IA como asistente:** Demostrar cómo usar inteligencia artificial para revisar, proponer y aplicar refactorizaciones incrementales.
- **SOLID + Diseño:** Aplicar principios SOLID y patrones de diseño en un e-commerce real de computación.
- **Educación:** Proporcionar un caso de uso realista que los estudiantes puedan extender y mejorar.

## Instrucciones Rápidas

1. **Ver la aplicación refactorizada:** Abre `index.html` en el navegador
2. **Comparar antes/después:** Revisa `index-legacy.html` para ver el código monolítico original
3. **Estudiar los módulos:** Explora `js/` para ver la refactorización y los patrones aplicados
4. **Funcionalidades:**
   - Navega a **Pedidos** para procesar compras
   - Accede a **Admin** (usuario: `admin`, contraseña: `admin`) para gestionar inventario
   - Añade nuevos productos al catálogo

Ejercicios sugeridos (orden recomendado)
- ## Ejercicios de Refactorización

### Ejercicio 1: Convertir a MPA ✅ COMPLETADO

**Objetivo:** Separar una aplicación monolítica en múltiples páginas HTML

**Implementación:**
- `index.html` — Landing page / Home
- `pages/login.html` — Autenticación de administrador
- `pages/pedido.html` — Catálogo de productos y formulario de pedidos
- `pages/admin.html` — Panel de administración (crear/editar inventario)
- `css/styles.css` — Estilos centralizados y reutilizables en todas las páginas

**Mejora:** Cada página tiene responsabilidad única y el CSS está centralizado para maintainability

- ### Ejercicio 2: Modularizar JavaScript ✅ COMPLETADO

**Objetivo:** Separar lógica de negocio en módulos independientes

**Módulos Implementados:**
- **`menu.js`** — Gestión de catálogo de productos (carga desde Firebase, obtiene precios)
- **`auth.js`** — Sistema de autenticación y control de sesiones
- **`pedidos.js`** — Lógica de procesamiento de pedidos (validaciones, cálculos de totales)
- **`utils.js`** — Utilidades comunes (formateo, limpieza de formularios, mensajes)

**Patrón Aplicado:** 
- Módulos IIFE (Immediately Invoked Function Expression) para encapsulación
- Sin variables globales
- Cada módulo exporta interfaz pública clara

- ### Ejercicio 3: Mejorar Autenticación y Seguridad ⚠️ EN PROGRESO

**Estado Actual:**
- Autenticación básica con credenciales de demostración (usuario: `admin`, contraseña: `admin`)

**TODOs Educativos:**
- [ ] Reemplazar credenciales hardcodeadas con **Firebase Authentication**
- [ ] Implementar un **backend Node.js/Express** con autenticación JWT
- [ ] Agregar **reglas de seguridad** en Realtime Database para restringir escritura
- [ ] Validar permisos antes de crear/modificar productos
- [ ] Usar HTTPS en producción

- ### Ejercicio 4: Limpieza y Pruebas ⚠️ EN PROGRESO

**Completado:**
- ✅ Eliminación de código muerto (funciones obsoletas, estilos redundantes)
- ✅ Validaciones robustas en cada módulo
- ✅ Mensajes de error claros y útiles para el usuario

**TODOs Educativos:**
- [ ] Escribir pruebas unitarias con **Jest** para módulos (menu.js, auth.js, pedidos.js)
- [ ] Pruebas de integración para flujo completo de pedido
- [ ] Pruebas de UI con **Cypress** o **Playwright**
- [ ] Agregar cobertura de código (>80%)

- ### Ejercicio 5: Buenas Prácticas ✅ COMPLETADO

**Implementación:**
- ✅ **Separación de responsabilidades:** Lógica de negocio independiente de manipulación DOM
- ✅ **Validaciones en capas:** Cada módulo valida sus propios datos
- ✅ **Manejo de errores:** Try-catch en operaciones asíncronas, feedback claro al usuario
- ✅ **Nomenclatura clara:** Variables y funciones con nombres descriptivos
- ✅ **Documentación:** Comentarios JSDoc en funciones públicas

Uso de la IA como asistente
- Pide a la IA que haga cambios pequeños y justificables: "Refactoriza `tomarTodo()` separando cálculos de impuestos.".
- Ejemplos de prompts útiles:
  - "Sugiéreme una estructura de archivos para convertir esto en una MPA." 
  - "Refactoriza este archivo para eliminar variables globales y exportar funciones como módulo." 
  - "Detecta y lista las malas prácticas en `index.html`." 
- Pide a la IA que aplique cambios con parches (apply_patch) y que deje comentarios TODO para los estudiantes.

Entregables esperados
- Una versión MPA con archivos HTML separados.
- Un archivo `css/styles.css` que unifique estilos.
- Carpeta `js/` con módulos claros y sin variables globales.
- Un breve `CHANGELOG.md` o un PR/commit donde se describan las refactorizaciones.

Notas finales
- El repositorio contiene intencionalmente malas prácticas para que los estudiantes las identifiquen y corrijan.
- Mantener un flujo de trabajo en branches y commits pequeños ayuda a usar la IA para revisiones iterativas.

## Estructura de Productos (Ejemplo)

El catálogo incluye componentes reales de computación:

```json
{
  "procesadores": {
    "name": "Procesador Intel Core i7-13700K",
    "price": 459.99
  },
  "ram": {
    "name": "RAM DDR5 32GB Corsair Dominator",
    "price": 189.99
  },
  "ssd": {
    "name": "SSD NVMe 1TB Samsung 990 Pro",
    "price": 129.99
  },
  "gpu": {
    "name": "Tarjeta Gráfica NVIDIA RTX 4090",
    "price": 1899.99
  },
  "power_supply": {
    "name": "Fuente 1000W 80+ Gold Corsair",
    "price": 199.99
  }
}
```

## Recursos Disponibles

- **[CHANGELOG.md](CHANGELOG.md)** — Documentación detallada de todos los cambios de refactorización
- **[ABOUT.md](ABOUT.md)** — Resumen ejecutivo de mejoras y TODOs educativos
- **[index-legacy.html](index-legacy.html)** — Versión original monolítica para comparación
- **[js/](js/)** — Módulos refactorizados como referencia de buenas prácticas
- **[pages/](pages/)** — Páginas HTML individuales de la MPA

## Próximos Pasos Sugeridos

1. **Backend Real:** Implementar API REST con Node.js/Express
2. **Base de Datos:** Migrar de Firebase a PostgreSQL/MongoDB
3. **Autenticación:** Integrar Firebase Auth o JWT
4. **Carrito de Compras:** Añadir funcionalidad de carrito persistente
5. **Pago:** Integrar gateway de pago (Stripe, PayPal)
6. **Testing:** Agregar suite de pruebas automatizadas
7. **Deployment:** Desplegar en Vercel, Netlify o AWS

---

**Autor:** Instructor (Plantilla para Taller de Refactorización)  
**Última actualización:** 2026-08-14  
**Estado:** ✅ Refactorización Completada - Listo para Estudiantes
