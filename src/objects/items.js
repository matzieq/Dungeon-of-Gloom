import { copyCollection, deepCopy } from "../utils/lib.js";
import { EQUIPPABLE } from "../utils/itemTypes.js";
import { BACKPACK_LIMIT } from "../utils/constants.js";

export const Item = ({ name, type, effects }) => ({
  name,
  type,
  isEquippable: EQUIPPABLE.includes(type),
  effects: deepCopy(effects),
});

export const Inventory = () => ({
  backpack: [],
  equipment: [null, null, null],
  take(item) {
    if (this.backpack.length >= BACKPACK_LIMIT) {
      return false;
    }

    this.backpack.push(item);
    return true;
  },
  remove(atIndex) {
    if (!this.backpack[atIndex]) {
      return null;
    }
    const removedItem = this.backpack[atIndex];
    this.backpack = this.backpack.filter((_, index) => index !== atIndex);
    return removedItem;
  },
  equip(atIndex, actor) {
    if (!this.backpack[atIndex] || !this.backpack[atIndex].isEquippable) {
      return false;
    }

    const slot = this.backpack[atIndex].type;

    const unequippedItem = this.equipment[slot];

    this.equipment[slot] = { ...this.backpack[atIndex] };

    if (unequippedItem) {
      this.backpack[atIndex] = { ...unequippedItem };
    } else {
      this.backpack = this.backpack.filter((item, index) => index !== atIndex);
    }

    updateStats(actor);
  },
});

export function updateStats(actor) {
  actor.stats.modified = { str: actor.stats.str, def: actor.stats.def };

  const { equipment } = actor.inventory;
  Object.values(equipment).forEach((eq) => {
    eq &&
      eq.effects.forEach((effect) => {
        actor.stats.modified[effect.what] += effect.by;
      });
  });
}
