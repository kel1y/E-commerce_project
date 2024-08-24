/* eslint-disable import/prefer-default-export */
import * as dotenv from 'dotenv';
import cron from 'node-cron';
import EventEmitter from 'events';
import db, { sequelize } from '../database/models/index';
import { markPasswordExpired } from '../events/markPasswordExpired';

const emitter = new EventEmitter();
const { User } = db;
dotenv.config();

export const checkPassword = () => {
  (async () => {
    cron.schedule(`${process.env.CRON_SCHEDULE}`, async () => {
      const expiredUsers = await User.findAll({
        where: sequelize.literal(`
          NOW() - "lastPasswordUpdate" > INTERVAL '${process.env.PASSWORD_EXPIRY}'
        `),
      });
      markPasswordExpired(expiredUsers);
    });
  })();
};
emitter.on('start', checkPassword);
emitter.emit('start');
