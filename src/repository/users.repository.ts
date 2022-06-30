import KnexDB from '../db/knex';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
import { PaginationParams } from '../dto/pagination.params';
import { addUserInput, UserLoginInput } from '../dto/user.dto';
class UsersRepository {
    knx: typeof KnexDB;
    constructor() {
        this.knx = KnexDB;
    }
    addUser(userData: addUserInput): Promise<addResponse> {
        return new Promise<addResponse>((resolve, reject) => {
            this.knx.knexdb('users').insert(userData).then((result) => {
                resolve(new addResponse("User added successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error adding user"));
            }
            );

        });
    }
    displayUsers(pagination: PaginationParams): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('users').select().offset(pagination.offset).limit(pagination.limit).orderBy(pagination.sort,pagination.order).then((result) => {

                resolve(new displayResponse("Fetch Succesful", result));


            }
            ).catch((error) => {
                reject(new GenericError("Error fetching users"));
            }
            );
        });
    }
    displayUser(id: number): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('users').where({ userId: id }).select().then((result) => {
                if (result.length > 0) {
                    resolve(new displayResponse("Fetch Succesful", result));
                }
                else {
                    reject(new NotFoundError("User not found"));
                }
            }
            ).catch((error) => {
                reject(new GenericError("Error fetching users"));
            }
            );
        });
    }
    deleteUser(id: number): Promise<deleteResponse> {
        return new Promise<deleteResponse>((resolve, reject) => {
            this.knx.knexdb('users').where("userId", id).del().then(() => {
                resolve(new deleteResponse("User deleted successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error deleting user"));
            })

        });

    }
    getUserbyEmail(email: string): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('users').where({ email: email }).select().then((result) => {
                if (result.length > 0) {
                    resolve(new displayResponse("Fetch Succesful", result));
                }
                else {
                    reject(new NotFoundError("User not found"));
                }
            }
            ).catch((error) => {
                reject(new GenericError("Error fetching users"));
            }
            );
        });
    }
}
export default new UsersRepository();