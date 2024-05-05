import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Battle, Monster } from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll,
);

export const fetchMonstersBattle = createAsyncThunk<
  Battle,
  { idMonsterA: string; idMonsterB: string }
>('monsters/fetchMonstersBattle', ({ idMonsterA, idMonsterB }) =>
  MonsterService.battle(idMonsterA, idMonsterB),
);

export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster',
);

export const setSelectedMonsterEnemy = createAction<Monster | null>(
  'monsters/setSelectedMonsterEnemy',
);

export const setBattle = createAction<Battle | null>('monsters/setBattle');
