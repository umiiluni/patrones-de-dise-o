// ISP: Smaller, more specific interfaces
export interface Openable {
    open(): void;
}

export interface Editable {
    edit(): void;
}

export interface Savable {
    save(): void;
}

// WordDocument can do everything
export class WordDocument implements Openable, Editable, Savable {
    open() { console.log("Abriendo documento Word..."); }
    edit() { console.log("Editando texto..."); }
    save() { console.log("Guardando cambios en disco..."); }
}

// PDFDocument is only Openable (LSP compliant)
export class PDFDocument implements Openable {
    open() { console.log("Abriendo PDF protegido..."); }
}

// Now the processor depends on specific interfaces
export class DocumentProcessor {
    processReadOnly(doc: Openable) {
        doc.open();
    }

    processFullAccess(doc: Openable & Editable & Savable) {
        doc.open();
        doc.edit();
        doc.save();
    }
}
