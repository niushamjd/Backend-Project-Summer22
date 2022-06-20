export class responseHandler {
    message : string;
    status : number;
    data ?: any;
    constructor(message: string, status: number,data?: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
export class deleteResponse extends responseHandler {
    constructor(message: string,data?: any) {
        super("Deleted successfully" || message, 200,data);
    }
}
export class addResponse extends responseHandler {
    constructor(message: string,data?: any) {
        super("Added successfully" || message, 201,data);
    }
}
export class updateResponse extends responseHandler {
    constructor(message: string,data?: any) {
        super("Updated successfully" || message, 200,data);
    }
}

