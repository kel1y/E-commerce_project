import cron from 'node-cron';
import * as dotenv from 'dotenv';
import EventEmitter from 'events';
import { Op } from 'sequelize';
import db from '../database/models/index';
import markProductExpired from '../events/markProductExpired';
import productEventsEmitter from '../events/productEvents';

const emitter = new EventEmitter();
const { Product } = db;
dotenv.config();

const checkProduct = () => {
  (async () => {
    cron.schedule(`${process.env.CRON_SCHEDULE}`, async () => {
      const currentDate = new Date();
      const expiredProducts = await Product.findAll({
        where: {
          expiryDate: {
            [Op.lt]: currentDate
          }
        }
      });
      // markProductExpired(expiredProducts);
      productEventsEmitter.emit('product expired', expiredProducts);
    });
  })();
};

emitter.on('start', checkProduct);
emitter.emit('start');

export default checkProduct;
