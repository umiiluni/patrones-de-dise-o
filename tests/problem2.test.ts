import { 
    WordDocument, 
    PDFDocument, 
    DocumentProcessor 
} from "../src/problem2/DocumentProcessor";

describe("Problem 2: Document Processor (LSP & ISP)", () => {
    let processor: DocumentProcessor;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        processor = new DocumentProcessor();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it("should process WordDocument with full access (ISP)", () => {
        const word = new WordDocument();
        processor.processFullAccess(word);

        expect(consoleSpy).toHaveBeenCalledWith("Abriendo documento Word...");
        expect(consoleSpy).toHaveBeenCalledWith("Editando texto...");
        expect(consoleSpy).toHaveBeenCalledWith("Guardando cambios en disco...");
    });

    it("should process PDFDocument as read-only (LSP compliant)", () => {
        const pdf = new PDFDocument();
        
        // This should not throw errors because PDFDocument only implements Openable
        processor.processReadOnly(pdf);

        expect(consoleSpy).toHaveBeenCalledWith("Abriendo PDF protegido...");
    });

    it("should not allow PDFDocument in processFullAccess (Type Safety / ISP)", () => {
        const pdf = new PDFDocument();
        
        // @ts-expect-error - PDFDocument doesn't have edit/save, so this won't compile
        // which is exactly what we want to prevent LSP violations at runtime
        // processor.processFullAccess(pdf); 
        
        expect(pdf).not.toHaveProperty('edit');
        expect(pdf).not.toHaveProperty('save');
    });
});
