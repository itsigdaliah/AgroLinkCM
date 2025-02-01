import Delivery from '../models/Delivery.js';
import Driver from '../models/Driver.js';

export const submitDeliveryInfo = async (req, res) => {
  try {
    const { carState, location } = req.body;
    const nationalId = req.files.nationalId[0].path;
    const driversLicense = req.files.driversLicense[0].path;

    const delivery = new Delivery({
      carState,
      location,
      nationalId,
      driversLicense,
    });

    await delivery.save();
    res.status(201).json({ message: 'Delivery information submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit delivery information' });
  }
};

export const rateDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { rating } = req.body;

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.ratings.push(rating);
    await driver.save();

    res.status(200).json({ message: 'Driver rated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to rate driver' });
  }
};
