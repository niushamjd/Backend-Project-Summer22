import { InvalidCredentialsException } from '../common/errorHandler';
import { LoginResponse } from '../common/responseHandler';
import { UserLoginInput, tokenUserInput } from '../dto/user.dto';
import usersRepository from '../repository/users.repository';
import { AuthUtilities } from '../utility/auth.utility';
import PasswordUtility from '../utility/pswrd.utility';

export class authServices {

    constructor() { };

    async loginServices(user: UserLoginInput): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            usersRepository.getUserbyEmail(user.email).then(async (result: any) => {
                if (await PasswordUtility.comparePassword(user.password, result.data[0].password)) {
                    const payload: tokenUserInput = {
                        username: result.data[0].username,
                        email: result.data[0].email
                    }
                    const signature=AuthUtilities.generateSignature(payload);
                        resolve({
                            status: 200,
                            message: "Login Successful",
                            data: {
                                token: signature
                            }
                        });
                } else {
                    reject(new InvalidCredentialsException('Invalid credentials'));
                }
            }).catch((err: any) => {
                reject(err);
            })
        });
    };
    
};

const authService = new authServices();
export default authService as authServices;