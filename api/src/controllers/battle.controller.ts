import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { MonsterService } from '../services/monster.service';
import { BattleService } from '../services/battle.service';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { idMonsterA, idMonsterB } = req.body;

  if (isNaN(Number(idMonsterA)) || isNaN(Number(idMonsterB))) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Identifiers must be valid numbers' });
  }

  const monsterA = await MonsterService.findById(+idMonsterA);
  const monsterB = await MonsterService.findById(+idMonsterB);

  if (!monsterA || !monsterB) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'One or two monsters are undefined' });
  }

  let attacker: Monster, defender: Monster;

  if (monsterA.speed > monsterB.speed) {
    attacker = monsterA;
    defender = monsterB;
  } else if (monsterA.speed < monsterB.speed) {
    attacker = monsterB;
    defender = monsterA;
  } else {
    if (monsterA.attack >= monsterB.attack) {
      attacker = monsterA;
      defender = monsterB;
    } else {
      attacker = monsterB;
      defender = monsterA;
    }
  }

  // Figtht here!
  while (monsterA.hp > 0 && monsterB.hp > 0) {
    const damage = Math.max(attacker.attack - defender.defense, 1);
    defender.hp -= damage;
    [attacker, defender] = [defender, attacker];
  }

  const winner = monsterA.hp > 0 ? monsterA : monsterB;

  const result = await BattleService.create({ monsterA, monsterB, winner });

  return res.status(StatusCodes.OK).json(result);
};

export const BattleController = {
  list,
  create,
};
