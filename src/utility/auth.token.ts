import { Request} from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import { tokenUserInput, UserLoginInput } from '../dto/user.dto';
require('dotenv').config();
class Authentication {
    
    generateToken(payload: tokenUserInput) {
        const secret= process.env.JWT_SECRET;
        return jwt.sign(payload, secret!, { expiresIn: '12h' });
    }
    verifyToken(req:Request) {
        const signature = req.header('Authentication');
        if (signature) {
            const secret = config.JWT_SECRET;
            return jwt.verify(signature, secret!);
        }
        return false;
    };
}
export default new Authentication();