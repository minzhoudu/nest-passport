import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProtectedData(): string {
    return 'Hello World!';
  }
}
