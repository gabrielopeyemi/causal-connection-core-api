
import { v4 as uuidv4 } from 'uuid';

export function generateVerificationToken() {
  return uuidv4();
}
