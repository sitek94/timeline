import {
  Apps,
  AssignmentTurnedIn,
  Build,
  Cast,
  Close,
  Functions,
  Help,
  LocalLibrary,
  PlayArrow,
  Podcasts,
  School,
  Slideshow,
  TouchApp,
  Videocam,
  YouTube,
} from '@mui/icons-material';
import { ColorName, MuiColor } from 'src/types';
import * as muiColors from '@mui/material/colors';

// CATEGORIES
export const categoryIcons = {
  App: <Apps />,
  Algorithm: <Functions />,
  Assignment: <AssignmentTurnedIn />,
  Project: <AssignmentTurnedIn />,
  Task: <AssignmentTurnedIn />,
  'Conference Talk': <Videocam />,
  Book: <LocalLibrary />,
  Error: <Close />,
  'Interactive Course': <TouchApp />,
  Podcast: <Podcasts />,
  Stream: <Cast />,
  'University Course': <School />,
  Unknown: <Help />,
  Video: <PlayArrow />,
  'Video Course': <PlayArrow />,
  Webinar: <Slideshow />,
  Workshop: <Build />,
  YouTube: <YouTube />,
  'YouTube Tutorial': <YouTube />,
};

function isCategory(category: string): category is keyof typeof categoryIcons {
  return category in categoryIcons;
}

export function getIcon(category: string) {
  if (isCategory(category)) {
    return categoryIcons[category];
  }
  return categoryIcons.Unknown;
}

// COLORS
const notionToMuiColors: Record<ColorName, MuiColor> = {
  default: muiColors.grey,
  pink: muiColors.pink,
  purple: muiColors.deepPurple,
  green: muiColors.teal,
  gray: muiColors.grey,
  orange: muiColors.orange,
  brown: muiColors.brown,
  red: muiColors.red,
  yellow: muiColors.yellow,
  blue: muiColors.blue,
};

export function getColorGroup(name: ColorName) {
  return notionToMuiColors[name];
}
