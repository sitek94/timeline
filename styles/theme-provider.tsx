import * as React from 'react';
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useMediaQuery } from '@mui/material';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

function createTheme(mode: 'dark' | 'light') {
  return createMuiTheme({
    palette: {
      mode,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  });
}
