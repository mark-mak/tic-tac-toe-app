// Note: In a production app, sync this with package.json version
export const APP_VERSION = '1.0.0';

export const getVersionInfo = () => {
  return {
    version: APP_VERSION,
    name: 'Tic-Tac-Toe',
  };
};
