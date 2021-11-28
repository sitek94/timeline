import { ColorName } from 'types';
import * as muiColors from '@mui/material/colors';
import { MuiColor } from 'styles/get-color-group';

const notionToMuiColors: Record<ColorName, MuiColor> = {
  default: muiColors.grey,
  pink: muiColors.pink,
  purple: muiColors.deepPurple,
  green: muiColors.teal,
  gray: muiColors.grey,
  orange: muiColors.deepOrange,
  brown: muiColors.brown,
  red: muiColors.red,
  yellow: muiColors.yellow,
  blue: muiColors.blue,
};

export function getColorGroup(name: ColorName) {
  return notionToMuiColors[name];
}
