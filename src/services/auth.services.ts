import { InvalidCredentialsException } from '../common/errorHandler';
import { LoginResponse } from '../common/responseHandler';
import { UserLoginInput, tokenUserInput } from '../dto/user.dto';
import usersRepository from '../repository/users.repository';
import PasswordUtility from '../utility/pswrd.utility';

export class authServices {

    constructor() { };

    async loginServices(user: UserLoginInput): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            usersRepository.getUserbyEmail(user.email).then(async (result: any) => {
                if (await PasswordUtility.comparePassword(user.password, result.data[0].password)) {
                    
                    resolve(new LoginResponse('login successful', 200));

                } else {
                    reject(new InvalidCredentialsException('Invalid credentials'));
                }
            })
        });
    };
};

const authService = new authServices();
export default authService as authServices;