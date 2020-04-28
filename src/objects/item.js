import { copyCollection } from "../utils/lib.js";

const Item = ({ name, type, effects }) => ({
  name,
  type,
  effects: copyCollection(effects),
});

export default Item;
