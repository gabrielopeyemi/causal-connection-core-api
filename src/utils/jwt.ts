/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as jwt from 'jsonwebtoken';
import { BadRequestException, Logger } from '@nestjs/common';

const jwtSecret = 'dncioqeldjknqio1lkhn1w';
export const generateJWTToken = (
  details: any,
  expiresIn: string = '24h',
): string | undefined => {
  try {
    return jwt.sign({ userDetails: details }, jwtSecret, {
      expiresIn: expiresIn,
    });
  } catch (error) {
    // throwBadRequest('generateJWTToken:' + error);
    new BadRequestException('generateJWTToken:' + error);
  }
};

export const verifyJWTToken = (
  token: string,
): string | Record<any, any> | undefined => {
  try {
    const response = jwt.verify(token, jwtSecret);
    return response;
  } catch (error) {
    Logger.debug('verifyJWTToken:' + error);
    // throwJWTError('Authorization error');
    new BadRequestException('verifyJWTToken:' + error);
  }
};
