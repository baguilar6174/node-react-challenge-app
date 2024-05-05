import { Battle, Monster } from '../models';

type CreateBattleDTO = {
  monsterA: Monster;
  monsterB: Monster;
  winner: Monster;
};

const create = async (data: CreateBattleDTO): Promise<Battle> => {
  const result = await Battle.query().insert({ ...data });
  return result;
};

export const BattleService = {
  create,
};
