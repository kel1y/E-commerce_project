/* eslint-disable import/prefer-default-export */
import { checkPassword } from './checkExpiredPasswords';
import checkProduct from './checkExpiredProduct';

export const CroneJobs = () => {
  checkPassword();
  checkProduct();
};
