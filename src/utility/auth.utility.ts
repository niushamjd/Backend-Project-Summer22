import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { tokenUserInput } from '../dto/user.dto';
import config from '../common/config';
require('dotenv').config();

export class AuthUtilities {
    public static generateSignature(payload: tokenUserInput) {
        const secret = config.JWT_SECRET;
        return jwt.sign(payload, secret as string);
    };

    public static validateSignature (req: Request) {
        const signature = req.header('token');
        if (signature) {
            const secret = config.JWT_SECRET;
            const payload = jwt.verify(signature, secret!) as tokenUserInput;
            req.user = payload;
            return true;
        }
        return false;
    };
};