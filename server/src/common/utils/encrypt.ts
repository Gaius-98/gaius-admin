import * as CryptoJs from 'crypto-js';
export default (value: string, salt: string) => {
  return CryptoJs.HmacSHA512(value, salt).toString();
};
