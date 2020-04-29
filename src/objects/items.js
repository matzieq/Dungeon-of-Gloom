import { copyCollection } from "../utils/lib.js";
import { EQUIPPABLE } from "../utils/itemTypes.js";
import { BACKPACK_LIMIT } from "../utils/constants.js";

export const Item = ({ name, type, effects }) => ({
  name,
  type,
  isEquippable: EQUIPPABLE.includes(type),
  effects: copyCollection(effects),
});

export const Inventory = () => ({
  backpack: [],
  equipment: {
    weapon: null,
    armor: null,
    ring: null,
  },
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
  equip(atIndex) {
    if (!this.backpack[atIndex] || !this.backpack[atIndex].isEquippable) {
      return false;
    }

    const slot = this.backpack[atIndex].type;

    const unequippedItem = this.equipment[slot];

    this.equipment[slot] = { ...this.backpack[atIndex] };
    this.backpack[atIndex] = unequippedItem ? { ...unequippedItem } : null;
  },
});
