import { Router } from 'express';
import { CityController } from '../app/controllers/city.controller';
import { ClientController } from '../app/controllers/client.controller';

const router = Router();

const cityCtrl = new CityController();
const clientCtrl = new ClientController()

router.get('/client/index', clientCtrl.index)
router.get('/client/show', clientCtrl.show)
router.post('/client/create', clientCtrl.create)
router.put('/client/update/:id', clientCtrl.update)
router.delete('/client/delete/:id', clientCtrl.delete)

router.get('/city/index', cityCtrl.index)
router.get('/city/show', cityCtrl.show)
router.post('/city/create', cityCtrl.create)

export { router }