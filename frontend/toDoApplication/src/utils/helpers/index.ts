import { IColor, IIcon } from "@/types";
import { nanoid } from "nanoid/non-secure";

const palette = {
  red500: "#ef4444",
  red600: "#dc2626",
  orange300: "#fdba74",
  orange400: "#fb923c",
  green500: "#22c55e",
  green600: "#16a34a",
  sky400: "#38bdf8",
  sky500: "#0ea5e9",
  purple500: "#a855f7",
  purple600: "#9333ea",
};

export const getColors = () => {
  const colors: IColor[] = Object.keys(palette).map((_paletteItem) => {
    return {
      id: `color_${nanoid()}`,
      code: palette[_paletteItem as keyof typeof palette],
      name: _paletteItem,
    };
  });
  return colors;
};
