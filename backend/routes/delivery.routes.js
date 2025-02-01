import express from 'express';
import { submitDeliveryInfo, rateDriver } from '../controllers/delivery.controller.js';

const router = express.Router();

router.post('/', submitDeliveryInfo);
router.post('/rate/:driverId', rateDriver);

export default router;
