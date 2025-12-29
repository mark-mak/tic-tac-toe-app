import { version } from '../../package.json';

export const APP_VERSION = version;

export const getVersionInfo = () => {
  return {
    version: APP_VERSION,
    name: 'Tic-Tac-Toe',
  };
};
