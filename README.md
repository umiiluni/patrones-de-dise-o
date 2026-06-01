# Solución de Retos SOLID - Actividad 1.6

Este proyecto documenta la refactorización técnica de tres escenarios de código acoplado aplicando los principios SOLID.

## 1. Debate de Soluciones Posibles

Durante el proceso de diseño, se consideraron diversas alternativas para resolver el acoplamiento:

- **En el Sistema de Envíos (SRP/OCP)**:
    - *Opción A*: Usar un `switch` o `if/else` gigante para manejar nuevos métodos. Se descartó porque violaba el OCP (obligaba a modificar la clase principal cada vez).
    - *Solución elegida*: **Interfaces y Polimorfismo**. Se decidió que cada método de envío y pago sea una clase independiente. Esto permite que el sistema crezca horizontalmente sin riesgo de romper la lógica existente.
  
- **En el Procesador de Documentos (LSP/ISP)**:
    - *Opción A*: Mantener una sola interfaz y manejar los errores con `try/catch`. Se descartó porque rompe el contrato de la interfaz (LSP) y ensucia el código cliente.
    - *Solución elegida*: **Segregación de Interfaces (ISP)**. Al dividir la interfaz en capacidades específicas (`Openable`, `Editable`), el sistema detecta errores en tiempo de compilación y no en ejecución.

- **En el Interruptor Rígido (DIP)**:
    - *Opción A*: Crear múltiples métodos en el Switch (`operateBulb`, `operateFan`). Se descartó por el alto acoplamiento.
    - *Solución elegida*: **Inversión de Dependencias**. El Switch no sabe qué está controlando, solo sabe que el objeto cumple con la interfaz `Switchable`. Esto hace que el hardware sea totalmente intercambiable.

## 2. Implementación de Soluciones

Las soluciones se implementaron utilizando **TypeScript** para aprovechar el sistema de tipos fuerte, lo cual es fundamental para garantizar que los principios SOLID se respeten:

- **Problem 1**: [ShippingSystem.ts](src/problem1/ShippingSystem.ts) implementa un orquestador que inyecta servicios de notificación y estrategias de envío/pago.
- **Problem 2**: [DocumentProcessor.ts](src/problem2/DocumentProcessor.ts) utiliza tipos de intersección de TypeScript (`Openable & Editable & Savable`) para definir qué documentos requieren acceso total.
- **Problem 3**: [HomeAutomation.ts](src/problem3/HomeAutomation.ts) demuestra el uso de Inyección de Dependencias básica por constructor.

## 3. Pruebas Realizadas

Se implementó una suite de 9 pruebas automatizadas con **Jest** para validar que las refactorizaciones no alteraran el comportamiento esperado del negocio:

- **Tests de Integración (Problema 1)**: Verifican que la combinación de diferentes estrategias de envío y pago resulte en el cálculo correcto del total y la notificación adecuada.
- **Tests de Contrato (Problema 2)**: Aseguran que un PDF no pueda ser procesado por métodos que requieran edición, evitando excepciones en tiempo de ejecución.
- **Tests de Abstracción (Problema 3)**: Validan que el Switch sea agnóstico al dispositivo y funcione correctamente con luces y ventiladores.

## Acciones Técnicas Realizadas
- Inicialización de proyecto TS y Jest.
- Configuración de Git y repositorio remoto.
- Refactorización completa de los 3 escenarios propuestos.
- Creación de documentación técnica y manual de ejecución.

## Ejecución de Pruebas
```bash
npm install
npm test
```
