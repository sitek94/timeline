import {
  Build,
  Close,
  Help,
  LocalLibrary,
  PlayArrow,
  Podcasts,
  School,
  TouchApp,
  Videocam,
} from '@mui/icons-material';
import { ColorName } from '../types';
import * as muiColors from '@mui/material/colors';
import { MuiColor } from '../styles/get-color-group';

// CATEGORIES
export const categoryIcons = {
  'video-course': <PlayArrow />,
  'conference-talk': <Videocam />,
  'interactive-course': <TouchApp />,
  workshop: <Build />,
  error: <Close />,
  podcast: <Podcasts />,
  'university-course': <School />,
  unknown: <Help />,
  book: <LocalLibrary />,
};

// COLORS
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
