import { Router } from "express";
import SpacesController from "../controllers/spacesController.js";

const router = Router();

router.get('/', SpacesController.getSpaces);

router.post('/', SpacesController.createSpace);

router.delete('/:id', SpacesController.deleteSpace);

router.put('/:id', SpacesController.updateSpace);

router.get('/:id', SpacesController.getSpaceById);

router.get('/:id/get-price', SpacesController.getPriceOfExit);

router.post('/:id/entry', SpacesController.markEntry);

router.post('/:id/exit', SpacesController.markExit);

export default router;