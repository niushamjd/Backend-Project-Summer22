export class errorHandler extends Error {
    message: string;
    status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}
export class WrongInputFormatError extends errorHandler {
    constructor(message?: string) {
        super(message || "Wrong input format", 400);
    }
}
export class NotFoundError extends errorHandler {
    constructor(message?: string) {
        super(message || "Not found", 404);
    }
}
export class DuplicateError extends errorHandler {
    constructor(message?: string) {
        super(message || "Duplicate Record", 409);
    }
}
export class GenericError extends errorHandler {
    constructor(message?: string) {
        super(message || "Internal Server Error", 500);
    }
}
