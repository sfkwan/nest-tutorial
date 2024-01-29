import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';

import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ 
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      JwtStrategy.extractJWTFromCookie,
      ,]),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      issuer: 'https://dums01.bochk.com/adfs',
      audience: 'account',
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

  private static extractJWTFromCookie(req: Request): string|null {
    if(req.cookies?.access_token?.length > 0) {
        return req.cookies.access_token;
    }
    return null;
  }

}