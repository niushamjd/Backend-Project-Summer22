import { addResponse, deleteResponse, displayResponse } from '../common/responseHandler';
import { GenericError } from '../common/errorHandler';
import { PaginationParams } from '../dto/pagination.params';
import { addUserInput, UserLoginInput } from '../dto/user.dto';
import usersRepository from '../repository/users.repository';
import pswrdUtility from '../utility/pswrd.utility';
class UsersService {
    constructor() {
    }
    addUser(userData: addUserInput): Promise<addResponse> {
        return new Promise(async (resolve, reject) => {
               const hashedPass= pswrdUtility.hashPassword(userData.password);
                userData.password=hashedPass;
                usersRepository.addUser(userData).then((res: addResponse) => {
                    resolve(res);
                }
                ).catch((err: GenericError) => {
                    reject(new GenericError(err.message));
                }
                );
        });
    }
    displayUsers(pagination:PaginationParams): Promise<displayResponse> {
        return new Promise((resolve, reject) => {
            pagination.sort= pagination.sort ? pagination.sort : 'userId';
            usersRepository.displayUsers(pagination).then((res: displayResponse) => {
                resolve(res);
            }
            ).catch((err) => {
                reject(err)
            });
        });
    }
    displayUser(id: number): Promise<displayResponse> {
        return new Promise((resolve, reject) => {
            usersRepository.displayUser(id).then((res: displayResponse) => {
                resolve(res);
            }
            ).catch((err) => {
                reject(err)
            });
        });
    }
    deleteUser(id: number): Promise<deleteResponse> {
        return new Promise(async (resolve, reject) => { usersRepository.deleteUser(id).then((res: deleteResponse) => {
                    resolve(res);
                }
                ).catch((err) => {
                    reject(err)
                });
            }
        );
    }
}
export default new UsersService();