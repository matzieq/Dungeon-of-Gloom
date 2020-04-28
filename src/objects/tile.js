const Tile = ({ type, name, flags }) => ({
  type,
  name,
  flags: { ...flags },
});

export default Tile;
