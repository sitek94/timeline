import * as muiColors from '@mui/material/colors';
import { ColorName } from '../pages/api/timeline-entries';

export type MuiColors = typeof muiColors;
export type MuiColorName = keyof MuiColors;
export type MuiColor = Record<keyof typeof muiColors.grey, string>;

const notionToMuiColors: Record<ColorName, MuiColor> = {
  default: muiColors.grey,
  pink: muiColors.pink,
  purple: muiColors.deepPurple,
  green: muiColors.green,
  gray: muiColors.grey,
  orange: muiColors.deepOrange,
  brown: muiColors.brown,
  red: muiColors.red,
  yellow: muiColors.yellow,
  blue: muiColors.blue,
};

export default function getColorGroup(name: ColorName) {
  return notionToMuiColors[name];
}
