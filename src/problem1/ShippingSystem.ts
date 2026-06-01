export class Order {
    constructor(public id: string, public totalAmount: number) {}
}

// OCP: Interfaces for extensibility
export interface ShippingMethod {
    getName(): string;
    calculateCost(): number;
}

export class StandardShipping implements ShippingMethod {
    getName(): string { return "standard"; }
    calculateCost(): number { return 10; }
}

export class ExpressShipping implements ShippingMethod {
    getName(): string { return "express"; }
    calculateCost(): number { return 25; }
}

// To add "Drones", we just create a new class without modifying OrderService
export class DroneShipping implements ShippingMethod {
    getName(): string { return "drone"; }
    calculateCost(): number { return 50; }
}

export interface PaymentMethod {
    process(amount: number): void;
}

export class PayPalPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Procesando pago de $${amount} vía PayPal...`);
    }
}

export class CreditCardPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Cargando $${amount} a la tarjeta de crédito...`);
    }
}

// SRP: Independent Notification Service
export class NotificationService {
    sendEmail(orderId: string): void {
        console.log(`Email enviado: Su pedido ${orderId} ha sido procesado.`);
    }
}

// SRP: OrderService only orchestrates the process
export class OrderService {
    constructor(private notificationService: NotificationService) {}

    processOrder(order: Order, shippingMethod: ShippingMethod, paymentMethod: PaymentMethod) {
        // 1. Calcular envío
        const shippingCost = shippingMethod.calculateCost();
        console.log(`Calculando envío para ${shippingMethod.getName()}: $${shippingCost}`);

        // 2. Procesar Pago
        const totalToPay = order.totalAmount + shippingCost;
        paymentMethod.process(totalToPay);

        // 3. Enviar Notificación
        this.notificationService.sendEmail(order.id);
    }
}
