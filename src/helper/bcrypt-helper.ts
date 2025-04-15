import * as bcrypt from 'bcrypt';
export class BcryptHelper{
    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password:string){
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    static async comparePassword(password:string, hash:string){
        return bcrypt.compare(password, hash);
    }
}
