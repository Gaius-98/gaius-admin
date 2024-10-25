import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configFileNameObj = {
  development: 'dev',
  production: 'prod',
};

const env = process.env.NODE_ENV;

console.log(`env:${env}`);

export default () => {
  return yaml.load(
    readFileSync(
      join(
        __dirname,

        `./${configFileNameObj[env || 'development']}.yml`,
      ),
      'utf8',
    ),
  ) as Record<string, any>;
};
