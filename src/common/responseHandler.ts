export class httpResponse {
    message : string;
    status : number;
    data ?: any;
    constructor(message: string, status: number,data?: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
export class displayResponse extends httpResponse {
    constructor(message: string,data?: any) {
        super("Display Successful" || message, 200,data);
    }
}
export class deleteResponse extends httpResponse {
    constructor(message: string,data?: any) {
        super("Deleted successfully" || message, 200,data);
    }
}
export class addResponse extends httpResponse {
    constructor(message: string,data?: any) {
        super("Added successfully" || message, 201,data);
    }
}
export class updateResponse extends httpResponse {
    constructor(message: string,data?: any) {
        super("Updated successfully" || message, 200,data);
    }
}
export class LoginResponse extends httpResponse {
    constructor(message: string,data?: any) {
        super("Login Successful" || message, 200,data);
    }
}

