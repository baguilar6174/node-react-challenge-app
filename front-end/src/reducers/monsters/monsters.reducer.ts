import { createReducer } from '@reduxjs/toolkit';
import { Battle, Monster } from '../../models/interfaces/monster.interface';
import {
  fetchMonstersData,
  fetchMonstersBattle,
  setSelectedMonster,
  setSelectedMonsterEnemy,
  setBattle,
} from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  setSelectedMonsterEnemy: Monster | null;
  battle: Battle | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  setSelectedMonsterEnemy: null,
  battle: null,
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
  }));

  builder.addCase(setSelectedMonsterEnemy, (state, action) => ({
    ...state,
    setSelectedMonsterEnemy: action.payload,
  }));

  // --------------------------

  builder.addCase(fetchMonstersBattle.pending, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchMonstersBattle.rejected, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchMonstersBattle.fulfilled, (state, action) => ({
    ...state,
    battle: action.payload,
  }));

  builder.addCase(setBattle, (state, action) => ({
    ...state,
    battle: action.payload,
  }));
});
