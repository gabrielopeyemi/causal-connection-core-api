/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Response } from 'express';
import { throwError } from 'rxjs';
import { verifyJWTToken } from 'src/utils/jwt';
// import { throwJWTError } from 'src/utils/exceptions';
// import { verifyJWTToken } from 'src/utils/jwt';
import { RequestWithEmail } from 'src/utils/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: RequestWithEmail, res: Response, next: () => void) {
    console.log('headers:', req?.headers);
    const { authorization }: any = req?.headers;
    console.log('authorization:', authorization);

    if (!authorization) {
      throw new HttpException(
        'You are not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const [, token] = authorization.split(' ');

    console.log('token:', token);
    const data = verifyJWTToken(token) as any;
    console.log('data:', data);
    // console.log({ userDetails: data?.userDetails });
    req.user = data?.userDetails;
    next();
  }
}
