export interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

export interface Battle {
  id: number;
  monsterA: Monster;
  monsterB: Monster;
  winner: Monster;
}
