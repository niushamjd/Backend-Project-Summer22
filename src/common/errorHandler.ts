export class httpException extends Error {
    message: string;
    status: number;
    data?: any;
    constructor(message: string, status: number,data?: any) {
        super();
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
export class WrongInputFormatError extends httpException {
   
    constructor(message?: string,data?: any) {
        super(message || "Wrong input format", 400,data);

    }
}
export class NotFoundError extends httpException {
    constructor(message?: string) {
        super(message || "Not found", 404);
    }
}
export class DuplicateError extends httpException {
    constructor(message?: string) {
        super(message || "Duplicate Record", 409);
    }
}
export class GenericError extends httpException {
    constructor(message?: string) {
        super(message || "Internal Server Error", 500);
    }
}
export class InvalidCredentialsException extends httpException {
    constructor(message?: string) {
        super(message || "Invalid Login Credentials", 401);
    }
}
export class UserNotFoundException extends httpException {
    constructor(message?: string) {
        super(message || "User not found", 404);
    }
}
export class UnauthorizedException extends httpException {
    constructor(message?: string) {
        super(message || "Unauthorized", 401);
    }
}
export class uniqueError extends httpException {
    constructor(message?: string) {
        super(message || "Duplicate Record", 409);
    }
}
export class loginError extends httpException {
    constructor(message?: string) {
        super(message || "Error Logging in", 400);
    }
}