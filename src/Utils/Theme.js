import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main:"#000000",
    },
    secondary: {
      main: "#111",
    },
    text:{
      disabled:"#fff"
    }
  },
  typography: {
    poster: {
      fontSize: 24,
      fontWeight: 500,
      color: 'grey',
    },
    fontFamily:"'Poppins',sans-serif",
    nav:{
      fontSize: "1rem",
      fontWeight: "400",
     
    }
},
breakpoints: {
  values: {
    xs: 0,
    sm: 832,
    md: 1000,
    lg: 1070,
    xl: 1536,
  },
},

});