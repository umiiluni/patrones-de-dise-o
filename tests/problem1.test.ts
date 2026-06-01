import { 
    Order, 
    OrderService, 
    NotificationService, 
    StandardShipping, 
    ExpressShipping, 
    DroneShipping, 
    PayPalPayment, 
    CreditCardPayment 
} from "../src/problem1/ShippingSystem";

describe("Problem 1: Shipping System (SRP & OCP)", () => {
    let notificationService: NotificationService;
    let orderService: OrderService;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        notificationService = new NotificationService();
        orderService = new OrderService(notificationService);
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it("should process order with standard shipping and paypal", () => {
        const order = new Order("ORD-001", 100);
        const shipping = new StandardShipping();
        const payment = new PayPalPayment();

        orderService.processOrder(order, shipping, payment);

        expect(consoleSpy).toHaveBeenCalledWith("Calculando envío para standard: $10");
        expect(consoleSpy).toHaveBeenCalledWith("Procesando pago de $110 vía PayPal...");
        expect(consoleSpy).toHaveBeenCalledWith("Email enviado: Su pedido ORD-001 ha sido procesado.");
    });

    it("should process order with express shipping and credit card", () => {
        const order = new Order("ORD-002", 200);
        const shipping = new ExpressShipping();
        const payment = new CreditCardPayment();

        orderService.processOrder(order, shipping, payment);

        expect(consoleSpy).toHaveBeenCalledWith("Calculando envío para express: $25");
        expect(consoleSpy).toHaveBeenCalledWith("Cargando $225 a la tarjeta de crédito...");
    });

    it("should allow new shipping methods like Drone without modifying OrderService (OCP)", () => {
        const order = new Order("ORD-003", 500);
        const shipping = new DroneShipping();
        const payment = new PayPalPayment();

        orderService.processOrder(order, shipping, payment);

        expect(consoleSpy).toHaveBeenCalledWith("Calculando envío para drone: $50");
        expect(consoleSpy).toHaveBeenCalledWith("Procesando pago de $550 vía PayPal...");
    });
});
