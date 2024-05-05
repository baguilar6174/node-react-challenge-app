import { Monster } from '../../models';
import { MonsterService } from '../monster.service';

const mockMonster = Monster.fromJson({
  id: 1,
  name: 'Test Monster',
  attack: 10,
  defense: 5,
  hp: 100,
  speed: 8,
  imageUrl: 'image-example',
});

describe('MonsterService', () => {
  describe('findAll method', () => {
    test('should return an array of monsters', async () => {
      jest.spyOn(Monster, 'query').mockResolvedValueOnce([mockMonster]);
      const result = await MonsterService.findAll();
      expect(result).toEqual([mockMonster]);
    });
  });

  describe('findById method', () => {
    test('should return a monsters by id', async () => {
      const findByIdMock = jest.fn().mockResolvedValueOnce(mockMonster);
      const queryMock = jest
        .fn()
        .mockReturnValueOnce({ findById: findByIdMock });
      jest.spyOn(Monster, 'query').mockImplementationOnce(queryMock);
      const result = await MonsterService.findById(1);
      expect(result).toEqual(mockMonster);
    });

    test('should return a monsters is not found', async () => {
      const findByIdMock = jest.fn().mockResolvedValueOnce(undefined);
      const queryMock = jest
        .fn()
        .mockReturnValueOnce({ findById: findByIdMock });
      jest.spyOn(Monster, 'query').mockImplementationOnce(queryMock);
      const result = await MonsterService.findById(1);
      expect(result).toBeUndefined();
    });
  });
});
