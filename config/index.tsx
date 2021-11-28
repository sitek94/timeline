import {
  Apps,
  AssignmentTurnedIn,
  Build,
  Cast,
  Close,
  Help,
  LocalLibrary,
  PlayArrow,
  Podcasts,
  School,
  Slideshow,
  Task,
  TouchApp,
  Videocam,
  YouTube,
} from '@mui/icons-material';
import { ColorName } from 'types';
import * as muiColors from '@mui/material/colors';
import { MuiColor } from 'styles/get-color-group';

// CATEGORIES
export const categoryIcons = {
  'YouTube Tutorial': <YouTube />,
  Stream: <Cast />,
  App: <Apps />,
  Task: <Task />,
  Assignment: <AssignmentTurnedIn />,
  'Video Course': <PlayArrow />,
  'Conference Talk': <Videocam />,
  'Interactive Course': <TouchApp />,
  Workshop: <Build />,
  Error: <Close />,
  Podcast: <Podcasts />,
  'University Course': <School />,
  Unknown: <Help />,
  Book: <LocalLibrary />,
  Webinar: <Slideshow />,
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
