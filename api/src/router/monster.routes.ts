import { Router } from 'express';
import { MonsterController } from '../controllers/monster.controller';
const router = Router();

router.get('/', MonsterController.findAll);

export default router;
