import { UserDocument } from '../../users/schemas/user.schema';

declare module 'express' {
  export interface Request {
    user: {
      sub: string; // or use `id` if that’s how you store user ID in token
      email?: string;
      // Add more fields from the token payload if needed
    };
  }
}
