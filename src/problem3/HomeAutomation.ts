// DIP: Abstraction for any device that can be toggled
export interface Switchable {
    turnOn(): void;
    turnOff(): void;
}

export class TraditionalBulb implements Switchable {
    turnOn() { console.log("Bombilla tradicional encendida... consumiendo mucha energía."); }
    turnOff() { console.log("Bombilla tradicional apagada."); }
}

export class SmartLight implements Switchable {
    turnOn() { console.log("SmartLight encendida con brillo ajustable."); }
    turnOff() { console.log("SmartLight apagada."); }
}

export class Fan implements Switchable {
    turnOn() { console.log("Ventilador girando..."); }
    turnOff() { console.log("Ventilador detenido."); }
}

export class Switch {
    // DIP: High-level module depends on abstraction, not implementation
    constructor(private device: Switchable) {}

    operate(action: string) {
        if (action === "on") {
            this.device.turnOn();
        } else {
            this.device.turnOff();
        }
    }
}
