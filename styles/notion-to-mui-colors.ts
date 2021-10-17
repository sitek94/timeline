import * as muiColors from '@mui/material/colors';

export type MuiColors = typeof muiColors;
export type MuiColorName = keyof MuiColors;
export type MuiColor = Record<keyof typeof muiColors.grey, string>;

export type NotionColorName =
  | 'default'
  | 'pink'
  | 'purple'
  | 'green'
  | 'gray'
  | 'orange'
  | 'brown'
  | 'red'
  | 'yellow'
  | 'blue';

const notionToMuiColors: Record<NotionColorName, MuiColor> = {
  default: muiColors.grey,
  pink: muiColors.pink,
  purple: muiColors.purple,
  green: muiColors.green,
  gray: muiColors.grey,
  orange: muiColors.orange,
  brown: muiColors.brown,
  red: muiColors.red,
  yellow: muiColors.yellow,
  blue: muiColors.blue,
};

export default notionToMuiColors;
