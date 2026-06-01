import { 
    Switch, 
    TraditionalBulb, 
    SmartLight, 
    Fan 
} from "../src/problem3/HomeAutomation";

describe("Problem 3: Home Automation (DIP)", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it("should operate a TraditionalBulb via Switch (DIP)", () => {
        const bulb = new TraditionalBulb();
        const lightSwitch = new Switch(bulb);

        lightSwitch.operate("on");
        expect(consoleSpy).toHaveBeenCalledWith("Bombilla tradicional encendida... consumiendo mucha energía.");

        lightSwitch.operate("off");
        expect(consoleSpy).toHaveBeenCalledWith("Bombilla tradicional apagada.");
    });

    it("should operate a SmartLight via same Switch class (DIP / Reusability)", () => {
        const smartLight = new SmartLight();
        const lightSwitch = new Switch(smartLight);

        lightSwitch.operate("on");
        expect(consoleSpy).toHaveBeenCalledWith("SmartLight encendida con brillo ajustable.");
    });

    it("should operate a Fan via same Switch class (DIP)", () => {
        const fan = new Fan();
        const fanSwitch = new Switch(fan);

        fanSwitch.operate("on");
        expect(consoleSpy).toHaveBeenCalledWith("Ventilador girando...");
    });
});
