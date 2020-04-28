const Statblock = ({ range, hp, attack, defense, level, xp }) => ({
  range,
  hp,
  maxHp: hp,
  attack,
  defense,
  level,
  xp,
  currentXp: 0,
});

export default Statblock;
