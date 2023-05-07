import { grey } from '@mui/material/colors';

export const inputStyles = {
  marginTop: 1,
  marginBottom: 1,
  '& > label': {
    top: 23,
    left: 0,
    color: grey[500],
    '&[data-shrink="false"]': {
      top: 5,
    },
  },
  '& > div > input': {
    padding: '30.5px 14px 11.5px !important',
  },
  '& legend': {
    display: 'none',
  },
  '& fieldset': {
    top: 0,
  },
};

export const mainCardStyles = {
  maxWidth: 490,
  '& > *': {
    flexGrow: 1,
    flexBasis: '50%',
  },
};
