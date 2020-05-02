import { WEAPON, ARMOR, RING, POTION, SCROLL } from "../utils/itemTypes.js";
import { INCREASE, HEAL } from "../utils/effectTypes.js";

export default [
  {
    name: "dagger",
    type: WEAPON,
    effects: [
      {
        type: INCREASE,
        what: "str",
        by: 1,
      },
    ],
  },
  {
    name: "sword",
    type: WEAPON,
    effects: [
      {
        type: INCREASE,
        what: "str",
        by: 2,
      },
    ],
  },
  {
    name: "leather armor",
    type: ARMOR,
    effects: [{ type: INCREASE, what: "def", by: 1 }],
  },
  {
    name: "chainmail",
    type: ARMOR,
    effects: [
      {
        type: INCREASE,
        what: "def",
        by: 2,
      },
    ],
  },
  {
    name: "healing potion",
    type: POTION,
    effects: [
      {
        type: HEAL,
        by: 1,
      },
    ],
  },
  {
    name: "scroll of strength",
    type: SCROLL,
    effects: [
      {
        type: INCREASE,
        what: "str",
        by: 1,
        for: 10,
      },
    ],
  },
  {
    name: "ring of protection",
    type: RING,
  },
];
