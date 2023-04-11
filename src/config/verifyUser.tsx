import {encryptStorage} from 'config/encryptStorage';

export default () => {
  return encryptStorage.getItem('verifyUserTokens') !== undefined;
};
