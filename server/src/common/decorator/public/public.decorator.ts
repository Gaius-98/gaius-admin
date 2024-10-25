import { SetMetadata } from '@nestjs/common';

export const Public = (...args: string[]) => SetMetadata('public', args);
