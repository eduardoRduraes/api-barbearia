import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {RolesGuard} from "./roles.guard";

@Module({
  imports:[
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '10m'}
      }),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService]
})
export class AuthModule {}
