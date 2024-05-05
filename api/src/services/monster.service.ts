import { Monster } from '../models';

const findAll = async (): Promise<Monster[]> => {
  const result = await Monster.query();
  return result;
};

const findById = async (id: number): Promise<Monster | undefined | null> => {
  const result = await Monster.query().findById(id);
  return result;
};

export const MonsterService = {
  findAll,
  findById,
};
