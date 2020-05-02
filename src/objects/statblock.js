const Statblock = ({ range, hp, str, def, level, xp }) => ({
  range,
  hp,
  maxHp: hp,
  str,
  def,
  level,
  xp,
  currentXp: 0,
  modified: {
    str,
    def,
  },
});

export default Statblock;
