# Solución de Retos SOLID - Actividad 1.6

Este proyecto documenta la refactorización técnica de tres escenarios de código acoplado aplicando los principios SOLID.

## Acciones Realizadas

### 🛠️ Configuración del Entorno
- Se inicializó el proyecto con **TypeScript** y se configuró `tsconfig.json`.
- Se instaló y configuró **Jest** junto con `ts-jest` para la ejecución de pruebas unitarias.
- Se configuró el entorno de **Git**, incluyendo un archivo `.gitignore` para excluir dependencias y archivos temporales.

### 📦 Refactorización del Sistema de Envíos (Problema 1)
- **Separación de Responsabilidades**: Se extrajo la lógica de cálculo de costos, procesamiento de pagos y notificaciones fuera de `OrderService`.
- **Implementación de Interfaces**: Se crearon las interfaces `ShippingMethod` y `PaymentMethod`.
- **Extensibilidad**: Se añadió la clase `DroneShipping` como prueba de que el sistema permite nuevos métodos sin modificar el código base.

### 📄 Refactorización del Procesador de Documentos (Problema 2)
- **Segregación de Interfaces**: Se dividió la interfaz única `DocumentHandler` en tres interfaces específicas: `Openable`, `Editable` y `Savable`.
- **Corrección de Contratos**: Se modificó `PDFDocument` para que solo implemente `Openable`, eliminando las excepciones por métodos no soportados.
- **Seguridad de Tipos**: Se ajustó `DocumentProcessor` para que sus métodos soliciten únicamente las interfaces que realmente necesitan.

### 🔌 Refactorización del Interruptor (Problema 3)
- **Inversión de Dependencias**: Se creó la interfaz `Switchable` para abstraer el comportamiento de cualquier dispositivo electrónico.
- **Inyección de Dependencias**: Se modificó la clase `Switch` para recibir el dispositivo a través del constructor en lugar de instanciarlo internamente.
- **Polimorfismo**: Se crearon las clases `SmartLight` y `Fan` para demostrar que el mismo interruptor puede controlar múltiples tipos de dispositivos.

### 🧪 Verificación y Despliegue
- **Pruebas Automatizadas**: Se implementaron 9 tests unitarios en Jest que validan el comportamiento de cada solución refactorizada.
- **Control de Versiones**: Se vinculó el proyecto al repositorio remoto y se realizó el despliegue de los cambios.

## Ejecución de Pruebas
```bash
npm install
npm test
```
