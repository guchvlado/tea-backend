import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'sercret',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}
