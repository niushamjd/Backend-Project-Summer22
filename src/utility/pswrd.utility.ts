import bcrypt from 'bcrypt';
class pswrdUtility {
     hashPassword(password: string){
        return bcrypt.hashSync(password, 10);
    };
    comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }   
}
export default new pswrdUtility();