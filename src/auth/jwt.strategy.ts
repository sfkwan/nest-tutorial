import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      issuer: 'https://dums01.bochk.com/adfs',
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dums01.bochk.com/adfs/discovery/keys',
      }),
      jsonWebTokenOptions: {
        algorithms: ['RS256'],
        issuer: 'https://dums01.bochk.com/adfs',
      }
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}