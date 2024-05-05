import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import {
  fetchMonstersBattle,
  fetchMonstersData,
} from '../../reducers/monsters/monsters.actions';
import {
  selectBattle,
  selectMonsters,
  selectSelectedMonster,
  selectSelectedMonsterEnemy,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const selectedMonsterEnemy = useSelector(selectSelectedMonsterEnemy);
  const battle = useSelector(selectBattle);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  const handleStartBattleClick = () => {
    if (!selectedMonster || !selectedMonsterEnemy) return;
    dispatch(
      fetchMonstersBattle({
        idMonsterA: selectedMonster.id,
        idMonsterB: selectedMonsterEnemy.id,
      }),
    );
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />
      {battle && <WinnerDisplay text={battle.winner.name} />}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || 'Player'}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard title="Computer" monster={selectedMonsterEnemy} />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
