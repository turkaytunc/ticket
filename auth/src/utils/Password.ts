import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer: Buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, password: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer: Buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return hashedPassword === buffer.toString('hex');
  }
}
