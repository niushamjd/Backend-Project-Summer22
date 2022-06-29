import bcrypt from 'bcrypt';
class PasswordUtility {
    generatePasswordHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
export default new PasswordUtility();