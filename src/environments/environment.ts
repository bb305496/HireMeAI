import { version } from '../../package.json';

export const environment = {
  production: false,
  version: `local-v${version}`,
  apiUrl: 'http://localhost:8080/api'
};
