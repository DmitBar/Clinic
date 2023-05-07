import { type PaletteMode } from '@mui/material';

export const PaletteModeTypes = {
    light: 'light',
    dark: 'dark',
};

export const getDesignTokens = (mode: PaletteMode): any => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {}
            : {
                  mode: 'dark',
              }),
    },
});
