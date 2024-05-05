import { Divider } from '@mui/material';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  Image,
  BattleMonsterName,
  BattleMonsterText,
  ProgressBar,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = (
  props: MonsterCardProps,
) => {
  const { title, monster } = props;

  if (!monster)
    return (
      <BattleMonsterCard centralized>
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      </BattleMonsterCard>
    );

  return (
    <BattleMonsterCard>
      <Image src={monster.imageUrl} />
      <BattleMonsterName>{monster.name}</BattleMonsterName>
      <Divider style={{ paddingTop: 5 }} />
      {getMonsterSkill('HP', monster.hp)}
      {getMonsterSkill('Attack', monster.attack)}
      {getMonsterSkill('Defense', monster.defense)}
      {getMonsterSkill('Speed', monster.speed)}
    </BattleMonsterCard>
  );

  function getMonsterSkill(text: string, value: number) {
    return (
      <>
        <BattleMonsterText>{text}</BattleMonsterText>
        <ProgressBar variant="determinate" value={value} />
      </>
    );
  }
};

export { MonsterBattleCard };
