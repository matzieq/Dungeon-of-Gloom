import { MAP_WIDTH, BACKPACK_LIMIT, OPTION_USE } from "../utils/constants.js";
import { EQUIPMENT_SLOT_NAMES } from "../utils/itemTypes.js";

import { tileSize } from "../utils/lib.js";

export function drawStatsAscii(player, ctx) {
  ctx.fillStyle = "#2378cc";
  ctx.fillText(
    `HP: ${player.stats.hp} / ${player.stats.maxHp}`,
    (MAP_WIDTH - 10) * tileSize(),
    (11 + BACKPACK_LIMIT) * tileSize()
  );

  ctx.fillText(
    `STR: ${player.stats.str} / ${player.stats.modified.str}`,
    (MAP_WIDTH - 10) * tileSize(),
    (12 + BACKPACK_LIMIT) * tileSize()
  );
  ctx.fillText(
    `DEF: ${player.stats.def} / ${player.stats.modified.def}`,
    (MAP_WIDTH - 10) * tileSize(),
    (13 + BACKPACK_LIMIT) * tileSize()
  );
  const { equipment } = player.inventory;
  equipment.forEach((item, index) => {
    drawEquipmentPieceAscii(
      EQUIPMENT_SLOT_NAMES[index],
      item ? item.name : "none",
      index,
      ctx
    );
  });
  ctx.fillStyle = "#ee7744";

  ctx.fillText(`Backpack:`, (MAP_WIDTH - 10) * tileSize(), 9 * tileSize());
  const inventory = player.inventory.backpack
    .map((item) => (item ? item.name : ""))
    .filter((item) => item !== "");

  inventory.forEach(drawInventoryPieceAscii(ctx));
}

function drawEquipmentPieceAscii(type, name, posY, ctx) {
  ctx.fillStyle = "#2378cc";

  ctx.fillText(
    `${type}:`,
    (MAP_WIDTH - 10) * tileSize(),
    (5 + posY) * tileSize()
  );

  ctx.fillStyle = "#feef23";
  ctx.fillText(name, (MAP_WIDTH - 5) * tileSize(), (5 + posY) * tileSize());
}

const drawInventoryPieceAscii = (ctx) => (name, posY) => {
  ctx.fillStyle = "#feef23";

  ctx.fillText(name, (MAP_WIDTH - 10) * tileSize(), (10 + posY) * tileSize());
};

export function drawCursorAscii({
  player,
  surface: { ctx },
  menu: { cursorPos },
}) {
  ctx.fillStyle = "#ef78cc";
  ctx.fillText("Select item", (MAP_WIDTH - 10) * tileSize(), 3 * tileSize());
  ctx.fillStyle = "#ef78cc";
  const cursorHeight = cursorPos <= 2 ? cursorPos : cursorPos + 2;
  ctx.fillText(
    ">",
    (MAP_WIDTH - 11) * tileSize(),
    (5 + cursorHeight) * tileSize()
  );
}

export function drawSubmenuAscii({
  surface: { ctx },
  menu: {
    cursorPos,
    subMenu: { options, cursorPos: submenuPos },
  },
  player: {
    inventory: { backpack },
  },
}) {
  const cursorHeight = cursorPos <= 2 ? cursorPos : cursorPos + 2;

  let useText;
  if (cursorPos <= 2) {
    useText = "Unequip";
  } else if (backpack[cursorPos - 3].isEquippable) {
    useText = "Equip";
  } else {
    useText = "Use";
  }

  ctx.fillStyle = "#222";
  ctx.fillRect(
    (MAP_WIDTH - 9) * tileSize(),
    (5 + cursorHeight) * tileSize(),
    10 * tileSize(),
    (options.length + 2) * tileSize()
  );
  options.forEach(drawSubmenuItem(cursorHeight, submenuPos, ctx, useText));
}

const drawSubmenuItem = (cursorPos, submenuPos, ctx, useText) => (
  option,
  index
) => {
  ctx.fillStyle = "#78ff82";
  ctx.fillText(
    option === OPTION_USE ? useText : option,
    (MAP_WIDTH - 7) * tileSize(),
    (7 + cursorPos + index) * tileSize()
  );
  if (index === submenuPos) {
    ctx.fillText(
      ">",
      (MAP_WIDTH - 8) * tileSize(),
      (7 + cursorPos + index) * tileSize()
    );
  }
};
