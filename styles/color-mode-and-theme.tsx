import * as React from 'react';
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

const ColorModeContext = React.createContext<
  { isDark: boolean; toggle: () => void } | undefined
>(undefined);

export default function ColorModeAndThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      isDark: mode === 'dark',
      toggle: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [mode],
  );

  const theme = React.useMemo(() => createTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
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

export function useColorMode() {
  const context = React.useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error(
      'useColorMode has to be used within ColorModeContext.Provider',
    );
  }
  return context;
}
