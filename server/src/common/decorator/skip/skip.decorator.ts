import { SetMetadata } from '@nestjs/common';

export const Skip = (...args: string[]) => SetMetadata('skip', args);
