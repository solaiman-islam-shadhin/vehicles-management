import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as vehiclesController from './vehicles.controller';

const router = Router();

router.post('/', authenticate, authorize('admin'), vehiclesController.createVehicle);
router.get('/', vehiclesController.getAllVehicles);
router.get('/:vehicleId', vehiclesController.getVehicleById);
router.put('/:vehicleId', authenticate, authorize('admin'), vehiclesController.updateVehicle);
router.delete('/:vehicleId', authenticate, authorize('admin'), vehiclesController.deleteVehicle);

export default router;
