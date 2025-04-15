import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {BcryptHelper} from "../helper/bcrypt-helper";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string, userRecord): Promise<any> {
        const isPasswordValid = await BcryptHelper.comparePassword(password, userRecord);

        if(!isPasswordValid) return null;

        const {password: _, ...result} = userRecord;
        return result;
    }

    async login(user: any){
        const payload = { username: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
