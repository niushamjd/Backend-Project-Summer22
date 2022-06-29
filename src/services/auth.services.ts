import { InvalidCredentialsException } from '../common/errorHandler';
import { LoginResponse } from '../common/responseHandler';
import { UserLoginInput, tokenUserInput } from '../dto/user.dto';
import usersRepository from '../repository/users.repository';
import PasswordUtility from '../utility/pswrd.utility';
import authToken from '../utility/auth.token';

export class authServices {

    constructor() { };

    async loginServices(user: UserLoginInput): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            let error = null;
                 {
                    usersRepository.getUserbyEmail(user.email).then(async (result: any) => {
                        if (await PasswordUtility.comparePassword(user.password, result.password)) {
                            const payload: tokenUserInput = {
                                email: user.email,
                                username: result.username
                            }
                            const signature = authToken.generateToken(payload);
                            resolve(new LoginResponse('Login successful', 200));
                        } else {
                            reject(new InvalidCredentialsException());
                        }
                    }).catch((err: any) => {
                        error = err;
                    });
                }
          
    
        });
    };
};

const authService = new authServices();
export default authService as authServices;