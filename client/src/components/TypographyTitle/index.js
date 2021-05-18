import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: '',
    },
  },
});

function TypographyTitle(props) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h4" >{props.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{props.subtitle}</Typography>
        <br/>
      </ThemeProvider>
    </div>
  );
}

export default TypographyTitle